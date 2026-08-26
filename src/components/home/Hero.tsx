import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiShield, FiStar, FiChevronDown } from 'react-icons/fi';
import { RiLeafLine } from 'react-icons/ri';

const Hero: React.FC = () => {
  return (
    <section className="relative w-full min-h-[92vh] lg:min-h-screen bg-[#0B1B33] text-white overflow-hidden flex flex-col justify-between pt-24 sm:pt-28 pb-6 md:pb-8">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <img
          src="/hero-showcase.png"
          alt="B&B Plastics — Premium Plastic Products Showcase"
          className="w-full h-full object-cover object-right md:object-center"
        />
        {/* Strong left-to-right overlay so text is always crystal clear */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1B33] via-[#0B1B33]/90 md:via-[#0B1B33]/75 lg:via-[#0B1B33]/55 to-[#0B1B33]/10 lg:to-transparent" />
        {/* Bottom fade for mobile */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B33]/70 via-transparent to-[#0B1B33]/30 md:from-[#0B1B33]/40 md:to-transparent" />
      </div>

      {/* Decorative Bottom-Left Brand Accent */}
      <div className="absolute -bottom-12 -left-12 w-64 h-64 md:w-80 md:h-80 rounded-tr-[120px] rounded-br-[40px] opacity-90 pointer-events-none z-10 hidden sm:block shadow-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#022042] via-[#023061] to-[#174A8B] rounded-tr-[120px] rounded-br-[40px]" />
        <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-[#B2151E] to-[#B2151E]" />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1320px] relative z-20 flex-1 flex flex-col justify-center my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="lg:col-span-7 xl:col-span-6 space-y-5 sm:space-y-6 max-w-xl py-4"
          >
            {/* Kicker */}
            <div className="flex items-center gap-3">
              <span className="w-8 h-[2.5px] bg-[#B2151E] rounded-full" />
              <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-blue-300">
                B&amp;B Plastic
              </span>
            </div>

            {/* Headline — clean, readable sizes */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-black uppercase tracking-tight leading-[1.08] text-white">
              Stronger by{' '}
              <span className="text-[#E8434A]">Quality.</span>
              <br />
              Trusted for Life.
            </h1>

            {/* Short description */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-md">
              Durable, beautifully designed plastic products for home, kitchen, and industry — made from 100% virgin-grade materials.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1">
              <Link
                to="/products"
                className="px-6 sm:px-7 py-3 sm:py-3.5 bg-white text-[#023061] text-sm sm:text-base font-bold rounded-full transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 active:scale-95 group"
              >
                <span>Explore Products</span>
                <FiArrowRight className="text-base group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/contact"
                className="px-6 sm:px-7 py-3 sm:py-3.5 text-white text-sm sm:text-base font-bold rounded-full transition-all duration-200 border-2 border-white/30 hover:border-white hover:bg-white/10 flex items-center justify-center active:scale-95"
              >
                <span>Get a Quote</span>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 sm:pt-7 grid grid-cols-3 gap-4 sm:gap-6 border-t border-white/15">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-white/10 text-white flex-shrink-0">
                  <FiShield className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">
                    Premium Quality
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5 hidden sm:block">
                    100% Virgin Grade
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-white/10 text-white flex-shrink-0">
                  <RiLeafLine className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">
                    Eco Friendly
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5 hidden sm:block">
                    Sustainable Materials
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-[#B2151E]/20 text-[#E8434A] flex-shrink-0">
                  <FiStar className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">
                    27+ Products
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5 hidden sm:block">
                    7 Categories
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column — empty spacer for background image to show through */}
          <div className="hidden lg:block lg:col-span-5 xl:col-span-6 min-h-[460px] pointer-events-none relative" />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="relative z-20 text-center flex flex-col items-center justify-center gap-1 mt-4">
        <a
          href="#products-section"
          className="group inline-flex flex-col items-center justify-center text-white/60 hover:text-white transition-colors"
          aria-label="Scroll to explore products"
        >
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase">
            Scroll to Explore
          </span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          >
            <FiChevronDown className="w-4 h-4 text-white/70 stroke-[2.5]" />
          </motion.div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
