import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page Not Found | Air Foundation School \& College</title>
      </Helmet>

      <section className="min-h-[75vh] flex items-center justify-center bg-slate-50 font-inter px-4">
        <div className="text-center space-y-6 max-w-md">
          <motion.div
            initial={{ scale: 0.9, rotate: -5 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 10 }}
            className="bg-primary/5 text-primary p-6 rounded-full w-24 h-24 flex items-center justify-center mx-auto"
          >
            <ShieldAlert size={48} className="text-secondary" />
          </motion.div>
          
          <h1 className="text-4xl sm:text-5xl font-extrabold font-poppins text-slate-800 leading-none">404 Error</h1>
          <h2 className="text-lg sm:text-xl font-bold font-poppins text-slate-600">The page you sought does not exist.</h2>
          <p className="text-slate-400 text-sm">
            It might have been renamed or removed. Please return to the homepage or search our curriculum boards.
          </p>

          <div className="pt-4">
            <Link
              to="/"
              className="bg-primary hover:bg-primary-light text-white font-bold text-sm px-6 py-3.5 rounded-xl inline-flex items-center space-x-2 transition-all cursor-pointer shadow-md hover:shadow-lg"
            >
              <ArrowLeft size={16} />
              <span>Back to Homepage</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
