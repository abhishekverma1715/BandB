import React from 'react';
import { motion } from 'framer-motion';
import {
  FiShield,
  FiActivity,
  FiArrowRight,
  FiFileText,
  FiTarget,
  FiLayers,
  FiCheckCircle
} from 'react-icons/fi';

const QualityComplianceHub = () => {
  return (
    <section className="bg-[#0B1B33] text-white py-16 sm:py-20 relative overflow-hidden font-sans border-t border-slate-800">
      <div className="container mx-auto px-4 max-w-[1320px] relative z-10">
        
        {/* Top Centered Pill Badge */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#174A8B]/30 border border-[#174A8B]/50 text-blue-300 text-xs font-bold uppercase tracking-wider">
            <FiShield className="w-3.5 h-3.5 text-blue-300" />
            <span>INTERNATIONAL COMPLIANCE & LAB TESTING</span>
          </div>
        </div>

        {/* Top Grid: Left Info & Right Glass Microscope Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
          
          {/* Left Column: Heading & Key Metrics */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
                Certified Purity. <br />
                <span className="text-[#16A36A]">
                  Zero Compromise.
                </span>
              </h2>
              <p className="text-slate-300 text-base sm:text-lg mt-4 font-normal leading-relaxed max-w-xl">
                Every batch is tested, documented and traceable from raw polymer to finished product.
              </p>
            </div>

            {/* Metrics & Certification Row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 pt-4">
              
              {/* Stat Block */}
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-5xl sm:text-6xl font-black text-white tracking-tight font-mono">
                    99.99%
                  </span>
                  <div className="w-9 h-9 rounded-full bg-[#174A8B]/20 border border-[#174A8B]/40 flex items-center justify-center text-blue-300 shadow-sm">
                    <FiActivity className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-xs font-bold text-blue-300 uppercase tracking-wider mt-2">
                  BATCH ACCEPTANCE RATE
                </p>
              </div>

              {/* Vertical Separator */}
              <div className="hidden sm:block w-px h-20 bg-slate-800" />

              {/* ISO Certification Box */}
              <div className="space-y-1 max-w-xs">
                <h3 className="text-xl font-bold text-white tracking-tight">
                  ISO 9001:2015
                </h3>
                <p className="text-[11px] font-bold text-[#16A36A] uppercase tracking-wider">
                  CERTIFIED SYSTEM
                </p>
                <p className="text-xs text-slate-300 leading-relaxed font-normal mt-1">
                  Every production batch passes multi-stage inspection to ensure consistent quality you can trust.
                </p>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-300 hover:text-white mt-2 transition-all group"
                >
                  <span>View Certification</span>
                  <FiArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

            </div>
          </div>

          {/* Right Column: Hero Lab Image Stage */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-[#0F223D] shadow-xl h-[360px] group">
              <img
                src="/perks-assets/virgin-granules-lab.jpg"
                alt="Lab Polymer Resin Granules Testing"
                className="w-full h-full object-cover object-center filter brightness-95 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0B1B33]/90 via-[#0B1B33]/40 to-transparent" />

              {/* Floating Glass Feature List Overlay (Right Side) */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 space-y-3 w-64 z-10 hidden sm:block">
                
                <div className="bg-[#0B1B33]/90 backdrop-blur-md border border-slate-800 rounded-xl p-3 flex items-center gap-3 shadow-md">
                  <div className="p-2 rounded-lg bg-[#174A8B]/30 text-blue-300 border border-[#174A8B]/40 shrink-0">
                    <FiShield className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Raw Material Verification</h4>
                    <p className="text-[10px] text-slate-300">100% virgin grade polymer</p>
                  </div>
                </div>

                <div className="bg-[#0B1B33]/90 backdrop-blur-md border border-slate-800 rounded-xl p-3 flex items-center gap-3 shadow-md">
                  <div className="p-2 rounded-lg bg-[#174A8B]/30 text-blue-300 border border-[#174A8B]/40 shrink-0">
                    <FiActivity className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">In-House Lab Testing</h4>
                    <p className="text-[10px] text-slate-300">Advanced testing equipment</p>
                  </div>
                </div>

                <div className="bg-[#0B1B33]/90 backdrop-blur-md border border-slate-800 rounded-xl p-3 flex items-center gap-3 shadow-md">
                  <div className="p-2 rounded-lg bg-[#16A36A]/20 text-[#16A36A] border border-[#16A36A]/30 shrink-0">
                    <FiTarget className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Precision Inspection</h4>
                    <p className="text-[10px] text-slate-300">Multi-stage quality checks</p>
                  </div>
                </div>

                <div className="bg-[#0B1B33]/90 backdrop-blur-md border border-slate-800 rounded-xl p-3 flex items-center gap-3 shadow-md">
                  <div className="p-2 rounded-lg bg-[#16A36A]/20 text-[#16A36A] border border-[#16A36A]/30 shrink-0">
                    <FiFileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Digital Traceability</h4>
                    <p className="text-[10px] text-slate-300">Batch records you can trust</p>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

        {/* Middle Section: 4-Node Process Timeline */}
        <div className="bg-[#0F223D] border border-slate-800 rounded-2xl p-8 mb-8 relative overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            
            {/* Step 01 */}
            <div className="text-center flex flex-col items-center">
              <span className="font-mono text-xs font-bold text-blue-300 mb-3 block">01</span>
              <div className="w-14 h-14 rounded-full bg-[#0B1B33] border border-[#174A8B]/50 text-[#16A36A] flex items-center justify-center mb-4 shadow-sm">
                <FiLayers className="w-6 h-6" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-1">
                MATERIAL PURITY
              </h3>
              <p className="text-sm font-bold text-white mb-1">100% Virgin Grade Polymer</p>
              <p className="text-xs text-slate-300 font-normal">Guaranteed purity. No fillers.</p>
            </div>

            {/* Step 02 */}
            <div className="text-center flex flex-col items-center">
              <span className="font-mono text-xs font-bold text-blue-300 mb-3 block">02</span>
              <div className="w-14 h-14 rounded-full bg-[#0B1B33] border border-[#174A8B]/50 text-blue-300 flex items-center justify-center mb-4 shadow-sm">
                <FiTarget className="w-6 h-6" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-1">
                PRECISION MOLDING
              </h3>
              <p className="text-sm font-bold text-white mb-1">±0.05mm Micro-Tolerance</p>
              <p className="text-xs text-slate-300 font-normal">Dimensional accuracy assured.</p>
            </div>

            {/* Step 03 */}
            <div className="text-center flex flex-col items-center">
              <span className="font-mono text-xs font-bold text-blue-300 mb-3 block">03</span>
              <div className="w-14 h-14 rounded-full bg-[#0B1B33] border border-[#174A8B]/50 text-blue-300 flex items-center justify-center mb-4 shadow-sm">
                <FiShield className="w-6 h-6" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-1">
                MECHANICAL TESTING
              </h3>
              <p className="text-sm font-bold text-white mb-1">5-Meter Drop & 250kg Load</p>
              <p className="text-xs text-slate-300 font-normal">Products built for real-world use.</p>
            </div>

            {/* Step 04 */}
            <div className="text-center flex flex-col items-center">
              <span className="font-mono text-xs font-bold text-blue-300 mb-3 block">04</span>
              <div className="w-14 h-14 rounded-full bg-[#0B1B33] border border-[#174A8B]/50 text-[#16A36A] flex items-center justify-center mb-4 shadow-sm">
                <FiFileText className="w-6 h-6" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-1">
                TRACEABILITY RECORDS
              </h3>
              <p className="text-sm font-bold text-white mb-1">Digital Batch Documentation</p>
              <p className="text-xs text-slate-300 font-normal">Complete traceability. Always.</p>
            </div>

          </div>
        </div>

        {/* Bottom Banner: Audit Ready Documentation */}
        <div className="bg-[#0F223D] border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-md">
          
          <div className="flex items-center gap-6 w-full lg:w-auto">
            <div className="w-28 sm:w-36 h-28 sm:h-32 rounded-xl overflow-hidden border border-slate-800 shrink-0 shadow-sm bg-[#0B1B33]">
              <img
                src="/perks-assets/quality-dossier.jpg"
                alt="Quality Dossier Binder"
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                Audit Ready Documentation
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md font-normal leading-relaxed">
                Request FDA compliance statements, RoHS declarations, and full lab test dossiers for your procurement file.
              </p>
              
              {/* Checkmark Pills */}
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="text-[11px] font-semibold text-slate-200 bg-[#0B1B33] px-2.5 py-1 rounded-full border border-slate-800 flex items-center gap-1">
                  <FiCheckCircle className="text-[#16A36A]" /> ISO 9001:2015
                </span>
                <span className="text-[11px] font-semibold text-slate-200 bg-[#0B1B33] px-2.5 py-1 rounded-full border border-slate-800 flex items-center gap-1">
                  <FiCheckCircle className="text-[#16A36A]" /> FDA Compliant
                </span>
                <span className="text-[11px] font-semibold text-slate-200 bg-[#0B1B33] px-2.5 py-1 rounded-full border border-slate-800 flex items-center gap-1">
                  <FiCheckCircle className="text-[#16A36A]" /> RoHS Certified
                </span>
                <span className="text-[11px] font-semibold text-slate-200 bg-[#0B1B33] px-2.5 py-1 rounded-full border border-slate-800 flex items-center gap-1">
                  <FiCheckCircle className="text-[#16A36A]" /> COA / CoC
                </span>
              </div>
            </div>
          </div>

          {/* Right Action Button */}
          <div className="text-center lg:text-right shrink-0 w-full lg:w-auto">
            <a
              href="/contact?tab=dossier"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-[#174A8B] hover:bg-[#2563B5] text-white font-semibold text-sm shadow-sm transition-all w-full sm:w-auto"
            >
              <FiFileText className="text-lg" />
              <span>Request Quality Dossier</span>
              <FiArrowRight className="text-base" />
            </a>
            <p className="text-[11px] text-slate-400 mt-2 font-medium">
              Quick response • Secure & Confidential
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default QualityComplianceHub;

