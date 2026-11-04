import React, { useState } from 'react';
import {
  FileCheck2,
  Award,
  CheckCircle,
  ShieldCheck,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const AssessorConsole: React.FC = () => {
  const { t } = useTranslation();
  const [candidates, setCandidates] = useState([
    {
      id: 'CAN-01',
      name: 'Meera Ben Rathod',
      cluster: 'Moti Khavdi',
      theoryScore: 92,
      practicalScore: 95,
      attendancePct: 88,
      status: 'Ready to Sign',
      certId: 'UK-2026-MK-0842',
    },
    {
      id: 'CAN-02',
      name: 'Kavita Parmar',
      cluster: 'Jambuda',
      theoryScore: 78,
      practicalScore: 82,
      attendancePct: 85,
      status: 'Ready to Sign',
      certId: 'UK-2026-JB-0914',
    },
    {
      id: 'CAN-03',
      name: 'Prakash Solanki',
      cluster: 'Danidhar',
      theoryScore: 54,
      practicalScore: 70,
      attendancePct: 76,
      status: 'Theory Retake Required (Min 60%)',
      certId: null,
    },
  ]);

  const [signedCerts, setSignedCerts] = useState<Record<string, boolean>>({});

  const handleSignCertificate = (candidateId: string) => {
    setSignedCerts(prev => ({ ...prev, [candidateId]: true }));
    alert('Third-Party Digital Signature Affixed. Verifiable Certificate Published!');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded">
            {t('dashboard.assessor')}
          </span>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
            Skill Council for Green Jobs (SCGJ-Style) Assessor Queue
          </h1>
          <p className="text-xs text-slate-500">
            Assessor: Dr. R. K. Joshi • National Vocational Integrity Verification
          </p>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-900 px-3 py-1.5 rounded-xl border border-emerald-200 text-xs font-bold">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Independent Assessor Token Active</span>
        </div>
      </div>

      {/* Certification Eligibility Rules Reminder */}
      <div className="bg-solar-50/60 dark:bg-slate-800/60 rounded-2xl p-4 border border-solar-200 dark:border-slate-700 text-xs text-solar-900 dark:text-solar-200">
        <div className="font-bold mb-1 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-solar-600" />
          <span>Certification Minimum Passing Criteria (600-Hour Suryamitra):</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
          <div>• Theory Pass Mark: <strong>≥ 60%</strong></div>
          <div>• Practical Lab: <strong>Competent (≥ 70%)</strong></div>
          <div>• Hub Attendance: <strong>≥ 75%</strong></div>
          <div>• 600 Hours Completed: <strong>Mandatory</strong></div>
        </div>
      </div>

      {/* Candidate Queue Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <FileCheck2 className="w-4 h-4 text-solar-600" />
          <span>Candidates Pending Third-Party Result Sign-off</span>
        </h3>

        <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
          {candidates.map(c => {
            const isSigned = signedCerts[c.id];
            const canSign = c.theoryScore >= 60 && c.practicalScore >= 70 && c.attendancePct >= 75;

            return (
              <div key={c.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-white text-sm">{c.name}</span>
                    <span className="text-slate-400 font-mono text-xs">({c.cluster})</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                    <span>Theory: <strong className={c.theoryScore >= 60 ? 'text-emerald-600' : 'text-rose-600'}>{c.theoryScore}%</strong></span>
                    <span>Practical: <strong className="text-emerald-600">{c.practicalScore}%</strong></span>
                    <span>Attendance: <strong>{c.attendancePct}%</strong></span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {canSign ? (
                    <button
                      onClick={() => handleSignCertificate(c.id)}
                      disabled={isSigned}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-xs shadow transition-all ${
                        isSigned
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-solar-600 hover:bg-solar-700 text-white'
                      }`}
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>{isSigned ? t('dashboard.signed') : t('dashboard.sign_issue')}</span>
                    </button>
                  ) : (
                    <span className="px-3 py-1.5 rounded-xl bg-rose-50 text-rose-700 font-semibold border border-rose-200">
                      {c.status}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
