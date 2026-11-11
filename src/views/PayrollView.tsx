import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  CreditCard, 
  CheckCircle2, 
  AlertTriangle, 
  Download, 
  FileCheck, 
  ArrowRight, 
  Lock, 
  ShieldCheck, 
  Printer, 
  ChevronRight,
  Sparkles,
  Building2,
  X
} from 'lucide-react';
import { PayslipItem, PayrollCycle } from '../types';
import confetti from 'canvas-confetti';

export const PayrollView: React.FC = () => {
  const { 
    payrollCycles, 
    payslips, 
    currentUser, 
    currentTenant, 
    runPayrollValidation, 
    approvePayrollCycle, 
    publishPayrollCycle, 
    showToast 
  } = useApp();

  const [selectedCycleId, setSelectedCycleId] = useState<string>(payrollCycles[0]?.id || 'cycle-nov-2026');
  const [selectedPayslip, setSelectedPayslip] = useState<PayslipItem | null>(null);

  const role = currentUser.role;
  const isPayrollAdmin = role === 'payroll_admin' || role === 'hr_admin' || role === 'company_owner' || role === 'super_admin';

  const currentCycle = payrollCycles.find(c => c.id === selectedCycleId) || payrollCycles[0];
  const relevantPayslips = payslips.filter(p => p.payrollCycleId === currentCycle?.id);

  // If simple employee, filter to own payslip
  const visiblePayslips = isPayrollAdmin 
    ? relevantPayslips 
    : relevantPayslips.filter(p => p.employeeId === currentUser.id);

  const handlePublish = (cycleId: string) => {
    publishPayrollCycle(cycleId);
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // fallback
    }
  };

  const handleExportBankTransfer = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Employee,Code,BankMasked,NetPayable,Currency\n" +
      relevantPayslips.map(p => `"${p.employeeName}","${p.employeeCode}","${p.bankAccountMasked}",${p.netPayable},"USD"`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `NattonFlow_Bank_ACH_Export_${currentCycle.month.replace(' ', '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Bank transfer ACH batch file generated and downloaded successfully.');
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Cycle Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <CreditCard className="text-[#4361EE]" size={22} />
            <span>Payroll Engine & Compensation Ledger</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Automated attendance cross-check, tax calculation, one-click disbursement, and digital payslips.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedCycleId}
            onChange={(e) => setSelectedCycleId(e.target.value)}
            className="text-xs font-semibold border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-800 shadow-xs focus:outline-none focus:border-[#4361EE]"
          >
            {payrollCycles.map(cycle => (
              <option key={cycle.id} value={cycle.id}>
                {cycle.month} ({cycle.status.toUpperCase()})
              </option>
            ))}
          </select>

          {isPayrollAdmin && (
            <button
              onClick={handleExportBankTransfer}
              className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Download size={14} className="text-[#4361EE]" />
              <span>Export Bank ACH</span>
            </button>
          )}
        </div>
      </div>

      {/* 8-Stage Guided Workflow Bar for Payroll Admins */}
      {isPayrollAdmin && (
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#4361EE]">
                Guided Payroll Workflow
              </span>
              <span className="text-[11px] text-slate-400">• Step 5 of 8 completed</span>
            </div>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
              currentCycle.status === 'published' 
                ? 'bg-emerald-100 text-emerald-800' 
                : currentCycle.status === 'approved'
                ? 'bg-blue-100 text-[#4361EE]'
                : currentCycle.status === 'validated'
                ? 'bg-amber-100 text-amber-800'
                : 'bg-slate-100 text-slate-600'
            }`}>
              Status: {currentCycle.status}
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
            {/* Step 1: Attendance & Leaves */}
            <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200 text-xs">
              <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                <CheckCircle2 size={15} />
                <span>1. Attendance Synced</span>
              </div>
              <p className="text-[11px] text-emerald-600 mt-1">Leaves and punches verified.</p>
            </div>

            {/* Step 2: Automated Validation */}
            <div className={`p-3 rounded-xl text-xs border ${
              currentCycle.status !== 'draft' 
                ? 'bg-emerald-50/60 border-emerald-200 text-emerald-700 font-bold'
                : 'bg-slate-50 border-slate-200 text-slate-600'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  {currentCycle.status !== 'draft' ? <CheckCircle2 size={15} /> : <AlertTriangle size={15} className="text-amber-500" />}
                  <span>2. Validation Engine</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                {currentCycle.status === 'draft' ? 'Ready to run rules check' : '1 non-blocking warning reviewed'}
              </p>
            </div>

            {/* Step 3: Approval */}
            <div className={`p-3 rounded-xl text-xs border ${
              currentCycle.status === 'approved' || currentCycle.status === 'published'
                ? 'bg-emerald-50/60 border-emerald-200 text-emerald-700 font-bold'
                : 'bg-slate-50 border-slate-200 text-slate-600'
            }`}>
              <div className="flex items-center gap-1.5">
                {currentCycle.status === 'approved' || currentCycle.status === 'published' ? <CheckCircle2 size={15} /> : <Lock size={15} />}
                <span>3. Admin Authorization</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                {currentCycle.status === 'approved' || currentCycle.status === 'published' ? 'Authorized for release' : 'Awaiting admin sign-off'}
              </p>
            </div>

            {/* Step 4: Publish & Payslips */}
            <div className={`p-3 rounded-xl text-xs border ${
              currentCycle.status === 'published'
                ? 'bg-emerald-50/60 border-emerald-200 text-emerald-700 font-bold'
                : 'bg-slate-50 border-slate-200 text-slate-600'
            }`}>
              <div className="flex items-center gap-1.5">
                {currentCycle.status === 'published' ? <CheckCircle2 size={15} /> : <FileCheck size={15} />}
                <span>4. Digital Payslips</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                {currentCycle.status === 'published' ? 'Live in Employee ESS' : 'Hidden until published'}
              </p>
            </div>
          </div>

          {/* Workflow Action Bar */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100 flex-wrap gap-2">
            <div className="text-xs text-slate-500">
              Total Net Allocation: <strong className="text-slate-800">${currentCycle.totalNet.toLocaleString()}</strong> ({currentCycle.employeeCount} employees)
            </div>

            <div className="flex items-center gap-2">
              {currentCycle.status === 'draft' && (
                <button
                  onClick={() => runPayrollValidation(currentCycle.id)}
                  className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#4361EE] hover:bg-blue-700 rounded-lg shadow-sm"
                >
                  Run Validation Engine
                </button>
              )}

              {currentCycle.status === 'validated' && (
                <button
                  onClick={() => approvePayrollCycle(currentCycle.id)}
                  className="px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm"
                >
                  Authorize Payroll Cycle
                </button>
              )}

              {currentCycle.status === 'approved' && (
                <button
                  onClick={() => handlePublish(currentCycle.id)}
                  className="px-4 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm flex items-center gap-1.5"
                >
                  <Sparkles size={14} />
                  <span>Publish Payslips & Disburse</span>
                </button>
              )}

              {currentCycle.status === 'published' && (
                <div className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 flex items-center gap-1.5">
                  <CheckCircle2 size={14} />
                  <span>Cycle Completed & Disbursed ({currentCycle.processedAt})</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Cycle Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs">
          <p className="text-slate-400 font-semibold uppercase">Gross Total Earnings</p>
          <p className="text-xl font-bold text-slate-900 mt-1">${currentCycle.totalGross.toLocaleString()}</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Basic + HRA + Allowances + Bonuses</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs">
          <p className="text-slate-400 font-semibold uppercase">Statutory Deductions & Taxes</p>
          <p className="text-xl font-bold text-rose-600 mt-1">-${currentCycle.totalDeductions.toLocaleString()}</p>
          <p className="text-[11px] text-slate-400 mt-0.5">TDS withholding + PF + Medical Insurance</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs">
          <p className="text-slate-400 font-semibold uppercase">Net Payable Bank Transfer</p>
          <p className="text-xl font-bold text-emerald-600 mt-1">${currentCycle.totalNet.toLocaleString()}</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Direct ACH transmission ready</p>
        </div>
      </div>

      {/* Payslips Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              {isPayrollAdmin ? 'Employee Payslip Registers' : 'My Verified Payslips'}
            </h2>
            <p className="text-xs text-slate-500">
              {isPayrollAdmin ? 'Field-level encrypted payroll breakdown' : 'Download or inspect your itemized compensation statements'}
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7F9FC] text-slate-500 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Employee</th>
                <th className="py-3 px-4">Designation</th>
                <th className="py-3 px-4">Account (Masked)</th>
                <th className="py-3 px-4">Paid Days</th>
                <th className="py-3 px-4">Gross ($)</th>
                <th className="py-3 px-4">Deductions ($)</th>
                <th className="py-3 px-4">Net Payable ($)</th>
                <th className="py-3 px-4 text-right">Statement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {visiblePayslips.map(slip => (
                <tr key={slip.id} className="hover:bg-slate-50/70">
                  <td className="py-3 px-4">
                    <p className="font-bold text-slate-900">{slip.employeeName}</p>
                    <p className="text-[10px] text-slate-400 font-mono">{slip.employeeCode}</p>
                  </td>
                  <td className="py-3 px-4 text-slate-600">{slip.designation}</td>
                  <td className="py-3 px-4 font-mono text-slate-500">{slip.bankAccountMasked}</td>
                  <td className="py-3 px-4 font-semibold text-slate-800">{slip.paidDays} / {slip.workingDays}</td>
                  <td className="py-3 px-4 font-medium text-slate-900">${slip.grossEarnings.toLocaleString()}</td>
                  <td className="py-3 px-4 text-rose-600 font-medium">-${slip.totalDeductions.toLocaleString()}</td>
                  <td className="py-3 px-4 font-bold text-emerald-700">${slip.netPayable.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setSelectedPayslip(slip)}
                      className="px-3 py-1 text-xs font-semibold text-[#4361EE] hover:bg-blue-50 rounded-md transition-colors"
                    >
                      View Payslip
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Official Enterprise Payslip Modal Preview */}
      {selectedPayslip && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setSelectedPayslip(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100"
            >
              <X size={18} />
            </button>

            {/* Payslip Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <img 
                  src="/assets/aistudio/NattonFlow_HR_Team_Logo_cabe3d63.png" 
                  alt="Logo" 
                  className="w-16 h-16 object-contain rounded-xl border border-slate-200 p-1 bg-white shadow-xs"
                />
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">{currentTenant.name}</h3>
                  <p className="text-xs text-slate-500 font-medium">Itemized Compensation & Tax Statement</p>
                  <p className="text-[10px] text-slate-400">Pay Period: {currentCycle.month}</p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  Verified & Approved
                </span>
                <p className="text-[11px] text-slate-400 mt-1 font-mono">SLIP-{selectedPayslip.id.toUpperCase()}</p>
              </div>
            </div>

            {/* Employee Demographic Block */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 text-xs bg-slate-50 p-3 rounded-xl mt-4 border border-slate-100">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Employee Name</span>
                <p className="font-bold text-slate-800">{selectedPayslip.employeeName}</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Employee ID</span>
                <p className="font-mono text-slate-800 font-semibold">{selectedPayslip.employeeCode}</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Department</span>
                <p className="text-slate-800 font-medium">{selectedPayslip.department}</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Designation</span>
                <p className="text-slate-800 font-medium">{selectedPayslip.designation}</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Bank Account</span>
                <p className="font-mono text-slate-800">{selectedPayslip.bankAccountMasked}</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Tax ID / PAN</span>
                <p className="font-mono text-slate-800">{selectedPayslip.panMasked}</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Working Days</span>
                <p className="text-slate-800">{selectedPayslip.workingDays} Days</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Paid Days</span>
                <p className="text-slate-800 font-bold">{selectedPayslip.paidDays} Days</p>
              </div>
            </div>

            {/* Breakdown Grid: Earnings vs Deductions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-xs">
              {/* Earnings Column */}
              <div className="border border-slate-200 rounded-xl p-3">
                <p className="font-bold text-slate-900 pb-2 border-b border-slate-100 uppercase tracking-wider text-[11px] text-[#4361EE]">
                  Earnings
                </p>
                <div className="space-y-2 mt-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Basic Salary</span>
                    <span className="font-semibold text-slate-800">${selectedPayslip.basicSalary.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">House Rent Allowance (HRA)</span>
                    <span className="font-semibold text-slate-800">${selectedPayslip.hra.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Special Allowance</span>
                    <span className="font-semibold text-slate-800">${selectedPayslip.specialAllowance.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Performance Bonus</span>
                    <span className="font-semibold text-slate-800">${selectedPayslip.bonus.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-slate-100 font-bold text-slate-900">
                    <span>Total Gross Earnings</span>
                    <span>${selectedPayslip.grossEarnings.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Deductions Column */}
              <div className="border border-slate-200 rounded-xl p-3">
                <p className="font-bold text-slate-900 pb-2 border-b border-slate-100 uppercase tracking-wider text-[11px] text-rose-600">
                  Deductions & Taxes
                </p>
                <div className="space-y-2 mt-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Provident Fund (PF)</span>
                    <span className="font-semibold text-slate-800">${selectedPayslip.providentFund.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Tax Deducted at Source (TDS)</span>
                    <span className="font-semibold text-slate-800">${selectedPayslip.taxDeducted.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Medical Group Coverage</span>
                    <span className="font-semibold text-slate-800">${selectedPayslip.medicalInsurance.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between pt-5 border-t border-slate-100 font-bold text-rose-600">
                    <span>Total Deductions</span>
                    <span>-${selectedPayslip.totalDeductions.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Net Payable Highlight */}
            <div className="mt-4 bg-[#EEF4FF] border border-blue-200 rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-[#4361EE] uppercase tracking-wide">Net Disbursed Amount</p>
                <p className="text-xs text-slate-500">Credited to registered corporate bank account</p>
              </div>
              <p className="text-2xl font-extrabold text-[#4361EE]">
                ${selectedPayslip.netPayable.toLocaleString()}
              </p>
            </div>

            {/* Actions */}
            <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-100">
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <ShieldCheck size={14} className="text-emerald-600" />
                <span>Digitally signed and cryptographically verified by NattonFlow HR</span>
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    window.print();
                    showToast('Sending payslip to printer/PDF generator.');
                  }}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center gap-1"
                >
                  <Printer size={14} />
                  <span>Print / Save PDF</span>
                </button>
                <button
                  onClick={() => setSelectedPayslip(null)}
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-[#4361EE] hover:bg-blue-700 rounded-lg"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
