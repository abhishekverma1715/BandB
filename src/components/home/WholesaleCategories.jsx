import React from 'react';
import { Link } from 'react-router-dom';
import {
  FiArrowRight,
  FiArrowUpRight,
  FiShield,
  FiAward,
  FiTruck,
  FiHeadphones,
  FiSettings
} from 'react-icons/fi';

const categories = [
  {
    number: '01',
    title: 'Containers & Tubs',
    count: '42 Products',
    image: '/category-assets/cat-containers-tubs.jpg',
    href: '/products?category=Heavy-Duty%20Containers',
  },
  {
    number: '02',
    title: 'Food-Grade Bottles',
    count: '28 Products',
    image: '/category-assets/cat-food-bottles.jpg',
    href: '/products?category=Food%20Grade%20Polymer',
  },
  {
    number: '03',
    title: 'Ergonomic Seating',
    count: '19 Products',
    image: '/category-assets/cat-plastic-chairs.jpg',
    href: '/products?category=Child%20Safety%20Polymer',
  },
  {
    number: '04',
    title: 'Stands & Racks',
    count: '35 Products',
    image: '/category-assets/cat-stands-racks.jpg',
    href: '/products?category=Industrial%20Molding',
  },
  {
    number: '05',
    title: 'Buckets & Basins',
    count: '31 Products',
    image: '/category-assets/cat-buckets-basins.jpg',
    href: '/products?category=Heavy-Duty%20Containers',
  },
];

export default function WholesaleCategories() {
  return (
    <section className="py-16 md:py-20 bg-white text-[#101828] font-sans">
      <div className="container mx-auto px-4 max-w-[1320px]">
        
        {/* Main Grid: Row 1 (Header Card + Card 01 + Card 02) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          
          {/* Top Left Header Card */}
          <div className="bg-[#F7F8FA] rounded-2xl p-8 md:p-10 border border-[#E4E7EC] shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#174A8B] mb-3 block">
                SHOP BY CATEGORY
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#101828] tracking-tight leading-tight">
                Find what your <span className="text-[#174A8B]">business needs.</span>
              </h2>
              <p className="text-[#667085] text-sm md:text-base mt-4 leading-relaxed font-normal">
                Explore our wide range of high-quality plastic products designed for every industry and everyday use.
              </p>
            </div>
            
            <div className="mt-8">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 text-[#174A8B] font-semibold text-sm hover:gap-3 hover:text-[#2563B5] transition-all group"
              >
                <span>View all categories</span>
                <FiArrowRight className="text-base group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Card 01: Containers & Tubs */}
          <Link
            to={categories[0].href}
            className="group bg-white rounded-2xl border border-[#E4E7EC] shadow-sm hover:shadow-md hover:border-[#174A8B]/50 transition-all duration-300 overflow-hidden flex flex-col justify-between"
          >
            <div className="h-56 bg-slate-100 overflow-hidden relative">
              <img
                src={categories[0].image}
                alt={categories[0].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-mono text-sm font-bold text-[#174A8B]">
                    {categories[0].number}
                  </span>
                  <h3 className="text-lg font-bold text-[#101828] group-hover:text-[#174A8B] transition-colors">
                    {categories[0].title}
                  </h3>
                </div>
                <p className="text-xs text-[#667085] font-medium pl-7">
                  {categories[0].count}
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#174A8B] text-white flex items-center justify-center group-hover:bg-[#2563B5] transition-colors shadow-sm">
                <FiArrowUpRight className="text-lg" />
              </div>
            </div>
          </Link>

          {/* Card 02: Food-Grade Bottles */}
          <Link
            to={categories[1].href}
            className="group bg-white rounded-2xl border border-[#E4E7EC] shadow-sm hover:shadow-md hover:border-[#174A8B]/50 transition-all duration-300 overflow-hidden flex flex-col justify-between"
          >
            <div className="h-56 bg-slate-100 overflow-hidden relative">
              <img
                src={categories[1].image}
                alt={categories[1].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-mono text-sm font-bold text-[#174A8B]">
                    {categories[1].number}
                  </span>
                  <h3 className="text-lg font-bold text-[#101828] group-hover:text-[#174A8B] transition-colors">
                    {categories[1].title}
                  </h3>
                </div>
                <p className="text-xs text-[#667085] font-medium pl-7">
                  {categories[1].count}
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#174A8B] text-white flex items-center justify-center group-hover:bg-[#2563B5] transition-colors shadow-sm">
                <FiArrowUpRight className="text-lg" />
              </div>
            </div>
          </Link>

        </div>

        {/* Row 2: 3 Category Cards (Card 03 + Card 04 + Card 05) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          
          {/* Card 03: Ergonomic Seating */}
          <Link
            to={categories[2].href}
            className="group bg-white rounded-2xl border border-[#E4E7EC] shadow-sm hover:shadow-md hover:border-[#174A8B]/50 transition-all duration-300 overflow-hidden flex flex-col justify-between"
          >
            <div className="h-48 bg-slate-100 overflow-hidden relative">
              <img
                src={categories[2].image}
                alt={categories[2].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-mono text-sm font-bold text-[#174A8B]">
                    {categories[2].number}
                  </span>
                  <h3 className="text-lg font-bold text-[#101828] group-hover:text-[#174A8B] transition-colors">
                    {categories[2].title}
                  </h3>
                </div>
                <p className="text-xs text-[#667085] font-medium pl-7">
                  {categories[2].count}
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#174A8B] text-white flex items-center justify-center group-hover:bg-[#2563B5] transition-colors shadow-sm">
                <FiArrowUpRight className="text-lg" />
              </div>
            </div>
          </Link>

          {/* Card 04: Stands & Racks */}
          <Link
            to={categories[3].href}
            className="group bg-white rounded-2xl border border-[#E4E7EC] shadow-sm hover:shadow-md hover:border-[#174A8B]/50 transition-all duration-300 overflow-hidden flex flex-col justify-between"
          >
            <div className="h-48 bg-slate-100 overflow-hidden relative">
              <img
                src={categories[3].image}
                alt={categories[3].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-mono text-sm font-bold text-[#174A8B]">
                    {categories[3].number}
                  </span>
                  <h3 className="text-lg font-bold text-[#101828] group-hover:text-[#174A8B] transition-colors">
                    {categories[3].title}
                  </h3>
                </div>
                <p className="text-xs text-[#667085] font-medium pl-7">
                  {categories[3].count}
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#174A8B] text-white flex items-center justify-center group-hover:bg-[#2563B5] transition-colors shadow-sm">
                <FiArrowUpRight className="text-lg" />
              </div>
            </div>
          </Link>

          {/* Card 05: Buckets & Basins */}
          <Link
            to={categories[4].href}
            className="group bg-white rounded-2xl border border-[#E4E7EC] shadow-sm hover:shadow-md hover:border-[#174A8B]/50 transition-all duration-300 overflow-hidden flex flex-col justify-between"
          >
            <div className="h-48 bg-slate-100 overflow-hidden relative">
              <img
                src={categories[4].image}
                alt={categories[4].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-mono text-sm font-bold text-[#174A8B]">
                    {categories[4].number}
                  </span>
                  <h3 className="text-lg font-bold text-[#101828] group-hover:text-[#174A8B] transition-colors">
                    {categories[4].title}
                  </h3>
                </div>
                <p className="text-xs text-[#667085] font-medium pl-7">
                  {categories[4].count}
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#174A8B] text-white flex items-center justify-center group-hover:bg-[#2563B5] transition-colors shadow-sm">
                <FiArrowUpRight className="text-lg" />
              </div>
            </div>
          </Link>

        </div>

        {/* Row 3: Card 06 Custom OEM Tooling (Full Width Banner) */}
        <div className="bg-[#F7F8FA] rounded-2xl border border-[#E4E7EC] shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden mb-6 p-6 md:p-8 relative flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5 z-10">
            <div className="w-14 h-14 rounded-2xl bg-[#F0F4F8] text-[#174A8B] border border-[#E2E8F0] flex items-center justify-center shrink-0 shadow-sm">
              <FiSettings className="text-2xl" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="font-mono text-base font-bold text-[#174A8B]">06</span>
                <h3 className="text-xl md:text-2xl font-extrabold text-[#101828]">
                  Custom OEM Tooling
                </h3>
              </div>
              <p className="text-sm text-[#667085] font-medium pl-9">
                Made to Order Solutions
              </p>
            </div>
          </div>

          <div className="relative w-full md:w-1/2 h-32 md:h-28 rounded-xl overflow-hidden border border-[#E4E7EC]">
            <img
              src="/category-assets/cat-oem-tooling.jpg"
              alt="Custom OEM Tooling"
              className="w-full h-full object-cover"
            />
          </div>

          <Link
            to="/contact?tab=oem"
            className="z-10 inline-flex items-center gap-2 text-[#174A8B] font-semibold text-sm hover:text-[#2563B5] hover:gap-3 transition-all shrink-0"
          >
            <span>Explore OEM Solutions</span>
            <FiArrowRight className="text-base" />
          </Link>
        </div>

        {/* Row 4: Bottom 4-Item Feature Perks Strip */}
        <div className="bg-white rounded-2xl border border-[#E4E7EC] shadow-sm py-4 px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-[#E4E7EC]">
          
          <div className="flex items-center gap-3 pt-2 sm:pt-0 sm:px-4">
            <div className="w-10 h-10 rounded-xl bg-[#F0F4F8] text-[#174A8B] flex items-center justify-center shrink-0">
              <FiShield className="text-xl" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#101828]">Premium Quality</h4>
              <p className="text-[11px] text-[#667085]">Durable & long-lasting products</p>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2 sm:pt-0 sm:px-4">
            <div className="w-10 h-10 rounded-xl bg-[#F0F4F8] text-[#174A8B] flex items-center justify-center shrink-0">
              <FiAward className="text-xl" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#101828]">Factory Direct</h4>
              <p className="text-[11px] text-[#667085]">Best prices, no middlemen</p>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2 sm:pt-0 sm:px-4">
            <div className="w-10 h-10 rounded-xl bg-[#F0F4F8] text-[#174A8B] flex items-center justify-center shrink-0">
              <FiTruck className="text-xl" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#101828]">Express Shipping</h4>
              <p className="text-[11px] text-[#667085]">On-time delivery, every time</p>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2 sm:pt-0 sm:px-4">
            <div className="w-10 h-10 rounded-xl bg-[#F0F4F8] text-[#174A8B] flex items-center justify-center shrink-0">
              <FiHeadphones className="text-xl" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#101828]">Expert Support</h4>
              <p className="text-[11px] text-[#667085]">We're here to help you grow</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

