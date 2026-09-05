import React, { useState, useEffect } from 'react';
import { X, Upload, Trash2, Image as ImageIcon, Plus, Check, AlertCircle, Layers, Calendar, FileText, CheckCircle2, Star, GripVertical } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { contentService } from '../../../services/contentService';

export default function EventAlbumModal({
  isOpen,
  onClose,
  onSave,
  album = null, // null for new album, or existing album object for editing
  showToast,
  nextSortOrder = 1
}) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Events');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  // photosList: Array of { id, url, file (optional), isNew, previewUrl }
  const [photosList, setPhotosList] = useState([]);
  const [coverIndex, setCoverIndex] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({ current: 0, total: 0, percent: 0 });
  const [errorMsg, setErrorMsg] = useState('');
  const [urlInput, setUrlInput] = useState('');
  const [showUrlBox, setShowUrlBox] = useState(false);

  const categories = ['Events', 'Sports', 'Tech', 'Arts', 'Academic', 'Ceremonies'];

  useEffect(() => {
    if (isOpen) {
      if (album) {
        setTitle(album.title || '');
        setCategory(album.category || 'Events');
        setDate(album.date || '');
        setDescription(album.description || '');

        // Extract existing images
        let existingImages = [];
        if (Array.isArray(album.images) && album.images.length > 0) {
          existingImages = album.images;
        } else if (album.image) {
          existingImages = [album.image];
        }

        setPhotosList(existingImages.map((url, i) => ({
          id: `existing_${i}_${Math.random().toString(36).substr(2, 5)}`,
          url,
          previewUrl: url,
          isNew: false
        })));
        setCoverIndex(0);
      } else {
        // Reset for new album
        setTitle('');
        setCategory('Events');
        setDate(new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }));
        setDescription('');
        setPhotosList([]);
        setCoverIndex(0);
      }
      setErrorMsg('');
      setShowUrlBox(false);
      setUrlInput('');
    }
  }, [isOpen, album]);

  if (!isOpen) return null;

  const handleFilesSelect = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const newItems = files.map((file, idx) => ({
      id: `new_${Date.now()}_${idx}_${Math.random().toString(36).substr(2, 5)}`,
      file,
      url: '',
      previewUrl: URL.createObjectURL(file),
      isNew: true,
      name: file.name
    }));

    setPhotosList(prev => [...prev, ...newItems]);
    setErrorMsg('');
    e.target.value = '';
  };

  const handleAddUrl = () => {
    const raw = urlInput.trim();
    if (!raw) return;

    const lines = raw
      .split('\n')
      .map(l => l.trim())
      .filter(l => l.startsWith('http://') || l.startsWith('https://') || l.startsWith('/'));

    if (lines.length === 0) {
      setErrorMsg('Please enter a valid image URL');
      return;
    }

    const newItems = lines.map((url, idx) => ({
      id: `url_${Date.now()}_${idx}`,
      url,
      previewUrl: url,
      isNew: false
    }));

    setPhotosList(prev => [...prev, ...newItems]);
    setUrlInput('');
    setShowUrlBox(false);
    setErrorMsg('');
  };

  const handleRemovePhoto = (id, idx) => {
    setPhotosList(prev => {
      const target = prev.find(p => p.id === id);
      if (target && target.isNew && target.previewUrl) {
        URL.revokeObjectURL(target.previewUrl);
      }
      return prev.filter(p => p.id !== id);
    });

    if (coverIndex >= idx && coverIndex > 0) {
      setCoverIndex(coverIndex - 1);
    }
  };

  const handleSetCover = (idx) => {
    setCoverIndex(idx);
  };

  const handleMovePhoto = (fromIdx, toIdx) => {
    if (toIdx < 0 || toIdx >= photosList.length) return;
    setPhotosList(prev => {
      const copy = [...prev];
      const [moved] = copy.splice(fromIdx, 1);
      copy.splice(toIdx, 0, moved);
      return copy;
    });

    if (coverIndex === fromIdx) {
      setCoverIndex(toIdx);
    } else if (fromIdx < coverIndex && toIdx >= coverIndex) {
      setCoverIndex(coverIndex - 1);
    } else if (fromIdx > coverIndex && toIdx <= coverIndex) {
      setCoverIndex(coverIndex + 1);
    }
  };

  const handleClose = () => {
    if (isUploading) return;
    photosList.forEach(p => {
      if (p.isNew && p.previewUrl) URL.revokeObjectURL(p.previewUrl);
    });
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!title.trim()) {
      setErrorMsg('Please enter the Event Title / Heading (e.g. Parent Teacher Meeting).');
      return;
    }

    if (photosList.length === 0) {
      setErrorMsg('Please add at least one photo for this event.');
      return;
    }

    setIsUploading(true);
    const newPhotosToUpload = photosList.filter(p => p.isNew && p.file);
    const totalNew = newPhotosToUpload.length;
    let uploadedCount = 0;

    const finalImageUrls = [];

    for (let i = 0; i < photosList.length; i++) {
      const item = photosList[i];
      if (item.isNew && item.file) {
        uploadedCount++;
        setUploadProgress({
          current: uploadedCount,
          total: totalNew,
          percent: Math.round((uploadedCount / totalNew) * 100)
        });

        try {
          const res = await contentService.uploadMedia(item.file, 'gallery');
          const uploadedUrl = res.success && res.url ? res.url : item.previewUrl;
          finalImageUrls.push(uploadedUrl);
        } catch (err) {
          console.error('Error uploading photo', item.name, err);
          finalImageUrls.push(item.previewUrl);
        }
      } else {
        finalImageUrls.push(item.url || item.previewUrl);
      }
    }

    // Ensure cover photo is index 0 in images array or primary image field
    let coverPhoto = finalImageUrls[coverIndex] || finalImageUrls[0];
    // Place cover image at the beginning of images array
    const orderedImages = [
      coverPhoto,
      ...finalImageUrls.filter((_, idx) => idx !== coverIndex)
    ];

    const payload = {
      title: title.trim(),
      category,
      date: date.trim() || undefined,
      description: description.trim() || undefined,
      image: coverPhoto,
      images: orderedImages,
      sort_order: album?.sort_order || nextSortOrder
    };

    try {
      await onSave(payload, album?.id);
      handleClose();
    } catch (err) {
      setErrorMsg(err.message || 'Failed to save event album.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="bg-white rounded-3xl p-6 sm:p-8 max-w-3xl w-full shadow-2xl border border-slate-100 relative text-left my-6 max-h-[94vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-5 border-b border-slate-100 shrink-0">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <Layers size={20} />
              </div>
              <div>
                <h3 className="text-xl font-bold font-poppins text-slate-900 flex items-center gap-2">
                  <span>{album ? 'Edit Event Album' : 'Create New Event Album'}</span>
                  {photosList.length > 0 && (
                    <span className="text-xs font-semibold bg-primary/10 text-primary px-2.5 py-0.5 rounded-full">
                      {photosList.length} Photos
                    </span>
                  )}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Organize multiple photos under an event heading (e.g. Parent Teacher Meeting, Sports Day).
                </p>
              </div>
            </div>

            <button
              onClick={handleClose}
              disabled={isUploading}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmit} className="overflow-y-auto py-5 space-y-5 pr-1 flex-grow">
            {errorMsg && (
              <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2.5">
                <AlertCircle size={16} className="shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Event Title & Category Row */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
              <div className="sm:col-span-8 space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Event Heading / Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Parent Teacher Meeting (PTM), Sports Gala 2026, Poetry Fest"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 text-sm text-slate-800 transition-all outline-none font-medium"
                />
              </div>

              <div className="sm:col-span-4 space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Category <span className="text-rose-500">*</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 text-sm text-slate-800 transition-all outline-none font-medium"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Date & Optional Description */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
              <div className="sm:col-span-4 space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Event Date / Period
                </label>
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="e.g. August 2026, Term 1"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 text-sm text-slate-800 transition-all outline-none"
                />
              </div>

              <div className="sm:col-span-8 space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Event Brief Description (Optional)
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. Highlights and memorable captures from the campus gathering."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 text-sm text-slate-800 transition-all outline-none"
                />
              </div>
            </div>

            {/* Event Photos Section */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="text-sm font-bold font-poppins text-slate-900">
                    Event Photo Collection ({photosList.length} Photos)
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Add all photos related to this event. Click the star on any photo to set it as the cover.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <label className="px-3.5 py-1.5 rounded-xl bg-primary hover:bg-primary-light text-white font-bold text-xs flex items-center space-x-1.5 cursor-pointer transition-colors shadow-sm">
                    <Plus size={14} />
                    <span>Upload More Photos</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFilesSelect}
                      disabled={isUploading}
                      className="hidden"
                    />
                  </label>

                  <button
                    type="button"
                    onClick={() => setShowUrlBox(!showUrlBox)}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 font-semibold text-xs cursor-pointer"
                  >
                    + Add URL
                  </button>
                </div>
              </div>

              {/* Paste URL Box */}
              {showUrlBox && (
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <label className="block text-[11px] font-bold text-slate-600 uppercase">
                    Paste Image URLs (One per line)
                  </label>
                  <textarea
                    rows={2}
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://images.unsplash.com/...&#10;https://..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-mono outline-none"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowUrlBox(false)}
                      className="px-3 py-1 rounded-lg text-xs text-slate-500 hover:bg-slate-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleAddUrl}
                      className="px-3 py-1 rounded-lg text-xs bg-primary text-white font-bold"
                    >
                      Add Photos
                    </button>
                  </div>
                </div>
              )}

              {/* Photos Gallery Grid */}
              {photosList.length === 0 ? (
                <label className="border-2 border-dashed border-slate-300 hover:border-primary bg-slate-50 hover:bg-primary/5 rounded-3xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all text-center">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shadow-inner">
                    <Upload size={26} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800 font-poppins">
                      Click to choose event photos (select multiple files)
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Upload all photos for this event at once (PNG, JPG, JPEG, WEBP, AVIF)
                    </p>
                  </div>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFilesSelect}
                    disabled={isUploading}
                    className="hidden"
                  />
                </label>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-72 overflow-y-auto p-2.5 bg-slate-50 rounded-2xl border border-slate-200/80">
                  {photosList.map((photo, idx) => {
                    const isCover = coverIndex === idx;

                    return (
                      <div
                        key={photo.id}
                        className={`bg-white rounded-2xl border overflow-hidden shadow-xs relative group flex flex-col transition-all ${
                          isCover ? 'ring-2 ring-secondary border-secondary shadow-md' : 'border-slate-200 hover:border-primary/40'
                        }`}
                      >
                        <div className="relative aspect-[4/3] bg-slate-950 overflow-hidden">
                          <img
                            src={photo.previewUrl || photo.url}
                            alt={`Photo ${idx + 1}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              e.target.src = 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=400';
                            }}
                          />

                          {/* Index Badge */}
                          <span className="absolute top-1.5 left-1.5 bg-slate-950/80 backdrop-blur-xs text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                            #{idx + 1}
                          </span>

                          {/* Cover Badge / Button */}
                          <button
                            type="button"
                            onClick={() => handleSetCover(idx)}
                            className={`absolute top-1.5 right-8 p-1 rounded-full text-xs font-bold transition-all shadow-sm ${
                              isCover
                                ? 'bg-secondary text-slate-950 scale-105'
                                : 'bg-slate-900/70 text-slate-300 hover:text-secondary hover:bg-slate-950 opacity-0 group-hover:opacity-100'
                            }`}
                            title={isCover ? 'Event Cover Photo' : 'Set as Cover Photo'}
                          >
                            <Star size={12} fill={isCover ? 'currentColor' : 'none'} />
                          </button>

                          {/* Delete Photo Button */}
                          <button
                            type="button"
                            onClick={() => handleRemovePhoto(photo.id, idx)}
                            disabled={isUploading}
                            className="absolute top-1.5 right-1.5 p-1 rounded-full bg-rose-600/90 text-white hover:bg-rose-700 transition-colors shadow-sm cursor-pointer opacity-0 group-hover:opacity-100"
                            title="Remove photo from album"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>

                        <div className="p-2 flex items-center justify-between text-[11px] bg-slate-50/80">
                          <span className={`font-semibold truncate ${isCover ? 'text-secondary-dark' : 'text-slate-500'}`}>
                            {isCover ? '★ Main Cover' : `Photo #${idx + 1}`}
                          </span>

                          <div className="flex items-center space-x-1">
                            <button
                              type="button"
                              disabled={idx === 0}
                              onClick={() => handleMovePhoto(idx, idx - 1)}
                              className="px-1 text-[10px] font-bold text-slate-400 hover:text-slate-700 disabled:opacity-20"
                              title="Move Left"
                            >
                              ◀
                            </button>
                            <button
                              type="button"
                              disabled={idx === photosList.length - 1}
                              onClick={() => handleMovePhoto(idx, idx + 1)}
                              className="px-1 text-[10px] font-bold text-slate-400 hover:text-slate-700 disabled:opacity-20"
                              title="Move Right"
                            >
                              ▶
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Upload Progress Bar */}
            {isUploading && uploadProgress.total > 0 && (
              <div className="p-4 bg-primary/5 rounded-2xl border border-primary/20 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-primary">
                  <span>Uploading photos to cloud storage...</span>
                  <span>{uploadProgress.current} of {uploadProgress.total} ({uploadProgress.percent}%)</span>
                </div>
                <div className="w-full bg-primary/20 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-primary h-full transition-all duration-300 rounded-full"
                    style={{ width: `${uploadProgress.percent}%` }}
                  />
                </div>
              </div>
            )}

            {/* Footer Actions */}
            <div className="flex items-center justify-between pt-5 border-t border-slate-100 shrink-0">
              <div className="text-xs text-slate-400">
                Total Album Photos: <strong className="text-slate-800">{photosList.length}</strong>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={isUploading}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading || photosList.length === 0}
                  className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-light text-white font-semibold text-xs transition-all flex items-center space-x-2 shadow-lg shadow-primary/20 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUploading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Saving Album...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={16} />
                      <span>{album ? 'Update Event Album' : 'Save Event Album'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
