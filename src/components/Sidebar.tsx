import React, { useState } from 'react';
import { useApp, AppView } from '../context/AppContext';
import { 
  Building2, 
  Users, 
  Clock, 
  Calendar, 
  CreditCard, 
  Briefcase, 
  TrendingUp, 
  Receipt, 
  Laptop, 
  LifeBuoy, 
  ShieldCheck, 
  BarChart3, 
  Smartphone, 
  Globe, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles,
  Layers,
  Settings,
  LogOut,
  Bell,
  Search,
  CheckCircle2,
  AlertTriangle,
  Lock,
  ChevronDown
} from 'lucide-react';
import { UserRole } from '../types';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (c: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed }) => {
  const { currentView, setCurrentView, currentUser, currentTenant } = useApp();

  const role = currentUser.role;

  // Filter modules based on role permissions
  const navItems: Array<{ id: AppView; label: string; icon: any; roles?: UserRole[]; badge?: string }> = [
    { id: 'dashboard', label: 'Overview', icon: BarChart3 },
    { 
      id: 'super_admin', 
      label: 'Super Admin Hub', 
      icon: ShieldCheck, 
      roles: ['super_admin'],
      badge: 'SaaS'
    },
    { 
      id: 'employees', 
      label: 'People & Teams', 
      icon: Users,
      roles: ['super_admin', 'company_owner', 'hr_admin', 'manager', 'team_lead', 'payroll_admin']
    },
    { 
      id: 'attendance', 
      label: 'Attendance & Shifts', 
      icon: Clock 
    },
    { 
      id: 'leaves', 
      label: 'Time Off & Leave', 
      icon: Calendar,
      badge: 'Workflows'
    },
    { 
      id: 'payroll', 
      label: 'Payroll & Compensation', 
      icon: CreditCard,
      roles: ['super_admin', 'company_owner', 'payroll_admin', 'hr_admin', 'employee', 'manager', 'team_lead'],
      badge: role === 'payroll_admin' ? 'Cycle Ready' : undefined
    },
    { 
      id: 'recruitment', 
      label: 'Talent Acquisition (ATS)', 
      icon: Briefcase,
      roles: ['super_admin', 'company_owner', 'hr_admin', 'recruiter', 'manager']
    },
    { 
      id: 'performance', 
      label: 'Performance & Goals', 
      icon: TrendingUp,
      roles: ['super_admin', 'company_owner', 'hr_admin', 'manager', 'team_lead', 'employee']
    },
    { 
      id: 'expenses', 
      label: 'Expenses & Claims', 
      icon: Receipt 
    },
    { 
      id: 'assets', 
      label: 'IT Assets & Hardware', 
      icon: Laptop,
      roles: ['super_admin', 'company_owner', 'hr_admin', 'employee']
    },
    { 
      id: 'helpdesk', 
      label: 'HR Helpdesk & Query', 
      icon: LifeBuoy 
    },
    { 
      id: 'reports', 
      label: 'Executive Analytics', 
      icon: Layers,
      roles: ['super_admin', 'company_owner', 'hr_admin', 'payroll_admin', 'manager']
    },
    { 
      id: 'audit_logs', 
      label: 'Privacy & Audit Vault', 
      icon: Lock,
      roles: ['super_admin', 'company_owner', 'hr_admin', 'payroll_admin']
    },
    { 
      id: 'settings', 
      label: 'Org & Policy Settings', 
      icon: Settings,
      roles: ['super_admin', 'company_owner', 'hr_admin']
    }
  ];

  const visibleNav = navItems.filter(item => {
    if (!item.roles) return true;
    return item.roles.includes(role);
  });

  return (
    <aside 
      className={`bg-[#14213D] text-white flex flex-col transition-all duration-300 ease-in-out border-r border-[#1e2f52] shadow-xl z-30 select-none ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header with Prominent Uploaded Logo */}
      <div className="h-20 flex items-center px-3 justify-between border-b border-[#23355b] bg-[#0f192e]">
        <div 
          onClick={() => setCurrentView('dashboard')}
          className="flex items-center gap-3 cursor-pointer overflow-hidden py-1"
          title="Go to Dashboard"
        >
          <img 
            src="/assets/aistudio/NattonFlow_HR_Team_Logo_cabe3d63.png" 
            alt="Brand Logo" 
            className="w-14 h-14 object-contain rounded-xl flex-shrink-0 bg-white shadow-sm p-1 transition-transform hover:scale-105"
          />
          {!collapsed && (
            <div className="flex flex-col overflow-hidden">
              <span className="text-xs text-white font-bold truncate">
                {currentTenant.name}
              </span>
              <span className="text-[10px] text-slate-400 font-medium truncate">
                {currentUser.role === 'super_admin' ? 'Super Admin Mode' : `${currentTenant.plan} Workspace`}
              </span>
            </div>
          )}
        </div>

        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-[#203155] transition-colors"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Tenant Indicator badge if not collapsed */}
      {!collapsed && currentUser.role !== 'super_admin' && (
        <div className="mx-3 mt-3 px-3 py-2 bg-[#1b2b4d] rounded-lg border border-[#2b3e69] flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden">
            <Building2 size={14} className="text-[#4361EE] flex-shrink-0" />
            <div className="truncate">
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Active Tenant</p>
              <p className="text-xs text-slate-200 font-medium truncate">{currentTenant.name}</p>
            </div>
          </div>
          <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-semibold px-1.5 py-0.5 rounded">
            {currentTenant.plan}
          </span>
        </div>
      )}

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-2 py-4 space-y-1">
        {visibleNav.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group relative ${
                isActive 
                  ? 'bg-[#4361EE] text-white shadow-md shadow-[#4361EE]/30' 
                  : 'text-slate-300 hover:bg-[#1b2b4d] hover:text-white'
              }`}
            >
              <Icon size={19} className={`flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
              
              {!collapsed && (
                <div className="flex-1 flex items-center justify-between text-left">
                  <span className="truncate">{item.label}</span>
                  {item.badge && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-[#4361EE]/30 text-blue-300'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </div>
              )}

              {/* Floating Tooltip when collapsed */}
              {collapsed && (
                <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-[#0f192e] text-white text-xs font-semibold rounded-md shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap border border-slate-700">
                  {item.label}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Dedicated View Switchers: Mobile App & SaaS Landing */}
      <div className="p-2 border-t border-[#23355b] bg-[#111c33] space-y-1">
        <button
          onClick={() => setCurrentView('mobile_preview')}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
            currentView === 'mobile_preview'
              ? 'bg-purple-600 text-white'
              : 'text-slate-300 hover:bg-[#1b2b4d] hover:text-white'
          }`}
        >
          <Smartphone size={16} className="text-purple-400 flex-shrink-0" />
          {!collapsed && <span>Mobile App Simulator</span>}
        </button>

        <button
          onClick={() => setCurrentView('public_website')}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
            currentView === 'public_website'
              ? 'bg-sky-600 text-white'
              : 'text-slate-300 hover:bg-[#1b2b4d] hover:text-white'
          }`}
        >
          <Globe size={16} className="text-sky-400 flex-shrink-0" />
          {!collapsed && <span>Public SaaS Portal</span>}
        </button>
      </div>

      {/* Mini Profile Footer */}
      {!collapsed ? (
        <div className="p-3 border-t border-[#23355b] bg-[#0c1527] flex items-center gap-3">
          <img 
            src={currentUser.avatar} 
            alt={currentUser.name} 
            className="w-9 h-9 rounded-full object-cover border border-[#4361EE]"
          />
          <div className="flex-1 overflow-hidden">
            <p className="text-xs font-semibold text-white truncate">{currentUser.name}</p>
            <p className="text-[11px] text-slate-400 capitalize truncate">
              {currentUser.role.replace('_', ' ')}
            </p>
          </div>
        </div>
      ) : (
        <div className="p-3 border-t border-[#23355b] bg-[#0c1527] flex justify-center">
          <img 
            src={currentUser.avatar} 
            alt={currentUser.name} 
            className="w-8 h-8 rounded-full object-cover border border-[#4361EE]"
          />
        </div>
      )}
    </aside>
  );
};
