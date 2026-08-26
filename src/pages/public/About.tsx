import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  FiEye,
  FiTarget,
  FiCheckCircle,
  FiAward,
  FiUsers,
  FiTruck,
  FiBox,
  FiHeart,
} from 'react-icons/fi';

const About: React.FC = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const manufacturingSteps = [
    {
      title: 'Precision Mold Engineering',
      desc: 'Every product starts with meticulously engineered steel molds designed for exact dimensional accuracy, aesthetic finish, and long-run durability — ensuring uniformity across millions of units.',
    },
    {
      title: 'Virgin Raw Material Preparation',
      desc: 'We source only certified virgin-grade Polypropylene (PP), HDPE, ABS, and specialty co-polymers. Each incoming batch is lab-tested for Melt Flow Index, moisture content, and purity before production.',
    },
    {
      title: 'Injection Molding & Forming',
      desc: 'High-speed automated injection molding machines with multi-cavity hot-runner tooling transform raw polymer granules into finished products — from bath mugs and basins to heavy-duty chairs and industrial crates.',
    },
    {
      title: 'Quality Inspection & Testing',
      desc: 'Every production lot undergoes rigorous multi-point inspection including dimensional checks, impact resistance, load-bearing tests, color consistency, and surface finish verification.',
    },
    {
      title: 'Packaging & Dispatch',
      desc: 'Finished products are carefully packed in shrink-wrapped bundles, corrugated cartons, or palletized loads as per client specifications — ready for nationwide and international delivery.',
    },
  ];

  const coreValues = [
    {
      icon: FiAward,
      title: 'Uncompromising Quality',
      desc: 'Every product is manufactured from 100% virgin-grade polymers and tested to meet the highest industry standards before leaving our facility.',
    },
    {
      icon: FiHeart,
      title: 'Customer-First Approach',
      desc: 'We build long-term partnerships through transparent pricing, on-time delivery, and responsive after-sales support.',
    },
    {
      icon: FiBox,
      title: 'Product Innovation',
      desc: 'We continuously invest in new mold designs, modern aesthetics, and functional improvements to keep our catalog relevant and competitive.',
    },
    {
      icon: FiTruck,
      title: 'Reliable Supply Chain',
      desc: 'With large-scale production capacity and efficient logistics, we ensure bulk orders are fulfilled on time across India.',
    },
  ];

  return (
    <>
      <Helmet>
        <title>About Us | B&B Plastic — Premium Plastic Product Manufacturer</title>
        <meta
          name="description"
          content="B&B Plastic is a leading Indian manufacturer of premium household, industrial, and commercial plastic products. Learn about our story, mission, values, and manufacturing process."
        />
      </Helmet>

      <div className="min-h-screen bg-[#F7F8FA] pb-24">
        {/* Hero Banner */}
        <div className="relative pt-32 sm:pt-36 pb-20 sm:pb-24 mb-12 border-b border-[#0B1B33] overflow-hidden bg-[#0B1B33] w-full">
          <img
            src="/about-hero.jpg"
            alt="B&B Plastic Manufacturing Facility — Injection Molding Plant"
            className="absolute inset-0 w-full h-full object-cover object-center min-w-full min-h-full opacity-85 filter brightness-[1.05] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1B33]/80 via-[#0B1B33]/50 to-[#0B1B33]/20" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1320px] relative z-10">
            <div className="max-w-3xl">
              <span className="inline-block px-3.5 py-1 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider bg-[#174A8B]/30 text-blue-300 mb-4 border border-[#174A8B]/50 shadow-sm">
                Our Company &amp; Heritage
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-5 leading-tight">
                About <span className="text-white">B&amp;B Plastic</span>
              </h1>
              <p className="text-slate-200 text-base sm:text-lg lg:text-xl leading-relaxed font-normal">
                STRONGER BY QUALITY. TRUSTED FOR LIFE. — India's trusted manufacturer of premium household, kitchen, sanitary, industrial, and commercial plastic products.
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 max-w-[1320px] space-y-16">
          {/* Our Story Section */}
          <section className="bg-white rounded-2xl p-8 md:p-12 border border-[#E4E7EC] shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                variants={fadeInUp}
                className="lg:col-span-6"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-md min-h-[380px] flex flex-col justify-between border border-gray-700 group bg-[#0B1B33]">
                  <img
                    src="/about-hero.jpg"
                    alt="B&B Plastic Manufacturing Facility at GIDA Gorakhpur"
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 opacity-75 filter brightness-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B33]/85 via-[#0B1B33]/40 to-transparent" />

                  <div className="relative z-10 p-8 flex flex-col justify-between h-full min-h-[380px]">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#174A8B]/30 backdrop-blur-md text-blue-200 text-xs font-bold border border-[#174A8B]/40 w-fit">
                      <FiAward className="w-3.5 h-3.5" />
                      <span>Established 2020 • GIDA Gorakhpur</span>
                    </div>
                    <div className="my-8">
                      <h3 className="text-2xl md:text-3xl font-black text-white leading-tight">
                        From Household Essentials to Industrial Solutions
                      </h3>
                      <p className="text-slate-200 text-sm mt-3 leading-relaxed">
                        Manufacturing premium injection-molded products — bath mugs, storage racks, heavy-duty containers, furniture, and more — at our state-of-the-art GIDA Gorakhpur facility.
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-4 border-t border-slate-700/80 text-xs text-slate-200 font-bold">
                      <span className="text-[#16A36A]">✓ 100% Virgin Grade</span>
                      <span className="text-[#16A36A]">✓ 27+ Products</span>
                      <span className="text-[#16A36A]">✓ 7 Categories</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                variants={fadeInUp}
                className="lg:col-span-6"
              >
                <span className="text-xs font-bold uppercase tracking-wider text-[#174A8B]">Our Story</span>
                <h2 className="text-3xl font-extrabold mt-2 mb-6 text-[#101828]">
                  Building Quality Products for Everyday Life
                </h2>
                <div className="space-y-4 text-[#667085] text-base md:text-lg leading-relaxed font-normal">
                  <p>
                    Founded in 2020, B&amp;B Plastic started with a simple belief — that Indian households and businesses deserve plastic products that are genuinely durable, well-designed, and honestly priced. What began as a small manufacturing unit has grown into a full-scale injection molding facility serving distributors and retailers across India.
                  </p>
                  <p>
                    Our product range spans seven diverse categories: from everyday household essentials like bath mugs, laundry tubs, and planter pots to heavy-duty industrial containers, kitchen storage racks, furniture seating, child-safe products, and food-grade polymer items.
                  </p>
                  <p>
                    Operating from Sector-15, GIDA Gorakhpur (Uttar Pradesh) with a branch office in Ahmedabad (Gujarat), we combine modern injection molding technology with hands-on quality control to deliver products that our customers trust and recommend.
                  </p>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Vision & Mission */}
          <section>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-[#174A8B]">Core Purpose</span>
              <h2 className="text-3xl font-extrabold text-[#101828] mt-2">Our Vision &amp; Mission</h2>
              <p className="text-[#667085] mt-2">
                Driven by a commitment to quality, innovation, and customer satisfaction
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="bg-white p-8 md:p-10 rounded-2xl border border-[#E4E7EC] shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-14 h-14 bg-[#F0F4F8] rounded-xl flex items-center justify-center mb-6 text-[#174A8B]">
                  <FiEye className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-[#101828]">Our Vision</h3>
                <p className="text-[#667085] mb-6 leading-relaxed">
                  To become India's most trusted and recognized manufacturer of premium plastic products — known for consistent quality, modern design, and delivering exceptional value to every customer and partner we serve.
                </p>
                <ul className="space-y-3 text-[#101828] font-medium text-sm">
                  <li className="flex items-center gap-3">
                    <FiCheckCircle className="text-[#174A8B] w-4 h-4 flex-shrink-0" />
                    <span>Be the preferred supplier for distributors and retailers nationwide</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <FiCheckCircle className="text-[#174A8B] w-4 h-4 flex-shrink-0" />
                    <span>Set industry benchmarks in product durability and design</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <FiCheckCircle className="text-[#174A8B] w-4 h-4 flex-shrink-0" />
                    <span>Expand our product portfolio to serve emerging market needs</span>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="bg-white p-8 md:p-10 rounded-2xl border border-[#E4E7EC] shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center mb-6 text-[#16A36A]">
                  <FiTarget className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-[#101828]">Our Mission</h3>
                <p className="text-[#667085] mb-6 leading-relaxed">
                  To manufacture high-quality, durable, and thoughtfully designed plastic products that simplify everyday life — while maintaining transparent pricing, reliable supply, and the highest standards of customer satisfaction.
                </p>
                <ul className="space-y-3 text-[#101828] font-medium text-sm">
                  <li className="flex items-center gap-3">
                    <FiCheckCircle className="text-[#16A36A] w-4 h-4 flex-shrink-0" />
                    <span>Use only 100% virgin-grade raw materials in every product</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <FiCheckCircle className="text-[#16A36A] w-4 h-4 flex-shrink-0" />
                    <span>Offer factory-direct wholesale pricing with full transparency</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <FiCheckCircle className="text-[#16A36A] w-4 h-4 flex-shrink-0" />
                    <span>Continuously innovate with new designs and functional improvements</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </section>

          {/* Core Values */}
          <section>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-[#174A8B]">What We Stand For</span>
              <h2 className="text-3xl font-extrabold text-[#101828] mt-2">Our Core Values</h2>
              <p className="text-[#667085] mt-2">
                The principles that guide everything we do at B&amp;B Plastic
              </p>
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
              }}
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {coreValues.map((value, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-white p-7 rounded-2xl border border-[#E4E7EC] shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="w-12 h-12 bg-[#F0F4F8] rounded-xl flex items-center justify-center mb-5 text-[#174A8B] group-hover:bg-[#174A8B] group-hover:text-white transition-colors">
                    <value.icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold mb-2 text-[#101828]">{value.title}</h4>
                  <p className="text-[#667085] text-sm leading-relaxed">{value.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* Manufacturing Process */}
          <section className="bg-white rounded-2xl p-8 md:p-12 border border-[#E4E7EC] shadow-sm">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-[#174A8B]">How We Make It</span>
              <h2 className="text-3xl font-extrabold text-[#101828] mt-2">Our Manufacturing Process</h2>
              <p className="text-[#667085] mt-2">
                From precision mold design to final packaging — every step ensures the quality you expect
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              {manufacturingSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-50px' }}
                  variants={fadeInUp}
                  className="flex gap-6 mb-8 relative"
                >
                  {index !== manufacturingSteps.length - 1 && (
                    <div className="absolute left-6 top-14 bottom-[-2rem] w-0.5 bg-gray-200" />
                  )}

                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#174A8B] text-white flex items-center justify-center font-black text-base relative z-10 shadow-sm">
                    {index + 1}
                  </div>
                  <div className="bg-[#F7F8FA] p-6 rounded-xl border border-[#E4E7EC] flex-1 hover:border-gray-300 transition-all">
                    <h4 className="text-lg font-bold mb-2 text-[#101828]">{step.title}</h4>
                    <p className="text-[#667085] text-sm md:text-base leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* What We Manufacture */}
          <section>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-[#174A8B]">Product Categories</span>
              <h2 className="text-3xl font-extrabold text-[#101828] mt-2">What We Manufacture</h2>
              <p className="text-[#667085] mt-2">
                A comprehensive range of plastic products designed for home, kitchen, industry, and beyond
              </p>
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
              }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {[
                {
                  title: 'Household & Sanitary',
                  items: 'Bath mugs, laundry basins, tubs, planter pots',
                  color: 'bg-blue-50 text-blue-700 border-blue-100',
                },
                {
                  title: 'Kitchen & Storage Racks',
                  items: 'Modular shelving, organizer racks, kitchen trolleys, corner racks',
                  color: 'bg-emerald-50 text-emerald-700 border-emerald-100',
                },
                {
                  title: 'Heavy-Duty Containers',
                  items: 'Industrial pails, ghamelas, waste bins, packaging buckets',
                  color: 'bg-amber-50 text-amber-700 border-amber-100',
                },
                {
                  title: 'Industrial & Agricultural',
                  items: 'Harvest crates, appliance trolley stands, ventilated crates',
                  color: 'bg-purple-50 text-purple-700 border-purple-100',
                },
                {
                  title: 'Furniture & Seating',
                  items: 'Banquet chairs, rattan-weave chairs, heavy-duty seating',
                  color: 'bg-rose-50 text-rose-700 border-rose-100',
                },
                {
                  title: 'Child Safety & Food Grade',
                  items: 'Study desks, booster chairs, unbreakable food-safe mugs',
                  color: 'bg-cyan-50 text-cyan-700 border-cyan-100',
                },
              ].map((cat, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className={`p-6 rounded-2xl border shadow-sm hover:shadow-md transition-all ${cat.color}`}
                >
                  <h4 className="text-lg font-bold mb-2">{cat.title}</h4>
                  <p className="text-sm opacity-80 leading-relaxed">{cat.items}</p>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* Why Choose Us */}
          <section className="bg-white rounded-2xl p-8 md:p-12 border border-[#E4E7EC] shadow-sm">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-[#174A8B]">Our Advantage</span>
              <h2 className="text-3xl font-extrabold text-[#101828] mt-2">Why Choose B&amp;B Plastic?</h2>
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
              }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
            >
              {[
                {
                  icon: FiCheckCircle,
                  title: '100% Virgin Raw Materials',
                  desc: 'We never use recycled or mixed-grade polymers. Every product is made from certified virgin PP, HDPE, or ABS.',
                },
                {
                  icon: FiUsers,
                  title: 'Factory-Direct Pricing',
                  desc: 'As a direct manufacturer, we eliminate middlemen and offer wholesale pricing that helps your business grow.',
                },
                {
                  icon: FiBox,
                  title: 'Wide Product Range',
                  desc: '27+ products across 7 categories — one supplier for all your household, commercial, and industrial plastic needs.',
                },
                {
                  icon: FiTruck,
                  title: 'Pan-India Delivery',
                  desc: 'Reliable logistics network ensuring timely delivery to major cities, tier-2 towns, and industrial hubs across India.',
                },
                {
                  icon: FiAward,
                  title: 'Consistent Quality',
                  desc: 'Every batch is tested for dimensional accuracy, impact strength, and finish quality before dispatch.',
                },
                {
                  icon: FiHeart,
                  title: 'Dedicated Support',
                  desc: 'A responsive team available via phone, email, and WhatsApp to handle orders, queries, and after-sales support.',
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="flex gap-4 p-5 rounded-xl bg-[#F7F8FA] border border-[#E4E7EC] hover:border-gray-300 transition-all"
                >
                  <item.icon className="w-5 h-5 text-[#174A8B] flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-[#101828] text-base mb-1">{item.title}</h5>
                    <p className="text-[#667085] text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* Founder Message */}
          <section className="bg-white rounded-2xl p-8 md:p-12 border border-[#E4E7EC] shadow-sm">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="max-w-4xl mx-auto"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="h-0.5 w-10 bg-[#174A8B]"></span>
                <span className="text-xs font-bold uppercase tracking-wider text-[#174A8B]">From the Founder&apos;s Desk</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#101828] mb-8 leading-tight">
                A Message from Our Founder
              </h2>

              <div className="space-y-5 text-[#667085] text-base md:text-lg leading-relaxed font-normal">
                <p className="font-semibold text-[#101828] text-lg sm:text-xl">
                  Welcome to B&amp;B Plastic.
                </p>

                <p>
                  When we started B&amp;B Plastic in 2020, our goal was straightforward — to manufacture plastic products that people can genuinely rely on. Not products that crack after a few uses or fade in the sun, but products built with honest materials and real craftsmanship.
                </p>

                <p>
                  Today, we are proud to offer a diverse range of over 27 products spanning household essentials, kitchen storage solutions, heavy-duty industrial containers, furniture, child-safe items, and food-grade polymer products. Every single item is made from 100% virgin-grade raw materials at our manufacturing facility in GIDA, Gorakhpur.
                </p>

                <p>
                  We believe that quality should not be a luxury — it should be the standard. That is why we focus on using the best raw materials, investing in modern injection molding equipment, and maintaining strict quality checks at every stage of production. Our customers — whether they are distributors, retailers, or bulk buyers — trust us because we deliver on our promises, every time.
                </p>

                <p>
                  As we continue to grow, our commitment remains the same: to manufacture products that are stronger by quality and trusted for life. I sincerely thank our customers, team members, suppliers, and well-wishers for their continued support in making this journey possible.
                </p>
              </div>

              <div className="mt-10 pt-6 border-t border-[#E4E7EC] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <p className="text-xs text-[#667085] font-semibold uppercase tracking-wider mb-1">With Best Regards,</p>
                  <p className="text-xl font-black text-[#174A8B]">B&amp;B Plastic</p>
                  <p className="text-sm text-[#667085] mt-1">Founder &amp; Managing Director</p>
                </div>
                <div className="bg-[#F0F4F8] px-4 py-2 rounded-xl border border-[#E2E8F0] text-xs font-bold text-[#174A8B]">
                  Gorakhpur • Ahmedabad • India
                </div>
              </div>
            </motion.div>
          </section>
        </div>
      </div>
    </>
  );
};

export default About;
