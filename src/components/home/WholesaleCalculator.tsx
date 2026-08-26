import React, { useMemo, useState } from 'react';
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
  FiHeadphones,
  FiClock,
  FiCheckCircle,
  FiTag,
  FiShield,
  FiPackage,
  FiBarChart2,
  FiTruck,
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
    basePrice: 240,
    msrp: 360,
    fromPrice: '240.00',
    image: '/hero-products/prod-5.png',
    grade: '100% Virgin HDPE',
    moq: 80,
    badge: 'Popular',
  },
  {
    id: 'bath-mug',
    name: 'Floral Bath Mug (1.5L)',
    fullName: 'Classic Floral Embossed Bath Mug (1.5L)',
    category: 'Household & Sanitary',
    basePrice: 38,
    msrp: 65,
    fromPrice: '38.00',
    image: '/hero-products/prod-1.png',
    grade: '100% Virgin PP',
    moq: 240,
    badge: 'Best Seller',
  },
  {
    id: 'storage-rack',
    name: 'Modular Rack (3-Tier)',
    fullName: '3-Tier Diamond-Mesh Modular Storage Rack',
    category: 'Kitchen & Storage Racks',
    basePrice: 340,
    msrp: 520,
    fromPrice: '340.00',
    image: '/hero-products/prod-3.png',
    grade: 'Reinforced Polypropylene',
    moq: 50,
  },
  {
    id: 'packaging-pail',
    name: 'Packaging Pail (20L)',
    fullName: 'Industrial Airtight Packaging Pail (20L)',
    category: 'Heavy-Duty Containers',
    basePrice: 185,
    msrp: 290,
    fromPrice: '185.00',
    image: '/hero-products/prod-6.png',
    grade: 'Food & Chemical HDPE',
    moq: 150,
    badge: 'Airtight Lock',
  },
  {
    id: 'harvest-crate',
    name: 'Harvest Crate',
    fullName: 'Perforated Vegetable Harvest Crate',
    category: 'Industrial & Agricultural',
    basePrice: 290,
    msrp: 450,
    fromPrice: '290.00',
    image: '/hero-products/prod-14.png',
    grade: '100% Virgin Food-Grade HDPE',
    moq: 100,
  },
  {
    id: 'dining-chair',
    name: 'Monobloc Chair',
    fullName: 'Heavy-Duty Monobloc Armless Chair',
    category: 'Furniture & Seating',
    basePrice: 490,
    msrp: 750,
    fromPrice: '490.00',
    image: '/hero-products/prod-20.png',
    grade: 'Copolymer Polypropylene',
    moq: 50,
    badge: '150kg Tested',
  },
];

const quantityPresets = [100, 250, 500, 1000, 2500, 5000];

const formatCurrency = (value: number, decimals = 0) =>
  `₹${value.toLocaleString('en-IN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}`;

const WholesaleCalculator: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<ProductLineItem>(productLines[0]);
  const [quantity, setQuantity] = useState<number>(500);

  const getTierInfo = (qty: number) => {
    if (qty >= 5000) {
      return {
        discountPercent: 15,
        multiplier: 0.85,
        tierName: 'Enterprise Mega Tier',
        tierLabel: '15% OFF',
        nextTierText: 'Max discount tier unlocked.',
      };
    }
    if (qty >= 1000) {
      return {
        discountPercent: 12,
        multiplier: 0.88,
        tierName: 'Wholesale Volume Tier',
        tierLabel: '12% OFF',
        nextTierText: '5,000+ pcs for max 15% discount.',
      };
    }
    if (qty >= 500) {
      return {
        discountPercent: 10,
        multiplier: 0.9,
        tierName: 'Trade Partner Tier',
        tierLabel: '10% OFF',
        nextTierText: '1,000+ pcs for 12% discount.',
      };
    }
    if (qty >= 250) {
      return {
        discountPercent: 5,
        multiplier: 0.95,
        tierName: 'Standard Bulk Tier',
        tierLabel: '5% OFF',
        nextTierText: '500+ pcs for 10% discount.',
      };
    }
    return {
      discountPercent: 0,
      multiplier: 1,
      tierName: 'Factory Base Tier',
      tierLabel: 'DIRECT MOQ',
      nextTierText: '250+ pcs for 5% discount.',
    };
  };

  const tier = getTierInfo(quantity);
  const unitPrice = selectedProduct.basePrice * tier.multiplier;
  const totalDirect = unitPrice * quantity;
  const totalRetail = selectedProduct.msrp * quantity;
  const totalSavings = totalRetail - totalDirect;
  const savingsPercentNumber = Math.min(99.9, Math.max(0, (totalSavings / totalRetail) * 100));
  const savingsPercent = savingsPercentNumber.toFixed(1);
  const progress = Math.min(100, (quantity / 5000) * 100);

  const handleDecrease = () => {
    setQuantity((prev) => Math.max(selectedProduct.moq, prev - (prev > 1000 ? 500 : 50)));
  };

  const handleIncrease = () => {
    setQuantity((prev) => Math.min(10000, prev + (prev >= 1000 ? 500 : 50)));
  };

  return (
    <section className="relative overflow-hidden bg-[#F7F8FA] py-12 sm:py-16 border-t border-[#E4E7EC]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1320px] relative z-10">
        {/* Header matched with FeaturedProducts design */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#F0F4F8] text-[#174A8B] border border-[#E2E8F0] mb-3">
            Pricing Engine
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#101828] tracking-tight">
            Wholesale Savings <span className="text-[#174A8B]">Calculator</span>
          </h2>
          <p className="text-[#667085] text-sm sm:text-base leading-relaxed font-normal mt-2">
            Select a product line and order quantity to see instant factory-direct pricing and bulk volume tier discounts.
          </p>
        </div>

        {/* Main Board — Compact single-screen layout matching site card theme */}
        <div className="overflow-hidden rounded-2xl border border-[#E4E7EC] bg-white shadow-sm hover:shadow-md transition-shadow">
          <div className="grid lg:grid-cols-[1.3fr_0.9fr]">
            
            {/* LEFT SIDE: Controls */}
            <div className="p-4 sm:p-6 lg:p-7 flex flex-col justify-between space-y-4">
              {/* Product Selection */}
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#174A8B] text-[10px] font-black text-white">
                      01
                    </span>
                    <h3 className="text-xs font-black uppercase tracking-wider text-[#101828]">
                      Select Product Line
                    </h3>
                  </div>
                  <span className="text-[11px] text-[#98A2B3] font-medium hidden sm:inline">
                    Click item to select
                  </span>
                </div>

                {/* Grid of 6 compact products */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {productLines.map((product) => {
                    const isSelected = selectedProduct.id === product.id;
                    return (
                      <button
                        key={product.id}
                        type="button"
                        onClick={() => {
                          setSelectedProduct(product);
                          if (quantity < product.moq) setQuantity(product.moq);
                        }}
                        className={`group relative flex flex-col justify-between rounded-xl border p-2 text-left transition-all duration-200 ${
                          isSelected
                            ? 'border-[#174A8B] bg-[#F0F4F8] ring-2 ring-[#174A8B]/20 shadow-sm'
                            : 'border-[#E4E7EC] bg-white hover:border-[#174A8B]/40 hover:bg-gray-50'
                        }`}
                      >
                        {/* Selected Indicator / Badge */}
                        <div className="absolute right-1.5 top-1.5 z-10">
                          {isSelected ? (
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#174A8B] text-white shadow-sm">
                              <FiCheck size={10} strokeWidth={3} />
                            </span>
                          ) : product.badge ? (
                            <span className="rounded px-1.5 py-0.5 text-[8px] font-extrabold uppercase bg-amber-50 text-amber-700 border border-amber-200/60 leading-none">
                              {product.badge}
                            </span>
                          ) : null}
                        </div>

                        {/* Image */}
                        <div className="relative mb-2 aspect-[4/3] w-full overflow-hidden rounded-lg bg-gray-50 border border-gray-100">
                          <img
                            src={product.image}
                            alt={product.name}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>

                        {/* Title & Price */}
                        <div>
                          <h4
                            className={`line-clamp-1 text-xs font-bold ${
                              isSelected ? 'text-[#174A8B]' : 'text-[#101828]'
                            }`}
                            title={product.fullName}
                          >
                            {product.name}
                          </h4>
                          <div className="mt-0.5 flex items-baseline justify-between">
                            <span className="font-mono text-xs font-black text-[#101828]">
                              ₹{product.fromPrice}
                            </span>
                            <span className="text-[9px] font-medium text-[#667085]">
                              MOQ {product.moq}
                            </span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* DIVIDER */}
              <div className="h-px bg-[#E4E7EC]" />

              {/* Quantity Selector */}
              <div>
                <div className="mb-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#174A8B] text-[10px] font-black text-white">
                      02
                    </span>
                    <h3 className="text-xs font-black uppercase tracking-wider text-[#101828]">
                      Order Quantity
                    </h3>
                  </div>
                  <span className="text-[10px] font-bold text-[#174A8B] bg-[#F0F4F8] px-2 py-0.5 rounded-full border border-[#E2E8F0]">
                    MOQ: {selectedProduct.moq} pcs
                  </span>
                </div>

                {/* Counter & Slider Row */}
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  {/* Plus Minus Counter */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleDecrease}
                      aria-label="Decrease quantity"
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E4E7EC] bg-white text-[#101828] shadow-sm hover:border-[#174A8B]"
                    >
                      <FiMinus size={14} />
                    </button>
                    <div className="min-w-[120px] rounded-xl border border-[#E4E7EC] bg-[#F7F8FA] px-3 py-1 text-center">
                      <div className="font-mono text-xl font-black text-[#101828]">
                        {quantity.toLocaleString()}
                      </div>
                      <span className="text-[8px] font-bold uppercase tracking-widest text-[#667085]">
                        Units / Pcs
                      </span>
                    </div>
                    <button
                      onClick={handleIncrease}
                      aria-label="Increase quantity"
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E4E7EC] bg-white text-[#101828] shadow-sm hover:border-[#174A8B]"
                    >
                      <FiPlus size={14} />
                    </button>
                  </div>

                  {/* Quick Presets */}
                  <div className="flex flex-wrap items-center gap-1.5 flex-1 justify-center sm:justify-end">
                    {quantityPresets.map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setQuantity(Math.max(preset, selectedProduct.moq))}
                        className={`rounded-md px-2.5 py-1 text-[10px] font-extrabold transition-all ${
                          quantity === preset
                            ? 'bg-[#174A8B] text-white shadow-sm'
                            : 'border border-[#E4E7EC] bg-white text-[#667085] hover:text-[#174A8B]'
                        }`}
                      >
                        {preset.toLocaleString()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Range Slider */}
                <div className="mt-2.5">
                  <div className="relative">
                    <div className="absolute left-0 right-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-[#E4E7EC]" />
                    <div
                      className="absolute left-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-[#174A8B]"
                      style={{ width: `${progress}%` }}
                    />
                    <input
                      type="range"
                      min={selectedProduct.moq}
                      max={10000}
                      step={50}
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="relative z-10 h-4 w-full cursor-pointer appearance-none bg-transparent accent-[#174A8B]"
                    />
                  </div>
                  <div className="mt-1 flex justify-between text-[9px] font-bold text-[#667085]">
                    <span>{selectedProduct.moq} MOQ</span>
                    <span>250 (5%)</span>
                    <span>500 (10%)</span>
                    <span>1K (12%)</span>
                    <span>5K+ (15%)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: Live Quote Box */}
            <div className="relative flex flex-col justify-between overflow-hidden bg-[#0B1B33] p-4 sm:p-6 text-white border-t lg:border-t-0 lg:border-l border-white/10">
              <div className="space-y-3.5">
                {/* Header Badge */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-300 font-mono flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    LIVE WHOLESALE QUOTE
                  </span>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                    {tier.tierLabel}
                  </span>
                </div>

                {/* Product Banner */}
                <div className="flex items-center gap-3 bg-white/10 p-2.5 rounded-xl border border-white/15">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-white/15 flex-shrink-0">
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[9px] uppercase font-bold text-blue-300 tracking-wider block">
                      {selectedProduct.category}
                    </span>
                    <h4 className="font-bold text-white text-xs leading-snug truncate">
                      {selectedProduct.fullName}
                    </h4>
                    <p className="text-[10px] text-gray-400 font-mono mt-0.5 truncate">
                      {selectedProduct.grade}
                    </p>
                  </div>
                </div>

                {/* Savings & Meter */}
                <div className="flex items-center justify-between gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
                  <div>
                    <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider block">
                      Estimated Factory Savings
                    </span>
                    <div className="text-2xl sm:text-3xl font-black text-emerald-400 tracking-tight font-mono mt-0.5">
                      ₹{Math.round(totalSavings).toLocaleString('en-IN')}
                    </div>
                    <span className="text-[10px] text-gray-400 font-medium block mt-0.5">
                      {savingsPercent}% lower than market retail
                    </span>
                  </div>

                  <div className="relative w-14 h-14 flex items-center justify-center flex-shrink-0">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" stroke="rgba(255,255,255,0.1)" strokeWidth="8" fill="transparent" />
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="#10B981"
                        strokeWidth="8"
                        strokeDasharray={251.3}
                        animate={{ strokeDashoffset: 251.3 * (1 - savingsPercentNumber / 100) }}
                        transition={{ duration: 0.4 }}
                        strokeLinecap="round"
                        fill="transparent"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-xs font-black text-white font-mono leading-none">
                        {savingsPercent}%
                      </span>
                      <span className="text-[7px] font-bold text-emerald-400 uppercase mt-0.5">
                        MARGIN
                      </span>
                    </div>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-white/10 p-2.5 rounded-xl border border-white/15">
                    <span className="text-[8px] font-bold text-blue-300 uppercase tracking-wider block">
                      Factory Direct (You Pay)
                    </span>
                    <div className="text-base sm:text-lg font-black text-white font-mono mt-0.5">
                      {formatCurrency(totalDirect, 2)}
                    </div>
                    <span className="text-[10px] text-emerald-400 font-mono font-bold block">
                      {formatCurrency(unitPrice, 2)} / unit
                    </span>
                  </div>

                  <div className="bg-white/5 p-2.5 rounded-xl border border-white/10">
                    <span className="text-[8px] font-bold text-gray-500 uppercase tracking-wider block">
                      Est. Market Retail
                    </span>
                    <div className="text-base sm:text-lg font-black text-gray-500 line-through font-mono mt-0.5 opacity-80">
                      {formatCurrency(totalRetail, 2)}
                    </div>
                    <span className="text-[10px] text-gray-500 font-mono block">
                      {formatCurrency(selectedProduct.msrp, 2)} / unit
                    </span>
                  </div>
                </div>
              </div>

              {/* Action CTA */}
              <div className="mt-4 space-y-2">
                <Link
                  to={`/contact?product=${encodeURIComponent(selectedProduct.fullName)}&qty=${quantity}`}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#174A8B] to-[#2563B5] hover:from-[#1b559e] hover:to-[#2c72ce] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <FiFileText size={15} />
                  <span>Request Factory Quote</span>
                  <FiArrowRight size={15} />
                </Link>

                <div className="flex items-center justify-center gap-3 text-[9px] text-gray-400 font-medium pt-0.5">
                  <span className="flex items-center gap-1">
                    <FiCheckCircle className="text-emerald-400" /> Factory Direct
                  </span>
                  <span className="flex items-center gap-1">
                    <FiShield className="text-blue-400" /> GST Invoiced
                  </span>
                  <span className="flex items-center gap-1">
                    <FiClock className="text-amber-400" /> Fast Dispatch
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Compact Trust Footer Strip */}
          <div className="border-t border-[#E4E7EC] bg-[#FAFBFC] px-4 py-3 sm:px-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 text-xs">
              <div className="flex items-center gap-2 text-[#101828]">
                <FiHome className="text-[#174A8B] flex-shrink-0" />
                <span className="font-bold text-[11px]">Factory Direct Pricing</span>
              </div>
              <div className="flex items-center gap-2 text-[#101828]">
                <FiTrendingUp className="text-[#174A8B] flex-shrink-0" />
                <span className="font-bold text-[11px]">Up to 15% Volume Off</span>
              </div>
              <div className="flex items-center gap-2 text-[#101828]">
                <FiTruck className="text-[#174A8B] flex-shrink-0" />
                <span className="font-bold text-[11px]">Dispatch in 24-48 Hrs</span>
              </div>
              <div className="flex items-center gap-2 text-[#101828]">
                <FiHeadphones className="text-[#174A8B] flex-shrink-0" />
                <span className="font-bold text-[11px]">Dedicated B2B Sales Desk</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WholesaleCalculator;
