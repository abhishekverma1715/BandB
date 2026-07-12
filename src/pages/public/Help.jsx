import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiTruck, FiShield, FiDollarSign, FiMessageCircle, FiCheckCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Help = () => {
  const [activeFaq, setActiveFaq] = useState(0);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const faqs = [
    {
      question: "What is Plastic Dana (Plastic Granules)?",
      answer: "Plastic Dana, also known as plastic granules or resin pellets, are small beads of plastic material that serve as raw material for manufacturing various plastic products. They are produced by melting plastic material and extruding it through a die, which is then cut into uniform pellets. These granules come in different types (PP, HDPE, LDPE, ABS etc.) and grades suitable for various applications like injection moulding, blow moulding, extrusion and more."
    },
    {
      question: "What is the difference between virgin and recycled plastic granules?",
      answer: "Virgin Plastic Granules are made from new, unused raw materials (petrochemicals). They offer consistent quality, better mechanical properties and are suitable for food-contact applications. Generally more expensive. Recycled Plastic Granules are made from post-industrial or post-consumer plastic waste that has been processed and cleaned. More environmentally friendly, cost-effective, but may have variations in properties. Ideal for non-food packaging, construction and other industrial applications."
    },
    {
      question: "How do I choose the right type of plastic granules for my application?",
      answer: "Choosing the right plastic granules depends on application requirements (mechanical strength, chemical resistance, flexibility), processing method (injection moulding, extrusion), regulatory compliance, budget, and sustainability goals. Our technical team can help you select the most suitable material for your specific application."
    },
    {
      question: "What is Melt Flow Index (MFI) and why is it important?",
      answer: "Melt Flow Index (MFI) is a measure of the ease of flow of melted plastic. It indicates how many grams of polymer flow through a capillary die in 10 minutes under specified conditions. Higher MFI means easier flow, suitable for thin-walled products. Lower MFI provides better mechanical properties for structural parts. Consistent MFI ensures stable processing conditions and uniform product quality."
    },
    {
      question: "What is the minimum order quantity (MOQ)?",
      answer: "Our standard Minimum Order Quantity (MOQ) is 500 kg per product variant. However, we offer flexibility for trial orders (starting from 100 kg) for first-time customers, and customized MOQs for bulk or special formulations."
    },
    {
      question: "Do you provide technical data sheets and material samples?",
      answer: "Yes, we provide comprehensive Technical Data Sheets (TDS) for all our products. We also provide free samples (typically 1-2 kg) for testing and evaluation purposes. Our technical team is available to discuss your application requirements and recommend suitable materials."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Help Center | B&B Plastic</title>
        <meta name="description" content="Find answers to common questions, wholesale policies, payment methods, and learn how to order from B&B Plastics." />
      </Helmet>

      <div className="pt-28 pb-24 min-h-screen bg-gray-50">
        {/* Editorial Hero Banner with Help Center Background Image */}
        <div className="relative py-20 sm:py-24 mb-12 border-b border-gray-800 overflow-hidden">
          <img
            src="/help-hero.jpg"
            alt="B&B Plastics B2B Help Center"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/85 to-slate-900/60" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
            <div className="max-w-3xl">
              <span className="inline-block px-3.5 py-1 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider bg-primary/25 text-blue-300 mb-4 border border-primary/40 shadow-sm">
                Wholesale Trade Support &amp; FAQ
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-5 leading-tight">
                B2B <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-primary">Help Center</span>
              </h1>
              <p className="text-gray-200 text-base sm:text-lg lg:text-xl leading-relaxed font-medium">
                Find answers to MOQ requirements, custom OEM mold engineering, shipping logistics, FOB payment methods, and quality testing procedures.
              </p>
            </div>
          </div>
        </div>

        {/* Help Navigation */}
        <section className="py-6 bg-white border-b border-gray-100 sticky top-[76px] z-40 shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-4">
              {['FAQ', 'How to Order', 'Shipping Policy', 'Quality Assurance', 'Payment Methods'].map((item, i) => (
                <a
                  key={i}
                  href={`#${item.toLowerCase().replace(/ /g, '-')}`}
                  className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition-colors font-medium text-sm"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-16 bg-background scroll-mt-32">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 text-secondary">Frequently Asked Questions</h2>
              <p className="text-gray-500 max-w-2xl mx-auto">Find quick answers to common questions about our products and services</p>
            </div>

            <div className="max-w-4xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                >
                  <button
                    onClick={() => setActiveFaq(activeFaq === index ? -1 : index)}
                    className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
                  >
                    <span className={`font-bold text-lg ${activeFaq === index ? 'text-primary' : 'text-secondary'}`}>
                      {faq.question}
                    </span>
                    <FiChevronDown className={`w-6 h-6 text-gray-400 transition-transform duration-300 ${activeFaq === index ? 'rotate-180 text-primary' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {activeFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-50 pt-4">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How to Order */}
        <section id="how-to-order" className="py-20 bg-white scroll-mt-32">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 text-secondary">How to Order</h2>
              <p className="text-gray-500 max-w-2xl mx-auto">Simple steps to place your order with B&B Plastic</p>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto"
            >
              {[
                { title: 'Inquiry', desc: 'Contact us via phone, email, WhatsApp, or the contact form with your requirements including product type, quantity, and specifications.' },
                { title: 'Quotation', desc: 'We\'ll provide a detailed quotation including pricing, delivery terms, and payment conditions. Sample can be provided if needed.' },
                { title: 'Confirmation', desc: 'Confirm the order by sending a purchase order. For new customers, we may require advance payment or bank guarantee.' },
                { title: 'Delivery', desc: 'We process your order and arrange delivery. You\'ll receive shipping details and can track your order until delivery.' }
              ].map((step, index) => (
                <motion.div key={index} variants={fadeInUp} className="bg-gray-50 p-8 rounded-2xl text-center border border-gray-100 hover:shadow-xl transition-shadow relative">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-6 shadow-lg shadow-primary/30">
                    {index + 1}
                  </div>
                  <h4 className="text-xl font-bold mb-4 text-secondary">{step.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>

                  {index < 3 && (
                    <div className="hidden md:block absolute top-14 -right-4 w-8 h-0.5 bg-gray-300"></div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Shipping Policy */}
        <section id="shipping-policy" className="py-20 bg-background scroll-mt-32">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 text-secondary">Shipping & Delivery Policy</h2>
              <p className="text-gray-500 max-w-2xl mx-auto">Reliable and timely delivery across India</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
              >
                <h3 className="text-2xl font-bold mb-6 text-secondary flex items-center gap-3"><FiTruck className="text-primary" /> Delivery Information</h3>
                <div className="space-y-6">
                  <div>
                    <h5 className="font-bold text-gray-800 mb-2">Domestic Shipping</h5>
                    <p className="text-gray-600 mb-2">We ship throughout India using reliable logistics partners. Standard delivery times:</p>
                    <ul className="list-disc pl-5 text-gray-600 space-y-1">
                      <li>Major Cities: 3-5 working days</li>
                      <li>Tier 2 Cities: 5-7 working days</li>
                      <li>Remote Areas: 7-10 working days</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-800 mb-2">Packaging</h5>
                    <ul className="list-disc pl-5 text-gray-600 space-y-1">
                      <li>25 kg HDPE bags with inner liner</li>
                      <li>Jumbo bags (500-1000 kg) for bulk orders</li>
                      <li>Custom packaging available on request</li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
              >
                <h3 className="text-2xl font-bold mb-6 text-secondary flex items-center gap-3"><FiShield className="text-primary" /> Shipping Terms</h3>
                <div className="space-y-6">
                  <div>
                    <h5 className="font-bold text-gray-800 mb-2">Shipping Costs</h5>
                    <p className="text-gray-600 mb-2">Shipping costs are calculated based on order weight, destination, and method.</p>
                    <div className="bg-primary/5 text-primary p-3 rounded-lg text-sm font-medium border border-primary/10">
                      Free shipping available for orders above 10,000 kg to major industrial hubs.
                    </div>
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-800 mb-2">Damage & Loss Policy</h5>
                    <p className="text-gray-600 mb-2">We ensure proper packaging to prevent damage during transit. In case of damaged goods:</p>
                    <ul className="list-disc pl-5 text-gray-600 space-y-1">
                      <li>Notify us within 24 hours of delivery</li>
                      <li>Provide photographic evidence</li>
                      <li>We'll arrange replacement or credit</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Quality Assurance */}
        <section id="quality-assurance" className="py-20 bg-white scroll-mt-32">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                {/* Fallback image box */}
                <div className="w-full aspect-square bg-gray-100 rounded-3xl overflow-hidden shadow-2xl border-8 border-white relative">
                  <div className="absolute inset-0 bg-primary/5 flex items-center justify-center">
                    <span className="text-primary/30 font-bold text-2xl">Quality Lab Testing</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <h2 className="text-3xl font-bold mb-4 text-secondary">Quality Assurance</h2>
                <p className="text-gray-600 mb-8 text-lg">We maintain strict quality control at every stage of production to ensure consistency.</p>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <FiCheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <h5 className="font-bold text-gray-800 mb-1">Raw Material Testing</h5>
                      <p className="text-gray-600 text-sm">All incoming raw materials are tested for purity, moisture content and contamination.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <FiCheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <h5 className="font-bold text-gray-800 mb-1">In-process Quality Control</h5>
                      <p className="text-gray-600 text-sm">Continuous monitoring of processing parameters including temperature, pressure and mixing.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <FiCheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <h5 className="font-bold text-gray-800 mb-1">Final Product Testing</h5>
                      <p className="text-gray-600 text-sm">Every batch undergoes testing for MFI, density, color, and mechanical properties.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <FiCheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <h5 className="font-bold text-gray-800 mb-1">Certifications</h5>
                      <p className="text-gray-600 text-sm">Certified under ISO 9001:2015. Recycled products certified under Global Recycling Standard (GRS).</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Payment Methods */}
        <section id="payment-methods" className="py-20 bg-background scroll-mt-32">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 text-secondary">Payment Methods</h2>
              <p className="text-gray-500 max-w-2xl mx-auto">Secure and convenient payment options</p>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12"
            >
              <motion.div variants={fadeInUp} className="bg-white p-8 rounded-2xl text-center border border-gray-100 shadow-sm hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 mx-auto bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
                  <FiDollarSign className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold mb-4 text-secondary">Bank Transfer</h4>
                <p className="text-gray-600 text-sm">Direct bank transfer (NEFT/RTGS/IMPS). We'll provide our bank details with the invoice. Confirmation takes 1-2 hours.</p>
              </motion.div>

              <motion.div variants={fadeInUp} className="bg-white p-8 rounded-2xl text-center border border-gray-100 shadow-sm hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 mx-auto bg-green-500/10 text-green-600 rounded-2xl flex items-center justify-center mb-6">
                  <FiDollarSign className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold mb-4 text-secondary">Cheque / DD</h4>
                <p className="text-gray-600 text-sm">Accepted from established companies. Goods dispatched after cheque clearance (typically 3-5 working days).</p>
              </motion.div>

              <motion.div variants={fadeInUp} className="bg-white p-8 rounded-2xl text-center border border-gray-100 shadow-sm hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 mx-auto bg-purple-500/10 text-purple-600 rounded-2xl flex items-center justify-center mb-6">
                  <FiDollarSign className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold mb-4 text-secondary">Credit Terms</h4>
                <p className="text-gray-600 text-sm">Available for regular customers with good payment history. Terms typically 15-30 days from invoice date.</p>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto bg-blue-50 border border-blue-100 p-6 rounded-2xl flex gap-4"
            >
              <div className="text-blue-600 flex-shrink-0 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              </div>
              <div>
                <h5 className="font-bold text-blue-900 mb-2">Payment Terms</h5>
                <ul className="list-disc pl-5 text-blue-800 text-sm space-y-1">
                  <li>New Customers: 100% advance payment or 50% advance with balance against delivery</li>
                  <li>Taxes: All applicable taxes (GST) will be added as per government regulations</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Still Have Questions */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between max-w-5xl mx-auto gap-8">
              <div className="text-center md:text-left">
                <h2 className="text-3xl font-bold mb-2">Still Have Questions?</h2>
                <p className="text-blue-100 text-lg">Our customer support team is here to help you.</p>
              </div>
              <div className="flex gap-4">
                <Link to="/contact" className="px-8 py-3 bg-white text-primary font-bold rounded-full hover:bg-gray-100 transition-colors shadow-lg">
                  Contact Us
                </Link>
                <a href="https://wa.me/8808880012" target="_blank" rel="noreferrer" className="px-8 py-3 bg-green-500 text-white font-bold rounded-full hover:bg-green-600 transition-colors shadow-lg flex items-center gap-2">
                  <FiMessageCircle /> Chat Now
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Help;
