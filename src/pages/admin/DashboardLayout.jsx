import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice.js';
import { FiHome, FiBox, FiList, FiMessageSquare, FiSettings, FiLogOut } from 'react-icons/fi';
import Logo from '../../components/common/Logo.jsx';

const DashboardLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <FiHome /> },
    { name: 'Products', path: '/admin/products', icon: <FiBox /> },
    { name: 'Categories', path: '/admin/categories', icon: <FiList /> },
    { name: 'Inquiries', path: '/admin/messages', icon: <FiMessageSquare /> },
    { name: 'Settings', path: '/admin/settings', icon: <FiSettings /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-secondary text-white flex flex-col">
        <div className="p-5 border-b border-gray-800">
          <Link to="/">
            <Logo variant="horizontal" dark={true} />
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                location.pathname === item.path ? 'bg-primary text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-danger hover:bg-gray-800 transition-colors"
          >
            <FiLogOut />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">
            {navItems.find(item => item.path === location.pathname)?.name || 'Admin Panel'}
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600 font-medium">Welcome, Admin</span>
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
              A
            </div>
          </div>
        </header>
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
