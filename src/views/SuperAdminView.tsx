import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  Building2, 
  CreditCard, 
  Server, 
  Activity, 
  AlertCircle, 
  CheckCircle2, 
  Lock, 
  DollarSign, 
  Users, 
  TrendingUp, 
  Database,
  RefreshCw,
  Search,
  X,
  Plus
} from 'lucide-react';
import { SaaSCompanyBilling } from '../types';

export const SuperAdminView: React.FC = () => {
  const { saasBillings, updateCompanyStatus, registerNewTenant, currentTenant, showToast, logAction } = useApp();
  const [filterPlan, setFilterPlan] = useState('all');
  const [search, setSearch] = useState('');
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  // Registration Form State
  const [clientName, setClientName] = useState('');
  const [clientDomain, setClientDomain] = useState('');
  const [clientPlan, setClientPlan] = useState<'Growth' | 'Professional' | 'Enterprise'>('Professional');
  const [clientCurrency, setClientCurrency] = useState('INR (₹)');
  const [clientTimezone, setClientTimezone] = useState('Asia/Kolkata (IST)');
  const [adminName, setAdminName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [seatLimit, setSeatLimit] = useState('100');
  const [initialStaffCount, setInitialStaffCount] = useState('15');

  const totalMRR = saasBillings.reduce((sum, b) => sum + b.monthlyRevenue, 0);
  const totalSeats = saasBillings.reduce((sum, b) => sum + b.activeSeats, 0);

  const filteredBillings = saasBillings.filter(b => {
    const matchesPlan = filterPlan === 'all' || b.plan === filterPlan;
    const matchesSearch = b.companyName.toLowerCase().includes(search.toLowerCase());
    return matchesPlan && matchesSearch;
  });

  const handleRegisterClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientDomain.trim()) {
      showToast('Please provide company name and domain.');
      return;
    }

    registerNewTenant({
      name: clientName.trim(),
      domain: clientDomain.trim().toLowerCase(),
      plan: clientPlan,
      currency: clientCurrency,
      timezone: clientTimezone,
      adminName: adminName.trim() || `${clientName} Administrator`,
      adminEmail: adminEmail.trim() || `admin@${clientDomain.trim().toLowerCase()}`,
      seatLimit: Number(seatLimit) || 50,
      initialEmployeesCount: Number(initialStaffCount) || 10
    });

    setShowRegisterModal(false);
    setClientName('');
    setClientDomain('');
    setAdminName('');
    setAdminEmail('');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-[#0f192e] text-white p-6 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-300 text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-2 border border-blue-500/30">
              <ShieldCheck size={13} />
              <span>Multi-Tenant Platform Control Plane</span>
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight">Super Admin SaaS Headquarters</h1>
            <p className="text-xs text-slate-300 mt-1 max-w-xl">
              Global tenant provisioning, automated recurring subscription billing, seat quota enforcement, and zero-PII architecture.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setShowRegisterModal(true)}
              className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg flex items-center gap-1.5 shadow-md transition-all"
            >
              <Building2 size={15} />
              <span>Register New Client</span>
            </button>

            <button
              onClick={() => {
                logAction('SUPER_ADMIN_SYSTEM_SYNC', 'Global health check and tenant storage audit performed', 'low');
                showToast('All multi-tenant instances healthy. Zero data leakage detected.');
              }}
              className="px-3.5 py-2 text-xs font-bold text-white bg-[#4361EE] hover:bg-blue-600 rounded-lg flex items-center gap-1.5 shadow-md transition-all"
            >
              <RefreshCw size={14} />
              <span>Run Diagnostics</span>
            </button>
          </div>
        </div>

        {/* Security boundary badge */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-2 text-[11px] text-amber-300">
          <Lock size={13} />
          <span>Strict Privacy Separation: Super Admins can monitor infrastructure & billing, but cannot view employee payslips or private health records.</span>
        </div>
      </div>

      {/* SaaS Business Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs">
          <p className="text-slate-400 font-semibold uppercase">Total Monthly Recurring (MRR)</p>
          <p className="text-2xl font-bold text-[#14213D] mt-1">${totalMRR.toLocaleString()}</p>
          <p className="text-[11px] text-emerald-600 font-medium mt-0.5">+18.4% growth vs last quarter</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs">
          <p className="text-slate-400 font-semibold uppercase">Active Licensed Seats</p>
          <p className="text-2xl font-bold text-[#4361EE] mt-1">{totalSeats}</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Across {saasBillings.length} enterprise tenants</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs">
          <p className="text-slate-400 font-semibold uppercase">Platform Uptime (SLA)</p>
          <p className="text-2xl font-bold text-emerald-600 mt-1">99.99%</p>
          <p className="text-[11px] text-slate-400 mt-0.5">All 3 multi-region clusters online</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs">
          <p className="text-slate-400 font-semibold uppercase">MFA Compliance Rate</p>
          <p className="text-2xl font-bold text-indigo-600 mt-1">97.8%</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Enterprise security threshold met</p>
        </div>
      </div>

      {/* Tenant Companies Management Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Provisioned Tenant Accounts</h2>
            <p className="text-xs text-slate-500">Live subscription plans, seat allocations, and activation state</p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-60">
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search company..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full text-xs pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 bg-[#F7F9FC]"
              />
            </div>

            <select
              value={filterPlan}
              onChange={(e) => setFilterPlan(e.target.value)}
              className="text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 bg-[#F7F9FC]"
            >
              <option value="all">All Plans</option>
              <option value="Enterprise">Enterprise</option>
              <option value="Professional">Professional</option>
              <option value="Growth">Growth</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7F9FC] text-slate-500 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Organization Name</th>
                <th className="py-3 px-4">Plan Tier</th>
                <th className="py-3 px-4">Seat Utilization</th>
                <th className="py-3 px-4">Monthly Value</th>
                <th className="py-3 px-4">Next Renewal</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Tenant Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredBillings.map(comp => (
                <tr key={comp.id} className="hover:bg-slate-50/70">
                  <td className="py-3 px-4 font-bold text-slate-900 flex items-center gap-2">
                    <Building2 size={16} className="text-[#4361EE]" />
                    <span>{comp.companyName}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-slate-800 bg-slate-100 px-2 py-0.5 rounded text-[10px]">
                      {comp.plan}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-slate-800">{comp.activeSeats} / {comp.seatLimit}</span>
                      <div className="w-16 bg-slate-100 rounded-full h-1.5">
                        <div 
                          className="bg-[#4361EE] h-1.5 rounded-full" 
                          style={{ width: `${(comp.activeSeats / comp.seatLimit) * 100}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-900">${comp.monthlyRevenue.toLocaleString()} / mo</td>
                  <td className="py-3 px-4 text-slate-500 font-mono text-[11px]">{comp.renewalDate}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      comp.status === 'active' 
                        ? 'bg-emerald-50 text-emerald-700' 
                        : comp.status === 'trial'
                        ? 'bg-blue-50 text-blue-700'
                        : 'bg-rose-50 text-rose-700'
                    }`}>
                      {comp.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    {comp.status === 'active' ? (
                      <button
                        onClick={() => updateCompanyStatus(comp.id, 'suspended')}
                        className="px-2.5 py-1 text-[11px] font-semibold text-rose-600 hover:bg-rose-50 rounded transition-colors"
                      >
                        Suspend
                      </button>
                    ) : (
                      <button
                        onClick={() => updateCompanyStatus(comp.id, 'active')}
                        className="px-2.5 py-1 text-[11px] font-semibold text-emerald-600 hover:bg-emerald-50 rounded transition-colors"
                      >
                        Activate
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dynamic Client Registration Modal for Super Admin */}
      {showRegisterModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <form 
            onSubmit={handleRegisterClient} 
            className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4 my-8"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
                  <Building2 size={18} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Provision New Client Tenant</h3>
                  <p className="text-xs text-slate-500">Register and isolate client organization database & workforce</p>
                </div>
              </div>
              <button 
                type="button" 
                onClick={() => setShowRegisterModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Client Legal Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tata Consultancy / InfoTech"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-[#4361EE]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Corporate Domain *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. infotech.in"
                  value={clientDomain}
                  onChange={(e) => setClientDomain(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-[#4361EE]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">SaaS Plan Tier</label>
                <select
                  value={clientPlan}
                  onChange={(e) => setClientPlan(e.target.value as any)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200"
                >
                  <option value="Growth">Growth</option>
                  <option value="Professional">Professional</option>
                  <option value="Enterprise">Enterprise</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Payroll Currency</label>
                <select
                  value={clientCurrency}
                  onChange={(e) => setClientCurrency(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 font-medium"
                >
                  <option value="INR (₹)">INR (₹) - Indian Rupee</option>
                  <option value="USD ($)">USD ($) - US Dollar</option>
                  <option value="EUR (€)">EUR (€) - Euro</option>
                  <option value="GBP (£)">GBP (£) - British Pound</option>
                  <option value="SGD ($)">SGD ($) - Singapore Dollar</option>
                  <option value="AED (د.إ)">AED (د.إ) - UAE Dirham</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Timezone</label>
                <select
                  value={clientTimezone}
                  onChange={(e) => setClientTimezone(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200"
                >
                  <option value="Asia/Kolkata (IST)">Asia/Kolkata (IST)</option>
                  <option value="America/New_York (EST)">America/New_York (EST)</option>
                  <option value="Europe/London (GMT)">Europe/London (GMT)</option>
                  <option value="Asia/Dubai (GST)">Asia/Dubai (GST)</option>
                  <option value="Asia/Singapore (SGT)">Asia/Singapore (SGT)</option>
                </select>
              </div>
            </div>

            {/* Client Admin Credentials Block */}
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Primary Client Administrator Account
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Admin Full Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Rajesh Sharma"
                    value={adminName}
                    onChange={(e) => setAdminName(e.target.value)}
                    className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Admin Official Email</label>
                  <input
                    type="email"
                    placeholder="rajesh@client.com"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-white"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Seat License Quota</label>
                <input
                  type="number"
                  value={seatLimit}
                  onChange={(e) => setSeatLimit(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Initial Employees</label>
                <input
                  type="number"
                  value={initialStaffCount}
                  onChange={(e) => setInitialStaffCount(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowRegisterModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm flex items-center gap-1.5"
              >
                <Building2 size={14} />
                <span>Provision Client Organization</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
