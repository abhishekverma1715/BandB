import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiPhoneCall, FiArrowRight } from 'react-icons/fi';
import Logo from '../common/Logo.jsx';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when navigating
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        scrolled || mobileMenuOpen
          ? 'bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-gray-100'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="transition-transform hover:scale-105 flex-shrink-0">
          <Logo variant="horizontal" className="h-8 sm:h-10 w-auto" />
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center space-x-8 font-medium text-secondary">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <Link to="/products" className="hover:text-primary transition-colors">Products</Link>
          <Link to="/about" className="hover:text-primary transition-colors">About Us</Link>
          <Link to="/help" className="hover:text-primary transition-colors">Help Center</Link>
          <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
        </div>

        {/* Desktop CTA Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="tel:+918808880012"
            className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-secondary bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
          >
            <FiPhoneCall className="w-3.5 h-3.5 text-primary" />
            <span>+91 88088 80012</span>
          </a>
          <Link
            to="/contact"
            className="px-5 sm:px-6 py-2 bg-primary text-white text-sm font-bold rounded-full hover:bg-blue-700 transition-colors shadow-lg shadow-primary/30 flex items-center gap-1.5"
          >
            <span>Get a Quote</span>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link
            to="/contact"
            className="sm:hidden px-4 py-1.5 bg-primary text-white text-xs font-bold rounded-full shadow-md"
          >
            Quote
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Mobile Navigation"
            className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-secondary transition-colors"
          >
            {mobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 shadow-xl px-4 pt-4 pb-6 mt-3 animate-fadeIn">
          <div className="flex flex-col space-y-3 font-semibold text-secondary">
            <Link
              to="/"
              className="px-4 py-2.5 rounded-xl hover:bg-gray-50 flex items-center justify-between"
            >
              <span>Home</span>
              <FiArrowRight className="w-4 h-4 text-gray-400" />
            </Link>
            <Link
              to="/products"
              className="px-4 py-2.5 rounded-xl hover:bg-gray-50 flex items-center justify-between"
            >
              <span>Wholesale Products</span>
              <FiArrowRight className="w-4 h-4 text-gray-400" />
            </Link>
            <Link
              to="/about"
              className="px-4 py-2.5 rounded-xl hover:bg-gray-50 flex items-center justify-between"
            >
              <span>About Factory & Facility</span>
              <FiArrowRight className="w-4 h-4 text-gray-400" />
            </Link>
            <Link
              to="/help"
              className="px-4 py-2.5 rounded-xl hover:bg-gray-50 flex items-center justify-between"
            >
              <span>Help & FAQs</span>
              <FiArrowRight className="w-4 h-4 text-gray-400" />
            </Link>
            <Link
              to="/contact"
              className="px-4 py-2.5 rounded-xl hover:bg-gray-50 flex items-center justify-between"
            >
              <span>Contact Trade Desk</span>
              <FiArrowRight className="w-4 h-4 text-gray-400" />
            </Link>

            <div className="pt-3 border-t border-gray-100 flex flex-col gap-2.5">
              <Link
                to="/contact"
                className="w-full py-3 bg-primary text-white text-center font-bold text-sm rounded-xl shadow-lg shadow-primary/25"
              >
                Request Bulk Quotation
              </Link>
              <a
                href="tel:+918808880012"
                className="w-full py-3 bg-gray-100 text-secondary text-center font-bold text-sm rounded-xl flex items-center justify-center gap-2"
              >
                <FiPhoneCall className="w-4 h-4 text-primary" />
                Call Factory Sales
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
