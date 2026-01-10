import React from "react";
import { Link } from "react-router-dom";

const HowItWorks = () => {
  const steps = [
    {
      step: "1",
      title: "Register",
      desc: "Create your account as a patient, doctor, or admin in just a few clicks.",
      icon: "👤",
    },
    {
      step: "2",
      title: "Book & Manage",
      desc: "Login and book appointments with your preferred doctor or manage your schedule.",
      icon: "📅",
    },
    {
      step: "3",
      title: "Consult & Follow Up",
      desc: "Chat with doctors in real-time and maintain your health records easily.",
      icon: "💬",
    },
  ];

  return (
    <section id="how-it-works" className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-20 px-6 md:px-20 transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-gray-100">
            How It <span className="text-blue-600 dark:text-blue-400">Works</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Get started in three simple steps
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((s, i) => (
            <div key={i} className="relative">
              {/* Connector Line */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-20 left-full w-full h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 transform translate-x-4 -translate-y-1/2 z-0"></div>
              )}
              <div className="relative text-center bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-4xl shadow-lg">
                  {s.icon}
                </div>
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-blue-600 dark:bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {s.step}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">{s.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/auth">
            <button className="px-8 py-4 bg-blue-600 dark:bg-blue-500 text-white rounded-xl hover:bg-blue-700 dark:hover:bg-blue-600 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold text-lg">
              Get Started Now
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
