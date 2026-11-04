import React, { useState, useEffect } from 'react';
import { Job, JobApplication } from '../../types';
import { db } from '../../lib/db';
import { SEEDED_JOBS } from '../../mocks/seedData';
import { useAuth } from '../auth/AuthContext';
import { useTranslation } from 'react-i18next';
import {
  Briefcase,
  Building2,
  MapPin,
  Clock,
  CheckCircle,
  FileText,
  Filter,
  Star,
  ArrowRight,
} from 'lucide-react';

export const JobsView: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<Record<string, string>>({
    'job_epc_technician_01': 'shortlisted',
  });
  const [filterType, setFilterType] = useState<string>('all');
  const [showAppModal, setShowAppModal] = useState<Job | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      const data = await db.jobs.toArray();
      setJobs(data.length > 0 ? data : SEEDED_JOBS);
    };
    fetchJobs();
  }, []);

  const handleApply = (jobId: string) => {
    setAppliedJobs(prev => ({ ...prev, [jobId]: 'applied' }));
    setShowAppModal(null);
    alert(t('jobs.applied'));
  };

  const filteredJobs = jobs.filter(j => {
    if (filterType === 'all') return true;
    if (filterType === 'full_time') return j.type === 'full_time';
    if (filterType === 'apprenticeship') return j.type === 'apprenticeship';
    return true;
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-ink-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-sun-300 bg-sun-400/20 px-3 py-1 rounded-full border border-sun-400/30">
            {t('jobs.eyebrow')}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold mt-2 tracking-tight">
            {t('jobs.title')}
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            {t('jobs.subtitle')}
          </p>
        </div>

        <div className="bg-white/10 px-4 py-3 rounded-2xl border border-white/20 text-center min-w-[140px]">
          <div className="text-2xl font-extrabold text-sun-400">74%</div>
          <div className="text-xs text-slate-300 font-bold">{t('jobs.placement')}</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 gap-2 text-xs font-bold w-fit">
        {[
          { id: 'all', label: t('jobs.all') },
          { id: 'full_time', label: t('jobs.full_time') },
          { id: 'apprenticeship', label: t('jobs.apprenticeship') },
        ].map(f => (
          <button
            key={f.id}
            onClick={() => setFilterType(f.id)}
            className={`px-4 py-2 rounded-xl transition-all ${
              filterType === f.id
                ? 'bg-solar-600 text-white '
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        {filteredJobs.map(job => {
          const appStatus = appliedJobs[job.id];

          return (
            <div
              key={job.id}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 hover:border-slate-300 border border-slate-200 dark:border-slate-800 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
            >
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 ">
                    {job.type.replace('_', ' ')}
                  </span>
                  {job.isRelianceVendor && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-sun-100 text-amber-900 border border-sun-300">
                      {t('jobs.reliance')}
                    </span>
                  )}
                  <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                    {job.salaryMonthly}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  {job.title}
                </h3>

                <p className="text-xs text-slate-500 flex items-center gap-2">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>{job.employerName}</span>
                  <span>•</span>
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{job.location} ({t('jobs.cluster', { cluster: job.cluster })})</span>
                </p>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                  {job.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {job.requiredSkills.map(s => (
                    <span
                      key={s}
                      className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-medium"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button & Pipeline Status */}
              <div className="flex flex-col sm:items-end gap-2 flex-shrink-0">
                {appStatus ? (
                  <div className="flex flex-col items-end">
                    <span
                      className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 ${
                        appStatus === 'shortlisted'
                          ? 'bg-sun-100 text-amber-900 border border-sun-300 '
                          : 'bg-emerald-100 text-emerald-900'
                      }`}
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span>{t('jobs.status', { status: appStatus.toUpperCase() })}</span>
                    </span>
                    {appStatus === 'shortlisted' && (
                      <span className="text-xs text-amber-700 font-semibold mt-1">
                        {t('jobs.interview')}
                      </span>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => handleApply(job.id)}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-solar-600 hover:bg-solar-700 text-white font-bold text-xs transition-all active:scale-95"
                  >
                    <span>{t('jobs.apply')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
                <span className="text-xs text-slate-400">{job.vacancies} {t('jobs.vacancies')}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
