import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  LayoutDashboard, Sparkles, TrendingUp, UserCheck, BookOpen, Users,
  Box, Image as ImageIcon, Newspaper, Calendar, Building, Quote,
  Download, Trophy, Briefcase, HelpCircle, History, MessageSquare,
  Settings, LogOut, Menu, X, Globe, ExternalLink, ShieldCheck
} from 'lucide-react';
import { authService } from '../../services/authService';
import { useData } from '../../context/DataContext';
import AdminLogin from './AdminLogin';
import Toast from './components/Toast';

// Submodules
import DashboardModule from './modules/DashboardModule';
import HeroModule from './modules/HeroModule';
import StatsModule from './modules/StatsModule';
import LeadershipModule from './modules/LeadershipModule';
import ProgramsModule from './modules/ProgramsModule';
import FacultyModule from './modules/FacultyModule';
import DepartmentsModule from './modules/DepartmentsModule';
import GalleryModule from './modules/GalleryModule';
import NewsModule from './modules/NewsModule';
import EventsModule from './modules/EventsModule';
import FacilitiesModule from './modules/FacilitiesModule';
import TestimonialsModule from './modules/TestimonialsModule';
import DownloadsModule from './modules/DownloadsModule';
import ResultsModule from './modules/ResultsModule';
import CareersModule from './modules/CareersModule';
import FaqsModule from './modules/FaqsModule';
import HistoryModule from './modules/HistoryModule';
import ManagementModule from './modules/ManagementModule';
import ContactSubmissionsModule from './modules/ContactSubmissionsModule';
import SiteSettingsModule from './modules/SiteSettingsModule';
import logoImg from '../../assets/logos.jpg';

export default function AdminPortal() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const dataContext = useData();

  // Always force login when navigating to /admin-portal
  useEffect(() => {
    authService.logout();
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setToast({ message: 'Welcome back, Administrator!', type: 'success' });
  };

  const handleLogout = async () => {
    await authService.logout();
    setIsAuthenticated(false);
    setToast({ message: 'Logged out successfully', type: 'info' });
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const navItems = [
    { key: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard, section: 'Overview' },
    { key: 'hero', label: 'Hero & Virtual Tour', icon: Sparkles, section: 'Homepage' },
    { key: 'stats', label: 'Key Statistics', icon: TrendingUp, section: 'Homepage' },
    { key: 'leadership', label: 'Leadership Desks', icon: UserCheck, section: 'About' },
    { key: 'management', label: 'Management Desk', icon: ShieldCheck, section: 'About' },
    { key: 'history', label: 'School Milestones', icon: History, section: 'About' },
    { key: 'programs', label: 'Academic Programs', icon: BookOpen, section: 'Academics' },
    { key: 'faculty', label: 'Faculty & Mentors', icon: Users, section: 'Academics' },
    { key: 'departments', label: 'Departments & Labs', icon: Box, section: 'Academics' },
    { key: 'downloads', label: 'Downloads & Prospectus', icon: Download, section: 'Academics' },
    { key: 'results', label: 'Board Exam Results', icon: Trophy, section: 'Academics' },
    { key: 'facilities', label: 'Campus Facilities', icon: Building, section: 'Campus' },
    { key: 'gallery', label: 'Media Gallery', icon: ImageIcon, section: 'Media & Life' },
    { key: 'news', label: 'News & Bulletins', icon: Newspaper, section: 'Media & Life' },
    { key: 'events', label: 'Events Schedule', icon: Calendar, section: 'Media & Life' },
    { key: 'testimonials', label: 'Parent Reviews', icon: Quote, section: 'Media & Life' },
    { key: 'careers', label: 'Careers & Vacancies', icon: Briefcase, section: 'Administration' },
    { key: 'faqs', label: 'General FAQs', icon: HelpCircle, section: 'Administration' },
    { key: 'contact_submissions', label: 'Contact Inquiries', icon: MessageSquare, section: 'Administration' },
    { key: 'settings', label: 'Settings & Media Uploader', icon: Settings, section: 'System' }
  ];

  if (!isAuthenticated) {
    return (
      <>
        <Helmet>
          <title>Admin Portal Login | Air Foundation School & College</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <AdminLogin onLoginSuccess={handleLoginSuccess} />
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ message: '', type: 'success' })}
        />
      </>
    );
  }

  const renderActiveModule = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <DashboardModule
            data={dataContext}
            setActiveTab={setActiveTab}
            isSupabaseConnected={dataContext.isSupabaseConnected}
          />
        );
      case 'hero':
        return (
          <HeroModule
            heroData={dataContext.hero}
            onRefresh={dataContext.refreshData}
            showToast={showToast}
          />
        );
      case 'stats':
        return (
          <StatsModule
            stats={dataContext.stats}
            onRefresh={dataContext.refreshData}
            showToast={showToast}
          />
        );
      case 'leadership':
        return (
          <LeadershipModule
            leadership={dataContext.leadership}
            onRefresh={dataContext.refreshData}
            showToast={showToast}
          />
        );
      case 'management':
        return (
          <ManagementModule
            management={dataContext.management}
            onRefresh={dataContext.refreshData}
            showToast={showToast}
          />
        );
      case 'history':
        return (
          <HistoryModule
            history={dataContext.history}
            onRefresh={dataContext.refreshData}
            showToast={showToast}
          />
        );
      case 'programs':
        return (
          <ProgramsModule
            programs={dataContext.programs}
            onRefresh={dataContext.refreshData}
            showToast={showToast}
          />
        );
      case 'faculty':
        return (
          <FacultyModule
            faculty={dataContext.faculty}
            departments={dataContext.departments}
            onRefresh={dataContext.refreshData}
            showToast={showToast}
          />
        );
      case 'departments':
        return (
          <DepartmentsModule
            departments={dataContext.departments}
            faculty={dataContext.faculty}
            onRefresh={dataContext.refreshData}
            showToast={showToast}
          />
        );
      case 'downloads':
        return (
          <DownloadsModule
            downloads={dataContext.downloads}
            onRefresh={dataContext.refreshData}
            showToast={showToast}
          />
        );
      case 'results':
        return (
          <ResultsModule
            results={dataContext.results}
            onRefresh={dataContext.refreshData}
            showToast={showToast}
          />
        );
      case 'facilities':
        return (
          <FacilitiesModule
            facilities={dataContext.facilities}
            onRefresh={dataContext.refreshData}
            showToast={showToast}
          />
        );
      case 'gallery':
        return (
          <GalleryModule
            gallery={dataContext.gallery}
            onRefresh={dataContext.refreshData}
            showToast={showToast}
          />
        );
      case 'news':
        return (
          <NewsModule
            news={dataContext.news}
            onRefresh={dataContext.refreshData}
            showToast={showToast}
          />
        );
      case 'events':
        return (
          <EventsModule
            events={dataContext.events}
            onRefresh={dataContext.refreshData}
            showToast={showToast}
          />
        );
      case 'testimonials':
        return (
          <TestimonialsModule
            testimonials={dataContext.testimonials}
            onRefresh={dataContext.refreshData}
            showToast={showToast}
          />
        );
      case 'careers':
        return (
          <CareersModule
            careers={dataContext.careers}
            onRefresh={dataContext.refreshData}
            showToast={showToast}
          />
        );
      case 'faqs':
        return (
          <FaqsModule
            faqs={dataContext.faqs}
            onRefresh={dataContext.refreshData}
            showToast={showToast}
          />
        );
      case 'contact_submissions':
        return (
          <ContactSubmissionsModule
            showToast={showToast}
          />
        );
      case 'settings':
        return (
          <SiteSettingsModule
            settings={dataContext.siteSettings}
            onRefresh={dataContext.refreshData}
            showToast={showToast}
          />
        );
      default:
        return (
          <DashboardModule
            data={dataContext}
            setActiveTab={setActiveTab}
            isSupabaseConnected={dataContext.isSupabaseConnected}
          />
        );
    }
  };

  return (
    <>
      <Helmet>
        <title>Administrative Portal | Air Foundation School & College</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-slate-100 flex font-inter text-slate-800">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 text-slate-300 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Logo Brand Header */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center space-x-3 text-left">
              <div className="bg-white p-1 rounded-lg">
                <img src={logoImg} alt="Air Foundation Logo" className="w-8 h-8 object-contain" />
              </div>
              <div>
                <h1 className="text-sm font-bold text-white font-poppins leading-tight">
                  AIR FOUNDATION
                </h1>
                <span className="text-[10px] text-secondary font-bold uppercase tracking-wider block">
                  Admin Portal (Taha Shaheed Campus)
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white p-1"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-grow overflow-y-auto p-4 space-y-1 text-left">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.key;

              return (
                <button
                  key={item.key}
                  onClick={() => {
                    setActiveTab(item.key);
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-primary text-white shadow-md shadow-primary/20 font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon size={16} className={isActive ? 'text-secondary' : 'text-slate-400'} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Footer User Info & Logout */}
          <div className="p-4 border-t border-slate-800 space-y-3">
            <div className="flex items-center justify-between px-2">
              <div className="text-left">
                <p className="text-xs font-bold text-white">info@airfoundationtahashaheedcampus.com</p>
                <span className="text-[10px] text-emerald-400 font-semibold">● System Administrator</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="/"
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors"
                title="Open Public Website"
              >
                <Globe size={13} />
                <span>Live Site</span>
              </a>

              <button
                onClick={handleLogout}
                className="py-2 px-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
                title="Sign Out"
              >
                <LogOut size={13} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Mobile Backdrop */}
        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm lg:hidden"
          />
        )}

        {/* Main Content Area */}
        <div className="flex-1 lg:pl-72 flex flex-col min-w-0">
          {/* Top Bar */}
          <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <Menu size={20} />
              </button>
              <div className="text-left">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold block">
                  Management Console
                </span>
                <h2 className="text-base font-bold font-poppins text-slate-900 capitalize">
                  {navItems.find(i => i.key === activeTab)?.label || 'Dashboard'}
                </h2>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <span className="hidden sm:inline-flex items-center space-x-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200/60 px-3 py-1 rounded-full text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Supabase Live Sync Active</span>
              </span>
            </div>
          </header>

          {/* Module Canvas */}
          <main className="p-6 sm:p-8 flex-grow">
            {renderActiveModule()}
          </main>
        </div>
      </div>

      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: 'success' })}
      />
    </>
  );
}
