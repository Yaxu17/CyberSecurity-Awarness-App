import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    darkMode: localStorage.getItem('darkMode') === 'true' || false,
    autoRefresh: true,
    refreshInterval: 60,
  },
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem('darkMode', state.darkMode);
    },
    setAutoRefresh: (state, action) => {
      state.autoRefresh = action.payload;
    },
    setRefreshInterval: (state, action) => {
      state.refreshInterval = action.payload;
    },
  },
});

export const { toggleDarkMode, setAutoRefresh, setRefreshInterval } = uiSlice.actions;
export default uiSlice.reducer;
