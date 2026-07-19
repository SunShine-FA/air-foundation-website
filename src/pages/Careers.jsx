import React from 'react';
import { Helmet } from 'react-helmet-async';
import Breadcrumb from '../components/Breadcrumb';
import SectionHeader from '../components/SectionHeader';
import { CAREERS } from '../data/mockData';
import { Briefcase, MapPin, Send } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Careers() {
  const handleApply = (title) => {
    alert(`Application flow for "${title}" will open shortly. Please mail your CV to careers@premschool.edu.`);
  };

  return (
    <>
      <Helmet>
        <title>Careers & Openings | Air Foundation School \& College</title>
      </Helmet>

      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-5xl font-extrabold font-poppins">Careers</h1>
          <p className="text-slate-200 text-sm sm:text-base mt-4 max-w-xl">
            Join a legacy of academic innovators and scholars. Build a premium teaching career.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumb title="Careers" />
      </div>

      <section className="py-16 bg-white font-inter">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
          <SectionHeader title="Current Openings" subtitle="Join Our Team" alignment="center" />
          
          <div className="space-y-6">
            {CAREERS.map((job, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-100/60 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6"
              >
                <div className="space-y-2.5">
                  <span className="text-[10px] font-bold text-primary bg-primary/5 px-2.5 py-1 rounded-md uppercase tracking-wider">
                    {job.department}
                  </span>
                  <h3 className="text-lg font-bold font-poppins text-slate-800 pt-1">{job.title}</h3>
                  
                  <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-400">
                    <span className="flex items-center space-x-1">
                      <Briefcase size={13} />
                      <span>{job.type}</span>
                    </span>
                    <span>Experience: {job.experience}</span>
                    <span>Min. Qualification: {job.qualification}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleApply(job.title)}
                  className="bg-primary hover:bg-primary-light text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl flex items-center space-x-2 transition-all cursor-pointer shadow-sm hover:shadow-md shrink-0 w-full sm:w-auto justify-center"
                >
                  <span>Apply Now</span>
                  <Send size={12} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
