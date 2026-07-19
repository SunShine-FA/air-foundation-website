import React from 'react';
import { Phone, Mail, GraduationCap, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TopBar() {
  return (
    <div className="bg-[#072a61] text-white text-xs py-2.5 px-4 sm:px-6 lg:px-8 border-b border-white/10 hidden md:block">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Contact info */}
        <div className="flex items-center space-x-6">
          <a href="tel:0515148033" className="flex items-center space-x-2 hover:text-secondary transition-colors duration-200">
            <Phone size={14} className="text-secondary" />
            <span>051 5148033</span>
          </a>
          <a href="mailto:info@premschool.edu" className="flex items-center space-x-2 hover:text-secondary transition-colors duration-200">
            <Mail size={14} className="text-secondary" />
            <span>info@premschool.edu</span>
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
            <span className="text-white/60">CEEB Code: 123456</span>
          </div>
        </div>
      </div>
    </div>
  );
}
