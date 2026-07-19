import React from 'react';
import { motion } from 'framer-motion';

export default function Timeline({ items }) {
  return (
    <div className="relative border-l-2 border-primary/20 ml-4 md:ml-32 py-4 space-y-12">
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="relative pl-8 md:pl-12"
        >
          {/* Timeline node */}
          <div className="absolute -left-[17px] top-1 bg-secondary text-[#072a61] w-8 h-8 rounded-full border-4 border-slate-50 flex items-center justify-center font-bold text-sm shadow-md font-poppins">
            {item.step}
          </div>

          {/* Leftside date stamp for desktop */}
          <div className="hidden md:block absolute right-full top-2 pr-12 text-right">
            <span className="text-sm font-bold text-primary font-poppins">{item.date}</span>
          </div>

          {/* Card container */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100/60 hover:shadow-md transition-shadow">
            <span className="md:hidden inline-block text-xs font-bold text-primary bg-primary/5 px-2.5 py-1 rounded-md mb-2">
              {item.date}
            </span>
            <h3 className="text-lg font-bold text-slate-900 font-poppins">
              {item.title}
            </h3>
            <p className="text-slate-600 text-sm mt-2 leading-relaxed">
              {item.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
