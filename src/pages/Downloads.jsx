import React from 'react';
import { Helmet } from 'react-helmet-async';
import Breadcrumb from '../components/Breadcrumb';
import SectionHeader from '../components/SectionHeader';
import { DOWNLOADS } from '../data/mockData';
import { ArrowDownToLine, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Downloads() {
  const handleDownload = (title) => {
    alert(`Downloading ${title}... (Simulated link)`);
  };

  return (
    <>
      <Helmet>
        <title>Academic Documents & Downloads | Air Foundation School \& College</title>
      </Helmet>

      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-5xl font-extrabold font-poppins">Academic Downloads</h1>
          <p className="text-slate-200 text-sm sm:text-base mt-4 max-w-xl">
            Acquire syllabi, prospects, handbooks, and schedules directly.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumb title="Downloads" />
      </div>

      <section className="py-16 bg-white font-inter">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
          <SectionHeader title="Prospectus & Stream Syllabi" subtitle="Document Resources" alignment="center" />
          
          <div className="space-y-4">
            {DOWNLOADS.map((doc, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bg-slate-50 p-6 rounded-2xl border border-slate-100/60 shadow-sm flex items-center justify-between gap-4"
              >
                <div className="flex items-center space-x-3.5 min-w-0">
                  <div className="bg-primary/5 text-primary p-3 rounded-xl shrink-0">
                    <FileText size={20} className="text-secondary" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-slate-800 font-poppins text-sm sm:text-base truncate">{doc.title}</h4>
                    <p className="text-xs text-slate-400 font-semibold mt-0.5 uppercase">
                      Size: {doc.size} | Format: {doc.format}
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={() => handleDownload(doc.title)}
                  className="bg-primary hover:bg-primary-light text-white p-3 rounded-xl hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0"
                >
                  <ArrowDownToLine size={16} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
