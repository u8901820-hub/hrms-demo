import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole, TenantId } from '../types';
import { 
  Search, 
  Bell, 
  UserCheck, 
  Building2, 
  ChevronDown, 
  ShieldAlert, 
  Sparkles, 
  CheckCircle, 
  Laptop, 
  ExternalLink,
  Smartphone,
  Globe,
  SlidersHorizontal,
  X,
  LogOut
} from 'lucide-react';

export const TopNavbar: React.FC = () => {
  const { 
    currentUser, 
    switchRole, 
    currentTenant, 
    switchTenant, 
    tenants, 
    searchQuery, 
    setSearchQuery,
    notificationsCount,
    clearNotifications,
    notificationsList,
    currentView,
    setCurrentView,
    logout
  } = useApp();

  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showTenantMenu, setShowTenantMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);

  const roles: Array<{ role: UserRole; label: string; badge: string; desc: string }> = [
    { role: 'super_admin', label: 'SaaS Super Admin', badge: 'Cloud Ops', desc: 'Platform billing, all tenants, zero employee PII' },
    { role: 'company_owner', label: 'Company Owner / Exec', badge: 'Executive', desc: 'High-level business reports, executive control' },
    { role: 'hr_admin', label: 'HR Admin (Full Access)', badge: 'Admin', desc: 'Full HR workforce, leaves, hiring & policies' },
    { role: 'payroll_admin', label: 'Payroll Admin', badge: 'Finance', desc: 'Salary formulas, tax deductions, ACH release' },
    { role: 'manager', label: 'Department Manager', badge: 'Team Lead', desc: 'Team attendance, approvals, reviews' },
    { role: 'team_lead', label: 'Team Leader', badge: 'Projects', desc: 'Sprint timesheets & peer reviews' },
    { role: 'employee', label: 'Employee (Self-Service)', badge: 'ESS Portal', desc: 'Clock-in/out, apply leave, payslips, claims' },
    { role: 'recruiter', label: 'Talent Recruiter', badge: 'Talent ATS', desc: 'Candidate pipelines, jobs, interview stages' }
  ];

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-20 shadow-xs">
      {/* Left Search Bar with dynamic filter */}
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <div className="relative w-full">
          <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search employees, payroll runs, leaves, policies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#F7F9FC] text-sm text-[#172033] pl-9 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-[#4361EE] focus:ring-2 focus:ring-[#4361EE]/10 transition-all placeholder:text-slate-400"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X size={15} />
            </button>
          )}
        </div>
      </div>

      {/* Right Controls: Tenant Switcher, Role Persona Switcher, Notifications, Quick Actions */}
      <div className="flex items-center gap-3">
        {/* Multi-Tenant Switcher (Shows SaaS multi-tenancy) */}
        <div className="relative">
          <button
            onClick={() => {
              setShowTenantMenu(!showTenantMenu);
              setShowRoleMenu(false);
              setShowNotifMenu(false);
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors"
          >
            <Building2 size={14} className="text-[#4361EE]" />
            <span className="hidden sm:inline">{currentTenant.name}</span>
            <ChevronDown size={14} className="text-slate-400" />
          </button>

          {showTenantMenu && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-slate-100 p-2 z-50">
              <div className="px-3 py-2 border-b border-slate-100">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Multi-Tenant Isolation</p>
                <p className="text-xs text-slate-600">Switch company workspace context</p>
              </div>
              <div className="space-y-1 mt-1">
                {tenants.map(t => (
                  <button
                    key={t.id}
                    onClick={() => {
                      switchTenant(t.id);
                      setShowTenantMenu(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between transition-colors ${
                      t.id === currentTenant.id ? 'bg-[#EEF4FF] text-[#4361EE] font-semibold' : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div>
                      <p className="font-medium text-slate-800">{t.name}</p>
                      <p className="text-[10px] text-slate-400">{t.totalEmployees} employees • {t.currency}</p>
                    </div>
                    {t.id === currentTenant.id && <CheckCircle size={14} className="text-[#4361EE]" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Live Role Switcher (Crucial for testing all 8 role experiences effortlessly) */}
        <div className="relative">
          <button
            onClick={() => {
              setShowRoleMenu(!showRoleMenu);
              setShowTenantMenu(false);
              setShowNotifMenu(false);
            }}
            className="flex items-center gap-2 bg-[#EEF4FF] hover:bg-blue-100/80 text-[#4361EE] px-3 py-1.5 rounded-lg text-xs font-bold transition-all border border-blue-200"
          >
            <UserCheck size={14} />
            <span className="hidden md:inline">Role: {currentUser.role.replace('_', ' ').toUpperCase()}</span>
            <span className="md:hidden">Role</span>
            <ChevronDown size={14} />
          </button>

          {showRoleMenu && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-slate-100 p-2 z-50">
              <div className="px-3 py-2 border-b border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#4361EE]">Instant Persona Switcher</span>
                  <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">8 Roles Ready</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">Test NattonFlow HR through each user perspective</p>
              </div>
              <div className="max-h-80 overflow-y-auto space-y-1 mt-1">
                {roles.map(r => (
                  <button
                    key={r.role}
                    onClick={() => {
                      switchRole(r.role);
                      setShowRoleMenu(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors flex items-start justify-between ${
                      r.role === currentUser.role ? 'bg-[#EEF4FF] border border-blue-200' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-800">{r.label}</span>
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 font-medium">
                          {r.badge}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">{r.desc}</p>
                    </div>
                    {r.role === currentUser.role && <CheckCircle size={14} className="text-[#4361EE] flex-shrink-0 mt-0.5" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifMenu(!showNotifMenu);
              setShowRoleMenu(false);
              setShowTenantMenu(false);
            }}
            className="relative p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <Bell size={18} />
            {notificationsCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#DC2626] ring-2 ring-white"></span>
            )}
          </button>

          {showNotifMenu && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-slate-100 p-3 z-50">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                <span className="text-xs font-bold text-slate-800">Notifications ({notificationsCount})</span>
                <button
                  onClick={clearNotifications}
                  className="text-[11px] text-[#4361EE] hover:underline font-medium"
                >
                  Mark all read
                </button>
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {notificationsList.map(n => (
                  <div key={n.id} className={`p-2 rounded-lg text-xs ${n.read ? 'bg-slate-50 text-slate-500' : 'bg-blue-50/50 text-slate-800 border-l-2 border-[#4361EE]'}`}>
                    <p className="font-medium">{n.title}</p>
                    <p className="text-[10px] text-slate-400 mt-1">{n.time}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Fast Switch: Mobile App & Website Buttons */}
        <div className="hidden lg:flex items-center gap-1.5 border-l border-slate-200 pl-3">
          <button
            onClick={() => setCurrentView('mobile_preview')}
            title="Preview NattonFlow Mobile App"
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors border border-slate-200"
          >
            <Smartphone size={14} className="text-purple-600" />
            <span>Mobile App</span>
          </button>

          <button
            onClick={() => setCurrentView('public_website')}
            title="Preview Public SaaS Website"
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors border border-slate-200"
          >
            <Globe size={14} className="text-sky-600" />
            <span>Public SaaS</span>
          </button>

          <button
            onClick={logout}
            title="Secure Lock / Logout"
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors border border-rose-200"
          >
            <LogOut size={14} />
            <span className="hidden xl:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};
