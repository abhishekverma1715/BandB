import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  FiCheckCircle, FiPackage, FiTruck, FiShield,
  FiArrowRight, FiMessageCircle, FiHeart, FiStar,
  FiAward
} from 'react-icons/fi';
import { productsData } from '../../data/productsData.js';
import ProductCard from '../../components/home/ProductCard.jsx';

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('specs');
  const [quantity, setQuantity] = useState(100);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Scroll to top on page load or slug change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  // Find product by slug or id
  const product = useMemo(() => {
    if (!slug) return productsData[0];
    const found = productsData.find(
      (p) => p.slug === slug || String(p.id) === slug
    );
    return found || productsData[0];
  }, [slug]);

  // Extract numeric price or fallback
  const basePriceNum = useMemo(() => {
    if (!product.price) return 150;
    const match = product.price.match(/\d+(\.\d+)?/);
    return match ? parseFloat(match[0]) * 80 : 150;
  }, [product]);

  // Parse MOQ number
  const moqNum = useMemo(() => {
    if (!product.moq) return 100;
    const match = product.moq.match(/\d+/);
    return match ? parseInt(match[0], 10) : 100;
  }, [product]);

  // Sync initial quantity with MOQ
  useEffect(() => {
    if (quantity < moqNum) {
      setQuantity(moqNum);
    }
  }, [moqNum]);

  // Dynamic Tier Calculation
  const discountTier = useMemo(() => {
    if (quantity >= 5000) return { discount: 0.15, label: '15% Off (Volume Tier 3)' };
    if (quantity >= 1000) return { discount: 0.10, label: '10% Off (Volume Tier 2)' };
    if (quantity >= 500) return { discount: 0.05, label: '5% Off (Volume Tier 1)' };
    return { discount: 0, label: 'Standard Wholesale Rate' };
  }, [quantity]);

  const unitPrice = useMemo(() => {
    return Math.round(basePriceNum * (1 - discountTier.discount));
  }, [basePriceNum, discountTier]);

  const totalEstimatedValue = useMemo(() => {
    return (unitPrice * quantity).toLocaleString('en-IN');
  }, [unitPrice, quantity]);

  // Related products from same category or general catalog
  const relatedProducts = useMemo(() => {
    return productsData
      .filter((p) => p.id !== product.id && p.category === product.category)
      .concat(productsData.filter((p) => p.id !== product.id))
      .slice(0, 4);
  }, [product]);

  const handleWhatsAppInquiry = () => {
    const message = `Hello B&B Plastics Team,\n\nI would like to request an official wholesale quotation for:\n- Product: ${product.name}\n- Category: ${product.category}\n- Grade: ${product.grade}\n- Quantity Required: ${quantity} units\n- Est. Unit Price: ₹${unitPrice}/unit\n\nPlease share availability and proforma invoice details.`;
    window.open(`https://wa.me/918808880012?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleRequestQuote = () => {
    navigate(`/contact?product=${encodeURIComponent(product.name)}&qty=${quantity}`);
  };

  return (
    <>
      <Helmet>
        <title>{product.name} | B&B Plastics Factory Direct</title>
        <meta
          name="description"
          content={`${product.name} - ${product.description} Factory-direct wholesale pricing, virgin polymer grade ${product.grade}, transparent MOQ tiers.`}
        />
      </Helmet>

      <div className="min-h-screen bg-[#F7F8FA] pb-24">
        {/* Editorial Breadcrumb & Header Banner */}
        <div className="relative pt-32 pb-14 mb-10 overflow-hidden bg-[#0B1B33] border-b border-[#0B1B33] w-full">
          <img
            src="/catalog-header-bg.jpg"
            alt="B&B Plastics Manufacturing Line"
            className="absolute inset-0 w-full h-full object-cover object-center min-w-full min-h-full opacity-85 filter brightness-[1.05] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1B33]/80 via-[#0B1B33]/50 to-[#0B1B33]/20" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1320px] relative z-10">
            <div className="text-xs sm:text-sm text-gray-300 mb-3 flex items-center flex-wrap gap-2 font-medium">
              <Link to="/" className="hover:text-blue-300 transition-colors">Home</Link>
              <span>/</span>
              <Link to="/products" className="hover:text-blue-300 transition-colors">Wholesale Catalog</Link>
              <span>/</span>
              <span className="text-[#174A8B] bg-white/10 px-2.5 py-0.5 rounded text-white font-semibold">
                {product.category}
              </span>
              <span>/</span>
              <span className="text-white font-bold truncate max-w-[200px] sm:max-w-none">{product.name}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              {product.name}
            </h1>
            <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-3xl font-normal">
              Engineered with {product.grade || '100% Virgin Polymer Resins'} for heavy-duty industrial and commercial performance.
            </p>
          </div>
        </div>

        {/* Main Product E-Commerce Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1320px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left Column: Visual Product Media Showcase (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="bg-white rounded-2xl border border-[#E4E7EC] shadow-sm p-6 relative overflow-hidden group">
                
                {/* Top Floating Badges */}
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                  {product.badge && (
                    <span className="bg-[#174A8B] text-white text-xs font-extrabold px-3 py-1 rounded-lg uppercase tracking-wider shadow-sm">
                      {product.badge}
                    </span>
                  )}
                  <span className="bg-[#16A36A] text-white text-[11px] font-bold px-3 py-1 rounded-lg shadow-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    In Stock &amp; Ready to Ship
                  </span>
                </div>

                {/* Wishlist Button */}
                <button
                  type="button"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 border border-[#E4E7EC] shadow-sm flex items-center justify-center transition-all ${
                    isWishlisted ? 'text-rose-500 fill-rose-500' : 'text-gray-400 hover:text-rose-500'
                  }`}
                  aria-label="Wishlist"
                >
                  <FiHeart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500' : ''}`} />
                </button>

                {/* Large Product Image (Full Cover View) */}
                <div className="w-full h-80 sm:h-96 rounded-xl overflow-hidden bg-[#F7F8FA] flex items-center justify-center relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                </div>

                {/* Micro Badges Row */}
                <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-[#E4E7EC] text-center">
                  <div className="bg-[#F7F8FA] p-2.5 rounded-xl border border-[#E4E7EC]">
                    <FiShield className="w-4 h-4 text-[#174A8B] mx-auto mb-1" />
                    <span className="text-[10px] font-bold text-[#101828] block">Virgin Polymer</span>
                  </div>
                  <div className="bg-[#F7F8FA] p-2.5 rounded-xl border border-[#E4E7EC]">
                    <FiAward className="w-4 h-4 text-[#174A8B] mx-auto mb-1" />
                    <span className="text-[10px] font-bold text-[#101828] block">ISO Certified</span>
                  </div>
                  <div className="bg-[#F7F8FA] p-2.5 rounded-xl border border-[#E4E7EC]">
                    <FiTruck className="w-4 h-4 text-[#174A8B] mx-auto mb-1" />
                    <span className="text-[10px] font-bold text-[#101828] block">FOB Dispatch</span>
                  </div>
                </div>
              </div>

              {/* B2B Factory Assurance Card */}
              <div className="bg-white rounded-2xl border border-[#E4E7EC] p-6 shadow-sm">
                <h4 className="font-bold text-[#101828] text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                  <FiCheckCircle className="text-[#16A36A]" />
                  <span>Factory Guarantee &amp; OEM Standards</span>
                </h4>
                <ul className="space-y-3 text-xs text-[#667085]">
                  <li className="flex items-start gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-[#F0F4F8] text-[#174A8B] flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">✓</span>
                    <span><strong>100% Virgin Resins:</strong> No degraded regrind content for maximum mechanical tensile strength.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-[#F0F4F8] text-[#174A8B] flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">✓</span>
                    <span><strong>Custom Masterbatch Colors:</strong> Available for orders exceeding 1,000 units.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-4 h-4 rounded-full bg-[#F0F4F8] text-[#174A8B] flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">✓</span>
                    <span><strong>In-Mold Labeling (IML):</strong> Custom corporate logo screen printing available.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column: Interactive Configuration & Wholesale Pricing (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              
              {/* Product Header & Overview */}
              <div className="bg-white rounded-2xl border border-[#E4E7EC] p-6 sm:p-8 shadow-sm">
                <div className="flex items-center justify-between gap-4 mb-3">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#174A8B] bg-[#F0F4F8] px-3 py-1 rounded-full border border-[#E2E8F0]">
                    {product.category}
                  </span>
                  <span className="text-xs text-[#667085] font-mono">
                    SKU: B2B-PLAST-0{product.id}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#101828] mb-3 leading-snug">
                  {product.name}
                </h2>

                {/* Rating & Grade Strip */}
                <div className="flex flex-wrap items-center gap-4 text-xs mb-6 pb-6 border-b border-[#E4E7EC]">
                  <div className="flex items-center gap-1 bg-amber-50 text-amber-800 px-2.5 py-1 rounded-lg border border-amber-200 font-bold">
                    <FiStar className="fill-amber-400 text-amber-500 w-3.5 h-3.5" />
                    <span>{product.rating || '4.9'} / 5.0 Rating</span>
                  </div>
                  <div className="text-[#667085]">
                    Material: <span className="font-semibold text-[#101828]">{product.grade || 'Virgin PP Resin'}</span>
                  </div>
                  <div className="text-[#667085]">
                    MOQ: <span className="font-semibold text-[#101828]">{moqNum} Units</span>
                  </div>
                </div>

                <p className="text-[#667085] text-sm sm:text-base leading-relaxed mb-6">
                  {product.description || 'Precision engineered injection-molded container manufactured from premium grade virgin polymer granules, ensuring high structural load tolerance and chemical durability.'}
                </p>

                {/* Interactive Volume Discount Tier Card */}
                <div className="bg-[#0B1B33] rounded-2xl p-6 text-white mb-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-white/10">
                    <div>
                      <span className="text-xs text-slate-300 font-semibold block uppercase tracking-wider">
                        Estimated Wholesale Unit Rate
                      </span>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-3xl sm:text-4xl font-black text-white">
                          ₹{unitPrice}
                        </span>
                        <span className="text-xs text-slate-300">/ unit (FOB Ex-Factory)</span>
                      </div>
                    </div>

                    <div className="bg-[#16A36A]/20 text-[#16A36A] border border-[#16A36A]/40 px-3.5 py-1.5 rounded-xl text-xs font-bold">
                      {discountTier.label}
                    </div>
                  </div>

                  {/* Discount Tiers Table */}
                  <div className="grid grid-cols-4 gap-2 text-center text-xs mb-6">
                    <div className={`p-2.5 rounded-xl border transition-all ${quantity < 500 ? 'bg-[#174A8B] border-white/30 text-white font-bold' : 'bg-white/5 border-white/10 text-slate-300'}`}>
                      <div className="text-[10px] opacity-75">MOQ - 499</div>
                      <div className="font-bold mt-0.5">Base Rate</div>
                    </div>
                    <div className={`p-2.5 rounded-xl border transition-all ${quantity >= 500 && quantity < 1000 ? 'bg-[#174A8B] border-white/30 text-white font-bold' : 'bg-white/5 border-white/10 text-slate-300'}`}>
                      <div className="text-[10px] opacity-75">500+ Units</div>
                      <div className="font-bold mt-0.5 text-[#16A36A]">5% OFF</div>
                    </div>
                    <div className={`p-2.5 rounded-xl border transition-all ${quantity >= 1000 && quantity < 5000 ? 'bg-[#174A8B] border-white/30 text-white font-bold' : 'bg-white/5 border-white/10 text-slate-300'}`}>
                      <div className="text-[10px] opacity-75">1,000+ Units</div>
                      <div className="font-bold mt-0.5 text-[#16A36A]">10% OFF</div>
                    </div>
                    <div className={`p-2.5 rounded-xl border transition-all ${quantity >= 5000 ? 'bg-[#174A8B] border-white/30 text-white font-bold' : 'bg-white/5 border-white/10 text-slate-300'}`}>
                      <div className="text-[10px] opacity-75">5,000+ Units</div>
                      <div className="font-bold mt-0.5 text-[#16A36A]">15% OFF</div>
                    </div>
                  </div>

                  {/* Quantity Counter & Slider Controls */}
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <span className="text-xs font-semibold text-slate-200">
                        Configure Order Quantity (Units):
                      </span>
                      
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setQuantity(Math.max(moqNum, quantity - 50))}
                          className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 text-white text-lg font-bold flex items-center justify-center transition-colors"
                        >
                          −
                        </button>
                        <input
                          type="number"
                          value={quantity}
                          onChange={(e) => setQuantity(Math.max(moqNum, parseInt(e.target.value) || moqNum))}
                          className="w-24 px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-center text-white font-bold text-base focus:outline-none focus:border-[#174A8B]"
                        />
                        <button
                          type="button"
                          onClick={() => setQuantity(quantity + 50)}
                          className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 text-white text-lg font-bold flex items-center justify-center transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Preset Buttons */}
                    <div className="flex items-center gap-2 pt-2">
                      <span className="text-[11px] text-slate-400">Quick Select:</span>
                      {[moqNum, 500, 1000, 2500, 5000].map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => setQuantity(preset)}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                            quantity === preset
                              ? 'bg-[#174A8B] text-white shadow-sm'
                              : 'bg-white/10 text-slate-300 hover:bg-white/20'
                          }`}
                        >
                          {preset}
                        </button>
                      ))}
                    </div>

                    {/* Total Value Summary */}
                    <div className="pt-4 border-t border-white/10 flex justify-between items-center text-sm">
                      <span className="text-slate-300 font-normal">Est. Order Value:</span>
                      <span className="text-xl font-bold text-white">₹{totalEstimatedValue}</span>
                    </div>
                  </div>
                </div>

                {/* Primary Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    type="button"
                    onClick={handleRequestQuote}
                    className="flex-1 py-4 px-6 rounded-xl bg-[#174A8B] hover:bg-[#2563B5] text-white font-bold text-sm sm:text-base transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Request Official Proforma Quote</span>
                    <FiArrowRight className="w-5 h-5" />
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsAppInquiry}
                    className="py-4 px-6 rounded-xl bg-[#16A36A] hover:bg-[#138A58] text-white font-bold text-sm sm:text-base transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <FiMessageCircle className="w-5 h-5" />
                    <span>WhatsApp Inquiry</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Specification Tabs Section */}
          <div className="mt-12 bg-white rounded-2xl border border-[#E4E7EC] p-6 sm:p-8 shadow-sm">
            <div className="flex gap-8 border-b border-[#E4E7EC] mb-8 overflow-x-auto">
              {[
                { id: 'specs', label: 'Technical Specifications' },
                { id: 'logistics', label: 'Packaging & Freight Logistics' },
                { id: 'oem', label: 'Custom OEM & Printing Support' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-4 font-bold text-base whitespace-nowrap transition-colors border-b-2 ${
                    activeTab === tab.id
                      ? 'border-[#174A8B] text-[#174A8B]'
                      : 'border-transparent text-[#667085] hover:text-[#101828]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab 1: Specifications */}
            {activeTab === 'specs' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-sm">
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-[#667085]">Raw Material Polymer:</span>
                  <span className="font-semibold text-[#101828]">{product.grade || '100% Virgin HDPE / PP'}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-[#667085]">Melt Flow Index (MFI):</span>
                  <span className="font-semibold text-[#101828]">8.0 - 12.0 g/10min</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-[#667085]">Minimum Order Quantity (MOQ):</span>
                  <span className="font-semibold text-[#101828]">{moqNum} Units</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-[#667085]">Tensile Yield Strength:</span>
                  <span className="font-semibold text-[#101828]">28 MPa</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-[#667085]">Color Options:</span>
                  <span className="font-semibold text-[#101828]">Blue, Red, Yellow, Green, White &amp; Custom</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="text-[#667085]">Operational Temperature:</span>
                  <span className="font-semibold text-[#101828]">-20°C to +80°C</span>
                </div>
              </div>
            )}

            {/* Tab 2: Logistics */}
            {activeTab === 'logistics' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div className="p-5 rounded-xl bg-[#F7F8FA] border border-[#E4E7EC]">
                  <h4 className="font-bold text-[#101828] mb-2 flex items-center gap-2">
                    <FiPackage className="text-[#174A8B]" /> Standard Nested Bundle Packaging
                  </h4>
                  <p className="text-[#667085] leading-relaxed text-xs">
                    Wrapped in heavy-duty protective LDPE film with reinforced corner guards for safe long-distance freight transport.
                  </p>
                </div>
                <div className="p-5 rounded-xl bg-[#F7F8FA] border border-[#E4E7EC]">
                  <h4 className="font-bold text-[#101828] mb-2 flex items-center gap-2">
                    <FiTruck className="text-[#174A8B]" /> Container Loading Capacity
                  </h4>
                  <p className="text-[#667085] leading-relaxed text-xs">
                    20ft Container: ~2,400 units | 40ft High-Cube Container: ~5,800 units. Direct loading from B&amp;B factory floor.
                  </p>
                </div>
              </div>
            )}

            {/* Tab 3: OEM */}
            {activeTab === 'oem' && (
              <div className="p-6 rounded-xl bg-[#F7F8FA] border border-[#E4E7EC] text-sm leading-relaxed text-[#667085]">
                <h4 className="font-bold text-[#101828] text-base mb-2">Custom OEM Mold &amp; Brand Printing Services</h4>
                <p className="mb-4 text-xs">
                  We support full custom branding for industrial buyers, corporate clients, and distributor networks.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold text-[#101828]">
                  <div className="p-3 bg-white rounded-lg border border-[#E4E7EC]">1. Screen Printing Logo</div>
                  <div className="p-3 bg-white rounded-lg border border-[#E4E7EC]">2. In-Mold Labeling (IML)</div>
                  <div className="p-3 bg-white rounded-lg border border-[#E4E7EC]">3. Custom Color Matching</div>
                </div>
              </div>
            )}
          </div>

          {/* Related Products Grid */}
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold text-[#174A8B] uppercase tracking-wider block">
                  Wholesale Recommendations
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#101828]">
                  Related Polymer Products
                </h3>
              </div>

              <Link
                to="/products"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-[#174A8B] hover:underline"
              >
                <span>View Full Catalog</span>
                <FiArrowRight />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relProduct) => (
                <ProductCard
                  key={relProduct.id}
                  product={relProduct}
                  onRequestQuote={() => navigate(`/contact?product=${encodeURIComponent(relProduct.name)}`)}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default ProductDetail;
