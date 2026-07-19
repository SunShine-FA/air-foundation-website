import React from 'react';
import { Helmet } from 'react-helmet-async';
import Breadcrumb from '../../components/Breadcrumb';
import SectionHeader from '../../components/SectionHeader';
import { motion } from 'framer-motion';

export default function Principal() {
  return (
    <>
      <Helmet>
        <title>Principal's Message | Air Foundation School \& College</title>
      </Helmet>

      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-5xl font-extrabold font-poppins">Principal's Address</h1>
          <p className="text-slate-200 text-sm sm:text-base mt-4 max-w-xl">
            Welcome address and annual guidelines from Principal Dr. Robert Chen.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumb title="Principal's Message" />
      </div>

      <section className="py-16 bg-white font-inter">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Picture */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4"
          >
            <img
              src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=800"
              alt="Principal Dr. Robert Chen"
              className="w-full rounded-3xl shadow-lg aspect-[4/5] object-cover"
            />
            <div className="mt-5 text-center lg:text-left bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <h4 className="font-bold text-slate-800 font-poppins text-base">Dr. Robert Chen</h4>
              <p className="text-xs text-slate-400 font-bold uppercase mt-0.5">Principal & Physics Lead</p>
              <div className="text-xs text-slate-500 mt-4 space-y-1.5 border-t border-slate-200/60 pt-3">
                <p><strong>Office Hours:</strong> 2:00 PM - 4:00 PM (Mon-Fri)</p>
                <p><strong>Email:</strong> principal@premschool.edu</p>
              </div>
            </div>
          </motion.div>

          {/* Main message */}
          <div className="lg:col-span-8 space-y-6">
            <SectionHeader title="Inspiring Academic & Character Excellence" subtitle="Principal's Desk" alignment="left" />
            <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
              <p className="font-semibold text-slate-800">Dear Parents, Students, and Visitors,</p>
              <p>
                Welcome to the digital portal of Air Foundation School \& College. As Principal, it is a privilege to lead an institution that is deeply committed to nurturing the academic core and moral capabilities of our next generation.
              </p>
              <p>
                Our pedagogy rests on active inquiry. We encourage our students to not just memorize, but to question, evaluate, and design solutions. This critical capacity is what sets Air Foundation School \& College graduates apart in ivy placements and national competitive assessments.
              </p>
              <p>
                I invite all prospective parents and students to tour our modern classrooms, interact with our brilliant faculty, and become a part of our traditional legacy of excellence.
              </p>
              <p className="pt-4 font-poppins font-bold text-slate-900">Dr. Robert Chen</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
