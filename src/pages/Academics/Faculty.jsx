import React from 'react';
import { Helmet } from 'react-helmet-async';
import Breadcrumb from '../../components/Breadcrumb';
import SectionHeader from '../../components/SectionHeader';
import FacultyCard from '../../components/FacultyCard';
import { FACULTY } from '../../data/mockData';
import { Mail, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Faculty() {
  return (
    <>
      <Helmet>
        <title>Our Distinguish Faculty | Air Foundation School \& College</title>
      </Helmet>

      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-5xl font-extrabold font-poppins">Our Distinguish Faculty</h1>
          <p className="text-slate-200 text-sm sm:text-base mt-4 max-w-xl">
            Mentors, research scholars, and leaders guiding student cohorts to excellence.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumb title="Faculty" />
      </div>

      <section className="py-16 bg-white font-inter">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-slate-100">
            <SectionHeader title="Scholarly Guidance & Pastoral Mentorship" subtitle="Academic Staff" alignment="left" />
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 max-w-sm text-xs text-slate-500 flex items-start space-x-2">
              <ShieldCheck size={18} className="text-primary shrink-0 mt-0.5" />
              <span>Over 80% of our lead teachers possess postgraduate certifications or PhD credentials.</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {FACULTY.map((member, idx) => (
              <FacultyCard key={idx} faculty={member} index={idx} />
            ))}
          </div>

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
