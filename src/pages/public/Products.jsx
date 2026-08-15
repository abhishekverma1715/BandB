import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  FiSearch, FiPackage, FiBarChart2, FiX,
  FiSliders
} from 'react-icons/fi';
import { productsData, productCategories } from '../../data/productsData.js';
import ProductCard from '../../components/home/ProductCard.jsx';
import useScrollReveal from '../../components/home/hooks/useScrollReveal.jsx';

const Products = () => {
  const sectionRef = useScrollReveal({ itemSelector: '.product-item', y: 32, rotateX: -6 });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [compareList, setCompareList] = useState([]);

  const filteredProducts = useMemo(() => {
    return productsData.filter((product) => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.grade.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  const handleAddToCart = (product) => {
    setCart((prev) => (prev.find((p) => p.id === product.id) ? prev : [...prev, product]));
  };

  const handleToggleWishlist = (product) => {
    setWishlist((prev) =>
      prev.find((p) => p.id === product.id)
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product]
    );
  };

  const handleToggleCompare = (product) => {
    setCompareList((prev) => {
      if (prev.find((p) => p.id === product.id)) {
        return prev.filter((p) => p.id !== product.id);
      }
      if (prev.length >= 4) return prev;
      return [...prev, product];
    });
  };

  const handleRequestQuote = (product) => {
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
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 bg-white p-6 rounded-2xl border border-[#E4E7EC] shadow-sm">
            <div className="flex flex-wrap items-center gap-2">
              {productCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4.5 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
                    selectedCategory === cat
                      ? 'bg-[#174A8B] text-white shadow-sm'
                      : 'bg-[#F0F4F8] text-[#101828] hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-80">
              <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="text"
                placeholder="Search product name or grade..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#F7F8FA] border border-[#E4E7EC] rounded-xl text-sm text-[#101828] focus:outline-none focus:border-[#174A8B] focus:ring-2 focus:ring-[#174A8B]/20 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div key={product.id} className="product-item">
                  <ProductCard
                    product={product}
                    onAddToCart={handleAddToCart}
                    onRequestQuote={handleRequestQuote}
                    onToggleWishlist={handleToggleWishlist}
                    onToggleCompare={handleToggleCompare}
                    isWishlisted={!!wishlist.find((p) => p.id === product.id)}
                    isCompared={!!compareList.find((p) => p.id === product.id)}
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
