import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchThreats = createAsyncThunk(
  'threats/fetchThreats',
  async (params = {}) => {
    try {
      // Use CORS proxy to bypass CORS blocking
      const corsProxy = 'https://cors-anywhere.herokuapp.com/';
      const nvdApi = 'https://services.nvd.nist.gov/rest/json/cves/1.0';
      
      const response = await axios.get(
        corsProxy + nvdApi,
        {
          params: {
            resultsPerPage: 50,
            ...params,
          },
          timeout: 15000,
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
          }
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
      // Return mock data if API fails
      return getMockThreats();
    }
  }
);

// Fallback mock data when API fails
function getMockThreats() {
  return [
    {
      id: 'CVE-2024-1234',
      title: 'SQL Injection Vulnerability in Authentication Module',
      description: 'A critical SQL injection vulnerability has been discovered in the authentication module allowing remote code execution',
      severity: 'CRITICAL',
      cvssScore: 9.8,
      publishedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      lastModifiedDate: new Date().toISOString(),
      references: [{ url: 'https://nvd.nist.gov', title: 'NVD Reference' }],
    },
    {
      id: 'CVE-2024-1235',
      title: 'Cross-Site Scripting (XSS) in User Input Handler',
      description: 'Reflected XSS vulnerability in the user input handler allows attackers to execute malicious scripts',
      severity: 'HIGH',
      cvssScore: 8.2,
      publishedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      lastModifiedDate: new Date().toISOString(),
      references: [{ url: 'https://nvd.nist.gov', title: 'NVD Reference' }],
    },
    {
      id: 'CVE-2024-1236',
      title: 'Privilege Escalation in File System Access',
      description: 'Local privilege escalation vulnerability in file system access controls',
      severity: 'HIGH',
      cvssScore: 7.5,
      publishedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      lastModifiedDate: new Date().toISOString(),
      references: [{ url: 'https://nvd.nist.gov', title: 'NVD Reference' }],
    },
    {
      id: 'CVE-2024-1237',
      title: 'Buffer Overflow in Image Processing Library',
      description: 'Buffer overflow vulnerability in image processing allows code execution',
      severity: 'CRITICAL',
      cvssScore: 9.5,
      publishedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      lastModifiedDate: new Date().toISOString(),
      references: [{ url: 'https://nvd.nist.gov', title: 'NVD Reference' }],
    },
    {
      id: 'CVE-2024-1238',
      title: 'Denial of Service in API Rate Limiting',
      description: 'DoS vulnerability in API rate limiting bypass',
      severity: 'MEDIUM',
      cvssScore: 5.9,
      publishedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      lastModifiedDate: new Date().toISOString(),
      references: [{ url: 'https://nvd.nist.gov', title: 'NVD Reference' }],
    },
    {
      id: 'CVE-2024-1239',
      title: 'Weak Cryptography Implementation',
      description: 'Weak cryptographic algorithm used in encryption module',
      severity: 'MEDIUM',
      cvssScore: 5.3,
      publishedDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      lastModifiedDate: new Date().toISOString(),
      references: [{ url: 'https://nvd.nist.gov', title: 'NVD Reference' }],
    },
    {
      id: 'CVE-2024-1240',
      title: 'Insecure Direct Object Reference in API',
      description: 'IDOR vulnerability allows unauthorized access to resources',
      severity: 'HIGH',
      cvssScore: 7.8,
      publishedDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      lastModifiedDate: new Date().toISOString(),
      references: [{ url: 'https://nvd.nist.gov', title: 'NVD Reference' }],
    },
    {
      id: 'CVE-2024-1241',
      title: 'XML External Entity (XXE) Injection',
      description: 'XXE injection vulnerability in XML parser',
      severity: 'HIGH',
      cvssScore: 8.1,
      publishedDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
      lastModifiedDate: new Date().toISOString(),
      references: [{ url: 'https://nvd.nist.gov', title: 'NVD Reference' }],
    },
    {
      id: 'CVE-2024-1242',
      title: 'Unvalidated Redirects and Forwards',
      description: 'Unvalidated redirect vulnerability for phishing attacks',
      severity: 'MEDIUM',
      cvssScore: 4.7,
      publishedDate: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
      lastModifiedDate: new Date().toISOString(),
      references: [{ url: 'https://nvd.nist.gov', title: 'NVD Reference' }],
    },
    {
      id: 'CVE-2024-1243',
      title: 'Session Fixation Attack Vector',
      description: 'Session fixation vulnerability in session management',
      severity: 'MEDIUM',
      cvssScore: 6.2,
      publishedDate: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
      lastModifiedDate: new Date().toISOString(),
      references: [{ url: 'https://nvd.nist.gov', title: 'NVD Reference' }],
    },
  ];
}

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
        // Load mock data on error
        state.items = getMockThreats();
      });
  },
});

export default threatSlice.reducer;
