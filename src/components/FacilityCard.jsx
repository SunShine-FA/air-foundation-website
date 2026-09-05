import React from 'react';
import { motion } from 'framer-motion';
import { Building2 } from 'lucide-react';

export default function FacilityCard({ facility, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100/90 group flex flex-col h-full text-left"
    >
      <div className="relative overflow-hidden aspect-[4/3] bg-slate-100 shrink-0">
        <img
          src={facility.image}
          alt={facility.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
        
        <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white px-3 py-1 rounded-xl text-[10px] font-bold uppercase tracking-wider flex items-center space-x-1.5 border border-white/10">
          <Building2 size={12} className="text-secondary" />
          <span>Campus Facility</span>
        </div>

        <h3 className="absolute bottom-4 left-5 right-5 text-lg sm:text-xl font-bold text-white font-poppins drop-shadow-md">
          {facility.title}
        </h3>
      </div>
      
      <div className="p-6 flex-1 flex flex-col justify-between">
        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
          {facility.description}
        </p>
      </div>
    </motion.div>
  );
}
