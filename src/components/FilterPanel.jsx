import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSeverity, setCVSSRange, setSortBy, resetFilters } from '../store/slices/filterSlice';
import { Filter } from 'lucide-react';

export default function FilterPanel() {
  const dispatch = useDispatch();
  const filters = useSelector(state => state.filters);
  const darkMode = useSelector(state => state.ui.darkMode);

  const severityOptions = ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'];
  const sortOptions = [
    { value: 'date', label: 'Date (Newest)' },
    { value: 'severity', label: 'Severity (High to Low)' },
    { value: 'cvss', label: 'CVSS Score' },
  ];

  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-gray-50'} p-6 rounded-lg space-y-6`}>
      <div className="flex items-center gap-2 mb-4">
        <Filter size={20} />
        <h3 className="text-lg font-bold">Filters</h3>
      </div>

      {/* Severity Filter */}
      <div>
        <label className={`block text-sm font-semibold mb-3 ${darkMode ? 'text-white' : ''}`}>
          Severity
        </label>
        <div className="flex flex-wrap gap-2">
          {severityOptions.map(option => (
            <button
              key={option}
              onClick={() => {
                const newSeverity = filters.severity.includes(option)
                  ? filters.severity.filter(s => s !== option)
                  : [...filters.severity, option];
                dispatch(setSeverity(newSeverity));
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                filters.severity.includes(option)
                  ? 'bg-red-600 text-white'
                  : `${darkMode ? 'bg-gray-700 text-gray-300 border-gray-600' : 'bg-white text-gray-700 border-gray-300'} border`
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* CVSS Score Range */}
      <div>
        <label className={`block text-sm font-semibold mb-3 ${darkMode ? 'text-white' : ''}`}>
          CVSS Score: {filters.cvssMin.toFixed(1)} - {filters.cvssMax.toFixed(1)}
        </label>
        <div className="space-y-2">
          <div>
            <label className="text-xs text-gray-500">Minimum</label>
            <input
              type="range"
              min="0"
              max="10"
              step="0.1"
              value={filters.cvssMin}
              onChange={(e) => dispatch(setCVSSRange({ min: parseFloat(e.target.value), max: filters.cvssMax }))}
              className="w-full"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500">Maximum</label>
            <input
              type="range"
              min="0"
              max="10"
              step="0.1"
              value={filters.cvssMax}
              onChange={(e) => dispatch(setCVSSRange({ min: filters.cvssMin, max: parseFloat(e.target.value) }))}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Sort Option */}
      <div>
        <label className={`block text-sm font-semibold mb-3 ${darkMode ? 'text-white' : ''}`}>
          Sort By
        </label>
        <select
          value={filters.sortBy}
          onChange={(e) => dispatch(setSortBy(e.target.value))}
          className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            darkMode ? 'bg-gray-700 border-gray-600 text-white' : ''
          }`}
        >
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>

      {/* Reset Button */}
      <button
        onClick={() => dispatch(resetFilters())}
        className={`w-full px-4 py-2 rounded-lg hover:opacity-80 transition font-medium ${
          darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-300 text-gray-900 hover:bg-gray-400'
        }`}
      >
        Reset All Filters
      </button>
    </div>
  );
}
