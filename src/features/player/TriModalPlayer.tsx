import React, { useState, useEffect, useRef } from 'react';
import { Lesson, MediaMode } from '../../types';
import { useTranslation } from 'react-i18next';
import { speechService } from '../../lib/speech';
import {
  Volume2,
  Video,
  Presentation,
  Play,
  Pause,
  RotateCcw,
  FastForward,
  CheckCircle,
  FileText,
  Sliders,
  Zap,
  Info,
  Layers,
  ChevronRight,
} from 'lucide-react';

interface TriModalPlayerProps {
  lesson: Lesson;
  onComplete?: () => void;
  initialMode?: MediaMode;
}

export const TriModalPlayer: React.FC<TriModalPlayerProps> = ({
  lesson,
  onComplete,
  initialMode = 'av',
}) => {
  const { t, i18n } = useTranslation();
  const lang = (i18n.language || 'gu') as 'gu' | 'hi' | 'en';

  const [mode, setMode] = useState<MediaMode>(initialMode);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [activeSlide, setActiveSlide] = useState(0);
  const [quality, setQuality] = useState<'144p' | '360p' | '720p'>('360p');
  const [practicalChecks, setPracticalChecks] = useState<Record<number, boolean>>({});
  const [showTranscript, setShowTranscript] = useState(true);

  // Simulator states for interactive diagrams
  const [simWiringMode, setSimWiringMode] = useState<'series' | 'parallel'>('series');
  const [simIrradiance, setSimIrradiance] = useState(800); // W/m²
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);

  const durationSec = lesson.manifest.audioDurationSec || 300;
  const timerRef = useRef<any>(null);

  // Synchronise cue points
  useEffect(() => {
    if (lesson.manifest.cuePoints && lesson.manifest.cuePoints.length > 0) {
      const match = lesson.manifest.cuePoints
        .slice()
        .reverse()
        .find(cp => currentTime >= cp.timeSec);
      if (match) {
        setActiveSlide(match.slideIndex);
      }
    }
  }, [currentTime, lesson.manifest.cuePoints]);

  // Handle Play/Pause timer simulation
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= durationSec) {
            setIsPlaying(false);
            if (onComplete) onComplete();
            return durationSec;
          }
          return prev + 1;
        });
      }, 1000 / playbackRate);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isPlaying, playbackRate, durationSec, onComplete]);

  // Stop speech synthesis when unmounted or paused
  useEffect(() => {
    return () => {
      speechService.stop();
    };
  }, []);

  const togglePlay = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      // Speak title or hint in current language
      const transcriptText = lesson.transcript[lang] || lesson.summary[lang];
      speechService.speak(transcriptText.slice(0, 150));
    } else {
      setIsPlaying(false);
      speechService.stop();
    }
  };

  const skipBack15 = () => {
    setCurrentTime(prev => Math.max(0, prev - 15));
  };

  const skipForward15 = () => {
    setCurrentTime(prev => Math.min(durationSec, prev + 15));
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPercent = Math.min(100, Math.round((currentTime / durationSec) * 100));

  const estimatedDataKB =
    mode === 'audio'
      ? lesson.manifest.sizeKB.audio
      : quality === '720p'
      ? lesson.manifest.sizeKB.video720
      : lesson.manifest.sizeKB.video360;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800">
      {/* Player Header & Mode Switcher */}
      <div className="bg-slate-900 text-white p-4 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800">
        <div>
          <span className="text-xs font-bold text-sun-400 bg-sun-500/10 px-2.5 py-0.5 rounded-full border border-sun-400/20">
            {lesson.order}. Lesson • {lesson.durationMinutes} mins
          </span>
          <h2 className="text-base sm:text-lg font-bold text-white mt-1">
            {lesson.title[lang] || lesson.title.en}
          </h2>
        </div>

        {/* 3 Tri-Modal Mode Buttons */}
        <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-2xl border border-slate-700">
          <button
            onClick={() => setMode('audio')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              mode === 'audio'
                ? 'bg-solar-600 text-white '
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t('player.audio_mode')}</span>
          </button>

          <button
            onClick={() => setMode('video')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              mode === 'video'
                ? 'bg-solar-600 text-white '
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t('player.video_mode')}</span>
          </button>

          <button
            onClick={() => setMode('av')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              mode === 'av'
                ? 'bg-sun-500 text-slate-950 font-bold '
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Presentation className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t('player.av_mode')}</span>
          </button>
        </div>
      </div>

      {/* Main View Area based on Mode */}
      <div className="relative bg-slate-950 min-h-[320px] sm:min-h-[420px] flex flex-col items-center justify-center p-4">
        {/* MODE 1: AUDIO-ONLY PODCAST PLAYER */}
        {mode === 'audio' && (
          <div className="w-full max-w-lg text-center space-y-6 py-8">
            <div className="relative mx-auto w-36 h-36 rounded-full bg-solar-600 p-1 flex items-center justify-center ">
              <div
                className={`w-full h-full rounded-full bg-slate-900 flex items-center justify-center ${
                  isPlaying ? '' : ''
                }`}
              >
                <Volume2 className="w-16 h-16 text-sun-400" />
              </div>
            </div>

            <div>
              <span className="text-xs text-sun-300 font-semibold ">
                AUDIO PODCAST • LOW DATA USAGE
              </span>
              <h3 className="text-lg font-bold text-white mt-1">
                {lesson.title[lang]}
              </h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto mt-2">
                {lesson.summary[lang]}
              </p>
            </div>

            {/* Chapters */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              {lesson.manifest.cuePoints?.map((cp, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentTime(cp.timeSec)}
                  className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
                    currentTime >= cp.timeSec
                      ? 'bg-solar-600 text-white border-solar-400'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                >
                  {cp.title}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* MODE 2: ADAPTIVE VIDEO EXPLORER */}
        {mode === 'video' && (
          <div className="w-full max-w-3xl aspect-video bg-slate-900 rounded-2xl relative overflow-hidden flex flex-col justify-between border border-slate-800 ">
            {/* Simulated Animated Video Canvas */}
            <div className="absolute inset-0 flex items-center justify-center bg-ink-900">
              <svg className="w-full h-full opacity-80" viewBox="0 0 600 350">
                <defs>
                  <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1e3a8a" />
                    <stop offset="100%" stopColor="#0f172a" />
                  </linearGradient>
                </defs>
                <rect width="600" height="350" fill="url(#skyGrad)" />
                {/* Sun with pulsing ray circles */}
                <circle cx="500" cy="70" r="38" fill="#F59E0B" className="" />
                <circle cx="500" cy="70" r="54" fill="none" stroke="#FDE68A" strokeWidth="2" strokeDasharray="6 4" />
                
                {/* Rooftop with Solar Array */}
                <polygon points="50,280 550,280 480,180 120,180" fill="#1E293B" stroke="#334155" strokeWidth="2" />
                
                {/* Solar Panels on Roof */}
                <polygon points="150,260 260,260 230,195 140,195" fill="#1D4ED8" stroke="#60A5FA" strokeWidth="1.5" />
                <polygon points="280,260 390,260 360,195 270,195" fill="#1D4ED8" stroke="#60A5FA" strokeWidth="1.5" />
                <polygon points="410,260 520,260 490,195 400,195" fill="#1D4ED8" stroke="#60A5FA" strokeWidth="1.5" />

                {/* Technician Figure */}
                <circle cx="100" cy="220" r="10" fill="#FBBF24" />
                <rect x="94" y="230" width="12" height="28" rx="3" fill="#E11D48" />
                <line x1="100" y1="210" x2="100" y2="200" stroke="#FBBF24" strokeWidth="3" />
                {/* Helmet */}
                <path d="M 88 220 Q 100 205 112 220 Z" fill="#F59E0B" />

                {/* Current Time Animation Overlay */}
                <text x="30" y="40" fill="#94A3B8" fontSize="12" fontFamily="monospace">
                  JAMNAGAR SOLAR LAB • DEMO VIDEO CLIP [360P]
                </text>
                <text x="30" y="60" fill="#FBBF24" fontSize="14" fontWeight="bold">
                  {lesson.title[lang]}
                </text>
              </svg>
            </div>

            {/* Video Quality Badge */}
            <div className="relative z-10 p-3 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent">
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/70 border border-emerald-500/30 px-2 py-0.5 rounded">
                SIMULATED VIDEO STREAM
              </span>
              <div className="flex items-center gap-1.5 text-xs text-white">
                <span className="text-slate-400">Quality:</span>
                {(['144p', '360p', '720p'] as const).map(q => (
                  <button
                    key={q}
                    onClick={() => setQuality(q)}
                    className={`px-2 py-0.5 rounded text-xs font-bold transition-all ${
                      quality === q
                        ? 'bg-sun-500 text-slate-900'
                        : 'bg-black/40 text-slate-300 hover:bg-black/60'
                    }`}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Caption Overlay */}
            <div className="relative z-10 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent text-center">
              <div className="inline-block bg-black/80 text-sun-300 text-xs sm:text-sm font-medium px-4 py-1.5 rounded-xl border border-sun-400/20 ">
                "{lesson.transcript[lang]?.slice(0, 110)}..."
              </div>
            </div>
          </div>
        )}

        {/* MODE 3: AUDIO-VISUAL (SYNCHRONIZED INTERACTIVE SIMULATOR) */}
        {mode === 'av' && (
          <div className="w-full max-w-3xl bg-slate-900/90 rounded-2xl p-4 sm:p-6 border border-slate-800 text-white ">
            {/* Interactive Tab Switcher inside AV Mode */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2 text-xs font-bold text-sun-400">
                <Zap className="w-4 h-4 text-sun-400" />
                <span>INTERACTIVE DIAGRAM & LAB SIMULATOR</span>
              </div>
              <div className="text-xs text-slate-400">
                Slide {activeSlide + 1} of {lesson.manifest.cuePoints?.length || 4}
              </div>
            </div>

            {/* INTERACTIVE COMPONENT 1: PV SYSTEM SCHEMATIC WITH HOTSPOTS */}
            {activeSlide === 0 && (
              <div className="space-y-4">
                <div className="text-xs text-slate-300">
                  Click on any component below to inspect voltage, currents, and hear spoken guidance:
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  {[
                    { id: 'pv', name: '1. Solar PV Array', desc: 'Converts sunlight into DC power (Voc: 40V, Isc: 9A)', color: 'border-amber-400' },
                    { id: 'combiner', name: '2. DC Combiner Box', desc: 'String fuses, DC surge protector (SPD), isolation switch', color: 'border-blue-400' },
                    { id: 'inverter', name: '3. Solar Inverter', desc: 'Converts DC into 230V AC grid electricity with MPPT', color: 'border-emerald-400' },
                    { id: 'netmeter', name: '4. Bi-directional Meter', desc: 'Measures net solar export to grid under PM Surya Ghar', color: 'border-rose-400' },
                  ].map(item => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setSelectedHotspot(item.id);
                        speechService.speak(`${item.name}. ${item.desc}`);
                      }}
                      className={`p-3 rounded-xl border-2 transition-all text-left bg-slate-800/80 hover:bg-slate-800 ${
                        selectedHotspot === item.id ? `${item.color} bg-slate-700/80 scale-105 ` : 'border-slate-700'
                      }`}
                    >
                      <div className="font-bold text-xs text-white">{item.name}</div>
                      <div className="text-xs text-slate-300 mt-1 line-clamp-2">{item.desc}</div>
                    </button>
                  ))}
                </div>

                {selectedHotspot && (
                  <div className="p-3 bg-solar-900/60 border border-solar-500 rounded-xl text-xs flex items-start gap-2">
                    <Info className="w-4 h-4 text-sun-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-sun-300">Audio Guide Tip: </span>
                      {selectedHotspot === 'pv' && 'When testing PV panels, always measure open circuit voltage (Voc) under clear 1000 W/m² noon sunlight.'}
                      {selectedHotspot === 'combiner' && 'Always de-energize the DC isolator before checking cartridge fuses to prevent DC arc flash.'}
                      {selectedHotspot === 'inverter' && 'Modern string inverters shut down within 100 milliseconds upon grid power outage for lineman safety (Anti-Islanding).'}
                      {selectedHotspot === 'netmeter' && 'Net meters credit the village hub at standard Gujarat DISCOM solar export feed-in tariffs.'}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* INTERACTIVE COMPONENT 2: SERIES VS PARALLEL WIRING SIMULATOR */}
            {(activeSlide === 1 || activeSlide === 2) && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-300">
                    Wiring Mode Configuration:
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSimWiringMode('series')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        simWiringMode === 'series'
                          ? 'bg-sun-500 text-slate-950 shadow'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      Series Circuit (Voc+)
                    </button>
                    <button
                      onClick={() => setSimWiringMode('parallel')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        simWiringMode === 'parallel'
                          ? 'bg-sun-500 text-slate-950 shadow'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      Parallel Circuit (Isc+)
                    </button>
                  </div>
                </div>

                {/* Animated Circuit Canvas Box */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-mono">
                    <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                      <div className="text-slate-400 text-xs">TOTAL STRING VOLTAGE</div>
                      <div className="text-xl font-bold text-amber-400 mt-1">
                        {simWiringMode === 'series' ? '80.0 Volts' : '40.0 Volts'}
                      </div>
                      <div className="text-xs text-slate-500">
                        {simWiringMode === 'series' ? '40V + 40V (Additive)' : 'Equal across branches'}
                      </div>
                    </div>

                    <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                      <div className="text-slate-400 text-xs">TOTAL STRING CURRENT</div>
                      <div className="text-xl font-bold text-emerald-400 mt-1">
                        {simWiringMode === 'series' ? '9.0 Amps' : '18.0 Amps'}
                      </div>
                      <div className="text-xs text-slate-500">
                        {simWiringMode === 'series' ? 'Current remains constant' : '9A + 9A (Additive)'}
                      </div>
                    </div>

                    <div className="col-span-2 sm:col-span-1 bg-slate-900 p-3 rounded-lg border border-slate-800">
                      <div className="text-slate-400 text-xs">COMBINED POWER RATING</div>
                      <div className="text-xl font-bold text-sky-400 mt-1">
                        720 Watts Peak
                      </div>
                      <div className="text-xs text-slate-500">P = V × I = 720W in both!</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* INTERACTIVE COMPONENT 3: I-V CURVE & IRRADIANCE SLIDER */}
            {activeSlide === 3 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-300">
                    Solar Irradiance Slider: <span className="text-sun-400 font-bold">{simIrradiance} W/m²</span>
                  </span>
                  <span className="text-slate-400">Standard Test Condition = 1,000 W/m²</span>
                </div>

                <input
                  type="range"
                  min="200"
                  max="1200"
                  step="50"
                  value={simIrradiance}
                  onChange={e => setSimIrradiance(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />

                {/* SVG I-V Curve Visualizer */}
                <div className="h-32 bg-slate-950 rounded-xl p-2 border border-slate-800 flex items-center justify-center">
                  <svg className="w-full h-full" viewBox="0 0 300 100">
                    <line x1="20" y1="90" x2="280" y2="90" stroke="#475569" strokeWidth="1" />
                    <line x1="20" y1="10" x2="20" y2="90" stroke="#475569" strokeWidth="1" />
                    <text x="250" y="85" fill="#64748b" fontSize="8">Voltage (V)</text>
                    <text x="25" y="20" fill="#64748b" fontSize="8">Current (A)</text>
                    
                    {/* Simulated I-V Curve scaling with irradiance */}
                    <path
                      d={`M 20 ${90 - (simIrradiance / 1200) * 75} Q 200 ${90 - (simIrradiance / 1200) * 75} 260 90`}
                      fill="none"
                      stroke="#F59E0B"
                      strokeWidth="2.5"
                    />
                    {/* MPP Dot */}
                    <circle
                      cx="210"
                      cy={90 - (simIrradiance / 1200) * 65}
                      r="4"
                      fill="#10B981"
                      className="animate-ping"
                    />
                  </svg>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Playback Controls & Progress Bar */}
      <div className="p-4 sm:p-5 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        {/* Progress Scrubber */}
        <div className="space-y-1.5">
          <div className="relative w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full cursor-pointer overflow-hidden">
            <div
              className="h-full bg-solar-600 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-xs font-mono text-slate-500">
            <span>{formatTime(currentTime)}</span>
            <span className="text-xs text-amber-700 dark:text-amber-300 font-sans font-semibold">
              Data: ~{estimatedDataKB} KB
            </span>
            <span>{formatTime(durationSec)}</span>
          </div>
        </div>

        {/* Buttons Row */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={skipBack15}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 active:scale-95 transition-all"
              aria-label={t('player.repeat_15')}
              title={t('player.repeat_15')}
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={togglePlay}
              className="p-3.5 rounded-2xl bg-solar-600 hover:bg-solar-700 text-white active:scale-95 transition-transform flex items-center justify-center"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
            </button>

            <button
              onClick={skipForward15}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 active:scale-95 transition-all"
              aria-label="Forward 15 seconds"
              title="Forward 15 seconds"
            >
              <FastForward className="w-4 h-4" />
            </button>
          </div>

          {/* Speed & Tools */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300">
              <Sliders className="w-3.5 h-3.5 text-slate-500" />
              <span>{t('player.speed')}:</span>
              <select
                aria-label={t('player.speed')}
                value={playbackRate}
                onChange={e => setPlaybackRate(Number(e.target.value))}
                className="bg-transparent cursor-pointer font-bold outline-none"
              >
                <option value={0.75}>0.75x</option>
                <option value={1}>1.0x</option>
                <option value={1.25}>1.25x</option>
                <option value={1.5}>1.5x</option>
              </select>
            </div>

            <button
              onClick={() => setShowTranscript(!showTranscript)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                showTranscript
                  ? 'bg-solar-50 dark:bg-solar-900/50 text-solar-700 dark:text-solar-300 border-solar-200'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 border-slate-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{t('player.transcript')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Transcript Accordion */}
      {showTranscript && (
        <div className="p-4 sm:p-5 bg-cream-50 dark:bg-slate-950/60 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-solar-600" />
              <span>{t('player.transcript')} ({lang.toUpperCase()})</span>
            </h4>
            <span className="text-xs text-slate-400 font-medium">Bilingual Audio Readout Active</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800">
            {lesson.transcript[lang] || lesson.transcript.en}
          </p>
        </div>
      )}

      {/* Practical Lab Rubric Checklist (Hybrid Model) */}
      {lesson.hasPractical && lesson.practicalChecklist && (
        <div className="p-4 sm:p-5 bg-sun-50/70 dark:bg-slate-900 border-t border-sun-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-700 dark:text-amber-400" />
              <h4 className="text-xs font-bold text-amber-950 dark:text-amber-300 ">
                {t('player.practical_checklist')}
              </h4>
            </div>
            <span className="text-xs font-bold bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full">
              Physical Hub Lab Verification
            </span>
          </div>

          <div className="space-y-2">
            {lesson.practicalChecklist.map((task, idx) => (
              <label
                key={idx}
                className="flex items-start gap-2.5 p-2 rounded-xl bg-white dark:bg-slate-800 border border-sun-200 dark:border-slate-700 cursor-pointer hover:bg-sun-50 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={!!practicalChecks[idx]}
                  onChange={e =>
                    setPracticalChecks(prev => ({ ...prev, [idx]: e.target.checked }))
                  }
                  className="mt-0.5 w-4 h-4 accent-solar-600 rounded cursor-pointer"
                />
                <span
                  className={`text-xs ${
                    practicalChecks[idx]
                      ? 'line-through text-slate-400'
                      : 'text-slate-700 dark:text-slate-200 font-medium'
                  }`}
                >
                  {task}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

