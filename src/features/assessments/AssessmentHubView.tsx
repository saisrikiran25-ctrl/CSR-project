import React, { useState } from 'react';
import { Assessment, AssessmentAttempt } from '../../types';
import { SEEDED_QUESTIONS } from '../../mocks/seedData';
import { AssessmentRunner } from './AssessmentRunner';
import { CertificateView } from '../certificates/CertificateView';
import { SEEDED_CERTIFICATE } from '../../mocks/seedData';
import {
  Award,
  Timer,
  CheckCircle,
  AlertCircle,
  RotateCcw,
  Sparkles,
  TrendingUp,
  FileCheck2,
} from 'lucide-react';

export const AssessmentHubView: React.FC = () => {
  const [activeExam, setActiveExam] = useState<Assessment | null>(null);
  const [examAttempt, setExamAttempt] = useState<AssessmentAttempt | null>(null);

  const availableAssessments: Assessment[] = [
    {
      id: 'exam_safety_micro',
      courseId: 'course_solar_flagship_600h',
      moduleId: 'mod_1_safety',
      type: 'micro_check',
      title: {
        gu: 'મોડ્યુલ ૧: વર્કપ્લેસ સેફ્ટી અને પીપીઇ ટેસ્ટ',
        hi: 'मॉड्यूल १: कार्यस्थल सुरक्षा एवं पीपीई टेस्ट',
        en: 'Module 1: Workplace Safety Culture & PPE Micro-Check',
      },
      description: {
        gu: '૧૦૦૦V ગ્લોવ્સ, સીડી ૪:૧ નિયમ અને ડીસી આર્ક સેફ્ટીની ઝડપી ચકાસણી.',
        hi: '१०००V ग्लव्स, सीढ़ी ४:१ नियम एवं डीसी आर्क सुरक्षा की त्वरित जांच।',
        en: 'Quick 3-question diagnostic on safety harnesses, dielectric gloves, and ladder angles.',
      },
      durationMinutes: 10,
      passPercentage: 60,
      totalMarks: 30,
      questionIds: ['q_safety_1', 'q_ladder_2'],
    },
    {
      id: 'exam_flagship_final',
      courseId: 'course_solar_flagship_600h',
      type: 'final_theory',
      title: {
        gu: 'સૂર્યમિત્ર સોલર પીવી ટેકનિશિયન - ફાઇનલ થિયરી પરીક્ષા',
        hi: 'सूर्यमित्र सोलर पीवी तकनीशियन - अंतिम थ्योरी परीक्षा',
        en: 'Solar PV Technician — Official Comprehensive Final Exam',
      },
      description: {
        gu: 'સંપૂર્ણ ૬૦૦ કલાકના અભ્યાસક્રમ આધારિત પ્રશ્નો: વાયરિંગ, ઇન્વર્ટર હોટસ્પોટ અને કાર્બન ગણતરી.',
        hi: '६०० घंटे के सूर्यमित्र कोर्स की पूर्ण परीक्षा: वायरिंग, इन्वर्टर एवं कार्बन गणित।',
        en: 'Flagship certification exam: Series/Parallel sizing, Inverter hotspots, installation sequence, and CO2 offset.',
      },
      durationMinutes: 20,
      passPercentage: 60,
      totalMarks: 75,
      questionIds: ['q_safety_1', 'q_ladder_2', 'q_series_3', 'q_hotspot_4', 'q_ordering_5', 'q_co2_6'],
      isFinalCertificateExam: true,
    },
    {
      id: 'exam_climate_co2',
      courseId: 'course_climate_water_saurashtra',
      type: 'practice_exam',
      title: {
        gu: 'સૌરાષ્ટ્ર ક્લાઇમેટ અને કાર્બન બચત ગણતરી ટેસ્ટ',
        hi: 'सौराष्ट्र जलवायु एवं कार्बन बचत गणना टेस्ट',
        en: 'Saurashtra Clean Energy & CO2 Calculation Practice',
      },
      description: {
        gu: '૧ kWh = ૦.૭૨૭ કિલો CO₂ ઉત્સર્જન ઘટાડાનું પ્રસ્તાવ ગણિત.',
        hi: '१ kWh = ०.७२७ किग्रा कार्बन डाइऑक्साइड बचत का गणित।',
        en: 'Practicing greenhouse gas offset equations used in Reliance CSR proposal.',
      },
      durationMinutes: 10,
      passPercentage: 60,
      totalMarks: 20,
      questionIds: ['q_co2_6'],
    },
  ];

  const handleExamComplete = (attempt: AssessmentAttempt) => {
    setExamAttempt(attempt);
    setActiveExam(null);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* If actively in an exam */}
      {activeExam ? (
        <AssessmentRunner
          assessment={activeExam}
          questions={SEEDED_QUESTIONS.filter(q => activeExam.questionIds.includes(q.id))}
          onComplete={handleExamComplete}
        />
      ) : examAttempt ? (
        /* SCORE REPORT VIEW */
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-md border border-slate-200 dark:border-slate-800 space-y-6">
          <div className="text-center space-y-2 border-b border-slate-200 dark:border-slate-800 pb-6">
            <div
              className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center ${
                examAttempt.passed ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
              }`}
            >
              {examAttempt.passed ? (
                <CheckCircle className="w-10 h-10" />
              ) : (
                <AlertCircle className="w-10 h-10" />
              )}
            </div>

            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {examAttempt.passed ? 'Congratulations! Exam Passed' : 'Assessment Incomplete'}
            </h2>

            <p className="text-xs text-slate-500">
              Submitted on {new Date(examAttempt.completedAt!).toLocaleTimeString()}
            </p>

            <div className="flex items-center justify-center gap-6 pt-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Your Score</span>
                <div className="text-3xl font-extrabold text-solar-700">
                  {examAttempt.percentage}%
                </div>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Total Points</span>
                <div className="text-3xl font-extrabold text-slate-900 dark:text-white">
                  {examAttempt.score} / {examAttempt.maxScore}
                </div>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Pass Mark</span>
                <div className="text-3xl font-extrabold text-emerald-600">60%</div>
              </div>
            </div>
          </div>

          {/* Competency Strengths & Weaknesses Breakdown */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Assessed Skill Performance Breakdown
            </h4>

            <div className="space-y-2">
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-slate-800 text-emerald-950 dark:text-emerald-300 flex items-center justify-between">
                <span>DC String Wiring & 1000V Dielectric Safety PPE</span>
                <strong className="text-emerald-700">100% (Mastered)</strong>
              </div>
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-slate-800 text-emerald-950 dark:text-emerald-300 flex items-center justify-between">
                <span>Solar Inverter Hotspot Identification & Anti-Islanding</span>
                <strong className="text-emerald-700">100% (Mastered)</strong>
              </div>
              <div className="p-3 rounded-xl bg-sun-50 dark:bg-slate-800 text-amber-950 dark:text-amber-300 flex items-center justify-between">
                <span>4:1 Ladder Slope Math & CO2 Factor Formula</span>
                <strong className="text-amber-800">Satisfactory</strong>
              </div>
            </div>
          </div>

          {/* If Passed Final Flagship, Unlock Sample Certificate */}
          {examAttempt.passed && (
            <div className="p-5 bg-gradient-to-r from-amber-50 to-sun-50 dark:bg-slate-800 rounded-2xl border border-sun-300 text-center space-y-3">
              <Sparkles className="w-6 h-6 text-sun-500 mx-auto" />
              <h3 className="text-base font-bold text-amber-950 dark:text-sun-300">
                Official Verifiable Certificate Unlocked!
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                You have met all Suryamitra curriculum requirements. Your credential has been registered in the platform registry.
              </p>

              <div className="pt-2">
                <CertificateView certificate={SEEDED_CERTIFICATE} />
              </div>
            </div>
          )}

          <div className="flex justify-center pt-2">
            <button
              onClick={() => setExamAttempt(null)}
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-slate-800 text-white font-bold text-xs shadow hover:bg-slate-900 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Back to Assessment Hub</span>
            </button>
          </div>
        </div>
      ) : (
        /* ASSESSMENT HUB DIRECTORY */
        <>
          {/* Header */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-solar-600 uppercase tracking-wider bg-solar-50 px-2.5 py-0.5 rounded">
                Assessment & Certification Hub
              </span>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
                Vocational Tests & Micro-Credentials
              </h1>
              <p className="text-xs text-slate-500">
                Third-party evaluated quizzes, hands-on rubrics, and fraud-proof digital certificates.
              </p>
            </div>
          </div>

          {/* List of Assessments */}
          <div className="space-y-4">
            {availableAssessments.map(exam => (
              <div
                key={exam.id}
                className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm hover:shadow-md border border-slate-200 dark:border-slate-800 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 max-w-xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 uppercase">
                      {exam.type.replace('_', ' ')}
                    </span>
                    {exam.isFinalCertificateExam && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-slate-950">
                        CERTIFICATE ELIGIBLE
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {exam.title.en}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed">
                    {exam.description.en}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-slate-400 font-medium pt-1">
                    <div className="flex items-center gap-1">
                      <Timer className="w-3.5 h-3.5 text-sun-500" />
                      <span>{exam.durationMinutes} Minutes</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Pass Mark: {exam.passPercentage}%</span>
                    </div>
                    <div>{exam.questionIds.length} Questions</div>
                  </div>
                </div>

                <button
                  onClick={() => setActiveExam(exam)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-solar-600 hover:bg-solar-700 text-white font-bold text-xs shadow-md transition-all active:scale-95 whitespace-nowrap"
                >
                  <Award className="w-4 h-4" />
                  <span>Start Assessment</span>
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

