import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Receipt, 
  Laptop, 
  LifeBuoy, 
  Plus, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  TrendingUp, 
  FileText,
  DollarSign,
  X
} from 'lucide-react';
import { ExpenseClaim, HelpdeskTicket } from '../types';

export const OperationsView: React.FC = () => {
  const { 
    currentView, 
    expenses, 
    addExpense, 
    approveExpense, 
    assets, 
    tickets, 
    addTicket, 
    currentUser, 
    showToast 
  } = useApp();

  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showTicketModal, setShowTicketModal] = useState(false);

  // Expense form state
  const [expCategory, setExpCategory] = useState<ExpenseClaim['category']>('Travel');
  const [expAmount, setExpAmount] = useState('85');
  const [expMerchant, setExpMerchant] = useState('');
  const [expDesc, setExpDesc] = useState('');

  // Ticket form state
  const [tktCategory, setTktCategory] = useState<HelpdeskTicket['category']>('Payroll Query');
  const [tktSubject, setTktSubject] = useState('');
  const [tktPriority, setTktPriority] = useState<HelpdeskTicket['priority']>('medium');

  const isFinanceOrHR = currentUser.role === 'payroll_admin' || currentUser.role === 'hr_admin' || currentUser.role === 'company_owner' || currentUser.role === 'super_admin';

  const handleExpenseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expMerchant || !expAmount) return;
    addExpense(expCategory, parseFloat(expAmount) || 0, expMerchant, expDesc);
    setShowExpenseModal(false);
    setExpMerchant('');
    setExpDesc('');
  };

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tktSubject) return;
    addTicket(tktCategory, tktSubject, tktPriority);
    setShowTicketModal(false);
    setTktSubject('');
  };

  return (
    <div className="space-y-6">
      {/* Dynamic View rendering depending on sidebar selection: expenses, assets, or helpdesk */}
      {currentView === 'expenses' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <Receipt className="text-[#4361EE]" size={22} />
                <span>Expenses & Corporate Reimbursements</span>
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Fast receipt scanning, policy-compliant expense claims, and direct payroll reimbursement.
              </p>
            </div>

            <button
              onClick={() => setShowExpenseModal(true)}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-[#4361EE] hover:bg-blue-700 rounded-lg flex items-center gap-1.5 shadow-sm"
            >
              <Plus size={15} />
              <span>Claim Expense</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs">
              <span className="text-slate-400 font-semibold uppercase">Pending Claims</span>
              <p className="text-xl font-bold text-amber-600 mt-1">
                ${expenses.filter(e => e.status === 'pending').reduce((s, e) => s + e.amount, 0).toLocaleString()}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">Awaiting manager sign-off</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs">
              <span className="text-slate-400 font-semibold uppercase">Reimbursed This Quarter</span>
              <p className="text-xl font-bold text-emerald-600 mt-1">
                ${expenses.filter(e => e.status === 'approved').reduce((s, e) => s + e.amount, 0).toLocaleString()}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">Processed through payroll ACH</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs">
              <span className="text-slate-400 font-semibold uppercase">Average Turnaround</span>
              <p className="text-xl font-bold text-slate-800 mt-1">1.8 Days</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Fastest in enterprise benchmark</p>
            </div>
          </div>

          {/* Expenses Table */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F7F9FC] text-slate-500 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Employee</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Merchant & Description</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Amount ($)</th>
                    <th className="py-3 px-4">Status</th>
                    {isFinanceOrHR && <th className="py-3 px-4 text-right">Approval</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {expenses.map(exp => (
                    <tr key={exp.id} className="hover:bg-slate-50/70">
                      <td className="py-3 px-4 font-bold text-slate-900">{exp.employeeName}</td>
                      <td className="py-3 px-4">
                        <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] font-semibold">
                          {exp.category}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <p className="font-semibold text-slate-800">{exp.merchant}</p>
                        <p className="text-[11px] text-slate-500">{exp.description}</p>
                      </td>
                      <td className="py-3 px-4 text-slate-500 font-mono text-[11px]">{exp.date}</td>
                      <td className="py-3 px-4 font-bold text-slate-900">${exp.amount}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          exp.status === 'approved' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                        }`}>
                          {exp.status.toUpperCase()}
                        </span>
                      </td>
                      {isFinanceOrHR && (
                        <td className="py-3 px-4 text-right">
                          {exp.status === 'pending' ? (
                            <button
                              onClick={() => approveExpense(exp.id)}
                              className="px-2.5 py-1 text-[11px] font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded transition-colors"
                            >
                              Approve
                            </button>
                          ) : (
                            <span className="text-[11px] text-slate-400">Approved</span>
                          )}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {currentView === 'assets' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <Laptop className="text-[#4361EE]" size={22} />
                <span>Enterprise IT Hardware & Asset Inventory</span>
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Laptop allocation, serial number tracking, security encryption, and device offboarding.
              </p>
            </div>

            <button
              onClick={() => showToast('New hardware asset registered to inventory catalog.')}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-[#4361EE] hover:bg-blue-700 rounded-lg flex items-center gap-1.5 shadow-sm"
            >
              <Plus size={15} />
              <span>Register Hardware</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {assets.map(ast => (
              <div key={ast.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                    {ast.type}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    ast.status === 'allocated' ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-blue-700'
                  }`}>
                    {ast.status.toUpperCase()}
                  </span>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-slate-900">{ast.name}</h3>
                  <p className="text-[11px] font-mono text-slate-400 mt-0.5">SN: {ast.serialNumber}</p>
                </div>

                <div className="pt-2 border-t border-slate-100 text-xs">
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">Assigned Custodian</p>
                  <p className="font-semibold text-slate-800">{ast.assignedToName || 'In IT Stockroom'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {currentView === 'helpdesk' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <LifeBuoy className="text-[#4361EE]" size={22} />
                <span>Internal HR & IT Helpdesk</span>
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Confidential employee support tickets, payroll queries, and policy escalations.
              </p>
            </div>

            <button
              onClick={() => setShowTicketModal(true)}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-[#4361EE] hover:bg-blue-700 rounded-lg flex items-center gap-1.5 shadow-sm"
            >
              <Plus size={15} />
              <span>Raise Ticket</span>
            </button>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F7F9FC] text-slate-500 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Raised By</th>
                    <th className="py-3 px-4">Subject</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Priority</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Logged Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {tickets.map(tkt => (
                    <tr key={tkt.id} className="hover:bg-slate-50/70">
                      <td className="py-3 px-4 font-semibold text-slate-900">{tkt.employeeName}</td>
                      <td className="py-3 px-4 font-medium text-slate-800">{tkt.subject}</td>
                      <td className="py-3 px-4">
                        <span className="bg-blue-50 text-[#4361EE] px-2 py-0.5 rounded text-[10px] font-semibold">
                          {tkt.category}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          tkt.priority === 'high' ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {tkt.priority.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                          {tkt.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-400 font-mono text-[11px]">{tkt.createdAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Claim Expense Modal */}
      {showExpenseModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <form onSubmit={handleExpenseSubmit} className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Claim Expense Reimbursement</h3>
              <button 
                type="button" 
                onClick={() => setShowExpenseModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={18} />
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
              <select
                value={expCategory}
                onChange={(e) => setExpCategory(e.target.value as ExpenseClaim['category'])}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-200"
              >
                <option value="Travel">Travel & Lodging</option>
                <option value="Client Meal">Client Meal & Hospitality</option>
                <option value="Software & Tools">Software Licenses & Tools</option>
                <option value="Office Supplies">Home Office & Ergonomics</option>
                <option value="Certification">Training & Certifications</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Amount ($)</label>
                <input
                  type="number"
                  required
                  value={expAmount}
                  onChange={(e) => setExpAmount(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Merchant / Vendor</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Uber / Delta / GitHub"
                  value={expMerchant}
                  onChange={(e) => setExpMerchant(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Business Justification</label>
              <textarea
                required
                rows={2}
                placeholder="Explain the business purpose..."
                value={expDesc}
                onChange={(e) => setExpDesc(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-200"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowExpenseModal(false)}
                className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-[#4361EE] hover:bg-blue-700 rounded-lg shadow-sm"
              >
                Submit Expense
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Raise Ticket Modal */}
      {showTicketModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <form onSubmit={handleTicketSubmit} className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Create HR Support Ticket</h3>
              <button 
                type="button" 
                onClick={() => setShowTicketModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={18} />
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
              <select
                value={tktCategory}
                onChange={(e) => setTktCategory(e.target.value as HelpdeskTicket['category'])}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-200"
              >
                <option value="Payroll Query">Payroll & Tax Query</option>
                <option value="IT Support">IT Hardware & Access Support</option>
                <option value="Policy Clarification">Policy Clarification</option>
                <option value="Health Insurance">Health Insurance Enrollment</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Priority</label>
              <select
                value={tktPriority}
                onChange={(e) => setTktPriority(e.target.value as HelpdeskTicket['priority'])}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-200"
              >
                <option value="low">Low - Routine Question</option>
                <option value="medium">Medium - Needs resolution within 2 days</option>
                <option value="high">High - Critical blocker</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Ticket Subject & Detail</label>
              <textarea
                required
                rows={3}
                placeholder="Describe your inquiry clearly..."
                value={tktSubject}
                onChange={(e) => setTktSubject(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-200"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowTicketModal(false)}
                className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-[#4361EE] hover:bg-blue-700 rounded-lg shadow-sm"
              >
                Submit Ticket
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
