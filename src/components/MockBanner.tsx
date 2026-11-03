import React from 'react';
import { Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const MockBanner: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-slate-900 text-slate-200 px-3 py-1.5 text-[11px] flex items-center justify-center gap-2 z-40">
      <Info className="w-3.5 h-3.5 flex-shrink-0 text-sun-400" />
      <span className="font-medium">{t('common.mock_banner')}</span>
    </div>
  );
};
