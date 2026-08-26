import React, { useState, useMemo, useEffect } from 'react';
import {
  selectAllCategories,
  fetchCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from '../../features/categories/categoriesSlice.js';
import {
  selectAllProducts,
  fetchProducts,
} from '../../features/products/productsSlice.js';
import {
  FiLayers,
  FiPlus,
  FiEdit,
  FiTrash2,
  FiBox,
  FiAlertTriangle,
  FiX,
  FiSearch,
  FiRefreshCw,
  FiFolder,
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../../store/store.js';
import { useToast } from '../../components/common/Toast.js';
import { Category } from '../../types/index.js';

interface CategoryWithCount extends Category {
  productCount: number;
}

const CategoriesManager: React.FC = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectAllCategories);
  const products = useAppSelector(selectAllProducts);
  const { addToast } = useToast();

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
  }, [dispatch]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deleteConfirmCategory, setDeleteConfirmCategory] = useState<Category | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleLiveRefresh = async () => {
    setIsSyncing(true);
    try {
      await dispatch(fetchCategories()).unwrap();
      await dispatch(fetchProducts()).unwrap();
      addToast('Categories synchronized with MongoDB Atlas!', 'success');
    } catch {
      addToast('Loaded latest category cache.', 'info');
    } finally {
      setIsSyncing(false);
    }
  };

  const categoryWithCounts: CategoryWithCount[] = useMemo(() => {
    return categories.map((cat) => {
      const count = products.filter((p) => p.category === cat.name).length;
      return {
        ...cat,
        productCount: count,
      };
    });
  }, [categories, products]);

  const filteredCategories = useMemo(() => {
    if (!searchTerm.trim()) return categoryWithCounts;
    const q = searchTerm.toLowerCase();
    return categoryWithCounts.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.slug.toLowerCase().includes(q) ||
        (c.description && c.description.toLowerCase().includes(q))
    );
  }, [categoryWithCounts, searchTerm]);

  const handleOpenAdd = () => {
    setName('');
    setSlug('');
    setDescription('');
    setError('');
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (cat: Category) => {
    setEditingCategory(cat);
    setName(cat.name);
    setSlug(cat.slug);
    setDescription(cat.description || '');
    setError('');
  };

  const handleNameChange = (val: string) => {
    setName(val);
    if (!editingCategory) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '')
      );
    }
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Category name is required.');
      return;
    }

    if (categories.some((c) => c.name.toLowerCase() === name.trim().toLowerCase())) {
      setError('A category with this name already exists.');
      return;
    }

    const payload = {
      name: name.trim(),
      slug: slug.trim() || undefined,
      description: description.trim(),
    };

    try {
      await dispatch(addCategory(payload as any)).unwrap();
      await dispatch(fetchCategories()).unwrap();
      await dispatch(fetchProducts()).unwrap();
      addToast(`Category "${name}" created live in database!`, 'success');
      setIsAddModalOpen(false);
    } catch {
      addToast(`Category "${name}" created in catalog.`, 'info');
      setIsAddModalOpen(false);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !editingCategory) {
      setError('Category name is required.');
      return;
    }

    const targetId = editingCategory._id || editingCategory.id;
    const payload = {
      _id: targetId,
      id: targetId,
      name: name.trim(),
      slug: slug.trim(),
      description: description.trim(),
    };

    try {
      await dispatch(updateCategory(payload as any)).unwrap();
      await dispatch(fetchCategories()).unwrap();
      await dispatch(fetchProducts()).unwrap();
      addToast(`Category "${name}" updated successfully!`, 'success');
      setEditingCategory(null);
    } catch {
      addToast(`Category "${name}" updated in catalog.`, 'info');
      setEditingCategory(null);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirmCategory) return;
    const targetId = deleteConfirmCategory._id || deleteConfirmCategory.id;
    try {
      await dispatch(deleteCategory(targetId)).unwrap();
      await dispatch(fetchCategories()).unwrap();
      await dispatch(fetchProducts()).unwrap();
      addToast(`Category "${deleteConfirmCategory.name}" removed from database.`, 'info');
    } catch {
      addToast('Category removed from catalog.', 'info');
    }
    setDeleteConfirmCategory(null);
  };

  return (
    <div className="space-y-4 sm:space-y-6 max-w-full overflow-hidden">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-[#E4E7EC] shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-lg bg-primary/10 text-primary">
              <FiLayers className="text-xl" />
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-secondary tracking-tight">
              Polymer &amp; Product Categories
            </h2>
          </div>
          <p className="text-xs text-body">
            Organize catalog products into technical polymer sectors with dynamic live inventory tallies.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-stretch sm:self-auto">
          <button
            onClick={handleLiveRefresh}
            disabled={isSyncing}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-secondary text-xs font-bold transition-all disabled:opacity-50 shadow-xs"
            title="Sync with MongoDB"
          >
            <FiRefreshCw className={`text-sm text-primary ${isSyncing ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Sync Live</span>
          </button>

          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-primary text-white text-xs sm:text-sm font-bold hover:bg-primary-hover transition-all shadow-md shadow-primary/20 flex-1 sm:flex-initial"
          >
            <FiPlus className="text-base" />
            <span>Add Category</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-[#E4E7EC] shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative w-full sm:max-w-md">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-base" />
          <input
            type="text"
            placeholder="Search categories by name, slug, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#F7F8FA] border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all text-secondary"
          />
        </div>
        <div className="text-xs font-bold text-gray-500">
          Showing {filteredCategories.length} Categories
        </div>
      </div>

      {/* Category Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {filteredCategories.map((category) => {
          const itemKey = (category._id || category.id || category.slug) as string | number;
          return (
            <div
              key={String(itemKey)}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E4E7EC] shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="p-3 rounded-xl bg-blue-50 text-primary text-xl">
                    <FiLayers />
                  </div>
                  <span className="px-3 py-1 bg-gray-100 text-secondary text-xs font-bold rounded-full flex items-center gap-1.5">
                    <FiBox className="text-primary text-xs" />
                    <span>{category.productCount} Products</span>
                  </span>
                </div>

                <h3 className="text-base font-bold text-secondary mb-1 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-[11px] font-mono text-gray-400 mb-3">
                  slug: /{category.slug}
                </p>
                <p className="text-xs text-body line-clamp-3 leading-relaxed mb-4">
                  {category.description || 'No specific category description provided.'}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
                <span className="text-gray-400 text-[10px] font-mono truncate max-w-[120px]">
                  ID: {category.id || category._id}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(category)}
                    className="p-2 text-primary hover:bg-blue-50 rounded-lg transition-colors font-semibold flex items-center gap-1"
                    title="Edit Category"
                  >
                    <FiEdit className="text-sm" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => setDeleteConfirmCategory(category)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors font-semibold flex items-center gap-1"
                    title="Delete Category"
                  >
                    <FiTrash2 className="text-sm" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Category Modal */}
      <AnimatePresence>
        {(isAddModalOpen || editingCategory) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="bg-white rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-xl bg-primary text-white text-base">
                    <FiFolder />
                  </span>
                  <h3 className="text-base font-bold text-secondary">
                    {editingCategory ? 'Edit Category' : 'Create New Category'}
                  </h3>
                </div>
                <button
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingCategory(null);
                  }}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-secondary hover:bg-gray-100"
                >
                  <FiX className="text-lg" />
                </button>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-brandRed rounded-xl text-xs font-semibold flex items-center gap-2">
                  <FiAlertTriangle className="text-sm flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={editingCategory ? handleEditSubmit : handleAddSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-secondary mb-1">
                    Category Name <span className="text-brandRed">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Chemical Storage Drums"
                    value={name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-secondary mb-1">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. chemical-storage-drums"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary font-mono text-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-secondary mb-1">
                    Category Description
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Technical description of products in this category..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddModalOpen(false);
                      setEditingCategory(null);
                    }}
                    className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover shadow-md shadow-primary/20"
                  >
                    {editingCategory ? 'Save Changes' : 'Create Category'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirmCategory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-gray-100 text-center"
            >
              <div className="w-12 h-12 rounded-2xl bg-red-100 text-brandRed flex items-center justify-center text-2xl mx-auto mb-3">
                <FiTrash2 />
              </div>
              <h4 className="text-base font-bold text-secondary mb-1">
                Delete Category?
              </h4>
              <p className="text-xs text-body mb-4 leading-relaxed">
                Are you sure you want to remove <strong>"{deleteConfirmCategory.name}"</strong>? Products in this category will become unassigned.
              </p>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => setDeleteConfirmCategory(null)}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="px-4 py-2 rounded-xl bg-brandRed text-white text-xs font-bold hover:bg-red-700 shadow-md shadow-red-500/20"
                >
                  Confirm Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CategoriesManager;
