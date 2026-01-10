import React, { useState } from 'react';
import PatientLayout from '../components/PatientLayout';
import BookAppointment from '../components/BookAppointment';
import Chat from '../components/Chat';
import MyAppointments from '../components/MyAppointments';
import PatientSummary from '../components/PatientSummary';


const PatientDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderSection = () => {
    switch (activeSection) {
      case "book":
        return <BookAppointment />;
      case "chat":
        return <Chat />;
      case "myAppointments":
        return <MyAppointments />;
      default:
      return <PatientSummary />;
    }
  };

  return (
    <PatientLayout activeSection={activeSection} setActiveSection={setActiveSection}>
      {renderSection()}
    </PatientLayout>
  );
};

export default PatientDashboard;
