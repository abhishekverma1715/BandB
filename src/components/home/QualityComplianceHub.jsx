import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiShield, FiAward, FiCheckCircle, FiActivity, 
  FiCpu, FiRefreshCw, FiExternalLink, FiFileText 
} from 'react-icons/fi';

const complianceLabs = [
  {
    id: 'iso',
    title: 'ISO 9001:2015 Certified System',
    category: 'Quality Assurance',
    metric: '99.99%',
    metricLabel: 'Batch Acceptance Rate',
    description: 'Every production lot undergoes rigorous multi-point optical & mechanical inspection. Digital batch records provide complete traceability from raw polymer pellets to finished cartons.',
    highlights: [
      'Automated Optical Defect Detection',
      'Real-Time SPC Melt & Pressure Monitoring',
      'Certified Certificate of Analysis (CoA) with Every Order'
    ],
    badgeColor: 'from-blue-600 to-indigo-700'
  },
  {
    id: 'virgin',
    title: '100% Virgin Grade Polymer Guarantee',
    category: 'Material Purity',
    metric: '0.00%',
    metricLabel: 'Recycled Filler Contamination',
    description: 'We use exclusively high-molecular-weight virgin Tritan, food-grade HDPE, and impact-modified PP sourced directly from certified global petrochemical leaders.',
    highlights: [
      'BPA-Free & Phthalate-Free Verification',
      'High Molecular Density for Maximum Impact Strength',
      'Zero Toxic Outgassing or Odor Retention'
    ],
    badgeColor: 'from-emerald-600 to-teal-700'
  },
  {
    id: 'precision',
    title: 'Robotic ±0.05mm Micro-Tolerance',
    category: 'Precision Mold Engineering',
    metric: '±0.05mm',
    metricLabel: 'Dimensional Consistency',
    description: 'High-speed Japanese & European robotic injection molding cells maintain ultra-tight tolerances, ensuring perfect gasket seal compression and uniform wall thickness.',
    highlights: [
      'Automated High-Speed Robotic Part Extraction',
      'Uniform Wall Thickness & Zero Flash Edges',
      'Multi-Cavity Hot Runner Tooling Efficiency'
    ],
    badgeColor: 'from-purple-600 to-indigo-700'
  },
  {
    id: 'droptest',
    title: '5-Meter Drop & 250kg Static Load Lab',
    category: 'Mechanical Testing',
    metric: '5.0 Meters',
    metricLabel: 'Impact Drop Survival',
    description: 'Every container line is subjected to severe physical stress testing, including free-fall drop impacts at -20°C and dynamic stacking load simulation up to 250 Kg.',
    highlights: [
      'Cryogenic -20°C Free-Fall Impact Verification',
      'Accelerated UV Weathering & Aging Test',
      'Static & Dynamic Warehouse Stacking Certification'
    ],
    badgeColor: 'from-amber-500 to-orange-600'
  }
];

const QualityComplianceHub = () => {
  const [activeLab, setActiveLab] = useState('iso');
  const selected = complianceLabs.find((item) => item.id === activeLab) || complianceLabs[0];

  return (
    <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Grid & Decorative Light */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#60A5FA_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-xs font-extrabold uppercase tracking-widest mb-4 border border-blue-500/20">
            <FiShield className="w-3.5 h-3.5" />
            <span>International Compliance & Lab Testing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Certified Purity. <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400">Zero Compromise.</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mt-4 leading-relaxed">
            Enterprise procurement requires documented proof. Explore our multi-stage inspection laboratory and international regulatory certifications.
          </p>
        </div>

        {/* 4 Interactive Lab Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {complianceLabs.map((lab) => {
            const isActive = activeLab === lab.id;
            return (
              <button
                key={lab.id}
                onClick={() => setActiveLab(lab.id)}
                className={`text-left p-6 rounded-2xl transition-all duration-300 border flex flex-col justify-between ${
                  isActive
                    ? 'bg-slate-800/90 border-blue-500/60 shadow-xl shadow-blue-500/10 scale-[1.02]'
                    : 'bg-slate-800/40 border-slate-700/50 hover:bg-slate-800/60 hover:border-slate-600'
                }`}
              >
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-2">
                    {lab.category}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-4 leading-snug">
                    {lab.title}
                  </h3>
                </div>
                <div className="pt-4 border-t border-slate-700/60 flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-black text-white">{lab.metric}</div>
                    <div className="text-[11px] text-slate-400">{lab.metricLabel}</div>
                  </div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isActive ? 'bg-blue-500 text-white' : 'bg-slate-700 text-slate-400'}`}>
                    <FiActivity className="w-4 h-4" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Active Lab Showcase Box */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-r from-slate-800/90 to-slate-800/60 rounded-3xl border border-slate-700/70 p-8 sm:p-10 lg:p-12 shadow-2xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold mb-4">
                  <FiCheckCircle className="w-3.5 h-3.5" />
                  <span>Verified Standard Procedure #QC-884</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
                  {selected.title}
                </h3>
                <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6">
                  {selected.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {selected.highlights.map((point, i) => (
                    <div key={i} className="p-4 rounded-xl bg-slate-900/60 border border-slate-700/50">
                      <div className="w-6 h-6 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-black text-xs mb-2">
                        0{i + 1}
                      </div>
                      <div className="text-sm font-semibold text-slate-200">{point}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Side: Interactive Report CTA */}
              <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-900/80 border border-slate-700/60 text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-2xl font-black mb-4 shadow-lg shadow-blue-500/30">
                  <FiAward />
                </div>
                <h4 className="text-lg font-bold text-white mb-1">Audit Ready Documentation</h4>
                <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                  Request FDA compliance statements, RoHS declarations, and full lab test dossiers for your procurement file.
                </p>
                <a
                  href="#contact"
                  className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-sm text-white transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30"
                >
                  <FiFileText className="w-4 h-4" />
                  <span>Request Quality Dossier</span>
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default QualityComplianceHub;
