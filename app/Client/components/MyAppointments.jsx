// components/MyAppointments.jsx
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { apiRequest } from "../src/api/client";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
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

  const formatDate = (date) => new Date(date).toLocaleDateString();
  const formatTime = (date) => new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 p-4 rounded shadow-md">
      <h2 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400">My Appointments</h2>

      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
            <th className="p-2 border">Doctor</th>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Time</th>
            <th className="p-2 border">Status</th>
          </tr>
        </thead>
          <tbody>
          {appointments.map((appt) => (
            <tr key={appt._id} className="text-center text-gray-800 dark:text-gray-100">
              <td className="p-2 border">{appt.doctor?.fullName}</td>
              <td className="p-2 border">{formatDate(appt.scheduledAt)}</td>
              <td className="p-2 border">{formatTime(appt.scheduledAt)}</td>
              <td className="p-2 border">{appt.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {status === "loading" && <p className="text-center mt-4 text-gray-500">Loading...</p>}
      {error && <p className="text-center mt-4 text-red-500">{error}</p>}
      {status === "succeeded" && appointments.length === 0 && (
        <p className="text-center mt-4 text-gray-500 dark:text-gray-400">No appointments found</p>
      )}
    </div>
  );
};

export default MyAppointments;
