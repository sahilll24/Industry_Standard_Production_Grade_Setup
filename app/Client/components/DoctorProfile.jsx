import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { apiRequest } from '../src/api/client';
import { fetchProfile } from '../redux/slice/auth';

const DoctorProfile = () => {
  const { user, accessToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [profile, setProfile] = useState({
    fullName: '',
    specialization: '',
    email: '',
    phone: '',
  });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      setProfile({
        fullName: user.fullName || '',
        specialization: user.specialization || '',
        email: user.email || '',
        phone: user.phone || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!accessToken || !user) {
      setError('Not authenticated. Please login again.');
      return;
    }

    const userId = user?.id || user?._id;
    if (!userId) {
      setError('User ID not found. Please refresh the page and login again.');
      console.error('User object:', user);
      return;
    }

    // Validate required fields
    if (!profile.fullName || !profile.fullName.trim()) {
      setError('Full name is required');
      return;
    }

    try {
      setStatus('loading');
      setError(null);
      
      // Don't send email in update request (it's not updatable)
      const { email, ...updateData } = profile;
      
      console.log('Updating profile for user:', userId, 'with data:', updateData);
      
      const updatedUser = await apiRequest(`/users/${userId}`, {
        method: 'PATCH',
        token: accessToken,
        body: updateData,
      });
      
      console.log('Profile update response:', updatedUser);
      
      // Refresh user profile in Redux to get updated data
      await dispatch(fetchProfile());
      
      setStatus('succeeded');
      alert("Profile updated successfully!");
    } catch (err) {
      console.error('Profile update error:', err);
      const errorMessage = err.status === 404 
        ? `Profile endpoint not found. Please check if the server is running. (${err.url || 'unknown URL'})`
        : err.message || 'Failed to update profile. Please try again.';
      setError(errorMessage);
      setStatus('failed');
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-6 rounded shadow">
      <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">
        Doctor Profile
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="fullName"
          type="text"
          value={profile.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          required
          className="w-full px-4 py-2 rounded border dark:bg-gray-700 dark:text-white"
        />
        <input
          name="specialization"
          type="text"
          value={profile.specialization}
          onChange={handleChange}
          placeholder="Specialization"
          className="w-full px-4 py-2 rounded border dark:bg-gray-700 dark:text-white"
        />
        <input
          name="email"
          type="email"
          value={profile.email}
          disabled
          placeholder="Email"
          className="w-full px-4 py-2 rounded border dark:bg-gray-700 dark:text-white bg-gray-100 dark:bg-gray-900 cursor-not-allowed"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400">Email cannot be changed</p>
        <input
          name="phone"
          type="tel"
          value={profile.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full px-4 py-2 rounded border dark:bg-gray-700 dark:text-white"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:bg-blue-300"
        >
          {status === 'loading' ? 'Saving...' : 'Save Profile'}
        </button>
      </form>
    </div>
  );
};

export default DoctorProfile;
