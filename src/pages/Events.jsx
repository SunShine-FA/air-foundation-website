import React from 'react';
import { Helmet } from 'react-helmet-async';
import Breadcrumb from '../components/Breadcrumb';
import SectionHeader from '../components/SectionHeader';
import { EVENTS } from '../data/mockData';
import { Calendar, Clock, MapPin, Bell } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Events() {
  return (
    <>
      <Helmet>
        <title>Campus Events Schedule | Air Foundation School \& College</title>
      </Helmet>

      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-5xl font-extrabold font-poppins">Upcoming Events</h1>
          <p className="text-slate-200 text-sm sm:text-base mt-4 max-w-xl">
            Schedules for school meets, athletic meets, symphonies, and parent interaction hours.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumb title="Events" />
      </div>

      <section className="py-16 bg-white font-inter">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
          <SectionHeader title="School Schedule & Gatherings" subtitle="Calendar Events" alignment="center" />
          
          <div className="space-y-6">
            {EVENTS.map((evt, idx) => (
              <motion.div
                key={evt.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row gap-6 items-start"
              >
                {/* Date block */}
                <div className="bg-primary text-white p-4 sm:p-6 rounded-2xl text-center shrink-0 w-full md:w-32 flex flex-col items-center justify-center">
                  <Calendar size={22} className="text-secondary mb-1.5" />
                  <span className="text-sm font-bold uppercase tracking-wider">{evt.date.split(',')[0]}</span>
                </div>

                {/* Details */}
                <div className="space-y-3 flex-grow">
                  <h3 className="text-xl font-bold font-poppins text-slate-800 leading-snug">{evt.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{evt.description}</p>
                  
                  <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-400 pt-2 border-t border-slate-200/50">
                    <span className="flex items-center space-x-1.5">
                      <Clock size={14} className="text-primary" />
                      <span>{evt.time}</span>
                    </span>
                    <span className="flex items-center space-x-1.5">
                      <MapPin size={14} className="text-primary" />
                      <span>{evt.location}</span>
                    </span>
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
