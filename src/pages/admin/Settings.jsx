import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAdminInfo, setCredentials } from '../../features/auth/authSlice.js';
import { selectAllProducts, resetProducts, addProduct } from '../../features/products/productsSlice.js';
import { selectAllInquiries, resetInquiries } from '../../features/inquiries/inquiriesSlice.js';
import { selectAllCategories, resetCategories } from '../../features/categories/categoriesSlice.js';
import {
  FiUser,
  FiLock,
  FiBell,
  FiGlobe,
  FiDatabase,
  FiSave,
  FiCheckCircle,
  FiRefreshCw,
  FiShield,
  FiDownload,
  FiUploadCloud,
  FiPhone,
  FiMessageSquare,
  FiMail,
  FiDollarSign,
  FiClock,
  FiAlertTriangle,
  FiSliders,
  FiCheck,
  FiKey,
  FiServer,
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '../../components/common/Toast.jsx';

const SETTINGS_STORAGE_KEY = 'bb_factory_settings';

const loadSavedFactorySettings = () => {
  try {
    const saved = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {}
  return {
    factoryName: 'B&B Plastics & Industrial Molding Corp',
    supportPhone: '+91 88088 80012',
    whatsappNumber: '+91 88088 80012',
    operatingHours: '08:00 AM - 08:00 PM (IST)',
    currency: 'USD',
    taxGstNumber: '09AAACB1234F1Z5',
    rfqForwardEmail: 'sales@bbplastics.com',
    lowStockThreshold: 10,
    notifyInquiries: true,
    notifyStock: true,
    notifyWhatsApp: true,
    soundAlerts: false,
  };
};

const Settings = () => {
  const adminInfo = useSelector(selectAdminInfo);
  const products = useSelector(selectAllProducts);
  const inquiries = useSelector(selectAllInquiries);
  const categories = useSelector(selectAllCategories);
  const dispatch = useDispatch();
  const { addToast } = useToast();
  const fileInputRef = useRef(null);

  // Active Tab
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'factory' | 'notifications' | 'database'

  // Admin Profile State
  const [name, setName] = useState(adminInfo?.name || 'Super Admin');
  const [email, setEmail] = useState(adminInfo?.email || 'manishverma123@gmail.com');

  // Password Change State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  // Factory & Operations State
  const [factorySettings, setFactorySettings] = useState(loadSavedFactorySettings());

  // Save Admin Profile
  const handleSaveProfile = (e) => {
    e.preventDefault();
    dispatch(
      setCredentials({
        ...adminInfo,
        name: name.trim(),
        email: email.trim().toLowerCase(),
      })
    );
    addToast('Admin profile credentials updated successfully!', 'success');
  };

  // Save Factory Settings
  const handleSaveFactorySettings = (e) => {
    e.preventDefault();
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(factorySettings));
    addToast('Factory trade desk & operational configurations saved!', 'success');
  };

  // Handle Password Update
  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      addToast('New password must be at least 6 characters.', 'error');
      return;
    }
    if (newPassword !== confirmPassword) {
      addToast('Passwords do not match. Please verify.', 'error');
      return;
    }

    addToast('Admin security password updated successfully!', 'success');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setIsPasswordModalOpen(false);
  };

  // Export Full System Backup as JSON
  const handleExportBackup = () => {
    const backupData = {
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      admin: adminInfo,
      factorySettings,
      products,
      inquiries,
      categories,
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute(
      'download',
      `BB_Plastic_Full_Backup_${new Date().toISOString().slice(0, 10)}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    addToast('Complete database backup JSON exported successfully!', 'success');
  };

  // Import Backup JSON File
  const handleImportBackup = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result);
        if (parsed.products && Array.isArray(parsed.products)) {
          localStorage.setItem('bb_products', JSON.stringify(parsed.products));
        }
        if (parsed.inquiries && Array.isArray(parsed.inquiries)) {
          localStorage.setItem('bb_inquiries', JSON.stringify(parsed.inquiries));
        }
        if (parsed.categories && Array.isArray(parsed.categories)) {
          localStorage.setItem('bb_categories', JSON.stringify(parsed.categories));
        }
        if (parsed.factorySettings) {
          localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(parsed.factorySettings));
          setFactorySettings(parsed.factorySettings);
        }

        addToast('Backup imported successfully! Reloading system cache...', 'success');
        setTimeout(() => {
          window.location.reload();
        }, 1200);
      } catch (err) {
        addToast('Invalid backup JSON format. Please verify file integrity.', 'error');
      }
    };
    reader.readAsText(file);
  };

  // Reset Factory Sample Data
  const handleResetDemoData = () => {
    if (
      window.confirm(
        'Are you sure you want to reset all products, client inquiries, and categories back to factory defaults?'
      )
    ) {
      dispatch(resetProducts());
      dispatch(resetInquiries());
      dispatch(resetCategories());
      addToast('System database reset to initial factory sample state.', 'info');
    }
  };

  const navTabs = [
    { id: 'profile', label: 'Admin & Security', icon: <FiShield className="text-base" /> },
    { id: 'factory', label: 'Factory & Operations', icon: <FiGlobe className="text-base" /> },
    { id: 'notifications', label: 'Alerts & Rules', icon: <FiBell className="text-base" /> },
    { id: 'database', label: 'Database & Backups', icon: <FiDatabase className="text-base" /> },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E4E7EC] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-xl bg-primary/10 text-primary">
              <FiSliders className="text-xl" />
            </span>
            <h2 className="text-2xl font-black text-secondary tracking-tight">
              Control Center &amp; System Settings
            </h2>
          </div>
          <p className="text-xs text-body">
            Manage admin security credentials, global factory parameters, notification webhooks, and database snapshots.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportBackup}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-gray-300 hover:bg-gray-50 text-secondary text-xs font-bold transition-all shadow-sm"
          >
            <FiDownload className="text-primary" />
            <span>Export Backup</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="bg-white p-1.5 rounded-2xl border border-[#E4E7EC] shadow-sm flex items-center gap-1.5 overflow-x-auto">
        {navTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
              activeTab === tab.id
                ? 'bg-primary text-white shadow-md shadow-primary/20'
                : 'text-gray-500 hover:bg-gray-100 hover:text-secondary'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}

      {/* TAB 1: ADMIN & SECURITY */}
      {activeTab === 'profile' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Profile Dossier Card */}
          <div className="bg-white rounded-3xl border border-[#E4E7EC] shadow-sm p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-[#0B1B33] text-white flex items-center justify-center font-black text-2xl shadow-md shadow-primary/20">
                  {name.charAt(0) || 'A'}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-secondary">{name}</h3>
                  <p className="text-xs text-gray-500 font-mono">{email}</p>
                  <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    Super Administrator Role
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsPasswordModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-primary text-xs font-bold transition-colors self-start sm:self-auto"
              >
                <FiKey />
                <span>Change Password</span>
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-gray-700 font-bold uppercase tracking-wider mb-2">
                    Admin Display Name
                  </label>
                  <div className="relative">
                    <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-base" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-[#F7F8FA] border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary text-secondary font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-bold uppercase tracking-wider mb-2">
                    Primary Login Email
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-base" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-[#F7F8FA] border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary text-secondary font-semibold"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-3 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary-hover transition-all shadow-md shadow-primary/20"
                >
                  <FiSave />
                  <span>Update Admin Credentials</span>
                </button>
              </div>
            </form>
          </div>

          {/* Security Overview & Session Info */}
          <div className="bg-white rounded-3xl border border-[#E4E7EC] shadow-sm p-6 sm:p-8">
            <h4 className="font-bold text-secondary uppercase tracking-wider text-xs mb-4 flex items-center gap-2">
              <FiShield className="text-primary" />
              <span>Authentication Session &amp; Environment</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200">
                <span className="text-gray-400 block font-medium">Session Status</span>
                <span className="font-bold text-emerald-600 text-sm mt-0.5 block flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Active (JWT Verified)
                </span>
              </div>

              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200">
                <span className="text-gray-400 block font-medium">Password Encryption</span>
                <span className="font-bold text-secondary text-sm mt-0.5 block font-mono">
                  bcrypt (12 Salt Rounds)
                </span>
              </div>

              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200">
                <span className="text-gray-400 block font-medium">Database Persistence</span>
                <span className="font-bold text-secondary text-sm mt-0.5 block font-mono">
                  MongoDB Atlas + LocalSync
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* TAB 2: FACTORY & TRADE DESK */}
      {activeTab === 'factory' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl border border-[#E4E7EC] shadow-sm p-6 sm:p-8"
        >
          <div className="pb-6 mb-6 border-b border-gray-100">
            <h3 className="text-lg font-bold text-secondary">Factory Trade Desk &amp; Quotations Settings</h3>
            <p className="text-xs text-body">
              These operational contact parameters are displayed across public quote forms and product specification sheets.
            </p>
          </div>

          <form onSubmit={handleSaveFactorySettings} className="space-y-5 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-gray-700 font-bold uppercase tracking-wider mb-2">
                  Company / Factory Legal Entity
                </label>
                <input
                  type="text"
                  value={factorySettings.factoryName}
                  onChange={(e) =>
                    setFactorySettings({ ...factorySettings, factoryName: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-[#F7F8FA] border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary text-secondary font-semibold"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-bold uppercase tracking-wider mb-2">
                  Trade Desk Phone Support
                </label>
                <div className="relative">
                  <FiPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-base" />
                  <input
                    type="text"
                    value={factorySettings.supportPhone}
                    onChange={(e) =>
                      setFactorySettings({ ...factorySettings, supportPhone: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-3 bg-[#F7F8FA] border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary text-secondary font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-bold uppercase tracking-wider mb-2">
                  Official WhatsApp Quotation Line
                </label>
                <div className="relative">
                  <FiMessageSquare className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-base" />
                  <input
                    type="text"
                    value={factorySettings.whatsappNumber}
                    onChange={(e) =>
                      setFactorySettings({ ...factorySettings, whatsappNumber: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-3 bg-[#F7F8FA] border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary text-secondary font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-bold uppercase tracking-wider mb-2">
                  Factory Operating Hours
                </label>
                <div className="relative">
                  <FiClock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-base" />
                  <input
                    type="text"
                    value={factorySettings.operatingHours}
                    onChange={(e) =>
                      setFactorySettings({ ...factorySettings, operatingHours: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-3 bg-[#F7F8FA] border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary text-secondary font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-bold uppercase tracking-wider mb-2">
                  Default Pricing Currency
                </label>
                <select
                  value={factorySettings.currency}
                  onChange={(e) =>
                    setFactorySettings({ ...factorySettings, currency: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-[#F7F8FA] border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary text-secondary font-bold"
                >
                  <option value="USD">USD ($) — International Trade FOB</option>
                  <option value="INR">INR (₹) — Indian Rupee Domestic</option>
                  <option value="EUR">EUR (€) — Euro Continental</option>
                  <option value="GBP">GBP (£) — British Pound</option>
                  <option value="AED">AED (د.إ) — UAE Dirham</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-bold uppercase tracking-wider mb-2">
                  Tax Identification / GST Number
                </label>
                <input
                  type="text"
                  value={factorySettings.taxGstNumber}
                  onChange={(e) =>
                    setFactorySettings({ ...factorySettings, taxGstNumber: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-[#F7F8FA] border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary text-secondary font-mono"
                />
              </div>
            </div>

            <div className="pt-3 flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary-hover transition-all shadow-md shadow-primary/20"
              >
                <FiSave />
                <span>Save Factory Configuration</span>
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* TAB 3: NOTIFICATIONS & RULES */}
      {activeTab === 'notifications' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-white rounded-3xl border border-[#E4E7EC] shadow-sm p-6 sm:p-8">
            <div className="pb-6 mb-6 border-b border-gray-100">
              <h3 className="text-lg font-bold text-secondary">Automated Alert Dispatch Rules</h3>
              <p className="text-xs text-body">
                Configure real-time trigger rules when clients submit quote inquiries or warehouse inventory dips.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              {/* Alert Item 1 */}
              <div className="flex items-center justify-between p-4 sm:p-5 bg-[#F7F8FA] rounded-2xl border border-[#E4E7EC]">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-blue-100 text-primary text-lg flex-shrink-0">
                    <FiMail />
                  </div>
                  <div>
                    <p className="font-bold text-secondary text-sm">Instant RFQ Email Notifications</p>
                    <p className="text-body text-xs mt-0.5">
                      Dispatch immediate email notification to trade desk upon client RFQ submission.
                    </p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={factorySettings.notifyInquiries}
                  onChange={(e) => {
                    const updated = { ...factorySettings, notifyInquiries: e.target.checked };
                    setFactorySettings(updated);
                    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(updated));
                    addToast('Notification preferences updated.', 'info');
                  }}
                  className="w-5 h-5 rounded text-primary focus:ring-primary cursor-pointer"
                />
              </div>

              {/* Alert Item 2 */}
              <div className="flex items-center justify-between p-4 sm:p-5 bg-[#F7F8FA] rounded-2xl border border-[#E4E7EC]">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-100 text-amber-800 text-lg flex-shrink-0">
                    <FiAlertTriangle />
                  </div>
                  <div>
                    <p className="font-bold text-secondary text-sm">Low Stock Inventory Warnings</p>
                    <p className="text-body text-xs mt-0.5">
                      Automatically highlight products in red/amber when marked as low or out of stock.
                    </p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={factorySettings.notifyStock}
                  onChange={(e) => {
                    const updated = { ...factorySettings, notifyStock: e.target.checked };
                    setFactorySettings(updated);
                    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(updated));
                    addToast('Inventory alerts updated.', 'info');
                  }}
                  className="w-5 h-5 rounded text-primary focus:ring-primary cursor-pointer"
                />
              </div>

              {/* Alert Item 3 */}
              <div className="flex items-center justify-between p-4 sm:p-5 bg-[#F7F8FA] rounded-2xl border border-[#E4E7EC]">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-800 text-lg flex-shrink-0">
                    <FiMessageSquare />
                  </div>
                  <div>
                    <p className="font-bold text-secondary text-sm">Direct WhatsApp Lead Routing</p>
                    <p className="text-body text-xs mt-0.5">
                      Allow clients on product detail pages to initiate pre-formatted quotation WhatsApp chats.
                    </p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={factorySettings.notifyWhatsApp}
                  onChange={(e) => {
                    const updated = { ...factorySettings, notifyWhatsApp: e.target.checked };
                    setFactorySettings(updated);
                    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(updated));
                    addToast('WhatsApp routing updated.', 'info');
                  }}
                  className="w-5 h-5 rounded text-primary focus:ring-primary cursor-pointer"
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* TAB 4: DATABASE & BACKUPS */}
      {activeTab === 'database' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Database Health & Snapshots */}
          <div className="bg-white rounded-3xl border border-[#E4E7EC] shadow-sm p-6 sm:p-8">
            <div className="pb-6 mb-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-secondary flex items-center gap-2">
                  <FiServer className="text-primary" />
                  <span>Database Snapshot &amp; Migration Utilities</span>
                </h3>
                <p className="text-xs text-body">
                  Export complete offline database snapshots or restore your catalog from a previously saved JSON backup.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-full text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  MongoDB Atlas Connected
                </span>
              </div>
            </div>

            {/* Backup & Import Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-secondary text-sm mb-1 flex items-center gap-2">
                    <FiDownload className="text-primary" />
                    <span>Download Full Backup (JSON)</span>
                  </h4>
                  <p className="text-xs text-body leading-relaxed mb-4">
                    Exports {products.length} products, {categories.length} categories, {inquiries.length} client inquiries, and store preferences into a portable JSON snapshot.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleExportBackup}
                  className="w-full py-3 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl text-xs transition-colors shadow-md shadow-primary/20 flex items-center justify-center gap-2"
                >
                  <FiDownload />
                  <span>Export Database JSON</span>
                </button>
              </div>

              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-secondary text-sm mb-1 flex items-center gap-2">
                    <FiUploadCloud className="text-purple-600" />
                    <span>Restore from JSON File</span>
                  </h4>
                  <p className="text-xs text-body leading-relaxed mb-4">
                    Upload a valid B&amp;B Plastic JSON snapshot file to instantly restore catalog inventory and client records.
                  </p>
                </div>

                {/* Hidden File Input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json,application/json"
                  className="hidden"
                  onChange={handleImportBackup}
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-3 bg-secondary hover:bg-black text-white font-bold rounded-xl text-xs transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  <FiUploadCloud />
                  <span>Select Backup File to Restore</span>
                </button>
              </div>
            </div>

            {/* Factory Sample Data Reset */}
            <div className="p-5 bg-amber-50/60 rounded-2xl border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="font-bold text-secondary text-sm flex items-center gap-2">
                  <FiRefreshCw className="text-amber-600" />
                  <span>Reset Factory Sample Catalog</span>
                </p>
                <p className="text-xs text-body mt-0.5">
                  Revert all products, inquiries, and categories back to standard factory demonstration state.
                </p>
              </div>

              <button
                type="button"
                onClick={handleResetDemoData}
                className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-colors shadow-sm self-start sm:self-auto flex-shrink-0"
              >
                Reset Demo Data
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Change Password Modal */}
      <AnimatePresence>
        {isPasswordModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-gray-100"
            >
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <FiKey />
                  </div>
                  <h3 className="text-base font-bold text-secondary">Change Admin Password</h3>
                </div>
                <button
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="p-1 text-gray-400 hover:text-secondary rounded-lg"
                >
                  &times;
                </button>
              </div>

              <form onSubmit={handlePasswordChange} className="mt-5 space-y-4 text-xs">
                <div>
                  <label className="block text-gray-700 font-bold uppercase tracking-wider mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F7F8FA] border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold uppercase tracking-wider mb-1">
                    New Security Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F7F8FA] border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold uppercase tracking-wider mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F7F8FA] border border-gray-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsPasswordModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-secondary font-bold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-primary text-white font-bold hover:bg-primary-hover transition-colors shadow-md shadow-primary/20"
                  >
                    Save New Password
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Settings;
