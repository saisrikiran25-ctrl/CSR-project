import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Home, BookOpen, Award, Briefcase, User, Sparkles } from 'lucide-react';
import { useAuth } from '../features/auth/AuthContext';

export const BottomNav: React.FC = () => {
  const { t } = useTranslation();
  const { role } = useAuth();

  // If user is a staff member, show a staff-appropriate bar or link to their console
  const isStaff = role && role !== 'learner';

  const navItems = [
    { to: '/', label: t('nav.home'), icon: Home },
    { to: isStaff ? `/${role}` : '/learn', label: isStaff ? 'Console' : t('nav.learn'), icon: isStaff ? Sparkles : BookOpen },
    { to: '/tests', label: t('nav.tests'), icon: Award },
    { to: '/jobs', label: t('nav.jobs'), icon: Briefcase },
    { to: '/profile', label: t('nav.profile'), icon: User },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 shadow-lg px-2 py-1 safe-area-pb">
      <div className="flex items-center justify-around">
        {navItems.map(item => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all min-w-[56px] min-h-[48px] active:scale-95 ${
                  isActive
                    ? 'text-solar-600 dark:text-solar-400 font-bold'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 font-medium'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div
                    className={`p-1 rounded-full transition-transform ${
                      isActive ? 'bg-sun-100 dark:bg-solar-900/60 scale-110' : ''
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

