import React from 'react';
import {
  FiPercent, FiDatabase, FiShield, FiTool, FiTruck, FiHeadphones
} from 'react-icons/fi';
import useScrollReveal from './hooks/useScrollReveal';

const advantages = [
  {
    icon: <FiPercent />,
    title: 'Tiered Wholesale Pricing',
    desc: 'Unit price drops automatically as order volume grows — from MOQ to full container load, no negotiation needed.',
    stat: 'Up to 35% off',
    statLabel: 'at 5,000+ units'
  },
  {
    icon: <FiDatabase />,
    title: 'Large Standing Inventory',
    desc: '150+ SKUs held in ready stock across our Gorakhpur facility, so most bulk orders dispatch without a production wait.',
    stat: '150+ SKUs',
    statLabel: 'in active stock'
  },
  {
    icon: <FiShield />,
    title: 'Batch-Certified Quality',
    desc: 'Every lot ships with a Certificate of Analysis and full traceability from raw resin to finished carton.',
    stat: '99.99%',
    statLabel: 'batch acceptance rate'
  },
  {
    icon: <FiTool />,
    title: 'Custom Order Tooling',
    desc: 'Need a proprietary mold, embossed logo, or Pantone-matched color? Our in-house toolroom builds it in 15–25 days.',
    stat: '15–25 days',
    statLabel: 'custom mold turnaround'
  },
  {
    icon: <FiTruck />,
    title: 'Reliable Freight Network',
    desc: 'Palletized, barcoded, and shrink-wrapped for automated warehouse intake — dispatched via sea or air freight globally.',
    stat: '99.4%',
    statLabel: 'on-time dispatch'
  },
  {
    icon: <FiHeadphones />,
    title: 'Dedicated Account Support',
    desc: 'A named trade desk contact handles your quotes, reorders, and freight coordination — not a rotating support queue.',
    stat: '500+',
    statLabel: 'active B2B accounts'
  }
];

const BulkBuyingAdvantages = () => {
  const sectionRef = useScrollReveal({ itemSelector: '.advantage-item' });

  return (
    <section ref={sectionRef} className="py-24 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/10 text-primary mb-4">
            Why Businesses Buy From Us
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-secondary tracking-tight">
            Built for the Way Businesses Actually Order
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((item, idx) => (
            <div
              key={idx}
              className="advantage-item group p-8 rounded-3xl border border-gray-200 bg-gray-50/60 hover:bg-white hover:border-primary/40 hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-xl mb-6 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-secondary mb-2.5">{item.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-6 flex-grow">{item.desc}</p>
              <div className="pt-4 border-t border-gray-200 flex items-baseline gap-2">
                <span className="text-xl font-black text-primary font-mono">{item.stat}</span>
                <span className="text-[11px] text-gray-400 font-medium">{item.statLabel}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BulkBuyingAdvantages;