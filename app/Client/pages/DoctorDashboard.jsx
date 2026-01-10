import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import DoctorProfile from '../components/DoctorProfile';
import DoctorAppointments from '../components/DoctorAppointments';
import DoctorChat from '../components/DoctorChat';
 import DoctorSummary from '../components/DoctorSummary';

const DoctorDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderSection = () => {
    switch (activeSection) {
      case "appointments":
        return <DoctorAppointments />;
      case "chat":
        return <DoctorChat />;
      case "profile":
        return <DoctorProfile />;
      default:
        return <DoctorSummary />;
    }
  };

  return (
    <DashboardLayout activeSection={activeSection} setActiveSection={setActiveSection}>
      {renderSection()}
    </DashboardLayout>
  );
};

export default DoctorDashboard;
