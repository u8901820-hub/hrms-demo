export type UserRole = 
  | 'super_admin' 
  | 'company_owner' 
  | 'hr_admin' 
  | 'payroll_admin' 
  | 'manager' 
  | 'team_lead' 
  | 'employee' 
  | 'recruiter';

export type TenantId = 'tenant-acme' | 'tenant-globex' | 'tenant-hyperion' | string;

export interface Tenant {
  id: TenantId;
  name: string;
  slug: string;
  domain: string;
  plan: 'Growth' | 'Professional' | 'Enterprise';
  status: 'active' | 'trial' | 'suspended';
  currency: string;
  timezone: string;
  totalEmployees: number;
  createdAt: string;
  monthlyBilling: number;
  logoUrl?: string;
  securitySettings: {
    enforceMfa: boolean;
    ipWhitelistEnabled: boolean;
    sessionTimeoutMinutes: number;
    auditLogsRetentionDays: number;
  };
}

export interface User {
  id: string;
  tenantId: TenantId;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  title: string;
  department: string;
  employeeCode: string;
  phone: string;
  joinDate: string;
  managerId?: string;
  managerName?: string;
  salaryBase: number;
  leaveBalances: {
    paid: number;
    sick: number;
    casual: number;
    unpaid: number;
  };
  status: 'active' | 'on_leave' | 'terminated';
}

export interface AttendanceRecord {
  id: string;
  tenantId: TenantId;
  employeeId: string;
  employeeName: string;
  department: string;
  date: string;
  checkIn: string; // "09:02 AM"
  checkOut: string | null; // "06:15 PM"
  status: 'present' | 'late' | 'half_day' | 'absent' | 'on_leave';
  workHours: number;
  location: string;
  ipAddress: string;
  correctionRequested?: boolean;
  correctionReason?: string;
  correctionStatus?: 'pending' | 'approved' | 'rejected';
}

export interface LeaveRequest {
  id: string;
  tenantId: TenantId;
  employeeId: string;
  employeeName: string;
  department: string;
  leaveType: 'Paid Annual' | 'Sick Leave' | 'Casual' | 'Paternity/Maternity' | 'Unpaid';
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedOn: string;
  approverId: string;
  approverName: string;
  approvalNotes?: string;
}

export interface PayrollCycle {
  id: string;
  tenantId: TenantId;
  month: string; // e.g. "October 2026"
  periodStart: string;
  periodEnd: string;
  status: 'draft' | 'validated' | 'approved' | 'published';
  totalGross: number;
  totalDeductions: number;
  totalNet: number;
  employeeCount: number;
  warningsCount: number;
  processedAt?: string;
}

export interface PayslipItem {
  id: string;
  tenantId: TenantId;
  payrollCycleId: string;
  employeeId: string;
  employeeName: string;
  employeeCode: string;
  department: string;
  designation: string;
  bankAccountMasked: string;
  panMasked: string;
  workingDays: number;
  paidDays: number;
  unpaidDays: number;
  overtimeHours: number;
  basicSalary: number;
  hra: number;
  specialAllowance: number;
  bonus: number;
  grossEarnings: number;
  providentFund: number;
  taxDeducted: number;
  medicalInsurance: number;
  totalDeductions: number;
  netPayable: number;
  status: 'generated' | 'reviewed' | 'published';
  warnings: string[];
}

export interface JobOpening {
  id: string;
  tenantId: TenantId;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Remote' | 'Hybrid';
  applicantsCount: number;
  status: 'published' | 'draft' | 'closed';
  postedDate: string;
  salaryRange: string;
}

export interface Candidate {
  id: string;
  tenantId: TenantId;
  jobId: string;
  jobTitle: string;
  name: string;
  email: string;
  phone: string;
  stage: 'Applied' | 'Screening' | 'Technical' | 'HR Interview' | 'Offered' | 'Hired' | 'Rejected';
  rating: number; // 1-5
  experienceYears: number;
  appliedDate: string;
  resumeUrl: string;
}

export interface ExpenseClaim {
  id: string;
  tenantId: TenantId;
  employeeId: string;
  employeeName: string;
  department: string;
  category: 'Travel' | 'Client Meal' | 'Software & Tools' | 'Office Supplies' | 'Certification';
  amount: number;
  receiptUrl?: string;
  merchant: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected' | 'reimbursed';
  description: string;
}

export interface PerformanceReview {
  id: string;
  tenantId: TenantId;
  employeeId: string;
  employeeName: string;
  department: string;
  period: 'Q3 2026' | 'Annual 2026';
  rating: number; // 1 to 5
  goalsProgress: number; // 0 - 100%
  strengths: string;
  improvements: string;
  status: 'submitted' | 'under_review' | 'completed';
}

export interface AuditLog {
  id: string;
  tenantId: TenantId;
  actorName: string;
  actorRole: string;
  action: string;
  resource: string;
  ipAddress: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface CompanyAsset {
  id: string;
  tenantId: TenantId;
  name: string;
  serialNumber: string;
  type: 'Laptop' | 'Monitor' | 'Access Card' | 'Phone';
  assignedTo?: string;
  assignedToName?: string;
  status: 'allocated' | 'available' | 'maintenance';
}

export interface HelpdeskTicket {
  id: string;
  tenantId: TenantId;
  employeeId: string;
  employeeName: string;
  category: 'Payroll Query' | 'IT Support' | 'Policy Clarification' | 'Health Insurance';
  subject: string;
  status: 'open' | 'in_progress' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
}

export interface SaaSCompanyBilling {
  id: string;
  companyName: string;
  plan: 'Growth' | 'Professional' | 'Enterprise';
  status: 'active' | 'trial' | 'overdue' | 'suspended';
  activeSeats: number;
  seatLimit: number;
  monthlyRevenue: number;
  renewalDate: string;
  mfaCompliance: number; // percentage
  storageUsedGb: number;
}
