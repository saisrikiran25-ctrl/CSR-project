import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  PhoneCall,
  AlertTriangle,
  Compass,
  CheckCircle,
  HelpCircle,
} from 'lucide-react';

export const CoordinatorConsole: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dropout' | 'onboard' | 'shg'>('dropout');
  const [contacted, setContacted] = useState<Record<string, boolean>>({});

  const dropoutRisks = [
    {
      id: 'D01',
      name: 'Dinesh Solanki',
      cluster: 'Danidhar',
      phone: '+91 98*** **491',
      missedDays: 5,
      reason: 'Harvest season farming pressure',
      stipendStatus: 'Hold until contact',
    },
    {
      id: 'D02',
      name: 'Pooja Vaghela',
      cluster: 'Danidhar',
      phone: '+91 98*** **812',
      missedDays: 4,
      reason: 'Childcare & evening travel safety',
      stipendStatus: 'Active',
    },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider bg-emerald-50 px-2.5 py-0.5 rounded">
            Cluster Mobiliser & Outreach
          </span>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
            Danidhar & Bhuchar Mori Cluster Coordination
          </h1>
          <p className="text-xs text-slate-500">
            Coordinator: Bhavna Ben Parmar • Village Panchayat Liaison & SHG Linkage
          </p>
        </div>

        <button
          onClick={() => alert('Onboarding modal opened (Simulated)!')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-solar-600 hover:bg-solar-700 text-white font-bold text-xs shadow"
        >
          <UserPlus className="w-4 h-4" />
          <span>Onboard New Village Youth</span>
        </button>
      </div>

      {/* Navigation tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-3 text-xs font-bold">
        {[
          { id: 'dropout', label: 'Dropout Intervention Queue (2 At-Risk)', icon: AlertTriangle },
          { id: 'shg', label: 'SHG Solar Enterprise Liaisons', icon: Users },
          { id: 'onboard', label: 'Cluster Enrolment Records', icon: CheckCircle },
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

      {/* DROPOUT INTERVENTION QUEUE */}
      {activeTab === 'dropout' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Immediate Follow-up Queue (Dropout Risk Mitigation)
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Beneficiaries who have missed &gt; 3 consecutive hub training sessions.
            </p>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
            {dropoutRisks.map(item => (
              <div key={item.id} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-white text-sm">{item.name}</span>
                    <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 text-[10px] font-bold">
                      {item.missedDays} Days Missed
                    </span>
                  </div>
                  <div className="text-slate-500">
                    Reported obstacle: <strong>{item.reason}</strong>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Phone (masked): {item.phone} • Stipend status: {item.stipendStatus}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setContacted(prev => ({ ...prev, [item.id]: true }));
                      alert(`Dialed ${item.phone}. Logged coordinator follow-up note.`);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                      contacted[item.id]
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-solar-600 hover:bg-solar-700 text-white shadow'
                    }`}
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>{contacted[item.id] ? 'Outreach Logged' : 'Call Beneficiary'}</span>
                  </button>

                  <button
                    onClick={() => alert('Assigned flexible afternoon batch shift.')}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs"
                  >
                    Switch to Women/Flexible Shift
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SHG LIAISON TAB */}
      {activeTab === 'shg' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 space-y-4 text-xs">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Women SHG Solar Dryer & Margin Money Follow-up
          </h3>
          <p className="text-slate-500">
            Facilitating PMFME 35% subsidies and Urja Kaushal ₹1.2 Cr margin grants for Danidhar women.
          </p>
          <div className="p-4 bg-sun-50/70 border border-sun-200 rounded-2xl flex items-center justify-between">
            <div>
              <div className="font-bold text-amber-900">Suryodaya Farmer Women Group</div>
              <div className="text-slate-600">Application submitted for 2 Solar Agri-Dryers • Margin Grant: ₹2,10,000</div>
            </div>
            <span className="px-2.5 py-1 rounded bg-sun-200 text-amber-900 font-bold text-[10px]">
              DDO Verification Pending
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

