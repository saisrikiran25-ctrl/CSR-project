import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Sun,
  Award,
  Users,
  Briefcase,
  Zap,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Building,
  Volume2,
} from 'lucide-react';
import { SEEDED_HUBS } from '../../mocks/seedData';
import { speechService } from '../../lib/speech';

export const LandingView: React.FC = () => {
  const { t, i18n } = useTranslation();
  const lang = (i18n.language || 'gu') as 'gu' | 'hi' | 'en';

  const readMission = () => {
    speechService.speak(
      'Urja Kaushal turns clean energy into clean livelihoods, one village hub at a time. Supported by Reliance Foundation CSR for rural Jamnagar, Gujarat.'
    );
  };

  return (
    <div className="space-y-12 max-w-6xl mx-auto py-4 sm:py-6">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-solar-900 via-solar-800 to-slate-900 rounded-3xl p-6 sm:p-12 text-white shadow-2xl overflow-hidden">
        {/* Background sun ray glow */}
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-sun-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sun-400/20 border border-sun-400/30 text-sun-300 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-sun-400" />
            <span>Reliance Foundation CSR & Sustainability Proposal Prototype</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Urja Kaushal <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sun-300 via-sun-400 to-amber-200">
              ઊર્જા કૌશલ્ય
            </span>
          </h1>

          <p className="text-base sm:text-xl font-medium text-slate-200 leading-relaxed">
            "{t('brand.tagline')}"
          </p>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
            Solar-powered skill and livelihood village hubs across 10 rural Jamnagar clusters. 
            Providing 6,000 youth and women with Suryamitra 600-hour solar training, SHG food dryers, 
            verifiable certification, and direct Reliance vendor employment.
          </p>

          {/* Quick Action CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              to="/learn/course_solar_flagship_600h/les_1_1_ppe_intro"
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-sun-500 hover:bg-sun-600 text-slate-950 font-extrabold text-sm shadow-xl transition-all active:scale-95"
            >
              <span>Start Learning in 5 Taps →</span>
            </Link>

            <Link
              to="/pitch"
              className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 backdrop-blur-md transition-all active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-sun-300" />
              <span>Guided Pitch Tour (Stakeholders)</span>
            </Link>

            <button
              onClick={readMission}
              className="p-3.5 rounded-2xl bg-white/10 text-sun-300 hover:bg-white/20 border border-white/20"
              aria-label="Listen to mission readout"
              title="Listen to mission readout"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* 4 Core Quantitative Proposal Targets */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="text-3xl sm:text-4xl font-black text-solar-700 dark:text-solar-300">10 Hubs</div>
          <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mt-1">25 kW Rooftop PV per Hub</p>
          <span className="text-[11px] text-slate-600 dark:text-slate-300">Panchayat & school premises</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="text-3xl sm:text-4xl font-black text-amber-600">6,000</div>
          <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mt-1">Direct Beneficiaries</p>
          <span className="text-[11px] text-slate-600 dark:text-slate-300">≥ 50% Women & SHGs (3,000)</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="text-3xl sm:text-4xl font-black text-emerald-600">70%</div>
          <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mt-1">6-Month Earning Outcome</p>
          <span className="text-[11px] text-slate-600 dark:text-slate-300">₹6,000–8,000/mo income uplift</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="text-3xl sm:text-4xl font-black text-indigo-600">375 MWh</div>
          <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mt-1">Annual Clean Solar Energy</p>
          <span className="text-[11px] text-slate-600 dark:text-slate-300">~272.6 t CO₂ avoided (0.727 kg/kWh)</span>
        </div>
      </section>

      {/* The 4 Programme Streams */}
      <section className="space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-solar-600 bg-solar-50 px-2.5 py-0.5 rounded">
            Integrated Livelihood Architecture
          </span>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            The Four Programme Streams
          </h2>
          <p className="text-xs text-slate-500">
            Mapping each proposal pillar to digital learning and livelihood execution.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Stream A */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-solar-100 dark:bg-solar-900/60 text-solar-600 flex items-center justify-center font-bold text-lg">
              A
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Stream A — Build Village Hubs
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              10 solar training labs with PV toolkits, grid-tied 25 kW rooftop arrays, and emergency power resilience for panchayat operations.
            </p>
            <Link to="/funder" className="inline-flex items-center gap-1 text-xs font-bold text-solar-600 hover:underline">
              <span>View 10 Jamnagar Hubs Telemetry</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Stream B */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-sun-100 dark:bg-sun-900/60 text-amber-700 flex items-center justify-center font-bold text-lg">
              B
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Stream B — Train (Suryamitra 600h)
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Job-ready certified solar technicians. Tri-modal player (Audio, Video, Interactive circuits), electrical bridge courses, and external SCGJ assessments.
            </p>
            <Link to="/learn" className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 hover:underline">
              <span>Explore Course Modules</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Stream C */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-900/60 text-rose-700 flex items-center justify-center font-bold text-lg">
              C
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Stream C — Women-Led Solar Livelihoods
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Empowering SHGs with solar food dehydrators and micro-pumps. Catalytic ₹1.2 Cr margin money, 35% PMFME subsidies, and spice market linkages.
            </p>
            <Link to="/enterprise" className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 hover:underline">
              <span>Open SHG Profit Calculator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Stream D */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 flex items-center justify-center font-bold text-lg">
              D
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Stream D — Place & Track Outcomes
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Direct pipeline to Reliance vendor network, apprenticeships, and 6-month earnings tracer surveys verifying the 70% income uplift target.
            </p>
            <Link to="/jobs" className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:underline">
              <span>Browse Reliance Vendor Openings</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Jamnagar Cluster Directory */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              10 Solar Village Hub Clusters
            </h3>
            <p className="text-xs text-slate-500">
              Target: 600 trained beneficiaries per cluster (6,000 total across Jamnagar).
            </p>
          </div>
          <Link to="/funder" className="text-xs font-bold text-solar-600 hover:underline">
            View Live Solar Map →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
          {SEEDED_HUBS.map(hub => (
            <div
              key={hub.id}
              className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-cream-50/50 dark:bg-slate-800/40"
            >
              <div className="font-bold text-slate-900 dark:text-white">{hub.cluster}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">{hub.solarCapacityKW} kW Rooftop</div>
              <span
                className={`inline-block mt-1 text-[9px] font-bold px-1.5 py-0.5 rounded ${
                  hub.status === 'commissioned'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {hub.status.replace('_', ' ')}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

