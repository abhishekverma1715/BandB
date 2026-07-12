import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import {
  FiArrowRight, FiShield, FiTruck, FiPercent, FiLock,
  FiChevronLeft, FiChevronRight
} from 'react-icons/fi';
import GranuleField from './three/GranuleField';

const heroProducts = [
  { id: 1, name: "BPA-Free Sports Bottle", category: "Food Grade Polymer", feature: "Leak-Proof & Ergonomic Cap", grade: "100% Virgin Tritan / PP", image: "/hero-products/Gemini_Generated_Image_c6lfquc6lfquc6lf.png" },
  { id: 2, name: "Heavy-Duty Modular Stand", category: "Industrial Injection Molding", feature: "High Load Bearing Capacity", grade: "Reinforced High-Impact ABS", image: "/hero-products/Gemini_Generated_Image_key2aykey2aykey2.png" },
  { id: 3, name: "Ergonomic Baby Booster Chair", category: "Child Safety Polymer", feature: "Detachable Tray & Harness", grade: "Non-Toxic Virgin PP/ABS", image: "/hero-products/Gemini_Generated_Image_iz86x8iz86x8iz86.png" },
  { id: 4, name: "Industrial Storage Crate", category: "Heavy-Duty Logistics Container", feature: "Stackable & Ventilated Design", grade: "High-Density Polyethylene", image: "/hero-products/Gemini_Generated_Image_axhokkaxhokkaxho.png" },
  { id: 5, name: "Heavy-Duty Polymer Container", category: "Commercial Storage Solution", feature: "Reinforced Structural Ribs", grade: "100% Virgin HDPE Granules", image: "/hero-products/Gemini_Generated_Image_1040oi1040oi1040.png" },
  { id: 6, name: "Commercial Utility Basin", category: "Industrial & Domestic Tub", feature: "Chemical & Impact Resistant", grade: "Ultra-Grip Polymer Blend", image: "/hero-products/Gemini_Generated_Image_ctb1j3ctb1j3ctb1.png" },
  { id: 7, name: "Precision Measuring Bucket", category: "Specialty Liquid Container", feature: "Dual Liter & Gallon Scale", grade: "Food & Industrial Grade HDPE", image: "/hero-products/Gemini_Generated_Image_vewpifvewpifvewp.png" },
  { id: 8, name: "Ergonomic Utility Bucket", category: "Heavy-Duty Container", feature: "Comfort Grip Handle & Spout", grade: "Premium Injection Molded PP", image: "/hero-products/Gemini_Generated_Image_p20xlxp20xlxp20x.png" }
];

const trustIndicators = [
  { icon: <FiShield className="w-4 h-4" />, label: 'Verified Supplier' },
  { icon: <FiTruck className="w-4 h-4" />, label: 'Fast Dispatch' },
  { icon: <FiPercent className="w-4 h-4" />, label: 'Bulk Discounts' },
  { icon: <FiLock className="w-4 h-4" />, label: 'Secure Payments' },
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const badgeRef = useRef(null);
  const headlineRef = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);
  const trustRef = useRef(null);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroProducts.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isPaused]);

  // Cinematic GSAP entrance — headline lines flip in with 3D perspective,
  // then CTA and trust bar settle in behind it. Runs once on mount.
  useEffect(() => {
    const lines = headlineRef.current?.querySelectorAll('.headline-line');
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    tl.set([badgeRef.current, subRef.current, ctaRef.current, trustRef.current], { opacity: 0 })
      .set(lines, { opacity: 0, y: 60, rotateX: -60, transformPerspective: 900, transformOrigin: '50% 100%' })
      .to(badgeRef.current, { opacity: 1, y: 0, duration: 0.5 }, 0.1)
      .to(lines, { opacity: 1, y: 0, rotateX: 0, duration: 0.9, stagger: 0.12 }, 0.25)
      .to(subRef.current, { opacity: 1, y: 0, duration: 0.6 }, 0.7)
      .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.6 }, 0.85)
      .to(trustRef.current, { opacity: 1, y: 0, duration: 0.6 }, 1.0);

    return () => tl.kill();
  }, []);

  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + heroProducts.length) % heroProducts.length);
  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % heroProducts.length);
  const currentProduct = heroProducts[currentIndex];

  return (
    <section className="relative min-h-screen pt-28 pb-0 lg:py-32 bg-gradient-to-br from-background via-blue-50/40 to-white overflow-hidden flex flex-col justify-center">
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/15 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Column */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <div ref={badgeRef} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-6 border border-primary/20">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              ISO 9001:2015 Certified Polymer Manufacturer
            </div>

            <h1 ref={headlineRef} className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-secondary tracking-tight leading-tight mb-6" style={{ perspective: 900 }}>
              <span className="headline-line block">Your Trusted Partner for</span>
              <span className="headline-line block text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
                Bulk Business Procurement
              </span>
            </h1>

            <p ref={subRef} className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Wholesale-grade plastic products at factory-direct pricing — engineered for consistent MFI, verified purity, and supply chains that scale with your order volume. From MOQ 50 units to full container loads.
            </p>

            <div ref={ctaRef} className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10">
              <Link
                to="/contact"
                className="px-8 py-4 bg-primary text-white rounded-full font-bold shadow-xl shadow-primary/25 hover:bg-blue-700 hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                Request Bulk Quote
                <FiArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/products"
                className="px-8 py-4 bg-white text-secondary border border-gray-200 rounded-full font-bold shadow-md hover:border-primary hover:text-primary hover:scale-105 transition-all duration-300"
              >
                Start Shopping
              </Link>
            </div>

            <div ref={trustRef} className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-gray-200/80 max-w-2xl mx-auto lg:mx-0">
              {trustIndicators.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 justify-center lg:justify-start">
                  <span className="text-primary flex-shrink-0">{item.icon}</span>
                  <span className="text-xs sm:text-sm font-semibold text-gray-700">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Product Showcase */}
          <div
            className="lg:col-span-5 flex flex-col items-center justify-center relative select-none"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* 3D Geodesic Globe structure fitted directly behind the product slider */}
            <GranuleField className="absolute inset-0 w-full h-full opacity-95 pointer-events-none -z-10" />
            <div className="absolute w-80 h-80 sm:w-[420px] sm:h-[420px] bg-gradient-to-tr from-blue-400/20 via-primary/15 to-transparent rounded-full blur-3xl -z-20" />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentProduct.category}
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.3 }}
                className="absolute top-2 right-2 sm:right-4 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg border border-white/60 hidden sm:flex items-center gap-3 z-30"
              >
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                <div>
                  <p className="text-xs font-bold text-gray-800">{currentProduct.category}</p>
                  <p className="text-[10px] text-gray-500">{currentProduct.grade}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="relative w-full h-[420px] sm:h-[500px] lg:h-[540px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentProduct.id}
                  initial={{ opacity: 0, scale: 0.85, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.85, y: -20 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className="flex flex-col items-center justify-center w-full"
                >
                  <motion.img
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
                    src={currentProduct.image}
                    alt={currentProduct.name}
                    className="max-h-[360px] sm:max-h-[430px] lg:max-h-[480px] max-w-[92%] w-auto object-contain drop-shadow-[0_25px_35px_rgba(37,99,235,0.25)]"
                  />
                  <motion.div
                    animate={{ scale: [1, 0.85, 1], opacity: [0.35, 0.2, 0.35] }}
                    transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
                    className="w-64 sm:w-80 h-6 bg-blue-900/20 rounded-full blur-md mt-4"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentProduct.feature}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-16 left-2 sm:left-4 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg border border-white/60 hidden sm:flex items-center gap-3 z-30"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">★</div>
                <div>
                  <p className="text-xs font-bold text-gray-800">{currentProduct.name}</p>
                  <p className="text-[10px] text-gray-500">{currentProduct.feature}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-center gap-3 mt-1 z-30">
              <button onClick={handlePrev} aria-label="Previous product" className="w-9 h-9 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-600 hover:text-primary hover:border-primary transition-colors">
                <FiChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-1.5">
                {heroProducts.map((prod, idx) => (
                  <button
                    key={prod.id}
                    onClick={() => setCurrentIndex(idx)}
                    className={`transition-all duration-300 rounded-full ${idx === currentIndex ? 'w-7 h-2.5 bg-primary shadow-sm shadow-primary/40' : 'w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400'}`}
                    aria-label={`Go to ${prod.name}`}
                  />
                ))}
              </div>
              <button onClick={handleNext} aria-label="Next product" className="w-9 h-9 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-600 hover:text-primary hover:border-primary transition-colors">
                <FiChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;