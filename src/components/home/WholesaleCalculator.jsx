import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiDollarSign, FiTrendingDown, FiPackage, FiCheckCircle, FiArrowRight, FiSliders, FiClock } from 'react-icons/fi';

const productTiers = [
  {
    id: 'containers',
    name: 'Heavy-Duty Industrial Containers (50L)',
    basePrice: 28.50,
    msrp: 58.00,
    image: '/hero-products/Gemini_Generated_Image_1040oi1040oi1040.png',
    grade: '100% Virgin HDPE Granules',
    leadDays: 3
  },
  {
    id: 'bottles',
    name: 'BPA-Free Precision Sports Bottles (750ml)',
    basePrice: 18.50,
    msrp: 38.00,
    image: '/hero-products/Gemini_Generated_Image_c6lfquc6lfquc6lf.png',
    grade: '100% Virgin Food-Grade Tritan',
    leadDays: 2
  },
  {
    id: 'chairs',
    name: 'Ergonomic Commercial Booster & Utility Chairs',
    basePrice: 32.00,
    msrp: 68.00,
    image: '/hero-products/Gemini_Generated_Image_iz86x8iz86x8iz86.png',
    grade: 'Reinforced Impact PP / ABS',
    leadDays: 4
  },
  {
    id: 'crates',
    name: 'Ventilated Logistics & Agricultural Crates',
    basePrice: 24.00,
    msrp: 49.00,
    image: '/hero-products/Gemini_Generated_Image_axhokkaxhokkaxho.png',
    grade: 'High-Density Polyethylene',
    leadDays: 3
  }
];

const WholesaleCalculator = () => {
  const [selectedTier, setSelectedTier] = useState(productTiers[0]);
  const [quantity, setQuantity] = useState(500);

  // Calculate volume discount tier
  const getDiscountMultiplier = (qty) => {
    if (qty >= 5000) return 0.65; // 35% discount
    if (qty >= 2000) return 0.75; // 25% discount
    if (qty >= 1000) return 0.85; // 15% discount
    if (qty >= 250) return 0.92;  // 8% discount
    return 1.0;                   // base MOQ price
  };

  const unitPrice = (selectedTier.basePrice * getDiscountMultiplier(quantity)).toFixed(2);
  const totalWholesalePrice = (unitPrice * quantity).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const totalMsrpValue = (selectedTier.msrp * quantity).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const totalSavings = ((selectedTier.msrp - unitPrice) * quantity).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  const discountPercent = Math.round((1 - unitPrice / selectedTier.basePrice) * 100);

  return (
    <section className="py-24 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden border-t border-gray-100">
      {/* Decorative ambient background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* Editorial Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/10 text-primary mb-3 border border-primary/20">
            <FiSliders className="text-sm" />
            <span>Interactive B2B Pricing Engine</span>
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-secondary tracking-tight">
            Instant <span className="text-primary">Wholesale ROI</span> & Tier Calculator
          </h2>
          <p className="text-gray-600 text-base md:text-lg mt-3 leading-relaxed">
            Estimate factory-direct volume pricing, total margin savings vs retail MSRP, and express dispatch lead times across our core product lines.
          </p>
        </div>

        {/* Calculator Interactive Board */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Column: Configurator & Sliders (7 Cols) */}
          <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-gray-200">
            <div>
              {/* Product Selector Tabs */}
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                1. Select Product Line
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {productTiers.map((tier) => (
                  <button
                    key={tier.id}
                    onClick={() => setSelectedTier(tier)}
                    className={`p-4 rounded-2xl border text-left transition-all duration-300 flex items-center gap-3.5 ${
                      selectedTier.id === tier.id
                        ? 'border-primary bg-primary/5 shadow-md ring-2 ring-primary/20'
                        : 'border-gray-200 hover:border-gray-300 bg-gray-50/50'
                    }`}
                  >
                    <img
                      src={tier.image}
                      alt={tier.name}
                      className="w-12 h-12 rounded-xl object-cover border border-gray-200 flex-shrink-0 bg-white"
                    />
                    <div>
                      <div className="font-bold text-sm text-secondary line-clamp-1">{tier.name}</div>
                      <div className="text-xs text-primary font-semibold mt-0.5">${tier.basePrice.toFixed(2)} Base</div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Quantity Interactive Slider */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    2. Order Quantity (Units)
                  </label>
                  <span className="text-2xl font-black text-secondary font-mono bg-gray-100 px-4 py-1 rounded-xl border border-gray-200">
                    {quantity.toLocaleString()} pcs
                  </span>
                </div>

                <input
                  type="range"
                  min="50"
                  max="10000"
                  step="50"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />

                <div className="flex justify-between text-xs text-gray-400 font-semibold mt-2">
                  <span>50 MOQ</span>
                  <span>250 pcs</span>
                  <span>1,000 pcs (15% Off)</span>
                  <span>5,000+ pcs (Max Tier)</span>
                </div>
              </div>
            </div>

            {/* Quality Guarantee Strip */}
            <div className="pt-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-600">
                <FiCheckCircle className="text-emerald-500 text-base" />
                <span>100% Virgin Polymer Guarantee</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-600">
                <FiClock className="text-primary text-base" />
                <span>Est. Dispatch: {selectedTier.leadDays} business days</span>
              </div>
            </div>
          </div>

          {/* Right Column: Live Quotation Summary Card (5 Cols) */}
          <div className="lg:col-span-5 bg-secondary text-white p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/30">
                  Live Quotation Preview
                </span>
                {discountPercent > 0 && (
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/30">
                    Volume Discount: -{discountPercent}%
                  </span>
                )}
              </div>

              {/* Product Spec Preview */}
              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 mb-8">
                <img
                  src={selectedTier.image}
                  alt={selectedTier.name}
                  className="w-16 h-16 rounded-xl object-cover border border-white/20"
                />
                <div>
                  <h4 className="font-bold text-white text-base leading-snug">{selectedTier.name}</h4>
                  <p className="text-xs text-gray-400 font-mono mt-1">{selectedTier.grade}</p>
                </div>
              </div>

              {/* Numerical Breakdown */}
              <div className="space-y-4 pb-8 border-b border-gray-800">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Factory-Direct Unit Rate:</span>
                  <span className="text-2xl font-black text-white font-mono">${unitPrice} / unit</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Total Wholesale Investment:</span>
                  <span className="text-3xl font-extrabold text-primary font-mono">${totalWholesalePrice}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Estimated Retail Value (MSRP):</span>
                  <span className="text-sm text-gray-400 line-through font-mono">${totalMsrpValue}</span>
                </div>

                <div className="flex items-center justify-between bg-emerald-500/10 p-3.5 rounded-xl border border-emerald-500/20">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">Total Estimated Savings:</span>
                  <span className="text-lg font-black text-emerald-400 font-mono">+${totalSavings}</span>
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <div className="mt-8">
              <Link
                to="/contact"
                className="w-full py-4 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-center flex items-center justify-center gap-2 shadow-xl hover:shadow-primary/30 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <span>Request Official Proforma Quotation</span>
                <FiArrowRight className="text-lg" />
              </Link>
              <p className="text-center text-[11px] text-gray-400 mt-3">
                Includes free sample consultation & custom branding evaluation.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WholesaleCalculator;
