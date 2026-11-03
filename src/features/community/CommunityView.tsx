import React, { useState } from 'react';
import {
  MessageSquare,
  Mic,
  MicOff,
  Send,
  ThumbsUp,
  User,
  Shield,
  HelpCircle,
  Volume2,
} from 'lucide-react';
import { speechService } from '../../lib/speech';

export const CommunityView: React.FC = () => {
  const [threads, setThreads] = useState([
    {
      id: 'T01',
      author: 'Meera Ben Rathod',
      cluster: 'Moti Khavdi',
      topic: 'How to clean solar panels safely during dust storms without scratching glass?',
      category: 'O&M Practical',
      likes: 12,
      replies: [
        {
          author: 'Amit Patel (Master Trainer)',
          text: 'Always clean during early morning or late evening when panels are cool to prevent thermal glass shock. Use de-ionized water and soft microfiber mops.',
        },
      ],
    },
    {
      id: 'T02',
      author: 'Kavita Parmar',
      cluster: 'Jambuda',
      topic: 'What is the best tray temperature inside solar dryers for drying cumin and coriander?',
      category: 'SHG Solar Dryers',
      likes: 8,
      replies: [
        {
          author: 'Bhavna Ben (Coordinator)',
          text: 'Keep temperature below 48°C so essential oils and fragrance do not evaporate! Check top ventilation dampers.',
        },
      ],
    },
  ]);

  const [newQuestion, setNewQuestion] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;
    setThreads([
      {
        id: `T_${Date.now()}`,
        author: 'You (Learner)',
        cluster: 'My Hub',
        topic: newQuestion,
        category: 'General Technical',
        likes: 1,
        replies: [],
      },
      ...threads,
    ]);
    setNewQuestion('');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-solar-600 bg-solar-50 px-2.5 py-0.5 rounded">
            Village Peer & Mentor Layer
          </span>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
            Community Discussions & Ask-a-Trainer
          </h1>
          <p className="text-xs text-slate-500">
            Voice-guided Q&A, women SHG circles, and peer technician troubleshooting.
          </p>
        </div>
      </div>

      {/* Post New Question Box */}
      <form onSubmit={handlePost} className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 space-y-3">
        <h3 className="text-xs font-bold text-slate-500">
          Ask a Question or Share Hub Experience:
        </h3>
        <textarea
          rows={3}
          value={newQuestion}
          onChange={e => setNewQuestion(e.target.value)}
          placeholder="Type your solar installation question or practical doubt here..."
          className="w-full text-xs font-medium p-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:border-solar-600"
        />

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              setIsRecording(true);
              setTimeout(() => {
                setIsRecording(false);
                setNewQuestion('Simulated Spoken Question: How do we wire bypass diodes inside the combiner box?');
              }, 2500);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              isRecording ? 'bg-rose-600 text-white ' : 'bg-sun-100 text-amber-900'
            }`}
          >
            {isRecording ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
            <span>{isRecording ? 'Recording Voice Note (3s)...' : 'Record Voice Question'}</span>
          </button>

          <button
            type="submit"
            className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-solar-600 hover:bg-solar-700 text-white font-bold text-xs shadow"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Post to Forum</span>
          </button>
        </div>
      </form>

      {/* Threads List */}
      <div className="space-y-4">
        {threads.map(t => (
          <div
            key={t.id}
            className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-xs font-bold bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-600">
                  {t.category}
                </span>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                  {t.topic}
                </h3>
                <div className="text-xs text-slate-400 mt-0.5">
                  Asked by <strong>{t.author}</strong> ({t.cluster})
                </div>
              </div>

              <button
                onClick={() => speechService.speak(`${t.topic}. Answer: ${t.replies[0]?.text || ''}`)}
                className="p-2 rounded-xl bg-sun-100 text-amber-800 flex-shrink-0"
                aria-label="Read discussion aloud"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            {t.replies.map((r, i) => (
              <div
                key={i}
                className="p-3.5 bg-cream-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs space-y-1"
              >
                <div className="font-bold text-solar-700 dark:text-solar-400 flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5 text-solar-600" />
                  <span>{r.author}</span>
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{r.text}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

