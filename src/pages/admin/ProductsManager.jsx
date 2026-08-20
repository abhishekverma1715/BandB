import React, { useState, useMemo, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  toggleStockStatus,
} from '../../features/products/productsSlice.js';
import { selectAllCategories } from '../../features/categories/categoriesSlice.js';
import {
  FiSearch,
  FiFilter,
  FiPlus,
  FiEdit3,
  FiTrash2,
  FiEye,
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
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '../../components/common/Toast.jsx';

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

const DEFAULT_SPECS = [
  { key: 'Raw Material Polymer', value: '100% Virgin HDPE Granules' },
  { key: 'Tensile Yield Strength', value: '28 - 32 MPa' },
  { key: 'Operating Temperature', value: '-20°C to +80°C' },
  { key: 'Melt Flow Index (MFI)', value: '8.0 - 12.0 g/10min' },
];

const initialProductFormState = {
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

const ProductsManager = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const categories = useSelector(selectAllCategories);
  const { addToast } = useToast();
  const fileInputRef = useRef(null);

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStockFilter, setSelectedStockFilter] = useState('All');
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'grid'
  const [sortBy, setSortBy] = useState('newest'); // 'newest' | 'name' | 'price'

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteConfirmProduct, setDeleteConfirmProduct] = useState(null);
  const [activeFormTab, setActiveFormTab] = useState('general'); // 'general' | 'material' | 'media' | 'specs'

  // Form State
  const [formData, setFormData] = useState(initialProductFormState);
  const [formErrors, setFormErrors] = useState({});
  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState('');

  // Filter & Sort Products
  const filteredProducts = useMemo(() => {
    let list = products.filter((p) => {
      const matchesCategory =
        selectedCategory === 'All' || p.category === selectedCategory;
      const matchesStock =
        selectedStockFilter === 'All' || p.stock === selectedStockFilter;
      const query = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !query ||
        p.name.toLowerCase().includes(query) ||
        (p.grade && p.grade.toLowerCase().includes(query)) ||
        p.category.toLowerCase().includes(query) ||
        (p.description && p.description.toLowerCase().includes(query));

      return matchesCategory && matchesStock && matchesSearch;
    });

    if (sortBy === 'name') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'price') {
      const getNum = (str) => {
        const match = (str || '').match(/\d+(\.\d+)?/);
        return match ? parseFloat(match[0]) : 0;
      };
      list.sort((a, b) => getNum(b.price) - getNum(a.price));
    }

    return list;
  }, [products, selectedCategory, selectedStockFilter, searchTerm, sortBy]);

  // Catalog Counters
  const stockStats = useMemo(() => {
    return {
      total: products.length,
      inStock: products.filter((p) => p.stock === 'in-stock').length,
      lowStock: products.filter((p) => p.stock === 'low-stock').length,
      outOfStock: products.filter((p) => p.stock === 'out-of-stock').length,
    };
  }, [products]);

  // Open Add Modal
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

  // Open Edit Modal
  const handleOpenEditModal = (product) => {
    setEditingProduct(product);

    // Parse specifications into array format
    let specsArr = DEFAULT_SPECS;
    if (product.specifications) {
      if (Array.isArray(product.specifications)) {
        specsArr = product.specifications;
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
      stock: product.stock || 'in-stock',
      discountPercent: product.discountPercent ? String(product.discountPercent) : '',
      description: product.description || '',
      specifications: specsArr.length > 0 ? specsArr : DEFAULT_SPECS,
    });
    setFormErrors({});
    setUploadedFileName('');
    setActiveFormTab('general');
  };

  // Handle local file image upload
  const handleImageFileUpload = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      addToast('Please select a valid image file (PNG, JPG, WEBP, SVG).', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setFormData((prev) => ({
        ...prev,
        image: e.target.result,
      }));
      setUploadedFileName(file.name);
      addToast(`Image "${file.name}" uploaded successfully!`, 'success');
    };
    reader.readAsDataURL(file);
  };

  // File Drag & Drop Handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDraggingFile(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDraggingFile(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDraggingFile(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageFileUpload(e.dataTransfer.files[0]);
    }
  };

  // Specification Key-Value Handlers
  const handleSpecChange = (index, field, value) => {
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

  const handleRemoveSpecRow = (index) => {
    const updated = formData.specifications.filter((_, i) => i !== index);
    setFormData({ ...formData, specifications: updated });
  };

  // Quick Stock Toggle
  const handleQuickStockChange = (id, stock) => {
    dispatch(toggleStockStatus({ id, stock }));
    addToast(`Stock status updated to ${stock.replace('-', ' ')}`, 'success');
  };

  // Form Validation
  const validateForm = () => {
    const errors = {};
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

  // Submit Add
  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newProd = {
      ...formData,
      discountPercent: formData.discountPercent ? Number(formData.discountPercent) : undefined,
    };

    dispatch(addProduct(newProd));
    addToast(`Product "${formData.name}" published to live catalog!`, 'success');
    setIsAddModalOpen(false);
  };

  // Submit Edit
  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!validateForm() || !editingProduct) return;

    const updatedProd = {
      id: editingProduct.id,
      ...formData,
      discountPercent: formData.discountPercent ? Number(formData.discountPercent) : undefined,
    };

    dispatch(updateProduct(updatedProd));
    addToast(`Product "${formData.name}" updated successfully!`, 'success');
    setEditingProduct(null);
  };

  // Confirm Delete
  const handleDeleteConfirm = () => {
    if (!deleteConfirmProduct) return;
    dispatch(deleteProduct(deleteConfirmProduct.id));
    addToast(`Product "${deleteConfirmProduct.name}" removed from catalog.`, 'info');
    setDeleteConfirmProduct(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Action Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#E4E7EC] shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-lg bg-primary/10 text-primary">
              <FiBox className="text-xl" />
            </span>
            <h2 className="text-2xl font-black text-secondary tracking-tight">
              Product Catalog Management
            </h2>
          </div>
          <p className="text-xs text-body">
            Manage factory inventory, raw polymer specifications, bulk MOQ pricing, and high-res media.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-[#F7F8FA] p-1 rounded-xl border border-gray-200">
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'table' ? 'bg-white shadow-sm text-primary' : 'text-gray-400 hover:text-secondary'
              }`}
              title="Table View"
            >
              <FiList className="text-base" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'grid' ? 'bg-white shadow-sm text-primary' : 'text-gray-400 hover:text-secondary'
              }`}
              title="Grid Card View"
            >
              <FiGrid className="text-base" />
            </button>
          </div>

          <button
            onClick={handleOpenAddModal}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary text-white text-xs sm:text-sm font-bold hover:bg-primary-hover transition-all shadow-md shadow-primary/20"
          >
            <FiPlus className="text-base" />
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {/* KPI Metric Summary Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="p-4 bg-white rounded-xl border border-[#E4E7EC] shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-body block">Total Catalog</span>
            <span className="text-2xl font-black text-secondary">{stockStats.total}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-blue-50 text-primary text-lg">
            <FiBox />
          </div>
        </div>

        <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200/60 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block">In Stock</span>
            <span className="text-2xl font-black text-emerald-800">{stockStats.inStock}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-800 text-lg">
            <FiCheckCircle />
          </div>
        </div>

        <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200/60 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 block">Low Stock Alert</span>
            <span className="text-2xl font-black text-amber-800">{stockStats.lowStock}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-amber-100 text-amber-800 text-lg">
            <FiAlertTriangle />
          </div>
        </div>

        <div className="p-4 bg-red-50/60 rounded-xl border border-red-200/60 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-red-800 block">Out of Stock</span>
            <span className="text-2xl font-black text-red-800">{stockStats.outOfStock}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-red-100 text-red-800 text-lg">
            <FiX />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E4E7EC] shadow-sm flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full lg:w-96">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-base" />
          <input
            type="text"
            placeholder="Search by name, polymer grade, or application..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#F7F8FA] border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all text-secondary"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-secondary"
            >
              Clear
            </button>
          )}
        </div>

        {/* Dropdowns */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-start lg:justify-end">
          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-500">Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 bg-[#F7F8FA] border border-gray-200 rounded-xl text-xs font-semibold text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="All">All Categories ({products.length})</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Stock Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-500">Stock:</span>
            <select
              value={selectedStockFilter}
              onChange={(e) => setSelectedStockFilter(e.target.value)}
              className="px-3 py-2 bg-[#F7F8FA] border border-gray-200 rounded-xl text-xs font-semibold text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="All">All Stock Levels</option>
              <option value="in-stock">In Stock Only</option>
              <option value="low-stock">Low Stock Warnings</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>
          </div>

          {/* Sort Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-500">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 bg-[#F7F8FA] border border-gray-200 rounded-xl text-xs font-semibold text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="newest">Newest First</option>
              <option value="name">Product Name (A-Z)</option>
              <option value="price">Highest Price</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content: Table View or Grid View */}
      {viewMode === 'table' ? (
        <div className="bg-white rounded-2xl border border-[#E4E7EC] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F7F8FA] border-b border-[#E4E7EC] text-gray-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">Product Details</th>
                  <th className="px-6 py-4">Polymer Category</th>
                  <th className="px-6 py-4">FOB Price &amp; MOQ</th>
                  <th className="px-6 py-4">Feature Badge</th>
                  <th className="px-6 py-4">Live Inventory</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4E7EC]">
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-16 text-body">
                      <FiBox className="text-4xl mx-auto text-gray-300 mb-2" />
                      <p className="font-semibold text-secondary text-sm">No products found matching filters</p>
                      <p className="text-xs text-body mt-1">Try resetting search query or category filters.</p>
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-blue-50/40 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3.5">
                          <div className="relative w-12 h-12 rounded-xl bg-[#F7F8FA] border border-gray-200 overflow-hidden flex-shrink-0 flex items-center justify-center group-hover:border-primary/50 transition-colors">
                            <img
                              src={product.image || '/hero-products/prod-1.png'}
                              alt={product.name}
                              className="w-full h-full object-contain p-1"
                              onError={(e) => {
                                e.target.src = '/hero-products/prod-1.png';
                              }}
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-secondary text-sm line-clamp-1 group-hover:text-primary transition-colors">
                              {product.name}
                            </p>
                            <p className="text-[11px] text-body line-clamp-1">{product.grade || '100% Virgin Polymer'}</p>
                            <p className="text-[10px] text-gray-400 font-mono">slug: /{product.slug || product.id}</p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="font-semibold text-secondary bg-gray-100 px-3 py-1 rounded-lg text-[11px] inline-block border border-gray-200/60">
                          {product.category}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <p className="font-extrabold text-primary text-sm">{product.price}</p>
                        <p className="text-[11px] text-gray-500 font-medium">{product.moq}</p>
                      </td>

                      <td className="px-6 py-4">
                        {product.badge ? (
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white uppercase tracking-wider shadow-xs ${
                              product.badgeColor || 'bg-blue-600'
                            }`}
                          >
                            {product.badge}
                          </span>
                        ) : (
                          <span className="text-gray-400 text-[11px] italic">Standard Item</span>
                        )}
                      </td>

                      <td className="px-6 py-4">
                        <select
                          value={product.stock}
                          onChange={(e) => handleQuickStockChange(product.id, e.target.value)}
                          className={`text-xs font-bold px-3 py-1.5 rounded-xl border focus:ring-2 focus:ring-primary focus:outline-none transition-all ${
                            product.stock === 'in-stock'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                              : product.stock === 'low-stock'
                              ? 'bg-amber-50 text-amber-800 border-amber-300'
                              : 'bg-red-50 text-red-800 border-red-300'
                          }`}
                        >
                          <option value="in-stock">🟢 In Stock</option>
                          <option value="low-stock">🟡 Low Stock</option>
                          <option value="out-of-stock">🔴 Out of Stock</option>
                        </select>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEditModal(product)}
                            className="p-2 text-primary hover:bg-blue-100/60 rounded-xl transition-colors font-semibold"
                            title="Edit Product"
                          >
                            <FiEdit3 className="text-base" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirmProduct(product)}
                            className="p-2 text-red-500 hover:bg-red-100/60 rounded-xl transition-colors font-semibold"
                            title="Delete Product"
                          >
                            <FiTrash2 className="text-base" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Grid Card View */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-[#E4E7EC] shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
            >
              <div className="p-5">
                {/* Thumbnail & Badges */}
                <div className="relative h-44 rounded-xl bg-[#F7F8FA] border border-gray-200 overflow-hidden flex items-center justify-center mb-4">
                  <img
                    src={product.image || '/hero-products/prod-1.png'}
                    alt={product.name}
                    className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = '/hero-products/prod-1.png';
                    }}
                  />
                  {product.badge && (
                    <span
                      className={`absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white uppercase tracking-wider ${
                        product.badgeColor || 'bg-blue-600'
                      }`}
                    >
                      {product.badge}
                    </span>
                  )}
                  <span
                    className={`absolute bottom-2.5 right-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      product.stock === 'in-stock'
                        ? 'bg-emerald-100 text-emerald-800'
                        : product.stock === 'low-stock'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {product.stock.replace('-', ' ')}
                  </span>
                </div>

                <span className="text-[10px] font-bold uppercase tracking-wider text-primary block mb-1">
                  {product.category}
                </span>
                <h3 className="font-extrabold text-secondary text-sm line-clamp-1 mb-1 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-xs text-body line-clamp-1 mb-3">{product.grade}</p>

                <div className="flex items-baseline justify-between pt-2 border-t border-gray-100">
                  <span className="text-base font-black text-primary">{product.price}</span>
                  <span className="text-[11px] font-medium text-gray-500">{product.moq}</span>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="p-3 bg-gray-50/80 border-t border-gray-100 flex items-center justify-between gap-2">
                <select
                  value={product.stock}
                  onChange={(e) => handleQuickStockChange(product.id, e.target.value)}
                  className="px-2 py-1 bg-white border border-gray-200 rounded-lg text-[11px] font-bold text-secondary focus:outline-none"
                >
                  <option value="in-stock">In Stock</option>
                  <option value="low-stock">Low Stock</option>
                  <option value="out-of-stock">Out of Stock</option>
                </select>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEditModal(product)}
                    className="p-1.5 text-primary hover:bg-blue-100 rounded-lg transition-colors"
                    title="Edit Product"
                  >
                    <FiEdit3 className="text-base" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirmProduct(product)}
                    className="p-1.5 text-red-500 hover:bg-red-100 rounded-lg transition-colors"
                    title="Delete Product"
                  >
                    <FiTrash2 className="text-base" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Enhanced Add / Edit Product Modal */}
      <AnimatePresence>
        {(isAddModalOpen || editingProduct) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-gray-100 my-6 flex flex-col max-h-[92vh] overflow-hidden"
            >
              {/* Modal Header */}
              <div className="px-6 sm:px-8 py-5 bg-[#0B1B33] text-white flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/40 border border-white/20 flex items-center justify-center text-white text-lg">
                    <FiBox />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-black text-white">
                      {editingProduct ? `Edit: ${editingProduct.name}` : 'Create New Polymer Product'}
                    </h3>
                    <p className="text-xs text-blue-200">
                      Configure specifications, pricing, local image uploads, and inventory status.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingProduct(null);
                  }}
                  className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                >
                  <FiX className="text-xl" />
                </button>
              </div>

              {/* Navigation Tabs */}
              <div className="px-6 sm:px-8 bg-gray-50 border-b border-gray-200 flex items-center gap-2 overflow-x-auto flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveFormTab('general')}
                  className={`py-3.5 px-4 text-xs font-bold border-b-2 whitespace-nowrap transition-all flex items-center gap-2 ${
                    activeFormTab === 'general'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-secondary'
                  }`}
                >
                  <FiBox />
                  <span>1. General &amp; Pricing</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveFormTab('material')}
                  className={`py-3.5 px-4 text-xs font-bold border-b-2 whitespace-nowrap transition-all flex items-center gap-2 ${
                    activeFormTab === 'material'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-secondary'
                  }`}
                >
                  <FiLayers />
                  <span>2. Material &amp; Stock</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveFormTab('media')}
                  className={`py-3.5 px-4 text-xs font-bold border-b-2 whitespace-nowrap transition-all flex items-center gap-2 ${
                    activeFormTab === 'media'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-secondary'
                  }`}
                >
                  <FiImage />
                  <span>3. Image &amp; Media Upload</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveFormTab('specs')}
                  className={`py-3.5 px-4 text-xs font-bold border-b-2 whitespace-nowrap transition-all flex items-center gap-2 ${
                    activeFormTab === 'specs'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-secondary'
                  }`}
                >
                  <FiSliders />
                  <span>4. Technical Specs</span>
                </button>
              </div>

              {/* Modal Body / Tab Content */}
              <form
                onSubmit={editingProduct ? handleEditSubmit : handleAddSubmit}
                className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-xs"
              >
                {/* TAB 1: GENERAL & PRICING */}
                {activeFormTab === 'general' && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-5"
                  >
                    <div>
                      <label className="block text-gray-700 font-bold uppercase tracking-wider mb-1.5">
                        Product Title *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Precision Measuring Bucket 20L"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full px-4 py-3 bg-[#F7F8FA] border rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary ${
                          formErrors.name ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200'
                        }`}
                      />
                      {formErrors.name && (
                        <p className="text-red-500 text-[11px] mt-1 font-semibold">{formErrors.name}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 font-bold uppercase tracking-wider mb-1.5">
                          Polymer Category *
                        </label>
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="w-full px-4 py-3 bg-[#F7F8FA] border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary font-semibold text-secondary"
                        >
                          {categories.map((cat) => (
                            <option key={cat.id} value={cat.name}>
                              {cat.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-700 font-bold uppercase tracking-wider mb-1.5">
                          Wholesale Price (FOB / Unit) *
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            placeholder="e.g. $9.00 / unit or ₹720 / unit"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            className={`w-full px-4 py-3 bg-[#F7F8FA] border rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary ${
                              formErrors.price ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200'
                            }`}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 font-bold uppercase tracking-wider mb-1.5">
                          Minimum Order Quantity (MOQ)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. MOQ 100 pcs"
                          value={formData.moq}
                          onChange={(e) => setFormData({ ...formData, moq: e.target.value })}
                          className="w-full px-4 py-3 bg-[#F7F8FA] border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {MOQ_PRESETS.map((m) => (
                            <button
                              key={m}
                              type="button"
                              onClick={() => setFormData({ ...formData, moq: m })}
                              className="px-2 py-0.5 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-600 text-[10px] font-semibold transition-colors"
                            >
                              {m}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-gray-700 font-bold uppercase tracking-wider mb-1.5">
                          Promotional Discount (%)
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            min="0"
                            max="90"
                            placeholder="e.g. 15 for 15% off"
                            value={formData.discountPercent}
                            onChange={(e) =>
                              setFormData({ ...formData, discountPercent: e.target.value })
                            }
                            className="w-full px-4 py-3 bg-[#F7F8FA] border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                        <p className="text-gray-400 text-[11px] mt-1">
                          Displays a volume discount ribbon on public product card.
                        </p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-bold uppercase tracking-wider mb-1.5">
                        Product Description &amp; Applications *
                      </label>
                      <textarea
                        rows={4}
                        required
                        placeholder="Comprehensive description of the product, durability, intended industrial use cases, stackability, and materials..."
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className={`w-full px-4 py-3 bg-[#F7F8FA] border rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary leading-relaxed ${
                          formErrors.description ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200'
                        }`}
                      />
                    </div>
                  </motion.div>
                )}

                {/* TAB 2: MATERIAL & STOCK */}
                {activeFormTab === 'material' && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-5"
                  >
                    <div>
                      <label className="block text-gray-700 font-bold uppercase tracking-wider mb-1.5">
                        Raw Material Polymer Grade
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Food & Industrial Grade HDPE"
                        value={formData.grade}
                        onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                        className="w-full px-4 py-3 bg-[#F7F8FA] border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <div className="mt-2">
                        <span className="text-[11px] text-gray-400 block mb-1">Quick Grade Suggestions:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {GRADE_SUGGESTIONS.map((g) => (
                            <button
                              key={g}
                              type="button"
                              onClick={() => setFormData({ ...formData, grade: g })}
                              className="px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-primary/10 hover:text-primary text-gray-700 text-[11px] font-medium transition-colors"
                            >
                              {g}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 font-bold uppercase tracking-wider mb-1.5">
                          Stock Availability Status *
                        </label>
                        <select
                          value={formData.stock}
                          onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                          className="w-full px-4 py-3 bg-[#F7F8FA] border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary font-bold text-secondary"
                        >
                          <option value="in-stock">🟢 In Stock (Normal Factory Supply)</option>
                          <option value="low-stock">🟡 Low Stock (Replenishing Batch)</option>
                          <option value="out-of-stock">🔴 Out of Stock (Made-to-Order Only)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-700 font-bold uppercase tracking-wider mb-1.5">
                          Quality Rating Score
                        </label>
                        <input
                          type="text"
                          placeholder="5.0"
                          value={formData.rating}
                          onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                          className="w-full px-4 py-3 bg-[#F7F8FA] border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>

                    {/* Badge & Color */}
                    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-4">
                      <h4 className="font-bold text-secondary uppercase tracking-wider text-[11px] flex items-center gap-2">
                        <FiTag className="text-primary" />
                        <span>Promotional Ribbon Badge</span>
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-600 font-bold mb-1">Badge Text</label>
                          <input
                            type="text"
                            placeholder="e.g. Best Seller, Industrial Grade, Dual Scale"
                            value={formData.badge}
                            onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>

                        <div>
                          <label className="block text-gray-600 font-bold mb-1">Color Palette</label>
                          <div className="flex items-center gap-2 mt-1">
                            {BADGE_COLORS.map((c) => (
                              <button
                                key={c.class}
                                type="button"
                                onClick={() => setFormData({ ...formData, badgeColor: c.class })}
                                className={`w-7 h-7 rounded-full ${c.class} transition-all ${
                                  formData.badgeColor === c.class
                                    ? 'ring-4 ring-offset-2 ring-primary scale-110'
                                    : 'opacity-70 hover:opacity-100'
                                }`}
                                title={c.label}
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      {formData.badge && (
                        <div className="pt-2 flex items-center gap-2">
                          <span className="text-[11px] text-gray-500 font-medium">Live Badge Preview:</span>
                          <span
                            className={`px-3 py-0.5 rounded-full text-xs font-bold text-white uppercase ${formData.badgeColor}`}
                          >
                            {formData.badge}
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* TAB 3: IMAGE & MEDIA UPLOAD */}
                {activeFormTab === 'media' && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    {/* Direct Local File Upload Dropzone */}
                    <div>
                      <label className="block text-gray-700 font-bold uppercase tracking-wider mb-2">
                        Direct Local Image File Upload
                      </label>

                      {/* Hidden File Input */}
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/png, image/jpeg, image/webp, image/svg+xml"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleImageFileUpload(e.target.files[0]);
                          }
                        }}
                      />

                      <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={`p-8 border-2 border-dashed rounded-2xl text-center cursor-pointer transition-all ${
                          isDraggingFile
                            ? 'border-primary bg-blue-50/60 scale-[1.01]'
                            : 'border-gray-300 hover:border-primary hover:bg-blue-50/30 bg-[#F7F8FA]'
                        }`}
                      >
                        <div className="w-14 h-14 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center justify-center mx-auto mb-3 text-primary text-2xl">
                          <FiUploadCloud />
                        </div>
                        <p className="text-sm font-bold text-secondary">
                          Click to browse image or drag and drop from your computer
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          Supports high-res PNG, JPG, WEBP, and SVG formats
                        </p>
                        {uploadedFileName && (
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-full text-xs font-bold mt-3">
                            <FiCheckCircle />
                            <span>Uploaded: {uploadedFileName}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Live Image Preview & Custom URL */}
                    <div className="p-5 bg-gray-50 rounded-2xl border border-gray-200 flex flex-col sm:flex-row items-center gap-6">
                      <div className="w-28 h-28 rounded-2xl bg-white border border-gray-200 p-2 shadow-sm flex-shrink-0 flex items-center justify-center overflow-hidden">
                        <img
                          src={formData.image || '/hero-products/prod-1.png'}
                          alt="Product Preview"
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.target.src = '/hero-products/prod-1.png';
                          }}
                        />
                      </div>

                      <div className="flex-1 min-w-0 space-y-3 w-full">
                        <div>
                          <label className="block text-gray-600 font-bold mb-1">Image Source Path / URL</label>
                          <input
                            type="text"
                            value={formData.image}
                            onChange={(e) => {
                              setFormData({ ...formData, image: e.target.value });
                              setUploadedFileName('');
                            }}
                            placeholder="/hero-products/prod-1.png or https://..."
                            className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>

                        <div>
                          <span className="text-[11px] text-gray-400 block mb-1">Or choose factory library preset:</span>
                          <div className="flex flex-wrap gap-1.5">
                            {PRESET_IMAGES.map((img) => (
                              <button
                                key={img.url}
                                type="button"
                                onClick={() => {
                                  setFormData({ ...formData, image: img.url });
                                  setUploadedFileName('');
                                }}
                                className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold border transition-all ${
                                  formData.image === img.url
                                    ? 'bg-primary text-white border-primary shadow-xs'
                                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
                                }`}
                              >
                                {img.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* TAB 4: TECHNICAL SPECIFICATIONS */}
                {activeFormTab === 'specs' && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-secondary uppercase tracking-wider text-[11px]">
                          Technical Specification Parameters
                        </h4>
                        <p className="text-xs text-body">
                          Key engineering metrics displayed on the product technical datasheet.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={handleAddSpecRow}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-primary font-bold text-xs transition-colors"
                      >
                        <FiPlusCircle />
                        <span>Add Parameter</span>
                      </button>
                    </div>

                    <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                      {formData.specifications.map((spec, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-xl border border-gray-200 group"
                        >
                          <input
                            type="text"
                            placeholder="Specification Key (e.g. Volume Capacity)"
                            value={spec.key}
                            onChange={(e) => handleSpecChange(index, 'key', e.target.value)}
                            className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                          <input
                            type="text"
                            placeholder="Value (e.g. 20 Liters / 5.3 Gallons)"
                            value={spec.value}
                            onChange={(e) => handleSpecChange(index, 'value', e.target.value)}
                            className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveSpecRow(index)}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                            title="Remove row"
                          >
                            <FiMinusCircle className="text-base" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Sticky Action Footer */}
                <div className="pt-5 border-t border-gray-100 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    {activeFormTab !== 'general' && (
                      <button
                        type="button"
                        onClick={() => {
                          if (activeFormTab === 'specs') setActiveFormTab('media');
                          else if (activeFormTab === 'media') setActiveFormTab('material');
                          else if (activeFormTab === 'material') setActiveFormTab('general');
                        }}
                        className="px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-secondary font-bold transition-colors"
                      >
                        &larr; Back
                      </button>
                    )}

                    {activeFormTab !== 'specs' && (
                      <button
                        type="button"
                        onClick={() => {
                          if (activeFormTab === 'general') setActiveFormTab('material');
                          else if (activeFormTab === 'material') setActiveFormTab('media');
                          else if (activeFormTab === 'media') setActiveFormTab('specs');
                        }}
                        className="px-4 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-primary font-bold transition-colors"
                      >
                        Next Step &rarr;
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddModalOpen(false);
                        setEditingProduct(null);
                      }}
                      className="px-5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-secondary font-bold transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-primary text-white font-bold hover:bg-primary-hover transition-colors shadow-lg shadow-primary/20 flex items-center gap-2"
                    >
                      <FiCheckCircle />
                      <span>{editingProduct ? 'Save Product Changes' : 'Publish Product'}</span>
                    </button>
                  </div>
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
              className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-gray-100 text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4 text-2xl">
                <FiTrash2 />
              </div>
              <h3 className="text-lg font-black text-secondary mb-2">
                Delete "{deleteConfirmProduct.name}"?
              </h3>
              <p className="text-xs text-body mb-6 leading-relaxed">
                Are you sure you want to permanently remove this product from the B&amp;B catalog? This action will remove it from the public website immediately.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteConfirmProduct(null)}
                  className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-secondary rounded-xl font-bold text-xs transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-xs transition-colors shadow-md shadow-red-600/20"
                >
                  Yes, Delete
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
