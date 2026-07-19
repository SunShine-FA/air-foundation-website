import React from 'react';
import { Mail, Briefcase, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FacultyCard({ faculty, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100 group flex flex-col h-full"
    >
      <div className="relative overflow-hidden aspect-[4/5] bg-slate-100 shrink-0">
        <img
          src={faculty.image}
          alt={faculty.name}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <a
            href={`mailto:${faculty.email}`}
            className="w-full bg-secondary text-slate-900 py-2.5 rounded-xl font-semibold text-xs flex items-center justify-center space-x-2 shadow-lg hover:bg-white hover:text-primary transition-all duration-300"
          >
            <Mail size={14} />
            <span>Contact Faculty</span>
          </a>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors font-poppins">
          {faculty.name}
        </h3>
        <p className="text-xs text-secondary-dark font-bold uppercase tracking-wider mt-0.5 font-inter">
          {faculty.role}
        </p>

        <div className="mt-4 space-y-2 border-t border-slate-100 pt-3 text-slate-600 text-xs flex-1">
          <div className="flex items-start space-x-2">
            <GraduationCap size={15} className="text-primary shrink-0 mt-0.5" />
            <span>{faculty.qualification}</span>
          </div>
          <div className="flex items-start space-x-2">
            <Briefcase size={14} className="text-primary shrink-0 mt-0.5" />
            <span>{faculty.experience}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
