import { createSlice } from '@reduxjs/toolkit';

const STORAGE_KEY = 'bb_inquiries';

const defaultInquiries = [
  {
    id: 'INQ-1001',
    name: 'Rajesh Sharma',
    company: 'Apex Chemical Logistics Ltd',
    email: 'r.sharma@apexchem.in',
    phone: '+91 98201 44521',
    subject: 'Bulk Quote for 50L Heavy-Duty Chemical Containers',
    product: 'Heavy-Duty Polymer Container 50L',
    quantity: '1,500 units',
    message:
      'We require 1,500 units of 50L chemical-resistant containers with custom hazardous material label embossing and UN certification docs for Q3 dispatch.',
    newsletter: true,
    privacy: true,
    status: 'new',
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 mins ago
    notes: [
      {
        id: 'n-1',
        text: 'Assigned to North Zone sales desk. Chemical grade spec sheet requested.',
        createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        author: 'Admin',
      },
    ],
  },
  {
    id: 'INQ-1002',
    name: 'Elena Rostova',
    company: 'Vanguard Global Exports',
    email: 'elena.rostova@vanguard-trade.eu',
    phone: '+44 20 7946 0912',
    subject: 'FOB Pricing for Industrial Storage & Logistics Crate',
    product: 'Industrial Storage & Logistics Crate',
    quantity: '5,000 units (40ft High Cube Container)',
    message:
      'Looking for factory-direct FOB Mumbai quotes for stackable crates. We need Euro-pallet compatible footprints with custom blue colorway.',
    newsletter: true,
    privacy: true,
    status: 'in-progress',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), // 4 hrs ago
    notes: [
      {
        id: 'n-1',
        text: 'Shared FOB pricing breakdown for 40ft HQ container.',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        author: 'Admin',
      },
    ],
  },
  {
    id: 'INQ-1003',
    name: 'Amit Patel',
    company: 'Nursery Care Products India',
    email: 'amit.patel@nurserycare.org',
    phone: '+91 94250 88912',
    subject: 'Safety Certifications for Ergonomic Baby Booster Chair',
    product: 'Ergonomic Baby Booster Chair',
    quantity: '600 units',
    message:
      'Requesting REACH/FDA food contact and child safety test reports for the booster chair molds before placing institutional purchase order.',
    newsletter: false,
    privacy: true,
    status: 'new',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(), // 18 hrs ago
    notes: [],
  },
  {
    id: 'INQ-1004',
    name: 'Marcus Sterling',
    company: 'Sterling Sports & Outdoor Supplies',
    email: 'm.sterling@sterlingsports.com',
    phone: '+1 (555) 234-8901',
    subject: 'Custom Logo Silk Screen on BPA-Free Sports Bottle',
    product: 'BPA-Free Premium Sports Bottle',
    quantity: '2,500 units',
    message:
      'We want to distribute co-branded Tritan water bottles across 24 fitness franchise stores. Need sample unit shipped to Chicago.',
    newsletter: true,
    privacy: true,
    status: 'resolved',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    notes: [
      {
        id: 'n-1',
        text: 'Pre-production sample dispatched via DHL Express. Tracking shared.',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
        author: 'Admin',
      },
      {
        id: 'n-2',
        text: 'Client confirmed sample delivery and approval.',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
        author: 'Admin',
      },
    ],
  },
  {
    id: 'INQ-1005',
    name: 'Suresh Menon',
    company: 'Deccan Agro Chemical Industries',
    email: 'suresh@deccanagro.co.in',
    phone: '+91 98450 11203',
    subject: 'Custom Calibration Markings for 20L Precision Bucket',
    product: 'Precision Measuring Bucket 20L',
    quantity: '3,000 units',
    message:
      'We require calibrated liter/gallon measurement markings molded into the bucket inner wall with high chemical resistance.',
    newsletter: true,
    privacy: true,
    status: 'in-progress',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), // 3 days ago
    notes: [
      {
        id: 'n-1',
        text: 'Tooling team reviewed CAD mold modifications.',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
        author: 'Admin',
      },
    ],
  },
  {
    id: 'INQ-1006',
    name: 'Tariq Al-Mansoor',
    company: 'Gulf Warehousing Corporation',
    email: 'tariq@gulfwh.ae',
    phone: '+971 4 391 8000',
    subject: 'Modular Industrial Stands for Dubai Logistics Hub',
    product: 'Heavy-Duty Modular Industrial Stand',
    quantity: '800 units',
    message:
      'Inquiry for high-impact modular industrial floor racks. Please quote CIF Jebel Ali Port.',
    newsletter: false,
    privacy: true,
    status: 'archived',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString(), // 5 days ago
    notes: [
      {
        id: 'n-1',
        text: 'Order fulfilled under PO-4491. Archived.',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(),
        author: 'Admin',
      },
    ],
  },
];

const loadInitialInquiries = () => {
  try {
    const local = localStorage.getItem(STORAGE_KEY);
    if (local) {
      const parsed = JSON.parse(local);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (error) {
    console.error('Failed to parse inquiries from localStorage:', error);
  }
  return defaultInquiries;
};

const saveInquiries = (inquiries) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(inquiries));
  } catch (error) {
    console.error('Failed to save inquiries to localStorage:', error);
  }
};

const initialState = {
  items: loadInitialInquiries(),
  loading: false,
  error: null,
};

const inquiriesSlice = createSlice({
  name: 'inquiries',
  initialState,
  reducers: {
    addInquiry: (state, action) => {
      const newInquiry = {
        ...action.payload,
        id:
          action.payload.id ||
          `INQ-${Math.floor(1000 + Math.random() * 9000)}`,
        status: action.payload.status || 'new',
        createdAt: action.payload.createdAt || new Date().toISOString(),
        notes: action.payload.notes || [],
      };
      state.items.unshift(newInquiry);
      saveInquiries(state.items);
    },
    updateInquiryStatus: (state, action) => {
      const { id, status } = action.payload;
      const inquiry = state.items.find((item) => String(item.id) === String(id));
      if (inquiry) {
        inquiry.status = status;
        saveInquiries(state.items);
      }
    },
    addAdminNote: (state, action) => {
      const { id, noteText, author = 'Admin' } = action.payload;
      const inquiry = state.items.find((item) => String(item.id) === String(id));
      if (inquiry) {
        if (!inquiry.notes) inquiry.notes = [];
        inquiry.notes.push({
          id: `n-${Date.now()}`,
          text: noteText,
          author,
          createdAt: new Date().toISOString(),
        });
        saveInquiries(state.items);
      }
    },
    archiveInquiry: (state, action) => {
      const id = action.payload;
      const inquiry = state.items.find((item) => String(item.id) === String(id));
      if (inquiry) {
        inquiry.status = 'archived';
        saveInquiries(state.items);
      }
    },
    deleteInquiry: (state, action) => {
      state.items = state.items.filter(
        (item) => String(item.id) !== String(action.payload)
      );
      saveInquiries(state.items);
    },
    resetInquiries: (state) => {
      state.items = defaultInquiries;
      saveInquiries(defaultInquiries);
    },
  },
});

export const {
  addInquiry,
  updateInquiryStatus,
  addAdminNote,
  archiveInquiry,
  deleteInquiry,
  resetInquiries,
} = inquiriesSlice.actions;

// Selectors
export const selectAllInquiries = (state) => state.inquiries.items;
export const selectInquiryById = (state, id) =>
  state.inquiries.items.find((item) => String(item.id) === String(id));
export const selectInquiriesByStatus = (state, status) => {
  if (!status || status === 'all') return state.inquiries.items;
  return state.inquiries.items.filter((item) => item.status === status);
};
export const selectUnreadCount = (state) =>
  state.inquiries.items.filter((item) => item.status === 'new').length;
export const selectRecentInquiries = (state, limit = 5) =>
  state.inquiries.items.slice(0, limit);
export const selectInquiryStats = (state) => {
  const items = state.inquiries.items;
  return {
    total: items.length,
    new: items.filter((i) => i.status === 'new').length,
    inProgress: items.filter((i) => i.status === 'in-progress').length,
    resolved: items.filter((i) => i.status === 'resolved').length,
    archived: items.filter((i) => i.status === 'archived').length,
  };
};

export default inquiriesSlice.reducer;
