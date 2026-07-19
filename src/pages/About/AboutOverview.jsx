import React from 'react';
import { Helmet } from 'react-helmet-async';
import Breadcrumb from '../../components/Breadcrumb';
import SectionHeader from '../../components/SectionHeader';
import { Award, Compass, BookOpen, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AboutOverview() {
  return (
    <>
      <Helmet>
        <title>About Air Foundation School \& College | Overview & Core Values</title>
      </Helmet>

      <section className="bg-primary text-white py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-5xl font-extrabold font-poppins">About Our Academy</h1>
          <p className="text-slate-200 text-sm sm:text-base mt-4 max-w-xl">
            Established in 1998, Air Foundation School \& College is a leading international institution dedicated to scholastic discipline, character development, and holistic growth.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumb title="Overview" />
      </div>

      <section className="py-16 bg-white font-inter">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Text content */}
          <div className="lg:col-span-7 space-y-6">
            <SectionHeader title="Our Heritage & Philosophy" subtitle="About Us" alignment="left" />
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              Air Foundation School \& College has been at the forefront of quality K-12 education and pre-university programs for over two decades. What started as a modest high school has grown into a prestigious academy catering to students from diverse cultural backgrounds, offering state-of-the-art facilities and curriculum models that match international benchmarks.
            </p>
            <p className="text-slate-600 leading-relaxed text-sm">
              Our educational framework balances intellectual inquiry with creative exploration, technological literacy, and moral duty. We strive to create independent critical thinkers who possess the skills and leadership capacity to thrive in a globalized society.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
              <div className="flex space-x-3">
                <div className="bg-primary/5 text-primary p-2.5 rounded-lg shrink-0 h-fit"><Award size={18} /></div>
                <div>
                  <h4 className="font-bold text-slate-800 font-poppins text-sm">Aesthetic Excellence</h4>
                  <p className="text-xs text-slate-500 mt-1">Acclaimed globally for outstanding board performance and placements.</p>
                </div>
              </div>
              <div className="flex space-x-3">
                <div className="bg-primary/5 text-primary p-2.5 rounded-lg shrink-0 h-fit"><Compass size={18} /></div>
                <div>
                  <h4 className="font-bold text-slate-800 font-poppins text-sm font-semibold">Value-Centric Learning</h4>
                  <p className="text-xs text-slate-500 mt-1">We embed social accountability and ethical grounding in every student.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right illustration / image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative h-fit"
          >
            <div className="absolute inset-0 bg-secondary rounded-3xl rotate-2 scale-95" />
            <img
              src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800"
              alt="Campus Library"
              className="relative z-10 w-full rounded-3xl shadow-lg aspect-square object-cover"
            />
          </motion.div>
        </div>
      </section>
    </>
  );
}
