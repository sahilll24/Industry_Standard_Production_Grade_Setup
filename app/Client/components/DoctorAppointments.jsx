import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { apiRequest } from '../src/api/client';

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const { accessToken } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!accessToken) return;
    const controller = new AbortController();
    setStatus("loading");
    apiRequest("/appointments", { token: accessToken, signal: controller.signal })
      .then((data) => {
        setAppointments(data);
        setStatus("succeeded");
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError(err.message);
        setStatus("failed");
      });

    return () => controller.abort();
  }, [accessToken]);

  const filteredAppointments = appointments.filter((appointment) => {
    const appointmentDate = new Date(appointment.scheduledAt).toISOString().split('T')[0];
    const matchesDate = filterDate ? appointmentDate === filterDate : true;
    const matchesStatus = filterStatus ? appointment.status === filterStatus : true;
    return matchesDate && matchesStatus;
  });

  const formatDate = (date) => new Date(date).toLocaleDateString();
  const formatTime = (date) => new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 p-4 rounded shadow">
      <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">
        Appointments
      </h2>

      {/* Filter Section */}
      <div className="flex flex-wrap gap-4 mb-4">
        <div>
          <label className="block text-sm mb-1 dark:text-gray-200">Filter by Date:</label>
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="px-3 py-2 rounded border dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm mb-1 dark:text-gray-200">Filter by Status:</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 rounded border dark:bg-gray-700 dark:text-white"
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Appointment Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto text-left">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white">
              <th className="px-4 py-2">Patient</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Time</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {status === "loading" && (
              <tr>
                <td colSpan="4" className="px-4 py-4 text-center text-gray-500">
                  Loading appointments...
                </td>
              </tr>
            )}
            {status === "failed" && (
              <tr>
                <td colSpan="4" className="px-4 py-4 text-center text-red-500">
                  {error || "Failed to load appointments"}
                </td>
              </tr>
            )}
            {status === "succeeded" && filteredAppointments.length > 0 ? (
              filteredAppointments.map((appt) => (
                <tr
                  key={appt._id}
                  className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <td className="px-4 py-2">{appt.patient?.fullName || "N/A"}</td>
                  <td className="px-4 py-2">{formatDate(appt.scheduledAt)}</td>
                  <td className="px-4 py-2">{formatTime(appt.scheduledAt)}</td>
                  <td className="px-4 py-2 capitalize">{appt.status}</td>
                </tr>
              ))
            ) : status === "succeeded" && (
              <tr>
                <td colSpan="4" className="px-4 py-4 text-center text-gray-500">
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

export default DoctorAppointments;
