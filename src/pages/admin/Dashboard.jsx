import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectAllProducts, selectStockAlerts, toggleStockStatus } from '../../features/products/productsSlice.js';
import {
  selectAllInquiries,
  selectUnreadCount,
  selectRecentInquiries,
  updateInquiryStatus,
} from '../../features/inquiries/inquiriesSlice.js';
import { selectAllCategories } from '../../features/categories/categoriesSlice.js';
import { selectAdminInfo } from '../../features/auth/authSlice.js';
import {
  FiBox,
  FiMessageSquare,
  FiAlertTriangle,
  FiLayers,
  FiPlusCircle,
  FiArrowRight,
  FiClock,
  FiCheckCircle,
  FiEye,
  FiTrendingUp,
  FiActivity,
  FiDownload,
  FiExternalLink,
  FiPhoneCall,
  FiSend,
  FiX,
  FiShield,
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '../../components/common/Toast.jsx';

const Dashboard = () => {
  const adminInfo = useSelector(selectAdminInfo);
  const products = useSelector(selectAllProducts);
  const stockAlerts = useSelector(selectStockAlerts);
  const inquiries = useSelector(selectAllInquiries);
  const unreadInquiries = useSelector(selectUnreadCount);
  const recentInquiries = useSelector((state) => selectRecentInquiries(state, 5));
  const categories = useSelector(selectAllCategories);
  const dispatch = useDispatch();
  const { addToast } = useToast();

  const [selectedInquiry, setSelectedInquiry] = useState(null);

  const stats = [
    {
      title: 'Total Products',
      value: products.length,
      subtext: `${categories.length} active polymer lines`,
      icon: <FiBox className="text-2xl text-blue-600" />,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-100',
      accentColor: 'from-blue-600 to-indigo-600',
      link: '/admin/products',
    },
    {
      title: 'Total Inquiries',
      value: inquiries.length,
      subtext: `${unreadInquiries} pending review`,
      icon: <FiMessageSquare className="text-2xl text-purple-600" />,
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-100',
      accentColor: 'from-purple-600 to-pink-600',
      link: '/admin/messages',
    },
    {
      title: 'Stock Warning Alerts',
      value: stockAlerts.length,
      subtext: stockAlerts.length === 0 ? 'All items in full supply' : 'Depleted or low inventory',
      icon: <FiAlertTriangle className="text-2xl text-amber-600" />,
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-100',
      accentColor: 'from-amber-500 to-orange-500',
      link: '/admin/products',
    },
    {
      title: 'Active Categories',
      value: categories.length,
      subtext: 'Classifications active',
      icon: <FiLayers className="text-2xl text-emerald-600" />,
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-100',
      accentColor: 'from-emerald-500 to-teal-600',
      link: '/admin/categories',
    },
  ];

  const handleQuickStatusChange = (id, newStatus) => {
    dispatch(updateInquiryStatus({ id, status: newStatus }));
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry((prev) => ({ ...prev, status: newStatus }));
    }
    addToast(`Inquiry status updated to ${newStatus.replace('-', ' ')}`, 'success');
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'new':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-red-100 text-red-800 border border-red-200">
            🔴 New RFQ
          </span>
        );
      case 'in-progress':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
            🔵 In Progress
          </span>
        );
      case 'resolved':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
            🟢 Resolved
          </span>
        );
      case 'archived':
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-gray-100 text-gray-700 border border-gray-200">
            ⚪ Archived
          </span>
        );
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#0B1B33] via-[#102447] to-[#174A8B] rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-blue-200 text-xs font-bold uppercase tracking-wider mb-3 border border-white/15">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>MongoDB Atlas Connected &bull; Real-Time Sync</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Welcome Back, {adminInfo?.name || 'Super Admin'} 👋
            </h2>
            <p className="text-blue-100/80 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              B&amp;B Plastic Factory Command Center. You have{' '}
              <strong className="text-white font-bold">{unreadInquiries} unread client quote inquiries</strong>{' '}
              and <strong className="text-white font-bold">{stockAlerts.length} stock warning alerts</strong>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/admin/products"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white text-secondary font-bold text-xs sm:text-sm hover:bg-blue-50 transition-all shadow-md"
            >
              <FiPlusCircle className="text-primary text-base" />
              <span>Add Product</span>
            </Link>
            <Link
              to="/"
              target="_blank"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm transition-all border border-white/20"
            >
              <span>Live Website</span>
              <FiExternalLink className="text-xs" />
            </Link>
          </div>
        </div>

        {/* Ambient Decorative Shapes */}
        <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, idx) => (
          <Link
            key={idx}
            to={stat.link}
            className={`p-6 rounded-3xl bg-white border ${stat.borderColor} shadow-sm hover:shadow-md transition-all group relative overflow-hidden flex flex-col justify-between`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-body">
                  {stat.title}
                </span>
                <div className={`p-3 rounded-2xl ${stat.bgColor}`}>{stat.icon}</div>
              </div>
              <h3 className="text-3xl font-black text-secondary tracking-tight">
                {stat.value}
              </h3>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-body font-medium">
              <span>{stat.subtext}</span>
              <FiArrowRight className="text-gray-400 group-hover:translate-x-1 group-hover:text-primary transition-all" />
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions & Low Stock Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions Card */}
        <div className="bg-white p-6 rounded-3xl border border-[#E4E7EC] shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-secondary mb-1 flex items-center gap-2">
              <FiTrendingUp className="text-primary" />
              <span>Administrative Quick Actions</span>
            </h3>
            <p className="text-xs text-body mb-5">
              Direct factory management shortcuts for rapid updates.
            </p>

            <div className="space-y-3">
              <Link
                to="/admin/products"
                className="flex items-center justify-between p-3.5 rounded-2xl border border-gray-200 hover:border-primary hover:bg-blue-50/50 text-secondary hover:text-primary font-semibold text-xs transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-blue-100/60 text-primary">
                    <FiPlusCircle className="text-base" />
                  </div>
                  <span>Add New Product to Catalog</span>
                </div>
                <FiArrowRight className="text-gray-400 group-hover:translate-x-1 group-hover:text-primary transition-all" />
              </Link>

              <Link
                to="/admin/messages"
                className="flex items-center justify-between p-3.5 rounded-2xl border border-gray-200 hover:border-purple-600 hover:bg-purple-50/50 text-secondary hover:text-purple-700 font-semibold text-xs transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-purple-100/60 text-purple-600">
                    <FiMessageSquare className="text-base" />
                  </div>
                  <span>Review Unread Client RFQs ({unreadInquiries})</span>
                </div>
                <FiArrowRight className="text-gray-400 group-hover:translate-x-1 group-hover:text-purple-600 transition-all" />
              </Link>

              <Link
                to="/admin/categories"
                className="flex items-center justify-between p-3.5 rounded-2xl border border-gray-200 hover:border-emerald-600 hover:bg-emerald-50/50 text-secondary hover:text-emerald-700 font-semibold text-xs transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-emerald-100/60 text-emerald-600">
                    <FiLayers className="text-base" />
                  </div>
                  <span>Manage Polymer Categories ({categories.length})</span>
                </div>
                <FiArrowRight className="text-gray-400 group-hover:translate-x-1 group-hover:text-emerald-600 transition-all" />
              </Link>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100 text-[11px] text-gray-500 flex items-center justify-between">
            <span className="font-semibold text-emerald-700 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              Database Status: MongoDB Atlas Synchronized
            </span>
            <Link to="/admin/settings" className="text-primary hover:underline font-bold">
              Settings &rarr;
            </Link>
          </div>
        </div>

        {/* Low Stock Warning Box */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-[#E4E7EC] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-secondary flex items-center gap-2">
                  <FiAlertTriangle className="text-amber-500" />
                  <span>Inventory &amp; Stock Attention</span>
                </h3>
                <p className="text-xs text-body">
                  Products marked with low or depleted warehouse availability.
                </p>
              </div>
              <Link
                to="/admin/products"
                className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
              >
                <span>Manage Products</span>
                <FiArrowRight />
              </Link>
            </div>

            {stockAlerts.length === 0 ? (
              <div className="py-12 text-center rounded-2xl bg-gray-50 border border-dashed border-gray-200">
                <FiCheckCircle className="text-4xl text-emerald-500 mx-auto mb-2" />
                <p className="text-sm font-bold text-secondary">
                  All catalog products are fully in-stock.
                </p>
                <p className="text-xs text-body mt-0.5">
                  No immediate inventory replenishment warnings detected.
                </p>
              </div>
            ) : (
              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {stockAlerts.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3.5 rounded-2xl border border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image || '/hero-products/prod-1.png'}
                        alt={item.name}
                        className="w-12 h-12 object-contain rounded-xl bg-gray-100 p-1 border border-gray-200"
                      />
                      <div>
                        <p className="text-xs font-bold text-secondary line-clamp-1">{item.name}</p>
                        <p className="text-[11px] text-body">{item.category}</p>
                        <span className="text-[10px] text-gray-400 font-mono">{item.price}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`text-[11px] font-bold px-3 py-1 rounded-full uppercase ${
                          item.stock === 'out-of-stock'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}
                      >
                        {item.stock.replace('-', ' ')}
                      </span>
                      <Link
                        to="/admin/products"
                        className="text-xs font-bold text-primary hover:underline px-2 py-1"
                      >
                        Update Stock
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
            <span>Minimum factory safety threshold: 10 units</span>
            <Link to="/admin/products" className="text-primary font-bold hover:underline">
              View Catalog &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Inquiries Table */}
      <div className="bg-white rounded-3xl border border-[#E4E7EC] shadow-sm overflow-hidden">
        <div className="p-6 border-b border-[#E4E7EC] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-black text-secondary tracking-tight">
              Recent Client Inquiries &amp; RFQs
            </h3>
            <p className="text-xs text-body">
              Latest quote inquiries received from the public showroom.
            </p>
          </div>
          <Link
            to="/admin/messages"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover transition-colors shadow-sm self-start sm:self-auto"
          >
            <span>View All Inquiries ({inquiries.length})</span>
            <FiArrowRight />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7F8FA] border-b border-[#E4E7EC] text-gray-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Client &amp; Company</th>
                <th className="px-6 py-4">Inquiry Subject</th>
                <th className="px-6 py-4">Target Product</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Received</th>
                <th className="px-6 py-4 text-right">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E7EC]">
              {recentInquiries.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-12 text-body">
                    No client inquiries recorded yet.
                  </td>
                </tr>
              ) : (
                recentInquiries.map((inq) => (
                  <tr
                    key={inq.id}
                    className="hover:bg-blue-50/40 transition-colors cursor-pointer group"
                    onClick={() => setSelectedInquiry(inq)}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-primary font-bold flex items-center justify-center text-xs flex-shrink-0">
                          {inq.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-secondary text-sm">{inq.name}</p>
                          <p className="text-[11px] text-body">{inq.company || inq.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-secondary line-clamp-1 max-w-xs">
                        {inq.subject}
                      </p>
                      <p className="text-[11px] text-gray-500 line-clamp-1">{inq.message}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-primary block line-clamp-1">
                        {inq.product || 'General Catalog RFQ'}
                      </span>
                      <span className="text-[10px] text-gray-400 font-medium">
                        {inq.quantity || 'Batch RFQ'}
                      </span>
                    </td>
                    <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={inq.status}
                        onChange={(e) => handleQuickStatusChange(inq.id, e.target.value)}
                        className="px-2.5 py-1 text-xs font-bold rounded-lg border border-gray-200 bg-white text-secondary focus:ring-2 focus:ring-primary focus:outline-none"
                      >
                        <option value="new">🔴 New</option>
                        <option value="in-progress">🔵 In Progress</option>
                        <option value="resolved">🟢 Resolved</option>
                        <option value="archived">⚪ Archived</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-body font-mono text-[11px]">
                      {new Date(inq.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedInquiry(inq);
                        }}
                        className="p-2 rounded-xl text-primary hover:bg-blue-100 font-semibold transition-colors"
                        title="View details"
                      >
                        <FiEye className="text-base inline" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {selectedInquiry && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-100"
            >
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div>
                  <span className="text-[10px] font-mono font-bold text-primary uppercase">
                    {selectedInquiry.id}
                  </span>
                  <h4 className="text-lg font-bold text-secondary">
                    {selectedInquiry.subject}
                  </h4>
                </div>
                {getStatusBadge(selectedInquiry.status)}
              </div>

              <div className="mt-4 space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-2 p-3 bg-gray-50 rounded-2xl">
                  <div>
                    <span className="text-gray-400 block font-medium">Contact Person:</span>
                    <span className="font-bold text-secondary text-sm">{selectedInquiry.name}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block font-medium">Company:</span>
                    <span className="font-bold text-secondary">
                      {selectedInquiry.company || 'Private Buyer'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400 block font-medium">Email:</span>
                    <a
                      href={`mailto:${selectedInquiry.email}`}
                      className="text-primary font-semibold hover:underline"
                    >
                      {selectedInquiry.email}
                    </a>
                  </div>
                  <div>
                    <span className="text-gray-400 block font-medium">Phone:</span>
                    <span className="font-semibold text-secondary">
                      {selectedInquiry.phone || 'N/A'}
                    </span>
                  </div>
                </div>

                {selectedInquiry.product && (
                  <div className="p-3.5 bg-blue-50/60 border border-blue-100 rounded-2xl">
                    <span className="text-blue-900 font-bold block mb-1">
                      Product Inquired: {selectedInquiry.product}
                    </span>
                    <span className="text-blue-700">
                      Quantity: {selectedInquiry.quantity || 'Wholesale Batch'}
                    </span>
                  </div>
                )}

                <div>
                  <label className="block text-gray-500 font-bold mb-1">Client Message:</label>
                  <p className="p-3.5 bg-gray-50 rounded-2xl text-secondary leading-relaxed border border-gray-100 text-xs">
                    {selectedInquiry.message}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                <Link
                  to="/admin/messages"
                  className="text-xs font-bold text-primary hover:underline"
                >
                  Open Inquiries Center &rarr;
                </Link>
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="px-5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-secondary text-xs font-bold transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
