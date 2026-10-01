import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { RoleProvider, useRole, ROLES } from './context/RoleContext';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import PatientLayout from './components/PatientLayout';
import DoctorLayout from './components/DoctorLayout';
import FloatingAIAssistant from './components/FloatingAIAssistant';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';

// Auth Pages (Module 1)
import Login from './pages/Login';
import Register from './pages/Register';

// Core Application Pages
import Dashboard from './pages/Dashboard';
import Learn from './pages/Learn';
import LearnAndPlay from './pages/LearnAndPlay';
import AdminDashboard from './pages/AdminDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import PreliminaryAssessment from './pages/PreliminaryAssessment';
import PatientProfile from './pages/PatientProfile';
import MedicalHistory from './pages/MedicalHistory';
import FindDoctors from './pages/FindDoctors';
import HospitalsCentres from './pages/HospitalsCentres';
import Appointments from './pages/Appointments';
import Notifications from './pages/Notifications';
import Patients from './pages/Patients';
import Donors from './pages/Donors';
import Storage from './pages/Storage';
import Staff from './pages/Staff';
import Research from './pages/Research';
import Inventory from './pages/Inventory';
import MLCompatibility from './pages/MLCompatibility';
import MedicalReportOCR from './pages/MedicalReportOCR';
import AIChatbot from './pages/AIChatbot';
import Reports from './pages/Reports';
import Awareness from './pages/Awareness';
import BankHub from './pages/BankHub';
import HelpSupport from './pages/HelpSupport';

// Doctor Workflow Pages
import DoctorPatients from './pages/DoctorPatients';
import DoctorPatientDetail from './pages/DoctorPatientDetail';
import DoctorReportReview from './pages/DoctorReportReview';
import DoctorConsultation from './pages/DoctorConsultation';
import DoctorAppointments from './pages/DoctorAppointments';
import DoctorBankSearch from './pages/DoctorBankSearch';
import DoctorProfile from './pages/DoctorProfile';

// Administrator Workflow Pages
import AdminProfile from './pages/AdminProfile';
import AdminUserManagement from './pages/AdminUserManagement';
import AdminDoctorManagement from './pages/AdminDoctorManagement';
import AdminBankManagement from './pages/AdminBankManagement';
import AdminActivityAudit from './pages/AdminActivityAudit';
import AdminRecordsManagement from './pages/AdminRecordsManagement';
import AdminSettings from './pages/AdminSettings';
import AdminLayout from './components/AdminLayout';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function MainLayout() {
  const { isAuthenticated } = useAuth();
  const { role } = useRole();

  // If user is not authenticated, redirect to authentication page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const routesElement = (
    <Routes>
      {/* Dynamic Root Route based on Authenticated Role */}
      <Route 
        path="/" 
        element={
          role === ROLES.DOCTOR 
            ? <DoctorDashboard /> 
            : role === ROLES.ADMIN 
            ? <AdminDashboard /> 
            : <Dashboard />
        } 
      />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/my-journey" element={<Dashboard />} />
      <Route path="/learn" element={<Learn />} />
      <Route path="/games" element={<LearnAndPlay />} />
      <Route path="/profile" element={<PatientProfile />} />
      <Route path="/my-health/profile" element={<PatientProfile />} />
      <Route path="/my-health/history" element={<MedicalHistory />} />
      <Route path="/ocr-reports" element={<MedicalReportOCR />} />
      <Route path="/preliminary-assessment" element={<PreliminaryAssessment />} />
      <Route path="/ml-match" element={<MLCompatibility />} />
      <Route path="/awareness" element={<Learn />} />
      <Route path="/find-care/doctors" element={<FindDoctors />} />
      <Route path="/doctors" element={<FindDoctors />} />
      <Route path="/find-care/centres" element={<HospitalsCentres />} />
      <Route path="/centres" element={<HospitalsCentres />} />
      <Route path="/hospitals" element={<HospitalsCentres />} />
      <Route path="/bank" element={<BankHub />} />
      <Route path="/bank-hub" element={<BankHub />} />
      <Route path="/appointments" element={<Appointments />} />
      <Route path="/consultations" element={<Appointments />} />
      <Route path="/my-consultations" element={<Appointments />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/help" element={<HelpSupport />} />
      <Route path="/help-support" element={<HelpSupport />} />

      {/* Doctor Workflow Routes */}
      <Route path="/doctor" element={<DoctorDashboard />} />
      <Route path="/doctor/profile" element={<DoctorProfile />} />
      <Route path="/doctor/patients" element={<DoctorPatients />} />
      <Route path="/doctor/patients/:id" element={<DoctorPatientDetail />} />
      <Route path="/doctor/reports" element={<DoctorReportReview />} />
      <Route path="/doctor/consultations" element={<DoctorConsultation />} />
      <Route path="/doctor/appointments" element={<DoctorAppointments />} />
      <Route path="/doctor/banks" element={<DoctorBankSearch />} />

      {/* Administrator Workflow Routes */}
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/profile" element={<AdminProfile />} />
      <Route path="/admin/users" element={<AdminUserManagement />} />
      <Route path="/admin/doctors" element={<AdminDoctorManagement />} />
      <Route path="/admin/patients" element={<DoctorPatients />} />
      <Route path="/admin/banks" element={<AdminBankManagement />} />
      <Route path="/admin/activity" element={<AdminActivityAudit />} />
      <Route path="/admin/records" element={<AdminRecordsManagement />} />
      <Route path="/admin/settings" element={<AdminSettings />} />

      {/* Existing Admin & Operations Routes */}
      <Route path="/patients" element={<Patients />} />
      <Route path="/donors" element={<Donors />} />
      <Route path="/storage" element={<Storage />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/records" element={<AdminRecordsManagement />} />
      <Route path="/research" element={<Research />} />
      <Route path="/staff" element={<Staff />} />
      <Route path="/reports" element={<Reports />} />

      {/* Full Chatbot Page */}
      <Route path="/ai-assistant" element={<AIChatbot />} />
      <Route path="/ai-insights" element={<AIChatbot />} />
    </Routes>
  );

  // If role is PATIENT, render clean Left Sidebar Navigation layout!
  if (role === ROLES.PATIENT) {
    return (
      <PatientLayout>
        {routesElement}
      </PatientLayout>
    );
  }

  // If role is DOCTOR, render clean Left Sidebar Clinical Workspace layout!
  if (role === ROLES.DOCTOR) {
    return (
      <DoctorLayout>
        {routesElement}
      </DoctorLayout>
    );
  }

  // If role is ADMIN, render clean Left Sidebar Admin Platform layout!
  if (role === ROLES.ADMIN) {
    return (
      <AdminLayout>
        {routesElement}
      </AdminLayout>
    );
  }

  // Default fallback layout
  return (
    <div className="app-container">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content Area - Full Width Container */}
      <div className="main-content-wrapper d-flex flex-column flex-grow-1 min-vh-100">
        <main className="content-body app-workspace flex-grow-1 container-fluid px-3 px-lg-5 py-4">
          {routesElement}
        </main>

        {/* Institutional Footer */}
        <Footer />
      </div>

      {/* Floating AI Assistant Button (Bottom-Right) */}
      <FloatingAIAssistant />

      {/* Adaptive Mobile Bottom Navigation Bar (Doctor/Admin) */}
      <BottomNav />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <RoleProvider>
            <LanguageProvider>
              <ScrollToTop />
              <Routes>
                {/* Dedicated Fullscreen Auth Routes (Module 1) */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Authenticated Workspace Application Layout */}
                <Route path="/*" element={<MainLayout />} />
              </Routes>
            </LanguageProvider>
          </RoleProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
