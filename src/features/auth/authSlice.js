import { createSlice } from '@reduxjs/toolkit';

const adminInfoFromStorage = () => {
  try {
    const info = localStorage.getItem('adminInfo');
    return info ? JSON.parse(info) : null;
  } catch (e) {
    return null;
  }
};

const initialState = {
  adminInfo: adminInfoFromStorage(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.adminInfo = action.payload;
      localStorage.setItem('adminInfo', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.adminInfo = null;
      localStorage.removeItem('adminInfo');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export const selectAdminInfo = (state) => state.auth.adminInfo;
export const selectIsAuthenticated = (state) => Boolean(state.auth.adminInfo);

export default authSlice.reducer;
