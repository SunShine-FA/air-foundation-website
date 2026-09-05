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
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100/90 group flex flex-col h-full w-full text-left"
    >
      <div className="relative overflow-hidden aspect-[16/10] bg-slate-100 shrink-0">
        <img
          src={program.image}
          alt={program.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-60" />
        <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white px-3 py-1.5 rounded-xl shadow-md flex items-center space-x-1.5 border border-white/10">
          <BookOpen size={14} className="text-secondary" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Academic Stream</span>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors font-poppins line-clamp-1">
            {program.title}
          </h3>
          <span className="inline-block text-[11px] text-primary font-bold bg-primary/5 px-2.5 py-0.5 rounded-md mt-1 line-clamp-1">
            {program.curriculum}
          </span>
          <p className="text-slate-600 text-xs sm:text-sm mt-3 leading-relaxed line-clamp-3">
            {program.description}
          </p>
        </div>

        <div className="border-t border-slate-100 pt-4">
          <Link
            to="/academics"
            className="inline-flex items-center space-x-2 text-primary font-bold text-xs uppercase tracking-wider hover:text-secondary-dark group/btn transition-colors"
          >
            <span>Explore Curriculum</span>
            <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
