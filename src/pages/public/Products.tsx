import React, { useState, useMemo, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { FiSearch, FiPackage, FiBarChart2, FiX, FiSliders } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '../../store/store.js';
import { selectAllProducts, fetchProducts } from '../../features/products/productsSlice.js';
import { selectCategoryNames, fetchCategories } from '../../features/categories/categoriesSlice.js';
import ProductCard from '../../components/home/ProductCard.js';
import useScrollReveal from '../../components/home/hooks/useScrollReveal.js';
import { Product } from '../../types/index.js';

const Products: React.FC = () => {
  const dispatch = useAppDispatch();
  const sectionRef = useScrollReveal({ itemSelector: '.product-item', y: 32, rotateX: -6 });
  const products = useAppSelector(selectAllProducts);
  const categories = useAppSelector(selectCategoryNames);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [, setCart] = useState<Product[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [compareList, setCompareList] = useState<Product[]>([]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.grade && product.grade.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (product.category && product.category.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchTerm]);

  const handleAddToCart = (product: Product) => {
    setCart((prev) => (prev.find((p) => p.id === product.id) ? prev : [...prev, product]));
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) =>
      prev.find((p) => p.id === product.id) ? prev.filter((p) => p.id !== product.id) : [...prev, product]
    );
  };

  const handleToggleCompare = (product: Product) => {
    setCompareList((prev) => {
      if (prev.find((p) => p.id === product.id)) {
        return prev.filter((p) => p.id !== product.id);
      }
      if (prev.length >= 4) return prev;
      return [...prev, product];
    });
  };

  const handleRequestQuote = (product: Product) => {
    window.location.href = `/contact?product=${encodeURIComponent(product.name)}`;
  };

  return (
    <>
      <Helmet>
        <title>Wholesale Polymer Catalog | B&B Plastic Factory-Direct</title>
        <meta
          name="description"
          content="Explore B&B Plastic's complete catalog of industrial buckets, modular stands, heavy-duty crates, and virgin polymer products. Transparent FOB pricing & bulk MOQs."
        />
      </Helmet>

      <div className="min-h-screen bg-[#F7F8FA] pb-24">
        <div className="relative pt-32 sm:pt-36 pb-20 sm:pb-24 mb-12 border-b border-[#0B1B33] overflow-hidden bg-[#0B1B33] w-full">
          <img
            src="/catalog-header-bg.jpg"
            alt="B&B Plastics Manufacturing Line"
            className="absolute inset-0 w-full h-full object-cover object-center min-w-full min-h-full opacity-85 filter brightness-[1.05] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1B33]/80 via-[#0B1B33]/50 to-[#0B1B33]/20" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1320px] relative z-10">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider bg-[#174A8B]/30 text-blue-300 border border-[#174A8B]/50 mb-5 shadow-sm">
              <FiSliders className="text-base" />
              <span>Direct Factory Ordering Desk</span>
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-5 leading-tight">
              B&amp;B Wholesale <span className="text-white">Polymer Catalog</span>
            </h1>
            <p className="text-slate-200 max-w-3xl text-base sm:text-lg lg:text-xl leading-relaxed font-normal">
              Precision injection-molded products engineered from 100% virgin polymer resins. Filter by category, verify FOB bulk discount tiers, and request instant OEM quotations.
            </p>
          </div>
        </div>

        <div ref={sectionRef} className="container mx-auto px-4 max-w-[1320px]">
          {/* Filter & Search Bar */}
          <div className="mb-10 bg-white rounded-2xl border border-[#E4E7EC] shadow-sm overflow-hidden">
            {/* Top row: Label + Search + Result count */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-5 pt-5 pb-4 border-b border-[#E4E7EC]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#174A8B] flex items-center justify-center flex-shrink-0">
                  <FiSliders className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#101828] leading-tight">Filter Products</h3>
                  <p className="text-xs text-[#667085] mt-0.5">
                    Showing{' '}
                    <span className="font-bold text-[#174A8B]">{filteredProducts.length}</span> of{' '}
                    <span className="font-semibold">{products.length}</span> products
                  </p>
                </div>
              </div>

              <div className="relative w-full sm:w-72 md:w-80">
                <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-base pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search product name or grade..."
                  className="w-full pl-10 pr-10 py-2.5 bg-[#F7F8FA] border border-[#E4E7EC] rounded-xl text-sm text-[#101828] placeholder-[#98A2B3] focus:outline-none focus:border-[#174A8B] focus:ring-2 focus:ring-[#174A8B]/20 transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                    aria-label="Clear search"
                  >
                    <FiX className="w-3 h-3 text-[#667085]" />
                  </button>
                )}
              </div>
            </div>

            {/* Category pills — horizontal scroll on mobile, wrap on desktop */}
            <div className="px-5 py-4">
              <div className="flex gap-2 overflow-x-auto pb-1 -mb-1 scrollbar-hide md:flex-wrap md:overflow-visible">
                {categories.map((cat) => {
                  const isActive = selectedCategory === cat;
                  const count = cat === 'All' ? products.length : products.filter((p) => p.category === cat).length;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 border-2 ${
                        isActive
                          ? 'bg-[#174A8B] text-white border-[#174A8B] shadow-md shadow-[#174A8B]/20'
                          : 'bg-[#F7F8FA] text-[#344054] border-transparent hover:bg-[#EEF2F6] hover:border-[#D0D5DD]'
                      }`}
                    >
                      <span>{cat}</span>
                      <span
                        className={`inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-[10px] font-extrabold leading-none ${
                          isActive ? 'bg-white/25 text-white' : 'bg-[#E4E7EC] text-[#667085]'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div key={product.id} className="product-item">
                  <ProductCard
                    product={product}
                    onRequestQuote={handleRequestQuote}
                    onToggleWishlist={handleToggleWishlist}
                    isWishlisted={Boolean(wishlist.find((p) => p.id === product.id))}
                  />
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-24 bg-white rounded-2xl border border-[#E4E7EC]">
                <FiPackage className="text-5xl text-gray-300 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-[#101828]">No matching wholesale products found</h3>
                <p className="text-[#667085] text-sm mt-1">Try adjusting your search filter or clearing keywords.</p>
              </div>
            )}
          </div>
        </div>

        {compareList.length > 0 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[#0B1B33] text-white rounded-2xl shadow-xl px-6 py-4 flex items-center gap-5 max-w-[92vw] border border-white/10">
            <div className="flex items-center gap-2 font-semibold text-sm">
              <FiBarChart2 />
              <span>
                {compareList.length} product{compareList.length > 1 ? 's' : ''} selected
              </span>
            </div>
            <button className="px-4 py-2 rounded-xl bg-[#174A8B] hover:bg-[#2563B5] text-sm font-semibold transition-colors">
              Compare Specs
            </button>
            <button
              onClick={() => setCompareList([])}
              aria-label="Clear comparison"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FiX />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Products;
