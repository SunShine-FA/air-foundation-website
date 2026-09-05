import React, { useState } from 'react';
import { Settings, Save, Upload, Copy, Check, ExternalLink, Image as ImageIcon } from 'lucide-react';
import { contentService } from '../../../services/contentService';

export default function SiteSettingsModule({ settings, onRefresh, showToast }) {
  const defaultSettings = {
    schoolName: 'Air Foundation School & College',
    campus: 'Taha Shaheed Campus',
    tagline: 'Inspiring Excellence',
    address: 'House # 7 Dua chowk main university road capital enclave Jinnah Garden Islamabad',
    phone: '051 5148033',
    email: 'info@airfoundationtahashaheedcampus.com',
    admissionsEmail: 'info@airfoundationtahashaheedcampus.com',
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    youtube: 'https://youtube.com',
    mapCoordinates: '33.57347093367743,73.16629491313103'
  };

  const [formData, setFormData] = useState(settings || defaultSettings);
  const [isSaving, setIsSaving] = useState(false);

  // File uploader tool state
  const [uploadedUrl, setUploadedUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await contentService.updateSiteSettings('general', formData);
      if (res.success) {
        showToast('Site settings updated successfully', 'success');
        onRefresh();
      } else {
        showToast(res.error || 'Failed to update settings', 'error');
      }
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleToolUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadedUrl('');
    try {
      const res = await contentService.uploadMedia(file, 'portal_uploads');
      if (res.success && res.url) {
        setUploadedUrl(res.url);
        showToast('File uploaded to Supabase Storage!', 'success');
      } else {
        showToast(res.error || 'Failed to upload file', 'error');
      }
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setIsUploading(false);
    }
  };

  const copyToClipboard = () => {
    if (!uploadedUrl) return;
    navigator.clipboard.writeText(uploadedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 text-left max-w-4xl">
      <div className="flex justify-between items-center pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-xl font-bold font-poppins text-slate-900">Site Settings & Direct Media Uploader</h2>
          <p className="text-xs text-slate-400 mt-0.5">Manage global contact channels and upload assets to Supabase Storage.</p>
        </div>
      </div>

      {/* Direct Supabase Storage Uploader Box */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-950 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center space-x-2">
          <Upload size={20} className="text-secondary" />
          <h3 className="text-base font-bold font-poppins text-white">Direct Supabase Media Uploader</h3>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
          Need a hosted link for any picture or document? Select any file below to upload it instantly to your Supabase <code className="text-secondary font-mono bg-white/10 px-1 py-0.5 rounded">media</code> storage bucket.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <label className="px-5 py-3 rounded-xl bg-secondary hover:bg-white text-slate-950 hover:text-primary font-bold text-xs transition-all flex items-center space-x-2 cursor-pointer shadow-lg shadow-secondary/15">
            {isUploading ? (
              <>
                <div className="w-4 h-4 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                <span>Uploading to Supabase...</span>
              </>
            ) : (
              <>
                <Upload size={16} />
                <span>Choose & Upload File</span>
              </>
            )}
            <input
              type="file"
              onChange={handleToolUpload}
              disabled={isUploading}
              className="hidden"
            />
          </label>
        </div>

        {uploadedUrl && (
          <div className="mt-4 p-4 rounded-2xl bg-slate-900 border border-slate-700/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                <Check size={14} /> Upload Success! Public URL:
              </span>
              <button
                type="button"
                onClick={copyToClipboard}
                className="text-xs text-secondary hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? 'Copied!' : 'Copy Link'}</span>
              </button>
            </div>
            <p className="text-xs font-mono text-slate-300 bg-slate-950 p-2.5 rounded-xl border border-slate-800 break-all select-all">
              {uploadedUrl}
            </p>
          </div>
        )}
      </div>

      {/* Global Contact & Coordinates Form */}
      <form onSubmit={handleSave} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
        <h3 className="text-base font-bold font-poppins text-slate-800 flex items-center space-x-2 border-b border-slate-100 pb-3">
          <Settings size={18} className="text-primary" />
          <span>Campus Contact Coordinates & Social Desks</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Institution Name
            </label>
            <input
              type="text"
              name="schoolName"
              value={formData.schoolName || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Campus Name
            </label>
            <input
              type="text"
              name="campus"
              value={formData.campus || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            Physical Campus Address
          </label>
          <input
            type="text"
            name="address"
            value={formData.address || ''}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              General Queries Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Admissions Desk Email
            </label>
            <input
              type="email"
              name="admissionsEmail"
              value={formData.admissionsEmail || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Facebook Link
            </label>
            <input
              type="text"
              name="facebook"
              value={formData.facebook || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Instagram Link
            </label>
            <input
              type="text"
              name="instagram"
              value={formData.instagram || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              YouTube Link
            </label>
            <input
              type="text"
              name="youtube"
              value={formData.youtube || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none"
            />
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-100">
          <button
            type="submit"
            disabled={isSaving}
            className="px-8 py-3.5 rounded-xl bg-primary hover:bg-primary-light text-white font-bold text-sm transition-all flex items-center space-x-2 shadow-lg shadow-primary/20 cursor-pointer disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Saving Settings...</span>
              </>
            ) : (
              <>
                <Save size={16} />
                <span>Save Site Settings</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
