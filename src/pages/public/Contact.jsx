import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiMapPin, FiPhone, FiMail, FiClock, FiMessageCircle, FiShoppingCart, FiSettings, FiTruck } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    subject: '',
    product: '',
    quantity: '',
    message: '',
    newsletter: true,
    privacy: false
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setFormData({
        name: '', company: '', email: '', phone: '', subject: '', product: '', quantity: '', message: '', newsletter: true, privacy: false
      });
      setTimeout(() => setSuccess(false), 5000);
    }, 1500);
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | B&B Plastic</title>
        <meta name="description" content="Get in touch with our team for wholesale polymer inquiries, custom mold quotes or direct factory support." />
      </Helmet>

      <div className="pt-28 pb-24 min-h-screen bg-gray-50">
        {/* Editorial Hero Banner with Contact Center Background Image */}
        <div className="relative py-20 sm:py-24 mb-12 border-b border-gray-800 overflow-hidden">
          <img
            src="/contact-hero.jpg"
            alt="B&B Plastics Interactive Trade Assistance Desk"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/85 to-slate-900/60" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
            <div className="max-w-3xl">
              <span className="inline-block px-3.5 py-1 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider bg-primary/25 text-blue-300 mb-4 border border-primary/40 shadow-sm">
                Direct Trade Desk &amp; Factory Support
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-5 leading-tight">
                Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-primary">Our Engineers</span>
              </h1>
              <p className="text-gray-200 text-base sm:text-lg lg:text-xl leading-relaxed font-medium">
                Connect directly with our GIDA Gorakhpur manufacturing team for FOB/CIF quotes, sample requests, or OEM custom mold engineering.
              </p>
            </div>
          </div>
        </div>

      {/* Contact Info Cards */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-secondary">Get in Touch</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">We're here to help with your plastic granules requirements</p>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid md:grid-cols-3 gap-8 mb-16 max-w-6xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-shadow text-center">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary to-blue-500 text-white rounded-full flex items-center justify-center mb-6 shadow-lg shadow-primary/30">
                <FiMapPin className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold mb-4 text-secondary">Visit Us</h4>
              <div className="text-gray-600 text-sm space-y-4">
                <p><strong>Head Office:</strong><br />C-34, Vibhuti Khand Gomti Nagar<br />Lucknow, Uttar Pradesh 226010, India</p>
                <div className="w-12 h-px bg-gray-200 mx-auto"></div>
                <p><strong>Factory:</strong><br />E-16, SECTOR-15 GIDA<br />Gorakhpur, Uttar Pradesh 273209, India</p>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-shadow text-center">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary to-blue-500 text-white rounded-full flex items-center justify-center mb-6 shadow-lg shadow-primary/30">
                <FiPhone className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold mb-4 text-secondary">Call Us</h4>
              <div className="text-gray-600 text-sm space-y-4">
                <p><strong>Sales & Technical:</strong><br />+91 88088 80012<br />+91 88088 80021</p>
                <div className="w-12 h-px bg-gray-200 mx-auto"></div>
                <p><strong>Emergency Contact (24/7):</strong><br />+91 88088 80012</p>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-shadow text-center">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary to-blue-500 text-white rounded-full flex items-center justify-center mb-6 shadow-lg shadow-primary/30">
                <FiMail className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold mb-4 text-secondary">Email Us</h4>
              <div className="text-gray-600 text-sm space-y-4">
                <p><strong>General & Sales:</strong><br />bigziaplasticgranules@gmail.com</p>
                <div className="w-12 h-px bg-gray-200 mx-auto"></div>
                <p><strong>Export Inquiries:</strong><br />bigziaplasticgranules@gmail.com</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form and Map */}
          <div className="grid lg:grid-cols-12 gap-12 max-w-7xl mx-auto">
            {/* Form */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="lg:col-span-7 bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100"
            >
              <h3 className="text-2xl font-bold mb-8 text-secondary">Send Us a Message</h3>
              
              {success && (
                <div className="bg-green-50 text-green-700 p-4 rounded-xl mb-6 flex items-center gap-3 border border-green-100">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">✓</div>
                  <p className="font-medium">Message sent successfully! We will contact you within 24 hours.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name <span className="text-red-500">*</span></label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                    <input type="text" name="company" value={formData.company} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address <span className="text-red-500">*</span></label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number <span className="text-red-500">*</span></label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject <span className="text-red-500">*</span></label>
                    <select name="subject" value={formData.subject} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all">
                      <option value="">Select a subject</option>
                      <option value="quote">Request for Quote</option>
                      <option value="product-info">Product Information</option>
                      <option value="technical">Technical Support</option>
                      <option value="sample">Request for Sample</option>
                      <option value="partnership">Business Partnership</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Product Interest</label>
                    <select name="product" value={formData.product} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all">
                      <option value="">Select a product</option>
                      <option value="pp">PP Granules</option>
                      <option value="hdpe">HDPE Granules</option>
                      <option value="ldpe">LDPE Granules</option>
                      <option value="abs">ABS Granules</option>
                      <option value="recycled">Recycled Granules</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message <span className="text-red-500">*</span></label>
                  <textarea name="message" value={formData.message} onChange={handleChange} required rows="5" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none" placeholder="Please describe your requirements in detail..."></textarea>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center gap-3">
                    <input type="checkbox" name="newsletter" checked={formData.newsletter} onChange={handleChange} className="w-5 h-5 text-primary rounded border-gray-300" />
                    <span className="text-sm text-gray-600">Subscribe to our newsletter for updates</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" name="privacy" checked={formData.privacy} onChange={handleChange} required className="w-5 h-5 text-primary rounded border-gray-300" />
                    <span className="text-sm text-gray-600">I agree to the Privacy Policy <span className="text-red-500">*</span></span>
                  </label>
                </div>

                <button type="submit" disabled={loading} className="w-full py-4 bg-primary text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg shadow-primary/30 flex items-center justify-center">
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
              {/* Map */}
              <div className="bg-white p-2 rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3563.1426277212026!2d83.22812267543348!3d26.739824276750692!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjbCsDQ0JzIzLjQiTiA4M8KwMTMnNTAuNSJF!5e0!3m2!1sen!2sin!4v1772862143828!5m2!1sen!2sin" width="100%" height="300" style={{border:0, borderRadius: '1rem'}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="PlasticoGranules Office Location"></iframe>
              </div>

              {/* Business Hours */}
              <div className="bg-gradient-to-br from-primary to-blue-600 text-white p-8 rounded-2xl shadow-lg">
                <h4 className="text-xl font-bold mb-6 flex items-center gap-3"><FiClock className="w-6 h-6" /> Business Hours</h4>
                <ul className="space-y-4 font-medium">
                  <li className="flex justify-between items-center pb-4 border-b border-white/20">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </li>
                  <li className="flex justify-between items-center pb-4 border-b border-white/20">
                    <span>Saturday</span>
                    <span>9:00 AM - 2:00 PM</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Sunday</span>
                    <span className="text-yellow-300 font-bold">Closed</span>
                  </li>
                </ul>
              </div>

              {/* Quick WhatsApp */}
              <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                 <h4 className="text-xl font-bold mb-4 text-secondary flex items-center gap-2"><FiMessageCircle className="text-green-500" /> Quick WhatsApp</h4>
                 <p className="text-gray-600 mb-6 text-sm">Need a quick quotation or have an urgent query? Message us directly.</p>
                 <a href="https://wa.me/8808880012?text=Hello%20I%20am%20interested%20in%20Plastic%20Granules" target="_blank" rel="noreferrer" className="w-full py-3 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition-colors flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c-.003 1.396.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c.004-3.639 2.961-6.592 6.602-6.592 1.76 0 3.416.687 4.66 1.932A6.59 6.59 0 0 1 14.59 7.93c-.004 3.639-2.96 6.592-6.596 6.592z"/>
                      <path d="M11.872 9.4c-.204-.102-1.206-.595-1.392-.663-.186-.068-.322-.102-.458.102-.136.204-.526.663-.645.8-.119.136-.238.153-.442.051-.204-.102-.862-.318-1.642-.988-.609-.523-1.02-1.168-1.14-1.372-.119-.204-.014-.315.088-.417.091-.091.204-.238.306-.357.102-.119.136-.204.204-.34.068-.136.034-.255-.017-.357-.051-.102-.458-1.105-.627-1.512-.165-.395-.333-.342-.458-.348-.119-.005-.255-.005-.391-.005-.136 0-.357.051-.544.255-.187.204-.714.697-.714 1.7 0 1.003.731 1.972.833 2.108.102.136 1.439 2.196 3.486 3.079.488.211.869.337 1.165.431.49.155.937.133 1.288.08.391-.06.1206-.492 1.376-.968.17-.476.17-.884.119-.968-.051-.085-.187-.136-.391-.238z"/>
                    </svg>
                    Chat on WhatsApp
                 </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-secondary">Contact Our Departments</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Connect with the right team for your specific needs</p>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-shadow">
               <div className="flex items-center gap-4 mb-6">
                 <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    <FiShoppingCart className="w-6 h-6" />
                 </div>
                 <h4 className="text-xl font-bold text-secondary">Sales Department</h4>
               </div>
               <p className="text-gray-600 mb-6">For product inquiries, pricing, quotes, and order placement.</p>
               <div className="text-sm font-medium text-gray-700 space-y-2 mb-6">
                 <p>Email: <span className="text-primary">bigziaplasticgranules@gmail.com</span></p>
                 <p>Phone: <span className="text-primary">+91 88088 80021</span></p>
               </div>
               <div className="pt-4 border-t border-gray-200">
                  <span className="text-xs text-gray-500 bg-gray-200 px-3 py-1 rounded-full font-medium">Response time: 2 hrs</span>
               </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-shadow">
               <div className="flex items-center gap-4 mb-6">
                 <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center text-green-600">
                    <FiSettings className="w-6 h-6" />
                 </div>
                 <h4 className="text-xl font-bold text-secondary">Technical Support</h4>
               </div>
               <p className="text-gray-600 mb-6">For technical questions, material selection, and processing guidance.</p>
               <div className="text-sm font-medium text-gray-700 space-y-2 mb-6">
                 <p>Email: <span className="text-primary">bigziaplasticgranules@gmail.com</span></p>
                 <p>Phone: <span className="text-primary">+91 88088 80021</span></p>
               </div>
               <div className="pt-4 border-t border-gray-200">
                  <span className="text-xs text-gray-500 bg-gray-200 px-3 py-1 rounded-full font-medium">Response time: 4 hrs</span>
               </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-shadow">
               <div className="flex items-center gap-4 mb-6">
                 <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center text-yellow-600">
                    <FiTruck className="w-6 h-6" />
                 </div>
                 <h4 className="text-xl font-bold text-secondary">Logistics & Shipping</h4>
               </div>
               <p className="text-gray-600 mb-6">For delivery tracking, shipping queries, and logistics coordination.</p>
               <div className="text-sm font-medium text-gray-700 space-y-2 mb-6">
                 <p>Email: <span className="text-primary">bigziaplasticgranules@gmail.com</span></p>
                 <p>Phone: <span className="text-primary">+91 88088 80021</span></p>
               </div>
               <div className="pt-4 border-t border-gray-200">
                  <span className="text-xs text-gray-500 bg-gray-200 px-3 py-1 rounded-full font-medium">Response time: 1 day</span>
               </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Pre-Footer Action */}
      <section className="py-16 bg-primary text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Have General Questions?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">Check our Help Center for quick answers to common questions about products, ordering, shipping and more before sending us a message.</p>
          <Link to="/" className="inline-block px-8 py-3 bg-white text-primary font-bold rounded-full hover:bg-gray-100 transition-colors shadow-lg">
            Visit Help Center
          </Link>
        </div>
      </section>
      </div>
    </>
  );
};

export default Contact;
