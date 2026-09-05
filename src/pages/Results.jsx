import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import Breadcrumb from '../components/Breadcrumb';
import SectionHeader from '../components/SectionHeader';
import {
  Trophy, Award, User, GraduationCap, Sparkles, CheckCircle2,
  ChevronRight, Users, ArrowUpRight, Search, Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../context/DataContext';

// 4 Standard FBISE Academic Classes
const ACADEMIC_CLASSES = [
  {
    key: '10th',
    title: '10th Class',
    subtitle: 'SSC-II (Matriculation)',
    shortBadge: 'Grade 10',
    icon: Trophy,
    colorAccent: 'border-amber-500/30 text-amber-600 bg-amber-50/80',
    topBadge: '10th Board Merits'
  },
  {
    key: '9th',
    title: '9th Class',
    subtitle: 'SSC-I (Secondary)',
    shortBadge: 'Grade 9',
    icon: Award,
    colorAccent: 'border-sky-500/30 text-sky-600 bg-sky-50/80',
    topBadge: '9th Board Merits'
  },
  {
    key: '11th',
    title: '1st Year',
    subtitle: 'HSSC-I (College Level)',
    shortBadge: '11th Class',
    icon: GraduationCap,
    colorAccent: 'border-indigo-500/30 text-indigo-600 bg-indigo-50/80',
    topBadge: '1st Year Merits'
  },
  {
    key: '12th',
    title: '2nd Year',
    subtitle: 'HSSC-II (College Senior)',
    shortBadge: '12th Class',
    icon: Sparkles,
    colorAccent: 'border-emerald-500/30 text-emerald-600 bg-emerald-50/80',
    topBadge: '2nd Year Merits'
  }
];

function getStudentClassKey(item) {
  const exam = (item?.examination || '').toLowerCase();
  if (exam.includes('10') || exam.includes('matric') || exam.includes('ssc-ii') || exam.includes('tenth')) return '10th';
  if (exam.includes('9') || exam.includes('ninth') || exam.includes('ssc-i')) return '9th';
  if (exam.includes('12') || exam.includes('2nd year') || exam.includes('second year') || exam.includes('hssc-ii') || exam.includes('twelfth')) return '12th';
  if (exam.includes('11') || exam.includes('1st year') || exam.includes('first year') || exam.includes('hssc-i') || exam.includes('eleventh')) return '11th';
  return '10th';
}

export default function Results() {
  const { results = [] } = useData();
  const [activeClassTab, setActiveClassTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Group and sort students by class
  const studentsByClass = useMemo(() => {
    const groups = { '10th': [], '9th': [], '11th': [], '12th': [] };
    results.forEach((item) => {
      const key = getStudentClassKey(item);
      if (groups[key]) {
        groups[key].push(item);
      } else {
        groups['10th'].push(item);
      }
    });

    // Ensure sorted by sort_order
    Object.keys(groups).forEach(k => {
      groups[k].sort((a, b) => (Number(a.sort_order) || 99) - (Number(b.sort_order) || 99));
    });

    return groups;
  }, [results]);

  // Filtered list based on active tab and search query
  const displayedResults = useMemo(() => {
    let list = [];
    if (activeClassTab === 'all') {
      // Ordered: 10th, 9th, 11th, 12th
      list = [
        ...(studentsByClass['10th'] || []),
        ...(studentsByClass['9th'] || []),
        ...(studentsByClass['11th'] || []),
        ...(studentsByClass['12th'] || [])
      ];
    } else {
      list = studentsByClass[activeClassTab] || [];
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(item => 
        (item.student_name || '').toLowerCase().includes(q) ||
        (item.examination || '').toLowerCase().includes(q) ||
        (item.score || '').toLowerCase().includes(q)
      );
    }

    return list;
  }, [activeClassTab, studentsByClass, searchQuery]);

  const handleSelectClass = (classKey) => {
    setActiveClassTab(classKey);
    const target = document.getElementById('results-roster-section');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <Helmet>
        <title>Academic Results & Toppers | Air Foundation School & College</title>
      </Helmet>

      {/* Hero Title Section */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="bg-secondary/20 text-secondary border border-secondary/30 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider">
              Federal Board (FBISE)
            </span>
            <span className="bg-white/10 text-slate-200 text-xs px-3 py-1 rounded-full font-medium">
              Secondary & Higher Secondary Education
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-poppins">Examination Results</h1>
          <p className="text-slate-200 text-sm sm:text-base mt-4 max-w-2xl">
            Celebrating academic distinctions, board merit positions, and 100% success across 9th, 10th, 1st Year, and 2nd Year.
          </p>
        </div>
      </section>

      {/* Breadcrumb Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumb title="Results" />
      </div>

      <section className="py-12 bg-slate-50/50 font-inter">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

          {/* 1. TOP POSITION SHOWCASE: 4 Equal Columns for 10th, 9th, 1st Year & 2nd Year */}
          <div className="space-y-6 text-left">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-slate-200/80">
              <div>
                <div className="flex items-center space-x-2 text-primary font-bold text-xs uppercase tracking-wider mb-1">
                  <Star size={16} className="text-secondary fill-secondary" />
                  <span>Equal Recognition & Merit Display</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-poppins text-slate-900">
                  FBISE Board Distinction Holders
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Top rankers from each of the four federal board classes displayed side-by-side at a glance.
                </p>
              </div>

              <span className="text-xs text-slate-400 font-semibold bg-white border border-slate-200 px-3.5 py-1.5 rounded-full shrink-0 w-fit">
                4 Academic Levels
              </span>
            </div>

            {/* 4 Equal Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {ACADEMIC_CLASSES.map((cls, idx) => {
                const classStudents = studentsByClass[cls.key] || [];
                const topper = classStudents[0];
                const Icon = cls.icon;

                const studentName = topper?.student_name || 'Topper Student';
                const studentPercentage = topper?.percentage || (topper?.toppers?.match(/\(([^)]+)\)/)?.[1]) || '';
                const studentScore = topper?.score || '';

                return (
                  <motion.div
                    key={cls.key}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    onClick={() => handleSelectClass(cls.key)}
                    className="bg-white rounded-3xl border border-slate-200/80 hover:border-primary/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between p-6 cursor-pointer group relative overflow-hidden text-left"
                  >
                    {/* Background Decorative Icon */}
                    <Icon size={90} className="text-primary/5 absolute -right-3 -bottom-3 pointer-events-none transition-transform duration-500 group-hover:scale-110" />

                    <div className="space-y-4 relative z-10">
                      {/* Class Header Badge */}
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-[11px] font-bold px-3 py-1 rounded-full border uppercase tracking-wider ${cls.colorAccent}`}>
                          {cls.shortBadge}
                        </span>
                        <span className="text-[11px] font-bold text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded-md">
                          {classStudents.length} Toppers
                        </span>
                      </div>

                      {/* Class Designation */}
                      <div>
                        <h3 className="font-extrabold font-poppins text-slate-900 text-lg group-hover:text-primary transition-colors">
                          {cls.title}
                        </h3>
                        <p className="text-xs text-slate-400 font-medium">
                          {cls.subtitle}
                        </p>
                      </div>

                      {/* Top Student Portrait Box */}
                      {topper ? (
                        <div className="bg-slate-50/90 rounded-2xl p-3.5 border border-slate-100/90 flex items-center space-x-3 group-hover:bg-primary/5 transition-colors">
                          <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-white border border-slate-200 shrink-0 flex items-center justify-center shadow-xs">
                            {topper.image ? (
                              <img
                                src={topper.image}
                                alt={studentName}
                                className="w-full h-full object-cover object-top"
                                onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                              />
                            ) : null}
                            <div className={`w-full h-full bg-primary/10 text-primary flex items-center justify-center font-bold ${topper.image ? 'hidden' : 'flex'}`}>
                              <User size={22} className="text-primary/70" />
                            </div>
                            <div className="absolute -bottom-0.5 -right-0.5 bg-amber-400 text-slate-950 p-0.5 rounded-full shadow-xs border border-white">
                              <Award size={10} className="fill-current" />
                            </div>
                          </div>

                          <div className="min-w-0 flex-1">
                            <span className="text-[10px] font-bold text-primary uppercase tracking-wider block">
                              #1 Position
                            </span>
                            <h4 className="font-bold text-slate-900 text-sm truncate font-poppins">
                              {studentName}
                            </h4>
                            <div className="flex items-center space-x-2 mt-0.5">
                              {studentPercentage && (
                                <span className="text-[11px] font-extrabold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200/50">
                                  {studentPercentage}
                                </span>
                              )}
                              {studentScore && (
                                <span className="text-[11px] font-mono font-bold text-slate-600">
                                  {studentScore}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-slate-50 p-4 rounded-2xl text-center space-y-1 border border-dashed border-slate-200">
                          <p className="text-xs font-semibold text-slate-500">Board Results Finalizing</p>
                          <p className="text-[11px] text-slate-400">Distinctions being updated</p>
                        </div>
                      )}
                    </div>

                    {/* Bottom Action */}
                    <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-primary group-hover:text-primary-dark transition-colors">
                      <span>View Full {cls.title} Roster</span>
                      <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* 2. INTERACTIVE CLASS TABS & STUDENT ROSTER SECTION */}
          <div id="results-roster-section" className="space-y-8 text-left scroll-mt-24">
            
            {/* Section Header & Search */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2">
              <div>
                <SectionHeader
                  title="Merits & Distinction Students"
                  subtitle="Academic Achievements"
                  alignment="left"
                />
                <p className="text-xs text-slate-400 mt-1">
                  Select a class tab below to focus on students without excessive scrolling.
                </p>
              </div>

              {/* Search Box */}
              <div className="relative w-full sm:w-72">
                <Search size={16} className="text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search student or score..."
                  className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all shadow-xs"
                />
              </div>
            </div>

            {/* 5 Prominent Switcher Tabs */}
            <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100/90 rounded-2xl border border-slate-200/80 w-fit">
              <button
                type="button"
                onClick={() => setActiveClassTab('all')}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 cursor-pointer ${
                  activeClassTab === 'all'
                    ? 'bg-primary text-white shadow-md shadow-primary/20'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <Users size={15} />
                <span>All Classes</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                  activeClassTab === 'all' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {results.length}
                </span>
              </button>

              {ACADEMIC_CLASSES.map((cls) => {
                const count = studentsByClass[cls.key]?.length || 0;
                const isActive = activeClassTab === cls.key;
                const Icon = cls.icon;

                return (
                  <button
                    key={cls.key}
                    type="button"
                    onClick={() => setActiveClassTab(cls.key)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 cursor-pointer ${
                      isActive
                        ? 'bg-primary text-white shadow-md shadow-primary/20'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                    }`}
                  >
                    <Icon size={15} className={isActive ? 'text-secondary' : 'text-slate-400'} />
                    <span>{cls.title}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Tab Summary Banner */}
            {activeClassTab !== 'all' && (
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                    <GraduationCap size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-slate-900 font-poppins">
                      {ACADEMIC_CLASSES.find(c => c.key === activeClassTab)?.title} — Federal Board (FBISE)
                    </h4>
                    <p className="text-xs text-slate-400">
                      {ACADEMIC_CLASSES.find(c => c.key === activeClassTab)?.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-xs">
                  <div className="bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Class Passing</span>
                    <strong className="text-emerald-700 font-extrabold">100%</strong>
                  </div>
                  <div className="bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Distinctions</span>
                    <strong className="text-primary font-extrabold">90%+ Rate</strong>
                  </div>
                  <div className="bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Total Toppers</span>
                    <strong className="text-slate-800 font-extrabold">{studentsByClass[activeClassTab]?.length || 0}</strong>
                  </div>
                </div>
              </div>
            )}

            {/* Students Grid */}
            <AnimatePresence mode="wait">
              {displayedResults.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white p-12 rounded-3xl border border-dashed border-slate-200 text-center space-y-3"
                >
                  <Trophy size={42} className="mx-auto text-slate-300" />
                  <h4 className="text-base font-bold text-slate-700 font-poppins">No Results Matching Selection</h4>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">
                    {searchQuery ? `No students found matching "${searchQuery}".` : 'Board examination results for this specific class are currently being updated.'}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key={activeClassTab + searchQuery}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left"
                >
                  {displayedResults.map((res, idx) => {
                    const studentName = res.student_name || (res.toppers ? res.toppers.replace(/\s*\([^)]*\)/, '') : 'Topper Student');
                    const studentPercentage = res.percentage || (res.toppers && res.toppers.includes('(') ? res.toppers.match(/\(([^)]+)\)/)?.[1] : '');
                    const classKey = getStudentClassKey(res);
                    const classMeta = ACADEMIC_CLASSES.find(c => c.key === classKey);

                    return (
                      <motion.div
                        key={res.id || idx}
                        initial={{ opacity: 0, scale: 0.98, y: 15 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: idx * 0.05 }}
                        className="bg-white rounded-3xl border border-slate-100/90 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between group p-6 sm:p-8"
                      >
                        <Trophy size={110} className="text-primary/5 absolute -right-4 -bottom-4 pointer-events-none transition-transform duration-500 group-hover:scale-110" />

                        <div className="space-y-6 relative z-10">
                          {/* Header: Examination & Year Badge */}
                          <div className="flex justify-between items-start gap-3 border-b border-slate-100 pb-4">
                            <div>
                              <div className="flex items-center space-x-2 text-primary font-bold text-xs uppercase tracking-wider mb-1">
                                <GraduationCap size={15} />
                                <span>{classMeta?.shortBadge || 'FBISE Board Exam'}</span>
                              </div>
                              <h3 className="text-base sm:text-lg font-bold font-poppins text-slate-900 group-hover:text-primary transition-colors">
                                {res.examination}
                              </h3>
                            </div>
                            <span className="text-xs font-extrabold text-primary bg-primary/10 px-3 py-1 rounded-xl shrink-0 shadow-2xs">
                              Year {res.year || '2026'}
                            </span>
                          </div>

                          {/* Student Hero Section */}
                          <div className="flex items-center space-x-4 bg-slate-50/90 p-4 rounded-2xl border border-slate-100/80">
                            {/* Student Photo */}
                            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-white border-2 border-white shadow-md shrink-0 flex items-center justify-center ring-2 ring-primary/10">
                              {res.image ? (
                                <img
                                  src={res.image}
                                  alt={studentName}
                                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                                  onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                                />
                              ) : null}
                              <div className={`w-full h-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg ${res.image ? 'hidden' : 'flex'}`}>
                                <User size={28} className="text-primary/70" />
                              </div>
                              <div className="absolute -bottom-1 -right-1 bg-amber-400 text-slate-950 p-1 rounded-full shadow-xs border border-white">
                                <Award size={12} className="fill-current" />
                              </div>
                            </div>

                            {/* Student Info */}
                            <div className="flex-1 min-w-0 space-y-1.5">
                              <div className="flex items-center justify-between gap-2">
                                <h4 className="font-extrabold text-base sm:text-lg text-slate-900 font-poppins truncate">
                                  {studentName}
                                </h4>
                                {studentPercentage && (
                                  <span className="text-xs sm:text-sm font-black text-emerald-700 bg-emerald-100/80 border border-emerald-300/60 px-2.5 py-0.5 rounded-lg shrink-0 shadow-2xs">
                                    {studentPercentage}
                                  </span>
                                )}
                              </div>

                              {res.score ? (
                                <div className="flex items-center space-x-1.5 text-xs text-slate-600 font-medium">
                                  <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Score:</span>
                                  <span className="font-mono font-bold text-slate-900 bg-white px-2 py-0.5 rounded-md border border-slate-200/60 shadow-2xs">
                                    {res.score}
                                  </span>
                                </div>
                              ) : (
                                <p className="text-xs text-slate-500 italic">High Achiever & Board Distinction</p>
                              )}

                              {res.toppers && res.toppers !== studentName && !res.toppers.includes(studentName) && (
                                <p className="text-[11px] text-primary font-bold line-clamp-1">{res.toppers}</p>
                              )}
                            </div>
                          </div>

                          {/* Overall Class Performance Metrics */}
                          <div className="grid grid-cols-2 gap-3 pt-1">
                            <div className="bg-slate-50/70 p-3 rounded-2xl border border-slate-100">
                              <span className="text-slate-400 block text-[10px] uppercase font-extrabold tracking-wider">
                                Class Passing
                              </span>
                              <strong className="text-slate-900 text-sm font-extrabold font-mono">
                                {res.passing_percentage || res.passingPercentage || '100%'}
                              </strong>
                            </div>
                            <div className="bg-slate-50/70 p-3 rounded-2xl border border-slate-100">
                              <span className="text-slate-400 block text-[10px] uppercase font-extrabold tracking-wider">
                                Distinctions Rate
                              </span>
                              <strong className="text-slate-900 text-sm font-extrabold font-mono">
                                {res.distinctions || '90%+'}
                              </strong>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>
    </>
  );
}

