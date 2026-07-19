import React from 'react';
import { Helmet } from 'react-helmet-async';
import Breadcrumb from '../../components/Breadcrumb';
import SectionHeader from '../../components/SectionHeader';
import { Calendar, Award, Star, History as HistoryIcon } from 'lucide-react';
import { motion } from 'framer-motion';

export default function History() {
  const timelineData = [
    { year: '1998', title: 'The Foundation', desc: 'Air Foundation School \& College is registered with 5 academic rooms and 85 students in the primary program.' },
    { year: '2005', title: 'High School Expansion', desc: 'Affiliation secured with National ICSE boards. Building of the science block completed.' },
    { year: '2012', title: 'Global Curriculum Integration', desc: 'Introduced Cambridge Secondary curricula and constructed the Olympic-size sports center.' },
    { year: '2018', title: 'Junior College & IB Diploma', desc: 'Launched Grade 11 & 12 Specialized Streams and secured International Baccalaureate (IB) authorization.' },
    { year: '2025', title: 'Digital Era & Super Computing', desc: 'Classrooms upgraded to smart-interactive technology. Launch of the advanced STEM Tinkering and AI Labs.' }
  ];

  return (
    <>
      <Helmet>
        <title>Our History & Milestones | Air Foundation School \& College</title>
      </Helmet>

      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-5xl font-extrabold font-poppins">Our History</h1>
          <p className="text-slate-200 text-sm sm:text-base mt-4 max-w-xl">
            A journey of quality academic services, scaling milestones, and pioneering educational frameworks.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumb title="History" />
      </div>

      <section className="py-16 bg-white font-inter">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="bg-primary/5 p-6 rounded-full w-24 h-24 flex items-center justify-center mx-auto text-primary">
            <HistoryIcon size={40} className="text-secondary" />
          </div>
          <SectionHeader title="Over 25 Years of Educational Leadership" subtitle="Timeline Milestones" alignment="center" />
          
          <div className="relative border-l-2 border-slate-200 ml-4 sm:ml-32 py-4 space-y-10">
            {timelineData.map((mile, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative pl-8 sm:pl-12"
              >
                <div className="absolute -left-[9px] top-1 bg-secondary w-4 h-4 rounded-full border-2 border-white shadow-sm" />
                
                <div className="hidden sm:block absolute right-full top-1 pr-12 text-right">
                  <span className="text-lg font-black text-primary font-poppins">{mile.year}</span>
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100/60 hover:shadow-sm transition-shadow">
                  <span className="sm:hidden inline-block text-xs font-bold text-primary bg-primary/5 px-2 py-0.5 rounded-md mb-2">
                    {mile.year}
                  </span>
                  <h4 className="font-bold text-slate-800 font-poppins text-base flex items-center space-x-2">
                    <Star size={14} className="text-secondary fill-secondary" />
                    <span>{mile.title}</span>
                  </h4>
                  <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                    {mile.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
