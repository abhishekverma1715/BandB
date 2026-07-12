import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowUpRight, FiLayers, FiBox, FiShield, FiPackage } from 'react-icons/fi';

const wholesaleCategories = [
  {
    id: 1,
    title: "Heavy-Duty Containers & Tubs",
    count: "42 Products",
    moq: "MOQ 100 pcs",
    description: "Stackable industrial crates, commercial utility basins, and reinforced polymer logistics containers.",
    image: "/hero-products/Gemini_Generated_Image_axhokkaxhokkaxho.png",
    grade: "Virgin HDPE / Ultra-Impact PP",
    span: "lg:col-span-7",
    badgeColor: "bg-blue-600"
  },
  {
    id: 2,
    title: "Food-Grade Precision Bottles",
    count: "28 Products",
    moq: "MOQ 100 pcs",
    description: "BPA-free Tritan sports bottles and hermetically sealed food containers for wholesale brands.",
    image: "/hero-products/Gemini_Generated_Image_c6lfquc6lfquc6lf.png",
    grade: "100% Virgin Tritan & FDA PP",
    span: "lg:col-span-5",
    badgeColor: "bg-emerald-600"
  },
  {
    id: 3,
    title: "Ergonomic & Safety Seating",
    count: "19 Products",
    moq: "MOQ 50 pcs",
    description: "Child-safe booster chairs, heavy-duty utility seating, and injection-molded commercial furniture.",
    image: "/hero-products/Gemini_Generated_Image_iz86x8iz86x8iz86.png",
    grade: "Non-Toxic High-Impact Polymer",
    span: "lg:col-span-5",
    badgeColor: "bg-amber-600"
  },
  {
    id: 4,
    title: "Industrial Stands & Racks",
    count: "35 Products",
    moq: "MOQ 50 pcs",
    description: "High load-bearing modular display stands and reinforced warehouse storage solutions.",
    image: "/hero-products/Gemini_Generated_Image_key2aykey2aykey2.png",
    grade: "Reinforced ABS Composite",
    span: "lg:col-span-7",
    badgeColor: "bg-purple-600"
  }
];

const WholesaleCategories = () => {
  return (
    <section className="py-24 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Editorial Faire-Style Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-gray-100 text-gray-700 mb-3 border border-gray-200">
              Curated Wholesale Catalog
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-secondary tracking-tight">
              Browse by <span className="text-primary">Manufacturing Category</span>
            </h2>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-100 hover:bg-secondary hover:text-white text-secondary font-semibold text-sm transition-all duration-300 self-start md:self-auto"
          >
            <span>Explore Complete Catalog</span>
            <FiArrowUpRight className="text-lg" />
          </Link>
        </div>

        {/* Editorial Category Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {wholesaleCategories.map((cat) => (
            <Link
              key={cat.id}
              to="/products"
              className={`${cat.span} group relative rounded-3xl overflow-hidden border border-gray-200 bg-gray-50 hover:shadow-2xl hover:border-primary/40 transition-all duration-500 flex flex-col justify-between h-[420px]`}
            >
              {/* Background Image with Overlay */}
              <div className="absolute inset-0 z-0">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/95 via-secondary/60 to-secondary/15 transition-opacity group-hover:opacity-90" />
              </div>

              {/* Top Bar Tags */}
              <div className="relative z-10 p-7 flex items-center justify-between">
                <span className={`${cat.badgeColor} text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-md uppercase tracking-wide`}>
                  {cat.grade}
                </span>
                <span className="bg-white/20 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/20">
                  {cat.count}
                </span>
              </div>

              {/* Bottom Content Area */}
              <div className="relative z-10 p-7 flex flex-col justify-end">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary bg-white/10 backdrop-blur-sm px-3 py-1 rounded-lg w-fit mb-3 text-white border border-white/15">
                  <FiPackage />
                  <span>{cat.moq}</span>
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white group-hover:text-primary transition-colors">
                    {cat.title}
                  </h3>
                  <div className="w-11 h-11 rounded-full bg-white text-secondary flex items-center justify-center transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:bg-primary group-hover:text-white transition-all shadow-lg">
                    <FiArrowUpRight className="text-xl" />
                  </div>
                </div>
                <p className="text-sm text-gray-300 mt-2 line-clamp-2 max-w-xl leading-relaxed">
                  {cat.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WholesaleCategories;
