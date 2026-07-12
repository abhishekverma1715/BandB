import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiHelpCircle, FiMessageCircle, FiPhoneCall } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import useScrollReveal from './hooks/useScrollReveal';

const faqCategories = [
  'All Questions',
  'Ordering & MOQ',
  'Custom OEM Molding',
  'Quality & Compliance',
  'Shipping & Logistics',
];

const faqsData = [
  {
    category: 'Ordering & MOQ',
    question: 'What is the Minimum Order Quantity (MOQ) for wholesale orders?',
    answer:
      'Our standard MOQ ranges from 50 to 300 units depending on the product category. For standing stock items like our 50L Heavy-Duty Containers or Sports Bottles, MOQs start at just 100 pieces. For custom color matching or embossed branding, a minimum of 500 units is generally required.',
  },
  {
    category: 'Ordering & MOQ',
    question: 'How does your tiered wholesale pricing work?',
    answer:
      'We offer factory-direct tiered discounts based on volume brackets (e.g., 100–499 units, 500–1,999 units, and 2,000+ units). Larger pallet or Full Container Load (FCL) orders benefit from up to 35% discount off standard unit rates.',
  },
  {
    category: 'Custom OEM Molding',
    question: 'Can B&B Plastic manufacture custom molds or engineered polymers?',
    answer:
      'Yes! Our OEM Custom Engineering division designs and fabricates dedicated precision injection mold tooling. We work with specialized polymer blends including 100% Virgin HDPE, high-impact ABS, food-grade Tritan, and UV-stabilized polypropylene tailored to your exact CAD specs.',
  },
  {
    category: 'Custom OEM Molding',
    question: 'What is the lead time for custom mold tooling and prototyping?',
    answer:
      'Prototype 3D design and mold feasibility assessment takes 3–5 business days. Production mold fabrication typically completes within 15–25 days, followed by pre-production pilot samples for your engineering sign-off.',
  },
  {
    category: 'Quality & Compliance',
    question: 'Are your containers food-grade and BPA-free certified?',
    answer:
      'Absolutely. All food and beverage containers are manufactured using 100% Virgin Food-Grade resins certified BPA-free, FDA-compliant, and ISO 9001:2015 tested. Every batch ships with a Certificate of Analysis (CoA) confirming purity and impact strength.',
  },
  {
    category: 'Quality & Compliance',
    question: 'What quality testing protocols do your products undergo?',
    answer:
      'Every production lot undergoes rigorous drop-impact testing, hydrostatic load testing, thermal cycling resistance, and dimensional tolerance checks to ensure zero failure rates in demanding industrial environments.',
  },
  {
    category: 'Shipping & Logistics',
    question: 'Do you ship nationwide and handle export logistics?',
    answer:
      'Yes, we dispatch daily from our manufacturing hub in Gorakhpur, UP to distributors across India via express freight partners. We also provide full export documentation (EXW, FOB, CIF) for international shipments worldwide.',
  },
  {
    category: 'Shipping & Logistics',
    question: 'How quickly do ready-stock wholesale orders ship?',
    answer:
      'In-stock SKUs are palletized and dispatched within 24 to 48 hours of order confirmation. Custom color or branded orders generally ship within 7–10 business days.',
  },
];

const InteractiveFAQ = () => {
  const sectionRef = useScrollReveal({ itemSelector: '.faq-reveal', y: 30 });
  const [activeCategory, setActiveCategory] = useState('All Questions');
  const [openIndex, setOpenIndex] = useState(0);

  const filteredFaqs =
    activeCategory === 'All Questions'
      ? faqsData
      : faqsData.filter((f) => f.category === activeCategory);

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-14 faq-reveal">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary/10 text-primary mb-3">
            <FiHelpCircle className="w-3.5 h-3.5" />
            Clear Answers
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-secondary tracking-tight mb-4">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
            Everything you need to know about B&B Plastic wholesale ordering, custom injection molding, and factory-direct dispatch.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12 faq-reveal">
          {faqCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setOpenIndex(null);
              }}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-primary text-white shadow-md shadow-primary/25 scale-105'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-primary/40 hover:text-secondary'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="max-w-4xl mx-auto space-y-4 faq-reveal">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={`${faq.question}-${index}`}
                className={`rounded-2xl border transition-all duration-300 bg-white overflow-hidden ${
                  isOpen
                    ? 'border-primary/40 shadow-lg shadow-primary/5'
                    : 'border-gray-200 hover:border-gray-300 shadow-sm'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-primary/10 text-primary">
                      {faq.category}
                    </span>
                    <span className="text-base sm:text-lg font-bold text-secondary">
                      {faq.question}
                    </span>
                  </div>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? 'bg-primary text-white rotate-180' : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    <FiChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 pt-2 text-gray-600 text-sm sm:text-base leading-relaxed border-t border-gray-100">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Support Help Banner */}
        <div className="mt-16 max-w-4xl mx-auto rounded-3xl bg-secondary text-white p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl faq-reveal">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold mb-2">Have a specific technical or custom SKU requirement?</h3>
            <p className="text-gray-300 text-sm sm:text-base">
              Speak directly with our polymer engineers or request an instant quotation for your bulk order.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary hover:bg-blue-600 text-white font-bold text-sm transition-all shadow-lg shadow-primary/30"
            >
              <FiMessageCircle className="w-4 h-4" />
              Ask an Engineer
            </Link>
            <a
              href="tel:+918808880012"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all"
            >
              <FiPhoneCall className="w-4 h-4" />
              Call Factory
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveFAQ;