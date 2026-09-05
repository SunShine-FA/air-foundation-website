import React from 'react';
import { Helmet } from 'react-helmet-async';
import Breadcrumb from '../components/Breadcrumb';
import SectionHeader from '../components/SectionHeader';
import FAQItem from '../components/FAQItem';
import { useData } from '../context/DataContext';

export default function FAQs() {
  const { faqs } = useData();

  return (
    <>
      <Helmet>
        <title>Frequently Asked Questions | Air Foundation School & College</title>
      </Helmet>

      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-5xl font-extrabold font-poppins">FAQs</h1>
          <p className="text-slate-200 text-sm sm:text-base mt-4 max-w-xl">
            Answers regarding applications, scholarship limits, fees, and curriculums.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumb title="FAQs" />
      </div>

      <section className="py-16 bg-slate-50 font-inter">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-12 text-left">
          <SectionHeader title="Frequently Asked Questions" subtitle="General Queries" alignment="center" />
          
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <FAQItem key={faq.id || idx} faq={faq} index={idx} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
