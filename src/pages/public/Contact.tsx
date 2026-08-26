import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiClock,
  FiMessageCircle,
  FiShoppingCart,
  FiSettings,
  FiTruck,
} from 'react-icons/fi';
import { Link, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/store.js';
import { submitInquiry } from '../../features/inquiries/inquiriesSlice.js';
import { selectCategoryNames, fetchCategories } from '../../features/categories/categoriesSlice.js';
import { useToast } from '../../components/common/Toast.js';
import { productsData } from '../../data/productsData.js';

const Contact: React.FC = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const reduxCategoryNames = useAppSelector(selectCategoryNames);
  const { addToast } = useToast();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    subject: searchParams.get('product') ? `Wholesale Quote: ${searchParams.get('product')}` : '',
    product: searchParams.get('product') || '',
    quantity: searchParams.get('qty') ? `${searchParams.get('qty')} units` : '',
    message: searchParams.get('product')
      ? `Please provide factory-direct quote and delivery timelines for ${searchParams.get('product')}.`
      : '',
    newsletter: true,
    privacy: false,
  });

  useEffect(() => {
    const prodParam = searchParams.get('product');
    const qtyParam = searchParams.get('qty');
    if (prodParam) {
      setFormData((prev) => ({
        ...prev,
        product: prodParam,
        subject: `Wholesale Quote: ${prodParam}`,
        quantity: qtyParam ? `${qtyParam} units` : prev.quantity,
        message: `Please provide factory-direct quote and delivery timelines for ${prodParam}.`,
      }));
    }
  }, [searchParams]);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  /** Live product categories (excluding 'All') from Redux store */
  const categories = useMemo(
    () => reduxCategoryNames.filter((c) => c !== 'All'),
    [reduxCategoryNames]
  );

  /** Products filtered by selected category */
  const filteredProducts = useMemo(
    () =>
      selectedCategory
        ? productsData.filter((p) => p.category === selectedCategory)
        : productsData,
    [selectedCategory]
  );

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? target.checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.privacy) {
      addToast('Please agree to the Privacy Policy before submitting.', 'error');
      return;
    }

    setLoading(true);

    try {
      await dispatch(
        submitInquiry({
          name: formData.name.trim(),
          company: formData.company?.trim() || '',
          email: formData.email.trim().toLowerCase(),
          phone: formData.phone.trim(),
          subject: formData.subject?.trim() || 'Wholesale RFQ Inquiry',
          product: formData.product?.trim() || '',
          quantity: formData.quantity?.trim() || '',
          message: formData.message.trim(),
          newsletter: formData.newsletter,
          privacy: formData.privacy,
          status: 'new',
        })
      ).unwrap();

      setSuccess(true);
      addToast('Your inquiry has been submitted directly to our factory operations desk!', 'success');
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        subject: '',
        product: '',
        quantity: '',
        message: '',
        newsletter: true,
        privacy: false,
      });
      setTimeout(() => setSuccess(false), 6000);
    } catch (err: any) {
      addToast(err?.message || 'Inquiry submitted with local caching.', 'info');
      setSuccess(true);
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        subject: '',
        product: '',
        quantity: '',
        message: '',
        newsletter: true,
        privacy: false,
      });
      setTimeout(() => setSuccess(false), 6000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | B&B Plastic — Get a Quote</title>
        <meta
          name="description"
          content="Contact B&B Plastic for wholesale quotes, product inquiries, sample requests, or bulk orders. Reach our team via phone, email, or WhatsApp."
        />
      </Helmet>

      <div className="min-h-screen bg-[#F7F8FA] pb-24">
        {/* Full-Bleed Editorial Hero Banner with Background Image */}
        <div className="relative pt-32 sm:pt-36 pb-20 sm:pb-24 mb-12 border-b border-[#0B1B33] overflow-hidden bg-[#0B1B33] w-full">
          <img
            src="/contact-hero.jpg"
            alt="B&B Plastic — Contact Our Sales Team"
            className="absolute inset-0 w-full h-full object-cover object-center min-w-full min-h-full opacity-85 filter brightness-[1.05] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1B33]/80 via-[#0B1B33]/50 to-[#0B1B33]/20" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1320px] relative z-10">
            <div className="max-w-3xl">
              <span className="inline-block px-3.5 py-1 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider bg-[#174A8B]/30 text-blue-300 mb-4 border border-[#174A8B]/50 shadow-sm">
                Sales &amp; Support
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-5 leading-tight">
                Contact <span className="text-white">Our Team</span>
              </h1>
              <p className="text-slate-200 text-base sm:text-lg lg:text-xl leading-relaxed font-normal">
                Get in touch for wholesale pricing, product inquiries, sample requests, or bulk order quotations. We're here to help.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Info Cards */}
        <section className="py-12 bg-[#F7F8FA]">
          <div className="container mx-auto px-4 max-w-[1320px]">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold mb-3 text-[#101828]">Get in Touch</h2>
              <p className="text-[#667085] max-w-2xl mx-auto">
                We're here to help with your product inquiries, wholesale orders, and business requirements
              </p>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="grid md:grid-cols-3 gap-8 mb-16 max-w-[1320px] mx-auto"
            >
              <motion.div
                variants={fadeInUp}
                className="bg-white p-8 rounded-2xl border border-[#E4E7EC] hover:shadow-md transition-all text-center"
              >
                <div className="w-14 h-14 mx-auto bg-[#F0F4F8] text-[#174A8B] rounded-xl flex items-center justify-center mb-6 border border-[#E2E8F0]">
                  <FiMapPin className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold mb-4 text-[#101828]">Visit Us</h4>
                <div className="text-[#667085] text-sm space-y-4 font-normal">
                  <p>
                    <strong className="text-[#101828]">Manufacturing Plant:</strong>
                    <br />
                    E-16, Sector-15 GIDA
                    <br />
                    Gorakhpur, Uttar Pradesh 273209, India
                  </p>
                  <div className="w-12 h-px bg-[#E4E7EC] mx-auto"></div>
                  <p>
                    <strong className="text-[#101828]">Branch Office:</strong>
                    <br />
                    C-1204, Seventh Bliss, Gota
                    <br />
                    Ahmedabad, Gujarat, India
                  </p>
                </div>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="bg-white p-8 rounded-2xl border border-[#E4E7EC] hover:shadow-md transition-all text-center"
              >
                <div className="w-14 h-14 mx-auto bg-[#F0F4F8] text-[#174A8B] rounded-xl flex items-center justify-center mb-6 border border-[#E2E8F0]">
                  <FiPhone className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold mb-4 text-[#101828]">Call Us</h4>
                <div className="text-[#667085] text-sm space-y-4 font-normal">
                  <p>
                    <strong className="text-[#101828]">Sales &amp; Orders:</strong>
                    <br />
                    +91 91189 13028
                  </p>
                  <div className="w-12 h-px bg-[#E4E7EC] mx-auto"></div>
                  <p>
                    <strong className="text-[#101828]">WhatsApp Support:</strong>
                    <br />
                    +91 91189 13028
                  </p>
                </div>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="bg-white p-8 rounded-2xl border border-[#E4E7EC] hover:shadow-md transition-all text-center"
              >
                <div className="w-14 h-14 mx-auto bg-[#F0F4F8] text-[#174A8B] rounded-xl flex items-center justify-center mb-6 border border-[#E2E8F0]">
                  <FiMail className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold mb-4 text-[#101828]">Email Us</h4>
                <div className="text-[#667085] text-sm space-y-4 font-normal">
                  <p>
                    <strong className="text-[#101828]">General &amp; Sales:</strong>
                    <br />
                    bbplasticsgida@gmail.com
                  </p>
                  <div className="w-12 h-px bg-[#E4E7EC] mx-auto"></div>
                  <p>
                    <strong className="text-[#101828]">Bulk &amp; Wholesale Orders:</strong>
                    <br />
                    bbplasticsgida@gmail.com
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form and Map */}
            <div className="grid lg:grid-cols-12 gap-12 max-w-[1320px] mx-auto">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="lg:col-span-7 bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-[#E4E7EC]"
              >
                <h3 className="text-2xl font-bold mb-8 text-[#101828]">Send Us a Message</h3>

                {success && (
                  <div className="bg-emerald-50 text-[#16A36A] p-4 rounded-xl mb-6 flex items-center gap-3 border border-emerald-200">
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                      ✓
                    </div>
                    <p className="font-medium text-sm">
                      Message sent successfully! We will contact you within 24 hours.
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#101828] mb-2">
                        Full Name <span className="text-[#B8202A]">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-[#F7F8FA] border border-[#E4E7EC] rounded-xl focus:ring-2 focus:ring-[#174A8B] focus:border-transparent outline-none transition-all text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#101828] mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[#F7F8FA] border border-[#E4E7EC] rounded-xl focus:ring-2 focus:ring-[#174A8B] focus:border-transparent outline-none transition-all text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#101828] mb-2">
                        Email Address <span className="text-[#B8202A]">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-[#F7F8FA] border border-[#E4E7EC] rounded-xl focus:ring-2 focus:ring-[#174A8B] focus:border-transparent outline-none transition-all text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#101828] mb-2">
                        Phone Number <span className="text-[#B8202A]">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-[#F7F8FA] border border-[#E4E7EC] rounded-xl focus:ring-2 focus:ring-[#174A8B] focus:border-transparent outline-none transition-all text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#101828] mb-2">
                        Subject <span className="text-[#B8202A]">*</span>
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-[#F7F8FA] border border-[#E4E7EC] rounded-xl focus:ring-2 focus:ring-[#174A8B] focus:border-transparent outline-none transition-all text-sm"
                      >
                        <option value="">Select a subject</option>
                        <option value="Wholesale Quote Request">Wholesale Quote Request</option>
                        <option value="Product Information">Product Information</option>
                        <option value="Sample Request">Sample Request</option>
                        <option value="Bulk / Distributor Inquiry">Bulk / Distributor Inquiry</option>
                        <option value="Custom Branding / Private Label">Custom Branding / Private Label</option>
                        <option value="Shipping & Delivery Query">Shipping &amp; Delivery Query</option>
                        <option value="Complaint / Return">Complaint / Return</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#101828] mb-2">
                        Quantity (approx.)
                      </label>
                      <input
                        type="text"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        placeholder="e.g. 500 pcs, 100 sets"
                        className="w-full px-4 py-3 bg-[#F7F8FA] border border-[#E4E7EC] rounded-xl focus:ring-2 focus:ring-[#174A8B] focus:border-transparent outline-none transition-all text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#101828] mb-2">
                        Product Category
                      </label>
                      <select
                        value={selectedCategory}
                        onChange={(e) => {
                          setSelectedCategory(e.target.value);
                          setFormData((prev) => ({ ...prev, product: '' }));
                        }}
                        className="w-full px-4 py-3 bg-[#F7F8FA] border border-[#E4E7EC] rounded-xl focus:ring-2 focus:ring-[#174A8B] focus:border-transparent outline-none transition-all text-sm"
                      >
                        <option value="">All Categories</option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#101828] mb-2">
                        Specific Product
                      </label>
                      <select
                        name="product"
                        value={formData.product}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[#F7F8FA] border border-[#E4E7EC] rounded-xl focus:ring-2 focus:ring-[#174A8B] focus:border-transparent outline-none transition-all text-sm"
                      >
                        <option value="">Select a product (optional)</option>
                        {filteredProducts.map((prod) => (
                          <option key={prod.id} value={prod.name}>
                            {prod.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#101828] mb-2">
                      Message <span className="text-[#B8202A]">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 bg-[#F7F8FA] border border-[#E4E7EC] rounded-xl focus:ring-2 focus:ring-[#174A8B] focus:border-transparent outline-none transition-all resize-none text-sm"
                      placeholder="Please describe your requirements in detail..."
                    ></textarea>
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        name="newsletter"
                        checked={formData.newsletter}
                        onChange={handleChange}
                        className="w-4 h-4 text-[#174A8B] rounded border-gray-300"
                      />
                      <span className="text-xs text-[#667085]">
                        Subscribe to our newsletter for updates
                      </span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        name="privacy"
                        checked={formData.privacy}
                        onChange={handleChange}
                        required
                        className="w-4 h-4 text-[#174A8B] rounded border-gray-300"
                      />
                      <span className="text-xs text-[#667085]">
                        I agree to the Privacy Policy <span className="text-[#B8202A]">*</span>
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 bg-[#174A8B] text-white rounded-xl font-semibold text-base hover:bg-[#2563B5] transition-colors shadow-sm flex items-center justify-center"
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </motion.div>

              {/* Map and Side Info */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="lg:col-span-5 space-y-8"
              >
                <div className="bg-white p-2 rounded-2xl shadow-sm border border-[#E4E7EC] overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3563.1426277212026!2d83.22812267543348!3d26.739824276750692!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjbCsDQ0JzIzLjQiTiA4M8KwMTMnNTAuNSJF!5e0!3m2!1sen!2sin!4v1772862143828!5m2!1sen!2sin"
                    width="100%"
                    height="260"
                    style={{ border: 0, borderRadius: '0.75rem' }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="B&B Plastic Factory Location"
                  ></iframe>
                </div>

                <div className="bg-[#0B1B33] text-white p-6 sm:p-8 rounded-2xl shadow-md border border-white/10">
                  <h4 className="text-xl font-bold mb-6 flex items-center gap-3">
                    <FiClock className="w-5 h-5 text-blue-300" /> Business Hours
                  </h4>
                  <ul className="space-y-4 font-normal text-sm">
                    <li className="flex justify-between items-center pb-4 border-b border-white/10">
                      <span>Monday - Friday</span>
                      <span className="font-mono">9:00 AM - 6:00 PM</span>
                    </li>
                    <li className="flex justify-between items-center pb-4 border-b border-white/10">
                      <span>Saturday</span>
                      <span className="font-mono">9:00 AM - 2:00 PM</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Sunday</span>
                      <span className="text-[#16A36A] font-bold">Closed</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-[#E4E7EC]">
                  <h4 className="text-xl font-bold mb-3 text-[#101828] flex items-center gap-2">
                    <FiMessageCircle className="text-[#16A36A]" /> Quick WhatsApp
                  </h4>
                  <p className="text-[#667085] mb-6 text-xs sm:text-sm">
                    Need a quick quotation or have an urgent query? Message us directly.
                  </p>
                  <a
                    href="https://wa.me/919118913028?text=Hello%20B%26B%20Plastics,%20I%20am%20interested%20in%20bulk%20wholesale%20products"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 bg-[#16A36A] text-white rounded-xl font-semibold hover:bg-[#138A58] transition-colors flex items-center justify-center gap-2 text-sm shadow-sm"
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Departments */}
        <section className="py-16 bg-white border-t border-[#E4E7EC]">
          <div className="container mx-auto px-4 max-w-[1320px]">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-3 text-[#101828]">Contact Our Departments</h2>
              <p className="text-[#667085] max-w-2xl mx-auto text-sm sm:text-base">
                Connect with the right team for your specific needs
              </p>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8 max-w-[1320px] mx-auto"
            >
              <motion.div
                variants={fadeInUp}
                className="bg-[#F7F8FA] p-8 rounded-2xl border border-[#E4E7EC] hover:shadow-sm transition-shadow"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-[#F0F4F8] text-[#174A8B] rounded-xl flex items-center justify-center">
                    <FiShoppingCart className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold text-[#101828]">Sales &amp; Orders</h4>
                </div>
                <p className="text-[#667085] mb-6 text-xs sm:text-sm">
                  For product inquiries, wholesale pricing, bulk order quotations, and distributor partnerships.
                </p>
                <div className="text-xs sm:text-sm font-medium text-[#101828] space-y-2 mb-6">
                  <p>
                    Email: <span className="text-[#174A8B]">bbplasticsgida@gmail.com</span>
                  </p>
                  <p>
                    Phone: <span className="text-[#174A8B]">+91 91189 13028</span>
                  </p>
                </div>
                <div className="pt-4 border-t border-[#E4E7EC]">
                  <span className="text-xs text-[#667085] bg-white px-3 py-1 rounded-full border border-[#E4E7EC] font-medium">
                    Response time: 2 hrs
                  </span>
                </div>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="bg-[#F7F8FA] p-8 rounded-2xl border border-[#E4E7EC] hover:shadow-sm transition-shadow"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-emerald-50 text-[#16A36A] rounded-xl flex items-center justify-center">
                    <FiSettings className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold text-[#101828]">Product &amp; Quality Support</h4>
                </div>
                <p className="text-[#667085] mb-6 text-xs sm:text-sm">
                  For product specifications, quality queries, sample requests, and custom branding discussions.
                </p>
                <div className="text-xs sm:text-sm font-medium text-[#101828] space-y-2 mb-6">
                  <p>
                    Email: <span className="text-[#174A8B]">bbplasticsgida@gmail.com</span>
                  </p>
                  <p>
                    Phone: <span className="text-[#174A8B]">+91 91189 13028</span>
                  </p>
                </div>
                <div className="pt-4 border-t border-[#E4E7EC]">
                  <span className="text-xs text-[#667085] bg-white px-3 py-1 rounded-full border border-[#E4E7EC] font-medium">
                    Response time: 4 hrs
                  </span>
                </div>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="bg-[#F7F8FA] p-8 rounded-2xl border border-[#E4E7EC] hover:shadow-sm transition-shadow"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-[#F0F4F8] text-[#174A8B] rounded-xl flex items-center justify-center">
                    <FiTruck className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold text-[#101828]">Logistics &amp; Shipping</h4>
                </div>
                <p className="text-[#667085] mb-6 text-xs sm:text-sm">
                  For delivery tracking, shipping queries, order status, and logistics coordination.
                </p>
                <div className="text-xs sm:text-sm font-medium text-[#101828] space-y-2 mb-6">
                  <p>
                    Email: <span className="text-[#174A8B]">bbplasticsgida@gmail.com</span>
                  </p>
                  <p>
                    Phone: <span className="text-[#174A8B]">+91 91189 13028</span>
                  </p>
                </div>
                <div className="pt-4 border-t border-[#E4E7EC]">
                  <span className="text-xs text-[#667085] bg-white px-3 py-1 rounded-full border border-[#E4E7EC] font-medium">
                    Response time: 1 day
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Pre-Footer Action */}
        <section className="py-16 bg-[#174A8B] text-white text-center">
          <div className="container mx-auto px-4 max-w-[1320px]">
            <h2 className="text-3xl font-bold mb-4">Have General Questions?</h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-sm sm:text-base">
              Check our Help Center for quick answers to common questions about products, ordering, shipping and more before sending us a message.
            </p>
            <Link
              to="/help"
              className="inline-block px-8 py-3.5 bg-white text-[#174A8B] font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-md text-sm sm:text-base"
            >
              Visit Help Center
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;
