import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';
const CountUpComponent = typeof CountUp === 'function' ? CountUp : (CountUp.default || CountUp);
import { Helmet } from 'react-helmet-async';
import { 
  Award, BookOpen, Users, TrendingUp, Globe, ArrowRight, Play, CheckCircle, 
  Calendar, Clock, MapPin, Sparkles, GraduationCap 
} from 'lucide-react';

import { 
  STATS, WHY_CHOOSE_US, PROGRAMS, FACULTY, FACILITIES, 
  ADMISSION_TIMELINE, NEWS, EVENTS, TESTIMONIALS, PARTNERS, GALLERY 
} from '../data/mockData';

import SectionHeader from '../components/SectionHeader';
import ProgramCard from '../components/ProgramCard';
import FacultyCard from '../components/FacultyCard';
import FacilityCard from '../components/FacilityCard';
import NewsCard from '../components/NewsCard';
import TestimonialCard from '../components/TestimonialCard';
import Timeline from '../components/Timeline';

export default function Home() {
  const [activeGalleryFilter, setActiveGalleryFilter] = useState('All');
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  const galleryCategories = ['All', 'Events', 'Arts', 'Tech', 'Sports'];
  
  const filteredGallery = activeGalleryFilter === 'All' 
    ? GALLERY 
    : GALLERY.filter(item => item.category === activeGalleryFilter);

  // Simple mapping to render Lucide Icons dynamically from mock data strings
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Award': return <Award className="w-8 h-8 text-primary" />;
      case 'TrendingUp': return <TrendingUp className="w-8 h-8 text-primary" />;
      case 'Globe': return <Globe className="w-8 h-8 text-primary" />;
      case 'Users': return <Users className="w-8 h-8 text-primary" />;
      default: return <Sparkles className="w-8 h-8 text-primary" />;
    }
  };

  return (
    <>
      <Helmet>
        <title>Air Foundation School & College, Salar Campus</title>
        <meta name="description" content="Welcome to Air Foundation School \& College, a premier international school and junior college nurturing future global leaders." />
      </Helmet>

      {/* HERO SECTION */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-slate-950 text-white font-inter">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1920')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 via-slate-900/80 to-transparent" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-secondary/20 border border-secondary/30 px-3 py-1 rounded-full text-secondary text-xs font-semibold uppercase tracking-wider mb-6"
            >
              <Sparkles size={12} className="animate-spin" />
              <span>Admissions Open for 2026-2027</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-poppins leading-none"
            >
              Shaping <span className="text-secondary">Visionary leaders</span> For Tomorrow
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-slate-300 text-base sm:text-lg mt-6 leading-relaxed"
            >
              Welcome to Air Foundation School & College (Salar Campus), where premium academic values meet world-class campus facilities to foster intellectual, moral, and creative growth.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Link
                to="/admissions"
                className="bg-secondary text-slate-900 hover:bg-white hover:text-primary transition-all duration-300 font-bold px-8 py-3.5 rounded-xl flex items-center space-x-2 shadow-lg shadow-secondary/10"
              >
                <span>Apply Online</span>
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/about"
                className="bg-transparent hover:bg-white/10 text-white border border-white/20 transition-all duration-300 font-semibold px-8 py-3.5 rounded-xl"
              >
                Learn More
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATISTICS */}
      <section className="bg-primary text-white py-12 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STATS.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="space-y-1"
              >
                <div className="text-3xl sm:text-4xl font-extrabold text-secondary font-poppins">
                  <CountUpComponent start={0} end={stat.value} duration={2.5} enableScrollSpy scrollSpyOnce />
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 relative"
            >
              <div className="absolute inset-0 bg-secondary rounded-3xl rotate-3 scale-95" />
              <img
                src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=800"
                alt="Principal Dr. Robert Chen"
                className="relative z-10 w-full rounded-3xl shadow-xl object-cover aspect-[4/5] object-center"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-6"
            >
              <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/5 px-3 py-1 rounded-full">
                Welcome Message
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-poppins">
                From the Desk of the Principal
              </h2>
              <div className="h-1 w-16 bg-secondary" />
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                "Welcome to Air Foundation School & College, a vibrant community where our students are inspired to challenge conventions, investigate their environments, and lead change. Our vision is to provide a rigorous, balanced learning atmosphere that equips each pupil with academic mastery and strong social capabilities."
              </p>
              <p className="text-slate-600 leading-relaxed text-sm">
                We believe that education must extend far beyond textbooks. Through our advanced STEM laboratories, visual and theatrical arts streams, and professional coaching clinics, we seek to cultivate every talent to its highest potential.
              </p>
              <div>
                <h4 className="font-bold text-slate-900 font-poppins text-lg">Dr. Robert Chen</h4>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                  Principal, Air Foundation School & College (Ph.D., MIT)
                </p>
              </div>
              <Link
                to="/about/principal"
                className="inline-flex items-center space-x-2 text-primary font-bold text-sm hover:text-secondary-dark transition-colors"
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
            subtitle="Why Choose Air Foundation School & College, Salar Campus" 
            alignment="center" 
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {WHY_CHOOSE_US.map((item, idx) => (
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
          <SectionHeader 
            title="Curriculum Tailored for Future Scholars" 
            subtitle="Academic Programs" 
            alignment="center" 
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROGRAMS.map((program, idx) => (
              <ProgramCard key={program.id} program={program} index={idx} />
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
              className="bg-primary hover:bg-primary-light text-white font-bold text-sm px-6 py-3 rounded-xl inline-flex items-center space-x-2 transition-all w-fit shrink-0"
            >
              <span>View All Faculty</span>
              <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {FACULTY.map((member, idx) => (
              <FacultyCard key={idx} faculty={member} index={idx} />
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
            {FACILITIES.slice(0, 3).map((facility, idx) => (
              <FacilityCard key={idx} facility={facility} index={idx} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/facilities"
              className="bg-transparent hover:bg-primary hover:text-white text-primary border border-primary/20 font-bold text-sm px-8 py-3.5 rounded-xl inline-flex items-center space-x-2 transition-all"
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
          <Timeline items={ADMISSION_TIMELINE} />
        </div>
      </section>

      {/* LATEST NEWS & EVENTS */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
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
              {NEWS.slice(0, 2).map((article, idx) => (
                <NewsCard key={article.id} article={article} index={idx} />
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="lg:col-span-4 space-y-8">
            <div className="flex justify-between items-end border-b border-slate-200 pb-4">
              <h3 className="text-2xl font-extrabold text-slate-900 font-poppins">
                Upcoming Events
              </h3>
              <Link to="/events" className="text-sm font-bold text-primary hover:text-secondary-dark transition-colors">
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {EVENTS.map((evt, idx) => (
                <motion.div
                  key={evt.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex items-start space-x-4"
                >
                  <div className="bg-primary/5 text-primary p-3 rounded-xl text-center shrink-0">
                    <Calendar size={18} className="text-secondary mx-auto" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 font-poppins text-sm leading-snug">
                      {evt.title}
                    </h4>
                    <div className="flex items-center text-slate-400 text-xs mt-1.5 space-x-3">
                      <span className="flex items-center space-x-1">
                        <Clock size={12} />
                        <span>{evt.time.split(' ')[0]}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <MapPin size={12} />
                        <span>{evt.location.split(' ')[0]}</span>
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CAMPUS VIDEO MOCKUP */}
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
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Air Foundation School \& College Virtual Tour"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <>
                <img
                  src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1200"
                  alt="Video thumbnail"
                  className="absolute inset-0 w-full h-full object-cover opacity-60"
                />
                <button
                  onClick={() => setIsPlayingVideo(true)}
                  className="relative z-10 w-20 h-20 bg-secondary text-slate-900 rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform"
                >
                  <Play size={32} fill="currentColor" className="ml-1" />
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="Moments of Innovation and Growth" 
            subtitle="Media Gallery" 
            alignment="center" 
          />
          
          {/* Gallery Filters */}
          <div className="flex flex-wrap justify-center gap-2.5 mb-10">
            {galleryCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveGalleryFilter(category)}
                className={`px-5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  activeGalleryFilter === category
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredGallery.map((item, idx) => (
              <motion.div
                layout
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-2xl overflow-hidden group aspect-[4/3] bg-slate-100 shadow-sm hover:shadow-lg"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="text-[10px] text-secondary font-bold tracking-widest uppercase">{item.category}</span>
                  <h4 className="text-white font-bold text-lg mt-1 font-poppins">{item.title}</h4>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader 
            title="Stories of Success and Development" 
            subtitle="Parent & Alumna Reviews" 
            alignment="center" 
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((review, idx) => (
              <TestimonialCard key={idx} testimonial={review} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="py-12 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-300">
            <span className="text-slate-400 font-bold uppercase tracking-widest text-xs">Accreditations:</span>
            {PARTNERS.map((partner, idx) => (
              <span key={idx} className="font-poppins font-extrabold text-slate-700 text-sm md:text-base">
                {partner.name}
              </span>
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
            Book an admissions counseling session or submit your online application today to join Air Foundation School \& College's academic cohort.
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
