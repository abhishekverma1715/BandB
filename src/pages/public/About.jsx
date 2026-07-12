import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiEye, FiTarget, FiRefreshCw, FiZap, FiDroplet, FiCheckCircle, FiAward, FiUsers } from 'react-icons/fi';

const About = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const teamMembers = [
    { name: 'Manish Verma', role: 'Chairman & Managing Director', desc: 'CMD, B&B Plastic | Leading strategic vision with sustainable growth' },
    { name: 'Rustam Sahabuddin', role: 'Managing Director', desc: 'Leading operations with vision and accountability.' },
    { name: 'Anand Verma', role: 'Assistant Director', desc: 'Assistant Director, B&B Plastic | Supporting leadership through well planned strategic execution' },
    { name: 'Saquib Ahmad', role: 'Operations Head', desc: 'Operations Head | Driving efficiency, execution and excellence' },
    { name: 'Shivam Chaurasia', role: 'Quality Control Head', desc: 'Polymer testing and quality assurance' },
  ];

  const manufacturingSteps = [
    { title: 'Raw Material Selection', desc: 'We source high-quality virgin polymers and recycled materials from certified suppliers. Each batch undergoes rigorous testing for purity and quality.' },
    { title: 'Processing & Compounding', desc: 'Using advanced extruders and compounding equipment; materials are processed with precise temperature control and additive incorporation.' },
    { title: 'Pelletizing', desc: 'The molten polymer is passed through a die and cut into uniform granules using underwater or strand pelletizing systems.' },
    { title: 'Quality Control', desc: 'Every batch undergoes multiple quality checks including MFI testing, color analysis, density measurement and contamination screening.' },
    { title: 'Packaging', desc: 'Granules and injection-molded products are packed in reinforced moisture-barrier lining or customized palletized packaging as per client requirements.' }
  ];

  return (
    <>
      <Helmet>
        <title>About Us | B&B Plastic</title>
        <meta name="description" content="Leading the plastic manufacturing industry with innovation and sustainability. Learn about our story, mission, vision, and manufacturing process." />
      </Helmet>

      <div className="pt-28 pb-24 min-h-screen bg-gray-50">
        {/* Editorial Hero Banner with Factory Background Image */}
        <div className="relative py-20 sm:py-24 mb-12 border-b border-gray-800 overflow-hidden">
          <img
            src="/about-hero.jpg"
            alt="B&B Plastics Advanced Injection Molding Facility"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/85 to-slate-900/60" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
            <div className="max-w-3xl">
              <span className="inline-block px-3.5 py-1 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider bg-primary/25 text-blue-300 mb-4 border border-primary/40 shadow-sm">
                Company Profile &amp; Heritage
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-5 leading-tight">
                About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-primary">B&amp;B Plastic</span>
              </h1>
              <p className="text-gray-200 text-base sm:text-lg lg:text-xl leading-relaxed font-medium">
                STRONGER BY QUALITY. TRUSTED FOR LIFE. Leading direct manufacturer of precision injection-molded polymer containers, crates, bottles, and commercial seating.
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 max-w-7xl space-y-20">
          {/* Our Story Section */}
          <section className="bg-white rounded-3xl p-8 md:p-12 border border-gray-200/80 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
                className="lg:col-span-6"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl min-h-[380px] flex flex-col justify-between border border-gray-700 group">
                  <img
                    src="/about-hero.jpg"
                    alt="B&B Plastics Sector-15 GIDA Gorakhpur Facility"
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/60 to-slate-900/30" />

                  <div className="relative z-10 p-8 flex flex-col justify-between h-full min-h-[380px]">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/30 backdrop-blur-md text-blue-200 text-xs font-bold border border-primary/40 w-fit">
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
                      <span>✓ ISO 9001:2015 QC</span>
                      <span>✓ 100% Virgin Grade</span>
                      <span>✓ 5M+ Units Produced</span>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
                className="lg:col-span-6"
              >
                <span className="text-xs font-bold uppercase tracking-wider text-primary">Our Story</span>
                <h2 className="text-3xl font-extrabold mt-2 mb-6 text-secondary">
                  Excellence Built on Precision & Trust
                </h2>
                <div className="space-y-4 text-gray-600 text-base md:text-lg leading-relaxed">
                  <p>
                    Founded in 2020, B&B Plastic has grown to become one of India's leading manufacturers of premium industrial containers, bottles, and modular polymer systems.
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
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Core Purpose</span>
              <h2 className="text-3xl font-extrabold text-secondary mt-2">Our Vision & Mission</h2>
              <p className="text-gray-500 mt-2">Driving world-class polymer engineering while promoting circular sustainability</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="bg-white p-8 md:p-10 rounded-3xl border border-gray-200/80 shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary">
                  <FiEye className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-secondary">Our Vision</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  To become the most trusted and globally recognized manufacturer of industrial plastic vessels and granules, setting the international benchmark in quality, durability, and customer service.
                </p>
                <ul className="space-y-3 text-gray-700 font-medium text-sm">
                  <li className="flex items-center gap-3">
                    <FiCheckCircle className="text-primary w-4 h-4 flex-shrink-0" />
                    <span>Global leadership in precision injection molding</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <FiCheckCircle className="text-primary w-4 h-4 flex-shrink-0" />
                    <span>Pioneer in sustainable closed-loop polymer solutions</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <FiCheckCircle className="text-primary w-4 h-4 flex-shrink-0" />
                    <span>Zero-defect quality benchmark across 25+ countries</span>
                  </li>
                </ul>
              </motion.div>

              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="bg-white p-8 md:p-10 rounded-3xl border border-gray-200/80 shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 text-emerald-600">
                  <FiTarget className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-secondary">Our Mission</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  To manufacture high-performance industrial containers and polymer products that exceed client expectations while maintaining eco-responsible recycling standards.
                </p>
                <ul className="space-y-3 text-gray-700 font-medium text-sm">
                  <li className="flex items-center gap-3">
                    <FiCheckCircle className="text-emerald-500 w-4 h-4 flex-shrink-0" />
                    <span>Deliver strict ISO 9001:2015 consistency in every lot</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <FiCheckCircle className="text-emerald-500 w-4 h-4 flex-shrink-0" />
                    <span>Provide transparent factory-direct B2B wholesale pricing</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <FiCheckCircle className="text-emerald-500 w-4 h-4 flex-shrink-0" />
                    <span>Continuous R&D in high-impact polymer compounding</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </section>

          {/* Manufacturing Process */}
          <section className="bg-white rounded-3xl p-8 md:p-12 border border-gray-200/80 shadow-sm">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Quality Assurance</span>
              <h2 className="text-3xl font-extrabold text-secondary mt-2">Manufacturing Process</h2>
              <p className="text-gray-500 mt-2">From virgin raw material testing to automated packaging</p>
            </div>

            <div className="max-w-4xl mx-auto">
              {manufacturingSteps.map((step, index) => (
                <motion.div 
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeInUp}
                  className="flex gap-6 mb-8 relative"
                >
                  {index !== manufacturingSteps.length - 1 && (
                    <div className="absolute left-6 top-14 bottom-[-2rem] w-0.5 bg-gray-200" />
                  )}
                  
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center font-black text-base relative z-10 shadow-lg shadow-primary/30">
                    {index + 1}
                  </div>
                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex-1 hover:border-gray-200 transition-all">
                    <h4 className="text-lg font-bold mb-2 text-secondary">{step.title}</h4>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Sustainability Section */}
          <section className="bg-white rounded-3xl p-8 md:p-12 border border-gray-200/80 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="lg:col-span-7"
              >
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Eco-Responsible</span>
                <h2 className="text-3xl font-extrabold text-secondary mt-2 mb-6">
                  Sustainability & Circular Innovation
                </h2>
                <p className="text-gray-600 text-base md:text-lg mb-8 leading-relaxed">
                  At B&B Plastics, we integrate eco-friendly practices across our GIDA Gorakhpur facility without compromising mechanical strength or hygiene standards.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-100">
                    <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-600 mb-3">
                      <FiRefreshCw className="w-5 h-5" />
                    </div>
                    <h5 className="font-bold text-secondary mb-1">Closed-Loop Recycling</h5>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Zero internal scrap waste through precision regrind compounding.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-100">
                    <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-600 mb-3">
                      <FiZap className="w-5 h-5" />
                    </div>
                    <h5 className="font-bold text-secondary mb-1">Energy Efficient</h5>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      All-electric servo injection presses reducing energy draw by 40%.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-100">
                    <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-600 mb-3">
                      <FiDroplet className="w-5 h-5" />
                    </div>
                    <h5 className="font-bold text-secondary mb-1">Water Conservation</h5>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Closed-circuit chillers preserving 98% of process cooling water.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="lg:col-span-5"
              >
                <div className="rounded-2xl bg-gradient-to-tr from-emerald-900 to-slate-900 p-8 text-white shadow-xl">
                  <div className="text-4xl font-black text-emerald-400 mb-2">100%</div>
                  <h4 className="text-lg font-bold mb-2">RoHS & REACH Compliant</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    All our virgin polymers are certified free from heavy metals, BPA, and restricted chemical substances.
                  </p>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Leadership Team Section */}
          <section>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Factory Leadership</span>
              <h2 className="text-3xl font-extrabold text-secondary mt-2">Our Leadership Team</h2>
              <p className="text-gray-500 mt-2">Experienced directors and engineers driving manufacturing excellence</p>
            </div>

            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {teamMembers.map((member, index) => (
                <motion.div 
                  key={index} 
                  variants={fadeInUp}
                  className="bg-white p-8 rounded-3xl text-center shadow-sm border border-gray-200/80 hover:shadow-md transition-all"
                >
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary to-blue-700 rounded-2xl mb-5 shadow-lg shadow-primary/20 flex items-center justify-center text-white">
                    <span className="font-black text-2xl">{member.name.charAt(0)}</span>
                  </div>
                  <h4 className="text-lg font-extrabold text-secondary mb-1">{member.name}</h4>
                  <p className="text-xs font-bold uppercase tracking-wider text-primary mb-3">{member.role}</p>
                  <p className="text-sm text-gray-500 leading-relaxed">{member.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </section>
        </div>
      </div>
    </>
  );
};

export default About;
