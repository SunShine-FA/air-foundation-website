import React from 'react';
import { Helmet } from 'react-helmet-async';
import Breadcrumb from '../../components/Breadcrumb';
import SectionHeader from '../../components/SectionHeader';
import { Eye, ShieldCheck, Compass } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Vision() {
  return (
    <>
      <Helmet>
        <title>Our Vision | Air Foundation School \& College</title>
      </Helmet>

      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-5xl font-extrabold font-poppins">Our Vision</h1>
          <p className="text-slate-200 text-sm sm:text-base mt-4 max-w-xl">
            Cultivating global citizenship, intellectual resilience, and values-led leadership.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumb title="Vision" />
      </div>

      <section className="py-16 bg-white font-inter">
        <div className="max-w-4xl mx-auto text-center space-y-8 px-4 sm:px-6">
          <div className="bg-primary/5 p-6 rounded-full w-24 h-24 flex items-center justify-center mx-auto text-primary">
            <Eye size={40} className="text-secondary animate-pulse" />
          </div>
          <SectionHeader title="Inspiring Future Intellectuals" subtitle="Vision Statement" alignment="center" />
          <blockquote className="text-slate-700 font-poppins text-lg sm:text-2xl leading-relaxed italic border-l-4 border-secondary pl-6 text-left my-8">
            "To be recognized globally as a model of educational excellence, nurturing creative and critical thinkers who possess the moral character, analytical capabilities, and global awareness to shape a positive future for their communities and the world."
          </blockquote>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left pt-8">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <h3 className="text-lg font-bold font-poppins text-slate-800 flex items-center space-x-2">
                <ShieldCheck size={18} className="text-primary" />
                <span>Intellectual Integrity</span>
              </h3>
              <p className="text-slate-600 text-sm mt-3.5 leading-relaxed">
                We believe in rigorous academic discipline where logic, honesty, and analytical curiosity guide intellectual discovery and critical exploration.
              </p>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <h3 className="text-lg font-bold font-poppins text-slate-800 flex items-center space-x-2">
                <Compass size={18} className="text-primary" />
                <span>Global Outlook</span>
              </h3>
              <p className="text-slate-600 text-sm mt-3.5 leading-relaxed">
                Students are mentored to appreciate cultural diversity, engage with complex international issues, and value cooperative development.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
