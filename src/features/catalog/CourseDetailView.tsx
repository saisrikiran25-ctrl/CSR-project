import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Course } from '../../types';
import { db } from '../../lib/db';
import { useTranslation } from 'react-i18next';
import {
  Clock,
  Award,
  Layers,
  ChevronDown,
  ChevronRight,
  Play,
  Volume2,
  Video,
  Presentation,
  CheckCircle,
  FileCheck2,
} from 'lucide-react';

export const CourseDetailView: React.FC = () => {
  const { courseId } = useParams();
  const { t, i18n } = useTranslation();
  const lang = (i18n.language || 'gu') as 'gu' | 'hi' | 'en';
  const navigate = useNavigate();

  const [course, setCourse] = useState<Course | null>(null);
  const [openModuleId, setOpenModuleId] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      if (!courseId) return;
      const found = await db.courses.get(courseId);
      if (found) {
        setCourse(found);
        if (found.modules.length > 0) {
          setOpenModuleId(found.modules[0].id);
        }
      }
    };
    fetchCourse();
  }, [courseId]);

  if (!course) {
    return <div className="p-8 text-center text-slate-500">Loading course outline...</div>;
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Course Banner */}
      <div className="bg-gradient-to-r from-solar-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-sun-500 text-slate-950">
            Stream {course.stream}
          </span>
          <span className="text-xs font-mono text-slate-300 font-bold">{course.code}</span>
          {course.nsqfLevel && (
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/10 text-emerald-300 border border-white/20">
              NSQF Level {course.nsqfLevel}
            </span>
          )}
        </div>

        <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight">
          {course.title[lang] || course.title.en}
        </h1>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
          {course.description[lang] || course.description.en}
        </p>

        <div className="flex flex-wrap gap-4 text-xs font-semibold pt-2 text-slate-300">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-sun-400" />
            <span>Total Duration: <strong>{course.durationHours} Hours</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-solar-400" />
            <span>{course.modulesCount} Structured Modules</span>
          </div>
        </div>
      </div>

      {/* Modules & Lessons Accordion */}
      <div className="space-y-4">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
          Course Syllabus & Lesson Modules
        </h2>

        {course.modules.length === 0 ? (
          <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 text-xs text-slate-500">
            Syllabus outline active. Full multimedia modules in preparation for upcoming cohorts.
          </div>
        ) : (
          course.modules.map(module => {
            const isOpen = openModuleId === module.id;

            return (
              <div
                key={module.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm transition-all"
              >
                {/* Module Header Bar */}
                <button
                  onClick={() => setOpenModuleId(isOpen ? null : module.id)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-solar-600 bg-solar-50 px-2 py-0.5 rounded">
                      Module {module.order} • {module.durationHours} Hours
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                      {module.title[lang] || module.title.en}
                    </h3>
                  </div>

                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Lessons in Module */}
                {isOpen && (
                  <div className="p-4 sm:p-5 pt-0 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
                    {module.lessons.map(lesson => (
                      <div
                        key={lesson.id}
                        className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-solar-500 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-cream-50/40 dark:bg-slate-800/40"
                      >
                        <div className="space-y-1">
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                            {lesson.title[lang] || lesson.title.en}
                          </h4>
                          <p className="text-[11px] text-slate-500 line-clamp-1">
                            {lesson.summary[lang] || lesson.summary.en}
                          </p>

                          {/* Supported Modes */}
                          <div className="flex items-center gap-1.5 pt-1 text-[10px] text-slate-400 font-semibold">
                            <span>Available in:</span>
                            {lesson.modes.includes('audio') && (
                              <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                                <Volume2 className="w-3 h-3 text-solar-600" /> Audio
                              </span>
                            )}
                            {lesson.modes.includes('video') && (
                              <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                                <Video className="w-3 h-3 text-emerald-600" /> Video
                              </span>
                            )}
                            {lesson.modes.includes('av') && (
                              <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                                <Presentation className="w-3 h-3 text-amber-600" /> AV Diagram
                              </span>
                            )}
                          </div>
                        </div>

                        <Link
                          to={`/learn/${course.id}/${lesson.id}`}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-solar-600 hover:bg-solar-700 text-white font-bold text-xs shadow-sm transition-all"
                        >
                          <Play className="w-3.5 h-3.5" />
                          <span>Start Lesson</span>
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

