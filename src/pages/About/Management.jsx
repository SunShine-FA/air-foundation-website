import React from 'react';
import { Helmet } from 'react-helmet-async';
import Breadcrumb from '../../components/Breadcrumb';
import SectionHeader from '../../components/SectionHeader';
import { motion } from 'framer-motion';
import { useData } from '../../context/DataContext';
import { User } from 'lucide-react';
import { getImageUrl, handleImageError } from '../../utils/imageHelper';

export default function Management() {
  const { management } = useData();

  return (
    <>
      <Helmet>
        <title>Management Desk | Air Foundation School & College</title>
      </Helmet>

      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-5xl font-extrabold font-poppins">Management Desk</h1>
          <p className="text-slate-200 text-sm sm:text-base mt-4 max-w-xl">
            Meet the leaders and governors driving Air Foundation School & College's academic vision.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumb title="Management Desk" />
      </div>

      <section className="py-16 bg-white font-inter">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
          <SectionHeader title="Board of Management & Governors" subtitle="Institutional Leadership" alignment="center" />
          
          <div className="space-y-4 text-left">
            {management.length === 0 ? (
              <div className="bg-slate-50 p-12 rounded-3xl border border-dashed border-slate-200 text-center space-y-3">
                <h4 className="text-base font-bold text-slate-700 font-poppins">Management Desk Updating</h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Board and governance profiles are currently being updated.
                </p>
              </div>
            ) : (
              management.map((mgt, idx) => (
                <motion.div
                  key={mgt.id || idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="bg-slate-50 hover:bg-white p-5 sm:p-6 rounded-3xl border border-slate-100/80 hover:border-primary/20 shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 group"
                >
                  <div className="flex items-center space-x-4 min-w-0">
                    {mgt.image ? (
                      <img
                        src={getImageUrl(mgt.image, (mgt.name || '').toLowerCase().includes("ms") ? 'female' : 'male')}
                        alt={mgt.name}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover object-top border border-slate-200/80 shadow-xs shrink-0 group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => handleImageError(e, (mgt.name || '').toLowerCase().includes("ms"))}
                      />
                    ) : (
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/15 text-primary flex items-center justify-center shrink-0">
                        <User size={28} className="text-primary/70" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <h4 className="font-bold text-slate-800 group-hover:text-primary transition-colors font-poppins text-base sm:text-lg truncate">
                        {mgt.name}
                      </h4>
                      <p className="text-xs text-primary font-bold uppercase tracking-wider mt-0.5">
                        {mgt.role}
                      </p>
                    </div>
                  </div>
                  {mgt.bg && (
                    <div className="text-xs text-slate-500 font-semibold bg-white border border-slate-200 px-3.5 py-1.5 rounded-full shrink-0 shadow-2xs">
                      {mgt.bg}
                    </div>
                  )}
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
}
