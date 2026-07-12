import React from 'react';
import { FiStar, FiCheckCircle, FiGlobe, FiTrendingUp, FiMapPin } from 'react-icons/fi';
import useScrollReveal from './hooks/useScrollReveal';

const testimonials = [
  {
    name: 'Rajeshwar Sharma',
    role: 'Managing Director, Sharma Poly-Logistics',
    location: 'Lucknow, Uttar Pradesh',
    quote:
      'We have been sourcing 50L heavy-duty containers and industrial crates from B&B Plastic for over three years. Their batch-to-batch consistency and drop-impact resistance are unmatched in North India.',
    rating: 5,
    verified: true,
    volume: 'Monthly FCL Buyer',
  },
  {
    name: 'Vikram Mehta',
    role: 'Head of Procurement, Apex Industrial Supply',
    location: 'Ahmedabad, Gujarat',
    quote:
      'The tiered wholesale discount structure and transparent MOQ made switching our primary supplier seamless. Deliveries arrive on schedule with full Certificates of Analysis every time.',
    rating: 5,
    verified: true,
    volume: '5,000+ Units / Qtr',
  },
  {
    name: 'Elena Rostova',
    role: 'Import Director, EuroContainer Trading',
    location: 'Dubai, UAE',
    quote:
      'B&B Plastic engineered a custom high-impact mold for our utility basins within 20 days. Their virgin resin formulation and export packaging exceeded our European quality audits.',
    rating: 5,
    verified: true,
    volume: 'OEM Custom Partner',
  },
];

const GlobalClientsTestimonials = () => {
  const sectionRef = useScrollReveal({ itemSelector: '.testimonial-item', y: 34 });

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16 testimonial-item">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/10 text-primary mb-3">
            <FiGlobe className="w-3.5 h-3.5" />
            Distributor Trust
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-secondary tracking-tight mb-4">
            Trusted by Distributors & <span className="text-primary">OEM Partners</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
            See how wholesale buyers across India and global export markets rely on B&B Plastic for consistent quality and rapid dispatch.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="testimonial-item bg-white rounded-3xl p-8 border border-gray-200 hover:border-primary/40 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Rating & Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <FiStar key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full flex items-center gap-1">
                    <FiCheckCircle className="w-3.5 h-3.5" />
                    Verified Buyer
                  </span>
                </div>

                {/* Quote */}
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-6 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              {/* Author */}
              <div className="pt-6 border-t border-gray-100">
                <h3 className="font-bold text-secondary text-base">{t.name}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{t.role}</p>
                <div className="flex items-center justify-between mt-3 text-xs font-semibold text-gray-500">
                  <span className="flex items-center gap-1 text-gray-400">
                    <FiMapPin className="w-3.5 h-3.5" />
                    {t.location}
                  </span>
                  <span className="text-primary bg-primary/10 px-2.5 py-0.5 rounded-md font-mono">
                    {t.volume}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global Supply Network Metrics */}
        <div className="rounded-3xl bg-secondary text-white p-8 sm:p-12 border border-white/10 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center testimonial-item">
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-primary font-mono mb-1">500K+</div>
            <div className="text-xs sm:text-sm text-gray-300">Monthly Units Produced</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-primary font-mono mb-1">150+</div>
            <div className="text-xs sm:text-sm text-gray-300">Active B2B Distributors</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-primary font-mono mb-1">99.9%</div>
            <div className="text-xs sm:text-sm text-gray-300">On-Time Dispatch Rate</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-primary font-mono mb-1">20+</div>
            <div className="text-xs sm:text-sm text-gray-300">States & Export Regions</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalClientsTestimonials;