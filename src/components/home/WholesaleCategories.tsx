import React, { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  FiArrowRight,
  FiArrowUpRight,
  FiShield,
  FiAward,
  FiTruck,
  FiHeadphones,
  FiSettings,
} from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '../../store/store.js';
import { selectAllCategories, fetchCategories } from '../../features/categories/categoriesSlice.js';
import { selectAllProducts, fetchProducts } from '../../features/products/productsSlice.js';

const categoryImages: Record<string, string> = {
  'heavy-duty-containers': '/category-assets/cat-containers-tubs.jpg',
  'food-grade-polymer': '/category-assets/cat-food-bottles.jpg',
  'child-safety-polymer': '/category-assets/cat-plastic-chairs.jpg',
  'industrial-molding': '/category-assets/cat-stands-racks.jpg',
  'household-and-sanitary': '/category-assets/cat-buckets-basins.jpg',
  'kitchen-and-storage-racks': '/category-assets/cat-stands-racks.jpg',
};

const defaultImages = [
  '/category-assets/cat-containers-tubs.jpg',
  '/category-assets/cat-food-bottles.jpg',
  '/category-assets/cat-plastic-chairs.jpg',
  '/category-assets/cat-stands-racks.jpg',
  '/category-assets/cat-buckets-basins.jpg',
];

const WholesaleCategories: React.FC = () => {
  const dispatch = useAppDispatch();
  const rawCategories = useAppSelector(selectAllCategories);
  const products = useAppSelector(selectAllProducts);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
  }, [dispatch]);

  const categories = useMemo(() => {
    return rawCategories.map((cat, idx) => {
      const count = products.filter((p) => p.category === cat.name).length;
      const img = categoryImages[cat.slug] || defaultImages[idx % defaultImages.length];
      return {
        id: cat.id || cat._id,
        number: `0${idx + 1}`.slice(-2),
        title: cat.name,
        count: `${count} ${count === 1 ? 'Product' : 'Products'}`,
        image: img,
        href: `/products?category=${encodeURIComponent(cat.name)}`,
      };
    });
  }, [rawCategories, products]);
  return (
    <section className="py-16 md:py-20 bg-white text-[#101828] font-sans">
      <div className="container mx-auto px-4 max-w-[1320px]">
        {/* Main Grid: Header Card + Dynamic Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

          {/* Dynamic Category Cards */}
          {categories.map((cat) => (
            <Link
              key={cat.id || cat.title}
              to={cat.href}
              className="group bg-white rounded-2xl border border-[#E4E7EC] shadow-sm hover:shadow-md hover:border-[#174A8B]/50 transition-all duration-300 overflow-hidden flex flex-col justify-between min-h-[280px]"
            >
              <div className="h-48 bg-slate-100 overflow-hidden relative">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-mono text-sm font-bold text-[#174A8B]">
                      {cat.number}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-[#101828] group-hover:text-[#174A8B] transition-colors line-clamp-1">
                      {cat.title}
                    </h3>
                  </div>
                  <p className="text-xs text-[#667085] font-medium pl-7">
                    {cat.count}
                  </p>
                </div>
                <div className="w-9 h-9 rounded-xl bg-[#174A8B] text-white flex items-center justify-center group-hover:bg-[#2563B5] transition-colors shadow-sm flex-shrink-0">
                  <FiArrowUpRight className="text-base" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Row 3: Custom OEM Tooling */}
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

        {/* Row 4: Perks Strip */}
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
};

export default WholesaleCategories;
