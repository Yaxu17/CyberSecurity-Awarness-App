import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { fetchThreats } from './store/slices/threatSlice';
import Navbar from './components/Navbar';
import ErrorBoundary from './components/ErrorBoundary';
import Dashboard from './pages/Dashboard';
import Threats from './pages/Threats';
import ThreatDetail from './pages/ThreatDetail';
import Settings from './pages/Settings';
import { useAutoRefresh } from './hooks/useAutoRefresh';

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
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/threats" element={<Threats />} />
                <Route path="/threat/:id" element={<ThreatDetail />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
