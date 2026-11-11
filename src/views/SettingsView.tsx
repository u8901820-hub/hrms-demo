import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Building2, 
  ShieldCheck, 
  Key, 
  Lock, 
  Clock, 
  Mail, 
  Globe, 
  Save, 
  FileText,
  Sliders,
  DollarSign
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { currentTenant, showToast, logAction } = useApp();

  const [companyName, setCompanyName] = useState(currentTenant.name);
  const [domain, setDomain] = useState(currentTenant.domain);
  const [currency, setCurrency] = useState(currentTenant.currency);
  const [timezone, setTimezone] = useState(currentTenant.timezone);
  const [enforceMfa, setEnforceMfa] = useState(currentTenant.securitySettings.enforceMfa);
  const [sessionTimeout, setSessionTimeout] = useState(currentTenant.securitySettings.sessionTimeoutMinutes);
  const [ipWhitelist, setIpWhitelist] = useState(currentTenant.securitySettings.ipWhitelistEnabled);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    currentTenant.name = companyName;
    currentTenant.domain = domain;
    currentTenant.currency = currency;
    currentTenant.timezone = timezone;
    currentTenant.securitySettings.enforceMfa = enforceMfa;
    currentTenant.securitySettings.sessionTimeoutMinutes = Number(sessionTimeout);
    currentTenant.securitySettings.ipWhitelistEnabled = ipWhitelist;

    logAction('ORG_SETTINGS_UPDATED', `Tenant settings and security parameters updated`, 'medium');
    showToast('Organization policies and security parameters updated successfully.');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Building2 className="text-[#4361EE]" size={22} />
          <span>Organization & Security Governance</span>
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Configure multi-tenant entity parameters, corporate policies, and enterprise MFA enforcement.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Company Profile Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
            <Building2 size={16} className="text-[#4361EE]" />
            <span>Organization Profile</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Company Legal Entity</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-200"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Corporate Domain</label>
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-200"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Payroll Currency</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-200"
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
              <label className="block text-xs font-semibold text-slate-700 mb-1">System Timezone</label>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-200"
              >
                <option value="Asia/Kolkata (IST)">Asia/Kolkata (IST)</option>
                <option value="America/New_York (EST)">America/New_York (EST)</option>
                <option value="America/Los_Angeles (PST)">America/Los_Angeles (PST)</option>
                <option value="Europe/London (GMT)">Europe/London (GMT)</option>
                <option value="Asia/Singapore (SGT)">Asia/Singapore (SGT)</option>
                <option value="Asia/Dubai (GST)">Asia/Dubai (GST)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Security & Access Policies */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
            <ShieldCheck size={16} className="text-[#4361EE]" />
            <span>Privacy & Identity Governance</span>
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div>
                <p className="text-xs font-bold text-slate-900">Enforce Multi-Factor Authentication (MFA)</p>
                <p className="text-[11px] text-slate-500">Require all employees and contractors to verify identity via Authenticator app</p>
              </div>
              <input
                type="checkbox"
                checked={enforceMfa}
                onChange={(e) => setEnforceMfa(e.target.checked)}
                className="w-4 h-4 text-[#4361EE] rounded cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div>
                <p className="text-xs font-bold text-slate-900">Corporate IP Geo-Fencing & Whitelisting</p>
                <p className="text-[11px] text-slate-500">Only permit biometric attendance check-in from authorized office IPs or approved VPN</p>
              </div>
              <input
                type="checkbox"
                checked={ipWhitelist}
                onChange={(e) => setIpWhitelist(e.target.checked)}
                className="w-4 h-4 text-[#4361EE] rounded cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Session Inactivity Timeout (Minutes)</label>
                <input
                  type="number"
                  min={5}
                  max={120}
                  value={sessionTimeout}
                  onChange={(e) => setSessionTimeout(Number(e.target.value))}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Compliance Audit Vault Retention</label>
                <input
                  type="text"
                  disabled
                  value="365 Days (SOC-2 Immutable)"
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-slate-100 text-slate-500"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-5 py-2.5 text-xs font-bold text-white bg-[#4361EE] hover:bg-blue-700 rounded-xl shadow-md flex items-center gap-2"
          >
            <Save size={15} />
            <span>Save Governance Policies</span>
          </button>
        </div>
      </form>
    </div>
  );
};
