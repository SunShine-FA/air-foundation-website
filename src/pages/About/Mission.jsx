import React from 'react';
import { Helmet } from 'react-helmet-async';
import Breadcrumb from '../../components/Breadcrumb';
import SectionHeader from '../../components/SectionHeader';
import { Target, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Mission() {
  const objectives = [
    'Deliver a rigorous, internationally aligned curriculum that challenges and inspires students.',
    'Build cutting-edge campus systems for science, creative arts, and computational technology.',
    'Recruit, retain, and support distinguished faculty who are leaders in pedagogical innovation.',
    'Foster a safe, inclusive, and collaborative environment that supports the wellness of every student.',
    'Provide extensive athletic and performance programs to nurture multiple facets of intelligence.',
    'Cultivate leadership, civic responsibility, and ecological awareness through community-based work.'
  ];

  return (
    <>
      <Helmet>
        <title>Our Mission & Objectives | Air Foundation School \& College</title>
      </Helmet>

      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-5xl font-extrabold font-poppins">Our Mission</h1>
          <p className="text-slate-200 text-sm sm:text-base mt-4 max-w-xl">
            Providing high-end academic frameworks to foster character, leadership, and curiosity.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumb title="Mission" />
      </div>

      <section className="py-16 bg-white font-inter">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="bg-primary/5 p-6 rounded-full w-24 h-24 flex items-center justify-center mx-auto text-primary">
            <Target size={40} className="text-secondary" />
          </div>
          <SectionHeader title="Our Strategic Objectives" subtitle="Mission Blueprint" alignment="center" />
          
          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100/60 shadow-sm space-y-6">
            <h3 className="text-xl font-bold font-poppins text-slate-800 border-b border-slate-200 pb-3">
              How We Deliver Quality Education
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {objectives.map((obj, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="flex items-start space-x-3"
                >
                  <CheckCircle2 size={18} className="text-secondary shrink-0 mt-1" />
                  <span className="text-slate-600 text-sm leading-relaxed">{obj}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
