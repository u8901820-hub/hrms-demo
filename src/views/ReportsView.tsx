import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Calendar, 
  Download, 
  FileSpreadsheet, 
  PieChart, 
  Building2, 
  Award,
  ArrowUpRight
} from 'lucide-react';

export const ReportsView: React.FC = () => {
  const { currentTenant, users, attendance, leaves, payrollCycles, showToast } = useApp();
  const [selectedReportType, setSelectedReportType] = useState<'headcount' | 'payroll' | 'attendance' | 'attrition'>('headcount');

  const deptCounts: Record<string, number> = {};
  users.forEach(u => {
    deptCounts[u.department] = (deptCounts[u.department] || 0) + 1;
  });

  const exportReport = (format: string) => {
    showToast(`Executive ${selectedReportType.toUpperCase()} summary exported as ${format}.`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <BarChart3 className="text-[#4361EE]" size={22} />
            <span>Executive Analytics & Intelligence Reports</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Cross-department insights, headcount velocity, payroll distributions, and workforce compliance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => exportReport('CSV')}
            className="px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg flex items-center gap-1.5 shadow-xs"
          >
            <FileSpreadsheet size={14} className="text-emerald-600" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => exportReport('PDF')}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-[#4361EE] hover:bg-blue-700 rounded-lg flex items-center gap-1.5 shadow-sm"
          >
            <Download size={14} />
            <span>Executive PDF</span>
          </button>
        </div>
      </div>

      {/* Report Selector Pills */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto">
        <button
          onClick={() => setSelectedReportType('headcount')}
          className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
            selectedReportType === 'headcount' ? 'bg-[#14213D] text-white shadow-xs' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          Headcount & Demographics
        </button>
        <button
          onClick={() => setSelectedReportType('payroll')}
          className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
            selectedReportType === 'payroll' ? 'bg-[#14213D] text-white shadow-xs' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          Payroll & Compensation
        </button>
        <button
          onClick={() => setSelectedReportType('attendance')}
          className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
            selectedReportType === 'attendance' ? 'bg-[#14213D] text-white shadow-xs' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          Attendance & Overtime
        </button>
        <button
          onClick={() => setSelectedReportType('attrition')}
          className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
            selectedReportType === 'attrition' ? 'bg-[#14213D] text-white shadow-xs' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          Retention & Health
        </button>
      </div>

      {/* Main Analytics Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Distribution Visuals & Metrics */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center justify-between">
              <span>Departmental Headcount Allocation</span>
              <span className="text-xs font-normal text-slate-500">Live Census: {users.length} tracked staff</span>
            </h3>

            <div className="space-y-3 mt-4">
              {Object.entries(deptCounts).map(([dept, count]) => {
                const percentage = Math.round((count / users.length) * 100);
                return (
                  <div key={dept} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold text-slate-700">
                      <span>{dept}</span>
                      <span className="text-slate-500">{count} members ({percentage}%)</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-[#4361EE] h-full rounded-full transition-all duration-500" 
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Performance & Output Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs">
              <span className="text-slate-400 font-semibold uppercase">Average Employee Tenure</span>
              <p className="text-xl font-bold text-slate-900 mt-1">2.8 Years</p>
              <p className="text-[11px] text-emerald-600 mt-0.5">+0.4y higher than tech industry median</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs">
              <span className="text-slate-400 font-semibold uppercase">Attendance Reliability Index</span>
              <p className="text-xl font-bold text-emerald-600 mt-1">98.2%</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Calculated across 1,420 check-in sessions</p>
            </div>
          </div>
        </div>

        {/* Right Col: Quick Summaries */}
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100">
              Payroll Allocation Trends
            </h3>
            <div className="mt-3 space-y-3 text-xs">
              <div className="flex justify-between pb-2 border-b border-slate-100">
                <span className="text-slate-500">Gross Monthly Payout</span>
                <span className="font-bold text-slate-900">$135,400</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-100">
                <span className="text-slate-500">Statutory Tax Withholding</span>
                <span className="font-bold text-rose-600">$24,372</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-100">
                <span className="text-slate-500">Average Compensation / Seat</span>
                <span className="font-bold text-emerald-700">$13,540 / mo</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Active Tenant Tier</span>
                <span className="font-bold text-[#4361EE]">{currentTenant.plan}</span>
              </div>
            </div>
          </div>

          <div className="bg-[#14213D] text-white p-5 rounded-xl text-xs space-y-2">
            <div className="flex items-center gap-2 text-blue-300 font-bold">
              <Award size={16} />
              <span>Certified SOC-2 Data Governance</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              Reports generated by NattonFlow HR comply with international payroll auditing standards and strict tenant data isolation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
