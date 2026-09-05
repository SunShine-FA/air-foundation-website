import React from 'react';
import { Helmet } from 'react-helmet-async';
import Breadcrumb from '../../components/Breadcrumb';
import SectionHeader from '../../components/SectionHeader';
import { motion } from 'framer-motion';
import { Clock, Mail, Quote, CheckCircle2 } from 'lucide-react';
import { useData } from '../../context/DataContext';
import vpImg from '../../assets/VP.png';
import { getImageUrl } from '../../utils/imageHelper';

export default function VicePrincipal() {
  const { leadership } = useData();

  const data = leadership?.vice_principal || {
    name: 'Ms. Bushra Abid',
    role: 'Vice Principal & Academic Head',
    campus: 'Air Foundation School & College (Taha Shaheed Campus)',
    image: vpImg,
    office_hours: '10:00 AM - 12:00 PM (Mon-Fri)',
    email: 'info@airfoundationtahashaheedcampus.com',
    quote: 'Education enlightens the mind, while discipline shapes the character. Together, they create responsible individuals and future leaders.',
    paragraphs: [
      "Dear Parents, Students, and Visitors,",
      "It is my pleasure to welcome you to Air Foundation School & College. As Vice Principal, I am dedicated to fostering a supportive and innovative environment where every student is encouraged to reach their full potential.",
      "Education and discipline are the two pillars of success, and together they lay the foundation for a bright and meaningful future.",
      "We are committed to providing quality education while nurturing strong moral values, responsibility, and respect. Our dedicated teachers inspire students to think critically, learn confidently, and develop their unique talents.",
      "We believe that discipline builds character, integrity, and leadership, preparing students to become responsible citizens. We value the partnership between parents and the school in shaping the future of every child."
    ]
  };

  const paragraphs = Array.isArray(data.paragraphs) ? data.paragraphs : [];

  return (
    <>
      <Helmet>
        <title>Vice Principal's Message | Air Foundation School & College</title>
      </Helmet>

      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-5xl font-extrabold font-poppins">Vice Principal's Address</h1>
          <p className="text-slate-200 text-sm sm:text-base mt-4 max-w-xl">
            Welcome address and academic guidelines from Vice Principal {data.name}.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumb title="Vice Principal's Message" />
      </div>

      <section className="py-16 bg-white font-inter">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Executive Picture Box with layered frame */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative">
              {/* Offset decorative backdrop */}
              <div className="absolute inset-0 bg-secondary/30 rounded-3xl rotate-2 scale-95 translate-y-3 -z-10" />

              {/* Main Photo Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-slate-100">
                <img
                  src={getImageUrl(data.image) || vpImg}
                  alt={data.name}
                  onError={(e) => { e.target.src = vpImg; }}
                  className="w-full aspect-[4/5] object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                
                <div className="absolute bottom-4 left-5 right-5 text-white text-left">
                  <span className="inline-flex items-center space-x-1.5 bg-secondary text-slate-900 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full mb-1.5 shadow-sm">
                    <CheckCircle2 size={12} className="text-slate-900" />
                    <span>Academic Directorate</span>
                  </span>
                  <h3 className="text-lg font-bold font-poppins text-white drop-shadow">{data.name}</h3>
                  <p className="text-xs text-slate-200 font-medium">{data.role}</p>
                </div>
              </div>
            </div>

            {/* Leadership Info Card */}
            <div className="mt-6 text-left bg-slate-50 p-6 rounded-2xl border border-slate-200/70 shadow-sm space-y-3">
              <div>
                <h4 className="font-bold text-slate-900 font-poppins text-base">{data.name}</h4>
                <p className="text-xs text-primary font-bold uppercase tracking-wider mt-0.5">{data.role}</p>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5">{data.campus || 'Air Foundation School & College (Taha Shaheed Campus)'}</p>
              </div>

              <div className="text-xs text-slate-600 space-y-2 border-t border-slate-200/60 pt-3">
                <div className="flex items-center space-x-2">
                  <Clock size={14} className="text-primary shrink-0" />
                  <span><strong>Office Hours:</strong> {data.office_hours}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail size={14} className="text-primary shrink-0" />
                  <span><strong>Email:</strong> <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(data.email || 'info@airfoundationtahashaheedcampus.com')}`} target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-primary cursor-pointer">{data.email}</a></span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main message */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <SectionHeader title="Fostering Creativity & Innovation" subtitle="Vice Principal's Desk" alignment="left" />
            
            {data.quote && (
              <div className="bg-primary/5 border-l-4 border-primary p-5 rounded-r-2xl relative my-4">
                <Quote size={24} className="text-secondary/60 absolute top-4 right-4" />
                <p className="italic text-slate-700 font-medium text-sm sm:text-base leading-relaxed pr-8">
                  "{data.quote}"
                </p>
              </div>
            )}

            <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
              {paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}

              <div className="pt-6 border-t border-slate-100">
                <p className="font-poppins font-bold text-slate-900 text-base">{data.name}</p>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-0.5">{data.role}</p>
                <p className="text-xs text-slate-400 mt-0.5">{data.campus || 'Air Foundation School & College (Taha Shaheed Campus)'}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
