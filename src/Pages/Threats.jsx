import React from 'react';
import { useSelector } from 'react-redux';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import ThreatList from '../components/ThreatList';

export default function Threats() {
  const darkMode = useSelector(state => state.ui.darkMode);
  const status = useSelector(state => state.threats.status);
  const error = useSelector(state => state.threats.error);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Threat Intelligence</h1>
        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Search, filter, and analyze cybersecurity threats
        </p>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 p-4 rounded-lg">
          <p className="font-medium">Error loading threats:</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Loading State */}
      {status === 'loading' && (
        <div className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          <div className="animate-spin inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mb-4"></div>
          <p>Loading threat data...</p>
        </div>
      )}

      {/* Main Content */}
      {status !== 'loading' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar with Filters */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <FilterPanel />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-4">
            {/* Search Bar */}
            <SearchBar />

            {/* Threat List */}
            <ThreatList />
          </div>
        </div>
      )}
    </div>
  );
}
