import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode, setAutoRefresh, setRefreshInterval } from '../store/slices/uiSlice';
import { Settings, Moon, RotateCw, Database } from 'lucide-react';

export default function SettingsPage() {
  const dispatch = useDispatch();
  const darkMode = useSelector(state => state.ui.darkMode);
  const autoRefresh = useSelector(state => state.ui.autoRefresh);
  const refreshInterval = useSelector(state => state.ui.refreshInterval);

  return (
    <div className="max-w-2xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Customize your dashboard experience
        </p>
      </div>

      {/* Theme Settings */}
      <SettingCard icon={<Moon size={24} />} title="Theme">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Dark Mode</p>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {darkMode ? 'Enabled' : 'Disabled'}
            </p>
          </div>
          <button
            onClick={() => dispatch(toggleDarkMode())}
            className={`relative w-12 h-6 rounded-full transition ${
              darkMode ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          >
            <div
              className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition ${
                darkMode ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </SettingCard>

      {/* Refresh Settings */}
      <SettingCard icon={<RotateCw size={24} />} title="Auto Refresh">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Auto Refresh Threats</p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {autoRefresh ? 'Enabled' : 'Disabled'}
              </p>
            </div>
            <button
              onClick={() => dispatch(setAutoRefresh(!autoRefresh))}
              className={`relative w-12 h-6 rounded-full transition ${
                autoRefresh ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition ${
                  autoRefresh ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {autoRefresh && (
            <div>
              <label className="block text-sm font-medium mb-2">
                Refresh Interval: {refreshInterval} seconds
              </label>
              <input
                type="range"
                min="30"
                max="300"
                step="10"
                value={refreshInterval}
                onChange={(e) => dispatch(setRefreshInterval(parseInt(e.target.value)))}
                className="w-full"
              />
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-2`}>
                Threats will refresh automatically every {refreshInterval} seconds
              </p>
            </div>
          )}
        </div>
      </SettingCard>

      {/* Data Management */}
      <SettingCard icon={<Database size={24} />} title="Data & Cache">
        <div className="space-y-3">
          <button
            onClick={() => {
              localStorage.clear();
              alert('Cache cleared successfully!');
            }}
            className={`w-full px-4 py-2 rounded-lg font-medium transition ${
              darkMode
                ? 'bg-gray-700 hover:bg-gray-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
            }`}
          >
            Clear Cache
          </button>
          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            This will clear all stored preferences and cached data
          </p>
        </div>
      </SettingCard>

      {/* Info Section */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-blue-50'} p-6 rounded-lg`}>
        <h3 className="font-bold mb-2">About This Dashboard</h3>
        <ul className={`text-sm space-y-1 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
          <li>• Data source: NVD (National Vulnerability Database)</li>
          <li>• Updates: Real-time threat data from official CVE records</li>
          <li>• No AI/ML: Pure data filtering and visualization</li>
          <li>• Frontend-only: No backend server required</li>
        </ul>
      </div>
    </div>
  );
}

function SettingCard({ icon, title, children }) {
  const darkMode = useSelector(state => state.ui.darkMode);

  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow mb-6`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="text-blue-500">{icon}</div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      {children}
    </div>
  );
}
