import React, { useState } from 'react';
import { BookOpen, Sun, Zap, Briefcase } from 'lucide-react';

const THEMES: Record<string, { bg: string; icon: React.ComponentType<{ className?: string }> }> = {
  A: { bg: 'from-sky-600 to-indigo-900', icon: Sun },
  B: { bg: 'from-solar-500 to-ink-900', icon: Zap },
  C: { bg: 'from-rose-500 to-fuchsia-900', icon: Sun },
  D: { bg: 'from-emerald-500 to-teal-900', icon: Briefcase },
};

interface Props {
  src?: string;
  alt: string;
  stream: string;
  className?: string;
}

/** Course image with a branded gradient fallback, so cards never render as empty boxes. */
export const CourseThumb: React.FC<Props> = ({ src, alt, stream, className = '' }) => {
  const [failed, setFailed] = useState(false);
  const theme = THEMES[stream] ?? { bg: 'from-solar-500 to-ink-900', icon: BookOpen };
  const Icon = theme.icon;

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br ${theme.bg} ${className}`}>
      <Icon className="absolute right-4 bottom-3 w-16 h-16 text-white/20" />
      {src && !failed && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      )}
    </div>
  );
};
