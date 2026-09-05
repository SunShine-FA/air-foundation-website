import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Award } from 'lucide-react';
import { NAV_LINKS, PORTAL_LINKS } from '../constants/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import logoImg from '../assets/logos.jpg';


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const isActiveLink = (path) => {
    if (!path) return false;
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled
        ? 'bg-primary/95 backdrop-blur-md shadow-lg border-b border-primary/20 py-2'
        : 'bg-primary py-4'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Brand */}
          <Link to="/" className="flex items-center space-x-3 group text-left">
            <div className="bg-white p-1.5 rounded-xl flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
              <img src={logoImg} alt="Air Foundation Logo" className="w-9 h-9 object-contain" />
            </div>
            <div>
              <span className="text-sm sm:text-base lg:text-lg font-extrabold tracking-tight text-white block font-poppins leading-none">
                AIR FOUNDATION SCHOOL & COLLEGE
              </span>
              <span className="text-[10px] sm:text-[11px] tracking-wider text-secondary uppercase font-bold block mt-1">
                Taha Shaheed Campus • Inspiring Excellence
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {NAV_LINKS.map((link, idx) => (
              <div
                key={idx}
                className="relative group py-2"
                onMouseEnter={() => link.dropdown && setActiveDropdown(idx)}
                onMouseLeave={() => link.dropdown && setActiveDropdown(null)}
              >
                {link.dropdown ? (
                  <button
                    className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${link.dropdown.some(sub => isActiveLink(sub.path))
                        ? 'text-secondary font-semibold'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                      }`}
                  >
                    <span>{link.name}</span>
                    <ChevronDown size={14} className="transition-transform duration-200 group-hover:rotate-180" />
                  </button>
                ) : (
                  <Link
                    to={link.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${isActiveLink(link.path)
                        ? 'text-secondary font-semibold bg-white/5'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                      }`}
                  >
                    {link.name}
                  </Link>
                )}

                {/* Dropdown Menu */}
                {link.dropdown && (
                  <AnimatePresence>
                    {activeDropdown === idx && (
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 15 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 top-full w-56 bg-white rounded-lg shadow-xl border border-slate-100 py-2 mt-1 text-slate-800 z-50 overflow-hidden"
                      >
                        {link.dropdown.map((sub, subIdx) => (
                          <Link
                            key={subIdx}
                            to={sub.path}
                            className={`block px-4 py-2 text-sm transition-colors duration-150 ${isActiveLink(sub.path)
                                ? 'bg-primary/10 text-primary font-semibold'
                                : 'hover:bg-slate-50 text-slate-700 hover:text-primary'
                              }`}
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* Quick Actions (Desktop) */}
          {/* <div className="hidden lg:flex items-center space-x-3">
            {PORTAL_LINKS.map((portal, idx) => (
              <Link
                key={idx}
                to={portal.path}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase transition-all duration-300 shadow-sm border border-transparent ${portal.color}`}
              >
                {portal.name.split(' ')[0]} Portal
              </Link>
            ))}
          </div> */}

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-secondary hover:bg-white/10 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-primary-dark border-t border-primary/20 mt-2 overflow-hidden text-white"
          >
            <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3 max-h-[80vh] overflow-y-auto">
              {NAV_LINKS.map((link, idx) => (
                <div key={idx} className="block">
                  {link.dropdown ? (
                    <>
                      <button
                        onClick={() => toggleDropdown(idx)}
                        className="w-full flex justify-between items-center px-3 py-2.5 rounded-md text-base font-medium text-white/90 hover:bg-white/5 hover:text-white"
                      >
                        <span>{link.name}</span>
                        <ChevronDown
                          size={16}
                          className={`transition-transform duration-200 ${activeDropdown === idx ? 'rotate-180 text-secondary' : ''}`}
                        />
                      </button>

                      {/* Mobile Dropdown Sublinks */}
                      {activeDropdown === idx && (
                        <div className="pl-6 space-y-1 bg-black/10 py-1.5 rounded-md my-1">
                          {link.dropdown.map((sub, subIdx) => (
                            <Link
                              key={subIdx}
                              to={sub.path}
                              className={`block px-3 py-2 rounded-md text-sm ${isActiveLink(sub.path)
                                  ? 'text-secondary font-semibold bg-white/5'
                                  : 'text-white/70 hover:text-white'
                                }`}
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to={link.path}
                      className={`block px-3 py-2.5 rounded-md text-base font-medium ${isActiveLink(link.path)
                          ? 'text-secondary font-semibold bg-white/5'
                          : 'text-white/90 hover:bg-white/5 hover:text-white'
                        }`}
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}

              {/* Mobile Portal Buttons */}
              <div className="pt-4 pb-2 border-t border-white/10 grid grid-cols-2 gap-2 px-3">
                {PORTAL_LINKS.map((portal, idx) => (
                  <Link
                    key={idx}
                    to={portal.path}
                    className={`block w-full text-center py-2 rounded-md text-xs font-bold uppercase ${portal.color}`}
                  >
                    {portal.name}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
