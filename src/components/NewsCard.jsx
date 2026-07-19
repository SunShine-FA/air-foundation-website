import React from 'react';
import { Calendar, Tag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NewsCard({ article, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100 group flex flex-col h-full"
    >
      <div className="relative overflow-hidden aspect-[16/10] bg-slate-100 shrink-0">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md shadow-sm flex items-center space-x-1.5">
          <Tag size={10} className="text-secondary" />
          <span>{article.category}</span>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center text-slate-400 text-xs font-medium space-x-2">
            <Calendar size={13} />
            <span>{article.date}</span>
          </div>

          <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors font-poppins mt-3 leading-snug">
            {article.title}
          </h3>

          <p className="text-slate-500 text-sm mt-3 leading-relaxed">
            {article.excerpt}
          </p>
        </div>

        <div className="mt-6 border-t border-slate-100 pt-4">
          <Link
            to="/news"
            className="inline-flex items-center space-x-1.5 text-primary font-bold text-sm hover:text-secondary-dark group/btn transition-colors"
          >
            <span>Read Article</span>
            <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
