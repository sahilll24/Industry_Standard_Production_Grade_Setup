import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { apiRequest } from '../src/api/client';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const { accessToken } = useSelector((state) => state.auth);

  const loadUsers = useCallback(async () => {
    if (!accessToken) return;
    setStatus('loading');
    try {
      const data = await apiRequest('/admin/users', { token: accessToken });
      setUsers(data);
      setStatus('succeeded');
    } catch (err) {
      setError(err.message);
      setStatus('failed');
    }
  }, [accessToken]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleUpdate = async (userId, changes) => {
    try {
      await apiRequest(`/admin/users/${userId}`, {
        method: 'PATCH',
        token: accessToken,
        body: changes,
      });
      loadUsers();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Manage Users</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {users.map(user => (
              <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{user.fullName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                  <select
                    value={user.role}
                    onChange={(e) => handleUpdate(user._id, { role: e.target.value })}
                    className="border rounded px-2 py-1 dark:bg-gray-900"
                  >
                    <option value="admin">Admin</option>
                    <option value="doctor">Doctor</option>
                    <option value="patient">Patient</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {user.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 space-x-2">
                  <button
                    className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
                    onClick={() => handleUpdate(user._id, { isActive: !user.isActive })}
                  >
                    {user.isActive ? 'Disable' : 'Enable'}
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500 dark:text-gray-400">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {(status === 'loading') && <p className="mt-4 text-gray-500 text-sm">Loading users...</p>}
      {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default ManageUsers;
