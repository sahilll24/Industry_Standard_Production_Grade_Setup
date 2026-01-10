import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { apiRequest } from '../src/api/client';

const PatientSummary = () => {
  const { accessToken } = useSelector((state) => state.auth);
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!accessToken) return;
    apiRequest('/appointments', { token: accessToken })
      .then(setAppointments)
      .catch((err) => setError(err.message));
  }, [accessToken]);

  const nextAppointment = useMemo(() => {
    const future = appointments
      .filter((appt) => new Date(appt.scheduledAt) > new Date())
      .sort((a, b) => new Date(a.scheduledAt) - new Date(b.scheduledAt));
    return future[0];
  }, [appointments]);

  return (
    <div className="p-6 bg-white dark:bg-gray-800 shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">
        Dashboard Summary
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Appointments */}
        <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200">Total Appointments</h3>
          <p className="text-3xl font-bold mt-2 text-blue-700 dark:text-blue-100">{appointments.length}</p>
        </div>

        {/* Upcoming Appointment */}
        <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">Upcoming Appointment</h3>
          {nextAppointment ? (
            <p className="mt-2">
              <strong>Doctor:</strong> {nextAppointment.doctor?.fullName}<br />
              <strong>Date:</strong> {new Date(nextAppointment.scheduledAt).toLocaleDateString()}<br />
              <strong>Time:</strong> {new Date(nextAppointment.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}<br />
              <strong>Status:</strong> {nextAppointment.status}
            </p>
          ) : (
            <p className="mt-2 text-gray-600">No upcoming appointments</p>
          )}
        </div>

        <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-200">Need help?</h3>
          <p className="mt-2">
            Start a conversation with your doctor anytime from the chat section.
          </p>
        </div>
      </div>
      {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
    </div>
  );
};

export default PatientSummary;
