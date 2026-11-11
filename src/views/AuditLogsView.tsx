import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Lock, 
  ShieldCheck, 
  Key, 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  Search, 
  Filter,
  Download,
  EyeOff
} from 'lucide-react';

export const AuditLogsView: React.FC = () => {
  const { auditLogs, currentTenant, showToast } = useApp();
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [search, setSearch] = useState('');

  const filteredLogs = auditLogs.filter(log => {
    const matchesSev = filterSeverity === 'all' || log.severity === filterSeverity;
    const matchesSearch = log.action.toLowerCase().includes(search.toLowerCase()) || 
                          log.actorName.toLowerCase().includes(search.toLowerCase()) ||
                          log.resource.toLowerCase().includes(search.toLowerCase());
    return matchesSev && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Lock className="text-[#4361EE]" size={22} />
            <span>Privacy Controls & Compliance Audit Vault</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Immutable SOC-2 audit logs, field-level access protection, and multi-tenant cryptographic isolation.
          </p>
        </div>

        <button
          onClick={() => showToast('Audit vault ledger exported to cryptographically signed CSV.')}
          className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg flex items-center gap-1.5 shadow-xs"
        >
          <Download size={14} className="text-[#4361EE]" />
          <span>Export Compliance Vault</span>
        </button>
      </div>

      {/* Security Posture Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs">
          <div className="flex items-center gap-2 text-emerald-600 font-bold mb-1">
            <ShieldCheck size={16} />
            <span>Tenant Data Segregation</span>
          </div>
          <p className="text-slate-800 font-semibold text-sm">Hardware-level Multi-Tenancy</p>
          <p className="text-[11px] text-slate-400 mt-1">Tenant ID ({currentTenant.id}) cryptographically tagged on every query</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs">
          <div className="flex items-center gap-2 text-[#4361EE] font-bold mb-1">
            <EyeOff size={16} />
            <span>Field-Level Encryption</span>
          </div>
          <p className="text-slate-800 font-semibold text-sm">PII & Compensation Masked</p>
          <p className="text-[11px] text-slate-400 mt-1">SSN/PAN, bank routing, and salary brackets hidden from standard roles</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs">
          <div className="flex items-center gap-2 text-indigo-600 font-bold mb-1">
            <Key size={16} />
            <span>MFA & Session Governance</span>
          </div>
          <p className="text-slate-800 font-semibold text-sm">FIDO2 / TOTP Enforced</p>
          <p className="text-[11px] text-slate-400 mt-1">Automatic timeout after {currentTenant.securitySettings.sessionTimeoutMinutes} mins of inactivity</p>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-72">
            <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search audit trail..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-xs pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 bg-[#F7F9FC]"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 bg-[#F7F9FC]"
            >
              <option value="all">All Severities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7F9FC] text-slate-500 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Actor</th>
                <th className="py-3 px-4">Event Type</th>
                <th className="py-3 px-4">Resource Target</th>
                <th className="py-3 px-4">Origin IP</th>
                <th className="py-3 px-4">Severity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredLogs.map(log => (
                <tr key={log.id} className="hover:bg-slate-50/70">
                  <td className="py-3 px-4 font-mono text-slate-500 text-[11px]">{log.timestamp}</td>
                  <td className="py-3 px-4">
                    <p className="font-bold text-slate-900">{log.actorName}</p>
                    <p className="text-[10px] text-slate-400">{log.actorRole}</p>
                  </td>
                  <td className="py-3 px-4 font-mono font-semibold text-slate-800 text-[11px]">{log.action}</td>
                  <td className="py-3 px-4 text-slate-600 truncate max-w-[220px]">{log.resource}</td>
                  <td className="py-3 px-4 font-mono text-slate-400 text-[11px]">{log.ipAddress}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      log.severity === 'critical'
                        ? 'bg-rose-100 text-rose-800'
                        : log.severity === 'high'
                        ? 'bg-amber-100 text-amber-800'
                        : log.severity === 'medium'
                        ? 'bg-blue-100 text-[#4361EE]'
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {log.severity.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
