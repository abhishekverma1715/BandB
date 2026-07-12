import React from 'react';
import { FiTrendingUp, FiAward, FiGlobe, FiUsers } from 'react-icons/fi';
import useScrollReveal from './hooks/useScrollReveal.jsx';

const stats = [
  {
    label: 'Precision Injection Molding Experience',
    value: '25+ Years',
    subtext: 'Continuous manufacturing excellence since 1999',
    icon: <FiAward className="text-primary text-2xl" />
  },
  {
    label: 'Industrial & Wholesale Catalog Products',
    value: '150+ SKUs',
    subtext: 'Heavy-duty crates, tubs, containers & ergonomic seating',
    icon: <FiTrendingUp className="text-emerald-500 text-2xl" />
  },
  {
    label: 'Active Global Wholesale Buyers',
    value: '5,000+ Brands',
    subtext: 'Trusted by distributors across 15+ countries worldwide',
    icon: <FiUsers className="text-blue-500 text-2xl" />
  },
  {
    label: 'On-Time Dispatch Rate',
    value: '99.4%',
    subtext: 'Automated warehouse logistics & pallet freight dispatch',
    icon: <FiGlobe className="text-amber-500 text-2xl" />
  }
];

const Stats = () => {
  const sectionRef = useScrollReveal({
    itemSelector: '.stat-card',
    y: 30,
    rotateX: 0,
    duration: 0.75,
  });

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50 border-y border-gray-200">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-3.5 py-1.5 rounded-full">
            Proven Industrial Reliability
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-secondary mt-3">
            Wholesale Scale You Can Count On
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="stat-card bg-white p-8 rounded-3xl border border-gray-200 hover:border-primary/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center mb-5">
                  {stat.icon}
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-secondary tracking-tight mb-2">
                  {stat.value}
                </h3>
                <p className="font-bold text-gray-800 text-sm mb-2">
                  {stat.label}
                </p>
              </div>
              <p className="text-xs text-gray-500 pt-3 border-t border-gray-100 leading-relaxed">
                {stat.subtext}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
