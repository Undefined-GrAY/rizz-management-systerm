import { useState, useEffect } from 'react';
import {  Outlet, useNavigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { MobileHeader } from './MobileHeader';
import { DemoBanner } from './DemoWarningModal';

export function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Close sidebar on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && sidebarOpen) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [sidebarOpen]);

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [sidebarOpen]);

  return (
    <div className="flex h-screen overflow-hidden">
    
      {/* Overlay - Only on mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 xl:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar - Slides from left */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area - Pushes right when sidebar opens */}
      <div 
        className={`
          flex-1 flex flex-col overflow-hidden
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'lg:translate-x-0 translate-x-72' : 'translate-x-0'}
        `}
      >
        {/* Mobile Header - Hidden on desktop */}
        <MobileHeader onMenuClick={() => setSidebarOpen(true)} onBack={() => navigate("/bookings")} />
         <DemoBanner/>
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950">
          <Outlet />
        </main>
      </div>
    </div>
  );
}