import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  FiHome,
  FiBox,
  FiLayers,
  FiMessageSquare,
  FiSettings,
  FiLogOut,
  FiExternalLink,
  FiMenu,
  FiX,
  FiBell,
} from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '../../store/store.js';
import { logout, selectAdminInfo } from '../../features/auth/authSlice.js';
import { selectUnreadCount } from '../../features/inquiries/inquiriesSlice.js';
import Logo from '../../components/common/Logo.js';
import { useToast } from '../../components/common/Toast.js';

const DashboardLayout: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { addToast } = useToast();
  const adminInfo = useAppSelector(selectAdminInfo);
  const unreadInquiries = useAppSelector(selectUnreadCount);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    addToast('Signed out of admin session.', 'info');
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <FiHome className="text-lg" /> },
    { name: 'Products', path: '/admin/products', icon: <FiBox className="text-lg" /> },
    { name: 'Categories', path: '/admin/categories', icon: <FiLayers className="text-lg" /> },
    {
      name: 'Inquiries',
      path: '/admin/messages',
      icon: <FiMessageSquare className="text-lg" />,
      badge: unreadInquiries > 0 ? unreadInquiries : null,
    },
    { name: 'Settings', path: '/admin/settings', icon: <FiSettings className="text-lg" /> },
  ];

  const currentTitle =
    navItems.find((item) => item.path === location.pathname)?.name || 'Admin Overview';

  return (
    <div className="flex h-screen bg-[#F7F8FA] overflow-hidden font-sans">
      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] bg-[#0B1B33] text-white flex flex-col border-r border-[#174A8B]/30 transform transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Logo & Close Button */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Logo variant="horizontal" dark={true} />
          </Link>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white p-2 rounded-lg hover:bg-white/10"
            aria-label="Close navigation"
          >
            <FiX className="text-xl" />
          </button>
        </div>

        {/* Public Store Link Quick Button */}
        <div className="px-4 pt-4">
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-blue-200 transition-all border border-white/10 group"
          >
            <span>Live Showroom</span>
            <FiExternalLink className="text-xs group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 p-3 sm:p-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl font-medium text-xs sm:text-sm transition-all ${
                  isActive
                    ? 'bg-primary text-white shadow-lg shadow-primary/30 font-semibold'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-brandRed text-white animate-pulse">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Badge & Logout in Footer */}
        <div className="p-4 border-t border-white/10 bg-[#071324]/50">
          <div className="flex items-center gap-3 mb-3 px-1">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-primary/80 border border-white/20 flex items-center justify-center text-white font-bold text-xs sm:text-sm flex-shrink-0">
              {adminInfo?.name?.charAt(0) || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">
                {adminInfo?.name || 'Administrator'}
              </p>
              <p className="text-[10px] sm:text-[11px] text-gray-400 truncate">
                {adminInfo?.email || 'admin@bbplastics.com'}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 px-4 py-2 sm:py-2.5 w-full rounded-xl text-xs font-bold text-red-300 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 transition-all"
          >
            <FiLogOut className="text-sm" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="bg-white border-b border-[#E4E7EC] px-3 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-4 min-w-0">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden text-secondary p-2 -ml-1 rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0"
              aria-label="Open navigation menu"
            >
              <FiMenu className="text-xl" />
            </button>
            <div className="min-w-0">
              <h1 className="text-lg sm:text-2xl font-extrabold text-secondary tracking-tight truncate">
                {currentTitle}
              </h1>
              <p className="text-xs text-body hidden sm:block truncate">
                B&amp;B Plastics Factory &amp; Operations Management Suite
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            <Link
              to="/admin/messages"
              className="relative p-2 sm:p-2.5 rounded-xl text-gray-600 hover:text-primary hover:bg-blue-50 transition-colors border border-transparent hover:border-blue-100"
              title="View Inquiries"
            >
              <FiBell className="text-lg" />
              {unreadInquiries > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-brandRed rounded-full ring-2 ring-white" />
              )}
            </Link>

            <div className="h-6 w-px bg-gray-200 hidden sm:block" />

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-primary text-white font-bold text-xs sm:text-sm flex items-center justify-center shadow-md shadow-primary/20 flex-shrink-0">
                {adminInfo?.name?.charAt(0) || 'A'}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-xs font-bold text-secondary">
                  {adminInfo?.name || 'Administrator'}
                </p>
                <span className="inline-block px-1.5 py-0.2 text-[10px] font-semibold bg-emerald-100 text-emerald-800 rounded">
                  {adminInfo?.role || 'Super Admin'}
                </span>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-3 sm:p-6 lg:p-8 bg-[#F7F8FA]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
