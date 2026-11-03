import React, { useState } from 'react';
import { SEEDED_SHGS } from '../../mocks/seedData';
import {
  Zap,
  Calculator,
  FileSpreadsheet,
  CheckCircle,
  HelpCircle,
  TrendingUp,
  DollarSign,
  Sun,
  Users,
} from 'lucide-react';

export const EnterpriseView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'calculator' | 'subsidies' | 'shgs'>('calculator');

  // Calculator inputs
  const [dailyKgsProduce, setDailyKgsProduce] = useState(50); // 50kg chillies
  const [rawCostPerKg, setRawCostPerKg] = useState(35); // ₹35/kg fresh
  const [dryRatio, setDryRatio] = useState(4); // 4kg fresh = 1kg dry
  const [driedSellPrice, setDriedSellPrice] = useState(240); // ₹240/kg dried

  // Calculation
  const dailyRawExpense = dailyKgsProduce * rawCostPerKg; // 50 * 35 = ₹1,750
  const dailyDriedOutputKg = dailyKgsProduce / dryRatio; // 12.5 kg
  const dailyRevenue = dailyDriedOutputKg * driedSellPrice; // 12.5 * 240 = ₹3,000
  const dailyNetProfit = dailyRevenue - dailyRawExpense; // ₹1,250
  const monthlySHGProfit = dailyNetProfit * 25; // ₹31,250 / month!

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-700 via-sun-600 to-solar-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-900 bg-sun-200 px-3 py-1 rounded-full border border-sun-300">
            Stream C — Women-Led Solar Livelihoods (SHG Hub)
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold mt-2 tracking-tight">
            Solar Dehydration & Micro-Enterprise Toolkit
          </h1>
          <p className="text-xs text-amber-100 mt-1 max-w-xl">
            Helping Jamnagar women transform farm produce into profitable dried spices with ₹1.2 Cr margin money and 35% PMFME subsidies.
          </p>
        </div>

        <div className="bg-slate-950/40 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/20 text-center min-w-[140px]">
          <div className="text-2xl font-black text-sun-300">₹1.2 Cr</div>
          <div className="text-[10px] text-slate-200 uppercase font-bold">Margin Money Fund</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-white dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 gap-2 text-xs font-bold w-fit">
        {[
          { id: 'calculator', label: 'Solar Dryer Profit Calculator', icon: Calculator },
          { id: 'subsidies', label: '35% Subsidy & Grant Checklist', icon: DollarSign },
          { id: 'shgs', label: 'Jamnagar Active SHG Circles', icon: Users },
        ].map(t => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all ${
                activeTab === t.id
                  ? 'bg-solar-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: INTERACTIVE CALCULATOR */}
      {activeTab === 'calculator' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Inputs Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Sun className="w-4 h-4 text-sun-500" />
              <span>Solar Food Dehydrator Parameters</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span>Daily Fresh Produce Input (e.g., Chillies/Onions):</span>
                  <strong className="text-solar-600">{dailyKgsProduce} kg/day</strong>
                </div>
                <input
                  type="range"
                  min="10"
                  max="200"
                  step="10"
                  value={dailyKgsProduce}
                  onChange={e => setDailyKgsProduce(Number(e.target.value))}
                  className="w-full accent-solar-600"
                />
              </div>

              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span>Fresh Purchase Cost (₹/kg):</span>
                  <strong className="text-slate-900 dark:text-white">₹{rawCostPerKg}/kg</strong>
                </div>
                <input
                  type="range"
                  min="15"
                  max="80"
                  step="5"
                  value={rawCostPerKg}
                  onChange={e => setRawCostPerKg(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>

              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span>Selling Price of Clean Dried Spices (₹/kg):</span>
                  <strong className="text-emerald-600">₹{driedSellPrice}/kg</strong>
                </div>
                <input
                  type="range"
                  min="120"
                  max="450"
                  step="10"
                  value={driedSellPrice}
                  onChange={e => setDriedSellPrice(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                />
              </div>
            </div>
          </div>

          {/* Results Profit Card */}
          <div className="bg-gradient-to-br from-solar-900 to-slate-900 rounded-3xl p-6 shadow-xl border border-slate-800 text-white flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-sun-300 bg-sun-400/20 px-2.5 py-0.5 rounded">
                Estimated Monthly Return
              </span>
              <h3 className="text-xl font-extrabold mt-2 text-white">
                SHG Net Monthly Livelihood Profit
              </h3>
              <div className="text-4xl font-black text-sun-400 mt-2 font-mono">
                ₹{monthlySHGProfit.toLocaleString()}
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Yields ~₹6,000 to ₹8,000 monthly household income uplift per woman member.
              </p>
            </div>

            <div className="space-y-2 pt-4 border-t border-slate-800 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Daily Dried Spice Output:</span>
                <strong className="text-white">{dailyDriedOutputKg.toFixed(1)} kg</strong>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Daily Sales Revenue:</span>
                <strong className="text-emerald-400 font-mono">₹{dailyRevenue.toLocaleString()}</strong>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Daily Raw Purchase Expense:</span>
                <strong className="text-rose-400 font-mono">₹{dailyRawExpense.toLocaleString()}</strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SUBSIDIES & GRANTS */}
      {activeTab === 'subsidies' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 space-y-4 text-xs">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Government Subsidies & Urja Kaushal Margin Grants
          </h3>
          <p className="text-slate-500">
            Verify current rules with local Jamnagar SRLM / PMFME officers before signing agreements.
          </p>

          <div className="space-y-3">
            {[
              { scheme: 'PMFME Micro Food Processing Enterprise Subsidy', amount: 'Up to 35% (Max ₹10 Lakh)', eligibility: 'Registered SHGs with basic book-keeping', status: 'Applicable' },
              { scheme: 'Urja Kaushal Catalytic Margin Money Grant', amount: '₹1.5 - ₹2.5 Lakh per Hub', eligibility: 'Certified Stream C SHG women groups', status: 'Fund Available' },
              { scheme: 'Gujarat SRLM Bank Linkage Revolving Credit', amount: 'Low interest working capital', eligibility: '6 months regular meeting attendance', status: 'Active' },
            ].map(s => (
              <div key={s.scheme} className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900 dark:text-white text-sm">{s.scheme}</div>
                  <div className="text-slate-500 mt-0.5">{s.eligibility}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold font-mono text-emerald-600">{s.amount}</div>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">{s.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: ACTIVE SHGS */}
      {activeTab === 'shgs' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 space-y-4 text-xs">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Jamnagar Women SHG Solar Enterprises
          </h3>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {SEEDED_SHGS.map(shg => (
              <div key={shg.id} className="py-4 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900 dark:text-white text-sm">{shg.name}</div>
                  <div className="text-slate-500">
                    Cluster: {shg.cluster} • {shg.membersCount} Members • {shg.solarInitiative}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold font-mono text-emerald-600">₹{shg.monthlyRevenueINR.toLocaleString()} / mo</div>
                  <span className="text-[10px] uppercase font-bold text-amber-700 bg-sun-100 px-2 py-0.5 rounded">
                    Grant: {shg.grantSubsidyStatus}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

