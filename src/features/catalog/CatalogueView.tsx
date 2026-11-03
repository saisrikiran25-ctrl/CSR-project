import React, { useState, useEffect } from 'react';
import { Course, CourseStream } from '../../types';
import { db } from '../../lib/db';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Clock,
  Award,
  Zap,
  Filter,
  Search,
  CheckCircle,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export const CatalogueView: React.FC = () => {
  const { t, i18n } = useTranslation();
  const lang = (i18n.language || 'gu') as 'gu' | 'hi' | 'en';

  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedStream, setSelectedStream] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      const data = await db.courses.toArray();
      setCourses(data);
    };
    fetchCourses();
  }, []);

  const filteredCourses = courses.filter(c => {
    const matchStream = selectedStream === 'ALL' || c.stream === selectedStream;
    const matchSearch =
      c.title[lang]?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.title.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.code.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStream && matchSearch;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-solar-700 to-solar-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sun-300 bg-sun-400/20 px-3 py-1 rounded-full border border-sun-400/30">
            Vocational Course Catalogue • અભ્યાસક્રમો
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold mt-2 tracking-tight">
            Solar Technical & Livelihood Tracks
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Suryamitra-aligned 600-hour technician training, Women SHG solar food processing, and workplace readiness.
          </p>
        </div>

        <Link
          to="/learn/course_solar_flagship_600h/les_1_1_ppe_intro"
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-sun-500 hover:bg-sun-600 text-slate-950 font-bold text-xs shadow-lg transition-all active:scale-95"
        >
          <Sparkles className="w-4 h-4 text-slate-950" />
          <span>Resume Flagship Lesson →</span>
        </Link>
      </div>

      {/* Filters & Search Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Stream Pills */}
        <div className="flex flex-wrap gap-1.5 text-xs font-bold">
          {[
            { id: 'ALL', label: 'All Streams' },
            { id: 'B', label: 'Stream B: Technical (PV)' },
            { id: 'C', label: 'Stream C: Women SHG' },
            { id: 'D', label: 'Stream D: Placement' },
            { id: 'A', label: 'Stream A: Solar & Climate' },
          ].map(s => (
            <button
              key={s.id}
              onClick={() => setSelectedStream(s.id)}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                selectedStream === s.id
                  ? 'bg-solar-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search courses or topics..."
            className="w-full text-xs font-medium pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:border-solar-600"
          />
        </div>
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map(course => (
          <div
            key={course.id}
            className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200 dark:border-slate-800 transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Thumbnail / Header */}
              <div className="relative h-44 overflow-hidden bg-slate-950">
                <img
                  src={course.thumbnail}
                  alt={course.title.en}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                {/* Stream Badge */}
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-900/90 text-sun-300 backdrop-blur-md border border-white/10 uppercase">
                    Stream {course.stream}
                  </span>
                  {course.isFlagship && (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500 text-slate-950 shadow">
                      FLAGSHIP
                    </span>
                  )}
                  {course.isWomenCentric && (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-600 text-white shadow">
                      WOMEN SHG
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] font-mono text-slate-300 font-semibold">{course.code}</span>
                  <h3 className="text-sm font-bold line-clamp-1 leading-tight mt-0.5">
                    {course.title[lang] || course.title.en}
                  </h3>
                </div>
              </div>

              {/* Course Body */}
              <div className="p-5 space-y-3">
                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                  {course.description[lang] || course.description.en}
                </p>

                <div className="flex items-center gap-4 text-[11px] font-semibold text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-solar-500" />
                    <span>{course.durationHours} Hours</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-amber-500" />
                    <span>{course.modulesCount} Modules</span>
                  </div>
                  {course.nsqfLevel && (
                    <div className="flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-emerald-500" />
                      <span>NSQF Level {course.nsqfLevel}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Enrol / Open Button */}
            <div className="p-5 pt-0">
              <Link
                to={`/learn/${course.id}`}
                className="w-full py-2.5 rounded-xl bg-solar-50 hover:bg-solar-600 text-solar-700 hover:text-white font-bold text-xs border border-solar-200 transition-all flex items-center justify-center gap-1.5"
              >
                <span>View Syllabus & Lessons</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

