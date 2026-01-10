import React, { useState } from 'react';

const dummyReports = [
  { id: 1, title: 'Revenue Report', type: 'Finance', date: '2025-08-01' },
  { id: 2, title: 'Appointment Stats', type: 'Appointments', date: '2025-08-08' },
  { id: 3, title: 'User Growth', type: 'Users', date: '2025-08-07' },
  { id: 4, title: 'System Logs', type: 'System', date: '2025-08-03' },
];

const AdminReports = () => {
  const [typeFilter, setTypeFilter] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const filteredReports = dummyReports.filter((report) => {
    const reportDate = new Date(report.date);
    const isAfterStart = startDate ? new Date(startDate) <= reportDate : true;
    const isBeforeEnd = endDate ? new Date(endDate) >= reportDate : true;
    const matchesType = typeFilter ? report.type === typeFilter : true;

    return isAfterStart && isBeforeEnd && matchesType;
  });

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">
        Reports
      </h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="border px-3 py-2 rounded dark:bg-gray-700 dark:text-white"
        >
          <option value="">All Types</option>
          <option value="Finance">Finance</option>
          <option value="Appointments">Appointments</option>
          <option value="Users">Users</option>
          <option value="System">System</option>
        </select>

        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border px-3 py-2 rounded dark:bg-gray-700 dark:text-white"
          placeholder="Start Date"
        />

        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border px-3 py-2 rounded dark:bg-gray-700 dark:text-white"
          placeholder="End Date"
        />
      </div>

      {/* Reports Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 border dark:border-gray-700 rounded">
          <thead>
            <tr className="bg-blue-100 dark:bg-blue-950 text-left">
              <th className="p-3">#</th>
              <th className="p-3">Title</th>
              <th className="p-3">Type</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.length ? (
              filteredReports.map((report) => (
                <tr key={report.id} className="border-t dark:border-gray-700">
                  <td className="p-3">{report.id}</td>
                  <td className="p-3">{report.title}</td>
                  <td className="p-3">{report.type}</td>
                  <td className="p-3">{report.date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500 dark:text-gray-400">
                  No reports found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminReports;
