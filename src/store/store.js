import { configureStore } from '@reduxjs/toolkit';
import threatReducer from './slices/threatSlice';
import filterReducer from './slices/filterSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    threats: threatReducer,
    filters: filterReducer,
    ui: uiReducer,
  },
});
