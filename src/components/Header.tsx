import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../features/auth/AuthContext';
import { changeLanguage } from '../i18n';
import { Language } from '../types';
import {
  Globe,
  User,
  LogOut,
  Sparkles,
  ShieldCheck,
  ChevronDown,
  Wifi,
  WifiOff,
} from 'lucide-react';
import { DEMO_PERSONAS } from '../features/auth/demoPersonas';
import { VoiceGuideButton } from './VoiceGuideButton';

export const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { user, role, logout, loginAsPersona } = useAuth();
  const navigate = useNavigate();
  const [showPersonaMenu, setShowPersonaMenu] = useState(false);
  const [isOnline] = useState(navigator.onLine);

  const currentLang = (i18n.language || 'gu') as Language;

  const handleLangChange = (lang: Language) => {
    changeLanguage(lang);
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
        {/* Logo / Brand */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sun-400 to-solar-600 p-0.5 shadow-md group-hover:scale-105 transition-transform flex items-center justify-center">
            <img src="/sun-icon.svg" alt="Urja Kaushal Logo" className="w-9 h-9" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg sm:text-xl text-solar-700 dark:text-solar-300 tracking-tight leading-none">
                Urja Kaushal
              </span>
              <span className="hidden sm:inline-block text-xs font-semibold px-1.5 py-0.5 rounded bg-sun-100 text-amber-800 border border-sun-300">
                ઊર્જા કૌશલ્ય
              </span>
            </div>
            <p className="text-[10px] text-slate-700 dark:text-slate-200 leading-tight">
              Jamnagar Solar Livelihoods • Reliance Foundation CSR
            </p>
          </div>
        </Link>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Pitch Mode Shortcut */}
          <Link
            to="/pitch"
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-sun-500 to-amber-500 text-slate-950 font-bold text-xs shadow hover:brightness-105 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-slate-950" />
            <span>{t('nav.pitch')}</span>
          </Link>

          {/* Voice read inline */}
          <VoiceGuideButton inline />

          {/* Language Selector */}
          <div className="relative flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5 border border-slate-200 dark:border-slate-700">
            <Globe className="w-3.5 h-3.5 ml-1.5 text-slate-700 dark:text-slate-200" />
            <select
              aria-label={t('common.select_language')}
              value={currentLang}
              onChange={e => handleLangChange(e.target.value as Language)}
              className="bg-transparent text-xs font-semibold text-slate-700 dark:text-slate-200 py-1 pl-1 pr-6 cursor-pointer outline-none"
            >
              <option value="gu">ગુજરાતી</option>
              <option value="hi">हिन्दी</option>
              <option value="en">English</option>
            </select>
          </div>

          {/* Connectivity Status */}
          <div
            className="hidden sm:flex items-center gap-1 text-[11px] font-medium text-slate-500"
            title={isOnline ? 'Online mode active' : 'Offline mode active'}
          >
            {isOnline ? (
              <Wifi className="w-3.5 h-3.5 text-emerald-500" />
            ) : (
              <WifiOff className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
            )}
          </div>

          {/* User Persona Switcher & Auth */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowPersonaMenu(!showPersonaMenu)}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-solar-50 dark:bg-solar-900/40 border border-solar-200 dark:border-solar-700 text-xs text-solar-800 dark:text-solar-200 font-medium hover:bg-solar-100 transition-colors"
                aria-expanded={showPersonaMenu}
              >
                <div className="w-6 h-6 rounded-full bg-solar-600 text-white flex items-center justify-center font-bold text-[10px]">
                  {user.name.charAt(0)}
                </div>
                <div className="hidden sm:block text-left">
                  <div className="font-bold leading-tight">{user.name.split(' ')[0]}</div>
                  <div className="text-[10px] text-amber-600 dark:text-amber-400 capitalize">{role}</div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {/* Persona Dropdown Menu */}
              {showPersonaMenu && (
                <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 py-2 z-50">
                  <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-700">
                    <p className="text-xs font-bold text-slate-900 dark:text-white">{user.name}</p>
                    <p className="text-[11px] text-slate-500 capitalize">Role: {role}</p>
                    {user.hubId && (
                      <span className="inline-block mt-1 text-[10px] bg-sun-100 text-amber-800 px-1.5 py-0.5 rounded font-medium">
                        Hub: {user.hubId.replace('hub_', '').replace('_', ' ')}
                      </span>
                    )}
                  </div>

                  {/* Switch Persona */}
                  <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Quick Persona Switch:
                  </div>
                  <div className="max-h-56 overflow-y-auto px-1 space-y-1">
                    {DEMO_PERSONAS.map(p => (
                      <button
                        key={p.id}
                        onClick={() => {
                          loginAsPersona(p.id);
                          setShowPersonaMenu(false);
                          if (p.role === 'trainer') navigate('/trainer');
                          else if (p.role === 'coordinator') navigate('/coordinator');
                          else if (p.role === 'assessor') navigate('/assessor');
                          else if (p.role === 'employer') navigate('/employer');
                          else if (p.role === 'pm') navigate('/pm');
                          else if (p.role === 'funder') navigate('/funder');
                          else if (p.role === 'admin') navigate('/admin');
                          else navigate('/learn');
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors ${
                          p.id === user.id ? 'bg-solar-50 text-solar-700 font-bold' : 'text-slate-700 dark:text-slate-200'
                        }`}
                      >
                        <div>
                          <div>{p.name}</div>
                          <div className="text-[10px] text-slate-500">{p.badge}</div>
                        </div>
                        <span className="text-[10px] uppercase font-semibold px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-600 text-slate-800 dark:text-slate-200">
                          {p.role}
                        </span>
                      </button>
                    ))}
                  </div>

                  <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-700 px-2 flex justify-between">
                    <Link
                      to="/profile"
                      onClick={() => setShowPersonaMenu(false)}
                      className="text-xs text-solar-600 hover:underline font-medium flex items-center gap-1 p-1"
                    >
                      <User className="w-3.5 h-3.5" />
                      {t('nav.profile')}
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setShowPersonaMenu(false);
                        navigate('/login');
                      }}
                      className="text-xs text-rose-600 hover:text-rose-700 font-medium flex items-center gap-1 p-1"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      {t('nav.logout')}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-solar-600 hover:bg-solar-700 text-white font-bold text-xs shadow-sm transition-all"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-sun-300" />
              <span>{t('nav.login')}</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

