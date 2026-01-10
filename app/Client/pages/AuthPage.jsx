import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../redux/slice/auth';

const redirectByRole = (role) => {
  switch (role) {
    case 'admin':
      return '/AdminDashboard';
    case 'doctor':
      return '/DoctorDashboard';
    default:
      return '/PatientDashboard';
  }
};

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    role: 'patient',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, status, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      navigate(redirectByRole(user.role), { replace: true });
    }
  }, [user, navigate]);

  const toggleForm = () => setIsLogin(!isLogin);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isLogin) {
      dispatch(loginUser({ email: formData.email, password: formData.password }));
    } else {
      dispatch(registerUser(formData));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 transition-colors duration-200">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8 border border-gray-100 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-center text-blue-600 dark:text-blue-400 mb-6">
          {isLogin ? 'Login to Your Account' : 'Create a New Account'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div>
                <label className="block mb-1 text-gray-700 dark:text-gray-300">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
                />
              </div>
              <div>
                <label className="block mb-1 text-gray-700 dark:text-gray-300">Phone (optional)</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="9876543210"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
                />
              </div>
              <div>
                <label className="block mb-1 text-gray-700 dark:text-gray-300">Register As</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
                >
                  <option value="patient">Patient</option>
                  <option value="doctor">Doctor</option>
                </select>
              </div>
            </>
          )}

          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700 dark:text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold py-2 px-4 rounded transition"
          >
            {status === 'loading' ? 'Please wait...' : isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600 dark:text-gray-400">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
          <button onClick={toggleForm} className="text-blue-600 hover:underline dark:text-blue-400">
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
        <div className="flex justify-center gap-4 mt-4">
          <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded" disabled>
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
