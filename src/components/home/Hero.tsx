import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiShield, FiStar, FiChevronDown } from 'react-icons/fi';
import { RiLeafLine } from 'react-icons/ri';

const Hero: React.FC = () => {
  return (
    <section className="relative w-full min-h-[92vh] lg:min-h-screen bg-[#FAF8F5] text-[#0B1B33] overflow-hidden flex flex-col justify-between pt-24 sm:pt-28 pb-6 md:pb-8">
      {/* High-Resolution Hero Background Image */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <img
          src="/hero-showcase.png"
          alt="B&B Plastics Showcase - Stronger by Quality. Trusted for Life."
          className="w-full h-full object-cover object-right md:object-center filter brightness-[1.0] contrast-[1.02]"
        />
        {/* Soft dynamic gradient overlay to guarantee 100% text legibility on left while keeping right showcase crystal clear */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5]/95 sm:via-[#FAF8F5]/85 md:via-[#FAF8F5]/70 lg:via-[#FAF8F5]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5]/80 via-transparent to-[#FAF8F5]/20 md:hidden" />
      </div>

      {/* Decorative Bottom Left Brand Curve (Deep Navy & Brand Red Accent) */}
      <div className="absolute -bottom-12 -left-12 w-64 h-64 md:w-80 md:h-80 rounded-tr-[120px] rounded-br-[40px] opacity-95 pointer-events-none z-10 hidden sm:block shadow-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#022042] via-[#023061] to-[#174A8B] rounded-tr-[120px] rounded-br-[40px]" />
        <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-[#B2151E] to-[#B2151E]" />
      </div>

      {/* Main Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1320px] relative z-20 flex-1 flex flex-col justify-center my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Typography, Value Proposition & CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="lg:col-span-7 xl:col-span-6 space-y-6 sm:space-y-7 max-w-2xl py-4"
          >
            {/* Top Subtitle Kicker */}
            <div className="flex items-center gap-3">
              <span className="w-8 h-[2.5px] bg-[#B2151E] rounded-full" />
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.22em] text-[#023061] font-sans">
                PREMIUM PLASTIC SOLUTIONS
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] xl:text-[70px] font-black uppercase tracking-tight leading-[1.06] text-[#023061]">
              STRONGER BY <br />
              <span className="text-[#B2151E]">QUALITY.</span> <br />
              TRUSTED FOR LIFE.
            </h1>

            {/* Description Paragraph */}
            <p className="text-[#4B5563] text-sm sm:text-base md:text-lg leading-relaxed font-normal max-w-lg">
              Durable, reliable and thoughtfully designed plastic products for modern living. From home to industry, we bring quality you can count on.
            </p>

            {/* CTA Buttons Row */}
            <div className="flex flex-wrap items-center gap-4 pt-1 sm:pt-2">
              <Link
                to="/products"
                className="px-7 py-3.5 sm:py-4 bg-[#023061] hover:bg-[#0B1B33] text-white text-sm sm:text-base font-bold rounded-full transition-all duration-200 shadow-md hover:shadow-lg shadow-[#023061]/25 flex items-center justify-center gap-2.5 active:scale-95 group"
              >
                <span>Explore Products</span>
                <FiArrowRight className="text-base group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/contact"
                className="px-7 py-3.5 sm:py-4 bg-white/95 hover:bg-white text-[#023061] text-sm sm:text-base font-bold rounded-full transition-all duration-200 border-2 border-[#023061]/20 hover:border-[#023061] shadow-sm hover:shadow flex items-center justify-center active:scale-95"
              >
                <span>Get a Quote</span>
              </Link>
            </div>

            {/* 3 Bottom Feature Trust Badges */}
            <div className="pt-6 sm:pt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 border-t border-[#023061]/10">
              {/* Badge 1 */}
              <div className="flex items-start gap-2.5">
                <div className="p-2 rounded-xl bg-[#023061]/10 text-[#023061] border border-[#023061]/15 mt-0.5">
                  <FiShield className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#0B1B33] leading-tight">
                    Premium Quality
                  </h4>
                  <p className="text-[11px] sm:text-xs text-[#6B7280] font-medium mt-0.5">
                    Built for everyday use
                  </p>
                </div>
              </div>

              {/* Badge 2 */}
              <div className="flex items-start gap-2.5">
                <div className="p-2 rounded-xl bg-[#023061]/10 text-[#023061] border border-[#023061]/15 mt-0.5">
                  <RiLeafLine className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#0B1B33] leading-tight">
                    Eco Friendly
                  </h4>
                  <p className="text-[11px] sm:text-xs text-[#6B7280] font-medium mt-0.5">
                    A cleaner tomorrow
                  </p>
                </div>
              </div>

              {/* Badge 3 */}
              <div className="flex items-start gap-2.5">
                <div className="p-2 rounded-xl bg-[#B2151E]/10 text-[#B2151E] border border-[#B2151E]/15 mt-0.5">
                  <FiStar className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#0B1B33] leading-tight">
                    Wide Range
                  </h4>
                  <p className="text-[11px] sm:text-xs text-[#6B7280] font-medium mt-0.5">
                    Home | Utility | Industrial
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Empty spacer on large screens allowing the background image products to shine through */}
          <div className="hidden lg:block lg:col-span-5 xl:col-span-6 min-h-[460px] pointer-events-none relative">
            {/* The background image seamlessly shows the products */}
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="relative z-20 text-center flex flex-col items-center justify-center gap-1 mt-4">
        <a
          href="#products-section"
          className="group inline-flex flex-col items-center justify-center text-[#023061]/70 hover:text-[#023061] transition-colors"
          aria-label="Scroll to explore products"
        >
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.24em] uppercase font-mono">
            SCROLL TO EXPLORE
          </span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          >
            <FiChevronDown className="w-4 h-4 text-[#023061] stroke-[2.5]" />
          </motion.div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
