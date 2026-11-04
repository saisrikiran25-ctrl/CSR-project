import React, { useState } from 'react';
import { SEEDED_HUBS } from '../../mocks/seedData';
import {
  BarChart3,
  TrendingUp,
  AlertTriangle,
  Calendar,
  DollarSign,
  Users,
  Building,
  CheckCircle2,
  Clock,
  ChevronRight,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const PMDashboard: React.FC = () => {
  const { t } = useTranslation();
  const [selectedPhaseMonth, setSelectedPhaseMonth] = useState(14); // Mid-programme Month 14

  const budgetBreakdown = [
    { category: 'Hub Solar & Tools Infrastructure', plannedCr: 4.0, utilizedCr: 2.85, status: 'On track' },
    { category: 'Training Delivery & Stipends', plannedCr: 2.4, utilizedCr: 1.12, status: 'On track' },
    { category: 'Women SHG Livelihood Margin Fund', plannedCr: 1.2, utilizedCr: 0.54, status: 'Underway' },
    { category: 'Cluster Team & Operations', plannedCr: 0.8, utilizedCr: 0.38, status: 'On track' },
    { category: 'Mobilisation & Village Drives', plannedCr: 0.4, utilizedCr: 0.22, status: 'Completed' },
    { category: 'M&E & Tracer Survey Audits', plannedCr: 0.4, utilizedCr: 0.16, status: 'Active' },
    { category: 'Contingency Reserve', plannedCr: 0.3, utilizedCr: 0.05, status: 'Reserved' },
  ];

  const totalPlanned = budgetBreakdown.reduce((a, b) => a + b.plannedCr, 0);
  const totalUtilized = budgetBreakdown.reduce((a, b) => a + b.utilizedCr, 0);

  const riskRegister = [
    {
      risk: 'Trainee Dropout during harvest / monsoon seasons',
      severity: 'Medium',
      mitigation: 'Flexible morning/evening batch shifts and monthly attendance stipend (₹1,500/mo).',
      owner: 'Community Coordinators',
    },
    {
      risk: 'Lower women participation in technical rooftop strings',
      severity: 'High',
      mitigation: 'Safe daytime women-only cohorts, female master trainers, and Stream C agri-dryer enterprise track.',
      owner: 'Bhavna Ben (Lead Coord)',
    },
    {
      risk: 'Placement delays with regional solar contractors',
      severity: 'High',
      mitigation: 'Pre-pledged hiring MOUs with Reliance vendor ecosystem and Saurashtra EPC contractors.',
      owner: 'Placement Cell',
    },
    {
      risk: 'Equipment damage or solar inverter grid trip',
      severity: 'Low',
      mitigation: '25 kW lightning surge protection (SPD), backup batteries, and weekly trainer O&M check.',
      owner: 'Amit Patel (Lead Trainer)',
    },
    {
      risk: 'Long-term sustainability post-Month 36 handover',
      severity: 'Medium',
      mitigation: 'Institutional transfer to Gram Panchayat with revenue share from solar export tariffs.',
      owner: 'Project Manager & DDO',
    },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded">
            Urja Kaushal PMU • Management Information System (MIS)
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
            {t('dashboard.pm')}
          </h1>
          <p className="text-xs text-slate-500">
            Monitoring 6,000 Beneficiary Targets, 10 Village Hubs & ₹9.5 Cr Budget
          </p>
        </div>

        {/* Phase Time Fast-forward simulator */}
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
          <Calendar className="w-4 h-4 text-solar-600" />
          <span className="font-semibold text-slate-700 dark:text-slate-300">Programme Phase:</span>
          <select
            value={selectedPhaseMonth}
            onChange={e => setSelectedPhaseMonth(Number(e.target.value))}
            className="bg-white dark:bg-slate-900 px-2 py-1 rounded-lg font-bold text-solar-700 dark:text-solar-300 outline-none cursor-pointer"
          >
            <option value={6}>Month 6 (Mobilisation & 3 Hubs)</option>
            <option value={14}>Month 14 (Midline Review - Active)</option>
            <option value={18}>Month 18 (All 10 Hubs Commissioned)</option>
            <option value={36}>Month 36 (Endline & Panchayat Handover)</option>
          </select>
        </div>
      </div>

      {/* 36-Month Milestone Roadmap */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white ">
          36-Month Strategic Implementation Timeline
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs">
          {[
            { phase: '1. Mobilise', months: 'M1–6', desc: 'Panchayat MOUs, SHG outreach, baseline survey', active: selectedPhaseMonth >= 6 },
            { phase: '2. Build Hubs', months: 'M1–18', desc: '10 × 25kW rooftop solar hubs commissioned', active: selectedPhaseMonth >= 14 },
            { phase: '3. Train', months: 'M4–33', desc: '600-hr Suryamitra cohorts & bridge courses', active: selectedPhaseMonth >= 14 },
            { phase: '4. Handhold', months: 'M13–33', desc: 'Vendor placement, apprenticeships, SHG dryers', active: selectedPhaseMonth >= 14 },
            { phase: '5. Handover', months: 'M31–36', desc: 'Panchayat solar ownership & endline audit', active: selectedPhaseMonth >= 36 },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`p-3.5 rounded-2xl border-2 transition-all ${
                item.active
                  ? 'border-solar-600 bg-solar-50/70 text-solar-900 font-semibold'
                  : 'border-slate-200 dark:border-slate-800 text-slate-400 bg-slate-50/50'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold">{item.months}</span>
                {item.active && <CheckCircle2 className="w-3.5 h-3.5 text-solar-600" />}
              </div>
              <div className="font-bold text-xs">{item.phase}</div>
              <div className="text-xs text-slate-500 mt-1">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Cohort Funnel & Training Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cohort Funnel */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white ">
              Beneficiary Funnel (Target: 6,000)
            </h3>
            <span className="text-xs text-emerald-600 font-bold">Current: Month 14</span>
          </div>

          <div className="space-y-3 text-xs">
            {[
              { stage: '1. Mobilised & Enrolled', count: 2410, target: 6000, pct: 40, color: 'bg-blue-600' },
              { stage: '2. Active in 600-Hr Cohorts', count: 2180, target: 6000, pct: 36, color: 'bg-indigo-600' },
              { stage: '3. Assessed (Theory & Practical)', count: 1620, target: 6000, pct: 27, color: 'bg-amber-600' },
              { stage: '4. Certified Technicians', count: 1480, target: 6000, pct: 25, color: 'bg-emerald-600' },
              { stage: '5. Earning within 6 Months', count: 1095, target: 4200, pct: 74, color: 'bg-sun-500' },
            ].map(f => (
              <div key={f.stage} className="space-y-1">
                <div className="flex justify-between font-semibold">
                  <span>{f.stage}</span>
                  <span className="font-mono font-bold">{f.count} ({f.pct}%)</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div className={`h-full ${f.color} rounded-full`} style={{ width: `${(f.count / f.target) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Budget Utilisation Tracker */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white ">
              ₹9.5 Cr CSR Budget Utilisation
            </h3>
            <span className="text-xs font-bold text-solar-600">
              ₹{totalUtilized.toFixed(2)} Cr / ₹{totalPlanned.toFixed(2)} Cr (56%)
            </span>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
            {budgetBreakdown.map(b => (
              <div key={b.category} className="py-2.5 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-800 dark:text-slate-200">{b.category}</div>
                  <div className="text-xs text-slate-400">Planned: ₹{b.plannedCr.toFixed(1)} Cr</div>
                </div>
                <div className="text-right">
                  <div className="font-bold font-mono text-slate-900 dark:text-white">₹{b.utilizedCr.toFixed(2)} Cr</div>
                  <span className="text-xs text-emerald-600 font-semibold">{b.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Risk Register (Proposal Aligned) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          <span>Active Programme Risk Mitigation Register</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold text-xs">
                <th className="py-2.5">Key Identified Risk</th>
                <th className="py-2.5">Severity</th>
                <th className="py-2.5">Active Mitigation Action</th>
                <th className="py-2.5">Owner</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {riskRegister.map((r, i) => (
                <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="py-3 font-semibold text-slate-800 dark:text-slate-200">{r.risk}</td>
                  <td className="py-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                        r.severity === 'High'
                          ? 'bg-rose-100 text-rose-800'
                          : r.severity === 'Medium'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {r.severity}
                    </span>
                  </td>
                  <td className="py-3 text-slate-600 dark:text-slate-300 max-w-sm">{r.mitigation}</td>
                  <td className="py-3 font-medium text-slate-500">{r.owner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
