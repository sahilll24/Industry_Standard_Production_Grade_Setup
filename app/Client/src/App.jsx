import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Landing from "../pages/Landing";
import DoctorDashboard from "../pages/DoctorDashboard";
import AdminDashboard from "../pages/AdminDashboard";
import PatientDashboard from "../pages/PatientDashboard";
import AuthPage from "../pages/AuthPage";
import HeroSection from "../components/HeroSection";
import { Routes, Route } from "react-router-dom";
import './App.css';
import ProtectedRoute from '../components/ProtectedRoute';
import { fetchProfile } from '../redux/slice/auth';

function App() {
  const dispatch = useDispatch();
  const { user, accessToken } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user && accessToken) {
      dispatch(fetchProfile());
    }
  }, [user, accessToken, dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/DoctorDashboard"
          element={
            <ProtectedRoute roles={['doctor']}>
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/AdminDashboard"
          element={
            <ProtectedRoute roles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/PatientDashboard"
          element={
            <ProtectedRoute roles={['patient']}>
              <PatientDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
