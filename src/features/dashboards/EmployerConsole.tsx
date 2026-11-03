import React, { useState } from 'react';
import { SEEDED_JOBS } from '../../mocks/seedData';
import {
  Building2,
  Briefcase,
  Users,
  PlusCircle,
  CheckCircle,
  FileText,
  Search,
} from 'lucide-react';

export const EmployerConsole: React.FC = () => {
  const [jobs, setJobs] = useState(SEEDED_JOBS);
  const [showNewJobModal, setShowNewJobModal] = useState(false);
  const [shortlisted, setShortlisted] = useState<Record<string, boolean>>({
    'cand_meera': true,
  });

  const certifiedCandidates = [
    {
      id: 'cand_meera',
      name: 'Meera Ben Rathod',
      cluster: 'Moti Khavdi',
      course: 'Solar PV Technician (600h)',
      grade: 'Distinction (92%)',
      certId: 'UK-2026-MK-0842',
      skills: ['DC String Cabling', 'Working at Height', 'MC4 Crimping'],
      consentJobSharing: true,
    },
    {
      id: 'cand_kavita',
      name: 'Kavita Parmar',
      cluster: 'Jambuda',
      course: 'Solar PV Technician (600h)',
      grade: 'First Class (80%)',
      certId: 'UK-2026-JB-0914',
      skills: ['Rooftop Mounting', 'Earth Testing', 'Inverter Wiring'],
      consentJobSharing: true,
    },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider bg-indigo-50 px-2.5 py-0.5 rounded">
            Reliance Giga Complex & Vendor Ecosystem
          </span>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
            Saurashtra Solar EPC Services (Partner Employer)
          </h1>
          <p className="text-xs text-slate-500">
            Hiring Certified Solar Technicians & Apprentices from Jamnagar Clusters
          </p>
        </div>

        <button
          onClick={() => alert('New job posting modal opened (Simulated)!')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-solar-600 hover:bg-solar-700 text-white font-bold text-xs shadow transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Post New Solar Job</span>
        </button>
      </div>

      {/* Consent-Based Candidate Talent Pool */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Users className="w-4 h-4 text-solar-600" />
              <span>Certified Job-Ready Candidates (Consent Granted)</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Only learners who have explicitly consented in their Privacy Center are listed here.
            </p>
          </div>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
          {certifiedCandidates.map(c => (
            <div key={c.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 dark:text-white text-sm">{c.name}</span>
                  <span className="px-2 py-0.5 rounded bg-sun-100 text-amber-900 text-[10px] font-bold">
                    {c.cluster} Cluster
                  </span>
                </div>
                <div className="text-slate-600 dark:text-slate-300">
                  {c.course} • Grade: <strong>{c.grade}</strong> (ID: {c.certId})
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {c.skills.map(s => (
                    <span key={s} className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-[10px] text-slate-600 dark:text-slate-300">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setShortlisted(prev => ({ ...prev, [c.id]: !prev[c.id] }));
                    alert(`Candidate ${c.name} shortlisted for Solar Installer Interview!`);
                  }}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all ${
                    shortlisted[c.id]
                      ? 'bg-emerald-600 text-white'
                      : 'bg-solar-600 hover:bg-solar-700 text-white shadow'
                  }`}
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>{shortlisted[c.id] ? 'Shortlisted' : 'Shortlist Candidate'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Job Postings */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-emerald-600" />
          <span>Active Postings & Vendor Openings</span>
        </h3>

        <div className="space-y-3 text-xs">
          {jobs.map(j => (
            <div key={j.id} className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">{j.title}</h4>
                <p className="text-slate-500 mt-0.5">
                  Cluster: {j.cluster} • Vacancies: <strong>{j.vacancies}</strong> • Pay: <strong>{j.salaryMonthly}</strong>
                </p>
              </div>

              <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px] uppercase">
                Active Opening
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

