import React, { useState } from 'react';
import DoctorSidebar from './DoctorSidebar';
import DoctorTopBar from './DoctorTopBar';
import Footer from './Footer';
import FloatingAIAssistant from './FloatingAIAssistant';
import { PanelLeftOpen } from 'lucide-react';
import '../styles/doctor-theme.css';

const DoctorLayout = ({ children }) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="doctor-app-wrapper">
      {/* Mobile Drawer Backdrop */}
      {mobileSidebarOpen && (
        <div
          className="doctor-backdrop d-lg-none"
          onClick={() => setMobileSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Doctor Left Sidebar (Persistent hierarchy) */}
      <DoctorSidebar
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
      />

      {/* Main Clinical Content Area */}
      <div className="doctor-main-container flex-grow-1 min-vh-100">
        {/* Minimal Contextual Top Bar */}
        <DoctorTopBar onToggleSidebar={() => setMobileSidebarOpen(true)} />

        {/* Main Routed Page Content */}
        <main className="content-body flex-grow-1 px-3 px-md-4 px-xl-5 py-4">
          <div className="doctor-content-container">
            {children}
          </div>
        </main>

        {/* Standard Footer */}
        <Footer />
      </div>

      {/* Contextual Floating KOSHIKA Clinical Copilot */}
      <FloatingAIAssistant />
    </div>
  );
};

export default DoctorLayout;
