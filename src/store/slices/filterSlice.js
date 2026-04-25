import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filters',
  initialState: {
    searchQuery: '',
    severity: [],
    cvssMin: 0,
    cvssMax: 10,
    sortBy: 'date',
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSeverity: (state, action) => {
      state.severity = action.payload;
    },
    setCVSSRange: (state, action) => {
      state.cvssMin = action.payload.min;
      state.cvssMax = action.payload.max;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    resetFilters: (state) => {
      return filterSlice.getInitialState();
    },
  },
});

export const { setSearchQuery, setSeverity, setCVSSRange, setSortBy, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;
