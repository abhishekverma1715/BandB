import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiTruck, FiShield, FiDollarSign, FiMessageCircle, FiCheckCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Help: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number>(0);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const faqs = [
    {
      question: 'What is Plastic Dana (Plastic Granules)?',
      answer:
        'Plastic Dana, also known as plastic granules or resin pellets, are small beads of plastic material that serve as raw material for manufacturing various plastic products. They are produced by melting plastic material and extruding it through a die, which is then cut into uniform pellets. These granules come in different types (PP, HDPE, LDPE, ABS etc.) and grades suitable for various applications like injection moulding, blow moulding, extrusion and more.',
    },
    {
      question: 'What is the difference between virgin and recycled plastic granules?',
      answer:
        'Virgin Plastic Granules are made from new, unused raw materials (petrochemicals). They offer consistent quality, better mechanical properties and are suitable for food-contact applications. Generally more expensive. Recycled Plastic Granules are made from post-industrial or post-consumer plastic waste that has been processed and cleaned. More environmentally friendly, cost-effective, but may have variations in properties. Ideal for non-food packaging, construction and other industrial applications.',
    },
    {
      question: 'How do I choose the right type of plastic granules for my application?',
      answer:
        'Choosing the right plastic granules depends on application requirements (mechanical strength, chemical resistance, flexibility), processing method (injection moulding, extrusion), regulatory compliance, budget, and sustainability goals. Our technical team can help you select the most suitable material for your specific application.',
    },
    {
      question: 'What is Melt Flow Index (MFI) and why is it important?',
      answer:
        'Melt Flow Index (MFI) is a measure of the ease of flow of melted plastic. It indicates how many grams of polymer flow through a capillary die in 10 minutes under specified conditions. Higher MFI means easier flow, suitable for thin-walled products. Lower MFI provides better mechanical properties for structural parts. Consistent MFI ensures stable processing conditions and uniform product quality.',
    },
    {
      question: 'What is the minimum order quantity (MOQ)?',
      answer:
        'Our standard Minimum Order Quantity (MOQ) is 500 kg per product variant. However, we offer flexibility for trial orders (starting from 100 kg) for first-time customers, and customized MOQs for bulk or special formulations.',
    },
    {
      question: 'Do you provide technical data sheets and material samples?',
      answer:
        'Yes, we provide comprehensive Technical Data Sheets (TDS) for all our products. We also provide free samples (typically 1-2 kg) for testing and evaluation purposes. Our technical team is available to discuss your application requirements and recommend suitable materials.',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Help Center | B&B Plastic</title>
        <meta
          name="description"
          content="Find answers to common questions, wholesale policies, payment methods, and learn how to order from B&B Plastics."
        />
      </Helmet>

      <div className="min-h-screen bg-[#F7F8FA] pb-24">
        {/* Full-Bleed Editorial Hero Banner with Background Image */}
        <div className="relative pt-32 sm:pt-36 pb-20 sm:pb-24 mb-12 border-b border-[#0B1B33] overflow-hidden bg-[#0B1B33] w-full">
          <img
            src="/help-hero.jpg"
            alt="B&B Plastics B2B Help Center"
            className="absolute inset-0 w-full h-full object-cover object-center min-w-full min-h-full opacity-85 filter brightness-[1.05] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1B33]/80 via-[#0B1B33]/50 to-[#0B1B33]/20" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1320px] relative z-10">
            <div className="max-w-3xl">
              <span className="inline-block px-3.5 py-1 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider bg-[#174A8B]/30 text-blue-300 mb-4 border border-[#174A8B]/50 shadow-sm">
                Wholesale Trade Support &amp; FAQ
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-5 leading-tight">
                B2B <span className="text-white">Help Center</span>
              </h1>
              <p className="text-slate-200 text-base sm:text-lg lg:text-xl leading-relaxed font-normal">
                Find answers to MOQ requirements, custom OEM mold engineering, shipping logistics, FOB payment methods, and quality testing procedures.
              </p>
            </div>
          </div>
        </div>

        {/* Help Navigation */}
        <section className="py-4 bg-white border-b border-[#E4E7EC] sticky top-[76px] z-40 shadow-sm">
          <div className="container mx-auto px-4 max-w-[1320px]">
            <div className="flex flex-wrap justify-center gap-3">
              {['FAQ', 'How to Order', 'Shipping Policy', 'Quality Assurance', 'Payment Methods'].map(
                (item, i) => (
                  <a
                    key={i}
                    href={`#${item.toLowerCase().replace(/ /g, '-')}`}
                    className="px-5 py-2 rounded-full border border-[#174A8B] text-[#174A8B] hover:bg-[#174A8B] hover:text-white transition-colors font-semibold text-xs sm:text-sm"
                  >
                    {item}
                  </a>
                )
              )}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-16 bg-[#F7F8FA] scroll-mt-32">
          <div className="container mx-auto px-4 max-w-[1320px]">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold mb-3 text-[#101828]">Frequently Asked Questions</h2>
              <p className="text-[#667085] max-w-2xl mx-auto text-sm sm:text-base">
                Find quick answers to common questions about our products and services
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl shadow-sm border border-[#E4E7EC] overflow-hidden"
                >
                  <button
                    onClick={() => setActiveFaq(activeFaq === index ? -1 : index)}
                    className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
                  >
                    <span
                      className={`font-bold text-base sm:text-lg ${
                        activeFaq === index ? 'text-[#174A8B]' : 'text-[#101828]'
                      }`}
                    >
                      {faq.question}
                    </span>
                    <FiChevronDown
                      className={`w-5 h-5 text-[#667085] transition-transform duration-300 ${
                        activeFaq === index ? 'rotate-180 text-[#174A8B]' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {activeFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6 text-[#667085] text-sm leading-relaxed border-t border-gray-100 pt-4">
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
        <section id="how-to-order" className="py-16 bg-white border-t border-[#E4E7EC] scroll-mt-32">
          <div className="container mx-auto px-4 max-w-[1320px]">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold mb-3 text-[#101828]">How to Order</h2>
              <p className="text-[#667085] max-w-2xl mx-auto text-sm sm:text-base">
                Simple steps to place your order with B&amp;B Plastic
              </p>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-4 gap-6 max-w-[1320px] mx-auto"
            >
              {[
                {
                  title: 'Inquiry',
                  desc: 'Contact us via phone, email, WhatsApp, or the contact form with your requirements including product type, quantity, and specifications.',
                },
                {
                  title: 'Quotation',
                  desc: "We'll provide a detailed quotation including pricing, delivery terms, and payment conditions. Sample can be provided if needed.",
                },
                {
                  title: 'Confirmation',
                  desc: 'Confirm the order by sending a purchase order. For new customers, we may require advance payment or bank guarantee.',
                },
                {
                  title: 'Delivery',
                  desc: "We process your order and arrange delivery. You'll receive shipping details and can track your order until delivery.",
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-[#F7F8FA] p-6 sm:p-8 rounded-2xl text-center border border-[#E4E7EC] hover:shadow-sm transition-shadow relative"
                >
                  <div className="w-12 h-12 bg-[#174A8B] text-white rounded-xl flex items-center justify-center font-bold text-lg mx-auto mb-5 shadow-sm">
                    {index + 1}
                  </div>
                  <h4 className="text-lg font-bold mb-3 text-[#101828]">{step.title}</h4>
                  <p className="text-[#667085] text-xs sm:text-sm leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Shipping Policy */}
        <section id="shipping-policy" className="py-16 bg-[#F7F8FA] border-t border-[#E4E7EC] scroll-mt-32">
          <div className="container mx-auto px-4 max-w-[1320px]">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold mb-3 text-[#101828]">Shipping &amp; Delivery Policy</h2>
              <p className="text-[#667085] max-w-2xl mx-auto text-sm sm:text-base">Reliable and timely delivery across India</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="bg-white p-8 rounded-2xl shadow-sm border border-[#E4E7EC]"
              >
                <h3 className="text-xl font-bold mb-6 text-[#101828] flex items-center gap-3">
                  <FiTruck className="text-[#174A8B]" /> Delivery Information
                </h3>
                <div className="space-y-6 text-sm">
                  <div>
                    <h5 className="font-bold text-[#101828] mb-2">Domestic Shipping</h5>
                    <p className="text-[#667085] mb-2">
                      We ship throughout India using reliable logistics partners. Standard delivery times:
                    </p>
                    <ul className="list-disc pl-5 text-[#667085] space-y-1">
                      <li>Major Cities: 3-5 working days</li>
                      <li>Tier 2 Cities: 5-7 working days</li>
                      <li>Remote Areas: 7-10 working days</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-bold text-[#101828] mb-2">Packaging</h5>
                    <ul className="list-disc pl-5 text-[#667085] space-y-1">
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
                className="bg-white p-8 rounded-2xl shadow-sm border border-[#E4E7EC]"
              >
                <h3 className="text-xl font-bold mb-6 text-[#101828] flex items-center gap-3">
                  <FiShield className="text-[#174A8B]" /> Shipping Terms
                </h3>
                <div className="space-y-6 text-sm">
                  <div>
                    <h5 className="font-bold text-[#101828] mb-2">Shipping Costs</h5>
                    <p className="text-[#667085] mb-2">
                      Shipping costs are calculated based on order weight, destination, and method.
                    </p>
                    <div className="bg-[#F0F4F8] text-[#174A8B] p-3 rounded-xl text-xs font-semibold border border-[#E2E8F0]">
                      Free shipping available for orders above 10,000 kg to major industrial hubs.
                    </div>
                  </div>
                  <div>
                    <h5 className="font-bold text-[#101828] mb-2">Damage &amp; Loss Policy</h5>
                    <p className="text-[#667085] mb-2">
                      We ensure proper packaging to prevent damage during transit. In case of damaged goods:
                    </p>
                    <ul className="list-disc pl-5 text-[#667085] space-y-1">
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
        <section id="quality-assurance" className="py-16 bg-white border-t border-[#E4E7EC] scroll-mt-32">
          <div className="container mx-auto px-4 max-w-[1320px]">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-extrabold mb-3 text-[#101828]">Quality Assurance</h2>
                <p className="text-[#667085] text-sm sm:text-base">
                  We maintain strict quality control at every stage of production to ensure consistency.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex gap-4 p-5 rounded-xl bg-[#F7F8FA] border border-[#E4E7EC]">
                  <FiCheckCircle className="w-5 h-5 text-[#16A36A] flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-[#101828] text-base mb-1">Raw Material Testing</h5>
                    <p className="text-[#667085] text-xs sm:text-sm">
                      All incoming raw materials are tested for purity, moisture content and contamination.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 p-5 rounded-xl bg-[#F7F8FA] border border-[#E4E7EC]">
                  <FiCheckCircle className="w-5 h-5 text-[#16A36A] flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-[#101828] text-base mb-1">In-process Quality Control</h5>
                    <p className="text-[#667085] text-xs sm:text-sm">
                      Continuous monitoring of processing parameters including temperature, pressure and mixing.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 p-5 rounded-xl bg-[#F7F8FA] border border-[#E4E7EC]">
                  <FiCheckCircle className="w-5 h-5 text-[#16A36A] flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-[#101828] text-base mb-1">Final Product Testing</h5>
                    <p className="text-[#667085] text-xs sm:text-sm">
                      Every batch undergoes testing for MFI, density, color, and mechanical properties.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 p-5 rounded-xl bg-[#F7F8FA] border border-[#E4E7EC]">
                  <FiCheckCircle className="w-5 h-5 text-[#16A36A] flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-[#101828] text-base mb-1">Certifications</h5>
                    <p className="text-[#667085] text-xs sm:text-sm">
                      Certified under ISO 9001:2015. Recycled products certified under Global Recycling Standard (GRS).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Payment Methods */}
        <section id="payment-methods" className="py-16 bg-[#F7F8FA] border-t border-[#E4E7EC] scroll-mt-32">
          <div className="container mx-auto px-4 max-w-[1320px]">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold mb-3 text-[#101828]">Payment Methods</h2>
              <p className="text-[#667085] max-w-2xl mx-auto text-sm sm:text-base">
                Secure and convenient payment options
              </p>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-8"
            >
              <motion.div variants={fadeInUp} className="bg-white p-8 rounded-2xl text-center border border-[#E4E7EC] shadow-sm">
                <div className="w-14 h-14 mx-auto bg-[#F0F4F8] text-[#174A8B] rounded-xl flex items-center justify-center mb-5">
                  <FiDollarSign className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold mb-3 text-[#101828]">Bank Transfer</h4>
                <p className="text-[#667085] text-xs sm:text-sm">
                  Direct bank transfer (NEFT/RTGS/IMPS). We'll provide our bank details with the invoice. Confirmation takes 1-2 hours.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="bg-white p-8 rounded-2xl text-center border border-[#E4E7EC] shadow-sm">
                <div className="w-14 h-14 mx-auto bg-[#F0F4F8] text-[#174A8B] rounded-xl flex items-center justify-center mb-5">
                  <FiDollarSign className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold mb-3 text-[#101828]">Cheque / DD</h4>
                <p className="text-[#667085] text-xs sm:text-sm">
                  Accepted from established companies. Goods dispatched after cheque clearance (typically 3-5 working days).
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="bg-white p-8 rounded-2xl text-center border border-[#E4E7EC] shadow-sm">
                <div className="w-14 h-14 mx-auto bg-[#F0F4F8] text-[#174A8B] rounded-xl flex items-center justify-center mb-5">
                  <FiDollarSign className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold mb-3 text-[#101828]">Credit Terms</h4>
                <p className="text-[#667085] text-xs sm:text-sm">
                  Available for regular customers with good payment history. Terms typically 15-30 days from invoice date.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Still Have Questions */}
        <section className="py-16 bg-[#174A8B] text-white">
          <div className="container mx-auto px-4 max-w-[1320px]">
            <div className="flex flex-col md:flex-row items-center justify-between max-w-5xl mx-auto gap-8">
              <div className="text-center md:text-left">
                <h2 className="text-3xl font-bold mb-2">Still Have Questions?</h2>
                <p className="text-blue-100 text-base">Our customer support team is here to help you.</p>
              </div>
              <div className="flex gap-4">
                <Link
                  to="/contact"
                  className="px-8 py-3.5 bg-white text-[#174A8B] font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-md text-sm"
                >
                  Contact Us
                </Link>
                <a
                  href="https://wa.me/919118913028"
                  target="_blank"
                  rel="noreferrer"
                  className="px-8 py-3.5 bg-[#16A36A] text-white font-bold rounded-xl hover:bg-[#138A58] transition-colors shadow-md flex items-center gap-2 text-sm"
                >
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
