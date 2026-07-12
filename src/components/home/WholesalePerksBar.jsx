import React from 'react';
import { FiCheckCircle, FiShield, FiTruck, FiDollarSign, FiAward, FiClock } from 'react-icons/fi';

const perks = [
  {
    icon: <FiAward className="text-primary text-2xl" />,
    title: "Direct Manufacturer Pricing",
    subtitle: "Factory-direct wholesale rates with zero intermediary markup."
  },
  {
    icon: <FiCheckCircle className="text-emerald-500 text-2xl" />,
    title: "Low Minimum Orders (MOQ)",
    subtitle: "Order starting from just 50 units across our entire catalog."
  },
  {
    icon: <FiShield className="text-blue-500 text-2xl" />,
    title: "ISO 9001 & FDA Certified",
    subtitle: "100% virgin polymer granules guaranteed for every batch."
  },
  {
    icon: <FiTruck className="text-amber-500 text-2xl" />,
    title: "Fast Dispatch & Logistics",
    subtitle: "Expedited global pallet freight and reliable 3-5 day lead times."
  }
];

const WholesalePerksBar = () => {
  return (
    <section className="bg-secondary text-white border-y border-gray-800 relative z-20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {perks.map((perk, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="p-3 rounded-xl bg-white/10 group-hover:scale-110 transition-transform flex-shrink-0">
                {perk.icon}
              </div>
              <div>
                <h3 className="font-bold text-sm md:text-base text-white group-hover:text-primary transition-colors">
                  {perk.title}
                </h3>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                  {perk.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WholesalePerksBar;
