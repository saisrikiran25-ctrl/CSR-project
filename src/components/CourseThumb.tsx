import React, { useState } from 'react';
import { BookOpen, Sun, Zap, Briefcase } from 'lucide-react';

const THEMES: Record<string, { bg: string; icon: React.ComponentType<{ className?: string }> }> = {
  A: { bg: 'bg-sky-800', icon: Sun },
  B: { bg: 'bg-solar-700', icon: Zap },
  C: { bg: 'bg-rose-800', icon: Sun },
  D: { bg: 'bg-emerald-800', icon: Briefcase },
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
  const theme = THEMES[stream] ?? { bg: 'bg-solar-700', icon: BookOpen };
  const Icon = theme.icon;

  return (
    <div className={`relative overflow-hidden ${theme.bg} ${className}`}>
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
