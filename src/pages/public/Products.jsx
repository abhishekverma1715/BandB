import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  FiSearch, FiPackage, FiBarChart2, FiX, FiCheckCircle,
  FiSliders, FiArrowRight
} from 'react-icons/fi';
import ProductCard from '../../components/home/ProductCard.jsx';
import useScrollReveal from '../../components/home/hooks/useScrollReveal.jsx';

// Extended B2B Wholesale Catalog with rich metadata for ProductCard
const wholesaleProducts = [
  {
    id: 1,
    name: 'BPA-Free Sports Bottle & Container',
    category: 'Buckets',
    grade: '100% Virgin Tritan / PP',
    price: '$18.50 / unit',
    msrp: '$38.00 MSRP',
    moq: 'MOQ 100 pcs',
    rating: '4.9',
    badge: 'Best Seller',
    badgeColor: 'bg-blue-600',
    image: '/hero-products/Gemini_Generated_Image_c6lfquc6lfquc6lf.png',
    slug: 'bpa-free-sports-bottle',
    stock: 'in-stock',
    discountPercent: 22
  },
  {
    id: 2,
    name: 'Heavy-Duty Modular Industrial Stand',
    category: 'Furniture',
    grade: 'Reinforced High-Impact ABS',
    price: '$45.00 / unit',
    msrp: '$89.00 MSRP',
    moq: 'MOQ 50 pcs',
    rating: '5.0',
    badge: 'Industrial Grade',
    badgeColor: 'bg-emerald-600',
    image: '/hero-products/Gemini_Generated_Image_key2aykey2aykey2.png',
    slug: 'heavy-duty-modular-stand',
    stock: 'in-stock',
    discountPercent: 15
  },
  {
    id: 3,
    name: 'Ergonomic Baby Booster Chair',
    category: 'Baby',
    grade: 'Non-Toxic Virgin PP/ABS',
    price: '$32.00 / unit',
    msrp: '$65.00 MSRP',
    moq: 'MOQ 100 pcs',
    rating: '4.8',
    badge: 'Certified Safe',
    badgeColor: 'bg-amber-600',
    image: '/hero-products/Gemini_Generated_Image_iz86x8iz86x8iz86.png',
    slug: 'ergonomic-baby-booster-chair',
    stock: 'low-stock',
    discountPercent: 12
  },
  {
    id: 4,
    name: 'Industrial Storage & Logistics Crate',
    category: 'Crates',
    grade: 'High-Density Polyethylene (HDPE)',
    price: '$24.00 / unit',
    msrp: '$49.00 MSRP',
    moq: 'MOQ 200 pcs',
    rating: '4.9',
    badge: 'High Durability',
    badgeColor: 'bg-purple-600',
    image: '/hero-products/Gemini_Generated_Image_axhokkaxhokkaxho.png',
    slug: 'industrial-storage-crate',
    stock: 'in-stock',
    discountPercent: 20
  },
  {
    id: 5,
    name: 'Heavy-Duty Polymer Container 50L',
    category: 'Buckets',
    grade: '100% Virgin HDPE Granules',
    price: '$28.50 / unit',
    msrp: '$58.00 MSRP',
    moq: 'MOQ 150 pcs',
    rating: '4.9',
    badge: 'Reinforced Ribs',
    badgeColor: 'bg-indigo-600',
    image: '/hero-products/Gemini_Generated_Image_1040oi1040oi1040.png',
    slug: 'heavy-duty-polymer-container',
    stock: 'in-stock',
    discountPercent: 18
  },
  {
    id: 6,
    name: 'Commercial Utility Basin 35L',
    category: 'Tubs',
    grade: 'Ultra-Grip Polymer Blend',
    price: '$21.00 / unit',
    msrp: '$44.00 MSRP',
    moq: 'MOQ 100 pcs',
    rating: '4.7',
    badge: 'Chemical Resistant',
    badgeColor: 'bg-teal-600',
    image: '/hero-products/Gemini_Generated_Image_ctb1j3ctb1j3ctb1.png',
    slug: 'commercial-utility-basin',
    stock: 'in-stock',
    discountPercent: 14
  },
  {
    id: 7,
    name: 'Precision Measuring Bucket 20L',
    category: 'Buckets',
    grade: 'Food & Industrial Grade HDPE',
    price: '$15.00 / unit',
    msrp: '$29.00 MSRP',
    moq: 'MOQ 250 pcs',
    rating: '5.0',
    badge: 'Dual Scale',
    badgeColor: 'bg-blue-600',
    image: '/hero-products/Gemini_Generated_Image_vewpifvewpifvewp.png',
    slug: 'precision-measuring-bucket',
    stock: 'made-to-order'
  },
  {
    id: 8,
    name: 'Ergonomic Utility Bucket with Spout',
    category: 'Buckets',
    grade: 'Premium Injection Molded PP',
    price: '$14.50 / unit',
    msrp: '$28.00 MSRP',
    moq: 'MOQ 300 pcs',
    rating: '4.8',
    badge: 'Ergonomic Grip',
    badgeColor: 'bg-rose-600',
    image: '/hero-products/Gemini_Generated_Image_p20xlxp20xlxp20x.png',
    slug: 'ergonomic-utility-bucket',
    stock: 'in-stock',
    discountPercent: 15
  },
  {
    id: 9,
    name: 'Stackable Produce & Harvesting Crate',
    category: 'Crates',
    grade: 'Ventilated Food Grade HDPE',
    price: '$19.00 / unit',
    msrp: '$38.00 MSRP',
    moq: 'MOQ 200 pcs',
    rating: '4.9',
    badge: 'Agri-Grade',
    badgeColor: 'bg-emerald-600',
    image: '/hero-products/Gemini_Generated_Image_axhokkaxhokkaxho.png',
    slug: 'stackable-produce-crate',
    stock: 'in-stock',
    discountPercent: 19
  },
  {
    id: 10,
    name: 'Commercial Washroom Utility Tub 60L',
    category: 'Tubs',
    grade: 'Impact-Resistant Polypropylene blend',
    price: '$34.00 / unit',
    msrp: '$68.00 MSRP',
    moq: 'MOQ 80 pcs',
    rating: '4.8',
    badge: 'Heavy Duty',
    badgeColor: 'bg-cyan-600',
    image: '/hero-products/Gemini_Generated_Image_ctb1j3ctb1j3ctb1.png',
    slug: 'commercial-washroom-utility-tub',
    stock: 'in-stock',
    discountPercent: 16
  },
  {
    id: 11,
    name: 'Multi-Tier Display & Warehouse Stand',
    category: 'Furniture',
    grade: 'Reinforced Structural Polymer',
    price: '$52.00 / unit',
    msrp: '$110.00 MSRP',
    moq: 'MOQ 40 pcs',
    rating: '5.0',
    badge: 'High Load',
    badgeColor: 'bg-blue-700',
    image: '/hero-products/Gemini_Generated_Image_key2aykey2aykey2.png',
    slug: 'multi-tier-display-stand',
    stock: 'in-stock',
    discountPercent: 25
  },
  {
    id: 12,
    name: 'Hygienic Toddler Step Stool & Seat',
    category: 'Baby',
    grade: '100% Virgin Anti-Slip PP',
    price: '$16.00 / unit',
    msrp: '$32.00 MSRP',
    moq: 'MOQ 150 pcs',
    rating: '4.9',
    badge: 'BPA Free',
    badgeColor: 'bg-amber-600',
    image: '/hero-products/Gemini_Generated_Image_iz86x8iz86x8iz86.png',
    slug: 'hygienic-toddler-step-stool',
    stock: 'in-stock',
    discountPercent: 14
  }
];

const categories = ['All', 'Buckets', 'Furniture', 'Tubs', 'Baby', 'Crates'];

const Products = () => {
  const sectionRef = useScrollReveal({ itemSelector: '.product-item', y: 32, rotateX: -6 });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [compareList, setCompareList] = useState([]);

  const filteredProducts = useMemo(() => {
    return wholesaleProducts.filter((product) => {
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
      if (prev.length >= 4) return prev; // cap comparison tray at 4 items
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

      <div className="pt-28 pb-24 min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
        {/* Editorial Hero Banner with Factory Background Image */}
        <div className="relative py-20 sm:py-24 mb-12 border-b border-gray-800 overflow-hidden">
          {/* Background Image */}
          <img
            src="/catalog-header-bg.jpg"
            alt="B&B Plastics Manufacturing Line"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          {/* Dark Premium Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/85 to-slate-900/60" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider bg-primary/25 text-blue-300 border border-primary/40 mb-5 shadow-sm">
              <FiSliders className="text-base" />
              <span>Direct Factory Ordering Desk</span>
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-5 leading-tight">
              B&amp;B Wholesale <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-primary">Polymer Catalog</span>
            </h1>
            <p className="text-gray-200 max-w-3xl text-base sm:text-lg lg:text-xl leading-relaxed font-medium">
              Precision injection-molded products engineered from 100% virgin polymer resins. Filter by category, verify FOB bulk discount tiers, and request instant OEM quotations.
            </p>
          </div>
        </div>

        <div ref={sectionRef} className="container mx-auto px-4 max-w-7xl">
          {/* Search & Filter Bar */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4.5 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
                    selectedCategory === cat
                      ? 'bg-primary text-white shadow-md shadow-primary/25 scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="text"
                placeholder="Search product name or grade..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm text-secondary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Catalog Grid using Interactive ProductCard */}
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
              <div className="col-span-full text-center py-24 bg-white rounded-3xl border border-gray-200">
                <FiPackage className="text-5xl text-gray-300 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-secondary">No matching wholesale products found</h3>
                <p className="text-gray-500 text-sm mt-1">Try adjusting your search filter or clearing keywords.</p>
              </div>
            )}
          </div>
        </div>

        {/* Floating Compare Tray */}
        {compareList.length > 0 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-secondary text-white rounded-2xl shadow-2xl px-6 py-4 flex items-center gap-5 max-w-[92vw]">
            <div className="flex items-center gap-2 font-semibold text-sm">
              <FiBarChart2 />
              <span>
                {compareList.length} product{compareList.length > 1 ? 's' : ''} selected
              </span>
            </div>
            <button className="px-4 py-2 rounded-lg bg-primary hover:bg-blue-700 text-sm font-bold transition-colors">
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
