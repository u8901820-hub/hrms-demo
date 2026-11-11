import { 
  Tenant, 
  User, 
  AttendanceRecord, 
  LeaveRequest, 
  PayrollCycle, 
  PayslipItem, 
  JobOpening, 
  Candidate, 
  ExpenseClaim, 
  PerformanceReview, 
  AuditLog, 
  CompanyAsset, 
  HelpdeskTicket, 
  SaaSCompanyBilling,
  TenantId 
} from '../types';

export const INITIAL_TENANTS: Tenant[] = [
  {
    id: 'tenant-acme',
    name: 'Acme Cloud Technologies',
    slug: 'acme-tech',
    domain: 'acmecloud.io',
    plan: 'Enterprise',
    status: 'active',
    currency: 'USD ($)',
    timezone: 'America/New_York (EST)',
    totalEmployees: 142,
    createdAt: '2025-02-15',
    monthlyBilling: 2840,
    securitySettings: {
      enforceMfa: true,
      ipWhitelistEnabled: true,
      sessionTimeoutMinutes: 30,
      auditLogsRetentionDays: 365
    }
  },
  {
    id: 'tenant-globex',
    name: 'Globex Robotics Corp',
    slug: 'globex-robotics',
    domain: 'globex.ai',
    plan: 'Professional',
    status: 'active',
    currency: 'USD ($)',
    timezone: 'America/Los_Angeles (PST)',
    totalEmployees: 68,
    createdAt: '2025-07-20',
    monthlyBilling: 1020,
    securitySettings: {
      enforceMfa: true,
      ipWhitelistEnabled: false,
      sessionTimeoutMinutes: 60,
      auditLogsRetentionDays: 180
    }
  },
  {
    id: 'tenant-hyperion',
    name: 'Hyperion BioPharma Labs',
    slug: 'hyperion-labs',
    domain: 'hyperionbio.com',
    plan: 'Enterprise',
    status: 'trial',
    currency: 'EUR (€)',
    timezone: 'Europe/London (GMT)',
    totalEmployees: 310,
    createdAt: '2026-10-01',
    monthlyBilling: 4950,
    securitySettings: {
      enforceMfa: true,
      ipWhitelistEnabled: true,
      sessionTimeoutMinutes: 15,
      auditLogsRetentionDays: 730
    }
  }
];

export const INITIAL_USERS: User[] = [
  // Super Admin
  {
    id: 'usr-super-1',
    tenantId: 'tenant-acme',
    name: 'Elena Vance (Platform SuperAdmin)',
    email: 'elena.vance@nattonflow.internal',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    role: 'super_admin',
    title: 'Chief SaaS Architect',
    department: 'Platform Engineering',
    employeeCode: 'SUP-001',
    phone: '+1 (555) 019-2831',
    joinDate: '2024-01-10',
    salaryBase: 18500,
    leaveBalances: { paid: 25, sick: 12, casual: 6, unpaid: 0 },
    status: 'active'
  },
  // Company Owner / Admin
  {
    id: 'usr-owner-1',
    tenantId: 'tenant-acme',
    name: 'Marcus Sterling',
    email: 'marcus.s@acmecloud.io',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    role: 'company_owner',
    title: 'Managing Director & Founder',
    department: 'Executive Leadership',
    employeeCode: 'ACM-001',
    phone: '+1 (555) 234-8901',
    joinDate: '2021-03-01',
    salaryBase: 22000,
    leaveBalances: { paid: 28, sick: 10, casual: 5, unpaid: 0 },
    status: 'active'
  },
  // HR Admin
  {
    id: 'usr-hr-1',
    tenantId: 'tenant-acme',
    name: 'Sophia Reynolds',
    email: 'sophia.r@acmecloud.io',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    role: 'hr_admin',
    title: 'Head of People & Culture',
    department: 'Human Resources',
    employeeCode: 'ACM-008',
    phone: '+1 (555) 443-1290',
    joinDate: '2022-06-15',
    salaryBase: 12500,
    leaveBalances: { paid: 18, sick: 8, casual: 4, unpaid: 0 },
    status: 'active'
  },
  // Payroll Admin
  {
    id: 'usr-pay-1',
    tenantId: 'tenant-acme',
    name: 'David Chen, CPA',
    email: 'david.chen@acmecloud.io',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    role: 'payroll_admin',
    title: 'Lead Compensation & Benefits Specialist',
    department: 'Finance & Payroll',
    employeeCode: 'ACM-014',
    phone: '+1 (555) 891-4421',
    joinDate: '2023-01-20',
    salaryBase: 11200,
    leaveBalances: { paid: 16, sick: 9, casual: 3, unpaid: 0 },
    status: 'active'
  },
  // Manager
  {
    id: 'usr-mgr-1',
    tenantId: 'tenant-acme',
    name: 'Rachel K. Albright',
    email: 'rachel.a@acmecloud.io',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    role: 'manager',
    title: 'VP of Engineering',
    department: 'Engineering',
    employeeCode: 'ACM-022',
    phone: '+1 (555) 772-9011',
    joinDate: '2022-09-01',
    salaryBase: 16500,
    leaveBalances: { paid: 20, sick: 10, casual: 5, unpaid: 0 },
    status: 'active'
  },
  // Team Lead
  {
    id: 'usr-lead-1',
    tenantId: 'tenant-acme',
    name: 'Tariq Al-Mansoor',
    email: 'tariq.m@acmecloud.io',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    role: 'team_lead',
    title: 'Staff Frontend Lead',
    department: 'Engineering',
    employeeCode: 'ACM-045',
    phone: '+1 (555) 304-7712',
    joinDate: '2023-04-12',
    managerId: 'usr-mgr-1',
    managerName: 'Rachel K. Albright',
    salaryBase: 13800,
    leaveBalances: { paid: 14, sick: 6, casual: 4, unpaid: 0 },
    status: 'active'
  },
  // Employee
  {
    id: 'usr-emp-1',
    tenantId: 'tenant-acme',
    name: 'Maya Lin',
    email: 'maya.lin@acmecloud.io',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    role: 'employee',
    title: 'Senior Product Designer',
    department: 'Design',
    employeeCode: 'ACM-088',
    phone: '+1 (555) 902-1144',
    joinDate: '2023-11-01',
    managerId: 'usr-mgr-1',
    managerName: 'Rachel K. Albright',
    salaryBase: 9800,
    leaveBalances: { paid: 14, sick: 7, casual: 3, unpaid: 0 },
    status: 'active'
  },
  // Recruiter
  {
    id: 'usr-rec-1',
    tenantId: 'tenant-acme',
    name: 'Liam O’Connor',
    email: 'liam.o@acmecloud.io',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    role: 'recruiter',
    title: 'Senior Talent Acquisition Partner',
    department: 'Human Resources',
    employeeCode: 'ACM-062',
    phone: '+1 (555) 601-3829',
    joinDate: '2024-02-15',
    managerId: 'usr-hr-1',
    managerName: 'Sophia Reynolds',
    salaryBase: 8900,
    leaveBalances: { paid: 15, sick: 8, casual: 2, unpaid: 0 },
    status: 'active'
  },
  // Additional Employees for realistic enterprise dataset
  {
    id: 'usr-emp-2',
    tenantId: 'tenant-acme',
    name: 'Carlos Mendez',
    email: 'carlos.m@acmecloud.io',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    role: 'employee',
    title: 'DevOps Engineer',
    department: 'Engineering',
    employeeCode: 'ACM-092',
    phone: '+1 (555) 412-8819',
    joinDate: '2024-05-10',
    managerId: 'usr-mgr-1',
    managerName: 'Rachel K. Albright',
    salaryBase: 10400,
    leaveBalances: { paid: 12, sick: 5, casual: 2, unpaid: 0 },
    status: 'active'
  },
  {
    id: 'usr-emp-3',
    tenantId: 'tenant-acme',
    name: 'Aisha Patel',
    email: 'aisha.p@acmecloud.io',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    role: 'employee',
    title: 'Growth Marketing Manager',
    department: 'Marketing',
    employeeCode: 'ACM-104',
    phone: '+1 (555) 789-3211',
    joinDate: '2024-08-01',
    salaryBase: 9200,
    leaveBalances: { paid: 16, sick: 6, casual: 3, unpaid: 0 },
    status: 'on_leave'
  }
];

export const INITIAL_ATTENDANCE: AttendanceRecord[] = [
  {
    id: 'att-1',
    tenantId: 'tenant-acme',
    employeeId: 'usr-emp-1',
    employeeName: 'Maya Lin',
    department: 'Design',
    date: '2026-11-11',
    checkIn: '09:02 AM',
    checkOut: null,
    status: 'present',
    workHours: 5.5,
    location: 'Headquarters - Floor 4',
    ipAddress: '198.51.100.24'
  },
  {
    id: 'att-2',
    tenantId: 'tenant-acme',
    employeeId: 'usr-lead-1',
    employeeName: 'Tariq Al-Mansoor',
    department: 'Engineering',
    date: '2026-11-11',
    checkIn: '08:45 AM',
    checkOut: null,
    status: 'present',
    workHours: 5.8,
    location: 'Remote (Verified VPN)',
    ipAddress: '203.0.113.88'
  },
  {
    id: 'att-3',
    tenantId: 'tenant-acme',
    employeeId: 'usr-mgr-1',
    employeeName: 'Rachel K. Albright',
    department: 'Engineering',
    date: '2026-11-11',
    checkIn: '08:55 AM',
    checkOut: null,
    status: 'present',
    workHours: 5.7,
    location: 'Headquarters - Executive Wing',
    ipAddress: '198.51.100.12'
  },
  {
    id: 'att-4',
    tenantId: 'tenant-acme',
    employeeId: 'usr-emp-2',
    employeeName: 'Carlos Mendez',
    department: 'Engineering',
    date: '2026-11-11',
    checkIn: '09:48 AM',
    checkOut: null,
    status: 'late',
    workHours: 4.8,
    location: 'Headquarters - Lab B',
    ipAddress: '198.51.100.35',
    correctionRequested: true,
    correctionReason: 'Metro signal failure delayed arrival by 30 mins',
    correctionStatus: 'pending'
  },
  {
    id: 'att-5',
    tenantId: 'tenant-acme',
    employeeId: 'usr-emp-3',
    employeeName: 'Aisha Patel',
    department: 'Marketing',
    date: '2026-11-11',
    checkIn: '-',
    checkOut: null,
    status: 'on_leave',
    workHours: 0,
    location: 'N/A',
    ipAddress: '-'
  },
  {
    id: 'att-6',
    tenantId: 'tenant-acme',
    employeeId: 'usr-hr-1',
    employeeName: 'Sophia Reynolds',
    department: 'Human Resources',
    date: '2026-11-11',
    checkIn: '08:50 AM',
    checkOut: null,
    status: 'present',
    workHours: 5.8,
    location: 'Headquarters - Floor 3',
    ipAddress: '198.51.100.18'
  }
];

export const INITIAL_LEAVES: LeaveRequest[] = [
  {
    id: 'lv-101',
    tenantId: 'tenant-acme',
    employeeId: 'usr-emp-1',
    employeeName: 'Maya Lin',
    department: 'Design',
    leaveType: 'Paid Annual',
    startDate: '2026-11-20',
    endDate: '2026-11-23',
    days: 4,
    reason: 'Family wedding and travel commitment',
    status: 'pending',
    appliedOn: '2026-11-09',
    approverId: 'usr-mgr-1',
    approverName: 'Rachel K. Albright'
  },
  {
    id: 'lv-102',
    tenantId: 'tenant-acme',
    employeeId: 'usr-emp-3',
    employeeName: 'Aisha Patel',
    department: 'Marketing',
    leaveType: 'Casual',
    startDate: '2026-11-10',
    endDate: '2026-11-12',
    days: 3,
    reason: 'Personal urgent family work',
    status: 'approved',
    appliedOn: '2026-11-05',
    approverId: 'usr-hr-1',
    approverName: 'Sophia Reynolds',
    approvalNotes: 'Approved. Marketing campaign sync handed to lead.'
  },
  {
    id: 'lv-103',
    tenantId: 'tenant-acme',
    employeeId: 'usr-emp-2',
    employeeName: 'Carlos Mendez',
    department: 'Engineering',
    leaveType: 'Sick Leave',
    startDate: '2026-10-18',
    endDate: '2026-10-19',
    days: 2,
    reason: 'Fever and physician-advised rest',
    status: 'approved',
    appliedOn: '2026-10-18',
    approverId: 'usr-mgr-1',
    approverName: 'Rachel K. Albright',
    approvalNotes: 'Rest well Carlos.'
  }
];

export const INITIAL_PAYROLL_CYCLES: PayrollCycle[] = [
  {
    id: 'cycle-nov-2026',
    tenantId: 'tenant-acme',
    month: 'November 2026',
    periodStart: '2026-11-01',
    periodEnd: '2026-11-30',
    status: 'draft',
    totalGross: 135400,
    totalDeductions: 24372,
    totalNet: 111028,
    employeeCount: 10,
    warningsCount: 2
  },
  {
    id: 'cycle-oct-2026',
    tenantId: 'tenant-acme',
    month: 'October 2026',
    periodStart: '2026-10-01',
    periodEnd: '2026-10-31',
    status: 'published',
    totalGross: 133200,
    totalDeductions: 23976,
    totalNet: 109224,
    employeeCount: 10,
    warningsCount: 0,
    processedAt: '2026-10-30 18:24'
  }
];

export const INITIAL_PAYSLIPS: PayslipItem[] = [
  {
    id: 'slip-1',
    tenantId: 'tenant-acme',
    payrollCycleId: 'cycle-nov-2026',
    employeeId: 'usr-emp-1',
    employeeName: 'Maya Lin',
    employeeCode: 'ACM-088',
    department: 'Design',
    designation: 'Senior Product Designer',
    bankAccountMasked: '•••• •••• 4912',
    panMasked: 'ABCPL•••4K',
    workingDays: 22,
    paidDays: 22,
    unpaidDays: 0,
    overtimeHours: 4,
    basicSalary: 5200,
    hra: 2600,
    specialAllowance: 1500,
    bonus: 500,
    grossEarnings: 9800,
    providentFund: 624,
    taxDeducted: 980,
    medicalInsurance: 160,
    totalDeductions: 1764,
    netPayable: 8036,
    status: 'reviewed',
    warnings: []
  },
  {
    id: 'att-slip-2',
    tenantId: 'tenant-acme',
    payrollCycleId: 'cycle-nov-2026',
    employeeId: 'usr-emp-2',
    employeeName: 'Carlos Mendez',
    employeeCode: 'ACM-092',
    department: 'Engineering',
    designation: 'DevOps Engineer',
    bankAccountMasked: '•••• •••• 8109',
    panMasked: 'DEFCM•••9J',
    workingDays: 22,
    paidDays: 21.5,
    unpaidDays: 0.5,
    overtimeHours: 2,
    basicSalary: 5500,
    hra: 2750,
    specialAllowance: 1650,
    bonus: 500,
    grossEarnings: 10400,
    providentFund: 660,
    taxDeducted: 1040,
    medicalInsurance: 160,
    totalDeductions: 1860,
    netPayable: 8540,
    status: 'reviewed',
    warnings: ['Pending late attendance regularization request on Nov 11']
  },
  {
    id: 'slip-3',
    tenantId: 'tenant-acme',
    payrollCycleId: 'cycle-nov-2026',
    employeeId: 'usr-lead-1',
    employeeName: 'Tariq Al-Mansoor',
    employeeCode: 'ACM-045',
    department: 'Engineering',
    designation: 'Staff Frontend Lead',
    bankAccountMasked: '•••• •••• 7733',
    panMasked: 'GHJTM•••2M',
    workingDays: 22,
    paidDays: 22,
    unpaidDays: 0,
    overtimeHours: 0,
    basicSalary: 7300,
    hra: 3650,
    specialAllowance: 2250,
    bonus: 600,
    grossEarnings: 13800,
    providentFund: 876,
    taxDeducted: 1518,
    medicalInsurance: 180,
    totalDeductions: 2574,
    netPayable: 11226,
    status: 'reviewed',
    warnings: []
  }
];

export const INITIAL_JOBS: JobOpening[] = [
  {
    id: 'job-1',
    tenantId: 'tenant-acme',
    title: 'Senior Distributed Systems Engineer',
    department: 'Engineering',
    location: 'San Francisco, CA / Remote',
    type: 'Full-time',
    applicantsCount: 34,
    status: 'published',
    postedDate: '2026-10-15',
    salaryRange: '$160,000 - $195,000'
  },
  {
    id: 'job-2',
    tenantId: 'tenant-acme',
    title: 'Enterprise Customer Success Director',
    department: 'Customer Experience',
    location: 'New York, NY / Hybrid',
    type: 'Hybrid',
    applicantsCount: 19,
    status: 'published',
    postedDate: '2026-10-22',
    salaryRange: '$130,000 - $155,000'
  },
  {
    id: 'job-3',
    tenantId: 'tenant-acme',
    title: 'Senior Product Marketing Lead',
    department: 'Marketing',
    location: 'Austin, TX / Remote',
    type: 'Remote',
    applicantsCount: 28,
    status: 'published',
    postedDate: '2026-11-01',
    salaryRange: '$120,000 - $145,000'
  }
];

export const INITIAL_CANDIDATES: Candidate[] = [
  {
    id: 'cand-1',
    tenantId: 'tenant-acme',
    jobId: 'job-1',
    jobTitle: 'Senior Distributed Systems Engineer',
    name: 'Sergei Voronov',
    email: 'sergei.v@example.com',
    phone: '+1 (555) 771-0021',
    stage: 'Technical',
    rating: 5,
    experienceYears: 8,
    appliedDate: '2026-10-28',
    resumeUrl: 'sergei_voronov_resume.pdf'
  },
  {
    id: 'cand-2',
    tenantId: 'tenant-acme',
    jobId: 'job-1',
    jobTitle: 'Senior Distributed Systems Engineer',
    name: 'Chloe Dupont',
    email: 'c.dupont@example.org',
    phone: '+1 (555) 882-9913',
    stage: 'Offered',
    rating: 5,
    experienceYears: 7,
    appliedDate: '2026-10-20',
    resumeUrl: 'chloe_dupont_cv.pdf'
  },
  {
    id: 'cand-3',
    tenantId: 'tenant-acme',
    jobId: 'job-2',
    jobTitle: 'Enterprise Customer Success Director',
    name: 'Marcus Brody',
    email: 'm.brody@example.com',
    phone: '+1 (555) 231-5509',
    stage: 'HR Interview',
    rating: 4,
    experienceYears: 10,
    appliedDate: '2026-11-03',
    resumeUrl: 'marcus_brody_resume.pdf'
  }
];

export const INITIAL_EXPENSES: ExpenseClaim[] = [
  {
    id: 'exp-1',
    tenantId: 'tenant-acme',
    employeeId: 'usr-emp-1',
    employeeName: 'Maya Lin',
    department: 'Design',
    category: 'Software & Tools',
    amount: 144,
    merchant: 'Figma Annual Design Token plugin',
    date: '2026-11-04',
    status: 'pending',
    description: 'Annual license for design systems plugin'
  },
  {
    id: 'exp-2',
    tenantId: 'tenant-acme',
    employeeId: 'usr-lead-1',
    employeeName: 'Tariq Al-Mansoor',
    department: 'Engineering',
    category: 'Travel',
    amount: 480,
    merchant: 'Delta Airlines - Tech Summit',
    date: '2026-10-29',
    status: 'approved',
    description: 'Round-trip flight to React Global Summit'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'aud-1',
    tenantId: 'tenant-acme',
    actorName: 'David Chen, CPA',
    actorRole: 'Payroll Admin',
    action: 'PAYROLL_VALIDATION_TRIGGERED',
    resource: 'Cycle Nov 2026 (10 employees checked)',
    ipAddress: '198.51.100.14',
    timestamp: '2026-11-11 09:15:22',
    severity: 'medium'
  },
  {
    id: 'aud-2',
    tenantId: 'tenant-acme',
    actorName: 'Rachel K. Albright',
    actorRole: 'Manager',
    action: 'LEAVE_APPROVAL_GRANTED',
    resource: 'Leave #lv-103 (Carlos Mendez)',
    ipAddress: '198.51.100.12',
    timestamp: '2026-10-18 10:04:12',
    severity: 'low'
  },
  {
    id: 'aud-3',
    tenantId: 'tenant-acme',
    actorName: 'Sophia Reynolds',
    actorRole: 'HR Admin',
    action: 'SALARY_STRUCTURE_MODIFIED',
    resource: 'Employee Code ACM-092 Base Adjusted',
    ipAddress: '198.51.100.18',
    timestamp: '2026-10-12 14:32:00',
    severity: 'high'
  },
  {
    id: 'aud-4',
    tenantId: 'tenant-acme',
    actorName: 'System Security Daemon',
    actorRole: 'Security Bot',
    action: 'MFA_CHALLENGE_VERIFIED',
    resource: 'User usr-super-1 logged in from authorized subnet',
    ipAddress: '198.51.100.1',
    timestamp: '2026-11-11 08:30:11',
    severity: 'low'
  }
];

export const INITIAL_ASSETS: CompanyAsset[] = [
  {
    id: 'ast-1',
    tenantId: 'tenant-acme',
    name: 'MacBook Pro 16" M3 Max 64GB',
    serialNumber: 'C02-K9812-NFLW',
    type: 'Laptop',
    assignedTo: 'usr-emp-1',
    assignedToName: 'Maya Lin',
    status: 'allocated'
  },
  {
    id: 'ast-2',
    tenantId: 'tenant-acme',
    name: 'Dell UltraSharp 32" 4K USB-C Monitor',
    serialNumber: 'DL-8821-4K',
    type: 'Monitor',
    assignedTo: 'usr-emp-1',
    assignedToName: 'Maya Lin',
    status: 'allocated'
  },
  {
    id: 'ast-3',
    tenantId: 'tenant-acme',
    name: 'MacBook Pro 14" M3 Pro 36GB',
    serialNumber: 'C02-L4420-NFLW',
    type: 'Laptop',
    assignedTo: 'usr-lead-1',
    assignedToName: 'Tariq Al-Mansoor',
    status: 'allocated'
  },
  {
    id: 'ast-4',
    tenantId: 'tenant-acme',
    name: 'ThinkPad X1 Carbon Gen 12',
    serialNumber: 'TP-9943-GEN12',
    type: 'Laptop',
    status: 'available'
  }
];

export const INITIAL_HELPDESK: HelpdeskTicket[] = [
  {
    id: 'tkt-1',
    tenantId: 'tenant-acme',
    employeeId: 'usr-emp-1',
    employeeName: 'Maya Lin',
    category: 'Payroll Query',
    subject: 'Tax exemption certificate update for 2026',
    status: 'in_progress',
    priority: 'medium',
    createdAt: '2026-11-08'
  },
  {
    id: 'tkt-2',
    tenantId: 'tenant-acme',
    employeeId: 'usr-emp-2',
    employeeName: 'Carlos Mendez',
    category: 'IT Support',
    subject: 'Request for secondary YubiKey 5C NFC backup',
    status: 'open',
    priority: 'high',
    createdAt: '2026-11-10'
  }
];

export const INITIAL_SAAS_BILLINGS: SaaSCompanyBilling[] = [
  {
    id: 'bill-1',
    companyName: 'Acme Cloud Technologies',
    plan: 'Enterprise',
    status: 'active',
    activeSeats: 142,
    seatLimit: 200,
    monthlyRevenue: 2840,
    renewalDate: '2026-12-15',
    mfaCompliance: 98,
    storageUsedGb: 42.4
  },
  {
    id: 'bill-2',
    companyName: 'Globex Robotics Corp',
    plan: 'Professional',
    status: 'active',
    activeSeats: 68,
    seatLimit: 75,
    monthlyRevenue: 1020,
    renewalDate: '2026-11-20',
    mfaCompliance: 92,
    storageUsedGb: 18.2
  },
  {
    id: 'bill-3',
    companyName: 'Hyperion BioPharma Labs',
    plan: 'Enterprise',
    status: 'trial',
    activeSeats: 310,
    seatLimit: 500,
    monthlyRevenue: 4950,
    renewalDate: '2026-11-25',
    mfaCompliance: 100,
    storageUsedGb: 88.6
  },
  {
    id: 'bill-4',
    companyName: 'Nextera FinTech Global',
    plan: 'Enterprise',
    status: 'active',
    activeSeats: 215,
    seatLimit: 250,
    monthlyRevenue: 3440,
    renewalDate: '2027-01-10',
    mfaCompliance: 100,
    storageUsedGb: 61.0
  }
];

export const HOLIDAY_CALENDAR = [
  { date: '2026-11-26', name: 'Thanksgiving Day', type: 'Mandatory Public' },
  { date: '2026-11-27', name: 'Day After Thanksgiving', type: 'Company Holiday' },
  { date: '2026-12-25', name: 'Christmas Day', type: 'Mandatory Public' },
  { date: '2027-01-01', name: 'New Year’s Day', type: 'Mandatory Public' },
  { date: '2027-01-18', name: 'Martin Luther King Jr. Day', type: 'Federal Observance' }
];
