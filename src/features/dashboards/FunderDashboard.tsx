import React, { useState } from 'react';
import { SEEDED_HUBS } from '../../mocks/seedData';
import {
  Sun,
  Zap,
  Users,
  Award,
  Leaf,
  Download,
  Building,
  TrendingUp,
  MapPin,
  CheckCircle,
} from 'lucide-react';

export const FunderDashboard: React.FC = () => {
  const [selectedHub, setSelectedHub] = useState(SEEDED_HUBS[0]);

  // Aggregate totals
  const totalEnrolled = SEEDED_HUBS.reduce((acc, h) => acc + h.enrolledLearners, 0);
  const avgWomenPct = Math.round(
    SEEDED_HUBS.reduce((acc, h) => acc + h.womenPercentage, 0) / SEEDED_HUBS.length
  );
  const totalGenMWh = SEEDED_HUBS.reduce((acc, h) => acc + h.totalGenMWh, 0).toFixed(1);
  const totalCO2Avoided = SEEDED_HUBS.reduce((acc, h) => acc + h.co2AvoidedTons, 0).toFixed(1);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="bg-ink-900 rounded-3xl p-6 sm:p-8 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sun-400 bg-sun-500/10 px-3 py-1 rounded-full border border-sun-400/30">
            Reliance Foundation CSR & Sustainability Oversight
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold mt-2 tracking-tight">
            Executive Clean Energy & Livelihood Dashboard
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Rural Jamnagar, Gujarat • ₹9.5 Cr 36-Month Investment • 10 Hub Clusters
          </p>
        </div>

        <button
          onClick={() => alert('Official Reliance CSR Impact Report exported as PDF (Simulated)!')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-solar-600 hover:bg-solar-700 text-white font-bold text-xs shadow-lg transition-all"
        >
          <Download className="w-4 h-4 text-slate-950" />
          <span>Download CSR Report (PDF)</span>
        </button>
      </div>

      {/* 4 Core Headline Outcome KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
            <span>HUBS COMMISSIONED</span>
            <Building className="w-4 h-4 text-solar-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-2">
            7 / 10 <span className="text-xs font-medium text-emerald-600">(Month 14)</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Target: All 10 live by Month 18</div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
            <span>WOMEN PARTICIPATION</span>
            <Users className="w-4 h-4 text-sun-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-2">
            {avgWomenPct}% <span className="text-xs font-medium text-emerald-600">(&gt;50% Goal)</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">{totalEnrolled} total beneficiaries enrolled</div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
            <span>CLEAN ENERGY GENERATED</span>
            <Sun className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-2">
            {totalGenMWh} <span className="text-xs font-normal">MWh</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">250 kW total rooftop capacity</div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold">
            <span>CO₂ EMISSIONS AVOIDED</span>
            <Leaf className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-2">
            {totalCO2Avoided} <span className="text-xs font-normal">Tonnes</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Exact factor: 0.727 kg CO₂/kWh</div>
        </div>
      </div>

      {/* Jamnagar Solar Hubs Map & Selector */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-solar-600" />
              <span>Jamnagar District Solar Hub Cluster Map</span>
            </h2>
            <p className="text-xs text-slate-500">
              Click any cluster pin below to view live generation telemetry and cohort metrics.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              Commissioned (7)
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              Construction (2)
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
              Planned (1)
            </span>
          </div>
        </div>

        {/* Interactive Jamnagar Regional Map SVG */}
        <div className="relative w-full aspect-[21/9] bg-ink-900 rounded-2xl overflow-hidden border border-slate-800 shadow-inner flex items-center justify-center p-4">
          <svg className="w-full h-full" viewBox="0 0 800 360">
            {/* Arabian Sea / Gulf of Kutch Coastline Backdrop */}
            <path
              d="M 50 40 Q 180 80 320 60 T 600 90 T 750 40 L 780 0 L 0 0 Z"
              fill="#0F172A"
              opacity="0.8"
            />
            <text x="180" y="45" fill="#38BDF8" fontSize="12" fontWeight="bold" opacity="0.6">
              Gulf of Kutch
            </text>

            {/* Jamnagar District Outline */}
            <path
              d="M 60 70 Q 250 110 400 90 T 720 120 L 740 320 L 120 340 Z"
              fill="#1E293B"
              stroke="#334155"
              strokeWidth="1.5"
            />
            <text x="360" y="310" fill="#64748B" fontSize="16" fontWeight="extrabold" opacity="0.4">
              JAMNAGAR DISTRICT
            </text>

            {/* Reliance Jamnagar Giga Complex Marker */}
            <rect x="230" y="145" width="85" height="35" rx="5" fill="#1E3A8A" stroke="#60A5FA" strokeWidth="1.5" />
            <text x="238" y="162" fill="#FFFFFF" fontSize="9" fontWeight="bold">RELIANCE GIGA</text>
            <text x="238" y="173" fill="#93C5FD" fontSize="7">COMPLEX HUB</text>

            {/* Render 10 Village Hub Pins */}
            {SEEDED_HUBS.map(hub => {
              // Map approx coordinates to SVG bounds
              const x = 120 + ((hub.lng - 69.9) / 0.6) * 550;
              const y = 80 + ((22.65 - hub.lat) / 0.35) * 220;
              const isSelected = selectedHub.id === hub.id;

              return (
                <g
                  key={hub.id}
                  onClick={() => setSelectedHub(hub)}
                  className="cursor-pointer group"
                >
                  {/* Pin Pulse */}
                  <circle
                    cx={x}
                    cy={y}
                    r={isSelected ? 14 : 9}
                    fill={
                      hub.status === 'commissioned'
                        ? '#10B981'
                        : hub.status === 'under_construction'
                        ? '#F59E0B'
                        : '#94A3B8'
                    }
                    opacity={isSelected ? 0.9 : 0.7}
                    className="transition-all"
                  />
                  {isSelected && (
                    <circle cx={x} cy={y} r="22" fill="none" stroke="#FBBF24" strokeWidth="2" className="animate-ping" />
                  )}
                  {/* Label */}
                  <text
                    x={x + 12}
                    y={y + 4}
                    fill={isSelected ? '#FDE68A' : '#E2E8F0'}
                    fontSize={isSelected ? '11' : '9'}
                    fontWeight={isSelected ? 'bold' : 'normal'}
                  >
                    {hub.cluster}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Selected Hub Telemetry Card */}
        <div className="bg-cream-50 dark:bg-slate-800/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-700">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-700 pb-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-solar-600 bg-solar-50 px-2.5 py-0.5 rounded">
                Telemetry Station
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                {selectedHub.name} ({selectedHub.panchayatOrSchool})
              </h3>
            </div>
            <span
              className={`text-xs font-bold px-3 py-1 rounded-full uppercase ${
                selectedHub.status === 'commissioned'
                  ? 'bg-emerald-100 text-emerald-900'
                  : 'bg-amber-100 text-amber-900'
              }`}
            >
              Status: {selectedHub.status.replace('_', ' ')}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 text-xs">
            <div>
              <span className="text-slate-500">Rooftop Solar Rating:</span>
              <div className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                {selectedHub.solarCapacityKW} kW Peak
              </div>
            </div>

            <div>
              <span className="text-slate-500">Today Generation:</span>
              <div className="text-base font-bold text-amber-600 mt-0.5">
                {selectedHub.todayGenKWh} kWh
              </div>
            </div>

            <div>
              <span className="text-slate-500">Enrolled Beneficiaries:</span>
              <div className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                {selectedHub.enrolledLearners} ({selectedHub.womenPercentage}% Women)
              </div>
            </div>

            <div>
              <span className="text-slate-500">6-Month Placement Rate:</span>
              <div className="text-base font-bold text-emerald-600 mt-0.5">
                {selectedHub.placementRate}% Placed
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

