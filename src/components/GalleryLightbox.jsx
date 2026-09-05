import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2, Tag, Image as ImageIcon } from 'lucide-react';

export default function GalleryLightbox({
  isOpen,
  selectedItem,
  allItems = [],
  initialIndex = 0,
  onClose
}) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // Sync index when selectedItem or initialIndex changes
  useEffect(() => {
    if (selectedItem && allItems.length > 0) {
      const idx = allItems.findIndex(
        item => item.id === selectedItem.id || (item.image === selectedItem.image && item.title === selectedItem.title)
      );
      if (idx !== -1) {
        setCurrentIndex(idx);
      } else {
        setCurrentIndex(initialIndex);
      }
    }
  }, [selectedItem, allItems, initialIndex]);

  // Keyboard navigation & Escape handling
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, allItems.length]);

  if (!isOpen || !selectedItem) return null;

  const rawPhoto = allItems[currentIndex] || selectedItem;
  const total = allItems.length;

  const photoImg = typeof rawPhoto === 'string' ? rawPhoto : rawPhoto.image;
  const photoTitle = (typeof rawPhoto === 'object' && rawPhoto.title) ? rawPhoto.title : (selectedItem?.title || 'Campus Event');
  const photoCategory = (typeof rawPhoto === 'object' && rawPhoto.category) ? rawPhoto.category : (selectedItem?.category || 'Gallery');
  const photoDate = typeof rawPhoto === 'object' ? rawPhoto.date : selectedItem?.date;
  const photoDesc = typeof rawPhoto === 'object' ? rawPhoto.description : selectedItem?.description;

  const handlePrev = (e) => {
    e?.stopPropagation();
    setCurrentIndex(prev => (prev === 0 ? total - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e?.stopPropagation();
    setCurrentIndex(prev => (prev === total - 1 ? 0 : prev + 1));
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-5xl w-full my-auto max-h-[92vh] flex flex-col bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-white/15 text-left"
        >
          {/* Top Bar */}
          <div className="px-5 py-3.5 bg-slate-950/80 border-b border-white/10 flex items-center justify-between z-30 shrink-0">
            <div className="flex items-center space-x-2.5">
              <span className="text-[11px] font-extrabold uppercase tracking-wider bg-secondary text-slate-900 px-2.5 py-1 rounded-full">
                {photoCategory}
              </span>
              {photoDate && (
                <span className="text-xs font-semibold text-slate-300 bg-white/10 px-2.5 py-0.5 rounded-full">
                  {photoDate}
                </span>
              )}
              {total > 1 && (
                <span className="text-xs font-mono font-bold text-slate-300 bg-white/10 px-2.5 py-0.5 rounded-full flex items-center space-x-1">
                  <ImageIcon size={12} className="text-secondary" />
                  <span>{currentIndex + 1} of {total}</span>
                </span>
              )}
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-rose-600 text-slate-200 hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-white/10"
              title="Close Preview (Esc)"
            >
              <X size={18} />
            </button>
          </div>

          {/* Main Picture Frame */}
          <div className="relative flex-1 min-h-[280px] max-h-[62vh] sm:max-h-[68vh] bg-slate-950 flex items-center justify-center p-2 sm:p-4 overflow-hidden select-none">
            <AnimatePresence mode="wait">
              <motion.img
                key={photoImg || currentIndex}
                src={photoImg}
                alt={photoTitle}
                initial={{ opacity: 0.3, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0.2 }}
                transition={{ duration: 0.25 }}
                className="max-w-full max-h-full object-contain rounded-xl drop-shadow-2xl"
              />
            </AnimatePresence>

            {/* Previous Photo Button */}
            {total > 1 && (
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous photo"
                className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-900/80 hover:bg-white text-white hover:text-slate-900 backdrop-blur-md flex items-center justify-center transition-all duration-200 shadow-xl border border-white/15 cursor-pointer hover:scale-110 active:scale-95"
              >
                <ChevronLeft size={22} />
              </button>
            )}

            {/* Next Photo Button */}
            {total > 1 && (
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next photo"
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-900/80 hover:bg-white text-white hover:text-slate-900 backdrop-blur-md flex items-center justify-center transition-all duration-200 shadow-xl border border-white/15 cursor-pointer hover:scale-110 active:scale-95"
              >
                <ChevronRight size={22} />
              </button>
            )}
          </div>

          {/* Bottom Details Bar (Scrollable if caption is long) */}
          <div className="p-5 sm:p-6 bg-slate-900 border-t border-white/10 text-white shrink-0 max-h-36 overflow-y-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div className="space-y-0.5">
              <h4 className="text-lg sm:text-xl font-bold font-poppins text-white leading-tight">
                {photoTitle}
              </h4>
              {photoDesc ? (
                <p className="text-xs text-slate-300 line-clamp-2 max-w-2xl">
                  {photoDesc}
                </p>
              ) : (
                <p className="text-xs text-slate-400">
                  Air Foundation School & College • Campus Moments
                </p>
              )}
            </div>

            {total > 1 && (
              <div className="flex items-center space-x-1.5 self-center sm:self-auto overflow-x-auto max-w-full py-1">
                {allItems.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Thumbnail ${idx + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      currentIndex === idx
                        ? 'w-7 bg-secondary shadow-sm'
                        : 'w-2 bg-white/30 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
