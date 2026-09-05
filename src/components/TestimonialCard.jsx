import React from 'react';
import { Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import { getImageUrl, handleImageError } from '../utils/imageHelper';

export default function TestimonialCard({ testimonial, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white p-8 rounded-3xl shadow-md border border-slate-100/60 relative flex flex-col justify-between h-full group hover:shadow-xl transition-all duration-300"
    >
      <Quote size={40} className="text-secondary/20 absolute top-6 right-8 group-hover:scale-110 transition-transform" />
      
      <div className="relative">
        <p className="text-slate-600 italic leading-relaxed text-sm">
          "{testimonial.quote}"
        </p>
      </div>

      <div className="flex items-center space-x-4 mt-8 border-t border-slate-100 pt-5">
        <img
          src={getImageUrl(testimonial.image)}
          alt={testimonial.author}
          onError={(e) => handleImageError(e, (testimonial.author || '').toLowerCase().includes("mrs") || (testimonial.author || '').toLowerCase().includes("ms"))}
          className="w-12 h-12 rounded-full object-cover border-2 border-primary/20 shrink-0"
          loading="lazy"
        />
        <div>
          <h4 className="text-sm font-bold text-slate-900 font-poppins">
            {testimonial.author}
          </h4>
          <p className="text-xs text-slate-400 font-medium mt-0.5">
            {testimonial.relation}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
