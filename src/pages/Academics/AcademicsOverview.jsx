import React from 'react';
import { Helmet } from 'react-helmet-async';
import Breadcrumb from '../../components/Breadcrumb';
import SectionHeader from '../../components/SectionHeader';
import ProgramCard from '../../components/ProgramCard';
import { useData } from '../../context/DataContext';
import { ArrowRight, BookOpen, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AcademicsOverview() {
  const { programs } = useData();
  return (
    <>
      <Helmet>
        <title>Academic Curriculums | Air Foundation School & College</title>
      </Helmet>

      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-5xl font-extrabold font-poppins">Academic Curriculums</h1>
          <p className="text-slate-200 text-sm sm:text-base mt-4 max-w-xl">
            A comprehensive overview of our learning pipelines, boards, and standards.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumb title="Overview" />
      </div>

      <section className="py-16 bg-white font-inter">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <SectionHeader title="Rigorous Academic Standards" subtitle="Curriculum & Framework" alignment="left" />
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                At Air Foundation School & College (Taha Shaheed Campus), our educational model is built upon high academic rigor, fully registered and regulated under <strong>PEIRA</strong> and affiliated with the <strong>Federal Board of Intermediate and Secondary Education (FBISE)</strong>. We deliver a comprehensive, student-centered curriculum from foundational early-years development through SSC (Matriculation) and HSSC (Intermediate / F.Sc & ICS) qualifications, empowering students with critical thinking, scientific inquiry, moral values, and academic excellence.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/academics/departments" className="bg-primary hover:bg-primary-light text-white font-bold text-sm px-6 py-3 rounded-xl inline-flex items-center space-x-2 transition-all">
                  <span>Explore Departments</span>
                  <ArrowRight size={16} />
                </Link>
                <Link to="/downloads" className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm px-6 py-3 rounded-xl inline-flex items-center space-x-2 transition-all">
                  <span>Download Stream Syllabus</span>
                </Link>
              </div>
            </div>
            <div className="lg:col-span-5 bg-slate-50 p-8 rounded-3xl border border-slate-100/60 shadow-sm space-y-5">
              <h4 className="font-bold text-slate-800 font-poppins text-lg flex items-center space-x-2">
                <GraduationCap className="text-primary" />
                <span>Our Board & Regulatory Affiliations</span>
              </h4>
              <ul className="space-y-4 text-sm text-slate-600">
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-secondary rounded-full shrink-0 mt-1.5" />
                  <div>
                    <span className="font-bold text-slate-800 block">PEIRA</span>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      <strong>Private Educational Institutions Regulatory Authority</strong> — Registered and approved regulatory authority in Islamabad Capital Territory (ICT), ensuring quality standards, faculty qualification benchmarks, and educational infrastructure compliance.
                    </p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-2 h-2 bg-secondary rounded-full shrink-0 mt-1.5" />
                  <div>
                    <span className="font-bold text-slate-800 block">FBISE</span>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      <strong>Federal Board of Intermediate & Secondary Education, Islamabad</strong> — Fully affiliated for SSC (Matric - Science & Computer Groups) and HSSC (Intermediate - Pre-Medical, Pre-Engineering, ICS & FA-IT) board examinations.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-16">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-poppins mb-10 text-center">
              Our Academic Programs & Streams
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {programs.map((program, idx) => (
                <ProgramCard key={program.id || idx} program={program} index={idx} />
              ))}
            </div>
          </div>
          
        </div>
      </section>
    </>
  );
}
