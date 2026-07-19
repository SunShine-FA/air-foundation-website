import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import logoImg from '../assets/logos.png';

export default function Footer() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  
  const onSubmit = (data) => {
    alert(`Thank you for subscribing, ${data.email}!`);
    reset();
  };

  return (
    <footer className="bg-slate-900 text-slate-300 font-inter">
      {/* Upper Footer / CTA Newsletter */}
      <div className="border-b border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-white text-xl sm:text-2xl font-bold font-poppins">
              Stay Connected with Air Foundation <br /> School and College 
            </h3>
            <p className="text-lg text-slate-300">
              (Salar Campus)
            </p>
            <p className="text-slate-400 mt-2 text-sm max-w-md">
              Subscribe to our monthly newsletter for campus event schedules, admissions updates, and achievements.
            </p>
          </div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  {...register("email", { 
                    required: "Email is required", 
                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email" } 
                  })}
                  className="w-full bg-slate-800 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary border border-transparent focus:border-transparent transition-all"
                />
                {errors.email && (
                  <span className="absolute left-0 -bottom-5 text-red-500 text-xs">{errors.email.message}</span>
                )}
              </div>
              <button
                
                type="submit"
                className="bg-primary hover:bg-primary-light text-white font-semibold text-sm px-6 py-3 rounded-lg flex items-center justify-center space-x-2 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 shrink-0"
              >
                <span>Subscribe</span>
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand Column */}
        <div className="space-y-6">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-white p-1 rounded-lg flex items-center justify-center shrink-0">
              <img src={logoImg} alt="Air Foundation Logo" className="w-8 h-8 object-contain" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white block font-poppins">
                AIR FOUNDATION SCHOOL AND COLLEGE
              </span>
              <p className="text-lg text-slate-300">
              (Salar Campus)
            </p>
              <span className="text-[10px] tracking-widest text-secondary uppercase font-semibold block">
                Inspiring Excellence
              </span>
            </div>
          </Link>
          <p className="text-slate-400 text-sm leading-relaxed">
            Empowering students with international academic standards, cutting-edge resources, and a values-first educational mindset since 2018.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="p-2.5 bg-slate-800 rounded-full hover:bg-secondary hover:text-slate-900 transition-all duration-200" aria-label="Facebook">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
            </a>
            <a href="#" className="p-2.5 bg-slate-800 rounded-full hover:bg-secondary hover:text-slate-900 transition-all duration-200" aria-label="Twitter">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
            </a>
            <a href="#" className="p-2.5 bg-slate-800 rounded-full hover:bg-secondary hover:text-slate-900 transition-all duration-200" aria-label="Instagram">
              <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="#" className="p-2.5 bg-slate-800 rounded-full hover:bg-secondary hover:text-slate-900 transition-all duration-200" aria-label="LinkedIn">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold font-poppins mb-6 border-l-4 border-secondary pl-3">
            Quick Links
          </h4>
          <ul className="space-y-3.5 text-sm">
            <li><Link to="/about" className="hover:text-secondary transition-colors">About Our Academy</Link></li>
            <li><Link to="/academics" className="hover:text-secondary transition-colors">Academic Curriculums</Link></li>
            <li><Link to="/admissions" className="hover:text-secondary transition-colors">Apply Online</Link></li>
            <li><Link to="/facilities" className="hover:text-secondary transition-colors">Campus Facilities</Link></li>
            <li><Link to="/gallery" className="hover:text-secondary transition-colors">Media Gallery</Link></li>
            <li><Link to="/careers" className="hover:text-secondary transition-colors">Join Our Faculty</Link></li>
          </ul>
        </div>

        {/* Portals & Resources */}
        <div>
          <h4 className="text-white font-semibold font-poppins mb-6 border-l-4 border-secondary pl-3">
            Portals & Info
          </h4>
          <ul className="space-y-3.5 text-sm">
            <li><Link to="/portal/student" className="hover:text-secondary transition-colors">Student Log-in Portal</Link></li>
            <li><Link to="/portal/parent" className="hover:text-secondary transition-colors">Parent Log-in Portal</Link></li>
            <li><Link to="/downloads" className="hover:text-secondary transition-colors">Academic Downloads</Link></li>
            <li><Link to="/results" className="hover:text-secondary transition-colors">Board Examination Results</Link></li>
            <li><Link to="/faqs" className="hover:text-secondary transition-colors">Frequently Asked Questions</Link></li>
            <li><Link to="/admissions/fees" className="hover:text-secondary transition-colors">Fee Structures</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h4 className="text-white font-semibold font-poppins mb-6 border-l-4 border-secondary pl-3">
            Contact Info
          </h4>
          <ul className="space-y-4 text-sm text-slate-400">
            <li className="flex items-start space-x-3">
              <MapPin size={18} className="text-secondary shrink-0 mt-1" />
              <a 
                href="https://maps.google.com/?q=33.57347093367743,73.16629491313103" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white transition-colors underline decoration-secondary/50 underline-offset-4"
              >
                Air Foundation School and College, Salar Campus
              </a>
            </li>
            <li className="flex items-center space-x-3">
              <Phone size={18} className="text-secondary shrink-0" />
              <span>051 5148033</span>
            </li>
            <li className="flex items-center space-x-3">
              <Mail size={18} className="text-secondary shrink-0" />
              <span>admissions@premschool.edu</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="bg-slate-950 py-6 text-xs text-center border-t border-slate-800 text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Air Foundation School and College, Salar Campus. All Rights Reserved. Designed for premium education.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
