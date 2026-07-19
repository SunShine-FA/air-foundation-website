import React from 'react';
import { Helmet } from 'react-helmet-async';
import Breadcrumb from '../components/Breadcrumb';
import SectionHeader from '../components/SectionHeader';
import FacilityCard from '../components/FacilityCard';
import { FACILITIES } from '../data/mockData';

export default function Facilities() {
  return (
    <>
      <Helmet>
        <title>Campus Infrastructure & Facilities | Air Foundation School \& College</title>
      </Helmet>

      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-5xl font-extrabold font-poppins">Campus Facilities</h1>
          <p className="text-slate-200 text-sm sm:text-base mt-4 max-w-xl">
            Explore our state-of-the-art campus blocks, laboratories, arenas, and performance theaters.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumb title="Facilities" />
      </div>

      <section className="py-16 bg-white font-inter">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <SectionHeader title="Top-Tier Infrastructure for Holistic Growth" subtitle="Our Campus" alignment="center" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FACILITIES.map((facility, idx) => (
              <FacilityCard key={idx} facility={facility} index={idx} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
