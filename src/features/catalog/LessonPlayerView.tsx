import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Course, Lesson } from '../../types';
import { db } from '../../lib/db';
import { TriModalPlayer } from '../player/TriModalPlayer';
import { ArrowLeft, CheckCircle, Award } from 'lucide-react';

export const LessonPlayerView: React.FC = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState<Course | null>(null);
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const fetchLesson = async () => {
      if (!courseId || !lessonId) return;
      const foundCourse = await db.courses.get(courseId);
      if (foundCourse) {
        setCourse(foundCourse);
        for (const m of foundCourse.modules) {
          const l = m.lessons.find(item => item.id === lessonId);
          if (l) {
            setLesson(l);
            break;
          }
        }
      }
    };
    fetchLesson();
  }, [courseId, lessonId]);

  if (!course || !lesson) {
    return <div className="p-8 text-center text-slate-500">Loading lesson player...</div>;
  }

  const handleLessonComplete = () => {
    setIsCompleted(true);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Back Navigation Bar */}
      <div className="flex items-center justify-between">
        <Link
          to={`/learn/${course.id}`}
          className="flex items-center gap-1.5 text-xs font-bold text-solar-600 dark:text-solar-400 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Course Outline</span>
        </Link>

        {isCompleted && (
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 animate-bounce">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Lesson Completed (+0.5h Logged)</span>
          </div>
        )}
      </div>

      {/* Tri-Modal Player Core Component */}
      <TriModalPlayer lesson={lesson} onComplete={handleLessonComplete} />

      {/* Action Footer for Next Steps */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
            Ready to test your knowledge?
          </h4>
          <p className="text-xs text-slate-500">
            Pass the module micro-check to earn competency points toward your certificate.
          </p>
        </div>

        <Link
          to="/tests"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sun-500 hover:bg-sun-600 text-slate-950 font-bold text-xs shadow-md transition-all active:scale-95"
        >
          <Award className="w-4 h-4 text-slate-950" />
          <span>Take Module Assessment →</span>
        </Link>
      </div>
    </div>
  );
};

