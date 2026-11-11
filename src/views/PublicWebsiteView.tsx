import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Building2, 
  ShieldCheck, 
  Users, 
  CreditCard, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Star, 
  Lock, 
  Zap, 
  HelpCircle, 
  Smartphone,
  ChevronDown,
  ChevronUp,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const PublicWebsiteView: React.FC = () => {
  const { setCurrentView, showToast } = useApp();
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [trialEmail, setTrialEmail] = useState('');

  const handleStartTrial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trialEmail) return;
    try {
      confetti({ particleCount: 70, spread: 60 });
    } catch (e) {}
    showToast(`14-day free trial provisioned for ${trialEmail}! Welcome to NattonFlow HR.`);
    setTrialEmail('');
    setCurrentView('dashboard');
  };

  const faqs = [
    {
      q: "How does NattonFlow HR prevent payroll calculation errors?",
      a: "NattonFlow connects attendance logs, shift rosters, and approved leave records into an automated 8-stage payroll engine. Before salaries are finalized, our validation algorithm catches missing biometric punches, incorrect tax slab deductions, and anomalous compensation changes."
    },
    {
      q: "Can our employees use their smartphones for attendance?",
      a: "Yes! NattonFlow HR includes an ultra-fast mobile PWA and React Native app. Employees can clock-in via verified IP geo-fencing, submit time-off requests, and download encrypted payslips with a single tap."
    },
    {
      q: "How is company data kept private and secure?",
      a: "NattonFlow is built privacy-first with strict multi-tenant isolation. Every customer's database partitions are cryptographically tagged, and sensitive PII like SSNs and salaries are encrypted at the field level. Even Super Admins have zero access to private employee records."
    },
    {
      q: "Can we migrate data from our legacy HR software?",
      a: "Absolutely. NattonFlow includes seamless CSV and API migration bridges for BambooHR, Workday, Gusto, and spreadsheets, allowing standard company onboarding in under 15 minutes."
    }
  ];

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#172033] -m-4 sm:-m-6">
      {/* SaaS Website Top Navigation */}
      <nav className="bg-white/90 backdrop-blur-md sticky top-0 z-40 border-b border-slate-200 px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentView('dashboard')}>
          <img 
            src="/assets/aistudio/NattonFlow_HR_Team_Logo_cabe3d63.png" 
            alt="Logo" 
            className="w-14 h-14 object-contain rounded-xl p-0.5 hover:scale-105 transition-transform"
          />
        </div>

        <div className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600">
          <a href="#features" className="hover:text-[#4361EE] transition-colors">Features</a>
          <a href="#solutions" className="hover:text-[#4361EE] transition-colors">Solutions</a>
          <a href="#pricing" className="hover:text-[#4361EE] transition-colors">Pricing</a>
          <a href="#security" className="hover:text-[#4361EE] transition-colors">Privacy & Security</a>
          <a href="#faq" className="hover:text-[#4361EE] transition-colors">FAQ</a>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setCurrentView('dashboard')}
            className="px-3.5 py-2 text-xs font-bold text-slate-700 hover:text-slate-900 transition-colors"
          >
            Launch Platform Demo
          </button>
          <button
            onClick={() => {
              showToast('Demo booked! Our enterprise sales engineer will reach out.');
            }}
            className="px-4 py-2 text-xs font-bold text-white bg-[#4361EE] hover:bg-blue-700 rounded-lg shadow-sm transition-all"
          >
            Book Live Demo
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-16 md:py-24 max-w-6xl mx-auto text-center relative overflow-hidden">
        <div className="inline-flex items-center gap-2 bg-[#EEF4FF] text-[#4361EE] px-3.5 py-1.5 rounded-full text-xs font-bold mb-6 border border-blue-200">
          <Sparkles size={14} className="text-amber-500" />
          <span>The Modern, Privacy-First HRMS for Growing Enterprises</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#14213D] tracking-tight max-w-4xl mx-auto leading-tight">
          Run HR, attendance, payroll, and employee operations in <span className="text-[#4361EE]">one unified platform.</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mt-6 leading-relaxed">
          Eliminate manual spreadsheet errors, mismatched biometric punches, and confusing workflows. NattonFlow HR brings employee self-service, error-free payroll, and automated approvals together.
        </p>

        {/* Quick Email Trial Form */}
        <form onSubmit={handleStartTrial} className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-2 max-w-md mx-auto">
          <input
            type="email"
            required
            placeholder="Enter your corporate work email..."
            value={trialEmail}
            onChange={(e) => setTrialEmail(e.target.value)}
            className="w-full sm:w-auto flex-1 text-xs px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:border-[#4361EE] bg-white shadow-xs"
          />
          <button
            type="submit"
            className="w-full sm:w-auto px-5 py-3 text-xs font-bold text-white bg-[#4361EE] hover:bg-blue-700 rounded-xl shadow-md transition-all whitespace-nowrap"
          >
            Start 14-Day Free Trial
          </button>
        </form>

        <p className="text-[11px] text-slate-400 mt-2">
          No credit card required • Instant tenant setup • SOC-2 Type II Certified
        </p>

        {/* Hero Interactive App Banner Preview */}
        <div className="mt-12 bg-white rounded-2xl p-4 shadow-2xl border border-slate-200 max-w-4xl mx-auto">
          <div className="bg-[#14213D] text-white rounded-xl p-6 text-left flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs font-mono text-blue-300 uppercase">Live SaaS Workspace Demo</span>
              <h3 className="text-xl font-extrabold mt-1">Experience NattonFlow HR as HR Admin, Manager, or Employee</h3>
              <p className="text-xs text-slate-300 mt-1 max-w-lg">
                Explore real payroll validation, geofenced mobile check-ins, candidate ATS pipelines, and multi-tenant security right now.
              </p>
            </div>
            <button
              onClick={() => setCurrentView('dashboard')}
              className="px-5 py-2.5 bg-white text-[#14213D] hover:bg-slate-100 text-xs font-bold rounded-xl shadow-md transition-all whitespace-nowrap flex items-center gap-2"
            >
              <span>Enter Workspace</span>
              <ArrowRight size={14} className="text-[#4361EE]" />
            </button>
          </div>
        </div>
      </section>

      {/* Trusted By Logos */}
      <section className="border-y border-slate-200 bg-white py-10 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-6">
            Trusted by 850+ innovative enterprises and growing workforces worldwide
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 text-slate-600 font-extrabold text-sm sm:text-base">
            <span>Acme Cloud Technologies</span>
            <span>Globex Robotics</span>
            <span>Hyperion BioPharma</span>
            <span>Nextera FinTech</span>
            <span>Starlight Media</span>
          </div>
        </div>
      </section>

      {/* Problem vs Solution Section */}
      <section id="solutions" className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-[#4361EE]">The NattonFlow Difference</span>
          <h2 className="text-2xl sm:text-4xl font-black text-[#14213D] mt-2">
            Why leading companies replace legacy HRMS
          </h2>
          <p className="text-xs text-slate-500 mt-2">
            Traditional HR systems are crowded, slow, and prone to costly payroll mistakes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
              ✕
            </div>
            <h3 className="text-base font-bold text-slate-900">Legacy Systems: Manual Errors</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Exporting spreadsheets, manually checking attendance records, and correcting mistaken tax deductions at the end of each month.
            </p>
            <div className="pt-3 border-t border-slate-100 text-xs font-bold text-emerald-600 flex items-center gap-1.5">
              <CheckCircle2 size={16} />
              <span>NattonFlow: 8-Step Auto Validation</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
              ✕
            </div>
            <h3 className="text-base font-bold text-slate-900">Legacy Systems: Crowded Clutter</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Confusing menus with 50+ unlabelled buttons that require hours of employee training and cause endless HR helpdesk tickets.
            </p>
            <div className="pt-3 border-t border-slate-100 text-xs font-bold text-emerald-600 flex items-center gap-1.5">
              <CheckCircle2 size={16} />
              <span>NattonFlow: Zero-Clutter Calm UI</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
              ✕
            </div>
            <h3 className="text-base font-bold text-slate-900">Legacy Systems: Scattered Silos</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Separate tools for hiring, attendance, payslips, and leaves that never sync, creating discrepancies and delayed employee approvals.
            </p>
            <div className="pt-3 border-t border-slate-100 text-xs font-bold text-emerald-600 flex items-center gap-1.5">
              <CheckCircle2 size={16} />
              <span>NattonFlow: Unified Workforce Hub</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 bg-white border-y border-slate-200">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#4361EE]">Transparent SaaS Pricing</span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#14213D] mt-2">
              Simple plans that scale with your team
            </h2>
            <p className="text-xs text-slate-500 mt-2">
              No hidden setup fees. Unlimited digital payslips and free mobile apps included.
            </p>

            <div className="inline-flex items-center gap-2 bg-slate-100 p-1 rounded-xl mt-6">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                  billingCycle === 'monthly' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 ${
                  billingCycle === 'annual' ? 'bg-[#4361EE] text-white shadow-xs' : 'text-slate-500'
                }`}
              >
                <span>Annual</span>
                <span className="bg-emerald-400 text-slate-900 text-[10px] px-1.5 py-0.2 rounded font-black">SAVE 20%</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Growth Tier */}
            <div className="border border-slate-200 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Growth</h3>
                <p className="text-xs text-slate-500 mt-1">For startups and teams up to 50 employees</p>
                <div className="mt-4">
                  <span className="text-3xl font-black text-slate-900">
                    ${billingCycle === 'annual' ? '6' : '8'}
                  </span>
                  <span className="text-xs text-slate-400"> / employee / mo</span>
                </div>
                <ul className="mt-6 space-y-2.5 text-xs text-slate-600">
                  <li className="flex items-center gap-2"><CheckCircle2 size={15} className="text-emerald-500" /> Employee Directory & Profiles</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={15} className="text-emerald-500" /> Smart Biometric & Web Attendance</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={15} className="text-emerald-500" /> Time-off & Leave Management</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={15} className="text-emerald-500" /> Native Mobile App Access</li>
                </ul>
              </div>
              <button 
                onClick={() => setCurrentView('dashboard')}
                className="w-full mt-6 py-2.5 text-xs font-bold text-[#4361EE] bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"
              >
                Choose Growth
              </button>
            </div>

            {/* Professional Tier (Recommended) */}
            <div className="border-2 border-[#4361EE] rounded-2xl p-6 flex flex-col justify-between relative shadow-xl bg-slate-50/50">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#4361EE] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full">
                Most Popular
              </span>
              <div>
                <h3 className="text-base font-bold text-slate-900">Professional</h3>
                <p className="text-xs text-slate-500 mt-1">For scaling businesses up to 250 employees</p>
                <div className="mt-4">
                  <span className="text-3xl font-black text-[#4361EE]">
                    ${billingCycle === 'annual' ? '12' : '15'}
                  </span>
                  <span className="text-xs text-slate-400"> / employee / mo</span>
                </div>
                <ul className="mt-6 space-y-2.5 text-xs text-slate-600">
                  <li className="flex items-center gap-2"><CheckCircle2 size={15} className="text-[#4361EE]" /> Everything in Growth, plus:</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={15} className="text-[#4361EE]" /> Full Automated Payroll & Bank ACH</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={15} className="text-[#4361EE]" /> Candidate ATS & Recruitment Kanban</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={15} className="text-[#4361EE]" /> Expense Claims & Reimbursements</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={15} className="text-[#4361EE]" /> Performance Reviews & OKRs</li>
                </ul>
              </div>
              <button 
                onClick={() => setCurrentView('dashboard')}
                className="w-full mt-6 py-2.5 text-xs font-bold text-white bg-[#4361EE] hover:bg-blue-700 rounded-xl shadow-md transition-colors"
              >
                Start Free Trial
              </button>
            </div>

            {/* Enterprise Tier */}
            <div className="border border-slate-200 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Enterprise</h3>
                <p className="text-xs text-slate-500 mt-1">For organizations requiring custom compliance</p>
                <div className="mt-4">
                  <span className="text-3xl font-black text-slate-900">Custom</span>
                  <span className="text-xs text-slate-400"> / volume based</span>
                </div>
                <ul className="mt-6 space-y-2.5 text-xs text-slate-600">
                  <li className="flex items-center gap-2"><CheckCircle2 size={15} className="text-emerald-500" /> Dedicated Cloud Database Instance</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={15} className="text-emerald-500" /> Custom Payroll Formula Engine</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={15} className="text-emerald-500" /> SAML SSO / Okta / Azure AD</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={15} className="text-emerald-500" /> 24/7 Priority Support SLA</li>
                </ul>
              </div>
              <button 
                onClick={() => showToast('Enterprise inquiry logged. Sales team notified.')}
                className="w-full mt-6 py-2.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                Contact Enterprise Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section id="faq" className="py-20 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#4361EE]">Frequently Asked Questions</span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#14213D] mt-2">
            Everything you need to know
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full p-4 text-left text-xs sm:text-sm font-bold text-slate-900 flex items-center justify-between"
              >
                <span>{faq.q}</span>
                {activeFaq === idx ? <ChevronUp size={16} className="text-[#4361EE]" /> : <ChevronDown size={16} className="text-slate-400" />}
              </button>
              {activeFaq === idx && (
                <div className="px-4 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#14213D] text-white py-12 px-6 border-t border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img 
              src="/assets/aistudio/NattonFlow_HR_Team_Logo_cabe3d63.png" 
              alt="Logo" 
              className="w-8 h-8 object-contain rounded-md bg-white/10 p-0.5"
            />
            <div>
              <p className="font-bold text-sm">NattonFlow HR SaaS</p>
              <p className="text-[11px] text-slate-400">© 2026 NattonFlow Inc. All rights reserved.</p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-400 font-medium">
            <a href="#security" className="hover:text-white">Security & Privacy</a>
            <a href="#pricing" className="hover:text-white">Pricing</a>
            <a href="#faq" className="hover:text-white">Terms of Service</a>
            <button onClick={() => setCurrentView('dashboard')} className="text-blue-300 hover:text-white font-bold">
              Access App Dashboard →
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
