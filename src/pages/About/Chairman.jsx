import React from 'react';
import { Helmet } from 'react-helmet-async';
import Breadcrumb from '../../components/Breadcrumb';
import SectionHeader from '../../components/SectionHeader';
import { Award, Target, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Chairman() {
  return (
    <>
      <Helmet>
        <title>Chairman's Message | Air Foundation School \& College</title>
      </Helmet>

      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-5xl font-extrabold font-poppins">Chairman's Message</h1>
          <p className="text-slate-200 text-sm sm:text-base mt-4 max-w-xl">
            A message of vision, leadership, and values from our Board Chairman.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumb title="Chairman's Message" />
      </div>

      <section className="py-16 bg-white font-inter">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Picture of Chairman */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative"
          >
            <div className="absolute inset-0 bg-secondary rounded-3xl -rotate-2 scale-95" />
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800"
              alt="Chairman Dr. Arthur Sterling"
              className="relative z-10 w-full rounded-3xl shadow-xl aspect-[4/5] object-cover object-top"
            />
          </motion.div>
          
          {/* Chairman address */}
          <div className="lg:col-span-7 space-y-6">
            <SectionHeader title="Nurturing Global Intellectuals" subtitle="From The Board" alignment="left" />
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base italic">
              "Educational institutions have a vital responsibility: to not just fill minds with datasets, but to spark a passion for truth, integrity, and ethical citizenship. At Air Foundation School \& College, we foster a climate of intellectual courage and social duty."
            </p>
            <p className="text-slate-600 leading-relaxed text-sm">
              Our board of management is dedicated to constantly upgrading our academic resources, investing in international certifications, and providing our exceptional teachers with the tools they need to inspire. We invite you to join us in cultivating a brighter, values-led future.
            </p>
            <div className="pt-4">
              <h4 className="font-bold text-slate-900 font-poppins text-lg">Dr. Arthur Sterling</h4>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                Chairman, Board of Governors
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
