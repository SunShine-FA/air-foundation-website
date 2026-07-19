import React from 'react';
import { motion } from 'framer-motion';

export default function SectionHeader({ title, subtitle, alignment = 'center', light = false }) {
  const isCenter = alignment === 'center';
  
  return (
    <div className={`mb-12 max-w-3xl ${isCenter ? 'mx-auto text-center' : 'text-left'}`}>
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={`text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full ${
          light 
            ? 'bg-white/10 text-secondary' 
            : 'bg-primary/5 text-primary'
        }`}
      >
        {subtitle}
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={`text-3xl sm:text-4xl font-extrabold tracking-tight mt-3 font-poppins ${
          light ? 'text-white' : 'text-slate-900'
        }`}
      >
        {title}
      </motion.h2>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={`h-1 w-16 bg-secondary mt-4 ${isCenter ? 'mx-auto' : ''}`}
      />
    </div>
  );
}
