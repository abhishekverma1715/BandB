import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FiCheck,
  FiMinus,
  FiPlus,
  FiArrowRight,
  FiFileText,
  FiHome,
  FiTrendingUp,
  FiZap,
  FiHeadphones,
  FiClock,
  FiCheckCircle,
  FiTag
} from 'react-icons/fi';

const productLines = [
  {
    id: 'container',
    name: 'Heavy-Duty Container',
    fullName: 'Heavy-Duty Container (50L)',
    basePrice: 28.50,
    msrp: 58.00,
    fromPrice: '28.50',
    image: '/hero-products/prod-5.png',
    grade: '100% Virgin HDPE Granules',
  },
  {
    id: 'bottle',
    name: 'BPA-Free Bottle',
    fullName: 'BPA-Free Bottle (750ml)',
    basePrice: 18.50,
    msrp: 38.00,
    fromPrice: '18.50',
    image: '/hero-products/prod-3.png',
    grade: '100% Virgin Food-Grade Tritan',
  },
  {
    id: 'rack',
    name: 'Plastic Rack',
    fullName: 'Modular Storage Rack',
    basePrice: 32.00,
    msrp: 68.00,
    fromPrice: '32.00',
    image: '/hero-products/prod-7.png',
    grade: 'Reinforced Impact PP / ABS',
  },
  {
    id: 'mug',
    name: 'Premium Mug',
    fullName: 'Insulated Premium Mug',
    basePrice: 24.00,
    msrp: 49.00,
    fromPrice: '24.00',
    image: '/hero-products/prod-1.png',
    grade: 'High-Density Polyethylene',
  },
];

const WholesaleCalculator = () => {
  const [selectedProduct, setSelectedProduct] = useState(productLines[0]);
  const [quantity, setQuantity] = useState(500);

  // Calculate volume discount tier & multiplier
  const getTierInfo = (qty) => {
    if (qty >= 5000) {
      return {
        discountPercent: 15,
        multiplier: 0.85,
        tierName: '15% discount tier',
        nextTierText: 'You have unlocked our maximum 15% volume discount!'
      };
    } else if (qty >= 500) {
      return {
        discountPercent: 10,
        multiplier: 0.90,
        tierName: '10% discount tier',
        nextTierText: 'Increase quantity to 1,000 pcs to unlock 15% discount'
      };
    } else if (qty >= 250) {
      return {
        discountPercent: 5,
        multiplier: 0.95,
        tierName: '5% discount tier',
        nextTierText: 'Increase quantity to 500 pcs to unlock 10% discount'
      };
    } else {
      return {
        discountPercent: 0,
        multiplier: 1.0,
        tierName: 'MOQ tier (50 pcs)',
        nextTierText: 'Increase quantity to 250 pcs to unlock 5% discount'
      };
    }
  };

  const tier = getTierInfo(quantity);
  const unitPrice = selectedProduct.basePrice * tier.multiplier;
  const totalDirect = unitPrice * quantity;
  const totalRetail = selectedProduct.msrp * quantity;
  const totalSavings = totalRetail - totalDirect;
  const savingsPercentNumber = Math.min(
    99.9,
    Math.max(0, ((totalSavings / totalRetail) * 100))
  );
  const savingsPercent = savingsPercentNumber.toFixed(1);

  const handleDecrease = () => {
    setQuantity((prev) => Math.max(50, prev - (prev > 1000 ? 500 : 50)));
  };

  const handleIncrease = () => {
    setQuantity((prev) => Math.min(10000, prev + (prev >= 1000 ? 500 : 50)));
  };

  return (
    <section className="py-16 sm:py-20 bg-white relative overflow-hidden border-t border-[#E4E7EC]">
      <div className="container mx-auto px-4 max-w-[1320px] relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#F0F4F8] text-[#174A8B] border border-[#E2E8F0] mb-3 shadow-sm">
            <span className="text-sm">🧮</span>
            <span>Wholesale Pricing Calculator</span>
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#101828] tracking-tight">
            Instant <span className="text-[#174A8B]">Wholesale</span> ROI & Tier Calculator
          </h2>
          <p className="text-[#667085] text-sm sm:text-base md:text-lg mt-3 leading-relaxed">
            Estimate factory-direct volume pricing, total margin savings vs retail MSRP, and express dispatch lead times across our core product lines.
          </p>
        </div>

        {/* Main Calculator Board */}
        <div className="bg-[#F7F8FA] rounded-2xl border border-[#E4E7EC] shadow-sm p-4 sm:p-6 lg:p-8 space-y-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Column: Configuration Area (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-8 p-2 sm:p-4">
              
              {/* Step 01: Product Selector */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-extrabold tracking-wider uppercase text-[#174A8B] font-mono">01</span>
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#667085]">
                    Select Product Line
                  </h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  {productLines.map((prod) => {
                    const isSelected = selectedProduct.id === prod.id;
                    return (
                      <button
                        key={prod.id}
                        onClick={() => setSelectedProduct(prod)}
                        className={`group relative p-4 rounded-xl text-left transition-all duration-200 flex flex-col items-center justify-between border ${
                          isSelected
                            ? 'border-[#174A8B] bg-white ring-2 ring-[#174A8B]/20 shadow-sm'
                            : 'border-[#E4E7EC] hover:border-gray-300 bg-white'
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-[#174A8B] text-white flex items-center justify-center text-[10px] shadow-sm">
                            <FiCheck className="stroke-[3]" />
                          </div>
                        )}
                        
                        <div className="w-16 h-16 sm:w-20 sm:h-20 mb-3 flex items-center justify-center overflow-hidden">
                          <img
                            src={prod.image}
                            alt={prod.name}
                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>

                        <div className="text-center w-full">
                          <h4 className="font-bold text-xs sm:text-sm text-[#101828] line-clamp-1 leading-snug">
                            {prod.name}
                          </h4>
                          <span className={`text-[11px] sm:text-xs font-semibold block mt-1 ${isSelected ? 'text-[#174A8B]' : 'text-[#667085]'}`}>
                            From ₹{prod.fromPrice}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 02: Order Quantity Controls */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-extrabold tracking-wider uppercase text-[#174A8B] font-mono">02</span>
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#667085]">
                    Order Quantity (Units)
                  </h3>
                </div>

                {/* Counter Control */}
                <div className="flex items-center justify-center gap-4 mb-6">
                  <button
                    onClick={handleDecrease}
                    className="w-10 h-10 rounded-xl bg-white hover:bg-gray-100 border border-[#E4E7EC] text-[#101828] font-bold flex items-center justify-center text-lg transition-colors active:scale-95"
                    aria-label="Decrease quantity"
                  >
                    <FiMinus />
                  </button>

                  <div className="text-center min-w-[140px]">
                    <motion.div
                      key={quantity}
                      initial={{ scale: 0.95, opacity: 0.8 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.15 }}
                      className="text-3xl sm:text-4xl font-black text-[#101828] font-mono tracking-tight"
                    >
                      {quantity.toLocaleString()}
                    </motion.div>
                    <span className="text-[10px] font-bold text-[#667085] tracking-widest uppercase block mt-0.5 font-sans">
                      PCS
                    </span>
                  </div>

                  <button
                    onClick={handleIncrease}
                    className="w-10 h-10 rounded-xl bg-white hover:bg-gray-100 border border-[#E4E7EC] text-[#101828] font-bold flex items-center justify-center text-lg transition-colors active:scale-95"
                    aria-label="Increase quantity"
                  >
                    <FiPlus />
                  </button>
                </div>

                {/* Range Slider */}
                <div className="space-y-3">
                  <input
                    type="range"
                    min="50"
                    max="5000"
                    step="50"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#174A8B] focus:outline-none"
                  />

                  {/* Tier Labels */}
                  <div className="flex justify-between items-center text-[11px] font-semibold text-[#667085] px-1">
                    <span className={quantity < 250 ? 'text-[#174A8B] font-bold' : ''}>50<br/><span className="text-[9px] uppercase font-mono">MOQ</span></span>
                    <span className={quantity >= 250 && quantity < 500 ? 'text-[#16A36A] font-bold' : ''}>250<br/><span className="text-[9px] text-[#16A36A] uppercase font-bold">5% OFF</span></span>
                    <span className={quantity >= 500 && quantity < 5000 ? 'text-[#16A36A] font-bold' : ''}>500<br/><span className="text-[9px] text-[#16A36A] uppercase font-bold">10% OFF</span></span>
                    <span className={quantity >= 5000 ? 'text-[#16A36A] font-bold' : ''}>5,000+<br/><span className="text-[9px] text-[#16A36A] uppercase font-bold">15% OFF</span></span>
                  </div>
                </div>

                {/* Dynamic Next Tier Feedback Box */}
                <div className="mt-6 bg-white border border-[#E4E7EC] rounded-xl p-4 flex items-center gap-3.5 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-[#F0F4F8] text-[#174A8B] flex items-center justify-center flex-shrink-0 text-lg">
                    <FiTag />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#101828]">
                      You are at the {tier.tierName}
                    </h4>
                    <p className="text-xs text-[#667085] font-medium mt-0.5">
                      {tier.nextTierText}
                    </p>
                  </div>
                </div>

              </div>

            </div>

            {/* Right Column: Dark Live Quote Panel (#0B1B33 HERO) */}
            <div className="lg:col-span-5 bg-[#0B1B33] text-white p-6 sm:p-8 rounded-2xl flex flex-col justify-between relative overflow-hidden shadow-md border border-white/10">
              
              <div className="space-y-6 relative z-10">
                
                {/* Header Row */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-300 font-mono">
                    LIVE QUOTE PREVIEW
                  </span>
                  <span className="text-xs font-bold text-[#16A36A] bg-[#16A36A]/10 px-3 py-1 rounded-full border border-[#16A36A]/20">
                    Volume Discount: {tier.discountPercent}%
                  </span>
                </div>

                {/* Selected Product Snippet */}
                <div className="flex items-center gap-3.5 bg-white/5 p-3.5 rounded-xl border border-white/10">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-14 h-14 rounded-xl object-contain bg-white/10 p-1 border border-white/10 flex-shrink-0"
                  />
                  <div>
                    <h4 className="font-bold text-white text-sm sm:text-base leading-snug">
                      {selectedProduct.fullName}
                    </h4>
                    <p className="text-xs text-gray-400 font-mono mt-0.5">
                      {selectedProduct.grade}
                    </p>
                  </div>
                </div>

                {/* Visual HERO: Your Estimated Savings */}
                <div className="py-2">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-bold text-[#16A36A] uppercase tracking-wider block">
                        YOUR ESTIMATED SAVINGS
                      </span>
                      <motion.div
                        key={totalSavings}
                        initial={{ opacity: 0.7, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-4xl sm:text-5xl font-black text-[#16A36A] tracking-tight font-mono mt-1"
                      >
                        ₹{Math.round(totalSavings).toLocaleString()}
                      </motion.div>
                      <span className="text-xs text-gray-300 font-medium block mt-1">
                        {savingsPercent}% below estimated retail
                      </span>
                    </div>

                    {/* Circular Progress Gauge */}
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center flex-shrink-0">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke="rgba(255,255,255,0.1)"
                          strokeWidth="8"
                          fill="transparent"
                        />
                        <motion.circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke="#16A36A"
                          strokeWidth="8"
                          strokeDasharray={251.3}
                          animate={{ strokeDashoffset: 251.3 * (1 - savingsPercentNumber / 100) }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                          strokeLinecap="round"
                          fill="transparent"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <span className="text-sm sm:text-base font-black text-white leading-none font-mono">
                          {savingsPercent}%
                        </span>
                        <span className="text-[9px] font-bold text-[#16A36A] uppercase tracking-widest mt-0.5">
                          SAVING
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Savings Comparison Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center relative">
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <span className="text-[10px] font-bold text-blue-300 uppercase tracking-wider block">
                      B&B DIRECT (YOU PAY)
                    </span>
                    <div className="text-lg sm:text-xl font-black text-white font-mono mt-1">
                      ₹{totalDirect.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <span className="text-[11px] text-gray-400 font-mono block mt-0.5">
                      ₹{unitPrice.toFixed(2)} / unit
                    </span>
                  </div>

                  <div className="bg-white/5 p-4 rounded-xl border border-white/10 relative">
                    <div className="hidden sm:flex absolute -left-3.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#0B1B33] text-gray-400 text-[10px] font-black items-center justify-center border border-white/15 z-10">
                      VS
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                      EST. RETAIL VALUE
                    </span>
                    <div className="text-lg sm:text-xl font-black text-gray-400 line-through font-mono mt-1 opacity-80">
                      ₹{totalRetail.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <span className="text-[11px] text-gray-400 font-mono block mt-0.5">
                      ₹{selectedProduct.msrp.toFixed(2)} / unit
                    </span>
                  </div>
                </div>

              </div>

              {/* Action Button & Subtext */}
              <div className="mt-8 space-y-3 relative z-10">
                <Link
                  to="/contact"
                  className="w-full py-3.5 rounded-xl bg-[#174A8B] hover:bg-[#2563B5] text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-2 shadow-sm transition-all duration-200"
                >
                  <FiFileText className="text-lg" />
                  <span>Request Official Proforma Quote</span>
                  <FiArrowRight className="text-lg" />
                </Link>

                <div className="flex items-center justify-center gap-4 text-xs text-gray-400 font-medium pt-1">
                  <span className="flex items-center gap-1">
                    <FiCheckCircle className="text-[#16A36A] text-sm" /> No obligation
                  </span>
                  <span className="flex items-center gap-1">
                    <FiClock className="text-blue-400 text-sm" /> Response in &lt; 24 hours
                  </span>
                </div>
              </div>

            </div>

          </div>

          {/* Bottom 4 Small Benefits Strip */}
          <div className="pt-6 border-t border-[#E4E7EC] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="flex items-center gap-3.5 p-3 rounded-xl bg-white border border-[#E4E7EC]">
              <div className="w-10 h-10 rounded-xl bg-[#F0F4F8] text-[#174A8B] flex items-center justify-center text-lg flex-shrink-0">
                <FiHome />
              </div>
              <div>
                <h4 className="font-bold text-[#101828] text-xs sm:text-sm">Factory Direct</h4>
                <p className="text-[#667085] text-xs">No middlemen. Better prices.</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3 rounded-xl bg-white border border-[#E4E7EC]">
              <div className="w-10 h-10 rounded-xl bg-[#F0F4F8] text-[#174A8B] flex items-center justify-center text-lg flex-shrink-0">
                <FiTrendingUp />
              </div>
              <div>
                <h4 className="font-bold text-[#101828] text-xs sm:text-sm">Volume Pricing</h4>
                <p className="text-[#667085] text-xs">Higher quantity. Higher savings.</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3 rounded-xl bg-white border border-[#E4E7EC]">
              <div className="w-10 h-10 rounded-xl bg-[#F0F4F8] text-[#174A8B] flex items-center justify-center text-lg flex-shrink-0">
                <FiZap />
              </div>
              <div>
                <h4 className="font-bold text-[#101828] text-xs sm:text-sm">Fast Quotations</h4>
                <p className="text-[#667085] text-xs">Get official quotes within 24 hours.</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3 rounded-xl bg-white border border-[#E4E7EC]">
              <div className="w-10 h-10 rounded-xl bg-[#F0F4F8] text-[#174A8B] flex items-center justify-center text-lg flex-shrink-0">
                <FiHeadphones />
              </div>
              <div>
                <h4 className="font-bold text-[#101828] text-xs sm:text-sm">Dedicated Support</h4>
                <p className="text-[#667085] text-xs">Expert team for bulk and custom needs.</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default WholesaleCalculator;


