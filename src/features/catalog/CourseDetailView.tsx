import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Course } from '../../types';
import { db } from '../../lib/db';
import { useTranslation } from 'react-i18next';
import { Clock, Layers, ChevronDown, Play, Volume2, Video, Presentation } from 'lucide-react';

export const CourseDetailView: React.FC = () => {
  const { courseId } = useParams();
  const { t, i18n } = useTranslation();
  const lang = (i18n.language || 'gu') as 'gu' | 'hi' | 'en';

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
    return <div className="p-8 text-center text-slate-500">{t('course.loading')}</div>;
  }

  const totalLessons = course.modules.reduce((n, m) => n + m.lessons.length, 0);
  const firstLesson = course.modules[0]?.lessons[0];

  return (
    <div className="space-y-6">
      {/* Course Banner */}
      <div className="rounded-2xl bg-ink-900 text-white p-6 sm:p-10 relative overflow-hidden">
        <div className="relative space-y-4 max-w-3xl">
          <Link to="/learn" className="text-xs text-slate-300 hover:text-white">
            {t('course.back')}
          </Link>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="px-2.5 py-0.5 rounded-full font-semibold bg-white/15">{t('catalogue.stream')} {course.stream}</span>
            <span className="font-mono text-slate-300">{course.code}</span>
            {course.nsqfLevel && (
              <span className="px-2.5 py-0.5 rounded-full font-semibold bg-emerald-500/20 text-emerald-300">
                NSQF Level {course.nsqfLevel}
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold leading-tight">
            {course.title[lang] || course.title.en}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {course.description[lang] || course.description.en}
          </p>

          <div className="flex flex-wrap gap-5 text-sm text-slate-200 pt-1">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-sun-400" /> {course.durationHours} {t('course.hours')}
            </div>
            <div className="flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-sun-400" /> {course.modulesCount} {t('catalogue.modules')}
            </div>
            {totalLessons > 0 && (
              <div className="flex items-center gap-1.5">
                <Play className="w-4 h-4 text-sun-400" /> {totalLessons} {t('course.lessons')}
              </div>
            )}
          </div>

          {firstLesson && (
            <Link
              to={`/learn/${course.id}/${firstLesson.id}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-solar-500 hover:bg-solar-400 text-white font-semibold text-sm transition-colors mt-2"
            >
              <Play className="w-4 h-4" /> {t('course.start_course')}
            </Link>
          )}
        </div>
      </div>

      {/* Syllabus */}
      <div className="space-y-3">
        <h2 className="text-lg font-bold text-slate-900">{t('course.content')}</h2>

        {course.modules.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-xl border border-dashed border-slate-300 text-sm text-slate-500">
            {t('course.empty')}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-200 overflow-hidden">
            {course.modules.map(module => {
              const isOpen = openModuleId === module.id;

              return (
                <div key={module.id}>
                  <button
                    onClick={() => setOpenModuleId(isOpen ? null : module.id)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-3 hover:bg-slate-50 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-4">
                      <span className="w-8 h-8 rounded-full bg-solar-50 text-solar-700 text-sm font-bold flex items-center justify-center flex-shrink-0">
                        {module.order}
                      </span>
                      <div>
                        <h3 className="text-sm font-semibold text-slate-900">
                          {module.title[lang] || module.title.en}
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {module.lessons.length} {t('course.lessons')} · {module.durationHours} {t('catalogue.h')}
                        </p>
                      </div>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 transition-transform flex-shrink-0 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="bg-slate-50/60 divide-y divide-slate-100">
                      {module.lessons.map(lesson => (
                        <div
                          key={lesson.id}
                          className="px-5 py-4 sm:pl-[4.25rem] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                        >
                          <div className="space-y-1.5 min-w-0">
                            <h4 className="text-sm font-semibold text-slate-900">
                              {lesson.title[lang] || lesson.title.en}
                            </h4>
                            <p className="text-xs text-slate-500 line-clamp-2">
                              {lesson.summary[lang] || lesson.summary.en}
                            </p>
                            <div className="flex items-center gap-1.5 text-xs text-slate-600">
                              {lesson.modes.includes('audio') && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white border border-slate-200">
                                  <Volume2 className="w-3 h-3 text-solar-600" /> {t('course.audio')}
                                </span>
                              )}
                              {lesson.modes.includes('video') && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white border border-slate-200">
                                  <Video className="w-3 h-3 text-emerald-600" /> {t('course.video')}
                                </span>
                              )}
                              {lesson.modes.includes('av') && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white border border-slate-200">
                                  <Presentation className="w-3 h-3 text-amber-600" /> {t('course.interactive')}
                                </span>
                              )}
                            </div>
                          </div>

                          <Link
                            to={`/learn/${course.id}/${lesson.id}`}
                            className="inline-flex items-center justify-center gap-1.5 px-5 py-2 rounded-full border border-solar-600 text-solar-700 hover:bg-solar-600 hover:text-white font-semibold text-sm transition-colors flex-shrink-0"
                          >
                            <Play className="w-3.5 h-3.5" /> {t('course.start')}
                          </Link>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
