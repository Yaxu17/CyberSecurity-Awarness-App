import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ArrowLeft, ExternalLink, AlertCircle } from 'lucide-react';

export default function ThreatDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const threats = useSelector(state => state.threats.items);
  const darkMode = useSelector(state => state.ui.darkMode);

  const threat = threats.find(t => t.id === id);

  if (!threat) {
    return (
      <div className="space-y-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-500 hover:text-blue-600 font-medium"
        >
          <ArrowLeft size={20} />
          Back
        </button>
        <div className={`text-center py-12 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          <AlertCircle size={48} className="mx-auto mb-4 opacity-50" />
          <p className="text-lg">Threat not found</p>
        </div>
      </div>
    );
  }

  const getSeverityBadge = (severity) => {
    const colors = {
      CRITICAL: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      HIGH: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      MEDIUM: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      LOW: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    };
    return colors[severity] || colors.MEDIUM;
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-blue-500 hover:text-blue-600 font-medium"
      >
        <ArrowLeft size={20} />
        Back to Threats
      </button>

      {/* Header */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow`}>
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{threat.id}</h1>
            <p className="text-lg opacity-90">{threat.title}</p>
          </div>
          <span className={`px-4 py-2 rounded-full font-bold whitespace-nowrap ${getSeverityBadge(threat.severity)}`}>
            {threat.severity}
          </span>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <MetricItem label="CVSS Score" value={threat.cvssScore?.toFixed(1) || 'N/A'} />
          <MetricItem 
            label="Published" 
            value={new Date(threat.publishedDate).toLocaleDateString()} 
          />
          <MetricItem 
            label="Modified" 
            value={new Date(threat.lastModifiedDate).toLocaleDateString()} 
          />
          <MetricItem 
            label="Severity" 
            value={threat.severity} 
          />
        </div>
      </div>

      {/* Description */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow`}>
        <h2 className="text-xl font-bold mb-4">Description</h2>
        <p className={`leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {threat.description || 'No description available'}
        </p>
      </div>

      {/* References */}
      {threat.references && threat.references.length > 0 && (
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow`}>
          <h2 className="text-xl font-bold mb-4">References</h2>
          <ul className="space-y-2">
            {threat.references.map((ref, idx) => (
              <li key={idx}>
                <a
                  href={ref.url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-2 group"
                >
                  {ref.title || ref.url || 'Reference'}
                  <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* CVSS Details */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow`}>
        <h2 className="text-xl font-bold mb-4">CVSS Score Details</h2>
        <div className={`text-4xl font-bold mb-2 ${
          threat.cvssScore >= 9 ? 'text-red-600' :
          threat.cvssScore >= 7 ? 'text-orange-600' :
          threat.cvssScore >= 4 ? 'text-yellow-600' :
          'text-green-600'
        }`}>
          {threat.cvssScore?.toFixed(1) || 'N/A'}
        </div>
        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {threat.cvssScore >= 9 ? 'Critical Severity' :
           threat.cvssScore >= 7 ? 'High Severity' :
           threat.cvssScore >= 4 ? 'Medium Severity' :
           'Low Severity'}
        </p>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-2`}>
          CVSS scores range from 0-10, where higher scores indicate more severe vulnerabilities.
        </p>
      </div>
    </div>
  );
}

function MetricItem({ label, value }) {
  const darkMode = useSelector(state => state.ui.darkMode);
  
  return (
    <div>
      <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        {label}
      </p>
      <p className="text-lg font-bold mt-1">{value}</p>
    </div>
  );
}
