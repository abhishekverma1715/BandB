import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import {
  FiPackage, FiDroplet, FiUsers, FiLayers, FiTool, FiBox
} from 'react-icons/fi';
import useScrollReveal from './hooks/useScrollReveal';

const categories = [
  { id: 'containers', title: 'Containers & Tubs', count: '42 Products', icon: <FiPackage />, image: '/hero-products/Gemini_Generated_Image_axhokkaxhokkaxho.png' },
  { id: 'bottles', title: 'Food-Grade Bottles', count: '28 Products', icon: <FiDroplet />, image: '/hero-products/Gemini_Generated_Image_c6lfquc6lfquc6lf.png' },
  { id: 'seating', title: 'Ergonomic Seating', count: '19 Products', icon: <FiUsers />, image: '/hero-products/Gemini_Generated_Image_iz86x8iz86x8iz86.png' },
  { id: 'stands', title: 'Stands & Racks', count: '35 Products', icon: <FiLayers />, image: '/hero-products/Gemini_Generated_Image_key2aykey2aykey2.png' },
  { id: 'buckets', title: 'Buckets & Basins', count: '31 Products', icon: <FiBox />, image: '/hero-products/Gemini_Generated_Image_vewpifvewpifvewp.png' },
  { id: 'oem', title: 'Custom OEM Tooling', count: 'Made to Order', icon: <FiTool />, image: '/hero-products/Gemini_Generated_Image_p20xlxp20xlxp20x.png' },
];

const CategoryShowcase = () => {
  const sectionRef = useScrollReveal({ itemSelector: '.category-item', stagger: 0.07, y: 30, rotateX: -12 });

  return (
    <section ref={sectionRef} className="py-16 md:py-20 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-end justify-between mb-10 gap-4">
          <div>
            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-gray-100 text-gray-700 mb-3 border border-gray-200">
              Shop by Category
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-secondary tracking-tight">
              Find What Your Business Needs
            </h2>
          </div>
          <Link
            to="/products"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
          >
            View all categories <FiArrowRight />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to="/products"
              className="category-item group flex flex-col items-center text-center p-5 rounded-2xl border border-gray-200 bg-gray-50/60 hover:bg-white hover:border-primary/40 hover:shadow-lg transition-all duration-300"
            >
              <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-white border border-gray-200 flex items-center justify-center overflow-hidden mb-4 group-hover:scale-105 group-hover:border-primary/40 transition-all duration-300 shadow-sm">
                <img src={cat.image} alt={cat.title} className="w-10 h-10 md:w-12 md:h-12 object-contain" />
              </div>
              <h3 className="font-bold text-secondary text-sm leading-snug group-hover:text-primary transition-colors">
                {cat.title}
              </h3>
              <span className="text-[11px] text-gray-500 font-medium mt-1">{cat.count}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;