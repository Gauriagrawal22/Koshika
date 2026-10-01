import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminTopBar from './AdminTopBar';
import Footer from './Footer';
import { PanelLeftOpen } from 'lucide-react';
import '../styles/admin-theme.css';

const AdminLayout = ({ children }) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="admin-app-wrapper">
      {/* Mobile Drawer Backdrop */}
      {mobileSidebarOpen && (
        <div
          className="admin-backdrop d-lg-none"
          onClick={() => setMobileSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Admin Left Sidebar (Persistent hierarchy) */}
      <AdminSidebar
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
      />

      {/* Main Admin Content Area */}
      <div className="admin-main-container flex-grow-1 min-vh-100">
        {/* Compact Admin Top Bar */}
        <AdminTopBar onToggleSidebar={() => setMobileSidebarOpen(true)} />

        {/* Main Routed Page Content */}
        <main className="content-body flex-grow-1 px-3 px-md-4 px-xl-5 py-4">
          <div className="admin-content-container">
            {children}
          </div>
        </main>

        {/* Standard Institutional Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default AdminLayout;
