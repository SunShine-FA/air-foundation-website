import React from 'react';
import { Helmet } from 'react-helmet-async';
import Breadcrumb from '../../components/Breadcrumb';
import SectionHeader from '../../components/SectionHeader';
import { DEPARTMENTS } from '../../data/mockData';
import { Box, UserCheck, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Departments() {
  return (
    <>
      <Helmet>
        <title>Academic Departments | Air Foundation School \& College</title>
      </Helmet>

      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-5xl font-extrabold font-poppins">Academic Departments</h1>
          <p className="text-slate-200 text-sm sm:text-base mt-4 max-w-xl">
            Diverse subject wings equipped with modern wet-labs, tinkering kits, and resources.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumb title="Departments" />
      </div>

      <section className="py-16 bg-white font-inter">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <SectionHeader title="Our Specialized Disciplines" subtitle="Subject Wings" alignment="center" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {DEPARTMENTS.map((dept, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bg-slate-50 p-8 rounded-3xl border border-slate-100/60 shadow-sm hover:shadow-md hover:bg-white transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <span className="text-[10px] font-bold text-primary bg-primary/5 px-2.5 py-1 rounded-md uppercase tracking-wider">
                    {dept.name.split(' ')[0]} Division
                  </span>
                  
                  <h3 className="text-xl font-bold font-poppins text-slate-800 pt-2">{dept.name}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{dept.description}</p>
                </div>

                <div className="mt-8 border-t border-slate-200/50 pt-5 space-y-3.5 text-xs text-slate-600">
                  <div className="flex items-center space-x-2">
                    <UserCheck size={14} className="text-primary" />
                    <span><strong>Head:</strong> {dept.head}</span>
                  </div>
                  <div className="space-y-1.5">
                    <p className="font-semibold text-slate-700 flex items-center space-x-1.5">
                      <Settings size={13} className="text-primary" />
                      <span>Dedicated Laboratories:</span>
                    </p>
                    <ul className="pl-5 list-disc space-y-1 text-slate-500">
                      {dept.labs.map((lab, labIdx) => (
                        <li key={labIdx}>{lab}</li>
                      ))}
                    </ul>
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
