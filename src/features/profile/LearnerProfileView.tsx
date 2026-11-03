import React, { useState, useEffect } from 'react';
import { LearnerProfile, Certificate } from '../../types';
import { db } from '../../lib/db';
import { useAuth } from '../auth/AuthContext';
import { useTranslation } from 'react-i18next';
import {
  Award,
  Clock,
  Briefcase,
  Shield,
  FileText,
  TrendingUp,
  CheckCircle,
  Eye,
  EyeOff,
  Sparkles,
  Lock,
  ChevronRight,
  Share2,
} from 'lucide-react';
import { CertificateView } from '../certificates/CertificateView';

export const LearnerProfileView: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [profile, setProfile] = useState<LearnerProfile | null>(null);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [activeTab, setActiveTab] = useState<'passport' | 'career' | 'outcomes' | 'privacy'>('passport');
  const [showCertificateModal, setShowCertificateModal] = useState<Certificate | null>(null);

  // Outcome survey form state
  const [outcomeStatus, setOutcomeStatus] = useState<'employed' | 'self_employed_enterprise' | 'seeking_work'>('employed');
  const [outcomeIncome, setOutcomeIncome] = useState('16000');
  const [outcomeCompany, setOutcomeCompany] = useState('Saurashtra Solar EPC Services');
  const [outcomeSubmitted, setOutcomeSubmitted] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      // Find profile for logged in user or default to Meera
      let prof = await db.learnerProfiles.where('userId').equals(user?.id || 'user_learner_meera').first();
      if (!prof) {
        prof = await db.learnerProfiles.get('profile_meera');
      }
      setProfile(prof || null);

      const certs = await db.certificates.toArray();
      setCertificates(certs);
    };
    loadProfile();
  }, [user]);

  if (!profile) {
    return <div className="p-8 text-center text-slate-500">Loading digital skill passport...</div>;
  }

  const hoursPercent = Math.min(100, Math.round((profile.completedHours / profile.targetHours) * 100));

  const handleSaveOutcomes = (e: React.FormEvent) => {
    e.preventDefault();
    setOutcomeSubmitted(true);
    setTimeout(() => setOutcomeSubmitted(false), 4000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Profile Card */}
      <div className="bg-ink-900 rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-sun-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
          {/* Avatar with Job-Ready Badge */}
          <div className="relative">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-sun-400 to-amber-500 p-1 shadow-lg flex items-center justify-center text-3xl font-extrabold text-slate-950">
              {profile.name.charAt(0)}
            </div>
            {profile.isJobReady && (
              <span className="absolute -bottom-2 -right-2 bg-emerald-500 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full border-2 border-white shadow flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-slate-950" />
                JOB READY
              </span>
            )}
          </div>

          <div className="flex-1 space-y-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-xl sm:text-2xl font-bold">{profile.name}</h1>
              {profile.shgMember && (
                <span className="text-[10px] font-bold bg-sun-500 text-slate-950 px-2.5 py-0.5 rounded-full shadow-sm">
                  SHG: {profile.shgName || 'Radhe Krishna Mandal'}
                </span>
              )}
            </div>

            <p className="text-xs text-slate-300">
              Cluster: <strong>{profile.clusterId}</strong> • Hub: <strong>{profile.hubId.replace('hub_', '').replace('_', ' ')}</strong>
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2">
              <span className="text-[11px] bg-white/10 px-2.5 py-1 rounded-lg">
                Education: {profile.education.replace('_', ' ').toUpperCase()}
              </span>
              <span className="text-[11px] bg-white/10 px-2.5 py-1 rounded-lg">
                Batch: {profile.preferredTiming.replace('_', ' ')}
              </span>
              <span className="text-[11px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-1 rounded-lg">
                Stipend Eligible: Yes (₹1,500/mo)
              </span>
            </div>
          </div>

          {/* 600 Hours Progress Ring */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex flex-col items-center justify-center text-center min-w-[130px] border border-white/10">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-white/20"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-sun-400 transition-all duration-1000"
                  strokeDasharray={`${hoursPercent}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-xs font-bold text-sun-300">{hoursPercent}%</span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300 mt-1">
              {profile.completedHours} / {profile.targetHours} Hours
            </span>
          </div>
        </div>
      </div>

      {/* Profile Navigation Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-2 overflow-x-auto text-xs font-bold">
        {[
          { id: 'passport', label: 'Digital Skill Passport', icon: Award },
          { id: 'career', label: 'Career & Resume Builder', icon: Briefcase },
          { id: 'outcomes', label: '6-Month Earning Tracker', icon: TrendingUp },
          { id: 'privacy', label: 'Privacy & Device PIN', icon: Shield },
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 py-3 px-4 border-b-2 transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-solar-600 text-solar-700 dark:text-solar-400 font-extrabold'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: SKILL PASSPORT & CERTIFICATES */}
      {activeTab === 'passport' && (
        <div className="space-y-6">
          {/* Earned Badges */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Earned Competency Badges
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {profile.badges.map(b => (
                <span
                  key={b}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sun-50 dark:bg-slate-800 text-amber-900 dark:text-sun-300 border border-sun-200 dark:border-slate-700 text-xs font-bold"
                >
                  <Sparkles className="w-3.5 h-3.5 text-sun-500" />
                  <span>{b}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Verifiable Certificates List */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Verifiable Skill Certificates
            </h3>
            <div className="space-y-3">
              {certificates.map(cert => (
                <div
                  key={cert.id}
                  className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-solar-500 transition-all bg-cream-50/50 dark:bg-slate-800/40"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-solar-600 text-white">
                      <Award className="w-5 h-5 text-sun-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {cert.courseName.en}
                      </h4>
                      <p className="text-xs text-slate-500">
                        Certificate ID: <span className="font-mono text-solar-600">{cert.id}</span> • Grade: {cert.grade}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowCertificateModal(cert)}
                      className="px-3 py-1.5 rounded-lg bg-solar-600 hover:bg-solar-700 text-white text-xs font-bold shadow transition-all"
                    >
                      View & Print
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Matrix */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Assessed Solar Competencies
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {[
                { name: 'DC String Cabling & MC4 Crimping', level: 'Proficient (95%)', color: 'bg-emerald-500' },
                { name: 'Rooftop Structure Clamping & PPE Safety', level: 'Proficient (92%)', color: 'bg-emerald-500' },
                { name: 'Inverter Diagnostics & Anti-Islanding', level: 'Intermediate (88%)', color: 'bg-blue-500' },
                { name: 'Solar Food Dehydration Operation', level: 'Master (96%)', color: 'bg-emerald-500' },
              ].map(skill => (
                <div key={skill.name} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                  <div className="flex justify-between font-semibold mb-1">
                    <span>{skill.name}</span>
                    <span className="text-slate-500">{skill.level}</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                    <div className={`h-full ${skill.color} rounded-full`} style={{ width: '90%' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CAREER PREFERENCES & RESUME BUILDER */}
      {activeTab === 'career' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Work & Livelihood Preferences
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-slate-500 block mb-1">Target Cluster Location</label>
                <input
                  type="text"
                  defaultValue="Moti Khavdi & Jamnagar Perimeter"
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent font-medium"
                />
              </div>

              <div>
                <label className="text-slate-500 block mb-1">Expected Monthly Income Band</label>
                <input
                  type="text"
                  defaultValue="₹14,000 - ₹18,000 / month"
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent font-medium"
                />
              </div>

              <div>
                <label className="text-slate-500 block mb-1">Preferred Work Type</label>
                <select className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent font-medium">
                  <option>Full-time Solar Technician</option>
                  <option>Paid Apprenticeship (Reliance Partner)</option>
                  <option>SHG Solar Micro-Enterprise Owner</option>
                </select>
              </div>

              <div>
                <label className="text-slate-500 block mb-1">Travel Availability</label>
                <select className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent font-medium">
                  <option>Within Jamnagar District (Preferred)</option>
                  <option>Anywhere in Gujarat</option>
                  <option>Village Hub Only</option>
                </select>
              </div>
            </div>

            <button
              onClick={() => alert('Bilingual resume exported as PDF (Simulated)!')}
              className="mt-4 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-solar-600 hover:bg-solar-700 text-white font-bold text-xs shadow transition-all"
            >
              <FileText className="w-4 h-4" />
              <span>Download Bilingual Resume PDF</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: 6-MONTH EARNINGS TRACKER (STREAM D OUTCOME KPI) */}
      {activeTab === 'outcomes' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 space-y-5">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              6-Month Livelihood & Income Tracer Survey
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Required by Programme M&E to verify the <strong>70% earning target</strong> and ₹6–8K household uplift.
            </p>
          </div>

          <form onSubmit={handleSaveOutcomes} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Current Employment / Earning Status:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { id: 'employed', label: 'Employed (Solar Technician)' },
                  { id: 'self_employed_enterprise', label: 'Self-Employed (SHG Solar Enterprise)' },
                  { id: 'seeking_work', label: 'Seeking Placement Support' },
                ].map(item => (
                  <label
                    key={item.id}
                    className={`p-3 rounded-xl border-2 flex items-center gap-2 cursor-pointer transition-all ${
                      outcomeStatus === item.id
                        ? 'border-solar-600 bg-solar-50 text-solar-900 font-bold'
                        : 'border-slate-200 dark:border-slate-800 text-slate-600'
                    }`}
                  >
                    <input
                      type="radio"
                      name="outcomeStatus"
                      checked={outcomeStatus === item.id}
                      onChange={() => setOutcomeStatus(item.id as any)}
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Employer / Solar Enterprise Name:
                </label>
                <input
                  type="text"
                  value={outcomeCompany}
                  onChange={e => setOutcomeCompany(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Current Monthly Income (INR):
                </label>
                <input
                  type="number"
                  value={outcomeIncome}
                  onChange={e => setOutcomeIncome(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent font-bold font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md transition-all"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Submit 6-Month Tracer Update</span>
            </button>

            {outcomeSubmitted && (
              <div className="p-3 bg-emerald-50 text-emerald-900 border border-emerald-300 rounded-xl text-xs font-semibold flex items-center gap-2 animate-bounce">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Tracer record recorded! Programme KPI updated to 74% placed.</span>
              </div>
            )}
          </form>
        </div>
      )}

      {/* TAB 4: PRIVACY & SHARED DEVICE PIN */}
      {activeTab === 'privacy' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 space-y-6 text-xs">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Privacy & Consent Controls (Private by Default)
            </h3>
            <p className="text-slate-500 mt-1">
              Respecting women learners: phone numbers and addresses are hidden by default.
            </p>
          </div>

          <div className="space-y-3">
            {[
              { label: 'Allow verified Reliance vendor employers to view my certified skill profile', defaultChecked: true },
              { label: 'Share masked phone number with employers only after shortlisting', defaultChecked: true },
              { label: 'Display my name on cluster team leaderboards (anonymized if off)', defaultChecked: false },
              { label: 'Contribute anonymized learning data to Reliance Foundation CSR report', defaultChecked: true },
            ].map((toggle, i) => (
              <label key={i} className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800 cursor-pointer hover:bg-slate-50">
                <span className="font-medium text-slate-700 dark:text-slate-300 max-w-md">{toggle.label}</span>
                <input type="checkbox" defaultChecked={toggle.defaultChecked} className="w-4 h-4 accent-solar-600 rounded cursor-pointer" />
              </label>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 mb-2">
              <Lock className="w-4 h-4 text-amber-600" />
              <span>Shared Village Device PIN Protection</span>
            </h4>
            <p className="text-slate-500 mb-3">
              Set a 4-digit security PIN so family members sharing this phone cannot alter your tests or certificates.
            </p>
            <div className="flex items-center gap-2">
              <input
                type="password"
                maxLength={4}
                defaultValue="1234"
                className="w-24 p-2 text-center text-lg font-mono tracking-widest rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent font-bold"
              />
              <button
                onClick={() => alert('PIN updated successfully!')}
                className="px-4 py-2 rounded-xl bg-slate-800 text-white font-bold hover:bg-slate-900"
              >
                Update PIN
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Certificate Modal */}
      {showCertificateModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setShowCertificateModal(null)}
              className="absolute top-4 right-4 bg-slate-200 dark:bg-slate-800 p-2 rounded-full font-bold text-xs"
            >
              ✕ Close
            </button>
            <CertificateView certificate={showCertificateModal} />
          </div>
        </div>
      )}
    </div>
  );
};

