import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiEye, FiTarget, FiCheckCircle, FiAward } from 'react-icons/fi';

const About: React.FC = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const manufacturingSteps = [
    {
      title: 'Raw Material Selection',
      desc: 'We source high-quality virgin polymers and recycled materials from certified suppliers. Each batch undergoes rigorous testing for purity and quality.',
    },
    {
      title: 'Processing & Compounding',
      desc: 'Using advanced extruders and compounding equipment; materials are processed with precise temperature control and additive incorporation.',
    },
    {
      title: 'Pelletizing',
      desc: 'The molten polymer is passed through a die and cut into uniform granules using underwater or strand pelletizing systems.',
    },
    {
      title: 'Quality Control',
      desc: 'Every batch undergoes multiple quality checks including MFI testing, color analysis, density measurement and contamination screening.',
    },
    {
      title: 'Packaging',
      desc: 'Granules and injection-molded products are packed in reinforced moisture-barrier lining or customized palletized packaging as per client requirements.',
    },
  ];

  return (
    <>
      <Helmet>
        <title>About Us | B&B Plastic</title>
        <meta
          name="description"
          content="Leading the plastic manufacturing industry with innovation and sustainability. Learn about our story, mission, vision, and manufacturing process."
        />
      </Helmet>

      <div className="min-h-screen bg-[#F7F8FA] pb-24">
        {/* Full-Bleed Editorial Hero Banner with Background Image */}
        <div className="relative pt-32 sm:pt-36 pb-20 sm:pb-24 mb-12 border-b border-[#0B1B33] overflow-hidden bg-[#0B1B33] w-full">
          <img
            src="/about-hero.jpg"
            alt="B&B Plastics Advanced Injection Molding Facility"
            className="absolute inset-0 w-full h-full object-cover object-center min-w-full min-h-full opacity-85 filter brightness-[1.05] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1B33]/80 via-[#0B1B33]/50 to-[#0B1B33]/20" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1320px] relative z-10">
            <div className="max-w-3xl">
              <span className="inline-block px-3.5 py-1 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider bg-[#174A8B]/30 text-blue-300 mb-4 border border-[#174A8B]/50 shadow-sm">
                Company Profile &amp; Heritage
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-5 leading-tight">
                About <span className="text-white">B&amp;B Plastic</span>
              </h1>
              <p className="text-slate-200 text-base sm:text-lg lg:text-xl leading-relaxed font-normal">
                STRONGER BY QUALITY. TRUSTED FOR LIFE. Leading direct manufacturer of precision injection-molded polymer containers, crates, bottles, and commercial seating.
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
                    alt="B&B Plastics Sector-15 GIDA Gorakhpur Facility"
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
                        Precision Injection Molding &amp; Virgin Polymer Engineering
                      </h3>
                      <p className="text-slate-200 text-sm mt-3 leading-relaxed">
                        Operating high-speed robotic injection lines at Sector-15 GIDA Gorakhpur, delivering zero-defect polymer containers globally.
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-4 border-t border-slate-700/80 text-xs text-slate-200 font-bold">
                      <span className="text-[#16A36A]">✓ ISO 9001:2015 QC</span>
                      <span className="text-[#16A36A]">✓ 100% Virgin Grade</span>
                      <span className="text-[#16A36A]">✓ 5M+ Units Produced</span>
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
                  Excellence Built on Precision &amp; Trust
                </h2>
                <div className="space-y-4 text-[#667085] text-base md:text-lg leading-relaxed font-normal">
                  <p>
                    Founded in 2020, B&amp;B Plastic has grown to become one of India's leading manufacturers of premium industrial containers, bottles, and modular polymer systems.
                  </p>
                  <p>
                    With over 7 years of specialized engineering experience in the polymer industry, we have established ourselves as a trusted direct factory partner for B2B distributors and enterprise supply chains.
                  </p>
                  <p>
                    We operate state-of-the-art manufacturing facilities equipped with automated robotic injection molding lines, rigorous MFI/impact testing labs, and multi-cavity hot-runner tooling.
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
              <p className="text-[#667085] mt-2">Driving world-class polymer engineering while promoting circular sustainability</p>
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
                  To become the most trusted and globally recognized manufacturer of industrial plastic vessels and granules, setting the international benchmark in quality, durability, and customer service.
                </p>
                <ul className="space-y-3 text-[#101828] font-medium text-sm">
                  <li className="flex items-center gap-3">
                    <FiCheckCircle className="text-[#174A8B] w-4 h-4 flex-shrink-0" />
                    <span>Global leadership in precision injection molding</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <FiCheckCircle className="text-[#174A8B] w-4 h-4 flex-shrink-0" />
                    <span>Pioneer in sustainable closed-loop polymer solutions</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <FiCheckCircle className="text-[#174A8B] w-4 h-4 flex-shrink-0" />
                    <span>Zero-defect quality benchmark across 25+ countries</span>
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
                  To manufacture high-performance industrial containers and polymer products that exceed client expectations while maintaining eco-responsible recycling standards.
                </p>
                <ul className="space-y-3 text-[#101828] font-medium text-sm">
                  <li className="flex items-center gap-3">
                    <FiCheckCircle className="text-[#16A36A] w-4 h-4 flex-shrink-0" />
                    <span>Deliver strict ISO 9001:2015 consistency in every lot</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <FiCheckCircle className="text-[#16A36A] w-4 h-4 flex-shrink-0" />
                    <span>Provide transparent factory-direct B2B wholesale pricing</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <FiCheckCircle className="text-[#16A36A] w-4 h-4 flex-shrink-0" />
                    <span>Continuous R&amp;D in high-impact polymer compounding</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </section>

          {/* Manufacturing Process */}
          <section className="bg-white rounded-2xl p-8 md:p-12 border border-[#E4E7EC] shadow-sm">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-[#174A8B]">Quality Assurance</span>
              <h2 className="text-3xl font-extrabold text-[#101828] mt-2">Manufacturing Process</h2>
              <p className="text-[#667085] mt-2">From virgin raw material testing to automated packaging</p>
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
                <span className="text-xs font-bold uppercase tracking-wider text-[#174A8B]">Executive Desk</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#101828] mb-8 leading-tight">
                Founder Message
              </h2>

              <div className="space-y-5 text-[#667085] text-base md:text-lg leading-relaxed font-normal">
                <p className="font-semibold text-[#101828] text-lg sm:text-xl">
                  Welcome to B&amp;B Plastics.
                </p>

                <p>
                  At B&amp;B Plastics, we are committed to manufacturing high-quality household plastic products that combine durability, functionality, and modern design. Our mission is to deliver products that simplify everyday life while maintaining the highest standards of quality and customer satisfaction.
                </p>

                <p>
                  We firmly believe that excellence is achieved through innovation, continuous improvement, and an uncompromising commitment to quality. Every product that leaves our manufacturing facility reflects our dedication to precision, reliability, and value.
                </p>

                <p>
                  As we continue to expand our capabilities and product portfolio, our focus remains on building long-term relationships with customers, business partners, and stakeholders through trust, transparency, and consistent performance.
                </p>

                <p>
                  I extend my sincere gratitude to our customers, employees, suppliers, and associates for their continued confidence and support. Together, we will continue to create innovative solutions and build a stronger, more sustainable future.
                </p>
              </div>

              <div className="mt-10 pt-6 border-t border-[#E4E7EC] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <p className="text-xs text-[#667085] font-semibold uppercase tracking-wider mb-1">With Best Regards,</p>
                  <p className="text-xl font-black text-[#174A8B]">B&amp;B Plastics</p>
                </div>
                <div className="bg-[#F0F4F8] px-4 py-2 rounded-xl border border-[#E2E8F0] text-xs font-bold text-[#174A8B]">
                  Gorakhpur • Uttar Pradesh • India
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
