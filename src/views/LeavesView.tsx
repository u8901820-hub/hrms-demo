import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Plus, 
  Sparkles, 
  ChevronRight, 
  Filter,
  X,
  FileText
} from 'lucide-react';
import { LeaveRequest } from '../types';
import { HOLIDAY_CALENDAR } from '../data/mockData';

export const LeavesView: React.FC = () => {
  const { leaves, currentUser, applyLeave, updateLeaveStatus, showToast } = useApp();

  const [showApplyModal, setShowApplyModal] = useState(false);
  const [leaveType, setLeaveType] = useState<LeaveRequest['leaveType']>('Paid Annual');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [days, setDays] = useState(1);
  const [reason, setReason] = useState('');

  const isManager = currentUser.role === 'manager' || currentUser.role === 'team_lead' || currentUser.role === 'hr_admin' || currentUser.role === 'company_owner' || currentUser.role === 'super_admin';

  const myLeaves = leaves.filter(l => l.employeeId === currentUser.id);
  const pendingForApproval = leaves.filter(l => l.status === 'pending');

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate || !endDate || !reason.trim()) {
      showToast('Please specify dates and a brief reason.');
      return;
    }
    applyLeave(leaveType, startDate, endDate, Number(days) || 1, reason);
    setShowApplyModal(false);
    setReason('');
    setStartDate('');
    setEndDate('');
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Calendar className="text-[#4361EE]" size={22} />
            <span>Time Off, Leaves & Holidays</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time balance accruals, multi-level manager approvals, and official company calendars.
          </p>
        </div>

        <button
          onClick={() => setShowApplyModal(true)}
          className="px-4 py-2 text-xs font-semibold text-white bg-[#4361EE] hover:bg-blue-700 rounded-lg flex items-center gap-1.5 shadow-sm transition-colors self-start sm:self-auto"
        >
          <Plus size={15} />
          <span>Apply for Leave</span>
        </button>
      </div>

      {/* Leave Quota Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Paid Annual</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-[#4361EE]">{currentUser.leaveBalances.paid}</span>
            <span className="text-xs text-slate-400">days available</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Accrues 1.75 days per month</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Sick Leave</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-emerald-600">{currentUser.leaveBalances.sick}</span>
            <span className="text-xs text-slate-400">days available</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Fully compensated medical leave</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Casual Leave</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-amber-600">{currentUser.leaveBalances.casual}</span>
            <span className="text-xs text-slate-400">days available</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Short personal emergencies</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Unpaid Leave</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold text-slate-700">{currentUser.leaveBalances.unpaid}</span>
            <span className="text-xs text-slate-400">days recorded</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Deducted from payroll calculation</p>
        </div>
      </div>

      {/* Manager Approval Queue (If user has manager/HR role) */}
      {isManager && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Pending Team Approvals ({pendingForApproval.length})
              </h2>
              <p className="text-xs text-slate-500">Sign off or reject submitted team time-off requests</p>
            </div>
          </div>

          {pendingForApproval.length === 0 ? (
            <p className="text-xs text-slate-400 py-3 text-center">No pending leave requests at this time.</p>
          ) : (
            <div className="divide-y divide-slate-100">
              {pendingForApproval.map((req) => (
                <div key={req.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{req.employeeName}</span>
                      <span className="text-[11px] text-slate-500 font-medium">({req.department})</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-[#4361EE]">
                        {req.leaveType}
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 mt-1 font-medium">
                      Dates: <span className="text-slate-900">{req.startDate} to {req.endDate}</span> ({req.days} days)
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5 italic">"{req.reason}"</p>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => updateLeaveStatus(req.id, 'rejected')}
                      className="px-3 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors flex items-center gap-1"
                    >
                      <XCircle size={14} />
                      <span>Decline</span>
                    </button>
                    <button
                      onClick={() => updateLeaveStatus(req.id, 'approved')}
                      className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors shadow-xs flex items-center gap-1"
                    >
                      <CheckCircle2 size={14} />
                      <span>Approve Leave</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Two Column Layout: Leave History & Company Holidays */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: My / Org Leave History */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-xs p-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-900">Leave Activity Log</h2>
            <span className="text-xs text-slate-400">All registered records</span>
          </div>

          <div className="overflow-x-auto mt-3">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F7F9FC] text-slate-500 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Employee</th>
                  <th className="py-2.5 px-3">Type</th>
                  <th className="py-2.5 px-3">Duration</th>
                  <th className="py-2.5 px-3">Days</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {leaves.map((l) => (
                  <tr key={l.id} className="hover:bg-slate-50/70">
                    <td className="py-3 px-3 font-medium text-slate-900">{l.employeeName}</td>
                    <td className="py-3 px-3">{l.leaveType}</td>
                    <td className="py-3 px-3 text-slate-500">{l.startDate} to {l.endDate}</td>
                    <td className="py-3 px-3 font-semibold text-slate-800">{l.days}</td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        l.status === 'approved' 
                          ? 'bg-emerald-50 text-emerald-700' 
                          : l.status === 'pending'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-rose-50 text-rose-700'
                      }`}>
                        {l.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-400 text-[11px] truncate max-w-[140px]">
                      {l.approvalNotes || l.reason}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Col: Official Holiday Calendar */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-900">Upcoming Public Holidays</h2>
            <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-semibold">2026-27</span>
          </div>

          <div className="mt-3 space-y-3">
            {HOLIDAY_CALENDAR.map((h, idx) => (
              <div key={idx} className="p-3 rounded-lg border border-slate-100 bg-slate-50/70 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-900">{h.name}</p>
                  <p className="text-[10px] text-slate-500">{h.type}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold text-[#4361EE] font-mono">{h.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Apply Leave Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <form onSubmit={handleApply} className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Submit Leave Application</h3>
              <button 
                type="button" 
                onClick={() => setShowApplyModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={18} />
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Leave Category</label>
              <select
                value={leaveType}
                onChange={(e) => setLeaveType(e.target.value as LeaveRequest['leaveType'])}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-[#4361EE]"
              >
                <option value="Paid Annual">Paid Annual ({currentUser.leaveBalances.paid} days left)</option>
                <option value="Sick Leave">Sick Leave ({currentUser.leaveBalances.sick} days left)</option>
                <option value="Casual">Casual Leave ({currentUser.leaveBalances.casual} days left)</option>
                <option value="Paternity/Maternity">Paternity / Maternity</option>
                <option value="Unpaid">Unpaid Leave</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Start Date</label>
                <input
                  type="date"
                  required
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg border border-slate-200"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">End Date</label>
                <input
                  type="date"
                  required
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg border border-slate-200"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Total Days</label>
              <input
                type="number"
                min={1}
                max={30}
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="w-full text-xs p-2 rounded-lg border border-slate-200"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Reason / Notes for Manager</label>
              <textarea
                required
                rows={3}
                placeholder="Brief reason for time-off..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full text-xs p-2 rounded-lg border border-slate-200"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowApplyModal(false)}
                className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-[#4361EE] hover:bg-blue-700 rounded-lg shadow-sm"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
