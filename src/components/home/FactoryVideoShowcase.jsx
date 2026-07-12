import React, { useState } from 'react';
import { FiPlay, FiCheckCircle, FiAward, FiShield, FiCpu } from 'react-icons/fi';
import useScrollReveal from './hooks/useScrollReveal';

const factoryHighlights = [
  {
    icon: <FiCpu className="w-6 h-6 text-primary" />,
    title: 'Automated Injection Molding',
    desc: 'State-of-the-art high-tonnage molding machines operating with robotic precision and sub-millimeter tolerances.',
  },
  {
    icon: <FiShield className="w-6 h-6 text-primary" />,
    title: '100% Virgin Polymer Resins',
    desc: 'We use strictly certified virgin HDPE, PP, ABS, and Tritan resins for superior structural integrity and food safety.',
  },
  {
    icon: <FiAward className="w-6 h-6 text-primary" />,
    title: 'ISO 9001:2015 Quality Lab',
    desc: 'In-house drop impact testing, hydrostatic pressure verification, and batch certification before every shipment.',
  },
];

const FactoryVideoShowcase = () => {
  const sectionRef = useScrollReveal({ itemSelector: '.factory-item', y: 36 });
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section ref={sectionRef} className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-5 factory-item">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/10 text-primary mb-4">
              Factory Infrastructure
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-secondary tracking-tight leading-tight mb-6">
              Precision Polymer <span className="text-primary">Manufacturing</span> at Scale
            </h2>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8">
              Take a virtual look inside B&B Plastic’s Gorakhpur facility. Equipped with advanced automated injection molding lines, we deliver consistent quality for bulk commercial orders across India and abroad.
            </p>

            <div className="space-y-6">
              {factoryHighlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-secondary mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Video / Visual Column */}
          <div className="lg:col-span-7 factory-item">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200 bg-secondary aspect-video group">
              {!isPlaying ? (
                <>
                  <img
                    src="/hero-products/Gemini_Generated_Image_axhokkaxhokkaxho.png"
                    alt="B&B Plastic Manufacturing Facility"
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-secondary/20 to-transparent flex flex-col justify-end p-8 sm:p-10">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-blue-300 bg-primary/30 px-3 py-1 rounded-full border border-blue-400/30">
                          Facility Tour
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                          Inside the Injection Molding & Quality Control Center
                        </h3>
                      </div>
                      <button
                        onClick={() => setIsPlaying(true)}
                        aria-label="Play Factory Video"
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary hover:bg-blue-600 text-white flex items-center justify-center shadow-xl shadow-primary/40 group-hover:scale-110 transition-all duration-300 flex-shrink-0"
                      >
                        <FiPlay className="w-7 h-7 sm:w-8 sm:h-8 ml-1 fill-white" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="w-full h-full bg-secondary flex items-center justify-center p-6 text-center text-white">
                  <div>
                    <FiCheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">Facility Tour Live Stream</h3>
                    <p className="text-gray-300 text-sm max-w-md mx-auto">
                      For live video walkthroughs or personalized virtual inspection sessions of our manufacturing floor, please contact our trade desk.
                    </p>
                    <button
                      onClick={() => setIsPlaying(false)}
                      className="mt-6 px-6 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-sm font-semibold transition-colors"
                    >
                      Close Preview
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FactoryVideoShowcase;