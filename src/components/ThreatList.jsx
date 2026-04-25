import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import ThreatCard from './ThreatCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ThreatList() {
  const [currentPage, setCurrentPage] = useState(1);
  const threats = useSelector(state => state.threats.items);
  const filters = useSelector(state => state.filters);
  const darkMode = useSelector(state => state.ui.darkMode);
  const itemsPerPage = 20;

  // Apply filters and sorting
  const filteredThreats = useMemo(() => {
    let result = [...threats];

    // Search filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(threat =>
        threat.id.toLowerCase().includes(query) ||
        threat.title.toLowerCase().includes(query)
      );
    }

    // Severity filter
    if (filters.severity.length > 0) {
      result = result.filter(threat =>
        filters.severity.includes(threat.severity)
      );
    }

    // CVSS filter
    result = result.filter(threat =>
      threat.cvssScore >= filters.cvssMin &&
      threat.cvssScore <= filters.cvssMax
    );

    // Sorting
    result.sort((a, b) => {
      switch (filters.sortBy) {
        case 'date':
          return new Date(b.publishedDate) - new Date(a.publishedDate);
        case 'severity':
          const severityOrder = { CRITICAL: 4, HIGH: 3, MEDIUM: 2, LOW: 1, UNKNOWN: 0 };
          return (severityOrder[b.severity] || 0) - (severityOrder[a.severity] || 0);
        case 'cvss':
          return b.cvssScore - a.cvssScore;
        default:
          return 0;
      }
    });

    return result;
  }, [threats, filters]);

  // Pagination
  const totalPages = Math.ceil(filteredThreats.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedThreats = filteredThreats.slice(startIndex, startIndex + itemsPerPage);

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  return (
    <div className="space-y-4">
      {/* Results count */}
      <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        Showing {paginatedThreats.length} of {filteredThreats.length} threats
        {filters.searchQuery && ` for "${filters.searchQuery}"`}
      </div>

      {/* Threat cards */}
      <div className="space-y-3">
        {paginatedThreats.length > 0 ? (
          paginatedThreats.map(threat => (
            <ThreatCard key={threat.id} threat={threat} />
          ))
        ) : (
          <div className={`text-center py-12 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <AlertCircle size={48} className="mx-auto mb-4 opacity-50" />
            <p>No threats found matching your filters.</p>
            <p className="text-sm">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
              darkMode
                ? 'bg-gray-700 text-white hover:bg-gray-600 disabled:opacity-50'
                : 'bg-gray-200 text-gray-900 hover:bg-gray-300 disabled:opacity-50'
            }`}
          >
            <ChevronLeft size={20} />
            Previous
          </button>

          <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Page {currentPage} of {totalPages}
          </div>

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
              darkMode
                ? 'bg-gray-700 text-white hover:bg-gray-600 disabled:opacity-50'
                : 'bg-gray-200 text-gray-900 hover:bg-gray-300 disabled:opacity-50'
            }`}
          >
            Next
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}

import { AlertCircle } from 'lucide-react';
