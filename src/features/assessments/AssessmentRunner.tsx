import React, { useState, useEffect } from 'react';
import { Assessment, Question, AssessmentAttempt } from '../../types';
import { useTranslation } from 'react-i18next';
import { speechService } from '../../lib/speech';
import {
  Timer,
  CheckCircle,
  AlertTriangle,
  RotateCcw,
  Mic,
  MicOff,
  Volume2,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AssessmentRunnerProps {
  assessment: Assessment;
  questions: Question[];
  onComplete: (attempt: AssessmentAttempt) => void;
}

export const AssessmentRunner: React.FC<AssessmentRunnerProps> = ({
  assessment,
  questions,
  onComplete,
}) => {
  const { t, i18n } = useTranslation();
  const lang = (i18n.language || 'gu') as 'gu' | 'hi' | 'en';
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [timeLeftSec, setTimeLeftSec] = useState(assessment.durationMinutes * 60);
  const [tabBlurWarnings, setTabBlurWarnings] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [voiceRecordings, setVoiceRecordings] = useState<Record<string, string>>({});
  const [hotspotClicks, setHotspotClicks] = useState<Record<string, { x: number; y: number }>>({});
  const [orderedItems, setOrderedItems] = useState<Record<string, string[]>>({});

  const currentQ = questions[currentIndex];

  // Timer countdown
  useEffect(() => {
    if (timeLeftSec <= 0) {
      handleSubmit();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeftSec(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeftSec]);

  // Tab blur / Rural integrity check
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        setTabBlurWarnings(prev => prev + 1);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  // Autosave restore simulation
  useEffect(() => {
    const autosaved = localStorage.getItem(`urja_exam_${assessment.id}`);
    if (autosaved) {
      try {
        setAnswers(JSON.parse(autosaved));
      } catch (e) {}
    }
  }, [assessment.id]);

  const saveAnswer = (questionId: string, val: any) => {
    const updated = { ...answers, [questionId]: val };
    setAnswers(updated);
    localStorage.setItem(`urja_exam_${assessment.id}`, JSON.stringify(updated));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  // Grade test
  const handleSubmit = () => {
    let earnedPoints = 0;
    let maxPoints = 0;

    questions.forEach(q => {
      maxPoints += q.points;
      const userAns = answers[q.id];

      if (q.type === 'mcq_single') {
        const correctOpt = q.options?.find(o => o.isCorrect);
        if (correctOpt && userAns === correctOpt.id) {
          earnedPoints += q.points;
        }
      } else if (q.type === 'numeric') {
        const num = parseFloat(userAns);
        if (!isNaN(num) && q.numericTarget !== undefined) {
          const tol = q.numericTolerance || 0.1;
          if (Math.abs(num - q.numericTarget) <= tol) {
            earnedPoints += q.points;
          }
        }
      } else if (q.type === 'ordering') {
        const userOrder = orderedItems[q.id] || [];
        if (q.correctOrder && JSON.stringify(userOrder) === JSON.stringify(q.correctOrder)) {
          earnedPoints += q.points;
        }
      } else if (q.type === 'hotspot') {
        // Hotspot target check (inverter is near center: 40-60%)
        const click = hotspotClicks[q.id];
        if (click && click.x >= 35 && click.x <= 65 && click.y >= 35 && click.y <= 65) {
          earnedPoints += q.points;
        }
      } else {
        // Voice viva / short text receives passing partial credit in mock
        if (userAns || voiceRecordings[q.id]) {
          earnedPoints += Math.round(q.points * 0.9);
        }
      }
    });

    const percentage = Math.round((earnedPoints / maxPoints) * 100);
    const passed = percentage >= assessment.passPercentage;

    const attempt: AssessmentAttempt = {
      id: `attempt_${Date.now()}`,
      assessmentId: assessment.id,
      userId: 'user_active',
      startedAt: new Date(Date.now() - (assessment.durationMinutes * 60 - timeLeftSec) * 1000).toISOString(),
      completedAt: new Date().toISOString(),
      score: earnedPoints,
      maxScore: maxPoints,
      percentage,
      passed,
      answers,
      voiceRecordings,
    };

    localStorage.removeItem(`urja_exam_${assessment.id}`);
    onComplete(attempt);
  };

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Top Integrity & Timer Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-sm border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="text-[11px] font-bold uppercase text-solar-600 bg-solar-50 px-2 py-0.5 rounded">
            Question {currentIndex + 1} of {questions.length}
          </span>
          <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mt-1">
            {assessment.title[lang] || assessment.title.en}
          </h2>
        </div>

        <div className="flex items-center gap-3">
          {tabBlurWarnings > 0 && (
            <div className="flex items-center gap-1 text-[11px] font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded-lg border border-rose-200">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
              <span>Tab switches: {tabBlurWarnings}</span>
            </div>
          )}

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 text-sun-400 font-mono font-bold text-sm shadow">
            <Timer className="w-4 h-4 text-sun-400 animate-spin" />
            <span>{formatTimer(timeLeftSec)}</span>
          </div>
        </div>
      </div>

      {/* Main Question Card */}
      {currentQ && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 dark:border-slate-800 space-y-6">
          {/* Question Prompt with Audio Button */}
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {currentQ.type.replace('_', ' ')} • {currentQ.points} Points
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
                {currentQ.prompt[lang] || currentQ.prompt.en}
              </h3>
            </div>

            <button
              onClick={() => speechService.speak(currentQ.prompt[lang] || currentQ.prompt.en)}
              className="p-2.5 rounded-2xl bg-sun-100 hover:bg-sun-200 text-amber-900 border border-sun-300 flex-shrink-0 transition-transform active:scale-95"
              aria-label="Read question aloud"
              title="Read question aloud"
            >
              <Volume2 className="w-5 h-5 text-amber-800" />
            </button>
          </div>

          {/* RENDER BY QUESTION TYPE */}

          {/* TYPE 1: MCQ SINGLE */}
          {currentQ.type === 'mcq_single' && currentQ.options && (
            <div className="space-y-2.5">
              {currentQ.options.map(opt => (
                <label
                  key={opt.id}
                  className={`flex items-center gap-3.5 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    answers[currentQ.id] === opt.id
                      ? 'border-solar-600 bg-solar-50/80 dark:bg-solar-950/60 font-semibold shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <input
                    type="radio"
                    name={`q_${currentQ.id}`}
                    value={opt.id}
                    checked={answers[currentQ.id] === opt.id}
                    onChange={() => saveAnswer(currentQ.id, opt.id)}
                    className="w-4 h-4 accent-solar-600 cursor-pointer"
                  />
                  <span className="text-sm text-slate-800 dark:text-slate-100">
                    {opt.text[lang] || opt.text.en}
                  </span>
                </label>
              ))}
            </div>
          )}

          {/* TYPE 2: NUMERIC ANSWER */}
          {currentQ.type === 'numeric' && (
            <div className="space-y-3">
              <div className="max-w-xs">
                <label className="text-xs font-semibold text-slate-500 mb-1 block">
                  Enter Calculated Numeric Value:
                </label>
                <input
                  type="number"
                  step="any"
                  value={answers[currentQ.id] || ''}
                  onChange={e => saveAnswer(currentQ.id, e.target.value)}
                  placeholder="e.g. 4 or 727"
                  className="w-full text-lg font-bold font-mono px-4 py-3 rounded-2xl border-2 border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:border-solar-600 outline-none"
                />
              </div>
            </div>
          )}

          {/* TYPE 3: IMAGE HOTSPOT (CLICK INVERTER IN SCHEMATIC) */}
          {currentQ.type === 'hotspot' && (
            <div className="space-y-3">
              <div className="text-xs text-slate-500 font-medium">
                Click directly on the component diagram to mark your answer:
              </div>
              <div
                onClick={e => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
                  const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
                  setHotspotClicks(prev => ({ ...prev, [currentQ.id]: { x, y } }));
                  saveAnswer(currentQ.id, { x, y });
                }}
                className="relative w-full aspect-video bg-slate-950 rounded-2xl overflow-hidden border-2 border-slate-800 cursor-crosshair shadow-inner"
              >
                {/* SVG Schematic Background */}
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  {/* Solar Array on left */}
                  <rect x="5" y="30" width="22" height="40" fill="#1D4ED8" rx="2" stroke="#60A5FA" strokeWidth="1" />
                  <text x="7" y="52" fill="#FFFFFF" fontSize="4" fontWeight="bold">PV Array</text>

                  {/* Arrow to Inverter */}
                  <line x1="28" y1="50" x2="40" y2="50" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="2 1" />

                  {/* Solar Inverter in Center */}
                  <rect x="42" y="35" width="22" height="30" fill="#047857" rx="3" stroke="#34D399" strokeWidth="1.5" />
                  <text x="44" y="52" fill="#FFFFFF" fontSize="4.5" fontWeight="bold">INVERTER</text>

                  {/* Arrow to Grid / Village */}
                  <line x1="65" y1="50" x2="75" y2="50" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="2 1" />

                  {/* Hub Distribution Box on right */}
                  <rect x="76" y="35" width="20" height="30" fill="#334155" rx="2" stroke="#94A3B8" strokeWidth="1" />
                  <text x="78" y="52" fill="#FFFFFF" fontSize="4" fontWeight="bold">Hub Loads</text>
                </svg>

                {/* Placed Crosshair Marker */}
                {hotspotClicks[currentQ.id] && (
                  <div
                    className="absolute w-6 h-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-sun-400 bg-amber-500/40 animate-ping pointer-events-none"
                    style={{
                      left: `${hotspotClicks[currentQ.id].x}%`,
                      top: `${hotspotClicks[currentQ.id].y}%`,
                    }}
                  />
                )}
              </div>
              {hotspotClicks[currentQ.id] && (
                <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4" />
                  <span>Component hotspot selected at coordinates ({hotspotClicks[currentQ.id].x}%, {hotspotClicks[currentQ.id].y}%)</span>
                </div>
              )}
            </div>
          )}

          {/* TYPE 4: ORDERING / SEQUENCE STEPS */}
          {currentQ.type === 'ordering' && currentQ.options && (
            <div className="space-y-3">
              <div className="text-xs text-slate-500 font-medium">
                Tap each step below to add it in chronological sequence:
              </div>
              <div className="space-y-2">
                {currentQ.options.map(step => {
                  const currentList = orderedItems[currentQ.id] || [];
                  const isPicked = currentList.includes(step.id);
                  const orderNum = currentList.indexOf(step.id) + 1;

                  return (
                    <button
                      key={step.id}
                      onClick={() => {
                        let nextList = [...currentList];
                        if (isPicked) {
                          nextList = nextList.filter(id => id !== step.id);
                        } else {
                          nextList.push(step.id);
                        }
                        setOrderedItems(prev => ({ ...prev, [currentQ.id]: nextList }));
                        saveAnswer(currentQ.id, nextList);
                      }}
                      className={`w-full text-left p-3.5 rounded-2xl border-2 flex items-center justify-between transition-all ${
                        isPicked
                          ? 'border-solar-600 bg-solar-50 text-solar-900 font-semibold'
                          : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-xs sm:text-sm">{step.text[lang] || step.text.en}</span>
                      {isPicked && (
                        <span className="w-6 h-6 rounded-full bg-solar-600 text-white font-bold text-xs flex items-center justify-center">
                          {orderNum}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* TYPE 5: VOICE VIVA RECORDING (INCLUSION FEATURE FOR LOW-LITERACY) */}
          {(currentQ.type === 'voice_viva' || currentQ.type === 'audio_prompt') && (
            <div className="space-y-3 p-4 bg-sun-50/50 dark:bg-slate-800 rounded-2xl border border-sun-200 dark:border-slate-700">
              <div className="text-xs font-bold text-amber-900 dark:text-amber-300">
                Spoken Voice Answer (Assessor Reviewed):
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    if (!isRecording) {
                      setIsRecording(true);
                      setTimeout(() => {
                        setIsRecording(false);
                        setVoiceRecordings(prev => ({
                          ...prev,
                          [currentQ.id]: 'simulated_audio_recording.webm',
                        }));
                        saveAnswer(currentQ.id, 'voice_response_saved');
                      }, 3000);
                    }
                  }}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
                    isRecording
                      ? 'bg-rose-600 text-white animate-pulse'
                      : 'bg-solar-600 hover:bg-solar-700 text-white shadow'
                  }`}
                >
                  {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  <span>{isRecording ? 'Recording Voice Answer (3s)...' : 'Hold to Record Voice Answer'}</span>
                </button>

                {voiceRecordings[currentQ.id] && (
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    <span>Voice recording attached!</span>
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Bottom Question Navigation Buttons */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-40 disabled:pointer-events-none transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            {currentIndex < questions.length - 1 ? (
              <button
                onClick={handleNext}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold bg-solar-600 hover:bg-solar-700 text-white shadow transition-all"
              >
                <span>Next Question</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg transition-all"
              >
                <span>Submit & View Results</span>
                <CheckCircle className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

