import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from '../store/slices/uiSlice';
import { fetchThreats } from '../store/slices/threatSlice';
import { Moon, Sun, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const dispatch = useDispatch();
  const darkMode = useSelector(state => state.ui.darkMode);
  const lastUpdated = useSelector(state => state.threats.lastUpdated);
  const status = useSelector(state => state.threats.status);

  const handleRefresh = () => {
    dispatch(fetchThreats());
  };

  return (
    <nav className={`${darkMode ? 'bg-gray-900 text-white border-gray-800' : 'bg-white border-gray-200'} border-b shadow-sm sticky top-0 z-50`}>
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition">
          <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
            🛡️
          </div>
          <div>
            <h1 className="text-xl font-bold">Threat Intelligence</h1>
            <p className="text-xs opacity-60">Cybersecurity Dashboard</p>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          {lastUpdated && (
            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Updated: {lastUpdated.toLocaleTimeString()}
            </span>
          )}
          <button
            onClick={handleRefresh}
            disabled={status === 'loading'}
            className={`p-2 rounded-lg transition ${
              darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'
            } disabled:opacity-50`}
            title="Refresh data"
          >
            <RefreshCw size={20} className={status === 'loading' ? 'animate-spin' : ''} />
          </button>
          <button
            onClick={() => dispatch(toggleDarkMode())}
            className={`p-2 rounded-lg transition ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'}`}
            title="Toggle dark mode"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
