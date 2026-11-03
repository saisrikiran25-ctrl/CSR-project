import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const MockBanner: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-amber-500 text-slate-950 px-3 py-1.5 text-xs font-medium flex items-center justify-between shadow-sm z-40 border-b border-amber-600">
      <div className="flex items-center gap-2 mx-auto text-center">
        <AlertTriangle className="w-4 h-4 flex-shrink-0 text-amber-950 animate-bounce" />
        <span className="font-semibold">
          {t('common.mock_banner')}
        </span>
      </div>
    </div>
  );
};

