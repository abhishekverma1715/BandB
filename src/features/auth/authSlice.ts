import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Admin, AuthState } from '../../types/index.js';

const getInitialAdmin = (): Admin | null => {
  try {
    const local = localStorage.getItem('adminInfo');
    if (local) {
      return JSON.parse(local);
    }
  } catch {
    // ignore
  }
  return null;
};

const initialAdmin = getInitialAdmin();

const initialState: AuthState = {
  adminInfo: initialAdmin,
  isAuthenticated: Boolean(initialAdmin && initialAdmin.token),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<Admin>) => {
      state.adminInfo = action.payload;
      state.isAuthenticated = true;
      state.error = null;
      try {
        localStorage.setItem('adminInfo', JSON.stringify(action.payload));
      } catch {
        // ignore
      }
    },
    logout: (state) => {
      state.adminInfo = null;
      state.isAuthenticated = false;
      state.error = null;
      try {
        localStorage.removeItem('adminInfo');
      } catch {
        // ignore
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setCredentials, logout, setLoading, setError } = authSlice.actions;

// Selectors
export const selectAdminInfo = (state: { auth: AuthState }) => state.auth.adminInfo;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export const selectAuthLoading = (state: { auth: AuthState }) => state.auth.loading;
export const selectAuthError = (state: { auth: AuthState }) => state.auth.error;

export default authSlice.reducer;
