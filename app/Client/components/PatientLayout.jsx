// components/PatientLayout.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/slice/auth';
import { useTheme } from '../src/contexts/ThemeContext';

const PatientLayout = ({ children, activeSection, setActiveSection }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useTheme();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/auth');
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-900 shadow-md hidden sm:block">
        <div className="p-4 text-blue-600 dark:text-blue-400 font-bold text-xl">
          HealthCare+
        </div>
       <nav className="mt-6 space-y-2">
          {[
            { label: 'Dashboard', key: 'dashboard', icon: '📊' },
            { label: 'Book Appointment', key: 'book', icon: '📅' },
            { label: 'My Appointments', key: 'myAppointments', icon: '📋' },
            { label: 'Chat', key: 'chat', icon: '💬' },
          ].map(({ label, key, icon }) => (
            <button
              key={key}
              onClick={() => setActiveSection(key)}
              className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg transition-all duration-200
                ${activeSection === key
                  ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 font-semibold shadow-md'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400'}`}
            >
              <span className="text-xl">{icon}</span>
              <span>{label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="flex items-center justify-between px-6 py-3 bg-white dark:bg-gray-900 shadow">
          <h1 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
            Patient Dashboard
          </h1>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {user?.fullName || 'Patient'}
            </div>
            <div className="relative">
              <button onClick={() => setDropdownOpen(!dropdownOpen)} className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-600 dark:border-blue-400">
                <img src="https://i.pravatar.cc/40" alt="avatar" className="w-full h-full object-cover" />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded shadow-lg py-2 z-50">
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-800">Logout</button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-y-auto text-gray-800 dark:text-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
};

export default PatientLayout;
