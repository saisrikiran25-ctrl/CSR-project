import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { speechService } from '../lib/speech';
import { useTranslation } from 'react-i18next';

interface VoiceGuideProps {
  getText?: () => string;
  className?: string;
  inline?: boolean;
}

export const VoiceGuideButton: React.FC<VoiceGuideProps> = ({ getText, className = '', inline = false }) => {
  const [speaking, setSpeaking] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    return speechService.subscribe(isSpk => setSpeaking(isSpk));
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (speaking) {
      speechService.stop();
    } else {
      let content = '';
      if (getText) {
        content = getText();
      } else {
        // Read main article or heading of page
        const main = document.querySelector('main');
        if (main) {
          content = main.innerText.slice(0, 450); // Read first paragraph chunk
        } else {
          content = document.title;
        }
      }
      speechService.speak(content);
    }
  };

  if (inline) {
    return (
      <button
        onClick={handleClick}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
          speaking
            ? 'bg-amber-600 text-white border-amber-500 animate-pulse'
            : 'bg-sun-100 hover:bg-sun-200 text-amber-900 border-sun-300'
        } ${className}`}
        aria-label={speaking ? t('nav.stop') : t('nav.listen')}
        title={speaking ? t('nav.stop') : t('nav.listen')}
      >
        {speaking ? <VolumeX className="w-4 h-4 text-white" /> : <Volume2 className="w-4 h-4 text-amber-700" />}
        <span>{speaking ? t('nav.stop') : t('nav.listen')}</span>
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={`fixed bottom-20 right-4 md:bottom-8 md:right-8 z-40 rounded-full p-3.5 shadow-2xl flex items-center justify-center transition-transform active:scale-95 border-2 ${
        speaking
          ? 'bg-amber-600 border-white text-white animate-pulse'
          : 'bg-solar-600 hover:bg-solar-700 border-sun-400 text-white'
      } ${className}`}
      aria-label={speaking ? t('nav.stop') : t('nav.listen')}
      title={speaking ? t('nav.stop') : t('nav.listen')}
    >
      {speaking ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6 text-sun-300" />}
    </button>
  );
};

