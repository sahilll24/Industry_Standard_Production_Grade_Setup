import React, { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import AdminDashboardSummary from '../components/AdminDashboardSummary';
 import ManageUsers from '../components/ManageUsers';
import AdminAppointments from '../components/AdminAppointments';
 import AdminReports from '../components/AdminReports';
 import AdminProfile from '../components/AdminProfile';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderSection = () => {
    switch (activeSection) {
      case 'users':
        return <ManageUsers />;
      case 'appointments':
        return <AdminAppointments />;
      case 'reports':
        return <AdminReports />;
      case 'profile':
        return <AdminProfile />;
      default:
        return <AdminDashboardSummary />;
    }
  };

  return (
    <AdminLayout activeSection={activeSection} setActiveSection={setActiveSection}>
      {renderSection()}
    </AdminLayout>
  );
};

export default AdminDashboard;
