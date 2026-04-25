import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, ArrowRight } from 'lucide-react';

const getSeverityColor = (severity) => {
  const colors = {
    CRITICAL: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 border-l-4 border-red-600',
    HIGH: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 border-l-4 border-orange-600',
    MEDIUM: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 border-l-4 border-yellow-600',
    LOW: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-l-4 border-green-600',
    UNKNOWN: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200 border-l-4 border-gray-600',
  };
  return colors[severity] || colors.UNKNOWN;
};

export default function ThreatCard({ threat }) {
  const { id, title, severity, cvssScore, publishedDate } = threat;

  return (
    <Link to={`/threat/${id}`}>
      <div className={`p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer ${getSeverityColor(severity)}`}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle size={20} />
              <h3 className="text-lg font-bold">{id}</h3>
            </div>
            <p className="text-sm opacity-90 line-clamp-2">{title}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-2xl font-bold">{cvssScore?.toFixed(1) || 'N/A'}</div>
            <div className="text-xs opacity-75">CVSS</div>
          </div>
        </div>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-current border-opacity-20">
          <span className="text-xs opacity-75">
            {new Date(publishedDate).toLocaleDateString()}
          </span>
          <ArrowRight size={16} />
        </div>
      </div>
    </Link>
  );
}
