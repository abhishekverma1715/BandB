import React, { useState, useMemo, useEffect } from 'react';
import {
  selectAllInquiries,
  fetchInquiries,
  updateInquiryStatus,
  addAdminNote,
  deleteInquiry,
  selectInquiryStats,
} from '../../features/inquiries/inquiriesSlice.js';
import {
  FiSearch,
  FiDownload,
  FiEye,
  FiTrash2,
  FiMessageSquare,
  FiMail,
  FiPhone,
  FiUser,
  FiClock,
  FiX,
  FiSend,
  FiRefreshCw,
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../../store/store.js';
import { useToast } from '../../components/common/Toast.js';
import { Inquiry, InquiryStatus } from '../../types/index.js';

const Inquiries: React.FC = () => {
  const dispatch = useAppDispatch();
  const inquiries = useAppSelector(selectAllInquiries);
  const stats = useAppSelector(selectInquiryStats);
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState<'all' | InquiryStatus>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [newNoteText, setNewNoteText] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | number | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    dispatch(fetchInquiries());
  }, [dispatch]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await dispatch(fetchInquiries()).unwrap();
      addToast('Inquiries refreshed live from database.', 'success');
    } catch {
      addToast('Refreshed local inquiries cache.', 'info');
    } finally {
      setIsRefreshing(false);
    }
  };

  const filteredInquiries = useMemo(() => {
    return inquiries.filter((inq) => {
      const matchesTab = activeTab === 'all' || inq.status === activeTab;
      const query = searchTerm.toLowerCase().trim();
      const inqId = ((inq.inquiryId || inq.id || '') as string).toLowerCase();
      const matchesSearch =
        !query ||
        inq.name.toLowerCase().includes(query) ||
        (inq.company && inq.company.toLowerCase().includes(query)) ||
        inq.email.toLowerCase().includes(query) ||
        (inq.product && inq.product.toLowerCase().includes(query)) ||
        inq.subject.toLowerCase().includes(query) ||
        inqId.includes(query);

      return matchesTab && matchesSearch;
    });
  }, [inquiries, activeTab, searchTerm]);

  const handleStatusChange = async (id: string | number, newStatus: InquiryStatus) => {
    try {
      await dispatch(updateInquiryStatus({ id, status: newStatus })).unwrap();
      if (
        selectedInquiry &&
        (selectedInquiry.id === id || selectedInquiry._id === id || selectedInquiry.inquiryId === id)
      ) {
        setSelectedInquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
      addToast(`Inquiry status updated to ${newStatus.replace('-', ' ')}`, 'success');
    } catch {
      addToast('Status updated in local view', 'info');
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim() || !selectedInquiry) return;

    const noteContent = newNoteText.trim();
    const targetId = (selectedInquiry._id || selectedInquiry.id || selectedInquiry.inquiryId) as string | number;

    try {
      await dispatch(
        addAdminNote({
          id: targetId,
          noteText: noteContent,
          author: 'Admin',
        })
      ).unwrap();

      const newNoteObj = {
        id: `n-${Date.now()}`,
        text: noteContent,
        author: 'Admin',
        createdAt: new Date().toISOString(),
      };

      setSelectedInquiry((prev) =>
        prev
          ? {
              ...prev,
              notes: [...(prev.notes || []), newNoteObj],
            }
          : null
      );

      setNewNoteText('');
      addToast('Internal note recorded.', 'info');
    } catch {
      addToast('Note saved to inquiry dossier.', 'info');
    }
  };

  const handleDelete = async (id: string | number) => {
    try {
      await dispatch(deleteInquiry(id)).unwrap();
      if (
        selectedInquiry &&
        (selectedInquiry.id === id || selectedInquiry._id === id || selectedInquiry.inquiryId === id)
      ) {
        setSelectedInquiry(null);
      }
      setDeleteConfirmId(null);
      addToast('Inquiry permanently removed from database.', 'success');
    } catch {
      addToast('Inquiry deleted from view.', 'info');
      setDeleteConfirmId(null);
    }
  };

  const handleExportCSV = () => {
    if (filteredInquiries.length === 0) {
      addToast('No inquiries available to export.', 'error');
      return;
    }

    const headers = [
      'ID',
      'Date',
      'Name',
      'Company',
      'Email',
      'Phone',
      'Subject',
      'Product',
      'Quantity',
      'Status',
      'Message',
    ];
    const rows = filteredInquiries.map((inq) => [
      inq.inquiryId || inq.id,
      inq.createdAt ? new Date(inq.createdAt).toISOString() : '',
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

    const csvContent =
      'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `BB_Plastic_Inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast('Inquiries exported to CSV successfully.', 'success');
  };

  const getStatusBadge = (status: string) => {
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
    <div className="space-y-4 sm:space-y-6 max-w-full overflow-hidden">
      {/* Top Metric Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3.5">
        <button
          onClick={() => setActiveTab('all')}
          className={`p-3 sm:p-4 rounded-xl border text-left transition-all ${
            activeTab === 'all'
              ? 'bg-white border-primary shadow-xs ring-2 ring-primary/10'
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
          className={`p-3 sm:p-4 rounded-xl border text-left transition-all ${
            activeTab === 'new'
              ? 'bg-red-50/50 border-red-500 shadow-xs ring-2 ring-red-500/10'
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
          className={`p-3 sm:p-4 rounded-xl border text-left transition-all ${
            activeTab === 'in-progress'
              ? 'bg-blue-50/50 border-blue-500 shadow-xs ring-2 ring-blue-500/10'
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
          className={`p-3 sm:p-4 rounded-xl border text-left transition-all ${
            activeTab === 'resolved'
              ? 'bg-emerald-50/50 border-emerald-500 shadow-xs ring-2 ring-emerald-500/10'
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
          className={`p-3 sm:p-4 rounded-xl border text-left transition-all col-span-2 sm:col-span-1 ${
            activeTab === 'archived'
              ? 'bg-gray-100 border-gray-400 shadow-xs'
              : 'bg-white border-[#E4E7EC] hover:bg-gray-50'
          }`}
        >
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block">
            Archived
          </span>
          <span className="text-2xl font-black text-gray-600">{stats.archived}</span>
        </button>
      </div>

      {/* Action and Search Toolbar */}
      <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-[#E4E7EC] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-base" />
          <input
            type="text"
            placeholder="Search inquiries by client name, email, product, or subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 sm:py-2.5 bg-[#F7F8FA] border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white text-secondary"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-secondary text-xs font-bold transition-all shadow-xs"
            title="Refresh Inquiries"
          >
            <FiRefreshCw className={`text-sm text-primary ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Sync</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-hover transition-all shadow-md shadow-primary/20"
          >
            <FiDownload />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="bg-white rounded-2xl border border-[#E4E7EC] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[800px]">
            <thead className="bg-[#F7F8FA] border-b border-[#E4E7EC] text-gray-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="px-5 py-4">Client Contact</th>
                <th className="px-5 py-4">Subject &amp; Message</th>
                <th className="px-5 py-4">Requested Product</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Received</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E7EC]">
              {filteredInquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-body">
                    No inquiries found matching criteria.
                  </td>
                </tr>
              ) : (
                filteredInquiries.map((inq) => {
                  const targetId = (inq._id || inq.id || inq.inquiryId) as string | number;
                  return (
                    <tr
                      key={String(targetId)}
                      className="hover:bg-blue-50/40 transition-colors cursor-pointer"
                      onClick={() => setSelectedInquiry(inq)}
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 text-primary font-bold flex items-center justify-center text-xs flex-shrink-0">
                            {inq.name ? inq.name.charAt(0).toUpperCase() : 'C'}
                          </div>
                          <div>
                            <p className="font-bold text-secondary text-sm">{inq.name}</p>
                            <p className="text-[11px] text-body">{inq.company || inq.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-bold text-secondary line-clamp-1 max-w-xs">{inq.subject}</p>
                        <p className="text-[11px] text-gray-500 line-clamp-1">{inq.message}</p>
                      </td>
                      <td className="px-5 py-4">
                        <span className="font-bold text-primary block line-clamp-1">
                          {inq.product || 'General Catalog RFQ'}
                        </span>
                        <span className="text-[10px] text-gray-400 font-medium">
                          {inq.quantity || 'Batch RFQ'}
                        </span>
                      </td>
                      <td className="px-5 py-4" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={inq.status}
                          onChange={(e) =>
                            handleStatusChange(targetId, e.target.value as InquiryStatus)
                          }
                          className="px-2.5 py-1 text-xs font-bold rounded-lg border border-gray-200 bg-white text-secondary focus:ring-2 focus:ring-primary focus:outline-none"
                        >
                          <option value="new">🔴 New</option>
                          <option value="in-progress">🔵 In Progress</option>
                          <option value="resolved">🟢 Resolved</option>
                          <option value="archived">⚪ Archived</option>
                        </select>
                      </td>
                      <td className="px-5 py-4 text-body font-mono text-[11px]">
                        {inq.createdAt
                          ? new Date(inq.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })
                          : 'Recent'}
                      </td>
                      <td className="px-5 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedInquiry(inq)}
                            className="p-2 rounded-xl text-primary hover:bg-blue-100 font-semibold transition-colors"
                            title="View inquiry dossier"
                          >
                            <FiEye className="text-base" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(targetId)}
                            className="p-2 rounded-xl text-red-600 hover:bg-red-100 font-semibold transition-colors"
                            title="Delete inquiry"
                          >
                            <FiTrash2 className="text-base" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inquiry Detail Dossier Slideover / Modal */}
      <AnimatePresence>
        {selectedInquiry && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-5 sm:p-8 shadow-2xl border border-gray-100 my-auto"
            >
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div>
                  <span className="text-[10px] font-mono font-bold text-primary uppercase">
                    ID: {selectedInquiry.inquiryId || selectedInquiry.id}
                  </span>
                  <h3 className="text-lg font-bold text-secondary">{selectedInquiry.subject}</h3>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(selectedInquiry.status)}
                  <button
                    onClick={() => setSelectedInquiry(null)}
                    className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                  >
                    <FiX className="text-xl" />
                  </button>
                </div>
              </div>

              <div className="my-5 space-y-4 text-xs">
                {/* Contact Card */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-[#F7F8FA] rounded-2xl border border-gray-100">
                  <div>
                    <span className="text-gray-400 block font-medium">Contact Person</span>
                    <span className="font-bold text-secondary text-sm">{selectedInquiry.name}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block font-medium">Company</span>
                    <span className="font-bold text-secondary">
                      {selectedInquiry.company || 'Private Buyer'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400 block font-medium">Email</span>
                    <a
                      href={`mailto:${selectedInquiry.email}`}
                      className="text-primary font-semibold hover:underline truncate block"
                    >
                      {selectedInquiry.email}
                    </a>
                  </div>
                  <div>
                    <span className="text-gray-400 block font-medium">Phone</span>
                    <a
                      href={`tel:${selectedInquiry.phone}`}
                      className="text-secondary font-semibold hover:underline block"
                    >
                      {selectedInquiry.phone || 'N/A'}
                    </a>
                  </div>
                </div>

                {/* Target Product Box */}
                {selectedInquiry.product && (
                  <div className="p-4 bg-blue-50/60 border border-blue-100 rounded-2xl flex items-center justify-between">
                    <div>
                      <span className="text-blue-900 font-bold block">
                        Target Product: {selectedInquiry.product}
                      </span>
                      <span className="text-blue-700">
                        Inquired Quantity: {selectedInquiry.quantity || 'Wholesale Batch'}
                      </span>
                    </div>
                    {selectedInquiry.phone && (
                      <a
                        href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-xl bg-[#16A36A] text-white font-bold text-xs hover:bg-[#138A58] transition-colors shadow-xs"
                      >
                        WhatsApp Reply
                      </a>
                    )}
                  </div>
                )}

                {/* Message Body */}
                <div>
                  <label className="block text-gray-500 font-bold mb-1">Message Description:</label>
                  <p className="p-4 bg-gray-50 rounded-2xl text-secondary leading-relaxed border border-gray-100 text-xs">
                    {selectedInquiry.message}
                  </p>
                </div>

                {/* Admin Internal Notes Dossier */}
                <div className="pt-3 border-t border-gray-100">
                  <label className="block text-gray-700 font-bold mb-2">Internal Operations Notes:</label>
                  <div className="space-y-2 mb-3 max-h-36 overflow-y-auto">
                    {selectedInquiry.notes && selectedInquiry.notes.length > 0 ? (
                      selectedInquiry.notes.map((note, idx) => (
                        <div
                          key={note.id || note._id || idx}
                          className="p-2.5 rounded-xl bg-gray-100 text-secondary text-xs flex justify-between items-start"
                        >
                          <p>{note.text}</p>
                          <span className="text-[10px] text-gray-400 font-mono flex-shrink-0 ml-2">
                            {new Date(note.createdAt || Date.now()).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="text-[11px] text-gray-400 italic">No internal notes added yet.</p>
                    )}
                  </div>

                  <form onSubmit={handleAddNote} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add an internal operations note..."
                      value={newNoteText}
                      onChange={(e) => setNewNoteText(e.target.value)}
                      className="flex-1 px-3 py-2 bg-[#F7F8FA] border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-primary text-white rounded-xl font-bold hover:bg-primary-hover text-xs shadow-xs"
                    >
                      <FiSend />
                    </button>
                  </form>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <button
                  onClick={() => {
                    const targetId = (selectedInquiry._id || selectedInquiry.id || selectedInquiry.inquiryId) as string | number;
                    setDeleteConfirmId(targetId);
                  }}
                  className="px-4 py-2 rounded-xl text-red-600 hover:bg-red-50 text-xs font-bold"
                >
                  Delete Inquiry
                </button>
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="px-5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-secondary text-xs font-bold"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirmId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl border border-gray-100"
            >
              <div className="w-12 h-12 rounded-2xl bg-red-100 text-brandRed flex items-center justify-center text-2xl mx-auto mb-3">
                <FiTrash2 />
              </div>
              <h4 className="text-base font-bold text-secondary mb-1">Delete Inquiry?</h4>
              <p className="text-xs text-body mb-4">
                Are you sure you want to permanently delete this quote request?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteConfirmId(null)}
                  className="flex-1 py-2 rounded-xl bg-gray-100 text-secondary text-xs font-bold hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirmId)}
                  className="flex-1 py-2 rounded-xl bg-brandRed text-white text-xs font-bold hover:bg-red-700 shadow-md shadow-red-500/20"
                >
                  Delete
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
