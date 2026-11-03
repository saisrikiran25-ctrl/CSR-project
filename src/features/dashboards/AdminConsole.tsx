import React, { useState } from 'react';
import { db } from '../../lib/db';
import {
  Shield,
  RotateCcw,
  FileQuestion,
  Users,
  Award,
  Settings,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react';

export const AdminConsole: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'flags' | 'questions' | 'reset'>('flags');
  const [flags, setFlags] = useState({
    demoMode: true,
    chaosMode: false,
    dataSaverDefault: false,
    proctoringLite: true,
    jobsEnabled: true,
  });

  const [resetSuccess, setResetSuccess] = useState(false);

  const handleResetData = async () => {
    if (confirm('Are you sure you want to reset all mock databases and restore original demo state?')) {
      await db.resetData();
      setResetSuccess(true);
      setTimeout(() => {
        setResetSuccess(false);
        window.location.reload();
      }, 1500);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded">
            Super Administrator Operations
          </span>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
            Platform Configuration & Integrity Management
          </h1>
          <p className="text-xs text-slate-500">
            Feature Flags, Question Banks, Certificate Registry, Audit Logs
          </p>
        </div>

        <button
          onClick={handleResetData}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow transition-all active:scale-95"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Demo Data</span>
        </button>
      </div>

      {resetSuccess && (
        <div className="p-4 bg-emerald-50 text-emerald-900 border border-emerald-300 rounded-2xl text-xs font-bold flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>Database reset complete! Reloading platform...</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-3 text-xs font-bold">
        {[
          { id: 'flags', label: 'Feature Flags & System Chaos Mode', icon: Settings },
          { id: 'questions', label: 'Vocational Question Bank (150+ Qs)', icon: FileQuestion },
          { id: 'reset', label: 'Audit Logs & Mock Telemetry Reset', icon: Shield },
        ].map(t => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`flex items-center gap-1.5 py-2.5 px-3 border-b-2 transition-all ${
                activeTab === t.id
                  ? 'border-solar-600 text-solar-700 dark:text-solar-400 font-extrabold'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: FEATURE FLAGS */}
      {activeTab === 'flags' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 space-y-4 text-xs">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Runtime Feature Flags
          </h3>

          <div className="space-y-3">
            {[
              { key: 'demoMode', label: 'Demo Mode (Enables one-click persona login and simulated SMS inbox)', desc: 'VITE_DEMO_MODE' },
              { key: 'chaosMode', label: 'Chaos Mode (Simulates intermittent rural 3G connection timeouts & failures)', desc: 'VITE_CHAOS_MODE' },
              { key: 'dataSaverDefault', label: 'Data Saver Default (Forces audio-only mode by default for low-bandwidth)', desc: 'VITE_DATA_SAVER_DEFAULT' },
              { key: 'proctoringLite', label: 'Proctoring Lite (Tab blur detection, randomized options, autosave)', desc: 'VITE_PROCTORING_LITE' },
              { key: 'jobsEnabled', label: 'Reliance Vendor Job Board (Stream D linkage)', desc: 'VITE_JOBS_ENABLED' },
            ].map(f => (
              <label key={f.key} className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 cursor-pointer hover:bg-slate-50">
                <div>
                  <div className="font-bold text-slate-800 dark:text-slate-200">{f.label}</div>
                  <div className="text-[10px] text-slate-400 font-mono">{f.desc}</div>
                </div>
                <input
                  type="checkbox"
                  checked={(flags as any)[f.key]}
                  onChange={e => setFlags(prev => ({ ...prev, [f.key]: e.target.checked }))}
                  className="w-4 h-4 accent-solar-600 rounded cursor-pointer"
                />
              </label>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: QUESTION BANK */}
      {activeTab === 'questions' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 space-y-4 text-xs">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                NSDC/Suryamitra Aligned Question Bank
              </h3>
              <p className="text-slate-500 mt-0.5">MCQ, Image Hotspots, Numeric Formula, Ordering & Voice Viva.</p>
            </div>
            <button
              onClick={() => alert('Bulk CSV Question import modal (Simulated)!')}
              className="px-3 py-1.5 rounded-xl bg-solar-600 text-white font-bold"
            >
              Bulk Import CSV
            </button>
          </div>

          <div className="p-3 bg-cream-50 dark:bg-slate-800 rounded-xl flex items-center justify-between font-mono">
            <span>Total Questions Seeded: <strong>154 Items</strong></span>
            <span>Reviewed & Tagged: <strong>100%</strong></span>
          </div>
        </div>
      )}

      {/* TAB 3: AUDIT LOGS */}
      {activeTab === 'reset' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 space-y-4 text-xs">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            System Audit & Security Log
          </h3>

          <div className="font-mono space-y-2 text-[11px] text-slate-600 dark:text-slate-400 max-h-60 overflow-y-auto">
            <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
              [2026-11-04 01:05] AUTH: OTP Challenge issued for +91 98765 43210 (Code 123456)
            </div>
            <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
              [2026-11-04 01:08] ASSESS: Third-party certificate sign-off UK-2026-MK-0842 by Dr. R. K. Joshi
            </div>
            <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
              [2026-11-04 01:12] SOLAR_TELEMETRY: Moti Khavdi 25kW Hub daily generation synced: 114.2 kWh
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

