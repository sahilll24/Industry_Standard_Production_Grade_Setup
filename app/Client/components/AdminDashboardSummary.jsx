import React, { useEffect, useState } from 'react';
import chart from '../src/assets/admin_summary_chart.png';
import { useSelector } from 'react-redux';
import { apiRequest } from '../src/api/client';

const AdminDashboardSummary = () => {
  const [stats, setStats] = useState({ doctors: 0, patients: 0, appointments: 0 });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const { accessToken } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!accessToken) return;
    setStatus('loading');
    apiRequest('/admin/summary', { token: accessToken })
      .then((data) => {
        setStats(data);
        setStatus('succeeded');
      })
      .catch((err) => {
        setError(err.message);
        setStatus('failed');
      });
  }, [accessToken]);

  const statCards = [
    { 
      label: 'Total Doctors', 
      count: stats.doctors, 
      icon: '👨‍⚕️',
      gradient: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    { 
      label: 'Total Patients', 
      count: stats.patients, 
      icon: '👥',
      gradient: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    },
    { 
      label: 'Appointments', 
      count: stats.appointments, 
      icon: '📅',
      gradient: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">Dashboard Overview</h2>
        <p className="text-gray-600 dark:text-gray-400">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat) => (
          <div 
            key={stat.label} 
            className={`${stat.bgColor} p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-2xl shadow-lg`}>
                {stat.icon}
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-2">{stat.label}</p>
            <p className="text-4xl font-bold text-gray-800 dark:text-gray-100">{stat.count}</p>
          </div>
        ))}
      </div>

      {status === 'loading' && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Loading stats...</p>
        </div>
      )}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      {/* Chart */}
      {status === 'succeeded' && (
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Overview Chart</h3>
          <div className="flex justify-center">
            <img
              src={chart}
              alt="Summary Chart"
              className="w-full max-w-2xl rounded-lg shadow-md"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardSummary;
