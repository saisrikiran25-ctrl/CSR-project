import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { DEMO_PERSONAS } from './demoPersonas';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Phone,
  Lock,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Star,
  Users,
  MessageSquare,
} from 'lucide-react';

export const LoginView: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { loginWithOtp, requestOtp, loginWithPassword, loginAsPersona, isAuthenticated, role } = useAuth();
  const navigate = useNavigate();

  const [authMethod, setAuthMethod] = useState<'otp' | 'password'>('otp');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Auto-fill from simulated SMS event
  useEffect(() => {
    const handleAutofill = (e: any) => {
      setOtp(e.detail);
    };
    window.addEventListener('urja_autofill_otp', handleAutofill);
    return () => window.removeEventListener('urja_autofill_otp', handleAutofill);
  }, []);

  // Cooldown countdown
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const handleSendOtp = async () => {
    setErrorMsg('');
    try {
      await requestOtp(phone);
      setOtpSent(true);
      setCooldown(30);
    } catch (err: any) {
      setErrorMsg(err.message || 'Error requesting OTP');
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      await loginWithOtp(phone, otp);
      navigate('/learn');
    } catch (err: any) {
      setErrorMsg(err.message || 'Invalid OTP code');
    }
  };

  const handleStaffLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    try {
      await loginWithPassword(email, password);
      navigate('/');
    } catch (err: any) {
      setErrorMsg(err.message || 'Login failed');
    }
  };

  const handlePersonaSelect = async (personaId: string, pRole: string) => {
    await loginAsPersona(personaId);
    if (pRole === 'trainer') navigate('/trainer');
    else if (pRole === 'coordinator') navigate('/coordinator');
    else if (pRole === 'assessor') navigate('/assessor');
    else if (pRole === 'employer') navigate('/employer');
    else if (pRole === 'pm') navigate('/pm');
    else if (pRole === 'funder') navigate('/funder');
    else if (pRole === 'admin') navigate('/admin');
    else navigate('/learn');
  };

  return (
    <div className="max-w-4xl mx-auto py-4 sm:py-8 space-y-8">
      {/* Top Welcome Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sun-100 text-amber-900 text-xs font-bold border border-sun-300">
          <Star className="w-3.5 h-3.5 text-amber-600" />
          <span>Rural Digital Learning & Livelihoods Prototype</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Sign In to Urja Kaushal • પ્રવેશ
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
          Solar technical skills, SHG enterprise, and certified Reliance vendor employment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* LEFT COLUMN: AUTH INPUT FORM */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 space-y-6">
          {/* Method Toggle */}
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl text-xs font-bold">
            <button
              onClick={() => setAuthMethod('otp')}
              className={`flex-1 py-2 rounded-xl transition-all ${
                authMethod === 'otp'
                  ? 'bg-solar-600 text-white '
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              Learner Mobile + OTP
            </button>
            <button
              onClick={() => setAuthMethod('password')}
              className={`flex-1 py-2 rounded-xl transition-all ${
                authMethod === 'password'
                  ? 'bg-solar-600 text-white '
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              Staff & Vendor Email
            </button>
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 text-rose-800 text-xs font-medium border border-rose-200">
              {errorMsg}
            </div>
          )}

          {/* METHOD 1: MOBILE + OTP */}
          {authMethod === 'otp' && (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  {t('auth.mobile_label')}
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full text-sm font-semibold p-3 pl-10 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-transparent focus:border-solar-600 outline-none"
                    required
                  />
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                </div>
              </div>

              {!otpSent ? (
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="w-full py-3 rounded-2xl bg-solar-600 hover:bg-solar-700 text-white font-bold text-xs transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{t('auth.send_otp')}</span>
                </button>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      {t('auth.otp_label')} (Demo Default: 123456)
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      value={otp}
                      onChange={e => setOtp(e.target.value)}
                      placeholder="123456"
                      className="w-full text-center text-xl font-bold font-mono p-3 rounded-2xl border-2 border-sun-400 bg-amber-50/40 dark:bg-slate-800 focus:border-solar-600 outline-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>{t('auth.verify_otp')}</span>
                  </button>

                  <div className="text-center">
                    <button
                      type="button"
                      disabled={cooldown > 0}
                      onClick={handleSendOtp}
                      className="text-xs text-solar-600 font-semibold hover:underline disabled:opacity-40"
                    >
                      {cooldown > 0 ? `Resend OTP in ${cooldown}s` : 'Resend OTP via SMS'}
                    </button>
                  </div>
                </div>
              )}

              <div className="pt-2 text-center text-xs text-slate-500">
                New learner?{' '}
                <Link to="/register" className="text-solar-600 font-bold hover:underline">
                  Register in 4 simple steps →
                </Link>
              </div>
            </form>
          )}

          {/* METHOD 2: STAFF EMAIL + PASSWORD */}
          {authMethod === 'password' && (
            <form onSubmit={handleStaffLogin} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Official Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="trainer.jambuda@urjakaushal.org"
                  className="w-full text-sm font-semibold p-3 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-transparent focus:border-solar-600 outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Password (Demo: demo1234)
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full text-sm font-semibold p-3 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-transparent focus:border-solar-600 outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-solar-600 hover:bg-solar-700 text-white font-bold text-xs transition-all active:scale-95"
              >
                Sign In to Console
              </button>
            </form>
          )}
        </div>

        {/* RIGHT COLUMN: 1-CLICK DEMO PERSONAS PANEL */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <Users className="w-5 h-5 text-sun-500" />
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {t('auth.demo_personas')}
              </h3>
              <p className="text-xs text-slate-400">
                Click any persona below to experience their specific role interface:
              </p>
            </div>
          </div>

          <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
            {DEMO_PERSONAS.map(p => (
              <button
                key={p.id}
                onClick={() => handlePersonaSelect(p.id, p.role)}
                className="w-full text-left p-3 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-solar-500 hover:bg-solar-50/50 dark:hover:bg-slate-800 transition-all flex items-center justify-between group"
              >
                <div>
                  <div className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-solar-700">
                    {p.name}
                  </div>
                  <div className="text-xs text-slate-500 line-clamp-1">{p.description}</div>
                  <span className="inline-block mt-1 text-xs font-bold bg-sun-100 text-amber-900 px-1.5 py-0.5 rounded">
                    {p.badge}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-xs font-extrabold px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200">
                    {p.role}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

