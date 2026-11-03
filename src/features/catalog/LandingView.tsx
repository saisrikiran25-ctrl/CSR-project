import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ArrowRight,
  Award,
  BadgeCheck,
  Briefcase,
  BookOpen,
  Building2,
  Compass,
  PlayCircle,
  Sparkles,
  Sun,
  Volume2,
  Zap,
} from 'lucide-react';
import { SEEDED_HUBS } from '../../mocks/seedData';
import { speechService } from '../../lib/speech';

const STATS = [
  { value: '6,000', label: 'Learners targeted', note: '50%+ women and SHG members' },
  { value: '600 h', label: 'Suryamitra training', note: 'NSQF-aligned solar technician track' },
  { value: '70%', label: 'Earning outcome', note: '₹6,000–8,000 / month uplift at 6 months' },
  { value: '375 MWh', label: 'Clean energy per year', note: '~272.6 t CO₂ avoided annually' },
];

const STEPS = [
  {
    icon: BookOpen,
    title: 'Learn',
    text: 'Short audio, video and interactive lessons that work on any phone, even with weak connectivity.',
    to: '/learn',
    cta: 'Browse courses',
  },
  {
    icon: Award,
    title: 'Get certified',
    text: 'Take assessments and earn QR-verifiable certificates, backed by external SCGJ assessors.',
    to: '/tests',
    cta: 'View assessments',
  },
  {
    icon: Briefcase,
    title: 'Get hired',
    text: 'Move straight into Reliance vendor openings and apprenticeships near your village.',
    to: '/jobs',
    cta: 'See openings',
  },
  {
    icon: Zap,
    title: 'Start an enterprise',
    text: 'Women SHGs get solar dryer playbooks, subsidy guidance and a profit calculator.',
    to: '/enterprise',
    cta: 'Open calculator',
  },
];

const STREAMS = [
  { id: 'A', title: 'Build village hubs', text: '10 solar training labs with 25 kW rooftop arrays.', to: '/funder', tone: 'bg-solar-50 text-solar-700' },
  { id: 'B', title: 'Train (Suryamitra 600h)', text: 'Tri-modal player, bridge courses and external assessment.', to: '/learn', tone: 'bg-amber-50 text-amber-700' },
  { id: 'C', title: 'Women-led livelihoods', text: 'Solar food dehydrators, ₹1.2 Cr margin money, PMFME subsidies.', to: '/enterprise', tone: 'bg-rose-50 text-rose-700' },
  { id: 'D', title: 'Place and track outcomes', text: 'Vendor pipeline and 6-month earnings tracer surveys.', to: '/jobs', tone: 'bg-emerald-50 text-emerald-700' },
];

export const LandingView: React.FC = () => {
  const { t } = useTranslation();

  const readMission = () => {
    speechService.speak(
      'Urja Kaushal turns clean energy into clean livelihoods, one village hub at a time. Supported by Reliance Foundation CSR for rural Jamnagar, Gujarat.'
    );
  };

  return (
    <div className="space-y-14">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl bg-ink-900 text-white">
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              'radial-gradient(60% 80% at 100% 0%, rgba(10,102,194,0.55) 0%, rgba(10,102,194,0) 60%), radial-gradient(40% 50% at 0% 100%, rgba(245,158,11,0.18) 0%, rgba(245,158,11,0) 70%)',
          }}
        />
        <div className="relative grid lg:grid-cols-5 gap-10 p-8 sm:p-12 lg:p-14 items-center">
          <div className="lg:col-span-3 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-medium text-slate-200">
              <Sun className="w-3.5 h-3.5 text-sun-400" />
              Reliance Foundation CSR · Jamnagar, Gujarat
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold leading-[1.1]">
              Skills that power
              <br />
              <span className="text-sun-400">real livelihoods.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
              Job-ready solar training, verifiable certificates and direct placement for youth and
              women across 10 village hubs in rural Jamnagar.
            </p>
            <p className="text-sm text-sun-300 font-medium -mt-3">{t('brand.tagline')}</p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                to="/learn/course_solar_flagship_600h/les_1_1_ppe_intro"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-solar-500 hover:bg-solar-400 text-white font-semibold text-sm transition-colors"
              >
                <PlayCircle className="w-4 h-4" />
                Start learning free
              </Link>
              <Link
                to="/learn"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/30 hover:bg-white/10 text-white font-semibold text-sm transition-colors"
              >
                Explore courses
              </Link>
              <button
                onClick={readMission}
                className="p-3 rounded-full border border-white/20 text-slate-200 hover:bg-white/10 transition-colors"
                aria-label="Listen to mission readout"
                title="Listen to mission readout"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <Link
              to="/pitch"
              className="inline-flex items-center gap-1.5 text-sm text-slate-300 hover:text-white transition-colors"
            >
              <Sparkles className="w-4 h-4 text-sun-400" />
              Stakeholder? Take the guided pitch tour
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Featured course card */}
          <div className="lg:col-span-2">
            <div className="bg-white text-slate-900 rounded-xl p-5 shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-solar-700 bg-solar-50 px-2 py-1 rounded">
                  Flagship course
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700">
                  <BadgeCheck className="w-3.5 h-3.5" /> NSQF aligned
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold leading-snug">Solar PV Technician (Suryamitra)</h3>
                <p className="text-sm text-slate-500 mt-1">
                  From PPE basics to grid-tied installation, in audio, video and interactive form.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                {[
                  ['600 h', 'Duration'],
                  ['3 modes', 'Audio · Video · AV'],
                  ['QR', 'Certificate'],
                ].map(([v, l]) => (
                  <div key={l} className="rounded-lg bg-slate-50 py-2.5">
                    <div className="text-sm font-bold">{v}</div>
                    <div className="text-[10px] text-slate-500">{l}</div>
                  </div>
                ))}
              </div>
              <Link
                to="/learn/course_solar_flagship_600h"
                className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-full bg-solar-600 hover:bg-solar-700 text-white text-sm font-semibold transition-colors"
              >
                View syllabus <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 lg:grid-cols-4 bg-white rounded-xl border border-slate-200 divide-x divide-y lg:divide-y-0 divide-slate-200 overflow-hidden">
        {STATS.map(s => (
          <div key={s.label} className="p-6">
            <div className="text-3xl font-extrabold text-solar-700">{s.value}</div>
            <div className="text-sm font-semibold text-slate-900 mt-1">{s.label}</div>
            <div className="text-xs text-slate-500 mt-0.5">{s.note}</div>
          </div>
        ))}
      </section>

      {/* Journey */}
      <section className="space-y-6">
        <div className="max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">From first lesson to first paycheck</h2>
          <p className="text-slate-600 mt-2">
            One platform covers the whole path: learn, prove your skills, get placed or start your own enterprise.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STEPS.map((step, i) => (
            <Link
              key={step.title}
              to={step.to}
              className="group bg-white rounded-xl border border-slate-200 p-5 hover:border-solar-300 hover:shadow-md transition-all flex flex-col"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-lg bg-solar-50 text-solar-600 flex items-center justify-center">
                  <step.icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-slate-300">0{i + 1}</span>
              </div>
              <h3 className="font-bold text-slate-900 mt-4">{step.title}</h3>
              <p className="text-sm text-slate-600 mt-1.5 leading-relaxed flex-1">{step.text}</p>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-solar-600 mt-4 group-hover:gap-2 transition-all">
                {step.cta} <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Programme streams */}
      <section className="space-y-6">
        <div className="max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Four programme streams</h2>
          <p className="text-slate-600 mt-2">Each proposal pillar maps to learning and livelihood delivery.</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {STREAMS.map(s => (
            <Link
              key={s.id}
              to={s.to}
              className="group bg-white rounded-xl border border-slate-200 p-5 flex items-start gap-4 hover:border-solar-300 hover:shadow-md transition-all"
            >
              <div className={`w-11 h-11 rounded-lg flex items-center justify-center font-extrabold flex-shrink-0 ${s.tone}`}>
                {s.id}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-900">{s.title}</h3>
                <p className="text-sm text-slate-600 mt-1">{s.text}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-solar-600 mt-1 transition-colors" />
            </Link>
          ))}
        </div>
      </section>

      {/* Hubs */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-solar-600" /> 10 solar village hubs
            </h2>
            <p className="text-sm text-slate-500 mt-1">Target: 600 trained beneficiaries per cluster across Jamnagar.</p>
          </div>
          <Link to="/funder" className="inline-flex items-center gap-1 text-sm font-semibold text-solar-600 hover:underline">
            <Compass className="w-4 h-4" /> View live solar map
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {SEEDED_HUBS.map(hub => (
            <div key={hub.id} className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/60">
              <div className="font-semibold text-sm text-slate-900">{hub.cluster}</div>
              <div className="text-xs text-slate-500 mt-0.5">{hub.solarCapacityKW} kW rooftop</div>
              <span
                className={`inline-flex items-center gap-1 mt-2 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                  hub.status === 'commissioned' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    hub.status === 'commissioned' ? 'bg-emerald-500' : 'bg-amber-500'
                  }`}
                />
                {hub.status.replace('_', ' ')}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
