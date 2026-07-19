import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Breadcrumb from '../components/Breadcrumb';
import SectionHeader from '../components/SectionHeader';
import { GALLERY } from '../data/mockData';
import { motion, AnimatePresence } from 'framer-motion';

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('All');
  const categories = ['All', 'Events', 'Arts', 'Tech', 'Sports', 'Academic', 'Ceremonies'];

  const filteredGallery = activeFilter === 'All'
    ? GALLERY
    : GALLERY.filter(item => item.category.toLowerCase().includes(activeFilter.toLowerCase()) || activeFilter.toLowerCase().includes(item.category.toLowerCase()));

  return (
    <>
      <Helmet>
        <title>Media Gallery | Air Foundation School \& College</title>
      </Helmet>

      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-5xl font-extrabold font-poppins">Campus Media Gallery</h1>
          <p className="text-slate-200 text-sm sm:text-base mt-4 max-w-xl">
            A window into student achievements, sports events, and arts programs.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumb title="Gallery" />
      </div>

      <section className="py-16 bg-white font-inter">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <SectionHeader title="Moments of Collaboration & Achievement" subtitle="Air Foundation Portfolio" alignment="center" />
          
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2.5 max-w-3xl mx-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-350 cursor-pointer ${
                  activeFilter === cat
                    ? 'bg-primary text-white shadow-md shadow-primary/10'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredGallery.map((item, idx) => (
                <motion.div
                  layout
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="relative rounded-2xl overflow-hidden group aspect-[4/3] bg-slate-100 shadow-sm hover:shadow-lg transition-shadow"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <span className="text-[10px] text-secondary font-bold tracking-widest uppercase">{item.category}</span>
                    <h4 className="text-white font-bold text-lg mt-1 font-poppins">{item.title}</h4>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </>
  );
}
