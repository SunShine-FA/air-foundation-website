import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumb({ title }) {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <nav className="flex py-3 text-slate-500 text-xs font-medium font-inter border-b border-slate-200/60" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        <li className="inline-flex items-center">
          <Link to="/" className="inline-flex items-center text-slate-400 hover:text-primary transition-colors duration-200">
            <Home size={14} className="mr-1.5" />
            Home
          </Link>
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const formattedValue = value.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

          return (
            <li key={to} className="flex items-center">
              <ChevronRight size={12} className="text-slate-300 mx-1" />
              {isLast ? (
                <span className="text-primary font-semibold truncate max-w-[150px] sm:max-w-none" aria-current="page">
                  {title || formattedValue}
                </span>
              ) : (
                <Link to={to} className="text-slate-400 hover:text-primary transition-colors duration-200 capitalize">
                  {formattedValue}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
