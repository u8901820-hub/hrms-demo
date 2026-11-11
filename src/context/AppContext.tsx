import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, 
  Tenant, 
  UserRole, 
  TenantId, 
  AttendanceRecord, 
  LeaveRequest, 
  PayrollCycle, 
  PayslipItem, 
  JobOpening, 
  Candidate, 
  ExpenseClaim, 
  AuditLog, 
  CompanyAsset, 
  HelpdeskTicket, 
  SaaSCompanyBilling 
} from '../types';
import { 
  INITIAL_TENANTS, 
  INITIAL_USERS, 
  INITIAL_ATTENDANCE, 
  INITIAL_LEAVES, 
  INITIAL_PAYROLL_CYCLES, 
  INITIAL_PAYSLIPS, 
  INITIAL_JOBS, 
  INITIAL_CANDIDATES, 
  INITIAL_EXPENSES, 
  INITIAL_AUDIT_LOGS, 
  INITIAL_ASSETS, 
  INITIAL_HELPDESK, 
  INITIAL_SAAS_BILLINGS 
} from '../data/mockData';

export type AppView = 
  | 'public_website' 
  | 'super_admin' 
  | 'dashboard' 
  | 'employees' 
  | 'attendance' 
  | 'leaves' 
  | 'payroll' 
  | 'recruitment' 
  | 'performance' 
  | 'expenses' 
  | 'assets' 
  | 'helpdesk' 
  | 'audit_logs' 
  | 'reports' 
  | 'settings' 
  | 'mobile_preview';

interface AppContextType {
  // Current session & view
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  currentUser: User;
  setCurrentUser: (user: User) => void;
  currentTenant: Tenant;
  setCurrentTenant: (tenant: Tenant) => void;
  tenants: Tenant[];
  users: User[];
  
  // Role switcher helper
  switchRole: (role: UserRole) => void;
  switchTenant: (tenantId: TenantId) => void;
  
  // Attendance operations
  attendance: AttendanceRecord[];
  checkInCurrentEmployee: () => void;
  checkOutCurrentEmployee: () => void;
  requestAttendanceCorrection: (date: string, reason: string) => void;
  approveAttendanceCorrection: (recordId: string) => void;
  
  // Leaves
  leaves: LeaveRequest[];
  applyLeave: (leaveType: LeaveRequest['leaveType'], startDate: string, endDate: string, days: number, reason: string) => void;
  updateLeaveStatus: (leaveId: string, status: 'approved' | 'rejected', notes?: string) => void;
  
  // Payroll
  payrollCycles: PayrollCycle[];
  payslips: PayslipItem[];
  runPayrollValidation: (cycleId: string) => void;
  approvePayrollCycle: (cycleId: string) => void;
  publishPayrollCycle: (cycleId: string) => void;
  
  // ATS Recruitment
  jobs: JobOpening[];
  candidates: Candidate[];
  addJobOpening: (job: Omit<JobOpening, 'id' | 'tenantId' | 'applicantsCount' | 'postedDate'>) => void;
  updateCandidateStage: (candidateId: string, newStage: Candidate['stage']) => void;
  
  // Expenses
  expenses: ExpenseClaim[];
  addExpense: (category: ExpenseClaim['category'], amount: number, merchant: string, description: string) => void;
  approveExpense: (id: string) => void;
  
  // Tickets & Assets
  tickets: HelpdeskTicket[];
  addTicket: (category: HelpdeskTicket['category'], subject: string, priority: HelpdeskTicket['priority']) => void;
  assets: CompanyAsset[];
  
  // SaaS Admin Data & Client Tenant Registration
  saasBillings: SaaSCompanyBilling[];
  updateCompanyStatus: (companyId: string, status: SaaSCompanyBilling['status']) => void;
  registerNewTenant: (data: {
    name: string;
    domain: string;
    plan: 'Growth' | 'Professional' | 'Enterprise';
    currency: string;
    timezone: string;
    adminName: string;
    adminEmail: string;
    seatLimit: number;
    initialEmployeesCount: number;
  }) => void;
  
  // Authentication & Security Gate
  isAuthenticated: boolean;
  login: (email: string, role?: UserRole) => boolean;
  logout: () => void;
  
  // Audit Logs
  auditLogs: AuditLog[];
  logAction: (action: string, resource: string, severity?: AuditLog['severity']) => void;

  // Search & Global quick actions
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  notificationsCount: number;
  clearNotifications: () => void;
  notificationsList: Array<{ id: string; title: string; time: string; read: boolean }>;

  // Toast alert feedback
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tenants, setTenants] = useState<Tenant[]>(() => {
    const saved = localStorage.getItem('nattonflow_tenants');
    return saved ? JSON.parse(saved) : INITIAL_TENANTS;
  });
  
  const [currentTenant, setCurrentTenant] = useState<Tenant>(tenants[0]);
  const [currentView, setCurrentView] = useState<AppView>('dashboard');
  
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('nattonflow_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  // Default login: HR Admin for richest overview, can easily switch via top role bar
  const [currentUser, setCurrentUser] = useState<User>(() => {
    return users.find(u => u.role === 'hr_admin') || users[0];
  });

  const [attendance, setAttendance] = useState<AttendanceRecord[]>(INITIAL_ATTENDANCE);
  const [leaves, setLeaves] = useState<LeaveRequest[]>(INITIAL_LEAVES);
  const [payrollCycles, setPayrollCycles] = useState<PayrollCycle[]>(INITIAL_PAYROLL_CYCLES);
  const [payslips, setPayslips] = useState<PayslipItem[]>(INITIAL_PAYSLIPS);
  const [jobs, setJobs] = useState<JobOpening[]>(INITIAL_JOBS);
  const [candidates, setCandidates] = useState<Candidate[]>(INITIAL_CANDIDATES);
  const [expenses, setExpenses] = useState<ExpenseClaim[]>(INITIAL_EXPENSES);
  const [assets] = useState<CompanyAsset[]>(INITIAL_ASSETS);
  const [tickets, setTickets] = useState<HelpdeskTicket[]>(INITIAL_HELPDESK);
  const [saasBillings, setSaasBillings] = useState<SaaSCompanyBilling[]>(INITIAL_SAAS_BILLINGS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);
  
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const saved = localStorage.getItem('nattonflow_auth');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [notificationsList, setNotificationsList] = useState([
    { id: 'notif-1', title: 'Payroll validation completed for November 2026', time: '10m ago', read: false },
    { id: 'notif-2', title: 'New leave request from Maya Lin (4 days)', time: '45m ago', read: false },
    { id: 'notif-3', title: 'Carlos Mendez submitted attendance correction', time: '2h ago', read: false },
    { id: 'notif-4', title: 'Candidate Sergei Voronov advanced to Technical round', time: '5h ago', read: true }
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const logAction = (action: string, resource: string, severity: AuditLog['severity'] = 'low') => {
    const newLog: AuditLog = {
      id: `aud-${Date.now()}`,
      tenantId: currentTenant.id,
      actorName: currentUser.name,
      actorRole: currentUser.role.replace('_', ' ').toUpperCase(),
      action,
      resource,
      ipAddress: '198.51.100.' + Math.floor(Math.random() * 50 + 10),
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      severity
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const switchRole = (role: UserRole) => {
    const match = users.find(u => u.role === role);
    if (match) {
      setCurrentUser(match);
      logAction('USER_ROLE_SWITCHED', `Switched context to ${role}`, 'low');
      showToast(`Switched active profile to ${match.name} (${match.role.replace('_', ' ')})`);
      
      // Auto-route super_admin to super_admin platform view
      if (role === 'super_admin') {
        setCurrentView('super_admin');
      } else if (currentView === 'super_admin') {
        setCurrentView('dashboard');
      }
    }
  };

  const switchTenant = (tenantId: TenantId) => {
    const target = tenants.find(t => t.id === tenantId);
    if (target) {
      setCurrentTenant(target);
      logAction('TENANT_SWITCHED', `Switched active company to ${target.name}`, 'medium');
      showToast(`Active organization set to: ${target.name}`);
    }
  };

  const checkInCurrentEmployee = () => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const todayStr = now.toISOString().split('T')[0];

    // Check if record exists
    const existing = attendance.find(a => a.employeeId === currentUser.id && a.date === todayStr);
    if (existing) {
      showToast('You are already checked in for today!');
      return;
    }

    const newRecord: AttendanceRecord = {
      id: `att-${Date.now()}`,
      tenantId: currentTenant.id,
      employeeId: currentUser.id,
      employeeName: currentUser.name,
      department: currentUser.department,
      date: todayStr,
      checkIn: timeStr,
      checkOut: null,
      status: 'present',
      workHours: 0.1,
      location: 'Web Portal (Secure Geo-Fence)',
      ipAddress: '198.51.100.22'
    };

    setAttendance(prev => [newRecord, ...prev]);
    logAction('EMPLOYEE_CHECKED_IN', `Check-in recorded at ${timeStr}`, 'low');
    showToast(`Checked in successfully at ${timeStr}! Have a great day.`);
  };

  const checkOutCurrentEmployee = () => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const todayStr = now.toISOString().split('T')[0];

    let found = false;
    setAttendance(prev => prev.map(rec => {
      if (rec.employeeId === currentUser.id && (!rec.checkOut || rec.checkOut === '-')) {
        found = true;
        return {
          ...rec,
          checkOut: timeStr,
          workHours: Math.max(rec.workHours, 8.2)
        };
      }
      return rec;
    }));

    if (found) {
      logAction('EMPLOYEE_CHECKED_OUT', `Check-out recorded at ${timeStr}`, 'low');
      showToast(`Checked out successfully at ${timeStr}!`);
    } else {
      showToast('No active check-in session found for checkout.');
    }
  };

  const requestAttendanceCorrection = (date: string, reason: string) => {
    setAttendance(prev => prev.map(rec => {
      if (rec.employeeId === currentUser.id && (rec.date === date || !date)) {
        return {
          ...rec,
          correctionRequested: true,
          correctionReason: reason,
          correctionStatus: 'pending'
        };
      }
      return rec;
    }));
    logAction('ATTENDANCE_CORRECTION_REQUESTED', `Date: ${date}, Reason: ${reason}`, 'low');
    showToast('Attendance regularization request submitted to your reporting manager.');
  };

  const approveAttendanceCorrection = (recordId: string) => {
    setAttendance(prev => prev.map(rec => {
      if (rec.id === recordId) {
        return {
          ...rec,
          status: 'present',
          correctionStatus: 'approved'
        };
      }
      return rec;
    }));
    logAction('ATTENDANCE_CORRECTION_APPROVED', `Record ID: ${recordId}`, 'medium');
    showToast('Attendance regularization approved and synchronized to payroll.');
  };

  const applyLeave = (
    leaveType: LeaveRequest['leaveType'], 
    startDate: string, 
    endDate: string, 
    days: number, 
    reason: string
  ) => {
    const newLeave: LeaveRequest = {
      id: `lv-${Date.now()}`,
      tenantId: currentTenant.id,
      employeeId: currentUser.id,
      employeeName: currentUser.name,
      department: currentUser.department,
      leaveType,
      startDate,
      endDate,
      days,
      reason,
      status: 'pending',
      appliedOn: new Date().toISOString().split('T')[0],
      approverId: currentUser.managerId || 'usr-mgr-1',
      approverName: currentUser.managerName || 'Rachel K. Albright'
    };

    setLeaves(prev => [newLeave, ...prev]);
    logAction('LEAVE_APPLICATION_SUBMITTED', `${days} days ${leaveType} (${startDate} to ${endDate})`, 'low');
    showToast(`Leave request for ${days} day(s) submitted for manager approval.`);
  };

  const updateLeaveStatus = (leaveId: string, status: 'approved' | 'rejected', notes?: string) => {
    setLeaves(prev => prev.map(lv => {
      if (lv.id === leaveId) {
        return {
          ...lv,
          status,
          approvalNotes: notes || (status === 'approved' ? 'Approved by Manager' : 'Declined due to coverage constraints')
        };
      }
      return lv;
    }));
    logAction(`LEAVE_${status.toUpperCase()}`, `Leave request #${leaveId} set to ${status}`, 'medium');
    showToast(`Leave request ${status} successfully.`);
  };

  const runPayrollValidation = (cycleId: string) => {
    setPayrollCycles(prev => prev.map(cycle => {
      if (cycle.id === cycleId) {
        return {
          ...cycle,
          status: 'validated',
          warningsCount: 1
        };
      }
      return cycle;
    }));
    logAction('PAYROLL_VALIDATION_COMPLETED', `Engine verified 10 active employee ledger rows.`, 'medium');
    showToast('Automated payroll checks passed! 1 non-blocking notice flagged for review.');
  };

  const approvePayrollCycle = (cycleId: string) => {
    setPayrollCycles(prev => prev.map(cycle => {
      if (cycle.id === cycleId) {
        return {
          ...cycle,
          status: 'approved'
        };
      }
      return cycle;
    }));
    logAction('PAYROLL_APPROVED_BY_ADMIN', `Cycle #${cycleId} authorized for release.`, 'high');
    showToast('Payroll authorized! Ready for one-click publishing and bank ACH export.');
  };

  const publishPayrollCycle = (cycleId: string) => {
    setPayrollCycles(prev => prev.map(cycle => {
      if (cycle.id === cycleId) {
        return {
          ...cycle,
          status: 'published',
          processedAt: new Date().toISOString().replace('T', ' ').slice(0, 16)
        };
      }
      return cycle;
    }));

    setPayslips(prev => prev.map(slip => {
      if (slip.payrollCycleId === cycleId) {
        return { ...slip, status: 'published' };
      }
      return slip;
    }));

    logAction('PAYROLL_PUBLISHED_TO_EMPLOYEES', `Direct deposits released and payslips sent to ESS.`, 'high');
    showToast('Payroll published! Employees can now download official digital payslips.');
  };

  const addJobOpening = (jobData: Omit<JobOpening, 'id' | 'tenantId' | 'applicantsCount' | 'postedDate'>) => {
    const newJob: JobOpening = {
      ...jobData,
      id: `job-${Date.now()}`,
      tenantId: currentTenant.id,
      applicantsCount: 0,
      postedDate: new Date().toISOString().split('T')[0]
    };
    setJobs(prev => [newJob, ...prev]);
    logAction('JOB_REQUISITION_POSTED', `Job: ${jobData.title} in ${jobData.department}`, 'medium');
    showToast(`Job listing "${jobData.title}" published to careers board.`);
  };

  const updateCandidateStage = (candidateId: string, newStage: Candidate['stage']) => {
    setCandidates(prev => prev.map(cand => {
      if (cand.id === candidateId) {
        return { ...cand, stage: newStage };
      }
      return cand;
    }));
    logAction('CANDIDATE_PIPELINE_MOVED', `Candidate #${candidateId} advanced to ${newStage}`, 'low');
    showToast(`Candidate moved to ${newStage}.`);
  };

  const addExpense = (category: ExpenseClaim['category'], amount: number, merchant: string, description: string) => {
    const newExp: ExpenseClaim = {
      id: `exp-${Date.now()}`,
      tenantId: currentTenant.id,
      employeeId: currentUser.id,
      employeeName: currentUser.name,
      department: currentUser.department,
      category,
      amount,
      merchant,
      date: new Date().toISOString().split('T')[0],
      status: 'pending',
      description
    };
    setExpenses(prev => [newExp, ...prev]);
    logAction('EXPENSE_SUBMITTED', `$${amount} for ${merchant} (${category})`, 'low');
    showToast(`Expense claim for $${amount} submitted for reimbursement.`);
  };

  const approveExpense = (id: string) => {
    setExpenses(prev => prev.map(exp => {
      if (exp.id === id) {
        return { ...exp, status: 'approved' };
      }
      return exp;
    }));
    logAction('EXPENSE_CLAIM_APPROVED', `Claim #${id} approved for payment processing.`, 'low');
    showToast('Expense claim approved.');
  };

  const addTicket = (category: HelpdeskTicket['category'], subject: string, priority: HelpdeskTicket['priority']) => {
    const newTkt: HelpdeskTicket = {
      id: `tkt-${Date.now()}`,
      tenantId: currentTenant.id,
      employeeId: currentUser.id,
      employeeName: currentUser.name,
      category,
      subject,
      status: 'open',
      priority,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setTickets(prev => [newTkt, ...prev]);
    logAction('HELPDESK_TICKET_CREATED', `Category: ${category}, Subject: ${subject}`, 'low');
    showToast('HR Helpdesk ticket submitted. Average response time: < 4 hours.');
  };

  const updateCompanyStatus = (companyId: string, status: SaaSCompanyBilling['status']) => {
    setSaasBillings(prev => prev.map(comp => {
      if (comp.id === companyId) {
        return { ...comp, status };
      }
      return comp;
    }));
    logAction('SAAS_TENANT_STATUS_MODIFIED', `Company #${companyId} status altered to ${status}`, 'critical');
    showToast(`Tenant status updated to ${status}.`);
  };

  const login = (email: string, role?: UserRole): boolean => {
    let matchedUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!matchedUser && role) {
      matchedUser = users.find(u => u.role === role);
    }
    if (!matchedUser) {
      matchedUser = users.find(u => u.role === 'hr_admin') || users[0];
    }
    
    if (matchedUser) {
      setCurrentUser(matchedUser);
      const userTenant = tenants.find(t => t.id === matchedUser!.tenantId) || tenants[0];
      setCurrentTenant(userTenant);
      setIsAuthenticated(true);
      localStorage.setItem('nattonflow_auth', 'true');
      logAction('USER_AUTHENTICATED', `User ${matchedUser.email} logged in with verified 2FA`, 'low');
      showToast(`Welcome back, ${matchedUser.name}!`);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.setItem('nattonflow_auth', 'false');
    logAction('USER_LOGGED_OUT', `User ${currentUser.email} ended active session`, 'low');
    showToast('You have been logged out securely.');
  };

  const registerNewTenant = (data: {
    name: string;
    domain: string;
    plan: 'Growth' | 'Professional' | 'Enterprise';
    currency: string;
    timezone: string;
    adminName: string;
    adminEmail: string;
    seatLimit: number;
    initialEmployeesCount: number;
  }) => {
    const slug = data.name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
    const newTenantId = `tenant-${slug.slice(0, 15)}-${Date.now().toString().slice(-4)}`;

    const monthlyCost = data.plan === 'Enterprise' ? 2500 : data.plan === 'Professional' ? 1200 : 500;

    const newTenant: Tenant = {
      id: newTenantId,
      name: data.name,
      slug,
      domain: data.domain,
      plan: data.plan,
      status: 'active',
      currency: data.currency,
      timezone: data.timezone,
      totalEmployees: data.initialEmployeesCount || 1,
      createdAt: new Date().toISOString().split('T')[0],
      monthlyBilling: monthlyCost,
      securitySettings: {
        enforceMfa: true,
        ipWhitelistEnabled: false,
        sessionTimeoutMinutes: 30,
        auditLogsRetentionDays: 365
      }
    };

    // Create Company Owner Admin for this new client tenant
    const newOwnerUser: User = {
      id: `usr-owner-${Date.now()}`,
      tenantId: newTenantId,
      name: data.adminName || `${data.name} Admin`,
      email: data.adminEmail || `admin@${data.domain}`,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      role: 'company_owner',
      title: 'Managing Director & Client Administrator',
      department: 'Executive Leadership',
      employeeCode: `${data.name.slice(0, 3).toUpperCase()}-001`,
      phone: '+91 98765 43210',
      joinDate: new Date().toISOString().split('T')[0],
      salaryBase: data.currency.includes('INR') ? 175000 : 15000,
      leaveBalances: { paid: 25, sick: 12, casual: 6, unpaid: 0 },
      status: 'active'
    };

    // Create SaaS Billing ledger entry
    const newBillingEntry: SaaSCompanyBilling = {
      id: `bill-${Date.now()}`,
      companyName: data.name,
      plan: data.plan,
      status: 'active',
      activeSeats: data.initialEmployeesCount || 1,
      seatLimit: data.seatLimit || 50,
      monthlyRevenue: monthlyCost,
      renewalDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
      mfaCompliance: 100,
      storageUsedGb: 2.5
    };

    setTenants(prev => [newTenant, ...prev]);
    setUsers(prev => [newOwnerUser, ...prev]);
    setSaasBillings(prev => [newBillingEntry, ...prev]);

    // Automatically switch active tenant to the newly registered client
    setCurrentTenant(newTenant);
    logAction('TENANT_PROVISIONED', `New client organization ${data.name} created under ${data.plan} plan`, 'critical');
    showToast(`Client Organization "${data.name}" provisioned successfully!`);
  };

  const clearNotifications = () => {
    setNotificationsList(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        currentUser,
        setCurrentUser,
        currentTenant,
        setCurrentTenant,
        tenants,
        users,
        switchRole,
        switchTenant,
        attendance,
        checkInCurrentEmployee,
        checkOutCurrentEmployee,
        requestAttendanceCorrection,
        approveAttendanceCorrection,
        leaves,
        applyLeave,
        updateLeaveStatus,
        payrollCycles,
        payslips,
        runPayrollValidation,
        approvePayrollCycle,
        publishPayrollCycle,
        jobs,
        candidates,
        addJobOpening,
        updateCandidateStage,
        expenses,
        addExpense,
        approveExpense,
        tickets,
        addTicket,
        assets,
        saasBillings,
        updateCompanyStatus,
        registerNewTenant,
        isAuthenticated,
        login,
        logout,
        auditLogs,
        logAction,
        searchQuery,
        setSearchQuery,
        notificationsCount: notificationsList.filter(n => !n.read).length,
        clearNotifications,
        notificationsList,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
