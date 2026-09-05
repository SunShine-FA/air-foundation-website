import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import Breadcrumb from '../../components/Breadcrumb';
import SectionHeader from '../../components/SectionHeader';
import FacultyCard from '../../components/FacultyCard';
import { ShieldCheck, Search, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';

export default function Faculty() {
  const { faculty, departments } = useData();
  const [selectedDept, setSelectedDept] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Extract distinct departments from faculty & departments data
  const departmentOptions = useMemo(() => {
    const set = new Set();
    (faculty || []).forEach(f => {
      const dept = f.department || f.category;
      if (dept && dept.trim()) set.add(dept.trim());
    });
    (departments || []).forEach(d => {
      if (d.name && d.name.trim()) set.add(d.name.trim());
    });
    return ['All', ...Array.from(set)];
  }, [faculty, departments]);

  const filteredFaculty = useMemo(() => {
    return (faculty || []).filter(member => {
      const dept = member.department || member.category || '';
      const matchesDept = selectedDept === 'All' || dept.toLowerCase().includes(selectedDept.toLowerCase()) || selectedDept.toLowerCase().includes(dept.toLowerCase());
      const matchesQuery = 
        !searchQuery ||
        (member.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (member.role || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (member.qualification || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        dept.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesDept && matchesQuery;
    });
  }, [faculty, selectedDept, searchQuery]);

  return (
    <>
      <Helmet>
        <title>Our Distinguished Faculty | Air Foundation School & College</title>
      </Helmet>

      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-5xl font-extrabold font-poppins">Our Distinguished Faculty</h1>
          <p className="text-slate-200 text-sm sm:text-base mt-4 max-w-xl">
            Mentors, research scholars, and academic leaders guiding student cohorts to excellence.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumb title="Faculty" />
      </div>

      <section className="py-16 bg-white font-inter">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-slate-100 text-left">
            <SectionHeader title="Scholarly Guidance & Pastoral Mentorship" subtitle="Academic Staff" alignment="left" />
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 max-w-sm text-xs text-slate-500 flex items-start space-x-2">
              <ShieldCheck size={18} className="text-primary shrink-0 mt-0.5" />
              <span>Over 80% of our lead teachers possess postgraduate certifications or academic credentials.</span>
            </div>
          </div>

          {/* Search & Department Filters */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Category / Department Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {departmentOptions.map((dept) => {
                const isActive = selectedDept === dept;
                const count = dept === 'All' 
                  ? (faculty || []).length 
                  : (faculty || []).filter(f => (f.department || f.category || '').toLowerCase().includes(dept.toLowerCase()) || dept.toLowerCase().includes((f.department || f.category || '').toLowerCase())).length;

                return (
                  <button
                    key={dept}
                    onClick={() => setSelectedDept(dept)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${
                      isActive
                        ? 'bg-primary text-white shadow-md shadow-primary/20 scale-105'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/70'
                    }`}
                  >
                    <span>{dept}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-200/80 text-slate-600'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Quick Search */}
            <div className="relative w-full md:w-64 shrink-0">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search teacher by name or role..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-xs outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all text-slate-800"
              />
            </div>
          </div>

          {/* Faculty Grid */}
          {filteredFaculty.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredFaculty.map((member, idx) => (
                <FacultyCard key={member.id || idx} faculty={member} index={idx} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-slate-50 rounded-3xl border border-dashed border-slate-200 p-8 space-y-3">
              <Users size={36} className="text-slate-400 mx-auto" />
              <p className="text-sm font-bold text-slate-700">No faculty members found in this category.</p>
              <button
                onClick={() => { setSelectedDept('All'); setSearchQuery(''); }}
                className="text-xs text-primary font-bold underline cursor-pointer"
              >
                Reset filters
              </button>
            </div>
          )}

          <div className="bg-primary text-white p-8 rounded-3xl text-center space-y-4 max-w-4xl mx-auto mt-16">
            <h4 className="font-bold font-poppins text-xl">Interested in joining our academic cohort?</h4>
            <p className="text-slate-200 text-xs sm:text-sm max-w-md mx-auto">
              We look for passionate teachers trained in international curriculum models who love teaching.
            </p>
            <div className="pt-2">
              <Link to="/careers" className="bg-secondary text-slate-900 font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-lg hover:bg-white hover:text-primary transition-colors">
                Apply for Career Openings
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
