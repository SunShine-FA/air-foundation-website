import React from 'react';
import { Helmet } from 'react-helmet-async';
import Breadcrumb from '../../components/Breadcrumb';
import SectionHeader from '../../components/SectionHeader';
import { CreditCard, AlertCircle } from 'lucide-react';

export default function Fees() {
  const feesData = [
    { grade: 'Primary School (Grade 1-5)', tuition: '$4,500 / term', registration: '$500', caution: '$400' },
    { grade: 'Middle School (Grade 6-8)', tuition: '$5,200 / term', registration: '$500', caution: '$400' },
    { grade: 'High School (Grade 9-10)', tuition: '$6,000 / term', registration: '$600', caution: '$500' },
    { grade: 'Junior College (Grade 11-12)', tuition: '$7,200 / term', registration: '$600', caution: '$500' }
  ];

  return (
    <>
      <Helmet>
        <title>Academic Fee Structure | Air Foundation School \& College</title>
      </Helmet>

      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-5xl font-extrabold font-poppins">Fee Structure</h1>
          <p className="text-slate-200 text-sm sm:text-base mt-4 max-w-xl">
            Transparency in education investment. Detailed breakdown of tuition and admission terms.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumb title="Fee Structure" />
      </div>

      <section className="py-16 bg-white font-inter">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
          <SectionHeader title="Tuition Fees & Admission Terms" subtitle="Investment Guide" alignment="center" />
          
          <div className="bg-white border border-slate-200/60 rounded-3xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600 border-collapse">
                <thead className="bg-slate-50 text-slate-700 font-bold font-poppins text-xs uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="p-5">Grade / Program</th>
                    <th className="p-5">Tuition Fee (Per Term)</th>
                    <th className="p-5">Registration Fee (One-time)</th>
                    <th className="p-5">Caution Deposit (Refundable)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {feesData.map((fee, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-5 font-bold text-slate-800 font-poppins">{fee.grade}</td>
                      <td className="p-5 text-primary font-semibold">{fee.tuition}</td>
                      <td className="p-5">{fee.registration}</td>
                      <td className="p-5">{fee.caution}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10 flex items-start space-x-3.5 text-xs sm:text-sm text-slate-600">
            <AlertCircle size={20} className="text-primary shrink-0 mt-0.5" />
            <div className="space-y-1.5">
              <p className="font-bold text-slate-800">Important Fee Policies:</p>
              <ul className="list-disc pl-5 space-y-1 text-slate-500">
                <li>An academic year consists of two terms (Term 1: April - September, Term 2: October - March).</li>
                <li>Tuition fees must be cleared by the 10th of the first month of each term to avoid late penalty.</li>
                <li>Refundable caution deposit is processed within 30 days of issuing the School leaving certificate.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
