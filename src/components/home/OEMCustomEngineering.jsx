import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiPhoneCall } from 'react-icons/fi';

const PromoBanner = () => {
  return (
    <section className="py-20 bg-secondary relative overflow-hidden">
      <div className="absolute -top-32 -right-20 w-96 h-96 bg-primary/25 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-32 -left-20 w-96 h-96 bg-blue-400/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#60A5FA_1px,transparent_1px)] [background-size:22px_22px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 text-center lg:text-left">
          <div className="max-w-xl">
            <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/15 text-blue-300 mb-5 border border-primary/25">
              Trade Desk Open — Mon to Sat
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Grow Your Business With Reliable Bulk Supply
            </h2>
            <p className="text-gray-300 text-base sm:text-lg mt-4 leading-relaxed">
              Get a factory-direct quotation in under 24 hours, or talk to our engineers about custom mold tooling for your next SKU.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 flex-shrink-0">
            <Link
              to="/contact"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-primary hover:bg-blue-700 text-white font-bold flex items-center justify-center gap-2 shadow-xl shadow-primary/30 hover:scale-105 transition-all duration-300"
            >
              Get Wholesale Pricing
              <FiArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:+918808880012"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 hover:bg-white/15 text-white font-bold border border-white/20 flex items-center justify-center gap-2 transition-all duration-300"
            >
              <FiPhoneCall className="w-4 h-4" />
              Contact Sales
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;