import React from 'react';
import { useSelector } from 'react-redux';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar } from 'recharts';

export function SeverityChart() {
  const threats = useSelector(state => state.threats.items);

  const data = [
    { name: 'CRITICAL', value: threats.filter(t => t.severity === 'CRITICAL').length, fill: '#dc2626' },
    { name: 'HIGH', value: threats.filter(t => t.severity === 'HIGH').length, fill: '#ea580c' },
    { name: 'MEDIUM', value: threats.filter(t => t.severity === 'MEDIUM').length, fill: '#f59e0b' },
    { name: 'LOW', value: threats.filter(t => t.severity === 'LOW').length, fill: '#10b981' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <h3 className="text-lg font-bold mb-4 dark:text-white">Threat Severity Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name}: ${value}`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function TimelineChart() {
  const threats = useSelector(state => state.threats.items);

  const threatsByDay = {};
  threats.forEach(threat => {
    const date = new Date(threat.publishedDate).toLocaleDateString();
    threatsByDay[date] = (threatsByDay[date] || 0) + 1;
  });

  const data = Object.entries(threatsByDay)
    .map(([date, count]) => ({ date, count }))
    .slice(-30);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <h3 className="text-lg font-bold mb-4 dark:text-white">Threats Over Time (Last 30 Days)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="date" stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" />
          <Tooltip contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', borderRadius: '8px' }} />
          <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6' }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function CVSSChart() {
  const threats = useSelector(state => state.threats.items);

  const cvssRanges = {
    '0-3': 0,
    '3-6': 0,
    '6-9': 0,
    '9-10': 0,
  };

  threats.forEach(threat => {
    const score = threat.cvssScore || 0;
    if (score < 3) cvssRanges['0-3']++;
    else if (score < 6) cvssRanges['3-6']++;
    else if (score < 9) cvssRanges['6-9']++;
    else cvssRanges['9-10']++;
  });

  const data = [
    { range: '0-3', count: cvssRanges['0-3'], fill: '#10b981' },
    { range: '3-6', count: cvssRanges['3-6'], fill: '#f59e0b' },
    { range: '6-9', count: cvssRanges['6-9'], fill: '#ea580c' },
    { range: '9-10', count: cvssRanges['9-10'], fill: '#dc2626' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <h3 className="text-lg font-bold mb-4 dark:text-white">CVSS Score Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="range" stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" />
          <Tooltip contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', borderRadius: '8px' }} />
          <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
