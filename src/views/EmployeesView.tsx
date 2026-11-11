import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  Mail, 
  Phone, 
  Building2, 
  Calendar, 
  DollarSign, 
  ShieldCheck, 
  MoreVertical, 
  CheckCircle2, 
  X,
  FileSpreadsheet
} from 'lucide-react';
import { User, UserRole } from '../types';

export const EmployeesView: React.FC = () => {
  const { users, currentUser, showToast, logAction } = useApp();
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Form state for adding employee
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newDept, setNewDept] = useState('Engineering');
  const [newRole, setNewRole] = useState<UserRole>('employee');
  const [newSalary, setNewSalary] = useState('9500');

  const departments = ['Engineering', 'Design', 'Marketing', 'Human Resources', 'Finance & Payroll', 'Executive Leadership'];

  const filteredUsers = users.filter(u => {
    const matchesDept = selectedDept === 'all' || u.department === selectedDept;
    const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) || 
                          u.title.toLowerCase().includes(search.toLowerCase()) ||
                          u.employeeCode.toLowerCase().includes(search.toLowerCase());
    return matchesDept && matchesSearch;
  });

  const handleCreateEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newEmail) {
      showToast('Please fill out employee name and email.');
      return;
    }

    const newUser: User = {
      id: `usr-emp-${Date.now()}`,
      tenantId: currentUser.tenantId,
      name: newName,
      email: newEmail,
      avatar: `https://images.unsplash.com/photo-${1534528741775 + Math.floor(Math.random() * 1000)}?w=150&auto=format&fit=crop&q=80`,
      role: newRole,
      title: newTitle || 'Associate',
      department: newDept,
      employeeCode: `ACM-${Math.floor(100 + Math.random() * 900)}`,
      phone: '+1 (555) ' + Math.floor(100 + Math.random() * 899) + '-4412',
      joinDate: new Date().toISOString().split('T')[0],
      salaryBase: parseFloat(newSalary) || 9000,
      leaveBalances: { paid: 20, sick: 10, casual: 5, unpaid: 0 },
      status: 'active'
    };

    users.push(newUser);
    logAction('EMPLOYEE_ONBOARDED', `Added ${newUser.name} as ${newUser.title}`, 'medium');
    showToast(`New team member ${newUser.name} added to ${newDept} workforce!`);
    setShowAddModal(false);
    setNewName('');
    setNewEmail('');
    setNewTitle('');
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Users className="text-[#4361EE]" size={22} />
            <span>Employee Directory & Organization</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage company rosters, role-based permission tiers, and compensation brackets.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => showToast('Employee roster exported as secure CSV.')}
            className="px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <FileSpreadsheet size={15} className="text-emerald-600" />
            <span>Export Roster</span>
          </button>

          {(currentUser.role === 'hr_admin' || currentUser.role === 'company_owner' || currentUser.role === 'super_admin') && (
            <button
              onClick={() => setShowAddModal(true)}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-[#4361EE] hover:bg-blue-700 rounded-lg flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <UserPlus size={15} />
              <span>Add Employee</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, code or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#F7F9FC] text-xs text-slate-800 pl-9 pr-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-[#4361EE]"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          <button
            onClick={() => setSelectedDept('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              selectedDept === 'all' ? 'bg-[#14213D] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Departments ({users.length})
          </button>
          {departments.map(dept => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                selectedDept === dept ? 'bg-[#4361EE] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {/* Employee Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7F9FC] border-b border-slate-200 text-slate-500 font-semibold">
              <tr>
                <th className="py-3 px-4">Employee</th>
                <th className="py-3 px-4">Code & Dept</th>
                <th className="py-3 px-4">Access Role</th>
                <th className="py-3 px-4">Work Email & Phone</th>
                <th className="py-3 px-4">Join Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredUsers.map(emp => (
                <tr key={emp.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={emp.avatar} 
                        alt={emp.name} 
                        className="w-9 h-9 rounded-full object-cover border border-slate-200" 
                      />
                      <div>
                        <p className="font-bold text-slate-900">{emp.name}</p>
                        <p className="text-[11px] text-slate-500">{emp.title}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-mono text-slate-700 font-semibold">{emp.employeeCode}</span>
                    <p className="text-[11px] text-slate-500">{emp.department}</p>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-[#4361EE] border border-blue-100">
                      {emp.role.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <p className="text-slate-800">{emp.email}</p>
                    <p className="text-[11px] text-slate-400">{emp.phone}</p>
                  </td>
                  <td className="py-3 px-4 text-slate-600 font-medium">{emp.joinDate}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      emp.status === 'active' 
                        ? 'bg-emerald-50 text-emerald-700' 
                        : emp.status === 'on_leave'
                        ? 'bg-amber-50 text-amber-700'
                        : 'bg-rose-50 text-rose-700'
                    }`}>
                      {emp.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setSelectedUser(emp)}
                      className="px-2.5 py-1 text-xs font-semibold text-[#4361EE] hover:bg-blue-50 rounded-md transition-colors"
                    >
                      Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Employee Detail Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 relative">
            <button 
              onClick={() => setSelectedUser(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
              <img 
                src={selectedUser.avatar} 
                alt={selectedUser.name} 
                className="w-14 h-14 rounded-2xl object-cover border-2 border-[#4361EE]" 
              />
              <div>
                <h3 className="text-lg font-bold text-slate-900">{selectedUser.name}</h3>
                <p className="text-xs text-slate-500">{selectedUser.title} • {selectedUser.department}</p>
                <span className="text-[11px] font-mono font-semibold text-[#4361EE] mt-0.5 inline-block">
                  {selectedUser.employeeCode}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 py-4 text-xs border-b border-slate-100">
              <div>
                <p className="text-slate-400 font-medium">Work Email</p>
                <p className="text-slate-800 font-semibold">{selectedUser.email}</p>
              </div>
              <div>
                <p className="text-slate-400 font-medium">Phone</p>
                <p className="text-slate-800 font-semibold">{selectedUser.phone}</p>
              </div>
              <div>
                <p className="text-slate-400 font-medium">System Role</p>
                <p className="text-slate-800 font-semibold capitalize">{selectedUser.role.replace('_', ' ')}</p>
              </div>
              <div>
                <p className="text-slate-400 font-medium">Base Salary</p>
                <p className="text-slate-800 font-semibold">
                  {currentUser.role === 'payroll_admin' || currentUser.role === 'hr_admin' || currentUser.role === 'company_owner'
                    ? `$${selectedUser.salaryBase.toLocaleString()} / mo`
                    : '•••••• (Restricted)'}
                </p>
              </div>
            </div>

            {/* Leave Quota */}
            <div className="py-4 border-b border-slate-100">
              <p className="text-xs font-bold text-slate-800 mb-2">Leave Balances</p>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-slate-50 p-2 rounded-lg">
                  <span className="text-slate-400 block text-[10px]">Paid Vacation</span>
                  <span className="font-bold text-[#4361EE]">{selectedUser.leaveBalances.paid} days</span>
                </div>
                <div className="bg-slate-50 p-2 rounded-lg">
                  <span className="text-slate-400 block text-[10px]">Sick Leave</span>
                  <span className="font-bold text-emerald-600">{selectedUser.leaveBalances.sick} days</span>
                </div>
                <div className="bg-slate-50 p-2 rounded-lg">
                  <span className="text-slate-400 block text-[10px]">Casual</span>
                  <span className="font-bold text-amber-600">{selectedUser.leaveBalances.casual} days</span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setSelectedUser(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Employee Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <form onSubmit={handleCreateEmployee} className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Add New Team Member</h3>
              <button 
                type="button" 
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={18} />
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Legal Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Jordan Hayes"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-[#4361EE]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Corporate Email Address</label>
              <input
                type="email"
                required
                placeholder="e.g. jordan.h@acmecloud.io"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-[#4361EE]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Job Title</label>
                <input
                  type="text"
                  placeholder="e.g. Senior Backend Dev"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-[#4361EE]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Department</label>
                <select
                  value={newDept}
                  onChange={(e) => setNewDept(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-[#4361EE]"
                >
                  {departments.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">System Role</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as UserRole)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-[#4361EE]"
                >
                  <option value="employee">Employee</option>
                  <option value="manager">Manager</option>
                  <option value="team_lead">Team Lead</option>
                  <option value="recruiter">Recruiter</option>
                  <option value="hr_admin">HR Admin</option>
                  <option value="payroll_admin">Payroll Admin</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Base Monthly Salary ($)</label>
                <input
                  type="number"
                  placeholder="9500"
                  value={newSalary}
                  onChange={(e) => setNewSalary(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:border-[#4361EE]"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-[#4361EE] hover:bg-blue-700 rounded-lg shadow-sm"
              >
                Onboard Employee
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
