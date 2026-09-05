import React, { useState, useEffect } from 'react';
import { UserCheck, Save, Upload, Edit2, Image as ImageIcon, Clock } from 'lucide-react';
import { contentService } from '../../../services/contentService';
import cmImg from '../../../assets/CM.jpeg';
import pImg from '../../../assets/P.jpeg';
import vpImg from '../../../assets/VP.png';
import { getImageUrl } from '../../../utils/imageHelper';

export default function LeadershipModule({ leadership = {}, onRefresh, showToast }) {
  const [selectedLeader, setSelectedLeader] = useState('chairman');
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const defaultLeaders = {
    chairman: {
      id: 'chairman',
      title: "Managing Director's Message",
      name: 'Mr. Sajid Kiani',
      role: 'Managing Director',
      campus: 'Air Foundation School & College (Taha Shaheed Campus)',
      image: cmImg,
      office_hours: '10:00 AM - 1:00 PM (Mon-Fri)',
      email: 'info@airfoundationtahashaheedcampus.com',
      quote: 'Education is not merely the acquisition of knowledge; it is the development of character, values, and the ability to transform society.',
      paragraphs_text: `Dear Parents, Students, Teachers and Visitors,\n\nEducation is the foundation upon which strong individuals, successful communities, and prosperous nations are built.\n\nWe believe that every child is blessed with unique abilities and immense potential, and it is our responsibility to provide an environment where these talents can flourish.\n\nOur mission is to deliver quality education that combines academic excellence with moral values, creativity, critical thinking, and character building.\n\nIn today's dynamic world, students need more than knowledge; they need confidence, resilience, compassion, and the ability to adapt to change.\n\nWe are committed to providing modern educational opportunities, dedicated faculty, and a safe, nurturing environment that inspires every learner to achieve excellence. Through the collective efforts of students, parents, teachers, and management, we strive to prepare young minds to become responsible citizens and future leaders.\n\nThank you for your trust and confidence in our institution. Together, let us empower our children with the knowledge, values, and skills needed to create a brighter future.`
    },
    principal: {
      id: 'principal',
      title: "Principal's Address",
      name: 'Ms. Nabeela Sajid',
      role: 'Principal',
      campus: 'Air Foundation School & College (Taha Shaheed Campus)',
      image: pImg,
      office_hours: '10:00 AM - 1:00 PM (Mon-Fri)',
      email: 'info@airfoundationtahashaheedcampus.com',
      quote: 'Education is the light that empowers minds, builds character, and transforms the future.',
      paragraphs_text: `Dear Parents, Students, and Visitors,\n\nWelcome to the digital portal of Air Foundation School & College. As Principal, it is a privilege to lead an institution that is deeply committed to nurturing the academic core and moral capabilities of our next generation.\n\nEducation is the most powerful investment we can make in the future. It opens minds, builds confidence, strengthens character, and prepares young people to become responsible citizens and compassionate leaders.\n\nAt our school, we are committed to creating an environment where every child feels valued, inspired, and encouraged to reach their highest potential.\n\nWe believe that true education goes beyond textbooks. It nurtures creativity, critical thinking, integrity, discipline, and respect for others. Our dedicated teachers strive to provide meaningful learning experiences that prepare students not only for examinations but also for the opportunities and challenges of life.\n\nTogether with our parents and the wider community, we aim to shape confident individuals who possess knowledge, values, and the courage to make a positive difference in society.`
    },
    vice_principal: {
      id: 'vice_principal',
      title: "Vice Principal's Address",
      name: 'Ms. Bushra Abid',
      role: 'Vice Principal & Academic Head',
      campus: 'Air Foundation School & College (Taha Shaheed Campus)',
      image: vpImg,
      office_hours: '10:00 AM - 12:00 PM (Mon-Fri)',
      email: 'info@airfoundationtahashaheedcampus.com',
      quote: 'Education enlightens the mind, while discipline shapes the character. Together, they create responsible individuals and future leaders.',
      paragraphs_text: `Dear Parents, Students, and Visitors,\n\nIt is my pleasure to welcome you to Air Foundation School & College. As Vice Principal, I am dedicated to fostering a supportive and innovative environment where every student is encouraged to reach their full potential.\n\nEducation and discipline are the two pillars of success, and together they lay the foundation for a bright and meaningful future.\n\nWe are committed to providing quality education while nurturing strong moral values, responsibility, and respect. Our dedicated teachers inspire students to think critically, learn confidently, and develop their unique talents.\n\nWe believe that discipline builds character, integrity, and leadership, preparing students to become responsible citizens. We value the partnership between parents and the school in shaping the future of every child.`
    }
  };

  const getLeaderData = (key) => {
    const defaultData = defaultLeaders[key] || {};
    const liveData = leadership?.[key];
    if (!liveData) return defaultData;

    return {
      ...defaultData,
      ...liveData,
      paragraphs_text: Array.isArray(liveData.paragraphs)
        ? liveData.paragraphs.join('\n\n')
        : (liveData.paragraphs_text || defaultData.paragraphs_text || '')
    };
  };

  const [formData, setFormData] = useState(() => getLeaderData(selectedLeader));

  useEffect(() => {
    setFormData(getLeaderData(selectedLeader));
  }, [selectedLeader, leadership]);

  // Switch tabs
  const handleTabChange = (key) => {
    setSelectedLeader(key);
    setFormData(getLeaderData(key));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const res = await contentService.uploadMedia(file, 'leadership');
      if (res.success && res.url) {
        setFormData(prev => ({ ...prev, image: res.url }));
        showToast('Leader photo uploaded to Supabase', 'success');
      } else {
        showToast(res.error || 'Failed to upload photo', 'error');
      }
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const paragraphsArray = formData.paragraphs_text
        ? formData.paragraphs_text.split('\n\n').map(p => p.trim()).filter(Boolean)
        : [];

      const payload = {
        id: selectedLeader,
        title: formData.title,
        name: formData.name,
        role: formData.role,
        campus: formData.campus || 'Air Foundation School & College (Taha Shaheed Campus)',
        image: formData.image,
        office_hours: formData.office_hours,
        email: formData.email,
        quote: formData.quote,
        paragraphs: paragraphsArray,
        updated_at: new Date().toISOString()
      };

      const res = await contentService.upsert('leadership_messages', payload);
      if (res.success) {
        showToast(`${formData.name}'s message saved successfully`, 'success');
        onRefresh();
      } else {
        showToast(res.error || 'Failed to save leadership message', 'error');
      }
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 text-left max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-xl font-bold font-poppins text-slate-900">Leadership Desks & Messages</h2>
          <p className="text-xs text-slate-400 mt-0.5">Manage speeches, official quotes, pictures, and office details.</p>
        </div>
      </div>

      {/* Tabs for Managing Director, Principal, Vice Principal */}
      <div className="flex flex-wrap gap-2">
        {[
          { key: 'chairman', label: 'Managing Director (Mr. Sajid Kiani)' },
          { key: 'principal', label: 'Principal (Ms. Nabeela Sajid)' },
          { key: 'vice_principal', label: 'Vice Principal (Ms. Bushra Abid)' }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => handleTabChange(tab.key)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedLeader === tab.key
                ? 'bg-primary text-white shadow-md shadow-primary/20'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSave} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Page / Section Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title || ''}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Leader Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name || ''}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Designation / Role
            </label>
            <input
              type="text"
              name="role"
              value={formData.role || ''}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Official Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email || ''}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center space-x-1.5">
                <Clock size={14} className="text-primary" />
                <span>Office Hours & Visiting Schedule</span>
              </label>
              {formData.office_hours && (
                <span className="text-[11px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                  {formData.office_hours}
                </span>
              )}
            </div>
            <input
              type="text"
              name="office_hours"
              value={formData.office_hours || ''}
              onChange={handleChange}
              placeholder="e.g. 10:00 AM - 1:00 PM (Mon-Fri)"
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
            {/* Quick Time Schedule Presets */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mr-1">Time Presets:</span>
              <button
                type="button"
                onClick={() => setFormData(p => ({ ...p, office_hours: '10:00 AM - 1:00 PM (Mon-Fri)' }))}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-white hover:bg-primary hover:text-white border border-slate-200 text-slate-600 font-medium transition-colors shadow-sm cursor-pointer"
              >
                10:00 AM - 1:00 PM (Mon-Fri)
              </button>
              <button
                type="button"
                onClick={() => setFormData(p => ({ ...p, office_hours: '09:00 AM - 12:00 PM (Mon-Fri)' }))}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-white hover:bg-primary hover:text-white border border-slate-200 text-slate-600 font-medium transition-colors shadow-sm cursor-pointer"
              >
                09:00 AM - 12:00 PM (Mon-Fri)
              </button>
              <button
                type="button"
                onClick={() => setFormData(p => ({ ...p, office_hours: '10:00 AM - 2:00 PM (Mon-Sat)' }))}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-white hover:bg-primary hover:text-white border border-slate-200 text-slate-600 font-medium transition-colors shadow-sm cursor-pointer"
              >
                10:00 AM - 2:00 PM (Mon-Sat)
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Leader Picture URL or Upload
            </label>
            <div className="flex gap-2 items-center">
              {formData.image && (
                <div className="w-10 h-10 rounded-xl overflow-hidden border border-slate-200 shrink-0 bg-slate-100 shadow-sm">
                  <img src={getImageUrl(formData.image)} alt={formData.name || 'Preview'} className="w-full h-full object-cover" />
                </div>
              )}
              <input
                type="text"
                name="image"
                value={formData.image || ''}
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
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Highlight Quote */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            Featured Highlight Quote
          </label>
          <textarea
            rows={2}
            name="quote"
            value={formData.quote || ''}
            onChange={handleChange}
            placeholder="Education is the light that empowers minds..."
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none"
          />
        </div>

        {/* Main Speech Paragraphs */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            Full Address Paragraphs (Separate paragraphs with an empty line)
          </label>
          <textarea
            rows={10}
            name="paragraphs_text"
            value={formData.paragraphs_text || ''}
            onChange={handleChange}
            placeholder="Enter full speech text here..."
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none font-sans leading-relaxed"
          />
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-4 border-t border-slate-100">
          <button
            type="submit"
            disabled={isSaving || isUploading}
            className="px-8 py-3.5 rounded-xl bg-primary hover:bg-primary-light text-white font-bold text-sm transition-all flex items-center space-x-2 shadow-lg shadow-primary/20 cursor-pointer disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Saving Message...</span>
              </>
            ) : (
              <>
                <Save size={16} />
                <span>Save Leadership Message</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
