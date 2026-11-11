import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import { 
  Lock, 
  ShieldCheck, 
  Mail, 
  Key, 
  ArrowRight, 
  CheckCircle2, 
  Building2, 
  Eye, 
  EyeOff,
  UserCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const LoginView: React.FC = () => {
  const { login, users, tenants } = useApp();
  const [email, setEmail] = useState('sophia.r@acmecloud.io');
  const [password, setPassword] = useState('••••••••••••');
  const [selectedRole, setSelectedRole] = useState<UserRole>('hr_admin');
  const [showPassword, setShowPassword] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState('849 201');
  const [rememberMe, setRememberMe] = useState(true);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, selectedRole);
    try {
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
    } catch (e) {}
  };

  const quickPersonas: Array<{ role: UserRole; name: string; title: string; email: string }> = [
    { role: 'super_admin', name: 'Elena Vance', title: 'Platform SuperAdmin', email: 'elena.vance@nattonflow.internal' },
    { role: 'company_owner', name: 'Marcus Sterling', title: 'Managing Director & Founder', email: 'marcus.s@acmecloud.io' },
    { role: 'hr_admin', name: 'Sophia Reynolds', title: 'Head of People & Culture', email: 'sophia.r@acmecloud.io' },
    { role: 'payroll_admin', name: 'David Chen, CPA', title: 'Lead Compensation Specialist', email: 'david.chen@acmecloud.io' },
    { role: 'manager', name: 'Rachel Albright', title: 'VP of Engineering', email: 'rachel.a@acmecloud.io' },
    { role: 'employee', name: 'Maya Lin', title: 'Senior Product Designer', email: 'maya.lin@acmecloud.io' }
  ];

  return (
    <div className="min-h-screen w-screen flex flex-col md:flex-row bg-[#F7F9FC]">
      {/* Left Brand Panel */}
      <div className="md:w-1/2 bg-gradient-to-br from-[#0f192e] via-[#14213D] to-[#1e325c] text-white p-8 md:p-14 flex flex-col justify-between relative overflow-hidden">
        {/* Top Brand Logo - Enriched & High-Impact */}
        <div className="relative z-10 flex items-center gap-4">
          <img 
            src="/assets/aistudio/NattonFlow_HR_Team_Logo_cabe3d63.png" 
            alt="Logo" 
            className="w-16 h-16 object-contain rounded-2xl bg-white p-1.5 shadow-xl transition-transform hover:scale-105"
          />
          <div>
            <span className="text-[10px] font-bold tracking-widest uppercase text-blue-300">
              Enterprise Unified Workforce
            </span>
            <p className="text-sm font-semibold text-slate-300">Multi-Tenant Cloud Platform</p>
          </div>
        </div>

        {/* Center Presentation */}
        <div className="relative z-10 my-10 space-y-5">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-200 px-3.5 py-1.5 rounded-full text-xs font-semibold border border-blue-400/20">
            <ShieldCheck size={14} className="text-emerald-400" />
            <span>Cryptographic Tenant Isolation & Data Protection</span>
          </div>

          <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
            Secure access to workforce operations, attendance, & payroll.
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-lg">
            Empower HR teams, managers, and employees with zero-error automated payroll, live geofenced attendance, and privacy-first SOC-2 security.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-700/60 max-w-md text-xs">
            <div className="flex items-center gap-2 text-slate-200">
              <CheckCircle2 size={15} className="text-emerald-400 flex-shrink-0" />
              <span>Multi-Client Tenancy</span>
            </div>
            <div className="flex items-center gap-2 text-slate-200">
              <CheckCircle2 size={15} className="text-emerald-400 flex-shrink-0" />
              <span>FIDO2 / TOTP 2FA</span>
            </div>
            <div className="flex items-center gap-2 text-slate-200">
              <CheckCircle2 size={15} className="text-emerald-400 flex-shrink-0" />
              <span>Global Multi-Currency (INR ₹, USD $)</span>
            </div>
            <div className="flex items-center gap-2 text-slate-200">
              <CheckCircle2 size={15} className="text-emerald-400 flex-shrink-0" />
              <span>Instant Bank ACH Export</span>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="relative z-10 text-[11px] text-slate-400 flex items-center justify-between">
          <span>Protected by AES-256 GCM encryption</span>
          <span>SOC-2 Type II Certified</span>
        </div>

        {/* Ambient subtle glow */}
        <div className="absolute right-0 bottom-0 w-96 h-96 bg-[#4361EE]/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Right Login Form Container */}
      <div className="md:w-1/2 p-6 sm:p-12 lg:p-16 flex flex-col justify-center max-w-xl mx-auto w-full">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Sign In to Workforce Portal</h1>
            <p className="text-xs text-slate-500 mt-1">
              Enter your corporate credentials to access your organization's workspace.
            </p>
          </div>

          {/* Quick Persona Demo Switcher */}
          <div className="bg-[#EEF4FF] p-3.5 rounded-xl border border-blue-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#4361EE] uppercase tracking-wider flex items-center gap-1.5">
                <UserCheck size={14} />
                <span>Instant 1-Click Role Login</span>
              </span>
              <span className="text-[10px] text-slate-500">Pick any persona</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
              {quickPersonas.map(p => (
                <button
                  key={p.role}
                  type="button"
                  onClick={() => {
                    setSelectedRole(p.role);
                    setEmail(p.email);
                  }}
                  className={`text-left p-1.5 rounded-lg text-[11px] transition-all border ${
                    selectedRole === p.role 
                      ? 'bg-white border-[#4361EE] text-[#4361EE] font-bold shadow-xs' 
                      : 'bg-white/60 hover:bg-white border-transparent text-slate-700'
                  }`}
                >
                  <p className="font-semibold truncate">{p.name.split(' ')[0]}</p>
                  <p className="text-[9px] text-slate-400 capitalize truncate">{p.role.replace('_', ' ')}</p>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Corporate Work Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4361EE] focus:ring-2 focus:ring-[#4361EE]/10 bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Encrypted Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-xs pl-9 pr-10 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#4361EE] focus:ring-2 focus:ring-[#4361EE]/10 bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* 2FA Token Code for Data Protection */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-semibold text-slate-700">Two-Factor Authentication (2FA)</label>
                <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                  <ShieldCheck size={12} />
                  <span>MFA Enforced</span>
                </span>
              </div>
              <div className="relative">
                <Key size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={twoFactorCode}
                  onChange={(e) => setTwoFactorCode(e.target.value)}
                  placeholder="6-digit authenticator code"
                  className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-slate-200 font-mono tracking-wider bg-white focus:outline-none focus:border-[#4361EE]"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-[#4361EE] focus:ring-[#4361EE]"
                />
                <span>Remember this authorized workstation</span>
              </label>

              <button
                type="button"
                onClick={() => alert('Password reset link sent to your registered corporate email.')}
                className="font-medium text-[#4361EE] hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#4361EE] hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-[#4361EE]/20 flex items-center justify-center gap-2 transition-all transform active:scale-98 mt-2"
            >
              <span>Authenticate & Enter Workspace</span>
              <ArrowRight size={15} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
