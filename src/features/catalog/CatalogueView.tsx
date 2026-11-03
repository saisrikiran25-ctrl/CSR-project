import React, { useState, useEffect } from 'react';
import { Course } from '../../types';
import { db } from '../../lib/db';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { CourseThumb } from '../../components/CourseThumb';
import { BookOpen, Clock, Award, Search, Star } from 'lucide-react';

const STREAMS = [
  { id: 'ALL', label: 'All' },
  { id: 'B', label: 'Technical (PV)' },
  { id: 'C', label: 'Women SHG' },
  { id: 'D', label: 'Placement' },
  { id: 'A', label: 'Solar & Climate' },
];

export const CatalogueView: React.FC = () => {
  const { i18n } = useTranslation();
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
    const q = searchQuery.toLowerCase();
    const matchSearch =
      c.title[lang]?.toLowerCase().includes(q) ||
      c.title.en.toLowerCase().includes(q) ||
      c.code.toLowerCase().includes(q);
    return matchStream && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Courses</h1>
          <p className="text-sm text-slate-600 mt-1 max-w-xl">
            Suryamitra-aligned technician training, women-led solar enterprise and workplace readiness.
          </p>
        </div>
        <Link
          to="/learn/course_solar_flagship_600h/les_1_1_ppe_intro"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-solar-600 hover:bg-solar-700 text-white font-semibold text-sm transition-colors self-start md:self-auto"
        >
          <Star className="w-4 h-4" />
          Resume flagship lesson
        </Link>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {STREAMS.map(s => (
            <button
              key={s.id}
              onClick={() => setSelectedStream(s.id)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors ${
                selectedStream === s.id
                  ? 'bg-solar-600 border-solar-600 text-white'
                  : 'bg-white border-slate-300 text-slate-700 hover:border-slate-500'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="relative sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search courses or topics"
            className="w-full text-sm pl-10 pr-4 py-2.5 rounded-full border border-slate-300 bg-white outline-none focus:border-solar-600 focus:ring-2 focus:ring-solar-100"
          />
        </div>
      </div>

      <p className="text-xs text-slate-500">
        {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'}
      </p>

      {/* Course Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCourses.map(course => (
          <Link
            key={course.id}
            to={`/learn/${course.id}`}
            className="bg-white rounded-xl overflow-hidden border border-slate-200 hover:border-slate-300 hover:border-slate-300 transition-all flex flex-col group"
          >
            <div className="relative">
              <CourseThumb
                src={course.thumbnail}
                alt={course.title.en}
                stream={course.stream}
                className="aspect-video"
              />
              <div className="absolute top-3 left-3 flex gap-1.5">
                {course.isFlagship && (
                  <span className="px-2 py-0.5 rounded text-xs font-bold bg-amber-400 text-slate-900">
                    FLAGSHIP
                  </span>
                )}
                {course.isWomenCentric && (
                  <span className="px-2 py-0.5 rounded text-xs font-bold bg-rose-600 text-white">
                    WOMEN SHG
                  </span>
                )}
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col">
              <div className="text-xs font-semibold text-slate-500 ">
                Stream {course.stream} · {course.code}
              </div>
              <h3 className="text-base font-bold text-slate-900 mt-1 leading-snug line-clamp-2 group-hover:text-solar-700 transition-colors">
                {course.title[lang] || course.title.en}
              </h3>
              <p className="text-sm text-slate-600 mt-2 line-clamp-3 leading-relaxed flex-1">
                {course.description[lang] || course.description.en}
              </p>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 pt-4 mt-4 border-t border-slate-100">
                <span className="inline-flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {course.durationHours} h
                </span>
                <span className="inline-flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5" /> {course.modulesCount} modules
                </span>
                {course.nsqfLevel && (
                  <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
                    <Award className="w-3.5 h-3.5" /> NSQF {course.nsqfLevel}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-16 bg-white rounded-xl border border-dashed border-slate-300 text-sm text-slate-500">
          No courses match your search. Try a different keyword or stream.
        </div>
      )}
    </div>
  );
};
