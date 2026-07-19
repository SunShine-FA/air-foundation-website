import React from 'react';
import { motion } from 'framer-motion';

export default function FacilityCard({ facility, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100 group flex flex-col h-full"
    >
      <div className="relative overflow-hidden aspect-[4/3] bg-slate-100 shrink-0">
        <img
          src={facility.image}
          alt={facility.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
        <h3 className="absolute bottom-4 left-5 text-xl font-bold text-white font-poppins drop-shadow-md">
          {facility.title}
        </h3>
      </div>
      <div className="p-5 flex-1 flex flex-col justify-between">
        <p className="text-slate-600 text-sm leading-relaxed">
          {facility.description}
        </p>
      </div>
    </motion.div>
  );
}
