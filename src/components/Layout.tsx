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
  Star,
} from 'lucide-react';

type NavItem = { to: string; label: string; icon: React.ComponentType<{ className?: string }> };

const consoles: NavItem[] = [
  { to: '/trainer', label: 'side.trainer', icon: Layers },
  { to: '/coordinator', label: 'side.coordinator', icon: Compass },
  { to: '/assessor', label: 'side.assessor', icon: FileCheck2 },
  { to: '/employer', label: 'side.employer', icon: Building2 },
  { to: '/pm', label: 'side.pm', icon: BarChart3 },
  { to: '/funder', label: 'side.funder', icon: Star },
  { to: '/admin', label: 'side.admin', icon: Shield },
];

export const Layout: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  const mainNav: NavItem[] = [
    { to: '/', label: t('nav.home'), icon: Home },
    { to: '/learn', label: t('nav.learn'), icon: BookOpen },
    { to: '/tests', label: t('side.tests_certs'), icon: Award },
    { to: '/jobs', label: t('side.jobs_vendors'), icon: Briefcase },
    { to: '/enterprise', label: t('side.shg'), icon: Zap },
    { to: '/community', label: t('nav.community'), icon: Users },
    { to: '/profile', label: t('side.profile_passport'), icon: User },
  ];

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors border-l-2 ${
      isActive
        ? 'bg-solar-50 text-solar-700 border-solar-600 font-semibold'
        : 'text-slate-600 dark:text-slate-300 border-transparent hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900'
    }`;

  return (
    <div className="min-h-screen flex flex-col bg-cream-100 dark:bg-slate-950 text-slate-800 dark:text-slate-100">
      <MockBanner />
      <SmsSimulatorToast />
      <Header />

      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex gap-8">
        {/* Desktop Sidebar */}
        {user && (
        <aside className="hidden lg:block w-60 flex-shrink-0">
          <div className="sticky top-24 space-y-4">
            <div className="bg-white dark:bg-slate-900 rounded-xl p-2 border border-slate-200 dark:border-slate-800">
              <nav className="space-y-0.5">
                {mainNav.map(item => (
                  <NavLink key={item.to} to={item.to} end={item.to === '/'} className={linkClass}>
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </NavLink>
                ))}
              </nav>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl p-2 border border-slate-200 dark:border-slate-800">
              <div className="text-xs font-semibold text-slate-500 px-3 pt-2 pb-1">
                {t('side.role_consoles')}
              </div>
              <nav className="space-y-0.5">
                {consoles.map(item => (
                  <NavLink key={item.to} to={item.to} className={linkClass}>
                    <item.icon className="w-4 h-4" />
                    <span className="text-[13px]">{t(item.label)}</span>
                  </NavLink>
                ))}
              </nav>
            </div>
          </div>
        </aside>
        )}

        {/* Dynamic Route Content */}
        <main className="flex-1 min-w-0 pb-24 md:pb-12">
          <Outlet />
        </main>
      </div>

      <VoiceGuideButton />
      {user && <BottomNav />}

      <footer className="mt-auto bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 text-slate-500 text-xs py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-3">
            <img src="/sun-icon.svg" alt="" className="w-6 h-6" />
            <span className="font-semibold text-slate-700">
              {t('brand.tagline')}
            </span>
          </div>
          <div className="text-xs space-y-0.5">
            <p>A Reliance Foundation CSR initiative · proposal prototype, Team 5, IPM 2025-30.</p>
            <p>10 hubs · 6,000 beneficiaries · 50%+ women · 375 MWh/yr clean solar generation.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
