import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  FiTag,
  FiShield,
  FiPackage,
} from 'react-icons/fi';

interface ProductLineItem {
  id: string;
  name: string;
  fullName: string;
  category: string;
  basePrice: number;
  msrp: number;
  fromPrice: string;
  image: string;
  grade: string;
  moq: number;
  badge?: string;
}

const productLines: ProductLineItem[] = [
  {
    id: 'basin-50l',
    name: 'Commercial Basin (50L)',
    fullName: 'Heavy-Duty Commercial Utility Basin (50L)',
    category: 'Heavy-Duty Containers',
    basePrice: 240.0,
    msrp: 360.0,
    fromPrice: '240.00',
    image: '/hero-products/prod-5.png',
    grade: '100% Virgin HDPE Granules',
    moq: 80,
    badge: 'Popular',
  },
  {
    id: 'bath-mug',
    name: 'Floral Bath Mug (1.5L)',
    fullName: 'Classic Floral Embossed Bath Mug (1.5L)',
    category: 'Household & Sanitary',
    basePrice: 38.0,
    msrp: 65.0,
    fromPrice: '38.00',
    image: '/hero-products/prod-1.png',
    grade: '100% Virgin Polypropylene (PP)',
    moq: 240,
    badge: 'Best Seller',
  },
  {
    id: 'storage-rack',
    name: 'Modular Rack (3-Tier)',
    fullName: '3-Tier Diamond-Mesh Modular Storage Rack',
    category: 'Kitchen & Storage Racks',
    basePrice: 340.0,
    msrp: 520.0,
    fromPrice: '340.00',
    image: '/hero-products/prod-3.png',
    grade: 'Reinforced High-Impact Polypropylene',
    moq: 50,
  },
  {
    id: 'packaging-pail',
    name: 'Packaging Pail (20L)',
    fullName: 'Industrial Airtight Packaging Pail (20L)',
    category: 'Heavy-Duty Containers',
    basePrice: 185.0,
    msrp: 290.0,
    fromPrice: '185.00',
    image: '/hero-products/prod-6.png',
    grade: 'Food & Chemical Grade HDPE',
    moq: 150,
    badge: 'Airtight Lock',
  },
  {
    id: 'harvest-crate',
    name: 'Harvest Crate',
    fullName: 'Perforated Agricultural & Vegetable Harvest Crate',
    category: 'Industrial & Agricultural',
    basePrice: 290.0,
    msrp: 450.0,
    fromPrice: '290.00',
    image: '/hero-products/prod-14.png',
    grade: '100% Virgin Food-Grade HDPE',
    moq: 100,
  },
  {
    id: 'dining-chair',
    name: 'Monobloc Chair',
    fullName: 'Heavy-Duty Monobloc Armless Dining Chair',
    category: 'Furniture & Seating',
    basePrice: 490.0,
    msrp: 750.0,
    fromPrice: '490.00',
    image: '/hero-products/prod-20.png',
    grade: 'High-Grade Copolymer Polypropylene',
    moq: 50,
    badge: '150kg Tested',
  },
];

const quantityPresets = [100, 250, 500, 1000, 2500, 5000];

const WholesaleCalculator: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<ProductLineItem>(productLines[0]);
  const [quantity, setQuantity] = useState<number>(500);

  const getTierInfo = (qty: number) => {
    if (qty >= 5000) {
      return {
        discountPercent: 15,
        multiplier: 0.85,
        tierName: 'Tier 4: Enterprise Mega Tier (15% OFF)',
        nextTierText: '🎉 Maximum volume discount of 15% unlocked!',
      };
    } else if (qty >= 1000) {
      return {
        discountPercent: 12,
        multiplier: 0.88,
        tierName: 'Tier 3: Wholesale Volume Tier (12% OFF)',
        nextTierText: 'Order 5,000+ pcs to unlock our maximum 15% discount.',
      };
    } else if (qty >= 500) {
      return {
        discountPercent: 10,
        multiplier: 0.9,
        tierName: 'Tier 2: Trade Partner Tier (10% OFF)',
        nextTierText: 'Increase to 1,000 pcs to unlock an extra 12% discount.',
      };
    } else if (qty >= 250) {
      return {
        discountPercent: 5,
        multiplier: 0.95,
        tierName: 'Tier 1: Standard Bulk Tier (5% OFF)',
        nextTierText: 'Increase to 500 pcs to unlock 10% discount tier.',
      };
    } else {
      return {
        discountPercent: 0,
        multiplier: 1.0,
        tierName: 'Factory Base Tier (Direct MOQ)',
        nextTierText: 'Increase to 250 pcs to unlock a 5% instant discount.',
      };
    }
  };

  const tier = getTierInfo(quantity);
  const unitPrice = selectedProduct.basePrice * tier.multiplier;
  const totalDirect = unitPrice * quantity;
  const totalRetail = selectedProduct.msrp * quantity;
  const totalSavings = totalRetail - totalDirect;
  const savingsPercentNumber = Math.min(99.9, Math.max(0, (totalSavings / totalRetail) * 100));
  const savingsPercent = savingsPercentNumber.toFixed(1);

  const handleDecrease = () => {
    setQuantity((prev) => Math.max(selectedProduct.moq, prev - (prev > 1000 ? 500 : 50)));
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
            <span>Factory Wholesale Pricing Calculator</span>
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#101828] tracking-tight">
            Instant <span className="text-[#174A8B]">Wholesale ROI</span> & Volume Calculator
          </h2>
          <p className="text-[#667085] text-sm sm:text-base md:text-lg mt-3 leading-relaxed">
            Calculate your direct factory savings, bulk tier discounts, and profit margins in real-time across B&B Plastic's flagship manufacturing product lines.
          </p>
        </div>

        {/* Main Calculator Board */}
        <div className="bg-[#F7F8FA] rounded-2xl sm:rounded-3xl border border-[#E4E7EC] shadow-sm p-4 sm:p-6 lg:p-8 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Column: Product Selection & Controls */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
              
              {/* Step 01: Product Line Selection */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#174A8B] text-white text-xs font-bold font-mono">
                      01
                    </span>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#101828]">
                      Select Product Line
                    </h3>
                  </div>
                  <span className="text-xs text-[#667085] font-medium hidden sm:inline-block">
                    Click any item to view custom volume tiers
                  </span>
                </div>

                {/* 6 Responsive Product Cards Grid with Large Clear Images */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                  {productLines.map((prod) => {
                    const isSelected = selectedProduct.id === prod.id;
                    return (
                      <button
                        key={prod.id}
                        type="button"
                        onClick={() => {
                          setSelectedProduct(prod);
                          if (quantity < prod.moq) {
                            setQuantity(prod.moq);
                          }
                        }}
                        className={`group relative p-3 sm:p-3.5 rounded-2xl text-center transition-all duration-200 flex flex-col items-center justify-between border cursor-pointer ${
                          isSelected
                            ? 'border-[#174A8B] bg-white ring-2 ring-[#174A8B]/30 shadow-md transform -translate-y-0.5'
                            : 'border-[#E4E7EC] hover:border-[#174A8B]/40 hover:shadow-sm bg-white'
                        }`}
                      >
                        {/* Top selection indicator */}
                        {isSelected ? (
                          <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-[#174A8B] text-white flex items-center justify-center text-[10px] shadow-sm z-10">
                            <FiCheck className="stroke-[3]" />
                          </div>
                        ) : prod.badge ? (
                          <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md text-[9px] font-extrabold uppercase bg-amber-50 text-amber-700 border border-amber-200/60 leading-none">
                            {prod.badge}
                          </span>
                        ) : null}

                        {/* Large, Clear Image Container */}
                        <div className="w-full h-28 sm:h-36 md:h-40 rounded-xl bg-gradient-to-b from-gray-50 to-slate-100/80 p-2 sm:p-2.5 mb-2.5 flex items-center justify-center overflow-hidden border border-gray-100">
                          <img
                            src={prod.image}
                            alt={prod.name}
                            className="w-full h-full object-contain filter drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                        </div>

                        {/* Product Titles & Pricing */}
                        <div className="w-full text-center">
                          <h4
                            className="font-bold text-xs sm:text-sm text-[#101828] line-clamp-1 leading-snug group-hover:text-[#174A8B] transition-colors"
                            title={prod.fullName}
                          >
                            {prod.name}
                          </h4>
                          <div className="mt-1 flex items-baseline justify-center gap-1">
                            <span className="text-[10px] text-[#667085] font-mono">From</span>
                            <span
                              className={`text-xs sm:text-sm font-black ${
                                isSelected ? 'text-[#174A8B]' : 'text-[#101828]'
                              }`}
                            >
                              ₹{prod.fromPrice}
                            </span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 02: Order Quantity Controls */}
              <div className="pt-2 border-t border-[#E4E7EC]/80">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#174A8B] text-white text-xs font-bold font-mono">
                      02
                    </span>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#101828]">
                      Order Quantity (Units)
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-[#174A8B] bg-[#174A8B]/10 px-2.5 py-0.5 rounded-full">
                    Min MOQ: {selectedProduct.moq} pcs
                  </span>
                </div>

                {/* Counter Control */}
                <div className="flex items-center justify-center gap-4 mb-4">
                  <button
                    onClick={handleDecrease}
                    className="w-11 h-11 rounded-xl bg-white hover:bg-gray-100 border border-[#E4E7EC] text-[#101828] font-bold flex items-center justify-center text-lg transition-colors active:scale-95 shadow-sm"
                    aria-label="Decrease quantity"
                  >
                    <FiMinus />
                  </button>

                  <div className="text-center min-w-[160px] bg-white py-2 px-4 rounded-xl border border-[#E4E7EC] shadow-sm">
                    <motion.div
                      key={quantity}
                      initial={{ scale: 0.95, opacity: 0.8 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.15 }}
                      className="text-3xl sm:text-4xl font-black text-[#101828] font-mono tracking-tight"
                    >
                      {quantity.toLocaleString()}
                    </motion.div>
                    <span className="text-[10px] font-bold text-[#667085] tracking-widest uppercase block font-sans">
                      UNITS / PIECES
                    </span>
                  </div>

                  <button
                    onClick={handleIncrease}
                    className="w-11 h-11 rounded-xl bg-white hover:bg-gray-100 border border-[#E4E7EC] text-[#101828] font-bold flex items-center justify-center text-lg transition-colors active:scale-95 shadow-sm"
                    aria-label="Increase quantity"
                  >
                    <FiPlus />
                  </button>
                </div>

                {/* Quick Presets Pills */}
                <div className="flex flex-wrap items-center justify-center gap-2 mb-5">
                  <span className="text-xs text-[#667085] font-semibold mr-1">Quick Select:</span>
                  {quantityPresets.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setQuantity(preset)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        quantity === preset
                          ? 'bg-[#174A8B] text-white shadow-sm'
                          : 'bg-white text-[#667085] hover:bg-gray-100 border border-[#E4E7EC]'
                      }`}
                    >
                      {preset.toLocaleString()} pcs
                    </button>
                  ))}
                </div>

                {/* Range Slider */}
                <div className="space-y-2.5">
                  <input
                    type="range"
                    min={selectedProduct.moq}
                    max="10000"
                    step="50"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#174A8B] focus:outline-none"
                  />

                  {/* Volume Tier Markers */}
                  <div className="flex justify-between items-center text-[11px] font-semibold text-[#667085] px-1">
                    <span className={quantity < 250 ? 'text-[#174A8B] font-bold' : ''}>
                      {selectedProduct.moq}<br /><span className="text-[9px] uppercase font-mono">MOQ</span>
                    </span>
                    <span className={quantity >= 250 && quantity < 500 ? 'text-[#16A36A] font-bold' : ''}>
                      250<br /><span className="text-[9px] text-[#16A36A] uppercase font-bold">5% OFF</span>
                    </span>
                    <span className={quantity >= 500 && quantity < 1000 ? 'text-[#16A36A] font-bold' : ''}>
                      500<br /><span className="text-[9px] text-[#16A36A] uppercase font-bold">10% OFF</span>
                    </span>
                    <span className={quantity >= 1000 && quantity < 5000 ? 'text-[#16A36A] font-bold' : ''}>
                      1,000<br /><span className="text-[9px] text-[#16A36A] uppercase font-bold">12% OFF</span>
                    </span>
                    <span className={quantity >= 5000 ? 'text-[#16A36A] font-bold' : ''}>
                      5,000+<br /><span className="text-[9px] text-[#16A36A] uppercase font-bold">15% OFF</span>
                    </span>
                  </div>
                </div>

                {/* Tier Status Alert Banner */}
                <div className="mt-5 bg-white border border-[#E4E7EC] rounded-2xl p-4 flex items-center gap-3.5 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-[#F0F4F8] text-[#174A8B] flex items-center justify-center flex-shrink-0 text-lg">
                    <FiTag />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#101828]">
                      {tier.tierName}
                    </h4>
                    <p className="text-xs text-[#667085] font-medium mt-0.5">
                      {tier.nextTierText}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Live Quote Preview Card */}
            <div className="lg:col-span-5 bg-[#0B1B33] text-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl flex flex-col justify-between relative overflow-hidden shadow-xl border border-white/10">
              
              {/* Top Highlights */}
              <div className="space-y-6 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-300 font-mono flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    LIVE WHOLESALE QUOTE
                  </span>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                    Volume Discount: {tier.discountPercent}%
                  </span>
                </div>

                {/* Selected Product Spotlight Card */}
                <div className="flex items-center gap-4 bg-white/10 p-3.5 sm:p-4 rounded-2xl border border-white/15 backdrop-blur-sm">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white/15 p-2 border border-white/20 flex-shrink-0 flex items-center justify-center overflow-hidden">
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="w-full h-full object-contain filter drop-shadow"
                    />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] uppercase font-bold text-blue-300 tracking-wider block">
                      {selectedProduct.category}
                    </span>
                    <h4 className="font-bold text-white text-sm sm:text-base leading-snug truncate">
                      {selectedProduct.fullName}
                    </h4>
                    <p className="text-xs text-gray-300 font-mono mt-0.5 truncate">
                      {selectedProduct.grade}
                    </p>
                  </div>
                </div>

                {/* Estimated Savings Display */}
                <div className="py-2">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                        ESTIMATED FACTORY SAVINGS
                      </span>
                      <motion.div
                        key={totalSavings}
                        initial={{ opacity: 0.7, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-4xl sm:text-5xl font-black text-emerald-400 tracking-tight font-mono mt-1"
                      >
                        ₹{Math.round(totalSavings).toLocaleString('en-IN')}
                      </motion.div>
                      <span className="text-xs text-gray-300 font-medium block mt-1">
                        {savingsPercent}% lower than standard market retail
                      </span>
                    </div>

                    {/* Circular ROI Meter */}
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center flex-shrink-0">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke="rgba(255,255,255,0.12)"
                          strokeWidth="8"
                          fill="transparent"
                        />
                        <motion.circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke="#10B981"
                          strokeWidth="8"
                          strokeDasharray={251.3}
                          animate={{ strokeDashoffset: 251.3 * (1 - savingsPercentNumber / 100) }}
                          transition={{ duration: 0.4, ease: 'easeOut' }}
                          strokeLinecap="round"
                          fill="transparent"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <span className="text-sm sm:text-base font-black text-white leading-none font-mono">
                          {savingsPercent}%
                        </span>
                        <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest mt-0.5">
                          MARGIN
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pricing Comparison Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center relative">
                  <div className="bg-white/10 p-4 rounded-2xl border border-white/15">
                    <span className="text-[10px] font-bold text-blue-300 uppercase tracking-wider block">
                      FACTORY DIRECT (YOU PAY)
                    </span>
                    <div className="text-xl sm:text-2xl font-black text-white font-mono mt-1">
                      ₹{totalDirect.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <span className="text-xs text-emerald-400 font-mono font-bold block mt-0.5">
                      ₹{unitPrice.toFixed(2)} / unit
                    </span>
                  </div>

                  <div className="bg-white/5 p-4 rounded-2xl border border-white/10 relative">
                    <div className="hidden sm:flex absolute -left-3.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#0B1B33] text-gray-400 text-[10px] font-black items-center justify-center border border-white/20 z-10">
                      VS
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                      EST. MARKET RETAIL
                    </span>
                    <div className="text-xl sm:text-2xl font-black text-gray-400 line-through font-mono mt-1 opacity-80">
                      ₹{totalRetail.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <span className="text-xs text-gray-400 font-mono block mt-0.5">
                      ₹{selectedProduct.msrp.toFixed(2)} / unit
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Quote Request CTA */}
              <div className="mt-8 space-y-3 relative z-10">
                <Link
                  to={`/contact?product=${encodeURIComponent(selectedProduct.fullName)}&qty=${quantity}`}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#174A8B] to-[#2563B5] hover:from-[#1b559e] hover:to-[#2c72ce] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg shadow-blue-900/30 transition-all duration-200 hover:gap-3.5 active:scale-[0.99]"
                >
                  <FiFileText className="text-lg" />
                  <span>Request Official Factory Proforma Quote</span>
                  <FiArrowRight className="text-lg" />
                </Link>

                <div className="flex items-center justify-center gap-4 text-xs text-gray-400 font-medium pt-1">
                  <span className="flex items-center gap-1">
                    <FiCheckCircle className="text-emerald-400 text-sm" /> Factory Direct
                  </span>
                  <span className="flex items-center gap-1">
                    <FiShield className="text-blue-400 text-sm" /> GST Invoiced
                  </span>
                  <span className="flex items-center gap-1">
                    <FiClock className="text-amber-400 text-sm" /> Dispatch &lt; 48 hrs
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Trade Guarantee Badges */}
          <div className="pt-6 border-t border-[#E4E7EC] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white border border-[#E4E7EC] shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#F0F4F8] text-[#174A8B] flex items-center justify-center text-lg flex-shrink-0">
                <FiHome />
              </div>
              <div>
                <h4 className="font-bold text-[#101828] text-xs sm:text-sm">Factory Direct</h4>
                <p className="text-[#667085] text-xs">Direct manufacturer prices with zero middlemen.</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white border border-[#E4E7EC] shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#F0F4F8] text-[#174A8B] flex items-center justify-center text-lg flex-shrink-0">
                <FiTrendingUp />
              </div>
              <div>
                <h4 className="font-bold text-[#101828] text-xs sm:text-sm">Tiered Discounts</h4>
                <p className="text-[#667085] text-xs">Unlock up to 15% extra off on large wholesale volumes.</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white border border-[#E4E7EC] shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#F0F4F8] text-[#174A8B] flex items-center justify-center text-lg flex-shrink-0">
                <FiZap />
              </div>
              <div>
                <h4 className="font-bold text-[#101828] text-xs sm:text-sm">Fast Turnaround</h4>
                <p className="text-[#667085] text-xs">Ready warehouse inventory dispatched within 24-48 hours.</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white border border-[#E4E7EC] shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#F0F4F8] text-[#174A8B] flex items-center justify-center text-lg flex-shrink-0">
                <FiHeadphones />
              </div>
              <div>
                <h4 className="font-bold text-[#101828] text-xs sm:text-sm">Dedicated B2B Desk</h4>
                <p className="text-[#667085] text-xs">Direct factory engineering support for custom molds.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WholesaleCalculator;
