import React from 'react';
import { Outlet, NavLink, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Header } from './Header';
import { BottomNav } from './BottomNav';
import { MockBanner } from './MockBanner';
import { SmsSimulatorToast } from './SmsSimulatorToast';
import { VoiceGuideButton } from './VoiceGuideButton';
import { useAuth } from '../features/auth/AuthContext';
import {
  Home,
  BookOpen,
  Award,
  Briefcase,
  User,
  Users,
  Compass,
  Zap,
  Shield,
  Layers,
  FileCheck2,
  Building2,
  BarChart3,
  Sparkles,
} from 'lucide-react';

export const Layout: React.FC = () => {
  const { t } = useTranslation();
  const { user, role } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-cream-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100">
      <MockBanner />
      <SmsSimulatorToast />
      <Header />

      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex gap-6">
        {/* Desktop Sidebar Rail */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-24 bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-sm border border-slate-200 dark:border-slate-800 space-y-6">
            <div>
              <div className="text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider px-3 mb-2">
                Learning & Livelihood
              </div>
              <nav className="space-y-1">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-solar-600 text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`
                  }
                >
                  <Home className="w-4 h-4" />
                  <span>{t('nav.home')}</span>
                </NavLink>

                <NavLink
                  to="/learn"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-solar-600 text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`
                  }
                >
                  <BookOpen className="w-4 h-4" />
                  <span>{t('nav.learn')} (Courses)</span>
                </NavLink>

                <NavLink
                  to="/tests"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-solar-600 text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`
                  }
                >
                  <Award className="w-4 h-4" />
                  <span>{t('nav.tests')} & Certs</span>
                </NavLink>

                <NavLink
                  to="/jobs"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-solar-600 text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`
                  }
                >
                  <Briefcase className="w-4 h-4" />
                  <span>{t('nav.jobs')} & Vendors</span>
                </NavLink>

                <NavLink
                  to="/enterprise"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-solar-600 text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`
                  }
                >
                  <Zap className="w-4 h-4 text-sun-500" />
                  <span>Women SHG Enterprise</span>
                </NavLink>

                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-solar-600 text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`
                  }
                >
                  <User className="w-4 h-4" />
                  <span>{t('nav.profile')} & Passport</span>
                </NavLink>

                <NavLink
                  to="/community"
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-solar-600 text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`
                  }
                >
                  <Users className="w-4 h-4" />
                  <span>{t('nav.community')}</span>
                </NavLink>
              </nav>
            </div>

            {/* Stakeholder Consoles */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider px-3 mb-2 flex items-center justify-between">
                <span>Role Consoles</span>
                <span className="text-[9px] bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-1 py-0.5 rounded">All Roles</span>
              </div>
              <nav className="space-y-0.5 text-xs font-medium">
                <Link
                  to="/trainer"
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <Layers className="w-3.5 h-3.5 text-solar-500" />
                  <span>Trainer Hub Lab</span>
                </Link>
                <Link
                  to="/coordinator"
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <Compass className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Coordinator Mobiliser</span>
                </Link>
                <Link
                  to="/assessor"
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <FileCheck2 className="w-3.5 h-3.5 text-amber-500" />
                  <span>SCGJ External Assessor</span>
                </Link>
                <Link
                  to="/employer"
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <Building2 className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Employer / Vendor</span>
                </Link>
                <Link
                  to="/pm"
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <BarChart3 className="w-3.5 h-3.5 text-rose-500" />
                  <span>Project Manager & M&E</span>
                </Link>
                <Link
                  to="/funder"
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold text-solar-600 dark:text-solar-400"
                >
                  <Sparkles className="w-3.5 h-3.5 text-sun-500" />
                  <span>Funder (Reliance CSR)</span>
                </Link>
                <Link
                  to="/admin"
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <Shield className="w-3.5 h-3.5 text-slate-500" />
                  <span>Super Admin</span>
                </Link>
              </nav>
            </div>
          </div>
        </aside>

        {/* Dynamic Route Content */}
        <main className="flex-1 min-w-0 pb-24 md:pb-12">
          <Outlet />
        </main>
      </div>

      {/* Persistent Floating Audio Help Button */}
      <VoiceGuideButton />

      {/* Mobile Bottom Navigation */}
      <BottomNav />

      {/* Footer */}
      <footer className="mt-auto bg-slate-900 text-slate-400 text-xs py-8 px-4 border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <img src="/sun-icon.svg" alt="Urja Kaushal" className="w-6 h-6" />
            <span className="font-semibold text-slate-200">
              Urja Kaushal: Turning clean energy into clean livelihoods, one village hub at a time.
            </span>
          </div>

          <div className="text-slate-400 text-[11px] space-y-1">
            <p>A Reliance Foundation CSR initiative (proposal prototype Team 5, IPM 2025-30).</p>
            <p>10 Hubs • 6,000 Beneficiaries • 50%+ Women • 375 MWh/yr Clean Solar Generation.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

