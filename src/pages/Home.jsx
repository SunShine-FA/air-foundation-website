import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';
const CountUpComponent = typeof CountUp === 'function' ? CountUp : (CountUp.default || CountUp);
import { Helmet } from 'react-helmet-async';
import {
  Award, BookOpen, Users, TrendingUp, Globe, ArrowRight, Play, CheckCircle,
  Calendar, Clock, MapPin, Sparkles, GraduationCap, ChevronLeft, ChevronRight
} from 'lucide-react';

import { useData } from '../context/DataContext';
import { PARTNERS } from '../data/mockData';
import SectionHeader from '../components/SectionHeader';
import ProgramCard from '../components/ProgramCard';
import FacultyCard from '../components/FacultyCard';
import FacilityCard from '../components/FacilityCard';
import NewsCard from '../components/NewsCard';
import TestimonialCard from '../components/TestimonialCard';
import Timeline from '../components/Timeline';
import GalleryCategoryCard from '../components/GalleryCategoryCard';
import GalleryLightbox from '../components/GalleryLightbox';
import pImg from '../assets/P.jpeg';
import { getImageUrl } from '../utils/imageHelper';

export default function Home() {
  const {
    hero,
    stats,
    programs,
    faculty,
    facilities,
    news,
    events,
    testimonials,
    gallery,
    leadership,
    whyChooseUs,
    admissionTimeline
  } = useData();

  const [activeGalleryFilter, setActiveGalleryFilter] = useState('All');
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxItem, setLightboxItem] = useState(null);
  const [lightboxList, setLightboxList] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const programsScrollRef = useRef(null);

  const scrollPrograms = (direction) => {
    if (programsScrollRef.current) {
      const scrollAmount = direction === 'left' ? -360 : 360;
      programsScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const galleryCategories = ['All', 'Tech', 'Sports', 'Events', 'Arts', 'Academic', 'Ceremonies'];

  const categoryGroups = React.useMemo(() => {
    const groups = {};
    (gallery || []).forEach(item => {
      const cat = item.category || 'General';
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(item);
    });
    return groups;
  }, [gallery]);

  const handleOpenLightbox = (item, list, index = 0) => {
    setLightboxItem(item);
    setLightboxList(list && list.length > 0 ? list : gallery);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Award': return <Award className="w-8 h-8 text-primary" />;
      case 'TrendingUp': return <TrendingUp className="w-8 h-8 text-primary" />;
      case 'Globe': return <Globe className="w-8 h-8 text-primary" />;
      case 'Users': return <Users className="w-8 h-8 text-primary" />;
      default: return <Sparkles className="w-8 h-8 text-primary" />;
    }
  };

  const parseEventDate = (dateStr) => {
    if (!dateStr) return { month: 'EVT', day: '--', full: 'Date TBA' };
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
      const m = months[d.getMonth()];
      const day = String(d.getDate()).padStart(2, '0');
      return { month: m, day, full: dateStr };
    }
    const parts = dateStr.replace(/,/g, '').split(/\s+/);
    if (parts.length >= 2) {
      const m = parts[0].slice(0, 3).toUpperCase();
      const day = String(parts[1]).padStart(2, '0');
      return { month: m, day, full: dateStr };
    }
    return { month: 'EVT', day: dateStr.slice(0, 5), full: dateStr };
  };

  const principalData = leadership?.principal || {
    name: 'Ms. Nabeela Sajid',
    role: 'Principal, Air Foundation School & College',
    image: pImg,
    quote: 'Welcome to Air Foundation School & College, a vibrant community where our students are inspired to challenge conventions, investigate their environments, and lead change.'
  };

  return (
    <>
      <Helmet>
        <title>Air Foundation School & College, Taha Shaheed Campus</title>
        <meta name="description" content="Welcome to Air Foundation School & College, a premier international school and college nurturing future global leaders." />
      </Helmet>

      {/* HERO SECTION */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-slate-950 text-white font-inter">
        {/* Background Image Overlay */}
        <div
          className="absolute inset-0 opacity-40 bg-cover bg-center"
          style={{ backgroundImage: `url('${hero.background_image || 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1920'}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 via-slate-900/80 to-transparent" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left">
          <div className="max-w-2xl">
            {hero.badge_text && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center space-x-2 bg-secondary/20 border border-secondary/30 px-3 py-1 rounded-full text-secondary text-xs font-semibold uppercase tracking-wider mb-6"
              >
                <Sparkles size={12} className="animate-spin" />
                <span>{hero.badge_text}</span>
              </motion.div>
            )}

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-poppins leading-none"
            >
              {hero.title_highlight && hero.title.includes(hero.title_highlight) ? (
                <>
                  {hero.title.split(hero.title_highlight)[0]}
                  <span className="text-secondary">{hero.title_highlight}</span>
                  {hero.title.split(hero.title_highlight)[1]}
                </>
              ) : (
                hero.title || 'Shaping Visionary leaders For Tomorrow'
              )}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-slate-300 text-base sm:text-lg mt-6 leading-relaxed"
            >
              {hero.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Link
                to={hero.apply_button_link || '/admissions'}
                className="bg-secondary text-slate-900 hover:bg-white hover:text-primary transition-all duration-300 font-bold px-8 py-3.5 rounded-xl flex items-center space-x-2 shadow-lg shadow-secondary/10"
              >
                <span>{hero.apply_button_text || 'Apply Now'}</span>
                <ArrowRight size={18} />
              </Link>
              <Link
                to={hero.learn_button_link || '/about'}
                className="bg-transparent hover:bg-white/10 text-white border border-white/20 transition-all duration-300 font-semibold px-8 py-3.5 rounded-xl"
              >
                {hero.learn_button_text || 'Learn More'}
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATISTICS */}
      <section className="bg-primary text-white py-12 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.id || idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="space-y-1"
              >
                <div className="text-3xl sm:text-4xl font-extrabold text-secondary font-poppins">
                  <CountUpComponent start={0} end={Number(stat.value)} duration={2.5} enableScrollSpy scrollSpyOnce />
                  {stat.suffix}
                </div>
                <div className="text-xs sm:text-sm text-slate-200 font-medium tracking-wide uppercase">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRINCIPAL MESSAGE */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Executive Picture Box with layered frame */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative">
                {/* Offset decorative backdrop */}
                <div className="absolute inset-0 bg-secondary/40 rounded-3xl rotate-3 scale-95 translate-y-3 -z-10" />

                {/* Main Portrait Card */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
                  <img
                    src={getImageUrl(principalData.image) || pImg}
                    alt={principalData.name}
                    onError={(e) => { e.target.src = pImg; }}
                    className="w-full aspect-[4/5] object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-transparent" />
                  
                  <div className="absolute bottom-4 left-5 right-5 text-white text-left">
                    <span className="inline-flex items-center space-x-1.5 bg-secondary text-slate-900 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full mb-1.5 shadow-sm">
                      <CheckCircle size={12} className="text-slate-900" />
                      <span>Principal's Desk</span>
                    </span>
                    <h3 className="text-lg font-bold font-poppins text-white drop-shadow">{principalData.name}</h3>
                    <p className="text-xs text-slate-200 font-medium">{principalData.role || 'Principal'}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6 text-left"
            >
              <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3.5 py-1.5 rounded-full inline-block">
                Welcome Address
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-poppins">
                From the Desk of the Principal
              </h2>
              <div className="h-1.5 w-16 bg-secondary rounded-full" />
              
              <div className="bg-primary/5 border-l-4 border-primary p-5 rounded-r-2xl">
                <p className="text-slate-700 italic font-medium text-sm sm:text-base leading-relaxed">
                  "{principalData.quote || 'Welcome to Air Foundation School & College, a vibrant community where our students are inspired to challenge conventions, investigate their environments, and lead change.'}"
                </p>
              </div>

              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                We believe that education must extend far beyond textbooks. Through our advanced STEM laboratories, visual and theatrical arts streams, and professional coaching clinics, we seek to cultivate every talent to its highest potential.
              </p>
              <div>
                <h4 className="font-bold text-slate-900 font-poppins text-lg">{principalData.name}</h4>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-0.5">
                  {principalData.role || 'Principal, Air Foundation School & College'}
                </p>
              </div>
              <Link
                to="/about/principal"
                className="inline-flex items-center space-x-2 bg-primary hover:bg-primary-light text-white font-bold text-sm px-6 py-3 rounded-xl transition-all shadow-md"
              >
                <span>Read Full Address</span>
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="A Tradition of Academic Brilliance"
            subtitle="Why Choose Air Foundation School & College, Taha Shaheed Campus"
            alignment="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
            {whyChooseUs.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-primary/20 hover:bg-white hover:shadow-xl transition-all duration-300 group"
              >
                <div className="bg-primary/5 p-4 rounded-xl w-fit transition-all duration-300">
                  {getIcon(item.icon)}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mt-6 font-poppins group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-sm mt-3 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ACADEMIC PROGRAMS */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12">
            <SectionHeader
              title="Curriculum Tailored for Future Scholars"
              subtitle="Academic Programs"
              alignment="left"
            />
            <div className="flex items-center space-x-3 mb-12 md:mb-0">
              <button
                onClick={() => scrollPrograms('left')}
                className="p-3 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-primary hover:text-white hover:border-primary transition-all duration-200 shadow-sm cursor-pointer"
                aria-label="Scroll left"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => scrollPrograms('right')}
                className="p-3 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-primary hover:text-white hover:border-primary transition-all duration-200 shadow-sm cursor-pointer"
                aria-label="Scroll right"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div
            ref={programsScrollRef}
            className="flex overflow-x-auto gap-6 pb-6 pt-2 snap-x snap-mandatory scroll-smooth"
          >
            {programs.map((program, idx) => (
              <div key={program.id || idx} className="w-[300px] sm:w-[340px] lg:w-[360px] shrink-0 snap-start flex">
                <ProgramCard program={program} index={idx} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FACULTY & STAFF */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12">
            <SectionHeader
              title="Meet Our Distinguish Faculty"
              subtitle="Mentors & Scholars"
              alignment="left"
            />
            <Link
              to="/academics/faculty"
              className="bg-primary hover:bg-primary-light text-white font-bold text-sm px-6 py-3 rounded-xl inline-flex items-center space-x-2 transition-all w-fit shrink-0 shadow-md"
            >
              <span>View All Faculty</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {faculty.slice(0, 5).map((member, idx) => (
              <FacultyCard key={member.id || idx} faculty={member} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* CAMPUS FACILITIES */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="World-Class Campus Infrastructure"
            subtitle="Premium Facilities"
            alignment="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.slice(0, 3).map((facility, idx) => (
              <FacilityCard key={facility.id || idx} facility={facility} index={idx} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/facilities"
              className="bg-transparent hover:bg-primary hover:text-white text-primary border-2 border-primary font-bold text-sm px-8 py-3.5 rounded-xl inline-flex items-center space-x-2 transition-all shadow-sm"
            >
              <span>Explore All Facilities</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ADMISSION TIMELINE */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Step-by-Step Admissions Procedure"
            subtitle="Admission Roadmap"
            alignment="center"
          />
          <Timeline items={admissionTimeline} />
        </div>
      </section>

      {/* LATEST NEWS & EVENTS */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
          {/* Latest News */}
          <div className="lg:col-span-8 space-y-8">
            <div className="flex justify-between items-end border-b border-slate-200 pb-4">
              <h3 className="text-2xl font-extrabold text-slate-900 font-poppins">
                Latest News & Bulletins
              </h3>
              <Link to="/news" className="text-sm font-bold text-primary hover:text-secondary-dark transition-colors">
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {news.slice(0, 2).map((article, idx) => (
                <NewsCard key={article.id || idx} article={article} index={idx} />
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="lg:col-span-4 space-y-8">
            <div className="flex justify-between items-end border-b border-slate-200 pb-4">
              <div>
                <h3 className="text-2xl font-extrabold text-slate-900 font-poppins">
                  Upcoming Events
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Calendar & Activities</p>
              </div>
              <Link to="/events" className="text-sm font-bold text-primary hover:text-secondary-dark transition-colors inline-flex items-center space-x-1">
                <span>View All</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="space-y-4">
              {events.length === 0 ? (
                <div className="bg-white p-8 rounded-2xl border border-dashed border-slate-200 text-center space-y-2">
                  <Calendar size={28} className="text-slate-300 mx-auto" />
                  <p className="text-xs font-semibold text-slate-600">No Events Scheduled</p>
                  <p className="text-[11px] text-slate-400">Please check back soon.</p>
                </div>
              ) : (
                events.slice(0, 3).map((evt, idx) => {
                  const dateInfo = parseEventDate(evt.date);

                  return (
                    <motion.div
                      key={evt.id || idx}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                      className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-primary/20 transition-all flex items-center space-x-4 group"
                    >
                      {/* Interactive Calendar Date Badge */}
                      <div className="bg-gradient-to-b from-primary to-primary-dark text-white rounded-2xl w-16 h-16 shrink-0 flex flex-col items-center justify-center shadow-md border border-white/10 group-hover:scale-105 transition-transform duration-300">
                        <span className="text-[10px] font-black uppercase tracking-wider text-secondary leading-none">
                          {dateInfo.month}
                        </span>
                        <span className="text-xl font-black font-poppins text-white leading-none mt-1">
                          {dateInfo.day}
                        </span>
                        <div className="flex items-center space-x-0.5 mt-0.5 opacity-80">
                          <Calendar size={10} className="text-secondary" />
                        </div>
                      </div>

                      {/* Event Details */}
                      <div className="min-w-0 flex-1">
                        {/* Prominent Date Text */}
                        <div className="flex items-center space-x-1.5 text-primary text-[11px] font-extrabold uppercase tracking-wider mb-1">
                          <span>{dateInfo.full}</span>
                        </div>

                        <h4 className="font-bold text-slate-900 font-poppins text-sm leading-snug truncate group-hover:text-primary transition-colors">
                          {evt.title}
                        </h4>

                        <div className="flex flex-wrap items-center text-slate-400 text-xs mt-1.5 gap-x-3 gap-y-1">
                          {evt.time && (
                            <span className="flex items-center space-x-1">
                              <Clock size={12} className="text-slate-400 shrink-0" />
                              <span className="truncate max-w-[120px]">{evt.time}</span>
                            </span>
                          )}
                          {evt.location && (
                            <span className="flex items-center space-x-1">
                              <MapPin size={12} className="text-slate-400 shrink-0" />
                              <span className="truncate max-w-[100px]">{evt.location}</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CAMPUS VIDEO TOUR */}
      <section className="py-20 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1920')] bg-cover bg-center opacity-10" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
          <SectionHeader
            title="Take a Virtual Campus Tour"
            subtitle="Campus Video"
            alignment="center"
            light={true}
          />
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 aspect-video bg-slate-950 flex items-center justify-center">
            {isPlayingVideo ? (
              <iframe
                className="w-full h-full"
                src={hero.video_url || 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1'}
                title="Air Foundation School & College Virtual Tour"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <>
                <img
                  src={hero.video_thumbnail || 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1200'}
                  alt="Video thumbnail"
                  className="absolute inset-0 w-full h-full object-cover opacity-60"
                />
                <button
                  onClick={() => setIsPlayingVideo(true)}
                  className="relative z-10 w-20 h-20 bg-secondary text-slate-900 rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform cursor-pointer"
                >
                  <Play size={32} fill="currentColor" className="ml-1" />
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* GALLERY SECTION - Bento Grid Layout */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 text-left">
            <SectionHeader
              title="Moments of Innovation and Growth"
              subtitle="Media Gallery"
              alignment="left"
            />
            <Link
              to="/gallery"
              className="bg-primary hover:bg-primary-light text-white font-bold text-sm px-6 py-3 rounded-xl inline-flex items-center space-x-2 transition-all shrink-0 shadow-md"
            >
              <span>View Full Gallery</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Gallery Filters */}
          <div className="flex flex-wrap gap-2.5 mb-10">
            {galleryCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveGalleryFilter(category)}
                className={`px-5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeGalleryFilter === category
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Category Cards Bento Grid with interactive multi-photo sliders and swipe arrows */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left"
          >
            {activeGalleryFilter === 'All' ? (
              // All View: Each box is a Category album containing its photos with arrows and dots
              Object.keys(categoryGroups).map((catName, idx) => {
                const catItems = categoryGroups[catName] || [];
                const isFeatured = idx === 0;

                return (
                  <GalleryCategoryCard
                    key={catName}
                    category={catName}
                    items={catItems}
                    isFeatured={isFeatured}
                    onOpenLightbox={(photo, list, pIdx) => handleOpenLightbox(photo, list, pIdx)}
                  />
                );
              })
            ) : (
              // Specific Filter View: Render the category photos
              (categoryGroups[activeGalleryFilter] || []).length > 0 ? (
                categoryGroups[activeGalleryFilter].map((photo, idx) => (
                  <GalleryCategoryCard
                    key={photo.id || idx}
                    category={activeGalleryFilter}
                    items={[photo, ...categoryGroups[activeGalleryFilter].filter((_, i) => i !== idx)]}
                    isFeatured={idx === 0}
                    onOpenLightbox={(p, list, pIdx) => handleOpenLightbox(p, categoryGroups[activeGalleryFilter], idx)}
                  />
                ))
              ) : (
                <div className="col-span-full py-12 text-center text-slate-400 text-sm">
                  No photos found for {activeGalleryFilter}.
                </div>
              )
            )}
          </motion.div>
        </div>
      </section>

      {/* Interactive Lightbox Modal */}
      <GalleryLightbox
        isOpen={lightboxOpen}
        selectedItem={lightboxItem}
        allItems={lightboxList}
        initialIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
      />

      {/* TESTIMONIALS */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Stories of Success and Development"
            subtitle="Parent & Alumna Reviews"
            alignment="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {testimonials.slice(0, 3).map((review, idx) => (
              <TestimonialCard key={review.id || idx} testimonial={review} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS / ACCREDITATIONS WITH LOGOS */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-xs font-extrabold uppercase tracking-widest text-primary bg-primary/5 px-4 py-1.5 rounded-full">
              Recognitions & Affiliations
            </span>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {PARTNERS.map((partner, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="flex items-center space-x-4 bg-slate-50 hover:bg-white hover:shadow-lg border border-slate-200/80 px-6 py-4 rounded-2xl transition-all duration-300 group max-w-md"
              >
                {partner.logo && (
                  <div className="w-14 h-14 bg-white p-1.5 rounded-xl border border-slate-100 shadow-sm shrink-0 flex items-center justify-center">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                )}
                <div className="text-left">
                  <span className="text-[10px] font-bold text-secondary uppercase tracking-wider block">Authorized Body</span>
                  <h4 className="font-poppins font-bold text-slate-800 text-sm md:text-base leading-snug group-hover:text-primary transition-colors">
                    {partner.name}
                  </h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-primary text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center opacity-10" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold font-poppins">
            Ready to Begin Your Educational Journey?
          </h2>
          <p className="text-slate-200 text-base max-w-lg mx-auto">
            Book an admissions counseling session or submit your online application today to join Air Foundation School & College's academic cohort.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link
              to="/admissions"
              className="bg-secondary text-slate-900 hover:bg-white hover:text-primary transition-all duration-300 font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-secondary/15"
            >
              Start Application
            </Link>
            <Link
              to="/contact"
              className="bg-transparent hover:bg-white/10 border border-white/20 text-white font-semibold px-8 py-3.5 rounded-xl transition-all"
            >
              Contact Admissions Desk
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
