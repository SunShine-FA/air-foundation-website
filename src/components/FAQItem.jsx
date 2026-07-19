import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FAQItem({ faq, index }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="bg-white rounded-2xl shadow-sm border border-slate-100/60 overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
        aria-expanded={isOpen}
      >
        <span className="font-bold text-slate-800 text-sm sm:text-base font-poppins pr-4">
          {faq.question}
        </span>
        <span className={`p-1.5 rounded-lg bg-primary/5 text-primary transition-transform duration-300 ${isOpen ? 'rotate-180 bg-secondary/20 text-slate-900' : ''}`}>
          <ChevronDown size={18} />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <div className="px-6 pb-6 text-slate-600 text-sm leading-relaxed border-t border-slate-50 pt-4">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
