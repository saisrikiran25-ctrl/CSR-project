import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { speechService } from '../../lib/speech';
import {
  Volume2,
  CheckCircle,
  HelpCircle,
  Star,
  ArrowRight,
  BookOpen,
} from 'lucide-react';

export const ReadinessQuizView: React.FC = () => {
  const navigate = useNavigate();
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      prompt: 'તમે સામાન્ય રીતે નવી વસ્તુઓ કેવી રીતે ઝડપથી શીખો છો? (How do you prefer learning?)',
      audioText: 'How do you prefer learning? By listening, watching videos, or doing hands-on practicals?',
      options: [
        { id: 'av', label: 'ચિત્રો અને વીડિયો જોઈને (Visual / Video)' },
        { id: 'audio', label: 'વાતો અને ઓડિયો સાંભળીને (Audio / Podcast)' },
        { id: 'hands_on', label: 'સીધા હાથથી પ્રેક્ટિકલ કરીને (Hands-on Lab)' },
      ],
    },
    {
      prompt: 'વીજળીનો મૂળભૂત નિયમ: પ્લગમાં વાયર લગાવતી વખતે શું સૌથી જરૂરી છે?',
      audioText: 'What is most important when handling electric wires? Proper insulation or touching bare wire?',
      options: [
        { id: 'insulation', label: 'વાયર પર સુરક્ષિત રબર ઇન્સ્યુલેશન હોવું જરૂરી છે (Correct)' },
        { id: 'bare', label: 'ખુલ્લા વાયરને હાથ લગાવી શકાય' },
      ],
    },
    {
      prompt: 'સરળ ગણિત: જો ૨ સોલર પેનલ દરરોજ ૨-૨ યુનિટ બનાવે, તો કુલ કેટલા યુનિટ થાય?',
      audioText: 'If 2 solar panels make 2 units each per day, how many total units is that? 4 units or 10 units?',
      options: [
        { id: '4', label: '૪ યુનિટ (૨ + ૨ = ૪) (Correct)' },
        { id: '10', label: '૧૦ યુનિટ' },
      ],
    },
    {
      prompt: 'સ્માર્ટફોન અનુભવ: શું તમે યુપીઆઈ (UPI) કે વોટ્સએપ વાપરો છો?',
      audioText: 'Do you use WhatsApp or UPI payments on your mobile phone?',
      options: [
        { id: 'regular', label: 'હા, નિયમિત વાપરું છું (Comfortable with Mobile)' },
        { id: 'learning', label: 'હું હજુ શીખી રહ્યો/રહી છું (Needs digital basics)' },
      ],
    },
  ];

  const handleSelect = (optId: string) => {
    setAnswers({ ...answers, [qIndex]: optId });
    if (qIndex < questions.length - 1) {
      setQIndex(qIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const currentQ = questions[qIndex];

  return (
    <div className="max-w-xl mx-auto py-8 space-y-6">
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 space-y-6">
        {!showResults ? (
          <>
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <span className="text-xs font-bold text-solar-600 bg-solar-50 px-2 py-0.5 rounded">
                  Readiness Diagnostic • Question {qIndex + 1} of {questions.length}
                </span>
                <h2 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                  Learning Style & Awareness Check
                </h2>
              </div>

              <button
                onClick={() => speechService.speak(currentQ.audioText)}
                className="p-2.5 rounded-2xl bg-sun-100 text-amber-900 border border-sun-300"
                aria-label="Read Question"
              >
                <Volume2 className="w-5 h-5 text-amber-800" />
              </button>
            </div>

            <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 leading-relaxed">
              {currentQ.prompt}
            </p>

            <div className="space-y-3">
              {currentQ.options.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => handleSelect(opt.id)}
                  className="w-full text-left p-4 rounded-2xl border-2 border-slate-200 dark:border-slate-800 hover:border-solar-600 hover:bg-solar-50 dark:hover:bg-slate-800 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 transition-all flex items-center justify-between"
                >
                  <span>{opt.label}</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center space-y-5 py-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle className="w-10 h-10" />
            </div>

            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Diagnostic Complete! • સ્વાગત છે
            </h2>

            <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
              Based on your responses, we have customized your default player to <strong>Audio-Visual diagram mode</strong> with spoken Gujarati narration.
            </p>

            <div className="p-4 bg-sun-50 dark:bg-slate-800 rounded-2xl border border-sun-200 text-left text-xs space-y-1">
              <span className="font-bold text-amber-900 dark:text-sun-300">Recommended Next Step:</span>
              <p className="text-slate-700 dark:text-slate-300">
                You are assigned to <strong>Solar PV Technician (Suryamitra Flagship - 600h)</strong> at your village hub.
              </p>
            </div>

            <button
              onClick={() => navigate('/learn')}
              className="w-full py-3.5 rounded-2xl bg-solar-600 hover:bg-solar-700 text-white font-bold text-xs transition-all"
            >
              Start Lesson 1.1: Workplace Safety & PPE →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

