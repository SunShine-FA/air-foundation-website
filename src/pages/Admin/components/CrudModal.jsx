import React, { useState, useEffect } from 'react';
import { X, Upload, Check, AlertCircle, Image as ImageIcon, Calendar, Clock, Sparkles, FileText, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { contentService } from '../../../services/contentService';

// Convert human readable date like "July 18, 2026" or ISO string to YYYY-MM-DD for date inputs
function toDateInputValue(str) {
  if (!str) return '';
  if (/^\d{4}-\d{2}-\d{2}$/.test(str)) return str;
  const d = new Date(str);
  if (!isNaN(d.getTime())) {
    return d.toISOString().split('T')[0];
  }
  return '';
}

// Convert YYYY-MM-DD to "July 18, 2026"
function formatDateForDisplay(isoDateStr) {
  if (!isoDateStr) return '';
  const parts = isoDateStr.split('-');
  if (parts.length === 3) {
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    const d = new Date(year, month, day);
    if (!isNaN(d.getTime())) {
      return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    }
  }
  const d = new Date(isoDateStr);
  if (!isNaN(d.getTime())) {
    return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  }
  return isoDateStr;
}

// Format 24-hr time "14:30" to "02:30 PM"
function formatTime12h(timeStr) {
  if (!timeStr) return '';
  if (timeStr.includes('AM') || timeStr.includes('PM')) return timeStr;
  const [hoursStr, minsStr] = timeStr.split(':');
  let hours = parseInt(hoursStr, 10);
  const mins = minsStr || '00';
  if (isNaN(hours)) return timeStr;
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  return `${hours.toString().padStart(2, '0')}:${mins} ${ampm}`;
}

// Parse "08:00 AM - 04:00 PM" into { start: "08:00", end: "16:00" }
function parseTimeRangeTo24h(timeRangeStr) {
  if (!timeRangeStr) return { start: '08:00', end: '14:00' };
  const parts = timeRangeStr.split('-').map(p => p.trim());
  const parseSingle = (s) => {
    if (!s) return '08:00';
    const match = s.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
    if (!match) return '08:00';
    let h = parseInt(match[1], 10);
    const m = match[2];
    const ap = (match[3] || '').toUpperCase();
    if (ap === 'PM' && h < 12) h += 12;
    if (ap === 'AM' && h === 12) h = 0;
    return `${h.toString().padStart(2, '0')}:${m}`;
  };
  return {
    start: parseSingle(parts[0]),
    end: parts[1] ? parseSingle(parts[1]) : '14:00'
  };
}

export default function CrudModal({
  isOpen,
  onClose,
  onSave,
  title,
  fields = [],
  initialData = {},
  isSaving = false
}) {
  const [formData, setFormData] = useState({});
  const [uploadingField, setUploadingField] = useState(null);
  const [uploadError, setUploadError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setFormData(initialData || {});
      setUploadError('');
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = async (e, fieldName) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 1. Immediately extract metadata from file
    const rawName = file.name || '';
    const dotIdx = rawName.lastIndexOf('.');
    const ext = dotIdx !== -1 ? rawName.substring(dotIdx + 1).toUpperCase() : 'PDF';
    const baseName = dotIdx !== -1 ? rawName.substring(0, dotIdx) : rawName;
    
    // Clean up title: replace hyphens/underscores/dots with spaces and title-case words
    const cleanTitle = baseName
      .replace(/[-_.]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    // Calculate formatted size
    let formattedSize = '';
    if (file.size < 1024) {
      formattedSize = `${file.size} B`;
    } else if (file.size < 1024 * 1024) {
      const kb = Math.round(file.size / 1024);
      formattedSize = `${kb} KB`;
    } else {
      const mb = (file.size / (1024 * 1024)).toFixed(1);
      formattedSize = `${mb} MB`;
    }

    // Immediately autofill the related form fields
    setFormData(prev => {
      const next = { ...prev };
      // Auto-populate Title if empty or was default placeholder
      if (!next.title || next.title.trim() === '' || next.title === 'New Document') {
        next.title = cleanTitle;
      }
      // Auto-populate Size if size field is present in modal
      if (fields.some(f => f.name === 'size')) {
        next.size = formattedSize;
      }
      // Auto-populate Format if format field is present in modal
      if (fields.some(f => f.name === 'format')) {
        next.format = ext;
      }
      return next;
    });

    setUploadingField(fieldName);
    setUploadError('');

    try {
      const res = await contentService.uploadMedia(file, 'documents');
      if (res.success && res.url) {
        setFormData(prev => ({ ...prev, [fieldName]: res.url }));
      } else {
        const fallbackUrl = URL.createObjectURL(file);
        setFormData(prev => ({ ...prev, [fieldName]: fallbackUrl }));
      }
    } catch (err) {
      const fallbackUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, [fieldName]: fallbackUrl }));
    } finally {
      setUploadingField(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  // Helper for quick date presets
  const setQuickDate = (fieldName, offsetDays) => {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    const iso = d.toISOString().split('T')[0];
    const formatted = formatDateForDisplay(iso);
    handleChange(fieldName, formatted);
  };

  // Helper for time range updates
  const handleTimeRangeChange = (fieldName, part, val24h) => {
    const currentVal = formData[fieldName] || '08:00 AM - 02:00 PM';
    const parsed = parseTimeRangeTo24h(currentVal);
    const newStart24 = part === 'start' ? val24h : parsed.start;
    const newEnd24 = part === 'end' ? val24h : parsed.end;
    const formatted = `${formatTime12h(newStart24)} - ${formatTime12h(newEnd24)}`;
    handleChange(fieldName, formatted);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-slate-100 relative text-left my-8 max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-5 border-b border-slate-100 shrink-0">
            <div>
              <h3 className="text-xl font-bold font-poppins text-slate-900">{title}</h3>
              <p className="text-xs text-slate-400 mt-0.5">Fill in the fields below to update website content.</p>
            </div>
            <button
              onClick={onClose}
              disabled={isSaving}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Form Fields Body */}
          <form onSubmit={handleSubmit} className="overflow-y-auto py-5 space-y-4 pr-1 flex-grow">
            {uploadError && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle size={16} className="shrink-0" />
                <span>{uploadError}</span>
              </div>
            )}

            {fields.map((field) => {
              const value = formData[field.name] ?? field.defaultValue ?? '';

              if (field.type === 'textarea') {
                return (
                  <div key={field.name} className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      {field.label} {field.required && <span className="text-rose-500">*</span>}
                    </label>
                    <textarea
                      rows={field.rows || 4}
                      value={value}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      placeholder={field.placeholder}
                      required={field.required}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 text-sm text-slate-800 transition-all outline-none"
                    />
                    {field.helper && <p className="text-[11px] text-slate-400">{field.helper}</p>}
                  </div>
                );
              }

              if (field.type === 'select') {
                return (
                  <div key={field.name} className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      {field.label} {field.required && <span className="text-rose-500">*</span>}
                    </label>
                    <select
                      value={value}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      required={field.required}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 text-sm text-slate-800 transition-all outline-none"
                    >
                      <option value="">Select an option</option>
                      {field.options?.map((opt) => {
                        const optVal = typeof opt === 'object' ? opt.value : opt;
                        const optLabel = typeof opt === 'object' ? opt.label : opt;
                        return (
                          <option key={optVal} value={optVal}>{optLabel}</option>
                        );
                      })}
                    </select>
                    {field.helper && <p className="text-[11px] text-slate-400">{field.helper}</p>}
                  </div>
                );
              }

              // SPECIALIZED DOCUMENT / FILE UPLOAD FIELD
              if (field.type === 'file') {
                return (
                  <div key={field.name} className="space-y-2.5 bg-slate-50/80 p-4 rounded-2xl border border-slate-200/80">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center space-x-1.5">
                        <FileText size={15} className="text-primary" />
                        <span>{field.label}</span>
                        {field.required && <span className="text-rose-500">*</span>}
                      </label>
                      {value && (
                        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-md flex items-center space-x-1">
                          <CheckCircle2 size={12} />
                          <span>Attached</span>
                        </span>
                      )}
                    </div>

                    {/* Upload Dropzone / Button */}
                    <label className={`border-2 border-dashed rounded-2xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${
                      uploadingField === field.name 
                        ? 'border-primary bg-primary/5' 
                        : 'border-slate-300 hover:border-primary hover:bg-slate-100/70'
                    }`}>
                      {uploadingField === field.name ? (
                        <div className="flex items-center space-x-2 text-primary text-xs font-bold py-2">
                          <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                          <span>Reading document metadata & uploading...</span>
                        </div>
                      ) : (
                        <>
                          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                            <Upload size={18} />
                          </div>
                          <div className="text-center">
                            <p className="text-xs font-bold text-slate-800">
                              Click to choose document or drop file here
                            </p>
                            <p className="text-[11px] text-slate-400 mt-0.5">
                              Auto-fills Title, File Size & Format automatically
                            </p>
                          </div>
                        </>
                      )}
                      <input
                        type="file"
                        accept={field.accept || ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip"}
                        onChange={(e) => handleFileUpload(e, field.name)}
                        disabled={uploadingField === field.name}
                        className="hidden"
                      />
                    </label>

                    {/* Direct URL input fallback */}
                    <div className="space-y-1">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">File Link / Public URL:</span>
                      <input
                        type="text"
                        value={value || ''}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                        placeholder="e.g. /documents/prospectus.pdf or https://..."
                        required={field.required}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 text-xs font-mono text-slate-700 transition-all outline-none"
                      />
                    </div>

                    {field.helper && <p className="text-[11px] text-slate-400 italic">{field.helper}</p>}
                  </div>
                );
              }

              // IMAGE UPLOAD FIELD
              if (field.type === 'image') {
                return (
                  <div key={field.name} className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      {field.label} {field.required && <span className="text-rose-500">*</span>}
                    </label>

                    {/* Image URL or File Upload */}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={value || ''}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                        placeholder="Paste image URL or click Upload"
                        required={field.required}
                        className="flex-grow px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 text-sm text-slate-800 transition-all outline-none"
                      />
                      <label className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors flex items-center space-x-1.5 cursor-pointer shrink-0">
                        {uploadingField === field.name ? (
                          <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                        ) : (
                          <Upload size={14} />
                        )}
                        <span>Upload</span>
                        <input
                          type="file"
                          accept={field.accept || "image/*"}
                          onChange={(e) => handleFileUpload(e, field.name)}
                          disabled={uploadingField === field.name}
                          className="hidden"
                        />
                      </label>
                    </div>

                    {/* Image Preview */}
                    {value && (
                      <div className="flex items-center space-x-3 p-2 bg-slate-50 rounded-xl border border-slate-200 w-fit">
                        <img
                          src={value}
                          alt="Preview"
                          className="w-12 h-12 rounded-lg object-cover bg-white"
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                        <span className="text-xs text-slate-500 font-mono truncate max-w-xs">{value}</span>
                      </div>
                    )}

                    {field.helper && <p className="text-[11px] text-slate-400">{field.helper}</p>}
                  </div>
                );
              }

              // DATE PICKER FIELD
              if (field.type === 'date' || field.name === 'date') {
                const dateIso = toDateInputValue(value);
                return (
                  <div key={field.name} className="space-y-2 bg-slate-50/80 p-3.5 rounded-2xl border border-slate-200/80">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center space-x-1.5">
                        <Calendar size={14} className="text-primary" />
                        <span>{field.label}</span>
                        {field.required && <span className="text-rose-500">*</span>}
                      </label>
                      {value && (
                        <span className="text-[11px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                          Selected: {value}
                        </span>
                      )}
                    </div>

                    {/* Native Date Picker + Input Box */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div className="relative">
                        <input
                          type="date"
                          value={dateIso}
                          onChange={(e) => {
                            const formatted = formatDateForDisplay(e.target.value);
                            handleChange(field.name, formatted || e.target.value);
                          }}
                          required={field.required}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 text-sm text-slate-800 transition-all outline-none"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          value={value}
                          onChange={(e) => handleChange(field.name, e.target.value)}
                          placeholder="e.g. July 18, 2026"
                          required={field.required}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 text-sm text-slate-800 transition-all outline-none"
                        />
                      </div>
                    </div>

                    {/* Quick Date Presets */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mr-1">Quick Select:</span>
                      <button
                        type="button"
                        onClick={() => setQuickDate(field.name, 0)}
                        className="text-[11px] px-2.5 py-1 rounded-lg bg-white hover:bg-primary hover:text-white border border-slate-200 text-slate-600 font-medium transition-colors shadow-sm"
                      >
                        Today
                      </button>
                      <button
                        type="button"
                        onClick={() => setQuickDate(field.name, 1)}
                        className="text-[11px] px-2.5 py-1 rounded-lg bg-white hover:bg-primary hover:text-white border border-slate-200 text-slate-600 font-medium transition-colors shadow-sm"
                      >
                        Tomorrow
                      </button>
                      <button
                        type="button"
                        onClick={() => setQuickDate(field.name, 7)}
                        className="text-[11px] px-2.5 py-1 rounded-lg bg-white hover:bg-primary hover:text-white border border-slate-200 text-slate-600 font-medium transition-colors shadow-sm"
                      >
                        +1 Week
                      </button>
                      <button
                        type="button"
                        onClick={() => setQuickDate(field.name, 30)}
                        className="text-[11px] px-2.5 py-1 rounded-lg bg-white hover:bg-primary hover:text-white border border-slate-200 text-slate-600 font-medium transition-colors shadow-sm"
                      >
                        +1 Month
                      </button>
                    </div>

                    {field.helper && <p className="text-[11px] text-slate-400">{field.helper}</p>}
                  </div>
                );
              }

              // TIME RANGE / SCHEDULE PICKER FIELD
              if (field.type === 'time-range' || field.name === 'time') {
                const parsed = parseTimeRangeTo24h(value);
                return (
                  <div key={field.name} className="space-y-2 bg-slate-50/80 p-3.5 rounded-2xl border border-slate-200/80">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center space-x-1.5">
                        <Clock size={14} className="text-primary" />
                        <span>{field.label}</span>
                        {field.required && <span className="text-rose-500">*</span>}
                      </label>
                      {value && (
                        <span className="text-[11px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                          {value}
                        </span>
                      )}
                    </div>

                    {/* Start Time & End Time Pickers */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <span className="text-[10px] text-slate-500 font-semibold block mb-1">Start Time</span>
                        <input
                          type="time"
                          value={parsed.start}
                          onChange={(e) => handleTimeRangeChange(field.name, 'start', e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 text-sm text-slate-800 transition-all outline-none"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 font-semibold block mb-1">End Time</span>
                        <input
                          type="time"
                          value={parsed.end}
                          onChange={(e) => handleTimeRangeChange(field.name, 'end', e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 text-sm text-slate-800 transition-all outline-none"
                        />
                      </div>
                    </div>

                    {/* Quick Presets */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mr-1">Presets:</span>
                      <button
                        type="button"
                        onClick={() => handleChange(field.name, '08:00 AM - 02:00 PM')}
                        className="text-[11px] px-2.5 py-1 rounded-lg bg-white hover:bg-primary hover:text-white border border-slate-200 text-slate-600 font-medium transition-colors shadow-sm"
                      >
                        08:00 AM - 02:00 PM
                      </button>
                      <button
                        type="button"
                        onClick={() => handleChange(field.name, '08:30 AM - 04:00 PM')}
                        className="text-[11px] px-2.5 py-1 rounded-lg bg-white hover:bg-primary hover:text-white border border-slate-200 text-slate-600 font-medium transition-colors shadow-sm"
                      >
                        08:30 AM - 04:00 PM
                      </button>
                      <button
                        type="button"
                        onClick={() => handleChange(field.name, '09:00 AM - 01:00 PM')}
                        className="text-[11px] px-2.5 py-1 rounded-lg bg-white hover:bg-primary hover:text-white border border-slate-200 text-slate-600 font-medium transition-colors shadow-sm"
                      >
                        09:00 AM - 01:00 PM
                      </button>
                    </div>

                    {field.helper && <p className="text-[11px] text-slate-400">{field.helper}</p>}
                  </div>
                );
              }

              // SINGLE TIME PICKER
              if (field.type === 'time') {
                return (
                  <div key={field.name} className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center space-x-1.5">
                      <Clock size={14} className="text-primary" />
                      <span>{field.label} {field.required && <span className="text-rose-500">*</span>}</span>
                    </label>
                    <input
                      type="time"
                      value={value}
                      onChange={(e) => handleChange(field.name, formatTime12h(e.target.value) || e.target.value)}
                      required={field.required}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 text-sm text-slate-800 transition-all outline-none"
                    />
                    {field.helper && <p className="text-[11px] text-slate-400">{field.helper}</p>}
                  </div>
                );
              }

              // Default text, number, email with optional datalist autocomplete
              return (
                <div key={field.name} className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    {field.label} {field.required && <span className="text-rose-500">*</span>}
                  </label>
                  <input
                    type={field.type || 'text'}
                    list={field.options ? `${field.name}-datalist` : undefined}
                    value={value}
                    onChange={(e) => handleChange(field.name, field.type === 'number' ? Number(e.target.value) : e.target.value)}
                    placeholder={field.placeholder}
                    required={field.required}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 text-sm text-slate-800 transition-all outline-none"
                  />
                  {field.options && (
                    <datalist id={`${field.name}-datalist`}>
                      {field.options.map((opt, i) => {
                        const optVal = typeof opt === 'object' ? opt.value : opt;
                        return <option key={i} value={optVal} />;
                      })}
                    </datalist>
                  )}
                  {field.helper && <p className="text-[11px] text-slate-400">{field.helper}</p>}
                </div>
              );
            })}

            {/* Footer Buttons */}
            <div className="flex items-center justify-end space-x-3 pt-6 border-t border-slate-100 mt-6 shrink-0">
              <button
                type="button"
                onClick={onClose}
                disabled={isSaving}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving || uploadingField !== null}
                className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-light text-white font-semibold text-sm transition-all flex items-center space-x-2 shadow-lg shadow-primary/20 cursor-pointer disabled:opacity-50"
              >
                {isSaving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Check size={16} />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
