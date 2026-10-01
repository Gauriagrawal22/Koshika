import React, { useState } from 'react';
import PatientSidebar from './PatientSidebar';
import PatientTopBar from './PatientTopBar';
import Footer from './Footer';
import FloatingAIAssistant from './FloatingAIAssistant';
import { PanelLeftOpen } from 'lucide-react';
import '../styles/patient-theme.css';

const PatientLayout = ({ children }) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="patient-app-wrapper">
      {/* Mobile Drawer Backdrop */}
      {mobileSidebarOpen && (
        <div
          className="patient-backdrop d-lg-none"
          onClick={() => setMobileSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Patient Left Sidebar */}
      <PatientSidebar
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
      />

      {/* Main Content Area */}
      <div className="patient-main-container flex-grow-1 min-vh-100">
        {/* Contextual Top Bar (Matches Doctor & Admin) */}
        <PatientTopBar onToggleSidebar={() => setMobileSidebarOpen(true)} />

        {/* Main Routed Page Content */}
        <main className="content-body flex-grow-1 px-3 px-md-4 px-xl-5 py-4">
          <div className="patient-content-container">
            {children}
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>

      {/* Floating AI Assistant */}
      <FloatingAIAssistant />
    </div>
  );
};

export default PatientLayout;
