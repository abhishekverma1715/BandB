import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiGet, apiPost, apiPatch, apiDelete } from '../../utils/api.js';
import { Inquiry, InquiryState, InquiryStatus } from '../../types/index.js';

const STORAGE_KEY = 'bb_inquiries';

export const normalizeInquiry = (inq: any): Inquiry => {
  if (!inq) {
    return {
      id: `INQ-${Math.floor(1000 + Math.random() * 9000)}`,
      inquiryId: `INQ-${Math.floor(1000 + Math.random() * 9000)}`,
      name: '',
      email: '',
      phone: '',
      subject: 'Wholesale RFQ Inquiry',
      message: '',
      privacy: true,
      status: 'new' as InquiryStatus,
      createdAt: new Date().toISOString(),
      notes: [],
    };
  }
  const id = inq._id || inq.id || inq.inquiryId || `INQ-${Math.floor(1000 + Math.random() * 9000)}`;
  const inquiryId = inq.inquiryId || inq.id || `INQ-${Math.floor(1000 + Math.random() * 9000)}`;
  return {
    ...inq,
    _id: inq._id || id,
    id: String(id),
    inquiryId: String(inquiryId),
    name: inq.name || '',
    company: inq.company || '',
    email: inq.email || '',
    phone: inq.phone || '',
    subject: inq.subject || 'Wholesale RFQ Inquiry',
    product: inq.product || '',
    quantity: inq.quantity || '',
    message: inq.message || '',
    newsletter: Boolean(inq.newsletter),
    privacy: inq.privacy !== undefined ? Boolean(inq.privacy) : true,
    status: (inq.status as InquiryStatus) || 'new',
    createdAt: inq.createdAt || new Date().toISOString(),
    notes: Array.isArray(inq.notes)
      ? inq.notes.map((n: any) => ({
          _id: n._id || n.id,
          id: n.id || n._id,
          text: n.text || '',
          author: n.author || 'Admin',
          createdAt: n.createdAt || new Date().toISOString(),
        }))
      : [],
  };
};

const loadInitialInquiries = (): Inquiry[] => {
  try {
    const local = localStorage.getItem(STORAGE_KEY);
    if (local !== null) {
      const parsed = JSON.parse(local);
      if (Array.isArray(parsed)) {
        return parsed.map(normalizeInquiry).filter(Boolean);
      }
    }
  } catch (error) {
    console.error('Failed to parse inquiries from localStorage:', error);
  }
  return [];
};

const saveInquiries = (inquiries: Inquiry[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(inquiries));
  } catch (error) {
    console.error('Failed to save inquiries to localStorage:', error);
  }
};

// Async Thunk: Fetch Inquiries from Backend API
export const fetchInquiries = createAsyncThunk<Inquiry[], Record<string, any> | void>(
  'inquiries/fetchInquiries',
  async (params = {}) => {
    try {
      const data = await apiGet<Inquiry[]>('/inquiries', params || {});
      const items = Array.isArray(data) ? data.map(normalizeInquiry) : [];
      saveInquiries(items);
      return items;
    } catch (err: any) {
      console.warn('Live API fetchInquiries notice:', err.message);
      return loadInitialInquiries();
    }
  }
);

// Async Thunk: Submit New Public Inquiry
export const submitInquiry = createAsyncThunk<Inquiry, Partial<Inquiry>>(
  'inquiries/submitInquiry',
  async (inquiryData) => {
    try {
      const response = await apiPost<{ success: boolean; message: string; inquiry: Inquiry }>(
        '/inquiries',
        inquiryData
      );
      const created = response.inquiry || response;
      return normalizeInquiry(created);
    } catch (err: any) {
      console.warn('Backend submit fallback:', err.message);
      return normalizeInquiry({
        ...inquiryData,
        createdAt: new Date().toISOString(),
      });
    }
  }
);

// Async Thunk: Update Inquiry Workflow Status
export const updateInquiryStatus = createAsyncThunk<
  { id: string | number; status: InquiryStatus; updated?: Inquiry },
  { id: string | number; status: InquiryStatus }
>('inquiries/updateInquiryStatus', async ({ id, status }) => {
  try {
    const updated = await apiPatch<Inquiry>(`/inquiries/${id}/status`, { status });
    return { id, status, updated: normalizeInquiry(updated) };
  } catch (err: any) {
    console.warn('Live API updateInquiryStatus notice:', err.message);
    return { id, status };
  }
});

// Async Thunk: Add Internal Admin Note
export const addAdminNote = createAsyncThunk<
  { id: string | number; noteText: string; author: string; updated?: Inquiry },
  { id: string | number; noteText: string; author?: string }
>('inquiries/addAdminNote', async ({ id, noteText, author = 'Admin' }) => {
  try {
    const updated = await apiPost<Inquiry>(`/inquiries/${id}/notes`, { text: noteText, author });
    return { id, noteText, author, updated: normalizeInquiry(updated) };
  } catch (err: any) {
    console.warn('Live API addAdminNote notice:', err.message);
    return { id, noteText, author };
  }
});

// Async Thunk: Delete Inquiry Permanently
export const deleteInquiry = createAsyncThunk<string | number, string | number>(
  'inquiries/deleteInquiry',
  async (id) => {
    try {
      await apiDelete(`/inquiries/${id}`);
      return id;
    } catch (err: any) {
      console.warn('Live API deleteInquiry notice:', err.message);
      return id;
    }
  }
);

// Async Thunk: Clear All Inquiries (Admin Reset)
export const clearAllInquiries = createAsyncThunk<Inquiry[], void>(
  'inquiries/clearAllInquiries',
  async () => {
    try {
      await apiDelete('/inquiries/clear/all');
      saveInquiries([]);
      return [];
    } catch (err: any) {
      console.warn('Live API clearAllInquiries notice:', err.message);
      saveInquiries([]);
      return [];
    }
  }
);

const initialItems = loadInitialInquiries();

const initialState: InquiryState = {
  items: initialItems,
  unreadCount: initialItems.filter((i) => i.status === 'new').length,
  loading: false,
  error: null,
  lastFetched: null,
};

const inquiriesSlice = createSlice({
  name: 'inquiries',
  initialState,
  reducers: {
    addInquiry: (state, action: PayloadAction<Partial<Inquiry>>) => {
      const newInquiry = normalizeInquiry(action.payload);
      state.items.unshift(newInquiry);
      state.unreadCount = state.items.filter((i) => i.status === 'new').length;
      saveInquiries(state.items);
    },
    archiveInquiry: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const inquiry = state.items.find(
        (item) =>
          String(item.id) === String(id) ||
          String(item._id) === String(id) ||
          String(item.inquiryId) === String(id)
      );
      if (inquiry) {
        inquiry.status = 'archived';
        state.unreadCount = state.items.filter((i) => i.status === 'new').length;
        saveInquiries(state.items);
      }
    },
    resetInquiries: (state) => {
      state.items = [];
      state.unreadCount = 0;
      saveInquiries([]);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchInquiries.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchInquiries.fulfilled, (state, action: PayloadAction<Inquiry[]>) => {
      state.loading = false;
      state.items = action.payload;
      state.unreadCount = action.payload.filter((i) => i.status === 'new').length;
      state.lastFetched = new Date().toISOString();
      saveInquiries(state.items);
    });
    builder.addCase(fetchInquiries.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error?.message || 'Failed to fetch inquiries';
    });

    builder.addCase(submitInquiry.fulfilled, (state, action: PayloadAction<Inquiry>) => {
      if (action.payload) {
        const exists = state.items.some(
          (i) =>
            String(i.id) === String(action.payload.id) ||
            String(i._id) === String(action.payload._id)
        );
        if (!exists) {
          state.items.unshift(action.payload);
          state.unreadCount = state.items.filter((i) => i.status === 'new').length;
          saveInquiries(state.items);
        }
      }
    });

    builder.addCase(updateInquiryStatus.fulfilled, (state, action) => {
      const { id, status, updated } = action.payload;
      const index = state.items.findIndex(
        (item) =>
          String(item.id) === String(id) ||
          String(item._id) === String(id) ||
          String(item.inquiryId) === String(id)
      );
      if (index !== -1) {
        if (updated) {
          state.items[index] = updated;
        } else {
          state.items[index].status = status;
        }
        state.unreadCount = state.items.filter((i) => i.status === 'new').length;
        saveInquiries(state.items);
      }
    });

    builder.addCase(addAdminNote.fulfilled, (state, action) => {
      const { id, noteText, author, updated } = action.payload;
      const index = state.items.findIndex(
        (item) =>
          String(item.id) === String(id) ||
          String(item._id) === String(id) ||
          String(item.inquiryId) === String(id)
      );
      if (index !== -1) {
        if (updated) {
          state.items[index] = updated;
        } else {
          if (!state.items[index].notes) state.items[index].notes = [];
          state.items[index].notes!.push({
            text: noteText,
            author: author || 'Admin',
            createdAt: new Date().toISOString(),
          });
        }
        saveInquiries(state.items);
      }
    });

    builder.addCase(deleteInquiry.fulfilled, (state, action: PayloadAction<string | number>) => {
      const id = action.payload;
      state.items = state.items.filter(
        (item) =>
          String(item.id) !== String(id) &&
          String(item._id) !== String(id) &&
          String(item.inquiryId) !== String(id)
      );
      state.unreadCount = state.items.filter((i) => i.status === 'new').length;
      saveInquiries(state.items);
    });

    builder.addCase(clearAllInquiries.fulfilled, (state) => {
      state.items = [];
      state.unreadCount = 0;
      saveInquiries([]);
    });
  },
});

export const { addInquiry, archiveInquiry, resetInquiries } = inquiriesSlice.actions;

export const selectAllInquiries = (state: { inquiries: InquiryState }) => state.inquiries.items;
export const selectInquiriesLoading = (state: { inquiries: InquiryState }) =>
  state.inquiries.loading;
export const selectInquiryById = (state: { inquiries: InquiryState }, id: string) =>
  state.inquiries.items.find(
    (item) =>
      String(item.id) === String(id) ||
      String(item._id) === String(id) ||
      String(item.inquiryId) === String(id)
  );
export const selectInquiriesByStatus = (state: { inquiries: InquiryState }, status: string) => {
  if (!status || status === 'all') return state.inquiries.items;
  return state.inquiries.items.filter((item) => item.status === status);
};
export const selectUnreadCount = (state: { inquiries: InquiryState }) =>
  state.inquiries.items.filter((item) => item.status === 'new').length;
export const selectRecentInquiries = (state: { inquiries: InquiryState }, limit = 5) =>
  state.inquiries.items.slice(0, limit);
export const selectInquiryStats = (state: { inquiries: InquiryState }) => {
  const items = state.inquiries.items || [];
  return {
    total: items.length,
    new: items.filter((i) => i.status === 'new').length,
    inProgress: items.filter((i) => i.status === 'in-progress').length,
    resolved: items.filter((i) => i.status === 'resolved').length,
    archived: items.filter((i) => i.status === 'archived').length,
  };
};

export default inquiriesSlice.reducer;
