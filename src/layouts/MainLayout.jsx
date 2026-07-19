import React from 'react';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

export default function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Header Contact info */}
      <TopBar />

      {/* Main Sticky Navigation */}
      <Navbar />

      {/* Page Content wrapper with routing transitions */}
      <motion.main 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="flex-grow"
      >
        {children}
      </motion.main>

      {/* Footer Sitemap */}
      <Footer />
    </div>
  );
}
