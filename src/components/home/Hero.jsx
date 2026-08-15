import React from 'react';
import { motion } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';

const Hero = () => {
  return (
    <section className="relative w-full h-screen min-h-[600px] flex flex-col justify-end items-center overflow-hidden bg-[#0B1B33]">
      {/* Full-Screen Background Image with Ultra-Clean Bright Visibility */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <img
          src="/hero-bg.png"
          alt="B&B Plastic Products Full Collection Showcase"
          className="w-full h-full object-cover object-center filter brightness-[0.98] contrast-[1.02]"
        />
        {/* Soft subtle top shadow to keep top header navigation readable */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#0B1B33]/70 to-transparent pointer-events-none" />
        {/* Soft subtle bottom shadow to transition into content below */}
        <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#0B1B33]/80 via-[#0B1B33]/20 to-transparent pointer-events-none" />
      </div>

      {/* Minimal Scroll Down Indicator */}
      <div className="relative z-10 mb-8 flex flex-col items-center gap-2 pointer-events-auto">
        <motion.a
          href="#products-section"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-md hover:bg-[#174A8B]/80 transition-all duration-300 flex items-center justify-center cursor-pointer"
          aria-label="Scroll down to products"
        >
          <FiChevronDown className="w-6 h-6" />
        </motion.a>
      </div>
    </section>
  );
};

export default Hero;