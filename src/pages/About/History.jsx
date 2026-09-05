import React from 'react';
import { Helmet } from 'react-helmet-async';
import Breadcrumb from '../../components/Breadcrumb';
import SectionHeader from '../../components/SectionHeader';
import { History as HistoryIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useData } from '../../context/DataContext';

export default function History() {
  const { history } = useData();

  return (
    <>
      <Helmet>
        <title>Our History & Milestones | Air Foundation School & College</title>
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
          <SectionHeader title="A Legacy of Educational Leadership" subtitle="Timeline Milestones" alignment="center" />
          
          <div className="relative border-l-2 border-slate-200 ml-4 sm:ml-32 py-4 space-y-10 text-left">
            {history.map((mile, idx) => (
              <motion.div
                key={mile.id || idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative pl-8 sm:pl-10"
              >
                {/* Year Badge on the Left (Desktop) */}
                <div className="hidden sm:block absolute -left-36 top-1.5 w-24 text-right">
                  <span className="text-xl font-extrabold font-poppins text-primary">
                    {mile.year}
                  </span>
                </div>

                {/* Circle Marker */}
                <div className="absolute -left-[9px] top-2.5 w-4 h-4 rounded-full bg-secondary border-4 border-white shadow" />

                {/* Content Box */}
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100/80 shadow-sm hover:shadow-md transition-shadow">
                  <span className="sm:hidden text-xs font-bold text-secondary uppercase tracking-wider block mb-1">
                    Year {mile.year}
                  </span>
                  <h3 className="text-lg font-bold font-poppins text-slate-800">
                    {mile.title}
                  </h3>
                  <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                    {mile.description || mile.desc}
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
