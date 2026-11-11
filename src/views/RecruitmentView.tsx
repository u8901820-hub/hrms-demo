import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Briefcase, 
  UserPlus, 
  Search, 
  MapPin, 
  DollarSign, 
  Star, 
  ChevronRight, 
  Plus, 
  FileText, 
  CheckCircle2, 
  ArrowRight,
  X
} from 'lucide-react';
import { Candidate, JobOpening } from '../types';

export const RecruitmentView: React.FC = () => {
  const { jobs, candidates, addJobOpening, updateCandidateStage, currentUser, showToast } = useApp();

  const [activeTab, setActiveTab] = useState<'pipeline' | 'jobs'>('pipeline');
  const [selectedJobFilter, setSelectedJobFilter] = useState('all');
  const [showAddJobModal, setShowAddJobModal] = useState(false);

  // New Job state
  const [newTitle, setNewTitle] = useState('');
  const [newDept, setNewDept] = useState('Engineering');
  const [newLocation, setNewLocation] = useState('San Francisco, CA / Remote');
  const [newType, setNewType] = useState<JobOpening['type']>('Full-time');
  const [newSalary, setNewSalary] = useState('$140,000 - $175,000');

  const stages: Array<Candidate['stage']> = [
    'Applied',
    'Screening',
    'Technical',
    'HR Interview',
    'Offered',
    'Hired'
  ];

  const filteredCandidates = candidates.filter(c => {
    if (selectedJobFilter === 'all') return true;
    return c.jobId === selectedJobFilter;
  });

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;
    addJobOpening({
      title: newTitle,
      department: newDept,
      location: newLocation,
      type: newType,
      status: 'published',
      salaryRange: newSalary
    });
    setShowAddJobModal(false);
    setNewTitle('');
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Briefcase className="text-[#4361EE]" size={22} />
            <span>Talent Acquisition & Candidate ATS</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            End-to-end applicant tracking, structured evaluation stages, and automated interview scheduling.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-slate-100 p-1 rounded-lg flex items-center gap-1">
            <button
              onClick={() => setActiveTab('pipeline')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activeTab === 'pipeline' ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Kanban Pipeline
            </button>
            <button
              onClick={() => setActiveTab('jobs')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activeTab === 'jobs' ? 'bg-white text-slate-800 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Job Openings ({jobs.length})
            </button>
          </div>

          <button
            onClick={() => setShowAddJobModal(true)}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-[#4361EE] hover:bg-blue-700 rounded-lg flex items-center gap-1.5 shadow-sm"
          >
            <Plus size={15} />
            <span>Post New Job</span>
          </button>
        </div>
      </div>

      {activeTab === 'pipeline' && (
        <div className="space-y-4">
          {/* Job Filter Pill */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <span className="text-xs font-bold text-slate-500">Filter Position:</span>
            <button
              onClick={() => setSelectedJobFilter('all')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                selectedJobFilter === 'all' ? 'bg-[#14213D] text-white' : 'bg-white border border-slate-200 text-slate-600'
              }`}
            >
              All Openings ({candidates.length})
            </button>
            {jobs.map(j => (
              <button
                key={j.id}
                onClick={() => setSelectedJobFilter(j.id)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  selectedJobFilter === j.id ? 'bg-[#4361EE] text-white' : 'bg-white border border-slate-200 text-slate-600'
                }`}
              >
                {j.title}
              </button>
            ))}
          </div>

          {/* Kanban Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3 overflow-x-auto pb-4">
            {stages.map((stage) => {
              const stageCandidates = filteredCandidates.filter(c => c.stage === stage);
              return (
                <div key={stage} className="bg-slate-100/80 rounded-xl p-3 flex flex-col min-w-[210px] border border-slate-200/60">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200">
                    <span className="text-xs font-bold text-slate-800">{stage}</span>
                    <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded-full font-bold">
                      {stageCandidates.length}
                    </span>
                  </div>

                  <div className="space-y-2.5 flex-1">
                    {stageCandidates.map((cand) => (
                      <div 
                        key={cand.id} 
                        className="bg-white p-3 rounded-lg border border-slate-200 shadow-xs hover:border-[#4361EE] transition-all space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-bold text-slate-900">{cand.name}</p>
                          <div className="flex items-center text-amber-500 text-[10px] font-bold">
                            <Star size={11} className="fill-current mr-0.5" />
                            <span>{cand.rating}</span>
                          </div>
                        </div>

                        <p className="text-[11px] text-slate-500 font-medium line-clamp-1">{cand.jobTitle}</p>
                        <p className="text-[10px] text-slate-400">{cand.experienceYears}y exp • {cand.phone}</p>

                        {/* Stage mover buttons */}
                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-[9px] text-slate-400 font-mono">CV verified</span>
                          <div className="flex items-center gap-1">
                            {stage !== 'Hired' && (
                              <button
                                onClick={() => {
                                  const nextIdx = stages.indexOf(stage) + 1;
                                  if (nextIdx < stages.length) {
                                    updateCandidateStage(cand.id, stages[nextIdx]);
                                  }
                                }}
                                title="Move to next stage"
                                className="text-[10px] px-1.5 py-0.5 font-bold text-white bg-[#4361EE] hover:bg-blue-700 rounded transition-colors flex items-center gap-0.5"
                              >
                                <span>Advance</span>
                                <ArrowRight size={10} />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}

                    {stageCandidates.length === 0 && (
                      <div className="text-center py-6 text-[11px] text-slate-400 border border-dashed border-slate-200 rounded-lg">
                        Empty stage
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'jobs' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#4361EE] bg-blue-50 px-2 py-0.5 rounded-full">
                    {job.department}
                  </span>
                  <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>{job.status}</span>
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 mt-2">{job.title}</h3>

                <div className="space-y-1.5 mt-3 text-xs text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <MapPin size={13} className="text-slate-400" />
                    <span>{job.location} ({job.type})</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <DollarSign size={13} className="text-slate-400" />
                    <span>{job.salaryRange}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">{job.applicantsCount} active applicants</span>
                <button
                  onClick={() => {
                    setSelectedJobFilter(job.id);
                    setActiveTab('pipeline');
                  }}
                  className="font-bold text-[#4361EE] hover:underline flex items-center gap-1"
                >
                  <span>View Pipeline</span>
                  <ChevronRight size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Job Modal */}
      {showAddJobModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <form onSubmit={handleCreateJob} className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Post New Requisition</h3>
              <button 
                type="button" 
                onClick={() => setShowAddJobModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={18} />
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Requisition Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Staff Security Architect"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-200"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Department</label>
                <select
                  value={newDept}
                  onChange={(e) => setNewDept(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200"
                >
                  <option value="Engineering">Engineering</option>
                  <option value="Design">Design</option>
                  <option value="Customer Experience">Customer Experience</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Finance & Operations">Finance & Operations</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Employment Type</label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as JobOpening['type'])}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Location / Office</label>
              <input
                type="text"
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                className="w-full text-xs p-2 rounded-lg border border-slate-200"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Target Annual Compensation</label>
              <input
                type="text"
                value={newSalary}
                onChange={(e) => setNewSalary(e.target.value)}
                className="w-full text-xs p-2 rounded-lg border border-slate-200"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowAddJobModal(false)}
                className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-[#4361EE] hover:bg-blue-700 rounded-lg shadow-sm"
              >
                Publish Opening
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
