import React from 'react';
import { Helmet } from 'react-helmet-async';
import Breadcrumb from '../../components/Breadcrumb';
import SectionHeader from '../../components/SectionHeader';
import { Award, Compass, Sparkles, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import heritage from '../../assets/heritage.avif';
import college from '../../assets/college.avif';

export default function AboutOverview() {
  return (
    <>
      <Helmet>
        <title>About Air Foundation School & College | Overview & Core Values</title>
      </Helmet>

      <section className="bg-primary text-white py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-5xl font-extrabold font-poppins">About Our Academy</h1>
          <p className="text-slate-200 text-sm sm:text-base mt-4 max-w-xl">
            Established in 2018, Air Foundation School & College is a leading international institution dedicated to scholastic discipline, character development, and holistic growth.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumb title="Overview" />
      </div>

      <section className="py-16 bg-white font-inter">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Text content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <SectionHeader title="Our Heritage & Philosophy" subtitle="About Us" alignment="left" />
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              Air Foundation School & College has been at the forefront of quality K-12 education and pre-university programs for the last 8 years. What started as a focused high school has grown into a prestigious academy catering to students from diverse cultural backgrounds, offering state-of-the-art facilities and curriculum models.
            </p>
            <p className="text-slate-600 leading-relaxed text-sm">
              Our educational framework balances intellectual inquiry with creative exploration, technological literacy, and moral duty. We strive to create independent critical thinkers who possess the skills and leadership capacity to thrive in a globalized society.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4">
              <div className="flex space-x-3 bg-slate-50 p-4 rounded-2xl border border-slate-100/80">
                <div className="bg-primary/10 text-primary p-2.5 rounded-xl shrink-0 h-fit">
                  <Award size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 font-poppins text-sm">Academic Excellence</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">Acclaimed for outstanding board performance, distinctions, and premier college placements.</p>
                </div>
              </div>

              <div className="flex space-x-3 bg-slate-50 p-4 rounded-2xl border border-slate-100/80">
                <div className="bg-primary/10 text-primary p-2.5 rounded-xl shrink-0 h-fit">
                  <Compass size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 font-poppins text-sm">Value-Centric Learning</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">We embed social accountability, civic responsibility, and ethical grounding in every student.</p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600">
              <span className="inline-flex items-center space-x-1.5 bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-full border border-emerald-200">
                <CheckCircle2 size={14} className="text-emerald-600" />
                <span>PEIRA Registered</span>
              </span>
              <span className="inline-flex items-center space-x-1.5 bg-blue-50 text-blue-800 px-3 py-1.5 rounded-full border border-blue-200">
                <ShieldCheck size={14} className="text-blue-600" />
                <span>FBISE Islamabad Affiliated</span>
              </span>
            </div>
          </div>

          {/* Right Asymmetric Picture Box Composition: One Large + One Small */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative"
          >
            {/* Background Accent glow */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-secondary/30 to-primary/10 rounded-3xl blur-xl opacity-70 -z-10" />

            {/* Main / Large Picture */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
              <img
                src={heritage}
                alt="Air Foundation Campus Heritage"
                className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-5 right-5 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-secondary text-slate-900 px-2.5 py-1 rounded-md">
                  Main Campus Block
                </span>
                <p className="text-xs text-slate-200 mt-1.5 font-medium">
                  Modern laboratories, digital classrooms & athletic facilities
                </p>
              </div>
            </div>

            {/* Overlapping Smaller Secondary Picture */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="absolute -bottom-8 -left-6 sm:-left-10 w-44 sm:w-52 rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white z-20"
            >
              <img
                src={college}
                alt="College Wing"
                className="w-full aspect-[16/10] object-cover"
              />
              <div className="p-2.5 bg-slate-900 text-white text-center">
                <p className="text-[11px] font-bold font-poppins text-secondary">College Wing</p>
                <p className="text-[9px] text-slate-300">Grade 11 - 12 (F.Sc / ICS)</p>
              </div>
            </motion.div>

            {/* Overlapping Floating Milestone Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute -top-6 -right-4 sm:-right-6 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-slate-100 flex items-center space-x-3 z-20"
            >
              <div className="bg-secondary/30 text-slate-900 p-2.5 rounded-xl font-extrabold text-lg font-poppins">
                8+
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-slate-800 font-poppins leading-tight">Years of Excellence</p>
                <p className="text-[10px] text-slate-500">Established in 2018</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
