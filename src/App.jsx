import React, { useEffect, Suspense, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { fetchThreats } from './store/slices/threatSlice';
import Navbar from './components/Navbar';
import ErrorBoundary from './components/ErrorBoundary';
import { useAutoRefresh } from './hooks/useAutoRefresh';

// Lazy load pages - CORRECT syntax
const Dashboard = lazy(() => import('./pages/Dashboard.jsx'));
const Threats = lazy(() => import('./pages/Threats.jsx'));
const ThreatDetail = lazy(() => import('./pages/ThreatDetail.jsx'));
const Settings = lazy(() => import('./pages/Settings.jsx'));

// Loading component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <div className="animate-spin inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mb-4"></div>
      <p>Loading...</p>
    </div>
  </div>
);

function App() {
  const dispatch = useDispatch();
  const darkMode = useSelector(state => state.ui.darkMode);

  useEffect(() => {
    dispatch(fetchThreats());
  }, [dispatch]);

  useAutoRefresh();

  return (
    <ErrorBoundary>
      <Router>
        <div className={darkMode ? 'dark' : ''}>
          <div className={`${darkMode ? 'bg-gray-950 text-white' : 'bg-white'} min-h-screen transition-colors`}>
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 py-6">
              <Suspense fallback={<LoadingFallback />}>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/threats" element={<Threats />} />
                  <Route path="/threat/:id" element={<ThreatDetail />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="*" element={<div className="text-center py-12">Page not found</div>} />
                </Routes>
              </Suspense>
            </main>
          </div>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
