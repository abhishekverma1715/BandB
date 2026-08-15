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
      setScrolled(window.scrollY > 20);
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
          ? 'bg-white shadow-sm py-3.5 border-b border-[#E4E7EC]'
          : 'bg-white/95 backdrop-blur-md py-4 border-b border-[#E4E7EC]'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1320px] flex justify-between items-center h-12">
        {/* Logo */}
        <Link to="/" className="transition-transform hover:scale-[1.02] flex-shrink-0">
          <Logo variant="horizontal" className="h-8 sm:h-9 w-auto" />
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center space-x-8 text-sm font-semibold text-[#101828]">
          <Link to="/" className="hover:text-[#174A8B] transition-colors">Home</Link>
          <Link to="/products" className="hover:text-[#174A8B] transition-colors">Products</Link>
          <Link to="/about" className="hover:text-[#174A8B] transition-colors">About Us</Link>
          <Link to="/help" className="hover:text-[#174A8B] transition-colors">Help Center</Link>
          <Link to="/contact" className="hover:text-[#174A8B] transition-colors">Contact</Link>
        </div>

        {/* Desktop CTA Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="tel:+919118913028"
            className="hidden md:inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-[#174A8B] bg-[#F0F4F8] hover:bg-[#E2E8F0] rounded-xl transition-colors border border-[#E2E8F0]"
          >
            <FiPhoneCall className="w-3.5 h-3.5 text-[#174A8B]" />
            <span>+91 91189 13028</span>
          </a>
          <Link
            to="/contact"
            className="px-5 py-2.5 bg-[#174A8B] hover:bg-[#2563B5] text-white text-xs sm:text-sm font-semibold rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 active:scale-95"
          >
            <span>Get a Quote</span>
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link
            to="/contact"
            className="sm:hidden px-3.5 py-1.5 bg-[#174A8B] text-white text-xs font-semibold rounded-lg shadow-sm"
          >
            Quote
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Mobile Navigation"
            className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-secondary transition-colors"
          >
            {mobileMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#E4E7EC] shadow-lg px-4 pt-3 pb-6 mt-3 animate-fadeIn">
          <div className="flex flex-col space-y-2 font-semibold text-[#101828]">
            <Link
              to="/"
              className="px-4 py-2.5 rounded-xl hover:bg-gray-50 flex items-center justify-between text-sm"
            >
              <span>Home</span>
              <FiArrowRight className="w-4 h-4 text-gray-400" />
            </Link>
            <Link
              to="/products"
              className="px-4 py-2.5 rounded-xl hover:bg-gray-50 flex items-center justify-between text-sm"
            >
              <span>Wholesale Products</span>
              <FiArrowRight className="w-4 h-4 text-gray-400" />
            </Link>
            <Link
              to="/about"
              className="px-4 py-2.5 rounded-xl hover:bg-gray-50 flex items-center justify-between text-sm"
            >
              <span>About Factory & Facility</span>
              <FiArrowRight className="w-4 h-4 text-gray-400" />
            </Link>
            <Link
              to="/help"
              className="px-4 py-2.5 rounded-xl hover:bg-gray-50 flex items-center justify-between text-sm"
            >
              <span>Help & FAQs</span>
              <FiArrowRight className="w-4 h-4 text-gray-400" />
            </Link>
            <Link
              to="/contact"
              className="px-4 py-2.5 rounded-xl hover:bg-gray-50 flex items-center justify-between text-sm"
            >
              <span>Contact Trade Desk</span>
              <FiArrowRight className="w-4 h-4 text-gray-400" />
            </Link>

            <div className="pt-3 border-t border-[#E4E7EC] flex flex-col gap-2.5">
              <Link
                to="/contact"
                className="w-full py-3 bg-[#174A8B] hover:bg-[#2563B5] text-white text-center font-semibold text-sm rounded-xl shadow-sm"
              >
                Request Bulk Quotation
              </Link>
              <a
                href="tel:+919118913028"
                className="w-full py-3 bg-[#F0F4F8] text-[#174A8B] text-center font-semibold text-sm rounded-xl flex items-center justify-center gap-2 border border-[#E2E8F0]"
              >
                <FiPhoneCall className="w-4 h-4 text-[#174A8B]" />
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

