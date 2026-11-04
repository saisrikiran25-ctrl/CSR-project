import React, { useState } from 'react';
import {
  Users,
  CheckSquare,
  Clock,
  Layers,
  Award,
  Calendar,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const TrainerConsole: React.FC = () => {
  const { t } = useTranslation();
  const [selectedCohort, setSelectedCohort] = useState('JB-Cohort-03');
  const [markedAttendance, setMarkedAttendance] = useState<Record<string, boolean>>({
    'L01': true,
    'L02': true,
    'L03': true,
    'L04': false,
  });

  const learners = [
    { id: 'L01', name: 'Meera Ben Rathod', cluster: 'Moti Khavdi', hours: 580, status: 'Ready for Assessment' },
    { id: 'L02', name: 'Rahul Vaghela', cluster: 'Rangpar', hours: 120, status: 'Active (Module 2)' },
    { id: 'L03', name: 'Kavita Parmar', cluster: 'Jambuda', hours: 440, status: 'Active (Module 6)' },
    { id: 'L04', name: 'Dinesh Solanki', cluster: 'Jambuda', hours: 90, status: 'Dropout Risk (Low Attendance)' },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-solar-600 bg-solar-50 px-2.5 py-0.5 rounded">
            {t('dashboard.trainer')}
          </span>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
            Jambuda Technical Center & Rooftop Lab
          </h1>
          <p className="text-xs text-slate-500">
            Trainer: Amit Patel • 25 kW Rooftop PV Training Rig Live
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="font-bold text-slate-500">{t('dashboard.active_cohort')}</span>
          <select
            value={selectedCohort}
            onChange={e => setSelectedCohort(e.target.value)}
            className="p-2 rounded-xl border border-slate-300 dark:border-slate-700 font-bold text-slate-900 dark:text-white bg-transparent"
          >
            <option value="JB-Cohort-03">JB-Cohort-03 (Solar PV Technician)</option>
            <option value="JB-Cohort-02">JB-Cohort-02 (Completed)</option>
          </select>
        </div>
      </div>

      {/* Lab Slots & Daily Attendance */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-emerald-600" />
            <span>{t('dashboard.attendance')}</span>
          </h3>
          <span className="text-xs font-semibold text-slate-500">Session: 9:00 AM - 1:00 PM</span>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
          {learners.map(l => (
            <div key={l.id} className="py-3 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900 dark:text-white">{l.name}</div>
                <div className="text-xs text-slate-500">
                  Cluster: {l.cluster} • Completed: <strong>{l.hours} / 600 Hours</strong>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`px-2 py-0.5 rounded text-xs font-semibold ${
                    l.status.includes('Dropout')
                      ? 'bg-rose-100 text-rose-800'
                      : l.status.includes('Ready')
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {l.status}
                </span>

                <button
                  onClick={() =>
                    setMarkedAttendance(prev => ({ ...prev, [l.id]: !prev[l.id] }))
                  }
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
                    markedAttendance[l.id]
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>{markedAttendance[l.id] ? t('dashboard.present') : t('dashboard.mark_present')}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Practical Lab Checklist Evaluation Rubric */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Layers className="w-4 h-4 text-sun-500" />
          <span>Practical Task Checklist Scoring Rubric</span>
        </h3>

        <div className="space-y-3 text-xs">
          {[
            { task: 'DC String MC4 Crimp & Insulation Resistance Test (Megger)', points: 25 },
            { task: 'Roof Ladder 4:1 Securing and Full Body Harness Anchor', points: 25 },
            { task: 'Inverter DC Isolation & Grid Anti-Islanding Trip Check', points: 25 },
            { task: 'Multimeter Open Circuit Voltage (Voc) vs Nameplate Comparison', points: 25 },
          ].map((rubric, idx) => (
            <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl flex items-center justify-between">
              <span className="font-semibold text-slate-800 dark:text-slate-200">{rubric.task}</span>
              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-mono">Max: {rubric.points} pts</span>
                <select className="bg-white dark:bg-slate-900 p-1 rounded border border-slate-300 font-bold">
                  <option>25 (Competent)</option>
                  <option>20 (Satisfactory)</option>
                  <option>10 (Needs Practice)</option>
                </select>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => alert('Practical marks saved to learner digital record!')}
          className="mt-3 px-5 py-2.5 rounded-xl bg-solar-600 hover:bg-solar-700 text-white text-xs font-bold shadow"
        >
          {t('dashboard.save_scores')}
        </button>
      </div>
    </div>
  );
};
