import React from 'react';
import { useSelector } from 'react-redux';
import { SeverityChart, TimelineChart, CVSSChart } from '../components/Charts';
import ThreatCard from '../components/ThreatCard';
import { AlertCircle, TrendingUp, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const threats = useSelector(state => state.threats.items);
  const darkMode = useSelector(state => state.ui.darkMode);
  const status = useSelector(state => state.threats.status);

  // Calculate statistics
  const stats = {
    total: threats.length,
    critical: threats.filter(t => t.severity === 'CRITICAL').length,
    avgCVSS: threats.length > 0 
      ? (threats.reduce((sum, t) => sum + (t.cvssScore || 0), 0) / threats.length).toFixed(1)
      : 0,
    highSeverity: threats.filter(t => ['CRITICAL', 'HIGH'].includes(t.severity)).length,
  };

  const recentThreats = threats.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<AlertCircle size={24} />}
          label="Total Threats"
          value={stats.total}
          color="bg-blue-500"
        />
        <StatCard
          icon={<Zap size={24} />}
          label="Critical"
          value={stats.critical}
          color="bg-red-500"
        />
        <StatCard
          icon={<TrendingUp size={24} />}
          label="Average CVSS"
          value={stats.avgCVSS}
          color="bg-orange-500"
        />
        <StatCard
          icon={<Shield size={24} />}
          label="High + Critical"
          value={stats.highSeverity}
          color="bg-yellow-500"
        />
      </div>

      {/* Charts */}
      {status === 'loading' ? (
        <div className={`text-center py-12 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          <div className="animate-spin inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mb-4"></div>
          <p>Loading threat data...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SeverityChart />
          <CVSSChart />
          <div className="lg:col-span-2">
            <TimelineChart />
          </div>
        </div>
      )}

      {/* Recent Threats */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Recent Threats</h3>
          <Link
            to="/threats"
            className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium"
          >
            View All →
          </Link>
        </div>
        <div className="space-y-3">
          {recentThreats.length > 0 ? (
            recentThreats.map(threat => (
              <ThreatCard key={threat.id} threat={threat} />
            ))
          ) : (
            <p className={`text-center py-8 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              No threats loaded yet. Please wait or refresh.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }) {
  const darkMode = useSelector(state => state.ui.darkMode);
  
  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow hover:shadow-lg transition`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {label}
          </p>
          <p className="text-3xl font-bold mt-1">{value}</p>
        </div>
        <div className={`${color} p-3 rounded-lg text-white`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
