import React from 'react';
import { Helmet } from 'react-helmet-async';
import Breadcrumb from '../../components/Breadcrumb';
import SectionHeader from '../../components/SectionHeader';
import { motion } from 'framer-motion';

export default function Management() {
  const managementList = [
    { name: 'Dr. Arthur Sterling', role: 'Chairman, Board of Governors', bg: 'MIT, Former Chancellor' },
    { name: 'Mrs. Helen Vance', role: 'Managing Director & Treasurer', bg: 'MBA, Stanford University' },
    { name: 'Dr. Robert Chen', role: 'Principal & Ex-officio Member', bg: 'Ph.D., MIT' },
    { name: 'Mr. George Cooper', role: 'Director of Campus Infrastructure', bg: 'M.Tech, Cornell' },
    { name: 'Ms. Diane Fletcher', role: 'Director of Human Resources', bg: 'M.A., Columbia University' }
  ];

  return (
    <>
      <Helmet>
        <title>Management Desk | Air Foundation School \& College</title>
      </Helmet>

      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-5xl font-extrabold font-poppins">Management Desk</h1>
          <p className="text-slate-200 text-sm sm:text-base mt-4 max-w-xl">
            Meet the leaders and governors driving Air Foundation School \& College's academic vision.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumb title="Management Desk" />
      </div>

      <section className="py-16 bg-white font-inter">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
          <SectionHeader title="Board of Management & Governors" subtitle="Institutional Leadership" alignment="center" />
          
          <div className="space-y-4">
            {managementList.map((mgt, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bg-slate-50 p-6 rounded-2xl border border-slate-100/60 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
              >
                <div>
                  <h4 className="font-bold text-slate-800 font-poppins text-base sm:text-lg">{mgt.name}</h4>
                  <p className="text-xs text-primary font-bold uppercase tracking-wider mt-0.5">{mgt.role}</p>
                </div>
                <div className="text-xs text-slate-400 font-semibold bg-white border border-slate-200 px-3.5 py-1.5 rounded-full">
                  {mgt.bg}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
