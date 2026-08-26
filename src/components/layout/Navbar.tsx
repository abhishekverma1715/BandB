import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiPhoneCall, FiArrowRight } from 'react-icons/fi';
import Logo from '../common/Logo.js';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Navbar always uses solid white for consistent visibility
  const navBackgroundClass = 'bg-white py-3 border-b border-[#E4E7EC]' + (scrolled ? ' shadow-sm' : '');

  return (
    <nav className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${navBackgroundClass}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1320px] flex justify-between items-center h-12">
        {/* Logo */}
        <Link to="/" className="transition-transform hover:scale-[1.02] flex-shrink-0">
          <Logo variant="horizontal" className="h-8 sm:h-9 w-auto" />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center space-x-8 text-sm font-bold text-[#1E293B]">
          <Link
            to="/"
            className={`transition-colors relative py-1 ${location.pathname === '/'
                ? 'text-[#023061] after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#B2151E] after:rounded-full'
                : 'hover:text-[#023061]'
              }`}
          >
            Home
          </Link>
          <Link
            to="/products"
            className={`transition-colors relative py-1 ${location.pathname.startsWith('/products')
                ? 'text-[#023061] after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#B2151E] after:rounded-full'
                : 'hover:text-[#023061]'
              }`}
          >
            Products
          </Link>
          <Link
            to="/about"
            className={`transition-colors relative py-1 ${location.pathname === '/about'
                ? 'text-[#023061] after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#B2151E] after:rounded-full'
                : 'hover:text-[#023061]'
              }`}
          >
            About Us
          </Link>
          <Link
            to="/help"
            className={`transition-colors relative py-1 ${location.pathname === '/help'
                ? 'text-[#023061] after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#B2151E] after:rounded-full'
                : 'hover:text-[#023061]'
              }`}
          >
            Help Center
          </Link>
          <Link
            to="/contact"
            className={`transition-colors relative py-1 ${location.pathname === '/contact'
                ? 'text-[#023061] after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#B2151E] after:rounded-full'
                : 'hover:text-[#023061]'
              }`}
          >
            Contact
          </Link>
        </div>

        {/* Desktop CTA & Contact Info */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="tel:+919118913028"
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-[#023061] bg-[#F0F4F8] hover:bg-[#E2E8F0] rounded-full transition-colors border border-[#CBD5E1]"
          >
            <FiPhoneCall className="w-3.5 h-3.5 text-[#B2151E]" />
            <span>+91 91189 13028</span>
          </a>
          <Link
            to="/contact"
            className="px-5 py-2.5 bg-[#B2151E] hover:bg-[#961219] text-white text-xs sm:text-sm font-bold rounded-full transition-all shadow-sm hover:shadow flex items-center justify-center gap-1.5 active:scale-95 group"
          >
            <span>Get a Quote</span>
            <FiArrowRight className="text-sm group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link
            to="/contact"
            className="sm:hidden px-3.5 py-1.5 bg-[#B2151E] text-white text-xs font-bold rounded-full shadow-sm"
          >
            Quote
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Mobile Navigation"
            className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#1E293B] transition-colors border border-gray-200"
          >
            {mobileMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#E4E7EC] shadow-lg px-4 pt-3 pb-6 mt-3 animate-fadeIn">
          <div className="flex flex-col space-y-2 font-bold text-[#1E293B]">
            <Link
              to="/"
              className={`px-4 py-2.5 rounded-xl flex items-center justify-between text-sm ${location.pathname === '/' ? 'bg-[#F0F4F8] text-[#023061]' : 'hover:bg-gray-50'
                }`}
            >
              <span>Home</span>
              <FiArrowRight className="w-4 h-4 text-gray-400" />
            </Link>
            <Link
              to="/products"
              className={`px-4 py-2.5 rounded-xl flex items-center justify-between text-sm ${location.pathname.startsWith('/products') ? 'bg-[#F0F4F8] text-[#023061]' : 'hover:bg-gray-50'
                }`}
            >
              <span>Wholesale Products</span>
              <FiArrowRight className="w-4 h-4 text-gray-400" />
            </Link>
            <Link
              to="/about"
              className={`px-4 py-2.5 rounded-xl flex items-center justify-between text-sm ${location.pathname === '/about' ? 'bg-[#F0F4F8] text-[#023061]' : 'hover:bg-gray-50'
                }`}
            >
              <span>About Factory &amp; Facility</span>
              <FiArrowRight className="w-4 h-4 text-gray-400" />
            </Link>
            <Link
              to="/help"
              className={`px-4 py-2.5 rounded-xl flex items-center justify-between text-sm ${location.pathname === '/help' ? 'bg-[#F0F4F8] text-[#023061]' : 'hover:bg-gray-50'
                }`}
            >
              <span>HelpCenter</span>
              <FiArrowRight className="w-4 h-4 text-gray-400" />
            </Link>
            <Link
              to="/contact"
              className={`px-4 py-2.5 rounded-xl flex items-center justify-between text-sm ${location.pathname === '/contact' ? 'bg-[#F0F4F8] text-[#023061]' : 'hover:bg-gray-50'
                }`}
            >
              <span>Contact Trade Desk</span>
              <FiArrowRight className="w-4 h-4 text-gray-400" />
            </Link>

            <div className="pt-3 border-t border-[#E4E7EC] flex flex-col gap-2.5">
              <Link
                to="/contact"
                className="w-full py-3 bg-[#B2151E] hover:bg-[#961219] text-white text-center font-bold text-sm rounded-full shadow-sm"
              >
                Request Bulk Quotation
              </Link>
              <a
                href="tel:+919118913028"
                className="w-full py-3 bg-[#F0F4F8] text-[#023061] text-center font-bold text-sm rounded-full flex items-center justify-center gap-2 border border-[#CBD5E1]"
              >
                <FiPhoneCall className="w-4 h-4 text-[#B2151E]" />
                Call Factory Sales (+91 91189 13028)
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
