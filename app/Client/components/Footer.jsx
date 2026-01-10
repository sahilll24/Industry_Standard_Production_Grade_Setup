import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-300 py-12 px-6 md:px-20 transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <h3 className="text-3xl font-bold text-blue-400 mb-4">HealthCare+</h3>
            <p className="max-w-md text-gray-400 leading-relaxed">
              Your one-stop solution for managing appointments, consultations, and medical records securely. 
              Experience seamless healthcare management.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
              <li><Link to="/#features" className="hover:text-blue-400 transition-colors">Features</Link></li>
              <li><Link to="/#how-it-works" className="hover:text-blue-400 transition-colors">How It Works</Link></li>
              <li><Link to="/auth" className="hover:text-blue-400 transition-colors">Login / Register</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Support</h4>
            <ul className="space-y-2">
              <li><a href="mailto:support@healthcare.com" className="hover:text-blue-400 transition-colors">Email Support</a></li>
              <li><a href="tel:+1234567890" className="hover:text-blue-400 transition-colors">Phone: +1 (234) 567-890</a></li>
              <li className="text-gray-500">Available 24/7</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} HealthCare+. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
