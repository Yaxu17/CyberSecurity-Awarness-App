import React, { useEffect, Suspense, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { fetchThreats } from './store/slices/threatSlice';
import Navbar from './components/Navbar';
import ErrorBoundary from './components/ErrorBoundary';
import { useAutoRefresh } from './hooks/useAutoRefresh';

// Lazy load pages
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Threats = lazy(() => import('./pages/Threats'));
const ThreatDetail = lazy(() => import('./pages/ThreatDetail'));
const Settings = lazy(() => import('./pages/Settings'));

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
              <Suspense fallback={<div className="text-center py-12">Loading...</div>}>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/threats" element={<Threats />} />
                  <Route path="/threat/:id" element={<ThreatDetail />} />
                  <Route path="/settings" element={<Settings />} />
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
