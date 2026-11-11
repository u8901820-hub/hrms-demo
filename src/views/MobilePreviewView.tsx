import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Smartphone, 
  Clock, 
  Calendar, 
  CreditCard, 
  CheckCircle2, 
  MapPin, 
  Bell, 
  UserCheck, 
  ChevronRight, 
  ShieldCheck, 
  Download, 
  Plus, 
  ArrowLeft,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const MobilePreviewView: React.FC = () => {
  const { 
    currentUser, 
    currentTenant, 
    attendance, 
    leaves, 
    payslips, 
    checkInCurrentEmployee, 
    checkOutCurrentEmployee, 
    applyLeave,
    showToast 
  } = useApp();

  const [mobileTab, setMobileTab] = useState<'home' | 'attendance' | 'leaves' | 'payslips' | 'profile'>('home');
  const [showMobileLeaveModal, setShowMobileLeaveModal] = useState(false);
  const [leaveDays, setLeaveDays] = useState(1);
  const [leaveReason, setLeaveReason] = useState('');

  const todayStr = new Date().toISOString().split('T')[0];
  const userToday = attendance.find(a => a.employeeId === currentUser.id && a.date === todayStr);
  const isCheckedIn = !!userToday;
  const isCheckedOut = !!userToday?.checkOut && userToday.checkOut !== '-';

  const userPayslips = payslips.filter(p => p.employeeId === currentUser.id);

  const handleMobileApplyLeave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leaveReason) return;
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
    applyLeave('Paid Annual', tomorrow, tomorrow, leaveDays, leaveReason);
    setShowMobileLeaveModal(false);
    setLeaveReason('');
    try {
      confetti({ particleCount: 50, spread: 50 });
    } catch (e) {}
  };

  return (
    <div className="flex flex-col items-center justify-center py-4">
      {/* Simulation Info Banner */}
      <div className="max-w-md w-full mb-4 px-4 text-center">
        <div className="inline-flex items-center gap-1.5 bg-purple-50 text-purple-700 text-xs font-bold px-3 py-1 rounded-full mb-2 border border-purple-200">
          <Smartphone size={14} />
          <span>NattonFlow Native Mobile App (React Native Engine)</span>
        </div>
        <h2 className="text-lg font-bold text-slate-900">High-Speed Employee Self-Service Mobile Experience</h2>
        <p className="text-xs text-slate-500 mt-1">
          Instant geofenced punches, leave balance checks, and push-notified digital payslips.
        </p>
      </div>

      {/* Phone Hardware Mockup Frame */}
      <div className="w-[360px] h-[720px] bg-slate-900 rounded-[48px] p-3 shadow-2xl border-4 border-slate-700 relative flex flex-col overflow-hidden">
        {/* Dynamic Island / Notch */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-40 flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-800 ml-auto mr-2" />
        </div>

        {/* Screen Container */}
        <div className="flex-1 bg-[#F7F9FC] rounded-[36px] overflow-hidden flex flex-col relative text-[#172033] select-none">
          {/* iOS Status Bar */}
          <div className="h-10 pt-2 px-6 flex items-center justify-between text-[11px] font-bold text-slate-700 bg-white">
            <span>09:41</span>
            <div className="flex items-center gap-1.5">
              <span>5G</span>
              <div className="w-5 h-2.5 border border-slate-700 rounded-xs p-0.5 flex items-center">
                <div className="w-full h-full bg-slate-800 rounded-xs" />
              </div>
            </div>
          </div>

          {/* App Header */}
          <div className="bg-[#14213D] text-white px-5 pt-3 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img 
                  src="/assets/aistudio/NattonFlow_HR_Team_Logo_cabe3d63.png" 
                  alt="Logo" 
                  className="w-10 h-10 object-contain rounded-xl bg-white p-0.5 shadow-sm"
                />
                <div>
                  <h3 className="text-xs font-extrabold tracking-tight text-white">{currentTenant.name}</h3>
                  <p className="text-[9px] text-blue-200">Employee Workspace</p>
                </div>
              </div>

              <div className="relative">
                <Bell size={16} className="text-slate-300" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
              </div>
            </div>
          </div>

          {/* Screen Content Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {mobileTab === 'home' && (
              <>
                {/* Employee Greeting Profile Bar */}
                <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
                  <img 
                    src={currentUser.avatar} 
                    alt={currentUser.name} 
                    className="w-11 h-11 rounded-full object-cover border-2 border-[#4361EE]"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{currentUser.name}</h4>
                    <p className="text-[10px] text-slate-500">{currentUser.title}</p>
                    <span className="text-[9px] font-mono text-[#4361EE] font-bold">{currentUser.employeeCode}</span>
                  </div>
                </div>

                {/* Big Punch Clock Card */}
                <div className="bg-gradient-to-br from-[#14213D] to-[#4361EE] text-white p-4 rounded-2xl shadow-md text-center">
                  <p className="text-[10px] text-blue-200 uppercase tracking-wider font-semibold">Today's Geo-Punch</p>
                  <p className="text-2xl font-black mt-1">
                    {isCheckedIn ? userToday?.checkIn : '--:--'}
                  </p>
                  <p className="text-[10px] text-slate-200 mt-0.5 flex items-center justify-center gap-1">
                    <MapPin size={11} className="text-emerald-400" />
                    <span>Office Wi-Fi / Geo-Fence Verified</span>
                  </p>

                  <div className="mt-3">
                    {!isCheckedIn ? (
                      <button
                        onClick={checkInCurrentEmployee}
                        className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-900/40 active:scale-98 transition-all"
                      >
                        Swipe / Tap to Clock In
                      </button>
                    ) : !isCheckedOut ? (
                      <button
                        onClick={checkOutCurrentEmployee}
                        className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl shadow-lg shadow-amber-900/40 active:scale-98 transition-all"
                      >
                        Tap to Clock Out
                      </button>
                    ) : (
                      <div className="bg-white/20 text-emerald-200 py-1.5 rounded-xl text-xs font-semibold">
                        Shift Complete ({userToday.workHours} hrs)
                      </div>
                    )}
                  </div>
                </div>

                {/* Leave Quota Fast Bar */}
                <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="text-[11px] font-bold text-slate-800">Leave Balance</span>
                    <button 
                      onClick={() => setShowMobileLeaveModal(true)}
                      className="text-[10px] font-bold text-[#4361EE] hover:underline"
                    >
                      + Apply
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-2 text-center">
                    <div className="bg-blue-50/70 p-1.5 rounded-lg">
                      <span className="text-[9px] text-slate-500 block">Annual</span>
                      <span className="text-xs font-bold text-[#4361EE]">{currentUser.leaveBalances.paid}d</span>
                    </div>
                    <div className="bg-emerald-50/70 p-1.5 rounded-lg">
                      <span className="text-[9px] text-slate-500 block">Sick</span>
                      <span className="text-xs font-bold text-emerald-600">{currentUser.leaveBalances.sick}d</span>
                    </div>
                    <div className="bg-amber-50/70 p-1.5 rounded-lg">
                      <span className="text-[9px] text-slate-500 block">Casual</span>
                      <span className="text-xs font-bold text-amber-600">{currentUser.leaveBalances.casual}d</span>
                    </div>
                  </div>
                </div>

                {/* Latest Payslip Quick Download */}
                <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-blue-50 text-[#4361EE]">
                      <CreditCard size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">Latest Payslip (Nov)</p>
                      <p className="text-[10px] text-slate-500">Ready for digital download</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      showToast('Payslip downloaded directly to mobile files.');
                    }}
                    className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                  >
                    <Download size={15} />
                  </button>
                </div>
              </>
            )}

            {mobileTab === 'attendance' && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-900">My Attendance Logs</h4>
                <div className="space-y-2">
                  {attendance.slice(0, 6).map(att => (
                    <div key={att.id} className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between text-xs">
                      <div>
                        <p className="font-bold text-slate-800">{att.date}</p>
                        <p className="text-[10px] text-slate-400">{att.checkIn} - {att.checkOut || 'Active'}</p>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-700">
                        {att.status.toUpperCase()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {mobileTab === 'leaves' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900">My Leave Applications</h4>
                  <button 
                    onClick={() => setShowMobileLeaveModal(true)}
                    className="px-2.5 py-1 text-[10px] font-bold text-white bg-[#4361EE] rounded-lg"
                  >
                    + New Leave
                  </button>
                </div>

                <div className="space-y-2">
                  {leaves.filter(l => l.employeeId === currentUser.id).map(l => (
                    <div key={l.id} className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs space-y-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-800">{l.leaveType}</span>
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-50 text-amber-700">
                          {l.status.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500">{l.startDate} to {l.endDate} ({l.days} days)</p>
                      <p className="text-[10px] text-slate-400 italic">"{l.reason}"</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {mobileTab === 'payslips' && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-900">Official Payslips</h4>
                <div className="space-y-2">
                  {userPayslips.map(p => (
                    <div key={p.id} className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold text-slate-800">November 2026</p>
                          <p className="text-[10px] text-slate-400">Net: ${p.netPayable.toLocaleString()}</p>
                        </div>
                        <button
                          onClick={() => showToast('PDF Payslip saved to mobile downloads.')}
                          className="px-2.5 py-1 text-[10px] font-bold text-[#4361EE] bg-blue-50 rounded-lg flex items-center gap-1"
                        >
                          <Download size={11} />
                          <span>PDF</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {mobileTab === 'profile' && (
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3 text-xs">
                <div className="text-center pb-3 border-b border-slate-100">
                  <img src={currentUser.avatar} alt="Me" className="w-16 h-16 rounded-full mx-auto object-cover border-2 border-[#4361EE]" />
                  <h4 className="font-bold text-sm text-slate-900 mt-2">{currentUser.name}</h4>
                  <p className="text-[11px] text-slate-500">{currentUser.title} • {currentUser.department}</p>
                </div>
                <div className="space-y-2 text-slate-600">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Employee ID</span>
                    <span className="font-mono font-semibold text-slate-800">{currentUser.employeeCode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Work Email</span>
                    <span className="font-semibold text-slate-800">{currentUser.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Organization</span>
                    <span className="font-semibold text-[#4361EE]">{currentTenant.name}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Leave Modal in Mobile */}
          {showMobileLeaveModal && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-xs z-50 p-4 flex flex-col justify-end">
              <form onSubmit={handleMobileApplyLeave} className="bg-white rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-800">Quick Leave Request</span>
                  <button type="button" onClick={() => setShowMobileLeaveModal(false)} className="text-xs text-slate-400">Close</button>
                </div>
                <div>
                  <label className="text-[10px] font-semibold text-slate-500">Number of Days</label>
                  <input 
                    type="number" 
                    value={leaveDays} 
                    min={1} 
                    max={10}
                    onChange={(e) => setLeaveDays(Number(e.target.value))} 
                    className="w-full text-xs p-1.5 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-semibold text-slate-500">Brief Reason</label>
                  <textarea 
                    rows={2} 
                    required 
                    placeholder="e.g. Doctor appointment, family urgency"
                    value={leaveReason} 
                    onChange={(e) => setLeaveReason(e.target.value)} 
                    className="w-full text-xs p-1.5 border rounded-lg"
                  />
                </div>
                <button type="submit" className="w-full py-2 bg-[#4361EE] text-white text-xs font-bold rounded-xl">
                  Submit via Mobile
                </button>
              </form>
            </div>
          )}

          {/* Bottom App Navigation Bar */}
          <div className="h-14 bg-white border-t border-slate-200 px-4 flex items-center justify-around text-slate-500">
            <button 
              onClick={() => setMobileTab('home')}
              className={`flex flex-col items-center gap-0.5 text-[10px] ${mobileTab === 'home' ? 'text-[#4361EE] font-bold' : 'hover:text-slate-800'}`}
            >
              <Clock size={16} />
              <span>Home</span>
            </button>
            <button 
              onClick={() => setMobileTab('attendance')}
              className={`flex flex-col items-center gap-0.5 text-[10px] ${mobileTab === 'attendance' ? 'text-[#4361EE] font-bold' : 'hover:text-slate-800'}`}
            >
              <MapPin size={16} />
              <span>Clock</span>
            </button>
            <button 
              onClick={() => setMobileTab('leaves')}
              className={`flex flex-col items-center gap-0.5 text-[10px] ${mobileTab === 'leaves' ? 'text-[#4361EE] font-bold' : 'hover:text-slate-800'}`}
            >
              <Calendar size={16} />
              <span>Leaves</span>
            </button>
            <button 
              onClick={() => setMobileTab('payslips')}
              className={`flex flex-col items-center gap-0.5 text-[10px] ${mobileTab === 'payslips' ? 'text-[#4361EE] font-bold' : 'hover:text-slate-800'}`}
            >
              <CreditCard size={16} />
              <span>Payslips</span>
            </button>
            <button 
              onClick={() => setMobileTab('profile')}
              className={`flex flex-col items-center gap-0.5 text-[10px] ${mobileTab === 'profile' ? 'text-[#4361EE] font-bold' : 'hover:text-slate-800'}`}
            >
              <UserCheck size={16} />
              <span>Profile</span>
            </button>
          </div>

          {/* iOS Bottom Bar Indicator */}
          <div className="h-4 bg-white flex justify-center items-center">
            <div className="w-32 h-1 bg-slate-400 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
