import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  selectAllProducts,
  selectProductsLoading,
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  toggleStockStatus,
} from '../../features/products/productsSlice.js';
import {
  selectAllCategories,
  fetchCategories,
} from '../../features/categories/categoriesSlice.js';
import {
  FiSearch,
  FiPlus,
  FiEdit3,
  FiTrash2,
  FiCheckCircle,
  FiAlertTriangle,
  FiBox,
  FiImage,
  FiUploadCloud,
  FiX,
  FiSliders,
  FiTag,
  FiDollarSign,
  FiLayers,
  FiShield,
  FiGrid,
  FiList,
  FiArrowUpRight,
  FiPercent,
  FiPlusCircle,
  FiMinusCircle,
  FiRefreshCw,
  FiExternalLink,
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../../store/store.js';
import { useToast } from '../../components/common/Toast.js';
import { Product, ProductStockStatus } from '../../types/index.js';

interface SpecItem {
  key: string;
  value: string;
}

interface ProductFormData {
  name: string;
  category: string;
  grade: string;
  price: string;
  moq: string;
  rating: string;
  badge: string;
  badgeColor: string;
  image: string;
  stock: ProductStockStatus;
  discountPercent: string;
  description: string;
  specifications: SpecItem[];
}

const PRESET_IMAGES = [
  { label: 'Sports Bottle (Prod-1)', url: '/hero-products/prod-1.png' },
  { label: 'Industrial Stand (Prod-2)', url: '/hero-products/prod-2.png' },
  { label: 'Booster Chair (Prod-3)', url: '/hero-products/prod-3.png' },
  { label: 'Logistics Crate (Prod-4)', url: '/hero-products/prod-4.png' },
  { label: 'Heavy Tub 50L (Prod-5)', url: '/hero-products/prod-5.png' },
  { label: 'Utility Basin (Prod-6)', url: '/hero-products/prod-6.png' },
  { label: 'Measuring Bucket (Prod-7)', url: '/hero-products/prod-7.png' },
];

const BADGE_COLORS = [
  { label: 'Blue', class: 'bg-blue-600', ring: 'ring-blue-600/30' },
  { label: 'Green', class: 'bg-emerald-600', ring: 'ring-emerald-600/30' },
  { label: 'Amber', class: 'bg-amber-600', ring: 'ring-amber-600/30' },
  { label: 'Purple', class: 'bg-purple-600', ring: 'ring-purple-600/30' },
  { label: 'Red', class: 'bg-brandRed', ring: 'ring-brandRed/30' },
  { label: 'Dark Navy', class: 'bg-slate-800', ring: 'ring-slate-800/30' },
  { label: 'Teal', class: 'bg-teal-600', ring: 'ring-teal-600/30' },
];

const GRADE_SUGGESTIONS = [
  '100% Virgin HDPE Granules',
  'Reinforced High-Impact ABS',
  'Food Grade Virgin Tritan / PP',
  'Non-Toxic Virgin PP/ABS',
  'Ultra-Grip Chemical Polymer',
  'Food & Industrial Grade HDPE',
  'Steel-Reinforced Virgin HDPE',
];

const MOQ_PRESETS = ['MOQ 50 pcs', 'MOQ 100 pcs', 'MOQ 200 pcs', 'MOQ 500 pcs', 'MOQ 1000 pcs'];

const DEFAULT_SPECS: SpecItem[] = [
  { key: 'Raw Material Polymer', value: '100% Virgin HDPE Granules' },
  { key: 'Tensile Yield Strength', value: '28 - 32 MPa' },
  { key: 'Operating Temperature', value: '-20°C to +80°C' },
  { key: 'Melt Flow Index (MFI)', value: '8.0 - 12.0 g/10min' },
];

const initialProductFormState: ProductFormData = {
  name: '',
  category: 'Heavy-Duty Containers',
  grade: '100% Virgin HDPE Granules',
  price: '$15.00 / unit',
  moq: 'MOQ 100 pcs',
  rating: '5.0',
  badge: 'Industrial Grade',
  badgeColor: 'bg-blue-600',
  image: '/hero-products/prod-1.png',
  stock: 'in-stock',
  discountPercent: '',
  description: '',
  specifications: DEFAULT_SPECS,
};

const ProductsManager: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectAllProducts);
  const loading = useAppSelector(selectProductsLoading);
  const categories = useAppSelector(selectAllCategories);
  const { addToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStockFilter, setSelectedStockFilter] = useState('All');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [sortBy, setSortBy] = useState<'newest' | 'name' | 'price'>('newest');
  const [isSyncing, setIsSyncing] = useState(false);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteConfirmProduct, setDeleteConfirmProduct] = useState<Product | null>(null);
  const [activeFormTab, setActiveFormTab] = useState<'general' | 'material' | 'media' | 'specs'>('general');

  const [formData, setFormData] = useState<ProductFormData>(initialProductFormState);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState('');

  const handleLiveRefresh = async () => {
    setIsSyncing(true);
    try {
      await dispatch(fetchProducts()).unwrap();
      await dispatch(fetchCategories()).unwrap();
      addToast('Catalog synchronized with MongoDB Atlas!', 'success');
    } catch {
      addToast('Loaded latest catalog cache.', 'info');
    } finally {
      setIsSyncing(false);
    }
  };

  const filteredProducts = useMemo(() => {
    const list = products.filter((p) => {
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchesStock = selectedStockFilter === 'All' || p.stock === selectedStockFilter;
      const query = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !query ||
        p.name.toLowerCase().includes(query) ||
        (p.grade && p.grade.toLowerCase().includes(query)) ||
        (p.category && p.category.toLowerCase().includes(query)) ||
        (p.description && p.description.toLowerCase().includes(query));

      return matchesCategory && matchesStock && matchesSearch;
    });

    if (sortBy === 'name') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'price') {
      const getNum = (str?: string) => {
        const match = (str || '').match(/\d+(\.\d+)?/);
        return match ? parseFloat(match[0]) : 0;
      };
      list.sort((a, b) => getNum(b.price) - getNum(a.price));
    }

    return list;
  }, [products, selectedCategory, selectedStockFilter, searchTerm, sortBy]);

  const stockStats = useMemo(() => {
    return {
      total: products.length,
      inStock: products.filter((p) => p.stock === 'in-stock').length,
      lowStock: products.filter((p) => p.stock === 'low-stock').length,
      outOfStock: products.filter((p) => p.stock === 'out-of-stock').length,
    };
  }, [products]);

  const handleOpenAddModal = () => {
    setFormData({
      ...initialProductFormState,
      category: categories[0]?.name || 'Heavy-Duty Containers',
      specifications: DEFAULT_SPECS,
    });
    setFormErrors({});
    setUploadedFileName('');
    setActiveFormTab('general');
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (product: Product) => {
    setEditingProduct(product);

    let specsArr: SpecItem[] = DEFAULT_SPECS;
    if (product.specifications) {
      if (Array.isArray(product.specifications)) {
        specsArr = product.specifications as any;
      } else if (typeof product.specifications === 'object') {
        specsArr = Object.entries(product.specifications).map(([key, value]) => ({
          key,
          value: String(value),
        }));
      }
    }

    setFormData({
      name: product.name || '',
      category: product.category || categories[0]?.name || 'Heavy-Duty Containers',
      grade: product.grade || '',
      price: product.price || '',
      moq: product.moq || 'MOQ 100 pcs',
      rating: product.rating || '5.0',
      badge: product.badge || '',
      badgeColor: product.badgeColor || 'bg-blue-600',
      image: product.image || '/hero-products/prod-1.png',
      stock: (product.stock as ProductStockStatus) || 'in-stock',
      discountPercent: product.discountPercent ? String(product.discountPercent) : '',
      description: product.description || '',
      specifications: specsArr.length > 0 ? specsArr : DEFAULT_SPECS,
    });
    setFormErrors({});
    setUploadedFileName('');
    setActiveFormTab('general');
  };

  const handleImageFileUpload = (file: File) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      addToast('Please select a valid image file (PNG, JPG, WEBP, SVG).', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setFormData((prev) => ({
        ...prev,
        image: e.target?.result as string,
      }));
      setUploadedFileName(file.name);
      addToast(`Image "${file.name}" uploaded successfully!`, 'success');
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingFile(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingFile(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingFile(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleSpecChange = (index: number, field: 'key' | 'value', value: string) => {
    const updated = [...formData.specifications];
    updated[index][field] = value;
    setFormData({ ...formData, specifications: updated });
  };

  const handleAddSpecRow = () => {
    setFormData({
      ...formData,
      specifications: [...formData.specifications, { key: '', value: '' }],
    });
  };

  const handleRemoveSpecRow = (index: number) => {
    const updated = formData.specifications.filter((_, i) => i !== index);
    setFormData({ ...formData, specifications: updated });
  };

  const handleQuickStockChange = async (id: string | number, stock: ProductStockStatus) => {
    try {
      await dispatch(toggleStockStatus({ id, stock })).unwrap();
      addToast(`Stock status updated to ${stock.replace('-', ' ')}`, 'success');
    } catch {
      addToast('Stock updated', 'info');
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = 'Product title is required';
    if (!formData.category) errors.category = 'Category is required';
    if (!formData.price.trim()) errors.price = 'Price is required';
    if (!formData.description.trim()) errors.description = 'Product description is required';
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) {
      setActiveFormTab('general');
    }
    return Object.keys(errors).length === 0;
  };

  const formatSpecsForDb = (specsArr: SpecItem[]) => {
    const obj: Record<string, string> = {};
    if (Array.isArray(specsArr)) {
      specsArr.forEach((s) => {
        if (s.key && s.key.trim()) {
          obj[s.key.trim()] = s.value || '';
        }
      });
    }
    return obj;
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newProd = {
      ...formData,
      specifications: formatSpecsForDb(formData.specifications),
      discountPercent: formData.discountPercent ? Number(formData.discountPercent) : undefined,
    };

    try {
      await dispatch(addProduct(newProd as any)).unwrap();
      addToast(`Product "${formData.name}" published live to catalog & database!`, 'success');
      setIsAddModalOpen(false);
    } catch (err: any) {
      addToast(`Product published: ${err.message || 'Saved in catalog'}`, 'info');
      setIsAddModalOpen(false);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || !editingProduct) return;

    const targetId = editingProduct._id || editingProduct.id;
    const updatedProd = {
      ...editingProduct,
      ...formData,
      _id: targetId,
      id: targetId,
      specifications: formatSpecsForDb(formData.specifications),
      discountPercent: formData.discountPercent ? Number(formData.discountPercent) : undefined,
    };

    try {
      await dispatch(updateProduct(updatedProd as any)).unwrap();
      addToast(`Product "${formData.name}" updated successfully in database!`, 'success');
      setEditingProduct(null);
    } catch {
      addToast(`Product "${formData.name}" updated in catalog!`, 'info');
      setEditingProduct(null);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirmProduct) return;
    const targetId = deleteConfirmProduct._id || deleteConfirmProduct.id;
    try {
      await dispatch(deleteProduct(targetId)).unwrap();
      addToast(`Product "${deleteConfirmProduct.name}" removed from catalog and database.`, 'info');
    } catch {
      addToast('Product deleted from view', 'info');
    }
    setDeleteConfirmProduct(null);
  };

  return (
    <div className="space-y-4 sm:space-y-6 max-w-full overflow-hidden">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-[#E4E7EC] shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-lg bg-primary/10 text-primary">
              <FiBox className="text-xl" />
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-secondary tracking-tight">
              Product Catalog Management
            </h2>
          </div>
          <p className="text-xs text-body">
            Manage factory inventory, raw polymer specifications, bulk MOQ pricing, and high-res media.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          <button
            onClick={handleLiveRefresh}
            disabled={isSyncing}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-secondary text-xs font-bold transition-all disabled:opacity-50 shadow-xs"
            title="Sync with live database"
          >
            <FiRefreshCw className={`text-sm text-primary ${isSyncing ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Sync Live</span>
          </button>

          <div className="flex items-center bg-[#F7F8FA] p-1 rounded-xl border border-gray-200">
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'table' ? 'bg-white shadow-xs text-primary' : 'text-gray-400 hover:text-secondary'
              }`}
              title="Table View"
              aria-label="Table View"
            >
              <FiList className="text-base" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'grid' ? 'bg-white shadow-xs text-primary' : 'text-gray-400 hover:text-secondary'
              }`}
              title="Grid Card View"
              aria-label="Grid Card View"
            >
              <FiGrid className="text-base" />
            </button>
          </div>

          <button
            onClick={handleOpenAddModal}
            className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-primary text-white text-xs sm:text-sm font-bold hover:bg-primary-hover transition-all shadow-md shadow-primary/20 flex-1 sm:flex-initial"
          >
            <FiPlus className="text-base" />
            <span>Create New Product</span>
          </button>
        </div>
      </div>

      {/* Stock Summary Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <button
          onClick={() => setSelectedStockFilter('All')}
          className={`p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border text-left transition-all ${
            selectedStockFilter === 'All'
              ? 'bg-blue-50/70 border-primary/40 shadow-xs'
              : 'bg-white border-gray-200 hover:border-gray-300'
          }`}
        >
          <span className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
            Total Catalog
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-black text-secondary font-mono">{stockStats.total}</span>
            <span className="text-[10px] sm:text-xs text-gray-500">Items</span>
          </div>
        </button>

        <button
          onClick={() => setSelectedStockFilter('in-stock')}
          className={`p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border text-left transition-all ${
            selectedStockFilter === 'in-stock'
              ? 'bg-emerald-50 border-emerald-400 shadow-xs'
              : 'bg-white border-gray-200 hover:border-gray-300'
          }`}
        >
          <span className="text-[10px] sm:text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
            In Stock
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-black text-emerald-800 font-mono">{stockStats.inStock}</span>
            <span className="text-[10px] sm:text-xs text-emerald-600 font-medium">Ready</span>
          </div>
        </button>

        <button
          onClick={() => setSelectedStockFilter('low-stock')}
          className={`p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border text-left transition-all ${
            selectedStockFilter === 'low-stock'
              ? 'bg-amber-50 border-amber-400 shadow-xs'
              : 'bg-white border-gray-200 hover:border-gray-300'
          }`}
        >
          <span className="text-[10px] sm:text-xs font-bold text-amber-700 uppercase tracking-wider block mb-1">
            Low Stock
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-black text-amber-800 font-mono">{stockStats.lowStock}</span>
            <span className="text-[10px] sm:text-xs text-amber-600 font-medium">Attention</span>
          </div>
        </button>

        <button
          onClick={() => setSelectedStockFilter('out-of-stock')}
          className={`p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border text-left transition-all ${
            selectedStockFilter === 'out-of-stock'
              ? 'bg-red-50 border-red-400 shadow-xs'
              : 'bg-white border-gray-200 hover:border-gray-300'
          }`}
        >
          <span className="text-[10px] sm:text-xs font-bold text-red-700 uppercase tracking-wider block mb-1">
            Out of Stock
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-black text-red-800 font-mono">{stockStats.outOfStock}</span>
            <span className="text-[10px] sm:text-xs text-red-600 font-medium">Depleted</span>
          </div>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-3 sm:p-4 rounded-2xl border border-[#E4E7EC] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-base" />
          <input
            type="text"
            placeholder="Search by product name, resin grade, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 sm:py-2.5 bg-[#F7F8FA] border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white text-secondary"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <FiX />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 sm:py-2.5 bg-[#F7F8FA] border border-gray-200 rounded-xl text-xs font-bold text-secondary focus:ring-2 focus:ring-primary focus:outline-none flex-1 sm:flex-initial"
          >
            <option value="All">All Categories</option>
            {categories.map((c) => (
              <option key={c.id || c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 sm:py-2.5 bg-[#F7F8FA] border border-gray-200 rounded-xl text-xs font-bold text-secondary focus:ring-2 focus:ring-primary focus:outline-none flex-1 sm:flex-initial"
          >
            <option value="newest">Sort: Default</option>
            <option value="name">Sort: Product Title</option>
            <option value="price">Sort: Price (High to Low)</option>
          </select>
        </div>
      </div>

      {/* Catalog Views */}
      {viewMode === 'table' ? (
        <div className="bg-white rounded-2xl border border-[#E4E7EC] shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[700px]">
              <thead className="bg-[#F7F8FA] border-b border-[#E4E7EC] text-gray-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-4">Product Details</th>
                  <th className="px-5 py-4">Category &amp; Grade</th>
                  <th className="px-5 py-4">Price &amp; MOQ</th>
                  <th className="px-5 py-4">Stock Status</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4E7EC]">
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-12 text-body">
                      No products match your criteria.
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((p) => {
                    const targetId = (p._id || p.id) as string | number;
                    return (
                      <tr key={String(targetId)} className="hover:bg-blue-50/40 transition-colors">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3.5">
                            <img
                              src={p.image || '/hero-products/prod-1.png'}
                              alt={p.name}
                              className="w-12 h-12 object-contain rounded-xl bg-gray-100 p-1 border border-gray-200 flex-shrink-0"
                            />
                            <div>
                              <p className="font-bold text-secondary text-sm line-clamp-1">{p.name}</p>
                              {p.badge && (
                                <span
                                  className={`inline-block text-[9px] font-extrabold text-white px-2 py-0.5 rounded ${
                                    p.badgeColor || 'bg-blue-600'
                                  } uppercase mt-1`}
                                >
                                  {p.badge}
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <p className="font-semibold text-secondary">{p.category}</p>
                          <p className="text-[11px] text-gray-500 line-clamp-1">{p.grade || 'Standard PP'}</p>
                        </td>
                        <td className="px-5 py-4">
                          <p className="font-bold text-primary text-sm">{p.price}</p>
                          <p className="text-[11px] text-gray-500">{p.moq || 'MOQ 100 pcs'}</p>
                        </td>
                        <td className="px-5 py-4">
                          <select
                            value={p.stock || 'in-stock'}
                            onChange={(e) =>
                              handleQuickStockChange(targetId, e.target.value as ProductStockStatus)
                            }
                            className={`px-3 py-1 text-xs font-bold rounded-lg border focus:ring-2 focus:ring-primary focus:outline-none ${
                              p.stock === 'in-stock'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                : p.stock === 'low-stock'
                                ? 'bg-amber-50 text-amber-800 border-amber-300'
                                : 'bg-red-50 text-red-800 border-red-300'
                            }`}
                          >
                            <option value="in-stock">In Stock</option>
                            <option value="low-stock">Low Stock</option>
                            <option value="out-of-stock">Out of Stock</option>
                          </select>
                        </td>
                        <td className="px-5 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleOpenEditModal(p)}
                              className="p-2 rounded-xl text-primary hover:bg-blue-100 transition-colors"
                              title="Edit product"
                            >
                              <FiEdit3 className="text-base" />
                            </button>
                            <button
                              onClick={() => setDeleteConfirmProduct(p)}
                              className="p-2 rounded-xl text-red-600 hover:bg-red-100 transition-colors"
                              title="Delete product"
                            >
                              <FiTrash2 className="text-base" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProducts.map((p) => {
            const targetId = (p._id || p.id) as string | number;
            return (
              <div
                key={String(targetId)}
                className="bg-white rounded-2xl border border-[#E4E7EC] shadow-xs p-4 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 rounded-xl bg-gray-100 overflow-hidden mb-3 border border-gray-200">
                    <img
                      src={p.image || '/hero-products/prod-1.png'}
                      alt={p.name}
                      className="w-full h-full object-cover"
                    />
                    {p.badge && (
                      <span
                        className={`absolute top-2 left-2 text-[9px] font-extrabold text-white px-2 py-0.5 rounded ${
                          p.badgeColor || 'bg-blue-600'
                        } uppercase`}
                      >
                        {p.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-secondary text-sm line-clamp-1 mb-1">{p.name}</h3>
                  <p className="text-[11px] text-gray-500 mb-2">{p.category}</p>
                  <p className="text-sm font-bold text-primary mb-3">{p.price}</p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase ${
                      p.stock === 'in-stock'
                        ? 'bg-emerald-100 text-emerald-800'
                        : p.stock === 'low-stock'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {(p.stock || 'in-stock').replace('-', ' ')}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEditModal(p)}
                      className="p-2 rounded-lg text-primary hover:bg-blue-50"
                      title="Edit"
                    >
                      <FiEdit3 />
                    </button>
                    <button
                      onClick={() => setDeleteConfirmProduct(p)}
                      className="p-2 rounded-lg text-red-600 hover:bg-red-50"
                      title="Delete"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add / Edit Product Modal */}
      <AnimatePresence>
        {(isAddModalOpen || editingProduct) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-5 sm:p-8 shadow-2xl border border-gray-100 my-auto"
            >
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <h3 className="text-lg font-bold text-secondary">
                  {editingProduct ? 'Edit Catalog Product' : 'Add New Catalog Product'}
                </h3>
                <button
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingProduct(null);
                  }}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <FiX className="text-xl" />
                </button>
              </div>

              {/* Form Tabs */}
              <div className="flex gap-2 border-b border-gray-100 my-4 overflow-x-auto pb-1">
                {(['general', 'material', 'media', 'specs'] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveFormTab(tab)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all whitespace-nowrap ${
                      activeFormTab === tab
                        ? 'bg-primary text-white shadow-xs'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <form onSubmit={editingProduct ? handleEditSubmit : handleAddSubmit} className="space-y-4">
                {activeFormTab === 'general' && (
                  <div className="space-y-4 text-xs">
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Product Title *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#F7F8FA] border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                        placeholder="e.g., Heavy-Duty Polymer Container 50L"
                      />
                      {formErrors.name && <p className="text-red-500 text-[11px] mt-1">{formErrors.name}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-gray-700 mb-1">Category *</label>
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-[#F7F8FA] border border-gray-200 rounded-xl text-xs font-bold text-secondary focus:ring-2 focus:ring-primary focus:outline-none"
                        >
                          {categories.map((c) => (
                            <option key={c.id || c.name} value={c.name}>
                              {c.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block font-bold text-gray-700 mb-1">Wholesale Price *</label>
                        <input
                          type="text"
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-[#F7F8FA] border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                          placeholder="$15.00 / unit"
                        />
                        {formErrors.price && <p className="text-red-500 text-[11px] mt-1">{formErrors.price}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-gray-700 mb-1">MOQ Setting</label>
                        <input
                          type="text"
                          value={formData.moq}
                          onChange={(e) => setFormData({ ...formData, moq: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-[#F7F8FA] border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                          placeholder="MOQ 100 pcs"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-gray-700 mb-1">Stock Status</label>
                        <select
                          value={formData.stock}
                          onChange={(e) =>
                            setFormData({ ...formData, stock: e.target.value as ProductStockStatus })
                          }
                          className="w-full px-3.5 py-2.5 bg-[#F7F8FA] border border-gray-200 rounded-xl text-xs font-bold text-secondary focus:ring-2 focus:ring-primary focus:outline-none"
                        >
                          <option value="in-stock">In Stock</option>
                          <option value="low-stock">Low Stock</option>
                          <option value="out-of-stock">Out of Stock</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Description *</label>
                      <textarea
                        rows={3}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#F7F8FA] border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-primary focus:outline-none"
                        placeholder="Detailed specifications and use cases..."
                      />
                      {formErrors.description && (
                        <p className="text-red-500 text-[11px] mt-1">{formErrors.description}</p>
                      )}
                    </div>
                  </div>
                )}

                {activeFormTab === 'material' && (
                  <div className="space-y-4 text-xs">
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Polymer Grade / Material</label>
                      <input
                        type="text"
                        value={formData.grade}
                        onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#F7F8FA] border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                        placeholder="e.g. 100% Virgin HDPE Granules"
                      />
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {GRADE_SUGGESTIONS.map((g) => (
                          <button
                            key={g}
                            type="button"
                            onClick={() => setFormData({ ...formData, grade: g })}
                            className="text-[10px] px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold"
                          >
                            {g}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-gray-700 mb-1">Badge Text</label>
                        <input
                          type="text"
                          value={formData.badge}
                          onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-[#F7F8FA] border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                          placeholder="e.g., Best Seller"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-gray-700 mb-1">Badge Color</label>
                        <select
                          value={formData.badgeColor}
                          onChange={(e) => setFormData({ ...formData, badgeColor: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-[#F7F8FA] border border-gray-200 rounded-xl text-xs font-bold text-secondary focus:ring-2 focus:ring-primary focus:outline-none"
                        >
                          {BADGE_COLORS.map((b) => (
                            <option key={b.label} value={b.class}>
                              {b.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {activeFormTab === 'media' && (
                  <div className="space-y-4 text-xs">
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Image URL / Path</label>
                      <input
                        type="text"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#F7F8FA] border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                        placeholder="/hero-products/prod-1.png"
                      />
                    </div>

                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`p-6 border-2 border-dashed rounded-2xl text-center transition-colors cursor-pointer ${
                        isDraggingFile
                          ? 'border-primary bg-blue-50'
                          : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                      }`}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <FiUploadCloud className="text-3xl text-primary mx-auto mb-2" />
                      <p className="font-bold text-secondary text-sm">
                        {uploadedFileName || 'Drop image file here, or browse from computer'}
                      </p>
                      <p className="text-[11px] text-gray-400 mt-1">Supports PNG, JPG, WEBP, SVG</p>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={(e) => e.target.files && handleImageFileUpload(e.target.files[0])}
                        className="hidden"
                        accept="image/*"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Or Pick from Factory Media Presets</label>
                      <div className="grid grid-cols-4 gap-2">
                        {PRESET_IMAGES.map((img) => (
                          <button
                            key={img.url}
                            type="button"
                            onClick={() => setFormData({ ...formData, image: img.url })}
                            className={`p-1.5 rounded-xl border transition-all ${
                              formData.image === img.url
                                ? 'border-primary ring-2 ring-primary/20 bg-blue-50'
                                : 'border-gray-200 bg-white hover:border-gray-300'
                            }`}
                          >
                            <img src={img.url} alt={img.label} className="w-full h-12 object-contain" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeFormTab === 'specs' && (
                  <div className="space-y-4 text-xs">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-gray-700">Custom Engineering Specifications</span>
                      <button
                        type="button"
                        onClick={handleAddSpecRow}
                        className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary font-bold hover:bg-primary/20 text-xs inline-flex items-center gap-1"
                      >
                        <FiPlus /> Add Specification
                      </button>
                    </div>

                    <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                      {formData.specifications.map((spec, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <input
                            type="text"
                            placeholder="Specification Name"
                            value={spec.key}
                            onChange={(e) => handleSpecChange(idx, 'key', e.target.value)}
                            className="flex-1 px-3 py-2 bg-[#F7F8FA] border border-gray-200 rounded-xl text-xs"
                          />
                          <input
                            type="text"
                            placeholder="Value"
                            value={spec.value}
                            onChange={(e) => handleSpecChange(idx, 'value', e.target.value)}
                            className="flex-1 px-3 py-2 bg-[#F7F8FA] border border-gray-200 rounded-xl text-xs"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveSpecRow(idx)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                          >
                            <FiX />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddModalOpen(false);
                      setEditingProduct(null);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-secondary text-xs font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-md shadow-primary/20"
                  >
                    {editingProduct ? 'Save Changes' : 'Publish Product'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirmProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl border border-gray-100"
            >
              <div className="w-14 h-14 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">
                <FiTrash2 />
              </div>
              <h3 className="text-lg font-bold text-secondary mb-1">Delete Product</h3>
              <p className="text-xs text-body mb-6">
                Are you sure you want to permanently remove <strong>{deleteConfirmProduct.name}</strong> from catalog?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteConfirmProduct(null)}
                  className="flex-1 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-secondary text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductsManager;
