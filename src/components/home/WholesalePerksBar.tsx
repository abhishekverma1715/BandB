import React from 'react';
import { motion } from 'framer-motion';
import {
  FiDollarSign,
  FiBox,
  FiShield,
  FiTruck,
  FiArrowUpRight,
  FiCheckCircle,
} from 'react-icons/fi';

interface PerkItem {
  number: string;
  statValue: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  badge: string;
  bgImage: string;
}

const perks: PerkItem[] = [
  {
    number: '01',
    statValue: '0% Markup',
    icon: <FiDollarSign className="w-5 h-5 text-[#174A8B]" />,
    title: 'Direct Factory Pricing',
    subtitle: 'Factory-direct wholesale rates with zero intermediary middleman markup.',
    badge: 'Factory Direct',
    bgImage: '/perks-assets/factory-direct.jpg',
  },
  {
    number: '02',
    statValue: '50+ Units',
    icon: <FiBox className="w-5 h-5 text-[#174A8B]" />,
    title: 'Low Minimum MOQ',
    subtitle: 'Flexible wholesale orders starting from just 50 units across our entire catalog.',
    badge: 'MOQ 50+ Units',
    bgImage: '/perks-assets/moq-warehouse.jpg',
  },
  {
    number: '03',
    statValue: '100% Virgin',
    icon: <FiShield className="w-5 h-5 text-[#174A8B]" />,
    title: 'ISO & FDA Certified',
    subtitle: '100% lab-certified food grade virgin polymer granules guaranteed for every batch.',
    badge: 'Virgin Grade',
    bgImage: '/perks-assets/virgin-granules-lab.jpg',
  },
  {
    number: '04',
    statValue: '3-5 Days',
    icon: <FiTruck className="w-5 h-5 text-[#174A8B]" />,
    title: 'Express Logistics',
    subtitle: 'Expedited global pallet freight and rapid 3-5 day dispatch turnaround.',
    badge: 'Express Shipping',
    bgImage: '/perks-assets/express-logistics.jpg',
  },
];

const WholesalePerksBar: React.FC = () => {
  return (
    <section id="products-section" className="bg-[#F7F8FA] text-[#101828] py-12 sm:py-16 relative overflow-hidden border-t border-[#E4E7EC]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-[1320px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {perks.map((perk, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.06 }}
              whileHover={{ y: -4 }}
              className="group relative bg-white border border-[#E4E7EC] hover:border-[#174A8B]/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-[#F0F4F8] border border-[#E2E8F0] text-[#174A8B]">
                    {perk.icon}
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#F0F4F8] text-[#174A8B] border border-[#E2E8F0]">
                    {perk.statValue}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#101828] group-hover:text-[#174A8B] transition-colors leading-snug">
                  {perk.title}
                </h3>
                
                <p className="text-xs text-[#667085] mt-2 leading-relaxed font-normal">
                  {perk.subtitle}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-[#E4E7EC] flex items-center justify-between">
                <span className="text-xs font-semibold text-[#667085] group-hover:text-[#101828] transition-colors flex items-center gap-1.5">
                  <FiCheckCircle className="w-3.5 h-3.5 text-[#16A36A]" />
                  {perk.badge}
                </span>
                <div className="w-7 h-7 rounded-full bg-[#F0F4F8] group-hover:bg-[#174A8B] text-[#667085] group-hover:text-white flex items-center justify-center transition-all duration-200 shadow-sm">
                  <FiArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WholesalePerksBar;
