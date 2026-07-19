import React from 'react';
import { Helmet } from 'react-helmet-async';
import Breadcrumb from '../components/Breadcrumb';
import SectionHeader from '../components/SectionHeader';
import NewsCard from '../components/NewsCard';
import { NEWS } from '../data/mockData';

export default function News() {
  return (
    <>
      <Helmet>
        <title>Latest News & Bulletins | Air Foundation School \& College</title>
      </Helmet>

      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-5xl font-extrabold font-poppins">Latest News</h1>
          <p className="text-slate-200 text-sm sm:text-base mt-4 max-w-xl">
            Keep track of our students' achievements, global research exchanges, and campus activities.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumb title="Latest News" />
      </div>

      <section className="py-16 bg-white font-inter">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <SectionHeader title="Air Foundation Bulletin Board" subtitle="News & Updates" alignment="center" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {NEWS.map((article, idx) => (
              <NewsCard key={article.id} article={article} index={idx} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
