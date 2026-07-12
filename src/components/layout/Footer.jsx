import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiMail, FiPhone, FiMapPin, FiClock, FiSend, FiCheckCircle, 
  FiShield, FiAward, FiGlobe, FiArrowRight, FiDownload 
} from 'react-icons/fi';
import Logo from '../common/Logo.jsx';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-slate-950 text-white relative overflow-hidden border-t border-slate-800">
      {/* Subtle Radial Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Trade Newsletter & Catalog Subscription Banner */}
      <div className="border-b border-slate-800/80 bg-slate-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-blue-300 text-xs font-extrabold uppercase tracking-wider mb-3">
                <FiAward className="w-3.5 h-3.5" />
                <span>VIP Wholesale Trade Desk & Catalog</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Get Factory-Direct Pricing & New Mold Alerts
              </h3>
              <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
                Join 1,200+ global distributors. Subscribe to receive our 2026 Wholesale Polymer Catalog, FOB volume discount tiers, and new product announcements.
              </p>
            </div>

            <div className="lg:col-span-5">
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="email"
                    required
                    placeholder="Enter business email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-medium"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-xl bg-primary hover:bg-blue-600 font-bold text-sm text-white transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/30 flex-shrink-0"
                >
                  {subscribed ? (
                    <>
                      <FiCheckCircle className="w-4 h-4 text-emerald-300" />
                      <span>Catalog Sent!</span>
                    </>
                  ) : (
                    <>
                      <span>Get VIP Price List</span>
                      <FiSend className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Trust & Compliance Ribbon */}
      <div className="border-b border-slate-800/80 bg-slate-900/30 py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-wrap items-center justify-center sm:justify-between gap-6 text-xs font-bold text-slate-300">
            <div className="flex items-center gap-2">
              <FiShield className="w-4 h-4 text-primary" />
              <span>ISO 9001:2015 Certified Factory</span>
            </div>
            <div className="flex items-center gap-2">
              <FiCheckCircle className="w-4 h-4 text-emerald-400" />
              <span>100% Virgin Grade Polymer Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <FiGlobe className="w-4 h-4 text-cyan-400" />
              <span>Worldwide FCL & LCL Export Shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Direct OEM Mold Engineering Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Navigation Columns */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Col 1: Brand Info & Mission (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <Link to="/" className="inline-block">
              <Logo variant="horizontal" dark={true} />
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed pr-4">
              Leading direct manufacturer of precision injection-molded polymer containers, commercial tubs, heavy-duty stands, and custom OEM tooling for global distributors.
            </p>

            {/* Live Factory Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold text-slate-200">
                GIDA Gorakhpur Lines: Mass Production Online
              </span>
            </div>
          </div>

          {/* Col 2: Polymer Catalog (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-white mb-5">
              Polymer Catalog
            </h4>
            <ul className="space-y-3 text-sm text-slate-400 font-medium">
              <li>
                <Link to="/products" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <span>Food Grade Bottles</span>
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <span>Industrial Buckets</span>
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <span>Modular Stands</span>
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <span>Heavy-Duty Crates</span>
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <span>Commercial Tubs</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Industry Applications (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-white mb-5">
              Applications
            </h4>
            <ul className="space-y-3 text-sm text-slate-400 font-medium">
              <li>
                <Link to="/about" className="hover:text-primary transition-colors">
                  Food & Beverage Processing
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary transition-colors">
                  Chemical & Agricultural
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary transition-colors">
                  Warehousing & Logistics
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary transition-colors">
                  OEM Private Label Tooling
                </Link>
              </li>
              <li>
                <Link to="/help" className="hover:text-primary transition-colors">
                  FOB / CIF Export Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Direct Factory Headquarters (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-white mb-5">
              Factory Headquarters
            </h4>
            
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-start gap-3">
                <FiMapPin className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                <span>
                  Sector-15, GIDA (Gorakhpur Industrial Development Authority), Gorakhpur, UP - 273209, India
                </span>
              </div>
              <div className="flex items-center gap-3">
                <FiPhone className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="font-semibold text-slate-200">
                  +91 88088 80012 / +91 88088 80021
                </span>
              </div>
              <div className="flex items-center gap-3">
                <FiMail className="w-4 h-4 text-primary flex-shrink-0" />
                <span>bigziaplasticgranules@gmail.com</span>
              </div>
              <div className="flex items-center gap-3">
                <FiClock className="w-4 h-4 text-primary flex-shrink-0" />
                <span>Mon – Sat: 9:00 AM – 6:30 PM IST</span>
              </div>
            </div>

            {/* Direct WhatsApp Engineering Desk Button */}
            <div className="pt-2">
              <a
                href="https://wa.me/918808880012"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-xs text-white transition-all shadow-lg shadow-emerald-600/25"
              >
                <span>💬 Direct Trade Desk WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Copyright Bar */}
      <div className="border-t border-slate-900 bg-black/40 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-wrap items-center gap-6">
            <Link to="/help" className="hover:text-slate-400 transition-colors">Privacy Policy</Link>
            <Link to="/help" className="hover:text-slate-400 transition-colors">ISO 9001 Compliance Statement</Link>
            <Link to="/help" className="hover:text-slate-400 transition-colors">Wholesale FOB Terms</Link>
            <Link to="/contact" className="hover:text-slate-400 transition-colors">Sitemap</Link>
          </div>

          <div className="text-center sm:text-right">
            &copy; {new Date().getFullYear()} <span className="text-slate-400 font-semibold">B&B Plastic</span>. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
