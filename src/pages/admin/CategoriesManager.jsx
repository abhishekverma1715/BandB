import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectAllCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from '../../features/categories/categoriesSlice.js';
import { selectAllProducts } from '../../features/products/productsSlice.js';
import {
  FiLayers,
  FiPlus,
  FiEdit,
  FiTrash2,
  FiBox,
  FiCheckCircle,
  FiAlertTriangle,
  FiX,
  FiSearch,
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '../../components/common/Toast.jsx';

const CategoriesManager = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectAllCategories);
  const products = useSelector(selectAllProducts);
  const { addToast } = useToast();

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [deleteConfirmCategory, setDeleteConfirmCategory] = useState(null);

  // Form State
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  // Calculate live product count for each category
  const categoryWithCounts = useMemo(() => {
    return categories.map((cat) => {
      const count = products.filter((p) => p.category === cat.name).length;
      return {
        ...cat,
        productCount: count,
      };
    });
  }, [categories, products]);

  // Filtered Categories
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

  // Open Add Modal
  const handleOpenAdd = () => {
    setName('');
    setSlug('');
    setDescription('');
    setError('');
    setIsAddModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (cat) => {
    setEditingCategory(cat);
    setName(cat.name);
    setSlug(cat.slug);
    setDescription(cat.description || '');
    setError('');
  };

  const handleNameChange = (val) => {
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

  // Submit Add Category
  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Category name is required.');
      return;
    }

    if (categories.some((c) => c.name.toLowerCase() === name.trim().toLowerCase())) {
      setError('A category with this name already exists.');
      return;
    }

    dispatch(
      addCategory({
        name: name.trim(),
        slug: slug.trim() || undefined,
        description: description.trim(),
      })
    );

    addToast(`Category "${name}" created successfully!`, 'success');
    setIsAddModalOpen(false);
  };

  // Submit Edit Category
  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !editingCategory) {
      setError('Category name is required.');
      return;
    }

    dispatch(
      updateCategory({
        id: editingCategory.id,
        name: name.trim(),
        slug: slug.trim(),
        description: description.trim(),
      })
    );

    addToast(`Category "${name}" updated successfully!`, 'success');
    setEditingCategory(null);
  };

  // Confirm Delete
  const handleDeleteConfirm = () => {
    if (!deleteConfirmCategory) return;
    dispatch(deleteCategory(deleteConfirmCategory.id));
    addToast(`Category "${deleteConfirmCategory.name}" removed.`, 'info');
    setDeleteConfirmCategory(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-secondary tracking-tight">
            Polymer &amp; Product Categories
          </h2>
          <p className="text-xs text-body">
            Organize catalog products into technical polymer sectors with dynamic live inventory tallies.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary text-white text-xs sm:text-sm font-bold hover:bg-primary-hover transition-all shadow-md shadow-primary/20 self-start sm:self-auto"
        >
          <FiPlus className="text-base" />
          <span>Add New Category</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E4E7EC] shadow-sm flex items-center justify-between">
        <div className="relative w-full max-w-md">
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCategories.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-2xl p-6 border border-[#E4E7EC] shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
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
              <span className="text-gray-400 text-[10px] font-mono">ID: {category.id}</span>
              <div className="flex items-center gap-2">
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
        ))}
      </div>

      {/* Add / Edit Category Modal */}
      <AnimatePresence>
        {(isAddModalOpen || editingCategory) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100"
            >
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <h3 className="text-base font-bold text-secondary">
                  {editingCategory ? 'Edit Category' : 'Create New Category'}
                </h3>
                <button
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingCategory(null);
                  }}
                  className="p-1.5 text-gray-400 hover:text-secondary rounded-lg"
                >
                  <FiX className="text-lg" />
                </button>
              </div>

              <form
                onSubmit={editingCategory ? handleEditSubmit : handleAddSubmit}
                className="mt-5 space-y-4 text-xs"
              >
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs">
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-gray-700 font-bold uppercase tracking-wider mb-1">
                    Category Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sanitary & Utility Polymer"
                    value={name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F7F8FA] border border-gray-200 rounded-xl text-secondary text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold uppercase tracking-wider mb-1">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. sanitary-utility-polymer"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F7F8FA] border border-gray-200 rounded-xl text-secondary font-mono text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold uppercase tracking-wider mb-1">
                    Category Description
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Overview of polymer applications and materials in this classification..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F7F8FA] border border-gray-200 rounded-xl text-secondary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddModalOpen(false);
                      setEditingCategory(null);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-secondary font-bold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-primary text-white font-bold hover:bg-primary-hover transition-colors shadow-md shadow-primary/20"
                  >
                    {editingCategory ? 'Update Category' : 'Save Category'}
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4 text-xl">
                <FiTrash2 />
              </div>
              <h3 className="text-base font-bold text-secondary mb-2">
                Delete Category "{deleteConfirmCategory.name}"?
              </h3>

              {deleteConfirmCategory.productCount > 0 ? (
                <div className="mb-6 p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs text-left">
                  <p className="font-bold flex items-center gap-1.5 mb-1">
                    <FiAlertTriangle className="text-amber-600" />
                    Warning: Category in Use
                  </p>
                  <p>
                    There are <strong>{deleteConfirmCategory.productCount} products</strong> currently assigned to this category. Deleting it will remove the category classification.
                  </p>
                </div>
              ) : (
                <p className="text-xs text-body mb-6">
                  Are you sure you want to delete this category? No products are currently assigned.
                </p>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteConfirmCategory(null)}
                  className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-secondary rounded-xl font-bold text-xs transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-xs transition-colors shadow-md shadow-red-600/20"
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
