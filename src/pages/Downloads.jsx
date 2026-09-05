import React from 'react';
import { Helmet } from 'react-helmet-async';
import Breadcrumb from '../components/Breadcrumb';
import SectionHeader from '../components/SectionHeader';
import { ArrowDownToLine, FileText, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { useData } from '../context/DataContext';

export default function Downloads() {
  const { downloads } = useData();

  const handleOpenDoc = (doc) => {
    if (doc.file_url && doc.file_url !== '#') {
      window.open(doc.file_url, '_blank', 'noopener,noreferrer');
    } else {
      alert(`The document "${doc.title}" does not have an uploaded file URL yet. Please upload a PDF in the Admin Portal.`);
    }
  };

  return (
    <>
      <Helmet>
        <title>Academic Documents & Downloads | Air Foundation School & College</title>
      </Helmet>

      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-5xl font-extrabold font-poppins">Academic Downloads</h1>
          <p className="text-slate-200 text-sm sm:text-base mt-4 max-w-xl">
            Acquire syllabi, prospects, handbooks, and schedules directly.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumb title="Downloads" />
      </div>

      <section className="py-16 bg-white font-inter">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
          <SectionHeader title="Prospectus & Stream Syllabi" subtitle="Document Resources" alignment="center" />
          
          <div className="space-y-4 text-left">
            {downloads.map((doc, idx) => (
              <motion.div
                key={doc.id || idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                onClick={() => handleOpenDoc(doc)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleOpenDoc(doc);
                  }
                }}
                className="bg-slate-50 hover:bg-white p-6 rounded-2xl border border-slate-100/80 hover:border-primary/40 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-between gap-4 cursor-pointer group select-none"
                title={`Click to open ${doc.title}`}
              >
                <div className="flex items-center space-x-4 min-w-0 flex-1">
                  <div className="bg-primary/5 group-hover:bg-primary/10 text-primary p-3.5 rounded-2xl shrink-0 transition-colors duration-200">
                    <FileText size={22} className="text-secondary group-hover:scale-110 transition-transform duration-200" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-slate-800 font-poppins text-sm sm:text-base truncate group-hover:text-primary transition-colors duration-200">
                      {doc.title}
                    </h4>
                    <p className="text-xs text-slate-400 font-semibold mt-0.5 uppercase tracking-wider">
                      Size: {doc.size} | Format: {doc.format || 'PDF'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 shrink-0">
                  <span className="hidden sm:inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-400 group-hover:text-primary transition-colors">
                    <span>Open & Download</span>
                    <ExternalLink size={13} className="opacity-60 group-hover:opacity-100 transition-opacity" />
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenDoc(doc);
                    }}
                    className="bg-primary group-hover:bg-primary-light text-white p-3 rounded-xl group-hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0 shadow-sm"
                    title="Open / Download Document"
                    aria-label={`Open or download ${doc.title}`}
                  >
                    <ArrowDownToLine size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
