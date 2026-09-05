import React from 'react';
import { Mail, Briefcase, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FacultyCard({ faculty, index }) {
  const isAvatar = typeof faculty.image === 'string' && (
    faculty.image.includes('avatar') ||
    faculty.image.includes('favatar') ||
    faculty.image.includes('mavatar')
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "50px" }}
      transition={{ duration: 0.5, delay: (index % 5) * 0.06 }}
      className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100/90 group flex flex-col h-full text-left"
    >
      {/* Picture Box */}
      <div className={`relative overflow-hidden aspect-[4/5] shrink-0 ${isAvatar ? 'bg-gradient-to-b from-slate-100 to-slate-200 flex items-center justify-center p-6' : 'bg-slate-100'}`}>
        <img
          src={faculty.image}
          alt={faculty.name}
          className={`w-full h-full transition-transform duration-500 group-hover:scale-105 ${
            isAvatar ? 'object-contain max-h-[85%] drop-shadow-sm' : 'object-cover object-top'
          }`}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <a
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(faculty.email || 'info@airfoundationtahashaheedcampus.com')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-secondary text-slate-900 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 shadow-lg hover:bg-white hover:text-primary transition-all duration-300"
            title="Send email via Gmail"
          >
            <Mail size={14} />
            <span>Contact Faculty</span>
          </a>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 group-hover:text-primary transition-colors font-poppins line-clamp-1">
            {faculty.name}
          </h3>
          <p className="text-xs text-primary font-bold uppercase tracking-wider mt-0.5 line-clamp-1">
            {faculty.role}
          </p>
          {(faculty.department || faculty.category) && (
            <span className="inline-block mt-2 px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-primary/5 text-primary border border-primary/15">
              {faculty.department || faculty.category}
            </span>
          )}
        </div>

        <div className="mt-4 space-y-2 border-t border-slate-100 pt-3 text-slate-600 text-xs">
          <div className="flex items-start space-x-2">
            <GraduationCap size={15} className="text-primary shrink-0 mt-0.5" />
            <span className="line-clamp-1">{faculty.qualification}</span>
          </div>
          <div className="flex items-start space-x-2">
            <Briefcase size={14} className="text-primary shrink-0 mt-0.5" />
            <span className="line-clamp-1">{faculty.experience}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
