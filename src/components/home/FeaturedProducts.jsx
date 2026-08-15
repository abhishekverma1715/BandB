import { productsData, productCategories } from '../../data/productsData.js';
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiBarChart2, FiX } from 'react-icons/fi';
import ProductCard from './ProductCard';
import useScrollReveal from './hooks/useScrollReveal';

const FeaturedProductsGrid = () => {
  const sectionRef = useScrollReveal({ itemSelector: '.product-item', y: 30 });
  const [activeCategory, setActiveCategory] = useState('All');
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [compareList, setCompareList] = useState([]);

  const filtered = useMemo(
    () => (activeCategory === 'All' ? productsData : productsData.filter((p) => p.category === activeCategory)),
    [activeCategory]
  );

  const handleAddToCart = (product) => {
    setCart((prev) => (prev.find((p) => p.id === product.id) ? prev : [...prev, product]));
  };

  const handleToggleWishlist = (product) => {
    setWishlist((prev) =>
      prev.find((p) => p.id === product.id) ? prev.filter((p) => p.id !== product.id) : [...prev, product]
    );
  };

  const handleToggleCompare = (product) => {
    setCompareList((prev) => {
      if (prev.find((p) => p.id === product.id)) return prev.filter((p) => p.id !== product.id);
      if (prev.length >= 4) return prev;
      return [...prev, product];
    });
  };

  const handleRequestQuote = (product) => {
    window.location.href = `/contact?product=${encodeURIComponent(product.name)}`;
  };

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 bg-[#F7F8FA] relative border-t border-[#E4E7EC]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1320px]">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#F0F4F8] text-[#174A8B] border border-[#E2E8F0] mb-3">
            Wholesale Catalog
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 text-[#101828] tracking-tight">
            Featured B2B <span className="text-[#174A8B]">Products</span>
          </h2>
          <p className="text-[#667085] text-sm sm:text-base leading-relaxed font-normal">
            Bulk-ready inventory with transparent MOQ, live stock status, and factory-direct pricing.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          <div className="flex flex-wrap items-center justify-center gap-2.5 mx-auto">
            {productCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-[#174A8B] text-white shadow-sm'
                    : 'bg-white text-[#667085] hover:bg-gray-100 hover:text-[#101828] border border-[#E4E7EC]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {cart.length > 0 && (
            <div className="flex items-center gap-3 text-sm font-semibold text-[#101828] bg-white border border-[#E4E7EC] rounded-xl px-4 py-2 shadow-sm">
              <span>{cart.length} item{cart.length > 1 ? 's' : ''} in cart</span>
              <Link to="/cart" className="text-[#174A8B] hover:underline">View cart</Link>
            </div>
          )}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((product) => (
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
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/products"
            className="inline-flex items-center gap-2.5 px-7 py-3 bg-[#174A8B] hover:bg-[#2563B5] text-white rounded-xl font-semibold transition-all shadow-sm text-sm"
          >
            <span>Explore Complete Wholesale Catalog</span>
            <FiArrowRight className="text-base" />
          </Link>
        </div>
      </div>

      {/* Floating compare tray */}
      {compareList.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[#0B1B33] text-white rounded-xl shadow-xl px-5 py-3.5 flex items-center gap-4 max-w-[92vw] border border-white/10">
          <div className="flex items-center gap-2 font-semibold text-xs sm:text-sm">
            <FiBarChart2 />
            <span>{compareList.length} product{compareList.length > 1 ? 's' : ''} selected</span>
          </div>
          <button className="px-4 py-2 rounded-lg bg-[#174A8B] hover:bg-[#2563B5] text-xs font-semibold transition-colors">
            Compare Now
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
    </section>
  );
};

export default FeaturedProductsGrid;