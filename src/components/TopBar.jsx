import React from 'react';
import { Phone, Mail, GraduationCap, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';

export default function TopBar() {
  const { settings = {} } = useData();
  const email = settings?.email || 'info@airfoundationtahashaheedcampus.com';
  const phone = settings?.phone || '051 5148033';
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;

  return (
    <div className="bg-[#072a61] text-white text-xs py-2.5 px-4 sm:px-6 lg:px-8 border-b border-white/10 hidden md:block">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Contact info */}
        <div className="flex items-center space-x-6">
          <a href={`tel:${phone.replace(/[^0-9]/g, '')}`} className="flex items-center space-x-2 hover:text-secondary transition-colors duration-200">
            <Phone size={14} className="text-secondary" />
            <span>{phone}</span>
          </a>
          <a 
            href={gmailUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 hover:text-secondary transition-colors duration-200 cursor-pointer"
            title="Send email via Gmail"
          >
            <Mail size={14} className="text-secondary" />
            <span>{email}</span>
          </a>
        </div>

        {/* Portal links and direct actions */}
        <div className="flex items-center space-x-4">
          <Link 
            to="/portal/student" 
            className="flex items-center space-x-1 hover:text-secondary transition-colors duration-200 border-r border-white/20 pr-4"
          >
            <GraduationCap size={14} className="text-secondary" />
            <span>Student Portal</span>
          </Link>
          <Link 
            to="/portal/parent" 
            className="flex items-center space-x-1 hover:text-secondary transition-colors duration-200 border-r border-white/20 pr-4"
          >
            <Users size={14} className="text-secondary" />
            <span>Parent Portal</span>
          </Link>
          <div className="flex items-center space-x-3 pl-1">
            <span className="text-white/60">School Code : 1597</span>
          </div>
        </div>
      </div>
    </div>
  );
}
