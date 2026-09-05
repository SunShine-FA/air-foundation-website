import React, { useState } from 'react';
import { X, Upload, Trash2, Image as ImageIcon, CheckCircle2, AlertCircle, Layers, Link as LinkIcon, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { contentService } from '../../../services/contentService';

export default function BulkGalleryModal({
  isOpen,
  onClose,
  onUploadSuccess,
  showToast,
  nextSortOrder = 1
}) {
  const [activeTab, setActiveTab] = useState('files'); // 'files' | 'urls'
  const [eventTitle, setEventTitle] = useState('');
  const [category, setCategory] = useState('Events');
  const [selectedFiles, setSelectedFiles] = useState([]); // Array of { file, previewUrl, customTitle }
  const [urlsText, setUrlsText] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({ current: 0, total: 0, percent: 0 });
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const categories = ['Events', 'Arts', 'Tech', 'Sports', 'Academic', 'Ceremonies'];

  const handleFilesSelect = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const newItems = files.map((file, idx) => ({
      id: `${Date.now()}_${idx}_${Math.random().toString(36).substr(2, 5)}`,
      file,
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
      previewUrl: URL.createObjectURL(file),
      customTitle: ''
    }));

    setSelectedFiles(prev => [...prev, ...newItems]);
    setErrorMsg('');
    // reset file input
    e.target.value = '';
  };

  const handleRemoveFile = (id) => {
    setSelectedFiles(prev => {
      const target = prev.find(item => item.id === id);
      if (target && target.previewUrl) {
        URL.revokeObjectURL(target.previewUrl);
      }
      return prev.filter(item => item.id !== id);
    });
  };

  const handleCustomTitleChange = (id, newTitle) => {
    setSelectedFiles(prev => prev.map(item => item.id === id ? { ...item, customTitle: newTitle } : item));
  };

  const handleClearAll = () => {
    selectedFiles.forEach(item => {
      if (item.previewUrl) URL.revokeObjectURL(item.previewUrl);
    });
    setSelectedFiles([]);
  };

  const handleClose = () => {
    if (isUploading) return;
    handleClearAll();
    setEventTitle('');
    setUrlsText('');
    setErrorMsg('');
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    const baseTitle = eventTitle.trim() || 'Event Photo';

    if (activeTab === 'files') {
      if (selectedFiles.length === 0) {
        setErrorMsg('Please select at least one image file to upload.');
        return;
      }

      setIsUploading(true);
      const total = selectedFiles.length;
      setUploadProgress({ current: 0, total, percent: 0 });

      const uploadedRecords = [];
      let failureCount = 0;

      for (let i = 0; i < total; i++) {
        const item = selectedFiles[i];
        setUploadProgress({
          current: i + 1,
          total,
          percent: Math.round(((i + 1) / total) * 100)
        });

        try {
          // 1. Upload file to Supabase media storage
          const uploadRes = await contentService.uploadMedia(item.file, 'gallery');
          const imageUrl = uploadRes.success && uploadRes.url ? uploadRes.url : item.previewUrl;

          // Determine title for individual photo
          let photoTitle = item.customTitle.trim();
          if (!photoTitle) {
            photoTitle = total === 1 ? baseTitle : `${baseTitle} (Photo ${i + 1})`;
          }

          uploadedRecords.push({
            title: photoTitle,
            category,
            image: imageUrl,
            sort_order: nextSortOrder + i
          });
        } catch (err) {
          console.error('Error uploading image', item.name, err);
          failureCount++;
        }
      }

      // 2. Insert records into gallery database
      try {
        if (uploadedRecords.length > 0) {
          const createRes = await contentService.createMany('gallery', uploadedRecords);
          if (createRes.success) {
            showToast(`Successfully added ${uploadedRecords.length} photos to the "${category}" gallery!`, 'success');
            handleClose();
            onUploadSuccess();
          } else {
            // Fallback: create one by one
            let createdCount = 0;
            for (const record of uploadedRecords) {
              const singleRes = await contentService.create('gallery', record);
              if (singleRes.success) createdCount++;
            }
            showToast(`Added ${createdCount} photos to gallery`, 'success');
            handleClose();
            onUploadSuccess();
          }
        } else {
          setErrorMsg('Failed to upload selected images. Please try again.');
        }
      } catch (err) {
        setErrorMsg(err.message || 'Failed to save gallery records.');
      } finally {
        setIsUploading(false);
      }
    } else {
      // Direct URLs Mode
      const urls = urlsText
        .split('\n')
        .map(u => u.trim())
        .filter(u => u.startsWith('http://') || u.startsWith('https://') || u.startsWith('/'));

      if (urls.length === 0) {
        setErrorMsg('Please paste at least one valid image URL (one URL per line).');
        return;
      }

      setIsUploading(true);
      const total = urls.length;
      const records = urls.map((url, i) => ({
        title: total === 1 ? baseTitle : `${baseTitle} (Photo ${i + 1})`,
        category,
        image: url,
        sort_order: nextSortOrder + i
      }));

      try {
        const createRes = await contentService.createMany('gallery', records);
        if (createRes.success) {
          showToast(`Successfully added ${records.length} photos via URL to "${category}"!`, 'success');
          handleClose();
          onUploadSuccess();
        } else {
          // Fallback individual creation
          let createdCount = 0;
          for (const rec of records) {
            const single = await contentService.create('gallery', rec);
            if (single.success) createdCount++;
          }
          showToast(`Added ${createdCount} photos to gallery`, 'success');
          handleClose();
          onUploadSuccess();
        }
      } catch (err) {
        setErrorMsg(err.message || 'Failed to save image URLs.');
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="bg-white rounded-3xl p-6 sm:p-8 max-w-3xl w-full shadow-2xl border border-slate-100 relative text-left my-8 max-h-[92vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-5 border-b border-slate-100 shrink-0">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <Layers size={20} />
              </div>
              <div>
                <h3 className="text-xl font-bold font-poppins text-slate-900 flex items-center gap-2">
                  <span>Batch Upload Event Photos</span>
                  <span className="text-xs font-semibold bg-secondary/20 text-secondary-dark px-2.5 py-0.5 rounded-full">
                    Multi-Photo
                  </span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Upload multiple photos at once for an event or ceremony with a shared title and category.
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

          {/* Form */}
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
                  Event / Album Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  placeholder="e.g. Annual Sports Gala 2026, Science Fair, Graduation"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 text-sm text-slate-800 transition-all outline-none"
                />
              </div>

              <div className="sm:col-span-4 space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Category <span className="text-rose-500">*</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 text-sm text-slate-800 transition-all outline-none"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Upload Method Tabs */}
            <div className="flex items-center space-x-2 border-b border-slate-100 pb-2">
              <button
                type="button"
                onClick={() => setActiveTab('files')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 cursor-pointer ${
                  activeTab === 'files'
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Upload size={14} />
                <span>Upload Files ({selectedFiles.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('urls')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 cursor-pointer ${
                  activeTab === 'urls'
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <LinkIcon size={14} />
                <span>Paste Multiple URLs</span>
              </button>
            </div>

            {/* Tab 1: File Dropzone & Image Previews */}
            {activeTab === 'files' && (
              <div className="space-y-4">
                {/* Drag and Drop Zone */}
                <label className="border-2 border-dashed border-slate-300 hover:border-primary bg-slate-50 hover:bg-primary/5 rounded-2xl p-6 flex flex-col items-center justify-center gap-2.5 cursor-pointer transition-all">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shadow-inner">
                    <Upload size={22} />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-slate-800 font-poppins">
                      Click to choose multiple photos or drag and drop here
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Select 5, 10, 20 or more images at once (PNG, JPG, JPEG, WEBP, AVIF)
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

                {/* Selected Files Preview Grid */}
                {selectedFiles.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                        Selected Photos ({selectedFiles.length})
                      </span>
                      <button
                        type="button"
                        onClick={handleClearAll}
                        disabled={isUploading}
                        className="text-xs text-rose-600 hover:underline font-semibold cursor-pointer"
                      >
                        Clear All
                      </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-64 overflow-y-auto p-2 bg-slate-50 rounded-2xl border border-slate-200/80">
                      {selectedFiles.map((item, idx) => (
                        <div
                          key={item.id}
                          className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs relative group flex flex-col"
                        >
                          <div className="relative aspect-video bg-slate-900">
                            <img
                              src={item.previewUrl}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                            <span className="absolute top-1.5 left-1.5 bg-slate-950/80 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                              #{idx + 1}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleRemoveFile(item.id)}
                              disabled={isUploading}
                              className="absolute top-1.5 right-1.5 p-1 rounded bg-rose-600/90 text-white hover:bg-rose-700 transition-colors shadow-sm cursor-pointer"
                              title="Remove photo"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>

                          <div className="p-2 space-y-1 flex-1 flex flex-col justify-between">
                            <p className="text-[10px] text-slate-400 truncate" title={item.name}>
                              {item.name} ({item.size})
                            </p>
                            <input
                              type="text"
                              value={item.customTitle}
                              onChange={(e) => handleCustomTitleChange(item.id, e.target.value)}
                              placeholder={`Photo ${idx + 1} Caption`}
                              className="w-full px-2 py-1 text-[11px] rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:border-primary outline-none"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: Multiple URLs Textarea */}
            {activeTab === 'urls' && (
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Image URLs (Paste one URL per line)
                </label>
                <textarea
                  rows={6}
                  value={urlsText}
                  onChange={(e) => setUrlsText(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-1541339907198-e08756dedf3f...&#10;https://images.unsplash.com/photo-1523050854058-8df90110c9f1...&#10;https://..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 text-xs font-mono text-slate-800 transition-all outline-none"
                />
                <p className="text-[11px] text-slate-400">
                  Each line will be saved as an individual photo under "{eventTitle || 'Event'}" in "{category}".
                </p>
              </div>
            )}

            {/* Upload Progress Bar */}
            {isUploading && (
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
                {activeTab === 'files' ? (
                  <span>Ready to upload: <strong className="text-slate-700">{selectedFiles.length} photos</strong></span>
                ) : (
                  <span>URLs detected: <strong className="text-slate-700">{urlsText.split('\n').filter(Boolean).length} photos</strong></span>
                )}
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
                  disabled={isUploading || (activeTab === 'files' && selectedFiles.length === 0) || (activeTab === 'urls' && !urlsText.trim())}
                  className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-light text-white font-semibold text-xs transition-all flex items-center space-x-2 shadow-lg shadow-primary/20 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUploading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Uploading ({uploadProgress.current}/{uploadProgress.total})...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={16} />
                      <span>
                        Upload {activeTab === 'files' ? `${selectedFiles.length} Photos` : 'All URLs'}
                      </span>
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
