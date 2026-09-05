import React from 'react';
import {
  Users, Newspaper, Calendar, Image as ImageIcon, BookOpen,
  MessageSquare, Award, ArrowUpRight, CheckCircle2, AlertCircle, Database
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function DashboardModule({
  data,
  setActiveTab,
  isSupabaseConnected
}) {
  const metrics = [
    { title: 'Faculty & Staff', count: data.faculty?.length || 0, icon: Users, tab: 'faculty', color: 'text-sky-600 bg-sky-50 border-sky-100' },
    { title: 'News Bulletins', count: data.news?.length || 0, icon: Newspaper, tab: 'news', color: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
    { title: 'Upcoming Events', count: data.events?.length || 0, icon: Calendar, tab: 'events', color: 'text-violet-600 bg-violet-50 border-violet-100' },
    { title: 'Gallery Items', count: data.gallery?.length || 0, icon: ImageIcon, tab: 'gallery', color: 'text-amber-600 bg-amber-50 border-amber-100' },
    { title: 'Academic Programs', count: data.programs?.length || 0, icon: BookOpen, tab: 'programs', color: 'text-indigo-600 bg-indigo-50 border-indigo-100' },
    { title: 'Contact Inquiries', count: data.contactSubmissions?.length || 0, icon: MessageSquare, tab: 'contact_submissions', color: 'text-rose-600 bg-rose-50 border-rose-100' }
  ];

  return (
    <div className="space-y-8 text-left">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary-dark via-primary to-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="inline-flex items-center space-x-1.5 bg-secondary/20 border border-secondary/30 px-3 py-1 rounded-full text-secondary text-xs font-semibold uppercase tracking-wider">
            <span>Admin Control Center</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-poppins">
            Welcome to Air Foundation Management
          </h2>
          <p className="text-slate-200 text-sm leading-relaxed">
            Manage pictures, headlines, messages, videos, faculty members, bulletins, and events. Changes update the public website in real-time.
          </p>
          <div className="pt-2 flex items-center space-x-3 text-xs">
            <span className="flex items-center space-x-1 bg-white/10 px-3 py-1.5 rounded-lg">
              <Database size={14} className="text-secondary" />
              <span>Supabase Backend: <strong>{isSupabaseConnected ? 'Connected & Active' : 'Ready (Using Live Sync)'}</strong></span>
            </span>
          </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => setActiveTab(metric.tab)}
              className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-primary/20 transition-all cursor-pointer group flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-xl border ${metric.color}`}>
                  <Icon size={22} />
                </div>
                <div>
                  <h4 className="text-2xl font-bold font-poppins text-slate-800">{metric.count}</h4>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">{metric.title}</p>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-primary group-hover:text-white text-slate-400 flex items-center justify-center transition-colors">
                <ArrowUpRight size={16} />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Action Tiles */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Quick Management Shortcuts */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
          <h3 className="text-lg font-bold font-poppins text-slate-800">Quick Edit Shortcuts</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => setActiveTab('hero')}
              className="p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-primary/30 hover:shadow-md transition-all text-left group cursor-pointer"
            >
              <h4 className="font-bold text-slate-800 text-sm group-hover:text-primary transition-colors">Hero & Announcements</h4>
              <p className="text-xs text-slate-400 mt-1">Update main homepage titles, banners, and links.</p>
            </button>

            <button
              onClick={() => setActiveTab('leadership')}
              className="p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-primary/30 hover:shadow-md transition-all text-left group cursor-pointer"
            >
              <h4 className="font-bold text-slate-800 text-sm group-hover:text-primary transition-colors">Leadership Messages</h4>
              <p className="text-xs text-slate-400 mt-1">Edit MD, Principal, and VP speeches and pictures.</p>
            </button>

            <button
              onClick={() => setActiveTab('news')}
              className="p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-primary/30 hover:shadow-md transition-all text-left group cursor-pointer"
            >
              <h4 className="font-bold text-slate-800 text-sm group-hover:text-primary transition-colors">Publish News Article</h4>
              <p className="text-xs text-slate-400 mt-1">Add achievements, notices, and press updates.</p>
            </button>

            <button
              onClick={() => setActiveTab('gallery')}
              className="p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-primary/30 hover:shadow-md transition-all text-left group cursor-pointer"
            >
              <h4 className="font-bold text-slate-800 text-sm group-hover:text-primary transition-colors">Upload to Gallery</h4>
              <p className="text-xs text-slate-400 mt-1">Upload event photos, lab sessions, and ceremonies.</p>
            </button>
          </div>
        </div>

        {/* Database & Setup Instructions */}
        <div className="lg:col-span-5 bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center space-x-2 text-secondary">
            <CheckCircle2 size={18} />
            <h3 className="text-base font-bold font-poppins text-white">Supabase SQL Schema</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            The complete database setup file <code className="bg-slate-800 px-1.5 py-0.5 rounded text-secondary font-mono">supabase_schema.sql</code> is stored in the project root.
          </p>
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-[11px] text-slate-400 font-mono space-y-1">
            <p>1. Open your Supabase Dashboard</p>
            <p>2. Go to <strong>SQL Editor</strong></p>
            <p>3. Copy contents of <strong>supabase_schema.sql</strong> & run</p>
          </div>
          <p className="text-[11px] text-slate-400">
            This configures all 19 database tables, public read policies, admin write permissions, media storage buckets, and initial seeds automatically.
          </p>
        </div>
      </div>
    </div>
  );
}
