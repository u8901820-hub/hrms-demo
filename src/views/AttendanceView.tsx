import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Calendar, 
  MapPin, 
  ShieldCheck, 
  ChevronRight, 
  Sparkles,
  Filter,
  FileCheck2,
  X
} from 'lucide-react';

export const AttendanceView: React.FC = () => {
  const { 
    attendance, 
    currentUser, 
    checkInCurrentEmployee, 
    checkOutCurrentEmployee,
    requestAttendanceCorrection,
    approveAttendanceCorrection,
    showToast 
  } = useApp();

  const [filterDept, setFilterDept] = useState('all');
  const [showRegularizeModal, setShowRegularizeModal] = useState(false);
  const [correctionReason, setCorrectionReason] = useState('');
  const [correctionDate, setCorrectionDate] = useState(new Date().toISOString().split('T')[0]);

  const todayStr = new Date().toISOString().split('T')[0];
  const myRecord = attendance.find(a => a.employeeId === currentUser.id && a.date === todayStr);

  const isCheckedIn = !!myRecord;
  const isCheckedOut = !!myRecord?.checkOut && myRecord.checkOut !== '-';

  const isApprover = currentUser.role === 'manager' || currentUser.role === 'hr_admin' || currentUser.role === 'team_lead' || currentUser.role === 'company_owner' || currentUser.role === 'super_admin';

  const pendingRegularizations = attendance.filter(a => a.correctionStatus === 'pending');

  const filteredAttendance = attendance.filter(a => {
    if (filterDept === 'all') return true;
    return a.department === filterDept;
  });

  const handleRegularizeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!correctionReason.trim()) {
      showToast('Please provide a reason for the attendance adjustment.');
      return;
    }
    requestAttendanceCorrection(correctionDate, correctionReason);
    setShowRegularizeModal(false);
    setCorrectionReason('');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with Clock-in Dock */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#4361EE] uppercase tracking-wider mb-1">
            <Clock size={15} />
            <span>Smart Biometric & Geo Attendance</span>
          </div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Attendance & Shift Management
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time shift tracking, IP geo-fenced logs, and seamless payroll reconciliation.
          </p>
        </div>

        {/* Punch Card Controls */}
        <div className="flex items-center gap-3 bg-[#F7F9FC] p-3 rounded-xl border border-slate-200">
          <div className="text-right pr-2">
            <p className="text-[11px] text-slate-400 font-semibold uppercase">Today's Punch</p>
            <p className="text-sm font-bold text-slate-800">
              {isCheckedIn ? `${myRecord?.checkIn} (Active)` : 'Not punched yet'}
            </p>
          </div>

          {!isCheckedIn ? (
            <button
              onClick={checkInCurrentEmployee}
              className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm flex items-center gap-1.5 transition-all transform active:scale-95"
            >
              <Clock size={15} />
              <span>Punch In</span>
            </button>
          ) : !isCheckedOut ? (
            <button
              onClick={checkOutCurrentEmployee}
              className="px-4 py-2 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-sm flex items-center gap-1.5 transition-all transform active:scale-95"
            >
              <Clock size={15} />
              <span>Punch Out</span>
            </button>
          ) : (
            <div className="px-3 py-1.5 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-bold flex items-center gap-1">
              <CheckCircle2 size={14} />
              <span>Day Completed</span>
            </div>
          )}

          <button
            onClick={() => setShowRegularizeModal(true)}
            className="px-3 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors"
          >
            Regularize
          </button>
        </div>
      </div>

      {/* Shifts & Policy Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs">
          <p className="text-slate-400 font-semibold">Standard Shift</p>
          <p className="text-sm font-bold text-slate-800 mt-0.5">09:00 AM - 06:00 PM (EST)</p>
          <p className="text-[11px] text-slate-500 mt-1">Grace Period: 15 minutes</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs">
          <p className="text-slate-400 font-semibold">Working Days</p>
          <p className="text-sm font-bold text-slate-800 mt-0.5">Monday - Friday (5 Days)</p>
          <p className="text-[11px] text-slate-500 mt-1">Weekend: Saturday & Sunday</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs">
          <p className="text-slate-400 font-semibold">Validation Engine</p>
          <p className="text-sm font-bold text-emerald-600 mt-0.5">Auto-Synced to Payroll Ledger</p>
          <p className="text-[11px] text-slate-500 mt-1">Zero manual spreadsheet uploads</p>
        </div>
      </div>

      {/* Manager Regularization Approvals Section (If there are pending items) */}
      {isApprover && pendingRegularizations.length > 0 && (
        <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-amber-200/60 mb-3">
            <div className="flex items-center gap-2">
              <AlertCircle size={18} className="text-amber-600" />
              <h3 className="text-xs font-bold text-amber-900 uppercase tracking-wide">
                Pending Attendance Corrections ({pendingRegularizations.length})
              </h3>
            </div>
            <span className="text-[11px] text-amber-700 font-medium">Requires manager approval before payroll lock</span>
          </div>

          <div className="space-y-2">
            {pendingRegularizations.map(item => (
              <div key={item.id} className="bg-white p-3 rounded-lg border border-amber-200 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold text-slate-800">
                    {item.employeeName} <span className="text-slate-400 font-normal">({item.department})</span>
                  </p>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    Date: <span className="font-semibold">{item.date}</span> • Reason: "{item.correctionReason}"
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => approveAttendanceCorrection(item.id)}
                    className="px-3 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-md shadow-xs flex items-center gap-1"
                  >
                    <CheckCircle2 size={13} />
                    <span>Approve Regularization</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Attendance Log Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-800">Live Attendance Roster</span>
            <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-semibold">
              Today: {todayStr}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={filterDept}
              onChange={(e) => setFilterDept(e.target.value)}
              className="text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 bg-[#F7F9FC]"
            >
              <option value="all">All Departments</option>
              <option value="Engineering">Engineering</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
              <option value="Human Resources">Human Resources</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7F9FC] text-slate-500 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Employee</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Check In</th>
                <th className="py-3 px-4">Check Out</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Effective Hours</th>
                <th className="py-3 px-4">Verification Location</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredAttendance.map(record => (
                <tr key={record.id} className="hover:bg-slate-50/70">
                  <td className="py-3 px-4 font-semibold text-slate-900">{record.employeeName}</td>
                  <td className="py-3 px-4 text-slate-500">{record.department}</td>
                  <td className="py-3 px-4 font-mono font-medium text-slate-800">{record.checkIn}</td>
                  <td className="py-3 px-4 font-mono text-slate-600">{record.checkOut || 'Active'}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      record.status === 'present'
                        ? 'bg-emerald-50 text-emerald-700'
                        : record.status === 'late'
                        ? 'bg-amber-50 text-amber-700'
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {record.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-800">{record.workHours} hrs</td>
                  <td className="py-3 px-4 text-slate-500 flex items-center gap-1.5">
                    <MapPin size={13} className="text-[#4361EE] flex-shrink-0" />
                    <span className="truncate max-w-[180px]">{record.location}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Regularize Modal */}
      {showRegularizeModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <form onSubmit={handleRegularizeSubmit} className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Request Attendance Regularization</h3>
              <button 
                type="button" 
                onClick={() => setShowRegularizeModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={18} />
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Target Date</label>
              <input
                type="date"
                required
                value={correctionDate}
                onChange={(e) => setCorrectionDate(e.target.value)}
                className="w-full text-xs p-2 rounded-lg border border-slate-200"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Reason / Explanation</label>
              <textarea
                required
                rows={3}
                placeholder="e.g. Metro delay, client on-site visit, card scanner malfunction"
                value={correctionReason}
                onChange={(e) => setCorrectionReason(e.target.value)}
                className="w-full text-xs p-2 rounded-lg border border-slate-200"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowRegularizeModal(false)}
                className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-[#4361EE] hover:bg-blue-700 rounded-lg shadow-sm"
              >
                Submit Regularization
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
