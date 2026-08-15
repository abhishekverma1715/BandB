import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FiStar,
  FiCheckCircle,
  FiGlobe,
  FiMapPin,
  FiChevronLeft,
  FiChevronRight,
  FiTruck,
  FiDollarSign,
  FiUsers,
  FiArrowRight,
  FiLayers,
  FiHome,
  FiShield
} from 'react-icons/fi';
import useScrollReveal from './hooks/useScrollReveal';

// 4 Proof Points / Trust Badges above testimonials
const trustBadges = [
  { icon: <FiShield className="text-[#174A8B] text-sm stroke-[2.5]" />, label: 'Verified Quality' },
  { icon: <FiTruck className="text-[#174A8B] text-sm stroke-[2.5]" />, label: 'On-Time Dispatch' },
  { icon: <FiDollarSign className="text-[#174A8B] text-sm stroke-[2.5]" />, label: 'Factory-Direct Pricing' },
  { icon: <FiUsers className="text-[#174A8B] text-sm stroke-[2.5]" />, label: 'Long-Term Partnerships' },
];

const testimonials = [
  {
    id: 1,
    name: 'Rajeshwar Sharma',
    role: 'Managing Director',
    company: 'Sharma Poly-Logistics',
    location: 'Lucknow, Uttar Pradesh',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    quote:
      'We have been sourcing 50L heavy-duty containers and industrial crates from B&B Plastic for over three years. Their batch-to-batch consistency and drop-impact resistance are unmatched in North India.',
    rating: 5,
    caseStudyUrl: '/contact',
  },
  {
    id: 2,
    name: 'Vikram Mehta',
    role: 'Head of Procurement',
    company: 'Apex Industrial Supply',
    location: 'Ahmedabad, Gujarat',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    quote:
      'The tiered wholesale discount structure and transparent MOQ made switching our primary supplier seamless. Deliveries arrive on schedule with full Certificates of Analysis every time.',
    rating: 5,
    featured: true,
    caseStudyUrl: '/contact',
  },
  {
    id: 3,
    name: 'Elena Rostova',
    role: 'Import Director',
    company: 'EuroContainer Trading',
    location: 'Dubai, UAE',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    quote:
      'B&B Plastic engineered a custom high-impact mold for our utility basins within 20 days. Their virgin resin formulation and export packaging exceeded our European quality audits.',
    rating: 5,
    caseStudyUrl: '/contact',
  },
];

const GlobalClientsTestimonials = () => {
  const sectionRef = useScrollReveal({ itemSelector: '.testimonial-item', y: 30 });
  const [activeIndex, setActiveIndex] = useState(1); // Default middle featured card selected

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 bg-[#F7F8FA] relative overflow-hidden border-t border-[#E4E7EC]">
      
      {/* Subtle World Map Dotted Background */}
      <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(#174A8B_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-[1320px] relative z-10">
        
        {/* Step 1: Global Trust Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#F0F4F8] text-[#174A8B] border border-[#E2E8F0] mb-3 shadow-sm">
            <span className="text-sm">🤝</span>
            <span>OUR GLOBAL BUSINESS PARTNERS</span>
          </span>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#101828] tracking-tight leading-tight">
            Trusted by Distributors & <span className="text-[#174A8B]">OEM Partners</span>
          </h2>
          
          <p className="text-[#667085] text-sm sm:text-base md:text-lg mt-3 leading-relaxed max-w-2xl mx-auto font-normal">
            See how wholesale buyers across India and global export markets rely on B&B Plastic for consistent quality and rapid dispatch.
          </p>
        </div>

        {/* Step 2: Proof Points Row (Top Trust Badges) */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-14">
          {trustBadges.map((badge, i) => (
            <div
              key={i}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E4E7EC] shadow-sm text-xs font-bold text-[#101828] hover:border-[#174A8B]/40 transition-colors"
            >
              {badge.icon}
              <span>{badge.label}</span>
            </div>
          ))}
        </div>

        {/* Step 3: Customer Stories (3 Testimonial Cards Carousel) */}
        <div className="relative max-w-6xl mx-auto">
          
          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border border-[#E4E7EC] shadow-sm text-gray-600 hover:text-[#174A8B] hover:border-[#174A8B] flex items-center justify-center text-lg absolute -left-3 sm:-left-6 top-1/2 -translate-y-1/2 z-20 transition-all active:scale-95"
            aria-label="Previous testimonial"
          >
            <FiChevronLeft className="stroke-[2.5]" />
          </button>

          <button
            onClick={handleNext}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white border border-[#E4E7EC] shadow-sm text-gray-600 hover:text-[#174A8B] hover:border-[#174A8B] flex items-center justify-center text-lg absolute -right-3 sm:-right-6 top-1/2 -translate-y-1/2 z-20 transition-all active:scale-95"
            aria-label="Next testimonial"
          >
            <FiChevronRight className="stroke-[2.5]" />
          </button>

          {/* Testimonial Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 items-stretch px-2">
            {testimonials.map((t, idx) => {
              const isSelected = activeIndex === idx;
              return (
                <div
                  key={t.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`testimonial-item bg-white rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'border-2 border-[#174A8B] ring-4 ring-[#174A8B]/10 shadow-md scale-[1.02] z-10'
                      : 'border border-[#E4E7EC] hover:border-gray-300 shadow-sm opacity-95 hover:opacity-100'
                  }`}
                >
                  <div>
                    {/* Rating & Small Unobtrusive Verified Badge */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <FiStar key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        ))}
                      </div>

                      <span
                        className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 border ${
                          isSelected
                            ? 'bg-[#F0F4F8] text-[#174A8B] border-[#E2E8F0]'
                            : 'bg-emerald-50 text-[#16A36A] border-emerald-200'
                        }`}
                      >
                        <FiCheckCircle className="text-xs stroke-[2.5]" />
                        Verified Buyer
                      </span>
                    </div>

                    {/* Concise Quote (2-4 Lines) */}
                    <p className="text-[#101828] text-xs sm:text-sm leading-relaxed italic font-medium mb-4">
                      &ldquo;{t.quote}&rdquo;
                    </p>

                    {/* Read Case Study Link */}
                    <Link
                      to={t.caseStudyUrl}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#174A8B] hover:gap-2 transition-all mb-6"
                    >
                      <span>Read Case Study</span>
                      <FiArrowRight className="text-xs" />
                    </Link>
                  </div>

                  {/* Customer Identity */}
                  <div className="pt-4 border-t border-[#E4E7EC] flex items-center gap-3.5">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover border border-[#E4E7EC] flex-shrink-0 shadow-sm"
                    />
                    <div>
                      <h4 className="font-bold text-[#101828] text-sm sm:text-base leading-snug">
                        {t.name}
                      </h4>
                      <p className="text-[11px] sm:text-xs text-[#667085] leading-tight">
                        {t.role}, <span className="font-semibold text-[#101828]">{t.company}</span>
                      </p>
                      <div className="flex items-center gap-1 text-[11px] text-[#667085] font-medium mt-1">
                        <FiMapPin className="text-xs text-[#667085]" />
                        <span>{t.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Carousel Pagination Indicators */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`transition-all duration-300 ${
                  activeIndex === idx
                    ? 'w-6 h-2 rounded-full bg-[#174A8B]'
                    : 'w-2 h-2 rounded-full bg-blue-200 hover:bg-blue-300'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

        </div>

        {/* Step 4: Dark Business Scale Metrics Strip Underneath (#0B1B33) */}
        <div className="rounded-2xl bg-[#0B1B33] text-white p-6 sm:p-8 lg:p-10 border border-white/10 shadow-xl mt-14 sm:mt-16 relative overflow-hidden max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-left relative z-10">
            
            {/* Metric 1 */}
            <div className="flex items-center gap-4 border-b sm:border-b-0 lg:border-r border-white/10 pb-6 sm:pb-0 pr-0 lg:pr-6">
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-xl bg-[#174A8B]/30 border border-[#174A8B]/50 text-blue-300 flex items-center justify-center flex-shrink-0">
                <FiLayers className="text-2xl stroke-[2]" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black font-mono text-white tracking-tight">
                  500K+
                </div>
                <div className="text-xs sm:text-sm text-slate-300 font-medium mt-0.5">
                  Monthly Units Produced
                </div>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="flex items-center gap-4 border-b sm:border-b-0 lg:border-r border-white/10 pb-6 sm:pb-0 pr-0 lg:pr-6">
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-xl bg-[#174A8B]/30 border border-[#174A8B]/50 text-blue-300 flex items-center justify-center flex-shrink-0">
                <FiHome className="text-2xl stroke-[2]" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black font-mono text-white tracking-tight">
                  150+
                </div>
                <div className="text-xs sm:text-sm text-slate-300 font-medium mt-0.5">
                  Active B2B Distributors
                </div>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="flex items-center gap-4 border-b sm:border-b-0 lg:border-r border-white/10 pb-6 sm:pb-0 pr-0 lg:pr-6">
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-xl bg-[#174A8B]/30 border border-[#174A8B]/50 text-blue-300 flex items-center justify-center flex-shrink-0">
                <FiShield className="text-2xl stroke-[2]" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black font-mono text-white tracking-tight">
                  99.9%
                </div>
                <div className="text-xs sm:text-sm text-slate-300 font-medium mt-0.5">
                  On-Time Dispatch Rate
                </div>
              </div>
            </div>

            {/* Metric 4 */}
            <div className="flex items-center gap-4">
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-xl bg-[#174A8B]/30 border border-[#174A8B]/50 text-blue-300 flex items-center justify-center flex-shrink-0">
                <FiGlobe className="text-2xl stroke-[2]" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black font-mono text-white tracking-tight">
                  20+
                </div>
                <div className="text-xs sm:text-sm text-slate-300 font-medium mt-0.5">
                  States & Export Regions
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default GlobalClientsTestimonials;
