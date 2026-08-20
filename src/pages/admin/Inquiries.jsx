import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectAllInquiries,
  updateInquiryStatus,
  addAdminNote,
  archiveInquiry,
  deleteInquiry,
  selectInquiryStats,
} from '../../features/inquiries/inquiriesSlice.js';
import {
  FiSearch,
  FiFilter,
  FiDownload,
  FiEye,
  FiTrash2,
  FiArchive,
  FiCheckCircle,
  FiMessageSquare,
  FiMail,
  FiPhone,
  FiUser,
  FiClock,
  FiX,
  FiSend,
  FiPlus,
  FiRefreshCw,
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '../../components/common/Toast.jsx';

const Inquiries = () => {
  const dispatch = useDispatch();
  const inquiries = useSelector(selectAllInquiries);
  const stats = useSelector(selectInquiryStats);
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [newNoteText, setNewNoteText] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Filter inquiries by tab & search query
  const filteredInquiries = useMemo(() => {
    return inquiries.filter((inq) => {
      const matchesTab = activeTab === 'all' || inq.status === activeTab;
      const query = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !query ||
        inq.name.toLowerCase().includes(query) ||
        (inq.company && inq.company.toLowerCase().includes(query)) ||
        inq.email.toLowerCase().includes(query) ||
        (inq.product && inq.product.toLowerCase().includes(query)) ||
        inq.subject.toLowerCase().includes(query);

      return matchesTab && matchesSearch;
    });
  }, [inquiries, activeTab, searchTerm]);

  // Handle status update
  const handleStatusChange = (id, newStatus) => {
    dispatch(updateInquiryStatus({ id, status: newStatus }));
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry((prev) => ({ ...prev, status: newStatus }));
    }
    addToast(`Inquiry status updated to ${newStatus.replace('-', ' ')}`, 'success');
  };

  // Handle adding an internal admin note
  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNoteText.trim() || !selectedInquiry) return;

    dispatch(
      addAdminNote({
        id: selectedInquiry.id,
        noteText: newNoteText.trim(),
        author: 'Admin',
      })
    );

    const newNoteObj = {
      id: `n-${Date.now()}`,
      text: newNoteText.trim(),
      author: 'Admin',
      createdAt: new Date().toISOString(),
    };

    setSelectedInquiry((prev) => ({
      ...prev,
      notes: [...(prev.notes || []), newNoteObj],
    }));

    setNewNoteText('');
    addToast('Internal note recorded.', 'info');
  };

  // Handle deleting an inquiry
  const handleDelete = (id) => {
    dispatch(deleteInquiry(id));
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry(null);
    }
    setDeleteConfirmId(null);
    addToast('Inquiry permanently removed.', 'info');
  };

  // Handle Export to CSV
  const handleExportCSV = () => {
    if (filteredInquiries.length === 0) {
      addToast('No inquiries available to export.', 'error');
      return;
    }

    const headers = ['ID', 'Date', 'Name', 'Company', 'Email', 'Phone', 'Subject', 'Product', 'Quantity', 'Status', 'Message'];
    const rows = filteredInquiries.map((inq) => [
      inq.id,
      new Date(inq.createdAt).toISOString(),
      `"${(inq.name || '').replace(/"/g, '""')}"`,
      `"${(inq.company || '').replace(/"/g, '""')}"`,
      `"${(inq.email || '').replace(/"/g, '""')}"`,
      `"${(inq.phone || '').replace(/"/g, '""')}"`,
      `"${(inq.subject || '').replace(/"/g, '""')}"`,
      `"${(inq.product || '').replace(/"/g, '""')}"`,
      `"${(inq.quantity || '').replace(/"/g, '""')}"`,
      inq.status,
      `"${(inq.message || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `BB_Plastic_Inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast('Inquiries exported to CSV successfully.', 'success');
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'new':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800 border border-red-200">
            New RFQ
          </span>
        );
      case 'in-progress':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
            In Progress
          </span>
        );
      case 'resolved':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
            Resolved
          </span>
        );
      case 'archived':
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-700 border border-gray-200">
            Archived
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Metric Row */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
        <button
          onClick={() => setActiveTab('all')}
          className={`p-4 rounded-xl border text-left transition-all ${
            activeTab === 'all'
              ? 'bg-white border-primary shadow-sm ring-2 ring-primary/10'
              : 'bg-white border-[#E4E7EC] hover:bg-gray-50'
          }`}
        >
          <span className="text-[11px] font-bold uppercase tracking-wider text-body block">
            Total Inquiries
          </span>
          <span className="text-2xl font-black text-secondary">{stats.total}</span>
        </button>

        <button
          onClick={() => setActiveTab('new')}
          className={`p-4 rounded-xl border text-left transition-all ${
            activeTab === 'new'
              ? 'bg-red-50/50 border-red-500 shadow-sm ring-2 ring-red-500/10'
              : 'bg-white border-[#E4E7EC] hover:bg-gray-50'
          }`}
        >
          <span className="text-[11px] font-bold uppercase tracking-wider text-red-600 block">
            New / Unread
          </span>
          <span className="text-2xl font-black text-red-600">{stats.new}</span>
        </button>

        <button
          onClick={() => setActiveTab('in-progress')}
          className={`p-4 rounded-xl border text-left transition-all ${
            activeTab === 'in-progress'
              ? 'bg-blue-50/50 border-blue-500 shadow-sm ring-2 ring-blue-500/10'
              : 'bg-white border-[#E4E7EC] hover:bg-gray-50'
          }`}
        >
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 block">
            In Progress
          </span>
          <span className="text-2xl font-black text-blue-600">{stats.inProgress}</span>
        </button>

        <button
          onClick={() => setActiveTab('resolved')}
          className={`p-4 rounded-xl border text-left transition-all ${
            activeTab === 'resolved'
              ? 'bg-emerald-50/50 border-emerald-500 shadow-sm ring-2 ring-emerald-500/10'
              : 'bg-white border-[#E4E7EC] hover:bg-gray-50'
          }`}
        >
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 block">
            Resolved
          </span>
          <span className="text-2xl font-black text-emerald-600">{stats.resolved}</span>
        </button>

        <button
          onClick={() => setActiveTab('archived')}
          className={`p-4 rounded-xl border text-left transition-all ${
            activeTab === 'archived'
              ? 'bg-gray-100 border-gray-500 shadow-sm ring-2 ring-gray-500/10'
              : 'bg-white border-[#E4E7EC] hover:bg-gray-50'
          }`}
        >
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-600 block">
            Archived
          </span>
          <span className="text-2xl font-black text-gray-600">{stats.archived}</span>
        </button>
      </div>

      {/* Action & Filter Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E4E7EC] shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-base" />
          <input
            type="text"
            placeholder="Search by client, company, product, or subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#F7F8FA] border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all text-secondary"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-secondary text-xs"
            >
              Clear
            </button>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-gray-300 hover:bg-gray-50 text-secondary text-xs font-bold transition-all shadow-sm"
          >
            <FiDownload className="text-primary text-sm" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Main Inquiries Table */}
      <div className="bg-white rounded-2xl border border-[#E4E7EC] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7F8FA] border-b border-[#E4E7EC] text-gray-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Client Details</th>
                <th className="px-6 py-4">Subject &amp; Message</th>
                <th className="px-6 py-4">Product &amp; Qty</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Received</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E7EC]">
              {filteredInquiries.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-16 text-body">
                    <FiMessageSquare className="text-4xl mx-auto text-gray-300 mb-2" />
                    <p className="font-semibold text-secondary text-sm">No inquiries match the filter criteria</p>
                    <p className="text-xs text-body mt-1">Try selecting another tab or clearing search term.</p>
                  </td>
                </tr>
              ) : (
                filteredInquiries.map((inq) => (
                  <tr
                    key={inq.id}
                    onClick={() => setSelectedInquiry(inq)}
                    className="hover:bg-blue-50/40 transition-colors cursor-pointer group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-primary font-bold flex items-center justify-center text-xs flex-shrink-0">
                          {inq.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-secondary text-sm">{inq.name}</p>
                          <p className="text-gray-500 text-[11px] font-medium">{inq.company || inq.email}</p>
                          <p className="text-gray-400 text-[10px] font-mono">{inq.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 max-w-sm">
                      <p className="font-bold text-secondary line-clamp-1">{inq.subject}</p>
                      <p className="text-body line-clamp-2 text-[11px] mt-0.5">{inq.message}</p>
                    </td>
                    <td className="px-6 py-4">
                      {inq.product ? (
                        <div>
                          <span className="font-semibold text-primary block line-clamp-1">{inq.product}</span>
                          <span className="text-[11px] text-gray-500">{inq.quantity || 'Batch RFQ'}</span>
                        </div>
                      ) : (
                        <span className="text-gray-400 italic">General Contact</span>
                      )}
                    </td>
                    <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={inq.status}
                        onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                        className="px-2.5 py-1 text-xs font-semibold rounded-lg border border-gray-200 bg-white text-secondary focus:ring-2 focus:ring-primary focus:outline-none"
                      >
                        <option value="new">New</option>
                        <option value="in-progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                        <option value="archived">Archived</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-body font-mono text-[11px] whitespace-nowrap">
                      {new Date(inq.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedInquiry(inq)}
                          className="p-2 text-primary hover:bg-blue-100/60 rounded-lg transition-colors"
                          title="View Full Detail"
                        >
                          <FiEye className="text-base" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(inq.id)}
                          className="p-2 text-red-500 hover:bg-red-100/60 rounded-lg transition-colors"
                          title="Delete Inquiry"
                        >
                          <FiTrash2 className="text-base" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-over Detail Drawer */}
      <AnimatePresence>
        {selectedInquiry && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedInquiry(null)}
              className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            />

            <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="w-screen max-w-xl bg-white shadow-2xl flex flex-col"
              >
                {/* Header */}
                <div className="p-6 bg-[#0B1B33] text-white flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold bg-white/10 px-2 py-0.5 rounded text-blue-200">
                        {selectedInquiry.id}
                      </span>
                      {getStatusBadge(selectedInquiry.status)}
                    </div>
                    <h3 className="text-lg font-bold mt-2 text-white line-clamp-1">
                      {selectedInquiry.subject}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedInquiry(null)}
                    className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <FiX className="text-xl" />
                  </button>
                </div>

                {/* Content Body */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
                  {/* Status Switcher Toolbar */}
                  <div className="p-4 bg-[#F7F8FA] rounded-xl border border-[#E4E7EC] flex items-center justify-between">
                    <span className="font-bold text-secondary">Inquiry Workflow Status:</span>
                    <select
                      value={selectedInquiry.status}
                      onChange={(e) => handleStatusChange(selectedInquiry.id, e.target.value)}
                      className="px-3 py-1.5 font-bold rounded-lg border border-gray-300 bg-white text-secondary focus:ring-2 focus:ring-primary focus:outline-none"
                    >
                      <option value="new">🔴 Mark as New</option>
                      <option value="in-progress">🔵 Mark In Progress</option>
                      <option value="resolved">🟢 Mark Resolved</option>
                      <option value="archived">⚪ Move to Archive</option>
                    </select>
                  </div>

                  {/* Client Information Grid */}
                  <div>
                    <h4 className="font-bold text-secondary uppercase tracking-wider mb-3 text-[11px]">
                      Client Contact Dossier
                    </h4>
                    <div className="grid grid-cols-2 gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <div>
                        <span className="text-gray-400 block font-medium">Name:</span>
                        <span className="font-bold text-secondary text-sm">{selectedInquiry.name}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 block font-medium">Company:</span>
                        <span className="font-bold text-secondary">{selectedInquiry.company || 'Private Buyer'}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 block font-medium">Email:</span>
                        <a
                          href={`mailto:${selectedInquiry.email}`}
                          className="font-semibold text-primary hover:underline break-all"
                        >
                          {selectedInquiry.email}
                        </a>
                      </div>
                      <div>
                        <span className="text-gray-400 block font-medium">Phone Number:</span>
                        <span className="font-semibold text-secondary">{selectedInquiry.phone || 'N/A'}</span>
                      </div>
                      <div className="col-span-2 pt-2 border-t border-gray-200">
                        <span className="text-gray-400 block font-medium">Submission Timestamp:</span>
                        <span className="font-mono text-gray-600">
                          {new Date(selectedInquiry.createdAt).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Target Product Specs */}
                  {selectedInquiry.product && (
                    <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-100">
                      <h4 className="font-bold text-blue-900 uppercase tracking-wider mb-2 text-[11px]">
                        Target Product Requirement
                      </h4>
                      <p className="text-sm font-bold text-secondary">{selectedInquiry.product}</p>
                      <p className="text-blue-700 mt-1 font-semibold">
                        Requested Quantity: {selectedInquiry.quantity || 'Wholesale Ingestion'}
                      </p>
                    </div>
                  )}

                  {/* Full Message */}
                  <div>
                    <h4 className="font-bold text-secondary uppercase tracking-wider mb-2 text-[11px]">
                      Client Message &amp; RFQ Details
                    </h4>
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-secondary text-sm leading-relaxed whitespace-pre-wrap">
                      {selectedInquiry.message}
                    </div>
                  </div>

                  {/* Direct Reply Button */}
                  <div className="pt-2">
                    <a
                      href={`mailto:${selectedInquiry.email}?subject=${encodeURIComponent(
                        'Re: ' + selectedInquiry.subject + ' - B&B Plastics Factory Quotation'
                      )}&body=${encodeURIComponent(
                        `Dear ${selectedInquiry.name},\n\nThank you for reaching out to B&B Plastics regarding "${selectedInquiry.product || 'our manufacturing catalog'}".\n\nWe have reviewed your request and would be pleased to assist you.\n\nBest regards,\nB&B Plastics Trade Desk\nhttps://bbplastics.com`
                      )}`}
                      className="w-full py-3 px-4 rounded-xl bg-primary text-white font-bold hover:bg-primary-hover transition-colors flex items-center justify-center gap-2 shadow-md shadow-primary/20"
                    >
                      <FiSend />
                      <span>Launch Official Email Response</span>
                    </a>
                  </div>

                  {/* Internal Admin Notes Timeline */}
                  <div className="pt-4 border-t border-gray-100">
                    <h4 className="font-bold text-secondary uppercase tracking-wider mb-3 text-[11px]">
                      Internal Team Notes ({selectedInquiry.notes?.length || 0})
                    </h4>

                    <div className="space-y-2 mb-3 max-h-48 overflow-y-auto">
                      {(!selectedInquiry.notes || selectedInquiry.notes.length === 0) && (
                        <p className="text-gray-400 italic">No internal notes added yet.</p>
                      )}
                      {selectedInquiry.notes?.map((note) => (
                        <div
                          key={note.id}
                          className="p-3 bg-amber-50/50 rounded-xl border border-amber-200/60 text-secondary text-xs"
                        >
                          <p className="font-medium">{note.text}</p>
                          <div className="flex items-center justify-between mt-1 text-[10px] text-gray-500 font-mono">
                            <span>By {note.author || 'Admin'}</span>
                            <span>{new Date(note.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <form onSubmit={handleAddNote} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Add private note for team..."
                        value={newNoteText}
                        onChange={(e) => setNewNoteText(e.target.value)}
                        className="flex-1 px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2.5 bg-secondary text-white font-bold rounded-xl hover:bg-black transition-colors"
                      >
                        Add
                      </button>
                    </form>
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                  <button
                    onClick={() => setDeleteConfirmId(selectedInquiry.id)}
                    className="text-red-600 hover:text-red-800 font-bold flex items-center gap-1.5 p-2 rounded-lg hover:bg-red-50"
                  >
                    <FiTrash2 />
                    <span>Delete Record</span>
                  </button>

                  <button
                    onClick={() => setSelectedInquiry(null)}
                    className="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-secondary rounded-xl font-bold transition-colors"
                  >
                    Done
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirmId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-gray-100 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4 text-xl">
                <FiTrash2 />
              </div>
              <h3 className="text-base font-bold text-secondary mb-2">Delete Inquiry Record?</h3>
              <p className="text-xs text-body mb-6">
                Are you sure you want to permanently delete this client RFQ record? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteConfirmId(null)}
                  className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-secondary rounded-xl font-bold text-xs transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirmId)}
                  className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-xs transition-colors shadow-md shadow-red-600/20"
                >
                  Confirm Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Inquiries;
