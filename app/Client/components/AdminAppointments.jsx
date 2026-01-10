import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { apiRequest } from '../src/api/client';

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [dateFilter, setDateFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const { accessToken } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!accessToken) return;
    const controller = new AbortController();
    setStatus('loading');
    apiRequest('/appointments', { token: accessToken, signal: controller.signal })
      .then((data) => {
        setAppointments(data);
        setStatus('succeeded');
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        setError(err.message);
        setStatus('failed');
      });

    return () => controller.abort();
  }, [accessToken]);

  const filteredAppointments = appointments.filter((appt) => {
    const appointmentDate = new Date(appt.scheduledAt).toISOString().split('T')[0];
    return (
      (!dateFilter || appointmentDate === dateFilter) &&
      (!statusFilter || appt.status.toLowerCase() === statusFilter.toLowerCase())
    );
  });

  const formatDate = (date) => new Date(date).toLocaleDateString();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">
        Appointments
      </h2>

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="border px-3 py-2 rounded dark:bg-gray-700 dark:text-white"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border px-3 py-2 rounded dark:bg-gray-700 dark:text-white"
        >
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-white dark:bg-gray-800 border dark:border-gray-700 rounded">
          <thead>
            <tr className="bg-blue-100 dark:bg-blue-950 text-left">
              <th className="p-3">#</th>
              <th className="p-3">Patient</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {status === 'loading' && (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500 dark:text-gray-400">
                  Loading appointments...
                </td>
              </tr>
            )}
            {status === 'failed' && (
              <tr>
                <td colSpan="4" className="p-4 text-center text-red-500">
                  {error || 'Failed to load appointments'}
                </td>
              </tr>
            )}
            {status === 'succeeded' && filteredAppointments.length ? (
              filteredAppointments.map((appt, idx) => (
                <tr key={appt._id || idx} className="border-t dark:border-gray-700">
                  <td className="p-3">{idx + 1}</td>
                  <td className="p-3">{appt.patient?.fullName || 'N/A'}</td>
                  <td className="p-3">{formatDate(appt.scheduledAt)}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-white text-sm capitalize ${
                        appt.status === "pending"
                          ? "bg-yellow-500"
                          : appt.status === "completed" || appt.status === "confirmed"
                          ? "bg-green-600"
                          : "bg-red-500"
                      }`}
                    >
                      {appt.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : status === 'succeeded' && (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500 dark:text-gray-400">
                  No appointments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAppointments;
