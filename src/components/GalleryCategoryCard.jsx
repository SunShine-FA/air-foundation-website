import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2, Sparkles, Image as ImageIcon, Calendar } from 'lucide-react';

export default function GalleryCategoryCard({
  category,
  album = null,
  items = [], // fallback if legacy items list passed
  isFeatured = false,
  onOpenLightbox
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  // Normalize photo list from album.images or album.image or items
  const photosList = React.useMemo(() => {
    if (album) {
      if (Array.isArray(album.images) && album.images.length > 0) {
        return album.images.map((img, idx) => ({
          id: `${album.id || 'album'}_${idx}`,
          title: album.title,
          category: album.category,
          date: album.date,
          description: album.description,
          image: typeof img === 'string' ? img : img.image || img.url
        }));
      }
      if (album.image) {
        return [{
          id: album.id,
          title: album.title,
          category: album.category,
          date: album.date,
          description: album.description,
          image: album.image
        }];
      }
    }
    if (Array.isArray(items) && items.length > 0) {
      return items.map(item => ({
        ...item,
        image: typeof item === 'string' ? item : item.image || item.url
      }));
    }
    return [];
  }, [album, items]);

  const total = photosList.length;
  const currentPhoto = photosList[currentIndex] || photosList[0];

  const eventTitle = album?.title || currentPhoto?.title || 'Campus Event';
  const eventCategory = album?.category || category || currentPhoto?.category || 'Events';
  const eventDate = album?.date || currentPhoto?.date;
  const eventDesc = album?.description || currentPhoto?.description;

  // Auto-play slide transition (pauses on hover)
  useEffect(() => {
    if (total <= 1 || isHovered) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
    }, 4500);
    return () => clearInterval(timer);
  }, [total, isHovered]);

  if (total === 0) return null;

  const handlePrev = (e) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (e, index) => {
    e?.stopPropagation();
    setCurrentIndex(index);
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 40) {
      handleNext();
    } else if (diff < -40) {
      handlePrev();
    }
    setTouchStartX(null);
  };

  return (
    <motion.div
      layout
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={() => onOpenLightbox && onOpenLightbox(currentPhoto, photosList, currentIndex)}
      className={`relative rounded-3xl overflow-hidden group bg-slate-950 shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer border border-slate-100/10 select-none ${
        isFeatured
          ? 'col-span-1 sm:col-span-2 lg:col-span-2 lg:row-span-2 min-h-[340px] sm:min-h-[440px] lg:min-h-[500px]'
          : 'col-span-1 min-h-[280px] sm:min-h-[300px]'
      }`}
    >
      {/* Background Image Carousel with Crossfade */}
      <AnimatePresence mode="wait">
        <motion.img
          key={currentPhoto.image || currentIndex}
          src={currentPhoto.image}
          alt={eventTitle}
          initial={{ opacity: 0.4, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0.3 }}
          transition={{ duration: 0.35 }}
          className="w-full h-full object-cover absolute inset-0 transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800';
          }}
        />
      </AnimatePresence>

      {/* Gradient Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-slate-950/25 transition-opacity duration-300" />

      {/* Top Bar: Category Pill + Date + Photo Count */}
      <div className="absolute top-4 inset-x-4 flex items-center justify-between z-20 pointer-events-none">
        <div className="flex items-center space-x-2">
          <span className="text-[10px] sm:text-[11px] text-slate-900 font-extrabold uppercase tracking-wider bg-secondary px-2.5 py-1 rounded-full shadow-md backdrop-blur-md">
            {eventCategory}
          </span>
          {eventDate && (
            <span className="hidden sm:inline-flex items-center space-x-1 text-[10px] text-white/90 font-medium bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 shadow-sm">
              <Calendar size={10} className="text-secondary" />
              <span>{eventDate}</span>
            </span>
          )}
          {isFeatured && (
            <span className="hidden sm:inline-flex items-center space-x-1 text-[10px] text-white font-bold bg-primary/90 px-2.5 py-1 rounded-full shadow-md backdrop-blur-md">
              <Sparkles size={11} className="text-secondary" />
              <span>Spotlight</span>
            </span>
          )}
        </div>

        <div className="flex items-center space-x-2 pointer-events-auto">
          <span className="text-[10px] font-mono font-bold text-white bg-slate-900/85 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15 shadow-sm flex items-center space-x-1">
            <ImageIcon size={11} className="text-secondary" />
            <span>{currentIndex + 1} / {total}</span>
          </span>
          <div className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
            <Maximize2 size={14} />
          </div>
        </div>
      </div>

      {/* Navigation Arrows (Swipe left / right within event album) */}
      {total > 1 && (
        <>
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous photo in event album"
            title="Previous photo"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-900/85 hover:bg-secondary text-white hover:text-slate-950 backdrop-blur-md flex items-center justify-center transition-all duration-200 shadow-xl cursor-pointer border border-white/20 hover:scale-110 active:scale-95 opacity-90 group-hover:opacity-100"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next photo in event album"
            title="Next photo"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-900/85 hover:bg-secondary text-white hover:text-slate-950 backdrop-blur-md flex items-center justify-center transition-all duration-200 shadow-xl cursor-pointer border border-white/20 hover:scale-110 active:scale-95 opacity-90 group-hover:opacity-100"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      {/* Bottom Content Area: Main Event Title, Description & Pagination Dots */}
      <div className={`absolute bottom-0 inset-x-0 p-5 sm:p-6 flex flex-col justify-end text-white z-20 text-left ${
        isFeatured ? 'sm:p-8 space-y-2.5' : 'space-y-1.5'
      }`}>
        <div>
          <h3 className={`font-bold font-poppins text-white leading-snug drop-shadow-md group-hover:text-secondary transition-colors ${
            isFeatured ? 'text-xl sm:text-2xl lg:text-3xl' : 'text-base sm:text-lg'
          }`}>
            {eventTitle}
          </h3>
          {eventDesc && (
            <p className="text-xs text-slate-300/90 line-clamp-2 mt-1 leading-relaxed max-w-xl">
              {eventDesc}
            </p>
          )}
        </div>

        {/* Dotted Pagination Indicators */}
        {total > 1 && (
          <div className="flex items-center space-x-1.5 pt-2">
            {photosList.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={(e) => handleDotClick(e, dotIdx)}
                aria-label={`Go to photo ${dotIdx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === dotIdx
                    ? 'w-7 bg-secondary shadow-sm'
                    : 'w-2 bg-white/40 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

