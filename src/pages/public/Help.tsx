import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiChevronDown,
  FiTruck,
  FiShield,
  FiDollarSign,
  FiMessageCircle,
  FiCheckCircle,
  FiPhone,
  FiClock,
} from 'react-icons/fi';
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
      question: 'What types of plastic products does B&B Plastic manufacture?',
      answer:
        'We manufacture a wide range of injection-molded plastic products including household items (bath mugs, laundry basins, tubs, planter pots), kitchen & storage racks (modular shelving, organizer stands, corner racks), heavy-duty containers (industrial pails, ghamelas, waste bins), furniture & seating (banquet chairs, rattan-weave chairs), child safety products (study desks, booster chairs), and food-grade items (unbreakable tea/coffee mug sets). Our full catalog includes over 27 products across 7 categories.',
    },
    {
      question: 'Are your products made from virgin or recycled plastic?',
      answer:
        'All B&B Plastic products are manufactured using 100% virgin-grade raw materials including Polypropylene (PP), High-Density Polyethylene (HDPE), ABS, and food-grade polycarbonate/SAN. We do not use recycled or mixed-grade polymers in any of our products. This ensures superior durability, colour consistency, food safety (where applicable), and long product life.',
    },
    {
      question: 'What is the minimum order quantity (MOQ)?',
      answer:
        'MOQ varies by product. For example: bath mugs start at 200–240 pcs, storage racks at 40–75 pcs, heavy-duty containers at 80–150 pcs, chairs at 40–50 pcs, and kids furniture at 25 pcs. You can find the exact MOQ listed on each product page. For first-time customers, we may offer flexibility on trial orders — please contact us to discuss.',
    },
    {
      question: 'Do you sell directly to retail customers or only in bulk?',
      answer:
        'B&B Plastic primarily operates as a B2B wholesale manufacturer, supplying distributors, retailers, and institutional buyers in bulk quantities. However, we welcome inquiries from all customers. If you need a smaller quantity for personal or business use, please reach out to us and we will try our best to accommodate your requirement.',
    },
    {
      question: 'How do I know if a product is food-safe?',
      answer:
        'Products in our "Food Grade Polymer" category — such as our Unbreakable Tea & Coffee Mug Set — are manufactured from BPA-free, food-grade virgin polycarbonate/SAN resin and are safe for food and beverage contact. Each food-grade product is clearly labelled with the food-safe certification on its product page.',
    },
    {
      question: 'Can I get product samples before placing a bulk order?',
      answer:
        'Yes, we encourage customers to evaluate our products before ordering in bulk. We can send product samples for your review. Sample costs (including shipping) may apply and are typically adjusted against your first bulk order. Please contact us via phone, email, or WhatsApp to request samples.',
    },
    {
      question: 'Do you offer custom branding or private labeling?',
      answer:
        'Yes, for qualified bulk orders we can discuss custom branding options including logo embossing on molds, custom colour matching, and private-label packaging. Custom orders require a minimum volume commitment and lead time for mold modifications. Contact our sales team to discuss your branding requirements.',
    },
    {
      question: 'What warranty or guarantee do you provide on your products?',
      answer:
        'All our products are manufactured from 100% virgin-grade materials and undergo rigorous quality testing before dispatch. If you receive a product with a manufacturing defect (cracking, deformation, colour inconsistency), please notify us within 48 hours of delivery with photographic evidence. We will arrange a replacement or credit for defective items.',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Help Center | B&B Plastic — FAQs, Orders & Policies</title>
        <meta
          name="description"
          content="Find answers to common questions about B&B Plastic products, ordering process, shipping policies, payment methods, and quality assurance."
        />
      </Helmet>

      <div className="min-h-screen bg-[#F7F8FA] pb-24">
        {/* Hero Banner */}
        <div className="relative pt-32 sm:pt-36 pb-20 sm:pb-24 mb-12 border-b border-[#0B1B33] overflow-hidden bg-[#0B1B33] w-full">
          <img
            src="/help-hero.jpg"
            alt="B&B Plastic Help Center"
            className="absolute inset-0 w-full h-full object-cover object-center min-w-full min-h-full opacity-85 filter brightness-[1.05] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1B33]/80 via-[#0B1B33]/50 to-[#0B1B33]/20" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1320px] relative z-10">
            <div className="max-w-3xl">
              <span className="inline-block px-3.5 py-1 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider bg-[#174A8B]/30 text-blue-300 mb-4 border border-[#174A8B]/50 shadow-sm">
                Customer Support &amp; FAQ
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-5 leading-tight">
                Help <span className="text-white">Center</span>
              </h1>
              <p className="text-slate-200 text-base sm:text-lg lg:text-xl leading-relaxed font-normal">
                Everything you need to know — from product questions and ordering to shipping, payments, and quality assurance.
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
                Quick answers to the most common questions about our products, ordering, and policies
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
                      className={`w-5 h-5 text-[#667085] transition-transform duration-300 flex-shrink-0 ml-4 ${
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
                Ordering from B&amp;B Plastic is simple — follow these four steps
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
                  title: 'Browse & Inquire',
                  desc: 'Explore our product catalog on the website. Contact us via phone (+91 91189 13028), email, or WhatsApp with the products and quantities you need.',
                },
                {
                  title: 'Get a Quotation',
                  desc: 'We will send you a detailed quotation with product pricing, applicable discounts for your order volume, delivery timeline, and payment terms.',
                },
                {
                  title: 'Confirm & Pay',
                  desc: 'Confirm your order by sharing a purchase order or written confirmation. Make the payment via bank transfer, UPI, or agreed credit terms.',
                },
                {
                  title: 'Production & Delivery',
                  desc: 'We process your order at our GIDA Gorakhpur facility and arrange delivery through our logistics partners. Track your shipment until delivery.',
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
              <p className="text-[#667085] max-w-2xl mx-auto text-sm sm:text-base">
                Reliable and timely delivery across India
              </p>
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
                    <h5 className="font-bold text-[#101828] mb-2">Pan-India Shipping</h5>
                    <p className="text-[#667085] mb-2">
                      We ship across India using trusted logistics and transport partners. Estimated delivery times:
                    </p>
                    <ul className="list-disc pl-5 text-[#667085] space-y-1">
                      <li>UP, Bihar, MP &amp; nearby states: 2–4 working days</li>
                      <li>Major metros (Delhi, Mumbai, Kolkata, etc.): 4–6 working days</li>
                      <li>Southern &amp; North-Eastern India: 6–10 working days</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-bold text-[#101828] mb-2">Packaging</h5>
                    <ul className="list-disc pl-5 text-[#667085] space-y-1">
                      <li>Products are securely bundled or cartoned for safe transit</li>
                      <li>Palletised loading available for large bulk orders</li>
                      <li>Custom packaging available on request for branding needs</li>
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
                      Freight charges are calculated based on order volume, product weight, and delivery location. We provide all-inclusive pricing in our quotations.
                    </p>
                    <div className="bg-[#F0F4F8] text-[#174A8B] p-3 rounded-xl text-xs font-semibold border border-[#E2E8F0]">
                      Free or discounted shipping may be available for large bulk orders — ask our team for details.
                    </div>
                  </div>
                  <div>
                    <h5 className="font-bold text-[#101828] mb-2">Damage &amp; Claims Policy</h5>
                    <p className="text-[#667085] mb-2">
                      We take great care in packaging to prevent transit damage. In case you receive damaged goods:
                    </p>
                    <ul className="list-disc pl-5 text-[#667085] space-y-1">
                      <li>Notify us within 48 hours of delivery</li>
                      <li>Share clear photographs of the damaged items and packaging</li>
                      <li>We will arrange a replacement or credit for verified claims</li>
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
                  Our commitment to quality is built into every stage — from raw materials to finished products
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex gap-4 p-5 rounded-xl bg-[#F7F8FA] border border-[#E4E7EC]">
                  <FiCheckCircle className="w-5 h-5 text-[#16A36A] flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-[#101828] text-base mb-1">100% Virgin Raw Materials</h5>
                    <p className="text-[#667085] text-xs sm:text-sm">
                      Every product is made from certified virgin-grade PP, HDPE, ABS, or food-grade polymer — never recycled or mixed-grade material.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 p-5 rounded-xl bg-[#F7F8FA] border border-[#E4E7EC]">
                  <FiCheckCircle className="w-5 h-5 text-[#16A36A] flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-[#101828] text-base mb-1">Pre-Production Material Testing</h5>
                    <p className="text-[#667085] text-xs sm:text-sm">
                      All incoming raw materials are tested for Melt Flow Index (MFI), moisture content, and purity before being approved for production.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 p-5 rounded-xl bg-[#F7F8FA] border border-[#E4E7EC]">
                  <FiCheckCircle className="w-5 h-5 text-[#16A36A] flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-[#101828] text-base mb-1">In-Line Production Monitoring</h5>
                    <p className="text-[#667085] text-xs sm:text-sm">
                      During injection molding, we continuously monitor temperature, pressure, cycle time, and material flow to ensure each piece meets specifications.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 p-5 rounded-xl bg-[#F7F8FA] border border-[#E4E7EC]">
                  <FiCheckCircle className="w-5 h-5 text-[#16A36A] flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-[#101828] text-base mb-1">Finished Product Inspection</h5>
                    <p className="text-[#667085] text-xs sm:text-sm">
                      Every batch is inspected for dimensional accuracy, surface finish, colour consistency, impact resistance, and structural integrity before packaging.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 p-5 rounded-xl bg-[#F7F8FA] border border-[#E4E7EC]">
                  <FiCheckCircle className="w-5 h-5 text-[#16A36A] flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-[#101828] text-base mb-1">Load & Stress Testing</h5>
                    <p className="text-[#667085] text-xs sm:text-sm">
                      Heavy-duty products like chairs (150kg rated), containers, and storage racks undergo load-bearing and stress tests to verify durability claims.
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
                Secure and convenient payment options for all order sizes
              </p>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-8"
            >
              <motion.div variants={fadeInUp} className="bg-white p-7 rounded-2xl text-center border border-[#E4E7EC] shadow-sm">
                <div className="w-14 h-14 mx-auto bg-[#F0F4F8] text-[#174A8B] rounded-xl flex items-center justify-center mb-5">
                  <FiDollarSign className="w-7 h-7" />
                </div>
                <h4 className="text-lg font-bold mb-3 text-[#101828]">Bank Transfer</h4>
                <p className="text-[#667085] text-xs sm:text-sm">
                  NEFT, RTGS, or IMPS to our business account. Bank details are shared with the invoice. Confirmation within 1–2 hours.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="bg-white p-7 rounded-2xl text-center border border-[#E4E7EC] shadow-sm">
                <div className="w-14 h-14 mx-auto bg-[#F0F4F8] text-[#174A8B] rounded-xl flex items-center justify-center mb-5">
                  <FiPhone className="w-7 h-7" />
                </div>
                <h4 className="text-lg font-bold mb-3 text-[#101828]">UPI / GPay</h4>
                <p className="text-[#667085] text-xs sm:text-sm">
                  Instant payment via UPI, Google Pay, or PhonePe. Ideal for smaller orders and advance payments. Confirmation is instant.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="bg-white p-7 rounded-2xl text-center border border-[#E4E7EC] shadow-sm">
                <div className="w-14 h-14 mx-auto bg-[#F0F4F8] text-[#174A8B] rounded-xl flex items-center justify-center mb-5">
                  <FiClock className="w-7 h-7" />
                </div>
                <h4 className="text-lg font-bold mb-3 text-[#101828]">Cheque / DD</h4>
                <p className="text-[#667085] text-xs sm:text-sm">
                  Accepted from established business accounts. Products are dispatched after cheque clearance (typically 3–5 working days).
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="bg-white p-7 rounded-2xl text-center border border-[#E4E7EC] shadow-sm">
                <div className="w-14 h-14 mx-auto bg-emerald-50 text-[#16A36A] rounded-xl flex items-center justify-center mb-5">
                  <FiCheckCircle className="w-7 h-7" />
                </div>
                <h4 className="text-lg font-bold mb-3 text-[#101828]">Credit Terms</h4>
                <p className="text-[#667085] text-xs sm:text-sm">
                  Available for repeat customers with established payment history. Terms typically range from 15 to 30 days from invoice date.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Still Have Questions CTA */}
        <section className="py-16 bg-[#174A8B] text-white">
          <div className="container mx-auto px-4 max-w-[1320px]">
            <div className="flex flex-col md:flex-row items-center justify-between max-w-5xl mx-auto gap-8">
              <div className="text-center md:text-left">
                <h2 className="text-3xl font-bold mb-2">Still Have Questions?</h2>
                <p className="text-blue-100 text-base">
                  Our team is available Mon–Sat, 9:00 AM – 6:30 PM IST to help you with anything you need.
                </p>
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
                  <FiMessageCircle /> WhatsApp Us
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
