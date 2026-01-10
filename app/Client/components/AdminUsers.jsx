// components/AdminUsers.jsx
import React from 'react';

const AdminUsers = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Manage Users</h2>
      {/* Replace with real data table */}
      <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded">
        <thead>
          <tr className="bg-blue-100 dark:bg-blue-950 text-left">
            <th className="py-2 px-4 border-b dark:border-gray-700">Name</th>
            <th className="py-2 px-4 border-b dark:border-gray-700">Email</th>
            <th className="py-2 px-4 border-b dark:border-gray-700">Role</th>
            <th className="py-2 px-4 border-b dark:border-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Dummy user row */}
          <tr>
            <td className="py-2 px-4 border-b dark:border-gray-700">John Doe</td>
            <td className="py-2 px-4 border-b dark:border-gray-700">john@example.com</td>
            <td className="py-2 px-4 border-b dark:border-gray-700">Doctor</td>
            <td className="py-2 px-4 border-b dark:border-gray-700">
              <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Edit</button>
              <button className="bg-red-500 text-white px-3 py-1 ml-2 rounded hover:bg-red-600">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;
