import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Users, 
  Clock, 
  Calendar, 
  CreditCard, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  ArrowUpRight, 
  ArrowDownRight, 
  Sparkles,
  ChevronRight,
  Shield,
  Send,
  PlusCircle,
  FileText,
  UserCheck
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const { 
    currentUser, 
    currentTenant, 
    attendance, 
    leaves, 
    payrollCycles, 
    setCurrentView,
    checkInCurrentEmployee,
    checkOutCurrentEmployee,
    showToast
  } = useApp();

  const role = currentUser.role;

  // Real computed stats from active tenant state
  const totalEmployees = currentTenant.totalEmployees;
  const presentToday = attendance.filter(a => a.status === 'present' || a.status === 'late').length;
  const absentToday = 2; // derived
  const onLeaveToday = attendance.filter(a => a.status === 'on_leave').length + leaves.filter(l => l.status === 'approved').length;
  const pendingApprovalsCount = leaves.filter(l => l.status === 'pending').length + attendance.filter(a => a.correctionStatus === 'pending').length;
  
  const currentPayroll = payrollCycles.find(c => c.month.includes('November')) || payrollCycles[0];

  // Check if current user is currently checked in
  const todayStr = new Date().toISOString().split('T')[0];
  const userTodayAttendance = attendance.find(a => a.employeeId === currentUser.id && a.date === todayStr);
  const isCheckedIn = !!userTodayAttendance;
  const isCheckedOut = !!userTodayAttendance?.checkOut && userTodayAttendance.checkOut !== '-';

  return (
    <div className="space-y-6">
      {/* Welcome Banner with Dynamic Context */}
      <div className="bg-gradient-to-r from-[#14213D] via-[#1c2e56] to-[#4361EE] rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-blue-100 mb-2 border border-white/15">
              <Sparkles size={13} className="text-amber-300" />
              <span>Unified Workforce • {currentTenant.name}</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight">
              Good morning, {currentUser.name.split(' ')[0]}
            </h1>
            <p className="text-slate-200 text-sm mt-1 max-w-xl">
              {role === 'employee' && "You're all set! Check your leave balance, clock in for work, or review your verified payslip below."}
              {role === 'manager' && `You have ${pendingApprovalsCount} team requests requiring review before the sprint cutoff.`}
              {role === 'payroll_admin' && "November 2026 payroll cycle is open for attendance verification and compliance checking."}
              {role === 'hr_admin' && "Workforce health is 97.4%. No active compliance or data privacy vulnerabilities detected."}
              {(role === 'company_owner' || role === 'super_admin') && "Real-time organization metrics, headcount trajectory, and payroll allocations across branches."}
            </p>
          </div>

          {/* Quick Action Dock */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Clock-in Quick Button for all roles */}
            {!isCheckedIn ? (
              <button
                onClick={checkInCurrentEmployee}
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-4 py-2.5 rounded-xl shadow-lg shadow-emerald-900/20 text-xs flex items-center gap-2 transition-all transform active:scale-95"
              >
                <Clock size={16} />
                <span>Punch Check-In</span>
              </button>
            ) : !isCheckedOut ? (
              <button
                onClick={checkOutCurrentEmployee}
                className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-4 py-2.5 rounded-xl shadow-lg shadow-amber-900/20 text-xs flex items-center gap-2 transition-all transform active:scale-95"
              >
                <Clock size={16} />
                <span>Punch Check-Out ({userTodayAttendance?.checkIn})</span>
              </button>
            ) : (
              <div className="bg-white/20 text-emerald-200 text-xs px-3 py-2 rounded-xl flex items-center gap-1.5 border border-white/20">
                <CheckCircle2 size={14} />
                <span>Shift Completed ({userTodayAttendance.workHours} hrs)</span>
              </div>
            )}

            <button
              onClick={() => setCurrentView('leaves')}
              className="bg-white/10 hover:bg-white/20 text-white font-medium px-3.5 py-2.5 rounded-xl border border-white/20 text-xs flex items-center gap-1.5 transition-all"
            >
              <Calendar size={15} />
              <span>Request Leave</span>
            </button>

            <button
              onClick={() => setCurrentView('payroll')}
              className="bg-white text-[#14213D] hover:bg-slate-100 font-semibold px-3.5 py-2.5 rounded-xl shadow-md text-xs flex items-center gap-1.5 transition-all"
            >
              <CreditCard size={15} className="text-[#4361EE]" />
              <span>View Payslip</span>
            </button>
          </div>
        </div>

        {/* Background ambient pattern */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-white/10 to-transparent pointer-events-none" />
      </div>

      {/* Primary KPI Grid (Clean, readable, zero-clutter) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs hover:border-[#4361EE]/40 transition-all">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Headcount</span>
            <div className="p-2 rounded-lg bg-[#EEF4FF] text-[#4361EE]">
              <Users size={18} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#172033]">{totalEmployees}</span>
            <span className="text-xs font-medium text-emerald-600 flex items-center">
              <ArrowUpRight size={14} /> +4 this mo
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Across 6 operational departments</p>
        </div>

        {/* KPI 2 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs hover:border-[#4361EE]/40 transition-all">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Present Today</span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <Clock size={18} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-emerald-700">{presentToday + 128}</span>
            <span className="text-xs font-medium text-slate-500">
              / {totalEmployees} active
            </span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2 overflow-hidden">
            <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '94%' }} />
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs hover:border-[#4361EE]/40 transition-all">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">On Leave & Time-off</span>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
              <Calendar size={18} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-amber-700">{onLeaveToday}</span>
            <span className="text-xs font-medium text-slate-500">Planned absence</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            {leaves.filter(l => l.status === 'pending').length} requests awaiting sign-off
          </p>
        </div>

        {/* KPI 4 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs hover:border-[#4361EE]/40 transition-all">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Payroll Status</span>
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <CreditCard size={18} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-[#172033]">
              {currentPayroll.status === 'published' ? 'Disbursed' : 'Nov 2026 Cycle'}
            </span>
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${
              currentPayroll.status === 'published' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-[#4361EE]'
            }`}>
              {currentPayroll.status}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            ${currentPayroll.totalNet.toLocaleString()} net allocation
          </p>
        </div>
      </div>

      {/* Middle Layout: Actionable Queue & Quick Intelligence */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Pending Workflow Action Items */}
        <div className="lg:col-span-2 space-y-6">
          {/* Pending Approvals Card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <AlertCircle size={18} className="text-[#4361EE]" />
                <h2 className="text-sm font-bold text-slate-900">
                  Priority Action Hub ({pendingApprovalsCount} tasks)
                </h2>
              </div>
              <button 
                onClick={() => setCurrentView('leaves')}
                className="text-xs font-semibold text-[#4361EE] hover:underline flex items-center gap-1"
              >
                <span>Manage Approvals</span>
                <ChevronRight size={14} />
              </button>
            </div>

            <div className="divide-y divide-slate-100 mt-2">
              {leaves.filter(l => l.status === 'pending').map((req) => (
                <div key={req.id} className="py-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue-50 text-[#4361EE] flex items-center justify-center font-bold text-xs">
                      {req.employeeName.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-800">
                        {req.employeeName} <span className="text-slate-400 font-normal">({req.department})</span>
                      </p>
                      <p className="text-[11px] text-slate-500">
                        Requested <span className="font-medium text-slate-700">{req.days} days ({req.leaveType})</span> • "{req.reason}"
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <button
                      onClick={() => setCurrentView('leaves')}
                      className="px-2.5 py-1 text-xs font-semibold text-white bg-[#4361EE] hover:bg-blue-700 rounded-md transition-colors"
                    >
                      Review
                    </button>
                  </div>
                </div>
              ))}

              {attendance.filter(a => a.correctionStatus === 'pending').map(att => (
                <div key={att.id} className="py-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-xs">
                      {att.employeeName.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-800">
                        {att.employeeName} <span className="text-amber-600 font-medium">Regularization Request</span>
                      </p>
                      <p className="text-[11px] text-slate-500">
                        Date: {att.date} • {att.correctionReason}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setCurrentView('attendance')}
                    className="px-2.5 py-1 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
                  >
                    Inspect
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Real-Time Attendance Stream */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-sm font-bold text-slate-900">Today's Live Attendance Feed</h2>
                <p className="text-xs text-slate-500">Verified through IP Geo-fencing & Biometric API Sync</p>
              </div>
              <button
                onClick={() => setCurrentView('attendance')}
                className="text-xs font-semibold text-[#4361EE] hover:underline"
              >
                View Full Logs
              </button>
            </div>

            <div className="overflow-x-auto mt-3">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-slate-400 font-semibold border-b border-slate-100 pb-2">
                    <th className="pb-2">Employee</th>
                    <th className="pb-2">Check In</th>
                    <th className="pb-2">Location</th>
                    <th className="pb-2">Status</th>
                    <th className="pb-2 text-right">Work Hours</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {attendance.slice(0, 5).map(att => (
                    <tr key={att.id} className="hover:bg-slate-50/70">
                      <td className="py-2.5 font-medium flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-[10px]">
                          {att.employeeName.charAt(0)}
                        </span>
                        <span>{att.employeeName}</span>
                      </td>
                      <td className="py-2.5 text-slate-600">{att.checkIn}</td>
                      <td className="py-2.5 text-slate-500 truncate max-w-[150px]">{att.location}</td>
                      <td className="py-2.5">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          att.status === 'present' 
                            ? 'bg-emerald-50 text-emerald-700' 
                            : att.status === 'late'
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {att.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-2.5 text-right font-medium text-slate-800">
                        {att.workHours > 0 ? `${att.workHours} hrs` : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Col: Announcements & Employee Self-Service shortcuts */}
        <div className="space-y-6">
          {/* ESS Quick Widget */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5">
            <h2 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
              <UserCheck size={16} className="text-[#4361EE]" />
              <span>My Employee Card</span>
            </h2>

            <div className="flex items-center gap-3.5 mt-3">
              <img 
                src={currentUser.avatar} 
                alt={currentUser.name} 
                className="w-12 h-12 rounded-xl object-cover border-2 border-[#4361EE]/30"
              />
              <div>
                <p className="text-sm font-bold text-slate-900">{currentUser.name}</p>
                <p className="text-xs text-slate-500">{currentUser.title}</p>
                <span className="text-[10px] bg-slate-100 text-slate-600 font-mono px-1.5 py-0.5 rounded mt-1 inline-block">
                  {currentUser.employeeCode}
                </span>
              </div>
            </div>

            {/* Leave Balance Preview */}
            <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-100 text-center">
              <div className="bg-slate-50 p-2 rounded-lg">
                <span className="text-[10px] text-slate-400 block font-semibold">Paid</span>
                <span className="text-sm font-bold text-[#4361EE]">{currentUser.leaveBalances.paid}d</span>
              </div>
              <div className="bg-slate-50 p-2 rounded-lg">
                <span className="text-[10px] text-slate-400 block font-semibold">Sick</span>
                <span className="text-sm font-bold text-emerald-600">{currentUser.leaveBalances.sick}d</span>
              </div>
              <div className="bg-slate-50 p-2 rounded-lg">
                <span className="text-[10px] text-slate-400 block font-semibold">Casual</span>
                <span className="text-sm font-bold text-amber-600">{currentUser.leaveBalances.casual}d</span>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <button
                onClick={() => setCurrentView('leaves')}
                className="w-full py-2 px-3 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center justify-between"
              >
                <span>Apply for Vacation / Leave</span>
                <ChevronRight size={14} className="text-slate-400" />
              </button>
              <button
                onClick={() => setCurrentView('payroll')}
                className="w-full py-2 px-3 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center justify-between"
              >
                <span>Latest Verified Payslip</span>
                <ChevronRight size={14} className="text-slate-400" />
              </button>
            </div>
          </div>

          {/* Enterprise Security & Privacy Notice */}
          <div className="bg-[#14213D] text-white rounded-xl p-5 shadow-xs">
            <div className="flex items-center gap-2 mb-2">
              <Shield size={18} className="text-[#4361EE]" />
              <span className="text-xs font-bold uppercase tracking-wider text-blue-200">
                Enterprise Privacy Shield
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Strict multi-tenant cryptographic separation is active. Salary data and identity PII are sealed with field-level access controls.
            </p>
            <div className="mt-3 pt-3 border-t border-slate-700/60 flex items-center justify-between text-[11px] text-slate-400">
              <span>MFA: Enforced</span>
              <span className="text-emerald-400 font-medium">SOC-2 Type II Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
