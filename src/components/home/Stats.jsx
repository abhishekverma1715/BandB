import React from 'react';
import { FiTrendingUp, FiAward, FiGlobe, FiUsers, FiShield } from 'react-icons/fi';
import useScrollReveal from './hooks/useScrollReveal.jsx';

const Stats = () => {
  const sectionRef = useScrollReveal({
    itemSelector: '.stat-card',
    y: 28,
    rotateX: 0,
    duration: 0.75,
  });

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 bg-[#F7F8FA] relative overflow-hidden border-t border-[#E4E7EC]">
      
      {/* Background Dotted Map Watermark */}
      <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(#174A8B_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-[1320px] relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#F0F4F8] text-[#174A8B] border border-[#E2E8F0] mb-3 shadow-sm">
            <FiShield className="text-sm stroke-[2.5]" />
            <span>PROVEN INDUSTRIAL RELIABILITY</span>
          </span>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#101828] tracking-tight leading-tight">
            Wholesale Scale<br />
            <span className="inline-flex items-center justify-center gap-4 mt-1">
              <span className="w-8 sm:w-12 h-[2px] bg-blue-200 rounded-full hidden sm:inline-block" />
              <span>
                You Can <span className="text-[#174A8B] font-black">Count On</span>
              </span>
              <span className="w-8 sm:w-12 h-[2px] bg-blue-200 rounded-full hidden sm:inline-block" />
            </span>
          </h2>
          
          <p className="text-[#667085] text-sm sm:text-base md:text-lg mt-3 leading-relaxed max-w-xl mx-auto font-normal">
            Built for businesses that demand quality, consistency and reliability at every stage of growth.
          </p>
        </div>

        {/* 4 Stat Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7 items-stretch">
          
          {/* Card 1: 25+ Years Experience */}
          <div className="stat-card bg-white p-6 sm:p-7 rounded-2xl border border-[#E4E7EC] hover:border-[#174A8B]/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between relative overflow-hidden group shadow-sm min-h-[360px]">
            <div>
              <div className="w-14 h-14 rounded-xl bg-[#F0F4F8] border border-[#E2E8F0] text-[#174A8B] flex items-center justify-center text-2xl mb-6 shadow-sm group-hover:scale-105 transition-transform">
                <FiAward className="stroke-[2]" />
              </div>

              <div className="text-3xl sm:text-4xl font-black tracking-tight mb-2 font-sans text-[#101828]">
                25+ <span className="text-[#174A8B]">Years</span>
              </div>

              <h3 className="font-bold text-[#101828] text-sm sm:text-base leading-snug mt-1">
                Precision Injection<br />Molding Experience
              </h3>

              <div className="w-6 h-[2px] bg-gray-200 my-4" />

              <p className="text-xs text-[#667085] font-normal leading-relaxed">
                Continuous manufacturing excellence since 1999
              </p>
            </div>

            {/* Bottom Illustration: Factory Building */}
            <div className="mt-6 pt-2 flex justify-center items-end opacity-40 group-hover:opacity-70 transition-opacity">
              <svg className="w-full h-16 text-gray-400" viewBox="0 0 200 80" fill="currentColor">
                <path d="M10 70 L10 40 L35 25 L35 70 L60 48 L60 70 L85 48 L85 70 L110 48 L110 70 L135 25 L135 70 L190 70 L190 20 L165 20 L165 70 Z" opacity="0.35" />
              </svg>
            </div>
          </div>

          {/* Card 2: 150+ SKUs */}
          <div className="stat-card bg-white p-6 sm:p-7 rounded-2xl border-2 border-[#174A8B] ring-4 ring-[#174A8B]/10 hover:shadow-md transition-all duration-300 flex flex-col justify-between relative overflow-hidden group shadow-sm min-h-[360px]">
            <div>
              <div className="w-14 h-14 rounded-xl bg-[#F0F4F8] border border-[#E2E8F0] text-[#174A8B] flex items-center justify-center text-2xl mb-6 shadow-sm group-hover:scale-105 transition-transform">
                <FiTrendingUp className="stroke-[2.5]" />
              </div>

              <div className="text-3xl sm:text-4xl font-black tracking-tight mb-2 font-sans text-[#101828]">
                150+ <span className="text-[#174A8B]">SKUs</span>
              </div>

              <h3 className="font-bold text-[#101828] text-sm sm:text-base leading-snug mt-1">
                Industrial & Wholesale<br />Catalog Products
              </h3>

              <div className="w-6 h-[2px] bg-blue-200 my-4" />

              <p className="text-xs text-[#667085] font-normal leading-relaxed">
                Heavy-duty crates, tubs, containers & ergonomic seating
              </p>
            </div>

            {/* Bottom Illustration: Catalog Products Graphic */}
            <div className="mt-4 flex justify-center items-end h-16 overflow-hidden opacity-60">
              <div className="relative flex items-end justify-center space-x-[-12px]">
                <div className="w-10 h-12 bg-blue-100 border border-blue-300 rounded-lg transform -rotate-6 flex items-center justify-center text-[9px] font-bold text-[#174A8B]">
                  Crate
                </div>
                <div className="w-12 h-14 bg-[#174A8B] text-white rounded-t-xl z-10 flex items-center justify-center text-[9px] font-bold">
                  Tub 50L
                </div>
                <div className="w-9 h-11 bg-gray-100 border border-gray-300 rounded-md transform rotate-6 flex items-center justify-center text-[8px] font-bold text-gray-600">
                  Box
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: 5,000+ Brands */}
          <div className="stat-card bg-white p-6 sm:p-7 rounded-2xl border border-[#E4E7EC] hover:border-[#174A8B]/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between relative overflow-hidden group shadow-sm min-h-[360px]">
            <div>
              <div className="w-14 h-14 rounded-xl bg-[#F0F4F8] border border-[#E2E8F0] text-[#174A8B] flex items-center justify-center text-2xl mb-6 shadow-sm group-hover:scale-105 transition-transform">
                <FiUsers className="stroke-[2]" />
              </div>

              <div className="text-3xl sm:text-4xl font-black tracking-tight mb-2 font-sans text-[#174A8B]">
                5,000+<br />
                <span className="text-[#101828] font-black text-2xl sm:text-3xl">Brands</span>
              </div>

              <h3 className="font-bold text-[#101828] text-sm sm:text-base leading-snug mt-1">
                Active Global<br />Wholesale Buyers
              </h3>

              <div className="w-6 h-[2px] bg-gray-200 my-4" />

              <p className="text-xs text-[#667085] font-normal leading-relaxed">
                Trusted by distributors across 15+ countries worldwide
              </p>
            </div>

            {/* Bottom Illustration: Globe & Map Pins */}
            <div className="mt-6 pt-2 flex justify-center items-end opacity-50 group-hover:opacity-85 transition-opacity">
              <svg className="w-32 h-16 text-[#174A8B]" viewBox="0 0 120 70" fill="none" stroke="currentColor">
                <ellipse cx="60" cy="50" rx="45" ry="18" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.5" />
              </svg>
            </div>
          </div>

          {/* Card 4: 99.4% On-Time Dispatch Rate */}
          <div className="stat-card bg-white p-6 sm:p-7 rounded-2xl border border-[#E4E7EC] hover:border-[#174A8B]/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between relative overflow-hidden group shadow-sm min-h-[360px]">
            <div>
              <div className="w-14 h-14 rounded-xl bg-[#F0F4F8] border border-[#E2E8F0] text-[#174A8B] flex items-center justify-center text-2xl mb-6 shadow-sm group-hover:scale-105 transition-transform">
                <FiGlobe className="stroke-[2]" />
              </div>

              <div className="text-3xl sm:text-4xl font-black text-[#174A8B] tracking-tight mb-2 font-sans">
                99.4%
              </div>

              <h3 className="font-bold text-[#101828] text-sm sm:text-base leading-snug mt-1">
                On-Time<br />Dispatch Rate
              </h3>

              <div className="w-6 h-[2px] bg-gray-200 my-4" />

              <p className="text-xs text-[#667085] font-normal leading-relaxed">
                Automated warehouse logistics & pallet freight dispatch
              </p>
            </div>

            {/* Bottom Illustration: Freight Truck */}
            <div className="mt-6 pt-2 flex justify-center items-end opacity-50 group-hover:opacity-85 transition-opacity">
              <svg className="w-32 h-14 text-[#174A8B]" viewBox="0 0 140 60" fill="none" stroke="currentColor">
                <rect x="15" y="15" width="70" height="32" rx="4" strokeWidth="1.5" fill="rgba(23, 74, 139, 0.08)" />
                <path d="M85 24 L112 24 L122 34 L122 47 L85 47 Z" strokeWidth="1.5" fill="rgba(23, 74, 139, 0.12)" />
                <circle cx="36" cy="47" r="7" strokeWidth="1.5" fill="white" />
                <circle cx="70" cy="47" r="7" strokeWidth="1.5" fill="white" />
                <circle cx="106" cy="47" r="7" strokeWidth="1.5" fill="white" />
              </svg>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Stats;



