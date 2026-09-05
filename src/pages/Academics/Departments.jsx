import React from 'react';
import { Helmet } from 'react-helmet-async';
import Breadcrumb from '../../components/Breadcrumb';
import SectionHeader from '../../components/SectionHeader';
import { Box, UserCheck, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import { useData } from '../../context/DataContext';

export default function Departments() {
  const { departments, faculty } = useData();

  return (
    <>
      <Helmet>
        <title>Academic Departments | Air Foundation School & College</title>
      </Helmet>

      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-5xl font-extrabold font-poppins">Academic Departments</h1>
          <p className="text-slate-200 text-sm sm:text-base mt-4 max-w-xl">
            Diverse subject wings equipped with modern wet-labs, tinkering kits, and specialized faculty mentors.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumb title="Departments" />
      </div>

      <section className="py-16 bg-white font-inter">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <SectionHeader title="Our Specialized Disciplines" subtitle="Subject Wings" alignment="center" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {departments.map((dept, idx) => {
              const hasLabs = Array.isArray(dept.labs) && dept.labs.some(lab => lab && lab.trim().length > 0);

              const matchedHead = (faculty || []).find(f => 
                f.name && dept.head && (
                  f.name.toLowerCase().trim() === dept.head.toLowerCase().trim() ||
                  f.name.toLowerCase().includes(dept.head.toLowerCase().trim()) ||
                  dept.head.toLowerCase().includes(f.name.toLowerCase().trim())
                )
              );

              const hodPhoto = dept.head_image || dept.headImage || matchedHead?.image;

              return (
                <motion.div
                  key={dept.id || idx}
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: (idx % 3) * 0.08 }}
                  className="bg-slate-50 p-8 rounded-3xl border border-slate-100/80 shadow-xs hover:shadow-xl hover:bg-white hover:border-primary/20 transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-primary bg-primary/5 border border-primary/15 px-2.5 py-1 rounded-md uppercase tracking-wider">
                        Wing #{idx + 1}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold font-poppins text-slate-900 group-hover:text-primary transition-colors pt-1">
                      {dept.name}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{dept.description}</p>
                  </div>

                  <div className="mt-8 border-t border-slate-200/60 pt-5 space-y-3.5 text-xs text-slate-600">
                    {/* Head of Department Card */}
                    <div className="flex items-center space-x-3 bg-white p-3 rounded-2xl border border-slate-100 shadow-xs">
                      {hodPhoto ? (
                        <img
                          src={hodPhoto}
                          alt={dept.head}
                          className="w-10 h-10 rounded-full object-cover shrink-0 border-2 border-primary/20"
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shrink-0">
                          <UserCheck size={18} />
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="text-[10px] text-primary font-bold uppercase tracking-wider">Head of Department</p>
                        <p className="font-bold text-slate-900 truncate text-sm">{dept.head}</p>
                        {matchedHead?.qualification && (
                          <p className="text-[11px] text-slate-400 truncate">{matchedHead.qualification}</p>
                        )}
                      </div>
                    </div>

                    {hasLabs && (
                      <div className="flex items-start space-x-2 pt-1">
                        <Settings size={14} className="text-primary shrink-0 mt-0.5" />
                        <div className="flex flex-wrap gap-1">
                          {dept.labs.map((lab, lIdx) => (
                            <span key={lIdx} className="bg-primary/5 text-primary border border-primary/15 px-2 py-0.5 rounded text-[10px] font-semibold">
                              {lab}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
