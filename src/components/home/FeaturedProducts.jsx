import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiBarChart2, FiX } from 'react-icons/fi';
import ProductCard from './ProductCard';
import useScrollReveal from './hooks/useScrollReveal';

// Same catalog as your carousel, extended with stock + discount fields.
// These two new fields are optional on ProductCard, so nothing breaks
// if a product omits them.
const productsData = [
  { id: 1, name: 'BPA-Free Sports Bottle & Container', category: 'Food Grade Polymer', grade: '100% Virgin Tritan / PP', price: '$18.50 / unit', moq: 'MOQ 100 pcs', rating: '4.9', badge: 'Best Seller', badgeColor: 'bg-blue-600', image: '/hero-products/Gemini_Generated_Image_c6lfquc6lfquc6lf.png', slug: 'bpa-free-sports-bottle', stock: 'in-stock', discountPercent: 22 },
  { id: 2, name: 'Heavy-Duty Modular Industrial Stand', category: 'Industrial Molding', grade: 'Reinforced High-Impact ABS', price: '$45.00 / unit', moq: 'MOQ 50 pcs', rating: '5.0', badge: 'Industrial Grade', badgeColor: 'bg-emerald-600', image: '/hero-products/Gemini_Generated_Image_key2aykey2aykey2.png', slug: 'heavy-duty-modular-stand', stock: 'in-stock' },
  { id: 3, name: 'Ergonomic Baby Booster Chair', category: 'Child Safety Polymer', grade: 'Non-Toxic Virgin PP/ABS', price: '$32.00 / unit', moq: 'MOQ 100 pcs', rating: '4.8', badge: 'Certified Safe', badgeColor: 'bg-amber-600', image: '/hero-products/Gemini_Generated_Image_iz86x8iz86x8iz86.png', slug: 'ergonomic-baby-booster-chair', stock: 'low-stock', discountPercent: 12 },
  { id: 4, name: 'Industrial Storage & Logistics Crate', category: 'Heavy-Duty Containers', grade: 'High-Density Polyethylene', price: '$24.00 / unit', moq: 'MOQ 200 pcs', rating: '4.9', badge: 'High Durability', badgeColor: 'bg-purple-600', image: '/hero-products/Gemini_Generated_Image_axhokkaxhokkaxho.png', slug: 'industrial-storage-crate', stock: 'in-stock' },
  { id: 5, name: 'Heavy-Duty Polymer Container 50L', category: 'Heavy-Duty Containers', grade: '100% Virgin HDPE Granules', price: '$28.50 / unit', moq: 'MOQ 150 pcs', rating: '4.9', badge: 'Reinforced Ribs', badgeColor: 'bg-indigo-600', image: '/hero-products/Gemini_Generated_Image_1040oi1040oi1040.png', slug: 'heavy-duty-polymer-container', stock: 'in-stock', discountPercent: 18 },
  { id: 6, name: 'Commercial Utility Basin 35L', category: 'Heavy-Duty Containers', grade: 'Ultra-Grip Polymer Blend', price: '$21.00 / unit', moq: 'MOQ 100 pcs', rating: '4.7', badge: 'Chemical Resistant', badgeColor: 'bg-teal-600', image: '/hero-products/Gemini_Generated_Image_ctb1j3ctb1j3ctb1.png', slug: 'commercial-utility-basin', stock: 'in-stock' },
  { id: 7, name: 'Precision Measuring Bucket 20L', category: 'Specialty Liquid Container', grade: 'Food & Industrial Grade HDPE', price: '$15.00 / unit', moq: 'MOQ 250 pcs', rating: '5.0', badge: 'Dual Scale', badgeColor: 'bg-blue-600', image: '/hero-products/Gemini_Generated_Image_vewpifvewpifvewp.png', slug: 'precision-measuring-bucket', stock: 'made-to-order' },
  { id: 8, name: 'Ergonomic Utility Bucket with Spout', category: 'Heavy-Duty Containers', grade: 'Premium Injection Molded PP', price: '$14.50 / unit', moq: 'MOQ 300 pcs', rating: '4.8', badge: 'Ergonomic Grip', badgeColor: 'bg-rose-600', image: '/hero-products/Gemini_Generated_Image_p20xlxp20xlxp20x.png', slug: 'ergonomic-utility-bucket', stock: 'in-stock', discountPercent: 15 },
];

const categories = ['All', 'Heavy-Duty Containers', 'Industrial Molding', 'Food Grade Polymer', 'Child Safety Polymer', 'Specialty Liquid Container'];

const FeaturedProductsGrid = () => {
  const sectionRef = useScrollReveal({ itemSelector: '.product-item', y: 34, rotateX: -6 });
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
      if (prev.length >= 4) return prev; // cap compare tray at 4
      return [...prev, product];
    });
  };

  const handleRequestQuote = (product) => {
    window.location.href = `/contact?product=${encodeURIComponent(product.name)}`;
  };

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/10 text-primary mb-3">
            Wholesale Catalog
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-secondary">
            Featured B2B <span className="text-primary">Products</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
            Bulk-ready inventory with transparent MOQ, live stock status, and factory-direct pricing.
          </p>
        </div>

        {/* Filters + cart summary */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === cat
                    ? 'bg-primary text-white shadow-md shadow-primary/25 scale-105'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-secondary'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {cart.length > 0 && (
            <div className="flex items-center gap-3 text-sm font-semibold text-secondary bg-white border border-gray-200 rounded-full px-5 py-2.5 shadow-sm">
              <span>{cart.length} item{cart.length > 1 ? 's' : ''} in cart</span>
              <Link to="/cart" className="text-primary hover:underline">View cart</Link>
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

        <div className="text-center mt-14">
          <Link
            to="/products"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-secondary text-white rounded-xl font-semibold hover:bg-primary transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <span>Explore Complete Wholesale Catalog</span>
            <FiArrowRight className="text-lg" />
          </Link>
        </div>
      </div>

      {/* Floating compare tray */}
      {compareList.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-secondary text-white rounded-2xl shadow-2xl px-6 py-4 flex items-center gap-5 max-w-[92vw]">
          <div className="flex items-center gap-2 font-semibold text-sm">
            <FiBarChart2 />
            <span>{compareList.length} product{compareList.length > 1 ? 's' : ''} selected</span>
          </div>
          <button className="px-4 py-2 rounded-lg bg-primary hover:bg-blue-700 text-sm font-bold transition-colors">
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