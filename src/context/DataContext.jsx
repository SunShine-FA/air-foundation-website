import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { contentService } from '../services/contentService';
import { getImageUrl } from '../utils/imageHelper';
import cmImg from '../assets/CM.jpeg';
import pImg from '../assets/P.jpeg';
import vpImg from '../assets/VP.png';
import drAmir from '../assets/Dr Amir.jpg';
import drShahid from '../assets/Dr Shahid.jpg';
import sirIqbal from '../assets/Sir Iqbal.jpg';
import favatar from '../assets/favatar.png';
import mavatar from '../assets/mavatar.png';
import {
  STATS as DEFAULT_STATS,
  WHY_CHOOSE_US as DEFAULT_WHY_CHOOSE_US,
  PROGRAMS as DEFAULT_PROGRAMS,
  DEPARTMENTS as DEFAULT_DEPARTMENTS,
  FACULTY as DEFAULT_FACULTY,
  FACILITIES as DEFAULT_FACILITIES,
  ADMISSION_TIMELINE as DEFAULT_ADMISSION_TIMELINE,
  NEWS as DEFAULT_NEWS,
  EVENTS as DEFAULT_EVENTS,
  TESTIMONIALS as DEFAULT_TESTIMONIALS,
  DOWNLOADS as DEFAULT_DOWNLOADS,
  RESULTS as DEFAULT_RESULTS,
  FAQS as DEFAULT_FAQS,
  CAREERS as DEFAULT_CAREERS,
  GALLERY as DEFAULT_GALLERY
} from '../data/mockData';

const DataContext = createContext(null);

const DEFAULT_HERO = {
  badge_text: 'Admissions Open for 2026-2027',
  title: 'Shaping Visionary leaders For Tomorrow',
  title_highlight: 'Visionary leaders',
  description: 'Welcome to Air Foundation School & College (Taha Shaheed Campus), where premium academic values meet world-class campus facilities to foster intellectual, moral, and creative growth.',
  apply_button_text: 'Apply Now',
  apply_button_link: '/admissions',
  learn_button_text: 'Learn More',
  learn_button_link: '/about',
  background_image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1920',
  video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
  video_thumbnail: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1200'
};

const DEFAULT_HISTORY = [
  { year: '2018', title: 'The Beginning', description: 'Started in 2018 as a small school with around 7 rooms, offering classes from Pre-Grade (P.G) to Grade 7, with an initial strength of approximately 15 students.' },
  { year: '2019', title: 'Rapid Growth', description: 'Within one and a half years of its establishment, the school experienced remarkable growth, increasing its student strength to around 250 students.' },
  { year: '2020', title: 'New Campus', description: 'Moved to a new building spread over 2 kanals in 2020 to accommodate the rapidly growing number of students and provide better educational facilities.' },
  { year: '2023', title: 'Federal Board & PEIRA Affiliation', description: 'The institution became affiliated with the Federal Board and PEIRA in 2023, strengthening its academic recognition and institutional standing.' },
  { year: '2025', title: 'College Venture & New Campus', description: 'Started a new college venture in 2025 and established another campus in the society, marking a major expansion in higher education.' },
  { year: '2026', title: 'Growing Stronger', description: 'Alhamdulillah, the institution has now grown to a student strength of approximately 620 students.' }
];

const DEFAULT_MANAGEMENT = [
  { name: 'Major (R) Sajid Kiani', role: 'Managing Director', bg: 'Major (R)', image: cmImg, sort_order: 1 },
  { name: 'Dr. Shahid', role: 'Director', bg: 'Ph.D', image: drShahid || mavatar, sort_order: 2 },
  { name: 'Dr. Amir Rafique', role: 'Director Academics', bg: 'Ph.D', image: drAmir, sort_order: 3 },
  { name: 'Ms. Nabila Sajid', role: 'Principal', bg: 'BS', image: pImg, sort_order: 4 },
  { name: 'Ms. Bushra Abid', role: 'Vice Principal', bg: 'B.A', image: vpImg, sort_order: 5 },
  { name: 'Mr. Iqbal', role: 'Director Administration', bg: 'MBA', image: sirIqbal, sort_order: 6 },
  { name: 'Ms. Nadia Manzoor', role: 'Administration', bg: 'MBA', image: favatar, sort_order: 7 }
];

export function DataProvider({ children }) {
  const [hero, setHero] = useState(DEFAULT_HERO);
  const [stats, setStats] = useState(DEFAULT_STATS);
  const [programs, setPrograms] = useState(DEFAULT_PROGRAMS);
  const [faculty, setFaculty] = useState(DEFAULT_FACULTY);
  const [departments, setDepartments] = useState(DEFAULT_DEPARTMENTS);
  const [facilities, setFacilities] = useState(DEFAULT_FACILITIES);
  const [gallery, setGallery] = useState(DEFAULT_GALLERY);
  const [news, setNews] = useState(DEFAULT_NEWS);
  const [events, setEvents] = useState(DEFAULT_EVENTS);
  const [testimonials, setTestimonials] = useState(DEFAULT_TESTIMONIALS);
  const [downloads, setDownloads] = useState(DEFAULT_DOWNLOADS);
  const [results, setResults] = useState(DEFAULT_RESULTS);
  const [faqs, setFaqs] = useState(DEFAULT_FAQS);
  const [careers, setCareers] = useState(DEFAULT_CAREERS);
  const [history, setHistory] = useState(DEFAULT_HISTORY);
  const [management, setManagement] = useState(DEFAULT_MANAGEMENT);
  const [leadership, setLeadership] = useState({});
  const [siteSettings, setSiteSettings] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isSupabaseConnected, setIsSupabaseConnected] = useState(false);

  const fetchAllData = useCallback(async () => {
    setIsLoading(true);
    try {
      // Parallel requests for performance
      const [
        heroRes,
        statsRes,
        progRes,
        facRes,
        deptRes,
        facilRes,
        galRes,
        newsRes,
        eventRes,
        testRes,
        downRes,
        resRes,
        faqRes,
        carRes,
        histRes,
        mgtRes,
        leadRes,
        settingsRes
      ] = await Promise.all([
        contentService.getHeroBanner(),
        contentService.getAll('stats', 'sort_order'),
        contentService.getAll('programs', 'sort_order'),
        contentService.getAll('faculty', 'sort_order'),
        contentService.getAll('departments', 'sort_order'),
        contentService.getAll('facilities', 'sort_order'),
        contentService.getAll('gallery', 'created_at', false),
        contentService.getAll('news', 'sort_order'),
        contentService.getAll('events', 'sort_order'),
        contentService.getAll('testimonials', 'sort_order'),
        contentService.getAll('downloads', 'sort_order'),
        contentService.getAll('results', 'sort_order'),
        contentService.getAll('faqs', 'sort_order'),
        contentService.getAll('careers', 'sort_order'),
        contentService.getAll('history_milestones', 'sort_order'),
        contentService.getAll('management_team', 'sort_order'),
        contentService.getAll('leadership_messages', 'id'),
        contentService.getSiteSettings('general')
      ]);

      if (heroRes?.success && heroRes.data) {
        setHero({
          ...heroRes.data,
          background_image: getImageUrl(heroRes.data.background_image) || heroRes.data.background_image,
          video_thumbnail: getImageUrl(heroRes.data.video_thumbnail) || heroRes.data.video_thumbnail
        });
        setIsSupabaseConnected(true);
      }
      if (statsRes?.success && Array.isArray(statsRes.data) && statsRes.data.length > 0) setStats(statsRes.data);
      if (progRes?.success && Array.isArray(progRes.data) && progRes.data.length > 0) {
        setPrograms(progRes.data.map(p => ({ ...p, image: getImageUrl(p.image) })));
      }
      if (facRes?.success && Array.isArray(facRes.data) && facRes.data.length > 0) {
        setFaculty(facRes.data.map(f => ({
          ...f,
          image: getImageUrl(f.image, (f.name || '').toLowerCase().includes("ma'am") || (f.name || '').toLowerCase().includes("ms") ? 'female' : 'male')
        })));
      }
      if (deptRes?.success && Array.isArray(deptRes.data) && deptRes.data.length > 0) setDepartments(deptRes.data);
      if (facilRes?.success && Array.isArray(facilRes.data) && facilRes.data.length > 0) {
        setFacilities(facilRes.data.map(fc => ({ ...fc, image: getImageUrl(fc.image) })));
      }
      if (galRes?.success && Array.isArray(galRes.data) && galRes.data.length > 0) {
        // Ensure every category has multiple rich photos
        const combined = galRes.data.map(g => ({ ...g, image: getImageUrl(g.image) }));
        DEFAULT_GALLERY.forEach((defItem) => {
          const count = combined.filter(c => (c.category || '').toLowerCase() === (defItem.category || '').toLowerCase()).length;
          if (count < 4 && !combined.some(c => c.title === defItem.title || c.image === defItem.image)) {
            combined.push({ ...defItem, image: getImageUrl(defItem.image) });
          }
        });
        setGallery(combined);
      }
      if (newsRes?.success && Array.isArray(newsRes.data) && newsRes.data.length > 0) {
        setNews(newsRes.data.map(n => ({ ...n, image: getImageUrl(n.image) })));
      }
      if (eventRes?.success && Array.isArray(eventRes.data)) {
        setEvents(eventRes.data.map(e => ({ ...e, image: getImageUrl(e.image) })));
      }
      if (testRes?.success && Array.isArray(testRes.data) && testRes.data.length > 0) {
        setTestimonials(testRes.data.map(t => ({ ...t, image: getImageUrl(t.image) })));
      }
      if (downRes?.success && Array.isArray(downRes.data) && downRes.data.length > 0) setDownloads(downRes.data);
      if (resRes?.success && Array.isArray(resRes.data)) {
        setResults(resRes.data.map(r => ({ ...r, image: getImageUrl(r.image) })));
      }
      if (faqRes?.success && Array.isArray(faqRes.data) && faqRes.data.length > 0) setFaqs(faqRes.data);
      if (carRes?.success && Array.isArray(carRes.data) && carRes.data.length > 0) setCareers(carRes.data);
      if (histRes?.success && Array.isArray(histRes.data) && histRes.data.length > 0) setHistory(histRes.data);
      if (mgtRes?.success && Array.isArray(mgtRes.data)) {
        setManagement(mgtRes.data.map(m => ({ ...m, image: getImageUrl(m.image) })));
      }
      if (leadRes?.success && Array.isArray(leadRes.data) && leadRes.data.length > 0) {
        const mapped = {};
        leadRes.data.forEach(item => {
          mapped[item.id] = {
            ...item,
            image: getImageUrl(item.image)
          };
        });
        setLeadership(mapped);
      }
      if (settingsRes?.success && settingsRes.data) setSiteSettings(settingsRes.data);

    } catch (err) {
      console.warn('DataContext fetchAllData fallback notice:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  const value = {
    hero,
    stats,
    programs,
    faculty,
    departments,
    facilities,
    gallery,
    news,
    events,
    testimonials,
    downloads,
    results,
    faqs,
    careers,
    history,
    management,
    leadership,
    siteSettings,
    whyChooseUs: DEFAULT_WHY_CHOOSE_US,
    admissionTimeline: DEFAULT_ADMISSION_TIMELINE,
    isLoading,
    isSupabaseConnected,
    refreshData: fetchAllData
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
