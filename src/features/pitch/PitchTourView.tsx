import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Star,
  ArrowRight,
  ArrowLeft,
  Sun,
  Award,
  Users,
  Briefcase,
  Zap,
  Building,
  CheckCircle,
  ExternalLink,
} from 'lucide-react';

export const PitchTourView: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const steps = [
    {
      stepNumber: 1,
      title: 'Executive Mission & Proposal Overview',
      tagline: 'Turning clean energy into clean livelihoods, one village hub at a time.',
      proposalStream: 'Urja Kaushal Foundation',
      icon: Sun,
      content: (
        <div className="space-y-4">
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-200">
            Prepared for <strong>Reliance Industries / Reliance Foundation</strong> (Team 5, IPM 2025-30), 
            Urja Kaushal establishes <strong>10 solar-powered training and livelihood village hubs</strong> across rural Jamnagar, Gujarat.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="bg-solar-50 dark:bg-slate-800 p-3 rounded-xl border border-solar-200">
              <div className="text-xl font-bold text-solar-700 dark:text-solar-300">6,000</div>
              <div className="text-xs text-slate-500 font-semibold">Trained Beneficiaries</div>
            </div>
            <div className="bg-sun-50 dark:bg-slate-800 p-3 rounded-xl border border-sun-200">
              <div className="text-xl font-bold text-amber-700 dark:text-sun-400">≥ 50%</div>
              <div className="text-xs text-slate-500 font-semibold">Women & SHG Focus</div>
            </div>
            <div className="bg-emerald-50 dark:bg-slate-800 p-3 rounded-xl border border-emerald-200">
              <div className="text-xl font-bold text-emerald-700 dark:text-emerald-400">70%</div>
              <div className="text-xs text-slate-500 font-semibold">6-Month Earning Goal</div>
            </div>
            <div className="bg-indigo-50 dark:bg-slate-800 p-3 rounded-xl border border-indigo-200">
              <div className="text-xl font-bold text-indigo-700 dark:text-indigo-400">₹9.5 Cr</div>
              <div className="text-xs text-slate-500 font-semibold">Sec 135 CSR Budget</div>
            </div>
          </div>
        </div>
      ),
      jumpRoute: '/',
      jumpLabel: 'Explore Programme Landing',
    },
    {
      stepNumber: 2,
      title: 'Stream A — Build 10 Solar Village Hubs',
      tagline: '25 kW rooftop solar systems per cluster sited in panchayat premises.',
      proposalStream: 'Stream A (Infrastructure)',
      icon: Building,
      content: (
        <div className="space-y-4">
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-200">
            10 hubs across Jamnagar clusters: <em>Moti Khavdi, Makaji Meghpar, Amrapur, Jambuda, Danidhar, Bhuchar Mori, Khijadiya, Keshiya, Vibhapar, Rangpar</em>.
            Generating ~375 MWh/year and providing critical backup power during grid blackouts.
          </p>
          <div className="bg-cream-100 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 text-xs space-y-1.5">
            <div className="font-bold text-solar-800 dark:text-solar-300">Phase Milestones:</div>
            <div>• Month 1–6: Mobilise & Launch 3 Hubs</div>
            <div>• Month 1–18: All 10 Hubs Commissioned (250 kW Total)</div>
            <div>• Month 31–36: Handover to Gram Panchayats for self-sustaining tariff revenue</div>
          </div>
        </div>
      ),
      jumpRoute: '/funder',
      jumpLabel: 'View Jamnagar Hubs Map',
    },
    {
      stepNumber: 3,
      title: 'Stream B — 600-Hour Suryamitra PV Curriculum',
      tagline: 'Flagship NSQF-aligned solar vocational course with tri-modal player.',
      proposalStream: 'Stream B (Training)',
      icon: Award,
      content: (
        <div className="space-y-4">
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-200">
            Recognizing low-bandwidth and variable literacy, every lesson works across <strong>Audio-only, Video, and Interactive Audio-Visual (diagrams & circuits)</strong>.
            Learners can switch modes on-the-fly without losing playback position.
          </p>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="px-3 py-1 bg-solar-100 text-solar-800 rounded-lg font-bold">Audio Podcast (Data Saver)</span>
            <span className="px-3 py-1 bg-sun-100 text-amber-800 rounded-lg font-bold">Adaptive Video (144p - 720p)</span>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-lg font-bold">Interactive Series/Parallel Simulator</span>
          </div>
        </div>
      ),
      jumpRoute: '/learn/course_solar_flagship_600h/les_1_1_ppe_intro',
      jumpLabel: 'Try Tri-Modal Player',
    },
    {
      stepNumber: 4,
      title: 'Stream C — Women-Led Solar Livelihoods',
      tagline: 'Solar food dryers, micro-pumps, and ₹1.2 Cr catalytic margin funding.',
      proposalStream: 'Stream C (Enterprise)',
      icon: Zap,
      content: (
        <div className="space-y-4">
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-200">
            Dedicated enterprise track for Self-Help Groups (SHGs): hygienic solar dehydration of chillies, onions, and cumin to triple farmgate prices.
            Guided access to <strong>35% PMFME subsidies</strong> and Urja Kaushal margin grants.
          </p>
          <div className="p-3 bg-sun-50 dark:bg-slate-800 rounded-xl border border-sun-300 text-xs text-amber-900 dark:text-sun-300 font-medium">
            Targeting 300+ women-led micro-enterprises and ₹6–8K monthly household income uplift.
          </div>
        </div>
      ),
      jumpRoute: '/enterprise',
      jumpLabel: 'Open Women Enterprise Hub',
    },
    {
      stepNumber: 5,
      title: 'Assessment & Verifiable Certification',
      tagline: 'Third-party SCGJ evaluation with fraud-proof QR verification.',
      proposalStream: 'Quality & Integrity',
      icon: CheckCircle,
      content: (
        <div className="space-y-4">
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-200">
            Multi-type exam engine (MCQ, Image Hotspots, Numeric, Ordering, and low-literacy Voice Viva).
            Certificates require ≥600 hours, theory pass, competent practical lab score, and ≥75% attendance.
            Public standalone verification route <code className="bg-slate-100 px-1 py-0.5 rounded text-xs">/verify/:certId</code> works logged-out.
          </p>
          <div className="p-3 bg-emerald-50 dark:bg-slate-800 rounded-xl border border-emerald-300 text-xs text-emerald-900 dark:text-emerald-300">
            Includes clear watermark: <strong>"SAMPLE / PROTOTYPE — NOT AN OFFICIAL CERTIFICATE"</strong>
          </div>
        </div>
      ),
      jumpRoute: '/verify/UK-2026-MK-0842',
      jumpLabel: 'Inspect Sample Certificate',
    },
    {
      stepNumber: 6,
      title: 'Stream D — Job Placement & Earning Linkage',
      tagline: 'Direct pipeline to Reliance vendor ecosystem and Giga Complex.',
      proposalStream: 'Stream D (Placement)',
      icon: Briefcase,
      content: (
        <div className="space-y-4">
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-200">
            Consent-based talent pool connects certified technicians with Reliance Solar EPC partners.
            The digital skills passport logs <strong>1, 3, and 6-month earnings tracer surveys</strong> to prove the 70% outcome KPI.
          </p>
          <div className="flex gap-2 text-xs">
            <span className="p-2 bg-indigo-50 text-indigo-900 rounded-lg font-bold">Reliance Partner Vendor Job Board</span>
            <span className="p-2 bg-emerald-50 text-emerald-900 rounded-lg font-bold">6-Month Tracer Audit</span>
          </div>
        </div>
      ),
      jumpRoute: '/jobs',
      jumpLabel: 'View Vendor Job Board',
    },
    {
      stepNumber: 7,
      title: 'Reliance Foundation Funder Executive View',
      tagline: 'Clean energy generation, CO2 avoided, and transparent CSR MIS.',
      proposalStream: 'Governance & CSR',
      icon: Star,
      content: (
        <div className="space-y-4">
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-200">
            Live telemetry tracking 375,000 kWh/yr clean solar generation and exact <strong>272.6 tonnes CO₂ emissions avoided</strong> (calculated transparently at 0.727 kg CO₂/kWh).
            One-click executive CSR impact PDF export.
          </p>
          <div className="p-3 bg-slate-900 text-sun-300 rounded-xl text-xs font-mono">
            CO2 Formula: Generation (kWh) × 0.727 kg/kWh = Net GHG Offset
          </div>
        </div>
      ),
      jumpRoute: '/funder',
      jumpLabel: 'Open Funder Dashboard',
    },
  ];

  const current = steps[currentStep];
  const Icon = current.icon;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Top Step Progress Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 text-sun-500" />
          <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
            Stakeholder Pitch Tour (Step {currentStep + 1} of {steps.length})
          </span>
        </div>

        <div className="flex items-center gap-1">
          {steps.map((_, idx) => (
            <div
              key={idx}
              onClick={() => setCurrentStep(idx)}
              className={`h-2 rounded-full cursor-pointer transition-all ${
                idx === currentStep ? 'w-8 bg-solar-600' : 'w-2 bg-slate-200 dark:bg-slate-700'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main Pitch Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold text-solar-600 bg-solar-50 px-2.5 py-0.5 rounded">
              {current.proposalStream}
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
              {current.title}
            </h2>
            <p className="text-xs sm:text-sm text-amber-700 dark:text-amber-400 font-medium">
              {current.tagline}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-solar-600 text-white flex-shrink-0">
            <Icon className="w-7 h-7" />
          </div>
        </div>

        <div className="pt-2">{current.content}</div>

        {/* Live Feature Jump Button */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => navigate(current.jumpRoute)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-bold transition-all"
          >
            <span>{current.jumpLabel}</span>
            <ExternalLink className="w-3.5 h-3.5 text-solar-600" />
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
              disabled={currentStep === 0}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none text-slate-700 dark:text-slate-200"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            {currentStep < steps.length - 1 ? (
              <button
                onClick={() => setCurrentStep(prev => prev + 1)}
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-solar-600 hover:bg-solar-700 text-white font-bold text-xs shadow"
              >
                <span>Next Step</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs "
              >
                <span>Complete Tour & Launch</span>
                <CheckCircle className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

