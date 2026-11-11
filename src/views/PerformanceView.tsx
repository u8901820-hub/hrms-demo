import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  TrendingUp, 
  Award, 
  Target, 
  Star, 
  CheckCircle2, 
  ChevronRight, 
  User, 
  BarChart2,
  Sparkles
} from 'lucide-react';

export const PerformanceView: React.FC = () => {
  const { users, currentUser, showToast } = useApp();

  const [selectedDept, setSelectedDept] = useState('all');

  const goals = [
    { title: 'Migrate Core Database to Multi-Region PostgreSQL', progress: 85, owner: 'Tariq Al-Mansoor', cycle: 'Q4 2026' },
    { title: 'Reduce Employee Onboarding Time to < 24 Hours', progress: 100, owner: 'Sophia Reynolds', cycle: 'Q4 2026' },
    { title: 'Achieve Zero Payroll Discrepancy SLA for 6 Consecutive Months', progress: 95, owner: 'David Chen, CPA', cycle: 'Q4 2026' },
    { title: 'Deliver NattonFlow Mobile App v2.0 with Biometric Clock-in', progress: 90, owner: 'Maya Lin', cycle: 'Q4 2026' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <TrendingUp className="text-[#4361EE]" size={22} />
            <span>Performance Reviews, OKRs & Growth</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Transparent quarterly goal tracking, 360-degree peer feedback, and continuous manager check-ins.
          </p>
        </div>

        <button
          onClick={() => showToast('Quarterly review cycle initiated for active departments.')}
          className="px-3.5 py-2 text-xs font-semibold text-white bg-[#4361EE] hover:bg-blue-700 rounded-lg flex items-center gap-1.5 shadow-sm"
        >
          <Target size={15} />
          <span>Launch Review Cycle</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs">
          <span className="text-slate-400 font-semibold uppercase">Active Corporate OKRs</span>
          <p className="text-xl font-bold text-slate-900 mt-1">18 Goals</p>
          <p className="text-[11px] text-emerald-600 mt-0.5">88% on-track or completed</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs">
          <span className="text-slate-400 font-semibold uppercase">Completed Reviews</span>
          <p className="text-xl font-bold text-emerald-600 mt-1">94.2%</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Q3 evaluation round locked</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs">
          <span className="text-slate-400 font-semibold uppercase">High Performer Ratio</span>
          <p className="text-xl font-bold text-[#4361EE] mt-1">26%</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Exceeding expectations benchmark</p>
        </div>
      </div>

      {/* OKRs & Goals Section */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center justify-between">
          <span>Strategic Departmental OKRs</span>
          <span className="text-xs text-slate-400">Quarterly Tracking (Q4 2026)</span>
        </h3>

        <div className="space-y-3">
          {goals.map((g, idx) => (
            <div key={idx} className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/70 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900">{g.title}</span>
                <span className="font-bold text-[#4361EE] font-mono">{g.progress}%</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all ${
                    g.progress === 100 ? 'bg-emerald-500' : 'bg-[#4361EE]'
                  }`}
                  style={{ width: `${g.progress}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Accountable: <strong className="text-slate-700">{g.owner}</strong></span>
                <span>{g.cycle}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
