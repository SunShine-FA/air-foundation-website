import React, { useState } from 'react';
import { Sparkles, Save, Upload, Play, Image as ImageIcon } from 'lucide-react';
import { contentService } from '../../../services/contentService';

export default function HeroModule({ heroData, onRefresh, showToast }) {
  const [formData, setFormData] = useState(heroData || {});
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e, fieldName) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const res = await contentService.uploadMedia(file, 'hero');
      if (res.success && res.url) {
        setFormData(prev => ({ ...prev, [fieldName]: res.url }));
        showToast('Image uploaded to Supabase successfully', 'success');
      } else {
        showToast(res.error || 'Failed to upload image', 'error');
      }
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await contentService.updateHeroBanner(formData.id, formData);
      if (res.success) {
        showToast('Hero section & virtual tour updated successfully', 'success');
        onRefresh();
      } else {
        showToast(res.error || 'Failed to update hero section', 'error');
      }
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8 text-left max-w-4xl">
      <div className="flex justify-between items-center pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-xl font-bold font-poppins text-slate-900">Hero Section & Virtual Campus Tour</h2>
          <p className="text-xs text-slate-400 mt-0.5">Customize the main landing banner, announcements, and campus video tour.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Banner Texts */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-5">
          <h3 className="text-base font-bold font-poppins text-slate-800 flex items-center space-x-2">
            <Sparkles size={18} className="text-secondary" />
            <span>Hero Headline & Announcements</span>
          </h3>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Top Announcement Badge Text
              </label>
              <input
                type="text"
                name="badge_text"
                value={formData.badge_text || ''}
                onChange={handleChange}
                placeholder="e.g. Admissions Open for 2026-2027"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-primary text-sm text-slate-800 outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Main Headline Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title || ''}
                  onChange={handleChange}
                  placeholder="Shaping Visionary Leaders For Tomorrow"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-primary text-sm text-slate-800 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Headline Highlighted Word(s)
                </label>
                <input
                  type="text"
                  name="title_highlight"
                  value={formData.title_highlight || ''}
                  onChange={handleChange}
                  placeholder="Visionary Leaders"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-primary text-sm text-slate-800 outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Hero Description
              </label>
              <textarea
                rows={3}
                name="description"
                value={formData.description || ''}
                onChange={handleChange}
                placeholder="Welcome to Air Foundation School & College..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-primary text-sm text-slate-800 outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Primary Button Label & Link
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="apply_button_text"
                    value={formData.apply_button_text || ''}
                    onChange={handleChange}
                    placeholder="Apply Now"
                    className="w-1/2 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none"
                  />
                  <input
                    type="text"
                    name="apply_button_link"
                    value={formData.apply_button_link || ''}
                    onChange={handleChange}
                    placeholder="/admissions"
                    className="w-1/2 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Secondary Button Label & Link
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="learn_button_text"
                    value={formData.learn_button_text || ''}
                    onChange={handleChange}
                    placeholder="Learn More"
                    className="w-1/2 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none"
                  />
                  <input
                    type="text"
                    name="learn_button_link"
                    value={formData.learn_button_link || ''}
                    onChange={handleChange}
                    placeholder="/about"
                    className="w-1/2 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Background Image */}
            <div className="space-y-1.5 pt-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Hero Background Image URL or Upload
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="background_image"
                  value={formData.background_image || ''}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="flex-grow px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none"
                />
                <label className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors flex items-center space-x-1.5 cursor-pointer shrink-0">
                  <Upload size={14} />
                  <span>Upload</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'background_image')}
                    className="hidden"
                  />
                </label>
              </div>
              {formData.background_image && (
                <div className="mt-2 rounded-xl overflow-hidden h-28 border border-slate-200 max-w-sm">
                  <img src={formData.background_image} alt="Hero Background" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Campus Tour Video */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-5">
          <h3 className="text-base font-bold font-poppins text-slate-800 flex items-center space-x-2">
            <Play size={18} className="text-primary" />
            <span>Virtual Campus Video Tour</span>
          </h3>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                YouTube Video Embed URL
              </label>
              <input
                type="text"
                name="video_url"
                value={formData.video_url || ''}
                onChange={handleChange}
                placeholder="https://www.youtube.com/embed/..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-primary text-sm text-slate-800 outline-none"
              />
              <p className="text-[11px] text-slate-400">Use standard YouTube embed link format (e.g., https://www.youtube.com/embed/VIDEO_ID?autoplay=1)</p>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Video Thumbnail Image URL or Upload
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="video_thumbnail"
                  value={formData.video_thumbnail || ''}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="flex-grow px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none"
                />
                <label className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors flex items-center space-x-1.5 cursor-pointer shrink-0">
                  <Upload size={14} />
                  <span>Upload</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'video_thumbnail')}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Save */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isSaving || isUploading}
            className="px-8 py-3.5 rounded-xl bg-primary hover:bg-primary-light text-white font-bold text-sm transition-all flex items-center space-x-2 shadow-lg shadow-primary/20 cursor-pointer disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Saving Hero Section...</span>
              </>
            ) : (
              <>
                <Save size={16} />
                <span>Save All Hero Changes</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
