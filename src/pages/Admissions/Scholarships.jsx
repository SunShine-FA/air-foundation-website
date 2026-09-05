import React from 'react';
import { Helmet } from 'react-helmet-async';
import Breadcrumb from '../../components/Breadcrumb';
import SectionHeader from '../../components/SectionHeader';
import { Award, ShieldCheck, Compass } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Scholarships() {
  const scholarshipsList = [
    { title: 'Merit Scholarship', desc: 'Fully funded for academic toppers entering high school or college streams.', criteria: '90% and above marks in previous examinations.' },
    { title: 'Concession', desc: '50% monthly fee concession for the students ', criteria: '81% upto 89% marks in previous examinations.' },
    { title: 'Need-based Financial Aid', desc: 'Partial grants matching family incomes to ensure quality education for talented children.', criteria: 'Submission of income statements and tax returns.' }
  ];

  return (
    <>
      <Helmet>
        <title>Academic Scholarships & Financial Aid | Air Foundation School & College</title>
      </Helmet>

      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-5xl font-extrabold font-poppins">Scholarships</h1>
          <p className="text-slate-200 text-sm sm:text-base mt-4 max-w-xl">
            Supporting academic stars, sports prodigies, and creative artists.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumb title="Scholarships" />
      </div>

      <section className="py-16 bg-white font-inter">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <SectionHeader title="Academic Scholarships" subtitle="Financial Support" alignment="center" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {scholarshipsList.map((sch, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bg-slate-50 p-8 rounded-3xl border border-slate-100/60 shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="bg-primary/5 text-primary p-3 rounded-xl w-fit">
                    <Award size={20} className="text-secondary" />
                  </div>
                  <h3 className="text-lg font-bold font-poppins text-slate-800 pt-2">{sch.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{sch.desc}</p>
                </div>
                
                <div className="mt-6 border-t border-slate-200/50 pt-4 text-xs text-slate-500">
                  <p className="font-semibold text-slate-700">Eligibility Criteria:</p>
                  <p className="mt-1">{sch.criteria}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
