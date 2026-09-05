import React, { useState, useEffect } from 'react';
import { Mail, Phone, Calendar, Trash2, CheckCircle2, Search, MessageSquare, Reply } from 'lucide-react';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import { contentService } from '../../../services/contentService';

export default function ContactSubmissionsModule({ showToast }) {
  const [submissions, setSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteItem, setDeleteItem] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchSubmissions = async () => {
    setIsLoading(true);
    try {
      const res = await contentService.getAll('contact_submissions', 'created_at', false);
      if (res.success && res.data) {
        setSubmissions(res.data);
      }
    } catch (err) {
      console.warn('Error fetching submissions:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleStatusToggle = async (sub) => {
    const nextStatus = sub.status === 'Responded' ? 'Unread' : 'Responded';
    try {
      const res = await contentService.update('contact_submissions', sub.id, { status: nextStatus });
      if (res.success) {
        setSubmissions(prev => prev.map(s => s.id === sub.id ? { ...s, status: nextStatus } : s));
        showToast(`Marked as ${nextStatus}`, 'success');
      }
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleDelete = async () => {
    if (!deleteItem?.id) return;
    setIsDeleting(true);
    try {
      const res = await contentService.remove('contact_submissions', deleteItem.id);
      if (res.success) {
        setSubmissions(prev => prev.filter(s => s.id !== deleteItem.id));
        showToast('Inquiry removed', 'success');
        setDeleteItem(null);
      } else {
        showToast(res.error || 'Failed to remove inquiry', 'error');
      }
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  const filtered = submissions.filter(s =>
    (s.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (s.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (s.message || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 text-left max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-xl font-bold font-poppins text-slate-900">
            Contact Form Submissions ({submissions.length})
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">Real-time incoming queries from parents and prospective applicants.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search inquiries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-xs outline-none w-48 sm:w-60"
            />
          </div>
          <button
            onClick={fetchSubmissions}
            className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Refresh
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="py-16 text-center text-slate-400 text-xs flex flex-col items-center justify-center space-y-2">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <span>Loading live inquiries from Supabase...</span>
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-3xl border border-slate-100 p-8 space-y-2">
          <MessageSquare size={36} className="mx-auto text-slate-300" />
          <h4 className="font-bold text-sm text-slate-700">No contact submissions found</h4>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            When visitors submit the form on the Contact page, their queries will appear here in real-time.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((sub) => (
            <div
              key={sub.id}
              className={`p-6 rounded-2xl border transition-all text-left space-y-4 ${
                sub.status === 'Responded'
                  ? 'bg-slate-50 border-slate-200/60 opacity-80'
                  : 'bg-white border-primary/20 shadow-sm'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base text-slate-900 font-poppins">{sub.name}</h3>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                      sub.status === 'Responded'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {sub.status || 'Unread'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{sub.subject || 'General Inquiry'}</p>
                </div>

                <div className="flex items-center space-x-3 text-xs text-slate-400 font-semibold">
                  <span className="flex items-center space-x-1">
                    <Calendar size={13} />
                    <span>{new Date(sub.created_at).toLocaleDateString()}</span>
                  </span>
                </div>
              </div>

              {/* Message body */}
              <div className="text-xs sm:text-sm text-slate-700 bg-slate-50/70 p-4 rounded-xl border border-slate-100 leading-relaxed">
                {sub.message}
              </div>

              {/* Contact info and action buttons */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-2">
                <div className="flex flex-wrap gap-4 text-xs font-medium text-slate-600">
                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(sub.email)}&su=${encodeURIComponent(`Re: Air Foundation School Inquiry - ${sub.subject || ''}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1.5 text-primary hover:underline font-semibold"
                    title="Send email via Gmail"
                  >
                    <Mail size={13} />
                    <span>{sub.email}</span>
                  </a>
                  {sub.phone && (
                    <a href={`tel:${sub.phone}`} className="flex items-center space-x-1.5 text-slate-600 hover:text-primary">
                      <Phone size={13} />
                      <span>{sub.phone}</span>
                    </a>
                  )}
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <button
                    onClick={() => handleStatusToggle(sub)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center space-x-1.5 ${
                      sub.status === 'Responded'
                        ? 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                        : 'bg-emerald-600 text-white hover:bg-emerald-700'
                    }`}
                  >
                    <CheckCircle2 size={13} />
                    <span>{sub.status === 'Responded' ? 'Mark Unread' : 'Mark Responded'}</span>
                  </button>

                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(sub.email)}&su=${encodeURIComponent('Air Foundation School & College - Response to your inquiry')}&body=${encodeURIComponent(`Dear ${sub.name},\n\nThank you for reaching out to Air Foundation School & College (Taha Shaheed Campus)...`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-primary hover:bg-primary-light text-white text-xs font-semibold transition-colors flex items-center space-x-1"
                    title="Reply via Gmail"
                  >
                    <Reply size={13} />
                    <span>Reply</span>
                  </a>

                  <button
                    onClick={() => setDeleteItem(sub)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    title="Delete"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <DeleteConfirmModal
        isOpen={!!deleteItem}
        onClose={() => setDeleteItem(null)}
        onConfirm={handleDelete}
        title="Delete Contact Inquiry"
        itemName={`inquiry from ${deleteItem?.name}`}
        isDeleting={isDeleting}
      />
    </div>
  );
}
