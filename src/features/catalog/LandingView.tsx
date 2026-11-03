import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Volume2 } from 'lucide-react';
import { SEEDED_HUBS } from '../../mocks/seedData';
import { speechService } from '../../lib/speech';

const PATHS = [
  {
    to: '/learn',
    title: 'Learn the trade',
    text: 'Short audio, video and hands-on lessons that run on any phone, even on a weak signal.',
  },
  {
    to: '/tests',
    title: 'Prove it with a certificate',
    text: 'Assessments marked by external SCGJ assessors. Every certificate carries a QR code an employer can check.',
  },
  {
    to: '/jobs',
    title: 'Get placed nearby',
    text: 'Openings with Reliance vendors and EPC contractors around the Jamnagar perimeter.',
  },
  {
    to: '/enterprise',
    title: 'Start an enterprise',
    text: 'Solar dryer playbooks, subsidy checklists and a profit calculator for women’s self-help groups.',
  },
];

export const LandingView: React.FC = () => {
  const readMission = () => {
    speechService.speak(
      'Urja Kaushal turns clean energy into clean livelihoods, one village hub at a time. Supported by Reliance Foundation CSR for rural Jamnagar, Gujarat.'
    );
  };

  return (
    <div className="space-y-20">
      {/* Hero */}
      <section className="grid lg:grid-cols-2 rounded-xl overflow-hidden bg-ink-900 text-white">
        <div className="p-8 sm:p-12 lg:p-14 flex flex-col justify-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-[1.08]">
            Solar skills for the villages of Jamnagar
          </h1>
          <p className="text-lg text-slate-300 mt-5 max-w-md leading-relaxed">
            Free technician training, certificates employers can verify, and jobs close to home.
            Run from ten village hubs with Reliance Foundation.
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-8">
            <Link
              to="/learn/course_solar_flagship_600h"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-sun-400 hover:bg-sun-300 text-slate-900 font-semibold text-sm transition-colors"
            >
              See the 600-hour technician course
            </Link>
            <Link to="/learn" className="inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:underline">
              All courses <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={readMission}
              className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white"
              aria-label="Listen to the mission statement"
            >
              <Volume2 className="w-4 h-4" /> Listen
            </button>
          </div>
        </div>
        <figure className="relative min-h-[280px] lg:min-h-[460px] bg-slate-800">
          <img
            src="/images/technician.jpg"
            alt="Technician fixing a rooftop solar panel in the sun"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </figure>
      </section>

      {/* Numbers */}
      <section className="bg-solar-700 text-white rounded-xl grid grid-cols-2 lg:grid-cols-4">
        {[
          ['6,000', 'learners across 10 hubs, at least half of them women'],
          ['600 hours', 'Suryamitra solar technician training at NSQF level 4'],
          ['70%', 'earning within six months, ₹6,000–8,000 a month'],
          ['375 MWh', 'clean power a year from the hub rooftops, about 273 t of CO₂ avoided'],
        ].map(([n, l]) => (
          <div key={n} className="p-7 lg:p-8">
            <div className="text-3xl sm:text-4xl font-extrabold">{n}</div>
            <p className="text-sm text-solar-100 mt-2 leading-snug max-w-[16rem]">{l}</p>
          </div>
        ))}
      </section>

      {/* Pathways */}
      <section className="grid lg:grid-cols-5 gap-10 items-start">
        <div className="lg:col-span-2 lg:sticky lg:top-24">
          <h2 className="text-3xl font-bold text-slate-900 leading-tight">One place from first lesson to first job</h2>
          <p className="text-slate-600 mt-3 leading-relaxed">
            Most learners start with the flagship course and finish with a certificate and a job interview.
            Women’s groups can go straight to enterprise support.
          </p>
          <img
            src="/images/solar-field.jpg"
            alt="Rows of solar panels under a wide blue sky"
            className="mt-6 rounded-lg w-full aspect-[4/3] object-cover"
            loading="lazy"
          />
        </div>

        <div className="lg:col-span-3 divide-y divide-slate-200 border-y border-slate-200">
          {PATHS.map(p => (
            <Link key={p.to} to={p.to} className="group flex items-start justify-between gap-6 py-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-solar-700 transition-colors">
                  {p.title}
                </h3>
                <p className="text-slate-600 mt-1.5 leading-relaxed max-w-lg">{p.text}</p>
              </div>
              <ArrowRight className="w-5 h-5 mt-1.5 text-slate-400 group-hover:text-solar-700 group-hover:translate-x-1 transition-all flex-shrink-0" />
            </Link>
          ))}
        </div>
      </section>

      {/* Women's enterprise */}
      <section className="grid lg:grid-cols-2 rounded-xl overflow-hidden bg-sun-100">
        <img
          src="/images/women.jpg"
          alt="Four women from a village self-help group standing together on a rural road"
          className="w-full h-full min-h-[280px] object-cover"
          loading="lazy"
        />
        <div className="p-8 sm:p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-slate-900 leading-tight">Solar dryers for women’s self-help groups</h2>
          <p className="text-slate-700 mt-4 leading-relaxed max-w-md">
            A group that dries chillies and onions on a solar dehydrator can sell cleaner, longer-lasting
            produce at a better price. The programme brings ₹1.2 crore in margin money and helps groups
            claim the 35% PMFME subsidy.
          </p>
          <Link
            to="/enterprise"
            className="inline-flex items-center gap-2 mt-6 self-start px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-colors"
          >
            Try the profit calculator
          </Link>
        </div>
      </section>

      {/* Hubs */}
      <section className="space-y-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Ten village hubs</h2>
            <p className="text-slate-600 mt-2">Each hub trains about 600 people from its cluster of villages.</p>
          </div>
          <Link to="/funder" className="inline-flex items-center gap-1.5 text-sm font-semibold text-solar-700 hover:underline">
            Open the live solar map <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3 font-semibold">Cluster</th>
                <th className="px-4 py-3 font-semibold">Rooftop solar</th>
                <th className="px-4 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {SEEDED_HUBS.map(hub => (
                <tr key={hub.id}>
                  <td className="px-4 py-3 font-medium text-slate-900">{hub.cluster}</td>
                  <td className="px-4 py-3 text-slate-700">{hub.solarCapacityKW} kW</td>
                  <td className="px-4 py-3">
                    <span
                      className={`font-medium ${
                        hub.status === 'commissioned' ? 'text-emerald-700' : 'text-amber-700'
                      }`}
                    >
                      {hub.status.replace('_', ' ')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <p className="text-xs text-slate-500">Photographs from Unsplash.</p>
    </div>
  );
};
