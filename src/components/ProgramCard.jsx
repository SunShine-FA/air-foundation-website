import React from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function ProgramCard({ program, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100 group flex flex-col h-full"
    >
      <div className="relative overflow-hidden aspect-video bg-slate-100 shrink-0">
        <img
          src={program.image}
          alt={program.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-4 left-4 bg-primary text-white p-2 rounded-lg shadow-md">
          <BookOpen size={16} className="text-secondary animate-pulse" />
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors font-poppins">
            {program.title}
          </h3>
          <p className="text-xs text-slate-400 mt-1 font-semibold">
            Curriculum: {program.curriculum}
          </p>
          <p className="text-slate-600 text-sm mt-3.5 leading-relaxed">
            {program.description}
          </p>
        </div>

        <div className="mt-6 border-t border-slate-100 pt-4">
          <Link
            to="/academics"
            className="inline-flex items-center space-x-2 text-primary font-bold text-sm hover:text-secondary-dark group/btn transition-colors"
          >
            <span>Explore Curriculum</span>
            <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
