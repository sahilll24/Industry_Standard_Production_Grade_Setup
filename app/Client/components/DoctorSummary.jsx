import React, { useEffect, useMemo, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend, Filler);

import { useSelector } from 'react-redux';
import { apiRequest } from '../src/api/client';

const DoctorSummary = () => {
  const { accessToken } = useSelector((state) => state.auth);
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!accessToken) return;
    apiRequest('/appointments', { token: accessToken })
      .then(setAppointments)
      .catch((err) => setError(err.message));
  }, [accessToken]);

  const stats = useMemo(() => {
    const upcomingAppointments = appointments.filter(
      (appt) => new Date(appt.scheduledAt) > new Date()
    ).length;
    const uniquePatients = new Set(
      appointments
        .map((appt) => appt.patient?._id || appt.patient)
        .filter(Boolean)
    );
    return {
      totalAppointments: appointments.length,
      upcomingAppointments,
      patientsTreated: uniquePatients.size,
    };
  }, [appointments]);

  const lineChartData = useMemo(() => {
    const grouped = appointments.reduce((acc, appt) => {
      const month = new Date(appt.scheduledAt).toLocaleString('default', { month: 'short' });
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {});

    const labels = Object.keys(grouped);
    return {
      labels,
      datasets: [
        {
          label: 'Appointments',
          data: labels.map((label) => grouped[label]),
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4,
          fill: true,
        },
      ],
    };
  }, [appointments]);

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Appointments Over Time' },
    },
  };

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
        Welcome back, Doctor 👨‍⚕️
      </h2>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Appointments</h3>
          <p className="text-2xl font-semibold text-blue-600 dark:text-blue-400">{stats.totalAppointments}</p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Upcoming Appointments</h3>
          <p className="text-2xl font-semibold text-green-600 dark:text-green-400">{stats.upcomingAppointments}</p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Patients Treated</h3>
          <p className="text-2xl font-semibold text-purple-600 dark:text-purple-400">{stats.patientsTreated}</p>
        </div>
      </div>

      {/* Line Chart */}
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
        {lineChartData.labels.length ? (
          <Line data={lineChartData} options={lineChartOptions} />
        ) : (
          <p className="text-gray-500 text-center">No appointment data to visualize yet.</p>
        )}
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3">Quick Actions</h3>
        <div className="flex flex-wrap gap-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">View Appointments</button>
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Open Chat</button>
          <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">Edit Profile</button>
        </div>
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default DoctorSummary;
