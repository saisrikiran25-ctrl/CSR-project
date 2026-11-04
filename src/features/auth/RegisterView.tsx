import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useTranslation } from 'react-i18next';
import { SEEDED_HUBS } from '../../mocks/seedData';
import {
  UserCheck,
  CheckCircle,
  Phone,
  Star,
  Shield,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
} from 'lucide-react';

export const RegisterView: React.FC = () => {
  const { registerLearner, requestOtp } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('+91 98765 ');
  const [otp, setOtp] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);

  const [name, setName] = useState('');
  const [gender, setGender] = useState<'female' | 'male' | 'other' | 'prefer_not_to_say'>('female');
  const [dob, setDob] = useState('2002-05-14');
  const [education, setEducation] = useState('10th_pass');
  const [cluster, setCluster] = useState(SEEDED_HUBS[0].cluster);
  const [timing, setTiming] = useState<'morning' | 'afternoon' | 'evening' | 'women_only'>('women_only');
  const [shgMember, setShgMember] = useState(true);
  const [shgName, setShgName] = useState('Radhe Krishna Mandal');
  const [consentData, setConsentData] = useState(true);
  const [consentJobs, setConsentJobs] = useState(true);

  // Soft age check
  const birthYear = new Date(dob).getFullYear();
  const currentYear = 2026;
  const approxAge = currentYear - birthYear;
  const isOutsideCoreAge = approxAge < 18 || approxAge > 35;

  const handleSendOtp = async () => {
    await requestOtp(phone);
  };

  const handleCompleteRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    const matchedHub = SEEDED_HUBS.find(h => h.cluster === cluster) || SEEDED_HUBS[0];
    await registerLearner({
      name,
      phone,
      gender,
      dob,
      education,
      cluster,
      hubId: matchedHub.id,
      timing,
      shgMember,
      shgName: shgMember ? shgName : undefined,
      consentJobSharing: consentJobs,
    });
    navigate('/readiness');
  };

  return (
    <div className="max-w-2xl mx-auto py-6 space-y-6">
      {/* Progress Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-solar-600 bg-solar-50 px-2.5 py-0.5 rounded">
            {t('register.step', { step })}
          </span>
          <h2 className="text-base font-bold text-slate-900 dark:text-white mt-1">
            {step === 1 && t('register.mobile')}
            {step === 2 && t('register.details')}
            {step === 3 && t('register.consent')}
          </h2>
        </div>

        <div className="flex gap-1.5">
          {[1, 2, 3].map(s => (
            <div
              key={s}
              className={`w-7 h-2 rounded-full ${
                s <= step ? 'bg-solar-600' : 'bg-slate-200 dark:bg-slate-700'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800">
        {/* STEP 1: MOBILE OTP */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                {t('register.mobile_number')}
              </label>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full text-base font-semibold p-3.5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-transparent focus:border-solar-600 outline-none"
              />
            </div>

            <button
              type="button"
              onClick={handleSendOtp}
              className="w-full py-3 rounded-2xl bg-solar-600 hover:bg-solar-700 text-white font-bold text-xs shadow transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>{t('register.get_otp')}</span>
            </button>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                {t('register.otp_received')}
              </label>
              <input
                type="text"
                maxLength={6}
                value={otp}
                onChange={e => setOtp(e.target.value)}
                placeholder="123456"
                className="w-full text-center text-xl font-bold font-mono p-3 rounded-2xl border-2 border-sun-400 bg-amber-50/40 dark:bg-slate-800"
              />
            </div>

            <button
              type="button"
              onClick={() => {
                if (otp === '123456' || otp.length === 6) {
                  setOtpVerified(true);
                  setStep(2);
                } else {
                  alert('Please enter 123456 in demo mode');
                }
              }}
              className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all"
            >
              {t('register.verify')}
            </button>
          </div>
        )}

        {/* STEP 2: PROFILE DETAILS */}
        {step === 2 && (
          <div className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                {t('register.full_name')}
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Geeta Ben Solanki"
                className="w-full p-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-transparent text-sm font-semibold"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  {t('register.gender')}
                </label>
                <select
                  value={gender}
                  onChange={e => setGender(e.target.value as any)}
                  className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent font-medium"
                >
                  <option value="female">{t('register.female')}</option>
                  <option value="male">{t('register.male')}</option>
                  <option value="other">{t('register.other')}</option>
                  <option value="prefer_not_to_say">{t('register.prefer_not')}</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  {t('register.dob')}
                </label>
                <input
                  type="date"
                  value={dob}
                  onChange={e => setDob(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent font-medium"
                />
              </div>
            </div>

            {isOutsideCoreAge && (
              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>
                  {t('register.age_note')}
                </span>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  {t('register.education')}
                </label>
                <select
                  value={education}
                  onChange={e => setEducation(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent font-medium"
                >
                  <option value="10th_pass">10th Pass (એસએસસી)</option>
                  <option value="12th_pass">12th Pass</option>
                  <option value="iti">ITI Electrical / Wireman</option>
                  <option value="diploma">Polytechnic Diploma</option>
                  <option value="other">School Dropout / Other</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  {t('register.cluster')}
                </label>
                <select
                  value={cluster}
                  onChange={e => setCluster(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent font-medium font-bold text-solar-700"
                >
                  {SEEDED_HUBS.map(h => (
                    <option key={h.id} value={h.cluster}>
                      {h.cluster} ({h.name})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2 rounded-xl bg-slate-100 font-semibold"
              >
                {t('register.back')}
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!name) alert('Please enter your name');
                  else setStep(3);
                }}
                className="px-6 py-2.5 rounded-xl bg-solar-600 text-white font-bold shadow"
              >
                {t('register.next')}
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: TIMING, SHG & CONSENT */}
        {step === 3 && (
          <form onSubmit={handleCompleteRegistration} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                {t('register.timing')}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'women_only', label: t('register.women_batch') },
                  { id: 'morning', label: t('register.morning') },
                  { id: 'afternoon', label: t('register.afternoon') },
                  { id: 'evening', label: t('register.evening') },
                ].map(t => (
                  <label
                    key={t.id}
                    className={`p-3 rounded-xl border-2 flex items-center gap-2 cursor-pointer transition-all ${
                      timing === t.id
                        ? 'border-solar-600 bg-solar-50 text-solar-900 font-bold'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    <input
                      type="radio"
                      name="batchTiming"
                      checked={timing === t.id}
                      onChange={() => setTiming(t.id as any)}
                    />
                    <span>{t.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="p-3 bg-sun-50 rounded-xl border border-sun-200 space-y-2">
              <label className="flex items-center gap-2 cursor-pointer font-bold text-amber-900">
                <input
                  type="checkbox"
                  checked={shgMember}
                  onChange={e => setShgMember(e.target.checked)}
                  className="w-4 h-4 accent-solar-600 rounded"
                />
                <span>{t('register.shg')}</span>
              </label>
              {shgMember && (
                <input
                  type="text"
                  value={shgName}
                  onChange={e => setShgName(e.target.value)}
                  placeholder={t('register.shg_name')}
                  className="w-full p-2 rounded-lg border border-sun-300 bg-white"
                />
              )}
            </div>

            <div className="space-y-2 pt-2">
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consentData}
                  onChange={e => setConsentData(e.target.checked)}
                  className="mt-0.5 w-4 h-4 accent-solar-600 rounded"
                  required
                />
                <span className="text-slate-600 dark:text-slate-300">
                  {t('register.terms')}
                </span>
              </label>

              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consentJobs}
                  onChange={e => setConsentJobs(e.target.checked)}
                  className="mt-0.5 w-4 h-4 accent-solar-600 rounded"
                />
                <span className="text-slate-600 dark:text-slate-300">
                  {t('register.job_consent')}
                </span>
              </label>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-2 rounded-xl bg-slate-100 font-semibold"
              >
                {t('register.back')}
              </button>
              <button
                type="submit"
                className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold "
              >
                {t('register.complete')}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
