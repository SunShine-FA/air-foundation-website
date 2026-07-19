import React from 'react';
import { Helmet } from 'react-helmet-async';
import Breadcrumb from '../components/Breadcrumb';
import SectionHeader from '../components/SectionHeader';
import { RESULTS } from '../data/mockData';
import { Trophy, Award } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Results() {
  return (
    <>
      <Helmet>
        <title>Academic Results & Toppers | Air Foundation School \& College</title>
      </Helmet>

      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-5xl font-extrabold font-poppins">Examination Results</h1>
          <p className="text-slate-200 text-sm sm:text-base mt-4 max-w-xl">
            A celebration of board examinations excellence and student accomplishments.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumb title="Results" />
      </div>

      <section className="py-16 bg-white font-inter">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
          <SectionHeader title="Board Merits & Passing Percentages" subtitle="Results Board" alignment="center" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {RESULTS.map((res, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-slate-50 p-8 rounded-3xl border border-slate-100/60 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
              >
                <Trophy size={60} className="text-secondary/15 absolute -right-2 -bottom-2" />
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-200/60 pb-3">
                    <h3 className="text-lg font-bold font-poppins text-slate-800">{res.examination}</h3>
                    <span className="text-xs font-bold text-primary bg-primary/5 px-2.5 py-1 rounded-md">
                      Year: {res.year}
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-sm text-slate-600">
                    <p className="flex justify-between">
                      <span>Topper:</span>
                      <strong className="text-slate-800">{res.toppers}</strong>
                    </p>
                    <p className="flex justify-between">
                      <span>Passing Percentage:</span>
                      <strong className="text-slate-800">{res.passingPercentage}</strong>
                    </p>
                    <p className="flex justify-between">
                      <span>Distinctions Rate:</span>
                      <strong className="text-slate-800">{res.distinctions}</strong>
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
