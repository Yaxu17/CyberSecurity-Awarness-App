import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchThreats = createAsyncThunk(
  'threats/fetchThreats',
  async (params = {}) => {
    try {
      const response = await axios.get(
        'https://services.nvd.nist.gov/rest/json/cves/1.0',
        {
          params: {
            resultsPerPage: 50,
            ...params,
          },
          timeout: 10000,
        }
      );
      
      // Transform NVD data to our format
      const items = response.data.result?.CVE_Items || [];
      return items.map((item) => ({
        id: item.cve?.CVE_data_meta?.ID || 'Unknown',
        title: item.cve?.description?.description_data?.[0]?.value || 'No title',
        description: item.cve?.description?.description_data?.[0]?.value || '',
        severity: item.impact?.baseMetricV3?.cvssV3?.baseSeverity || 'UNKNOWN',
        cvssScore: item.impact?.baseMetricV3?.cvssV3?.baseScore || 0,
        publishedDate: item.publishedDate || new Date().toISOString(),
        lastModifiedDate: item.lastModifiedDate || new Date().toISOString(),
        references: item.cve?.references?.reference_data || [],
      }));
    } catch (error) {
      console.error('API Error:', error.message);
      throw error;
    }
  }
);

const threatSlice = createSlice({
  name: 'threats',
  initialState: {
    items: [],
    status: 'idle', // idle, loading, succeeded, failed
    error: null,
    lastUpdated: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchThreats.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchThreats.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.lastUpdated = new Date();
      })
      .addCase(fetchThreats.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default threatSlice.reducer;
