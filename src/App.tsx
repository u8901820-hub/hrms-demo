import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { TopNavbar } from './components/TopNavbar';
import { DashboardView } from './views/DashboardView';
import { EmployeesView } from './views/EmployeesView';
import { AttendanceView } from './views/AttendanceView';
import { LeavesView } from './views/LeavesView';
import { PayrollView } from './views/PayrollView';
import { RecruitmentView } from './views/RecruitmentView';
import { PerformanceView } from './views/PerformanceView';
import { OperationsView } from './views/OperationsView';
import { SuperAdminView } from './views/SuperAdminView';
import { AuditLogsView } from './views/AuditLogsView';
import { ReportsView } from './views/ReportsView';
import { SettingsView } from './views/SettingsView';
import { MobilePreviewView } from './views/MobilePreviewView';
import { PublicWebsiteView } from './views/PublicWebsiteView';
import { LoginView } from './views/LoginView';
import { CheckCircle2, AlertCircle, Info, Sparkles } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { currentView, toastMessage, isAuthenticated } = useApp();
  const [collapsed, setCollapsed] = useState(false);

  // If user is not authenticated, render the secure Login Page
  if (!isAuthenticated) {
    return (
      <div className="relative">
        <LoginView />
        {toastMessage && (
          <div className="fixed bottom-6 right-6 bg-[#14213D] text-white px-4 py-3 rounded-xl shadow-2xl z-50 flex items-center gap-2.5 text-xs font-semibold border border-slate-700 animate-in fade-in slide-in-from-bottom-3">
            <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    );
  }

  // If in Public Website mode, render the public SaaS landing directly
  if (currentView === 'public_website') {
    return (
      <div className="relative">
        <PublicWebsiteView />
        {/* Floating Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 bg-[#14213D] text-white px-4 py-3 rounded-xl shadow-2xl z-50 flex items-center gap-2.5 text-xs font-semibold border border-slate-700 animate-in fade-in slide-in-from-bottom-3">
            <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#F7F9FC]">
      {/* Dynamic Collapsible Sidebar */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Sticky Top Navbar */}
        <TopNavbar />

        {/* View Content Body */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {currentView === 'dashboard' && <DashboardView />}
            {currentView === 'employees' && <EmployeesView />}
            {currentView === 'attendance' && <AttendanceView />}
            {currentView === 'leaves' && <LeavesView />}
            {currentView === 'payroll' && <PayrollView />}
            {currentView === 'recruitment' && <RecruitmentView />}
            {currentView === 'performance' && <PerformanceView />}
            {(currentView === 'expenses' || currentView === 'assets' || currentView === 'helpdesk') && <OperationsView />}
            {currentView === 'super_admin' && <SuperAdminView />}
            {currentView === 'audit_logs' && <AuditLogsView />}
            {currentView === 'reports' && <ReportsView />}
            {currentView === 'settings' && <SettingsView />}
            {currentView === 'mobile_preview' && <MobilePreviewView />}
          </div>
        </main>
      </div>

      {/* Floating Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-[#14213D] text-white px-4 py-3 rounded-xl shadow-2xl z-50 flex items-center gap-2.5 text-xs font-semibold border border-slate-700 animate-in fade-in slide-in-from-bottom-3">
          <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
