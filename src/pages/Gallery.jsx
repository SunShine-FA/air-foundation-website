import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import Breadcrumb from '../components/Breadcrumb';
import SectionHeader from '../components/SectionHeader';
import { motion } from 'framer-motion';
import { useData } from '../context/DataContext';
import GalleryCategoryCard from '../components/GalleryCategoryCard';
import GalleryLightbox from '../components/GalleryLightbox';

export default function Gallery() {
  const { gallery } = useData();
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [lightboxList, setLightboxList] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const categories = ['All', 'Tech', 'Sports', 'Events', 'Arts', 'Academic', 'Ceremonies'];

  // Group photos by category for category cards
  const categoryGroups = useMemo(() => {
    const groups = {};
    (gallery || []).forEach((item) => {
      const cat = item.category || 'General';
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(item);
    });
    return groups;
  }, [gallery]);

  const filteredGallery = useMemo(() => {
    if (activeFilter === 'All') return gallery || [];
    return (gallery || []).filter(
      item =>
        (item.category || '').toLowerCase().includes(activeFilter.toLowerCase()) ||
        activeFilter.toLowerCase().includes((item.category || '').toLowerCase())
    );
  }, [gallery, activeFilter]);

  const handleOpenLightbox = (photo, list = filteredGallery, index = 0) => {
    setSelectedPhoto(photo);
    setLightboxList(list && list.length > 0 ? list : gallery);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>Media Gallery | Air Foundation School & College</title>
      </Helmet>

      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <h1 className="text-3xl sm:text-5xl font-extrabold font-poppins">Campus Media Gallery</h1>
          <p className="text-slate-200 text-sm sm:text-base mt-4 max-w-xl">
            A window into student achievements, robotics workshops, sports meets, exhibitions, and campus life.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumb title="Gallery" />
      </div>

      <section className="py-16 bg-white font-inter">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <SectionHeader
            title="Moments of Innovation, Creativity & Growth"
            subtitle="Air Foundation Media Portfolio"
            alignment="center"
          />

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2.5 max-w-4xl mx-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeFilter === cat
                    ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Gallery Bento Grid with Multi-Photo Event Album Cards */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left"
          >
            {filteredGallery.length > 0 ? (
              filteredGallery.map((albumItem, idx) => (
                <GalleryCategoryCard
                  key={albumItem.id || idx}
                  album={albumItem}
                  isFeatured={idx === 0 && activeFilter === 'All'}
                  onOpenLightbox={(photo, list, pIdx) => handleOpenLightbox(photo, list, pIdx)}
                />
              ))
            ) : (
              <div className="col-span-full py-16 text-center text-slate-400 text-sm">
                No event albums available for category: "{activeFilter}".
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Responsive Lightbox Modal with Next/Prev Arrow Navigation & Scrolling */}
      <GalleryLightbox
        isOpen={lightboxOpen}
        selectedItem={selectedPhoto}
        allItems={lightboxList}
        initialIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
}
