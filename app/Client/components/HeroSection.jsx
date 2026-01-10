// components/HeroSection.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const HeroSection = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <section id="home" className="min-h-screen flex flex-col md:flex-row items-center justify-between px-8 md:px-20 py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-200">
      {/* Text Section */}
      <div className="md:w-1/2 mb-12 md:mb-0 space-y-6">
        <div className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold mb-4">
          🏥 Trusted Healthcare Platform
        </div>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
          <span className="text-blue-600 dark:text-blue-400">Seamless</span>{' '}
          <span className="text-gray-800 dark:text-gray-100">Healthcare</span>
          <br />
          <span className="text-gray-700 dark:text-gray-300">at Your Fingertips</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl">
          Book appointments instantly, chat with doctors in real-time, and manage your health records securely—all in one place.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          {!user ? (
            <>
              <Link to="/auth">
                <button className="px-8 py-4 bg-blue-600 dark:bg-blue-500 text-white rounded-xl hover:bg-blue-700 dark:hover:bg-blue-600 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold text-lg">
                  Get Started
                </button>
              </Link>
              <Link to="/auth">
                <button className="px-8 py-4 border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all transform hover:scale-105 font-semibold text-lg">
                  Learn More
                </button>
              </Link>
            </>
          ) : (
            <Link to={user.role === 'doctor' ? '/DoctorDashboard' : user.role === 'admin' ? '/AdminDashboard' : '/PatientDashboard'}>
              <button className="px-8 py-4 bg-blue-600 dark:bg-blue-500 text-white rounded-xl hover:bg-blue-700 dark:hover:bg-blue-600 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold text-lg">
                Go to Dashboard
              </button>
            </Link>
          )}
        </div>
        <div className="flex items-center gap-8 pt-8 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>24/7 Available</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Secure & Private</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Easy to Use</span>
          </div>
        </div>
      </div>

      {/* Image Section */}
      <div className="md:w-1/2 flex justify-center items-center">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-3xl blur-3xl opacity-20 dark:opacity-10"></div>
          <img 
            src="/img.png" 
            alt="Doctor Consultation Illustration" 
            className="relative w-full max-w-lg mx-auto drop-shadow-2xl rounded-2xl transform hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
