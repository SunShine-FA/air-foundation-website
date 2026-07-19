import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import Breadcrumb from '../../components/Breadcrumb';
import SectionHeader from '../../components/SectionHeader';
import Timeline from '../../components/Timeline';
import { ADMISSION_TIMELINE } from '../../data/mockData';
import { Send, FileText, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdmissionsInfo() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    alert(`Thank you ${data.parentName}! Your registration query for student "${data.studentName}" has been submitted.`);
    reset();
  };

  return (
    <>
      <Helmet>
        <title>Admissions Info & Registry | Air Foundation School \& College</title>
      </Helmet>

      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-5xl font-extrabold font-poppins">Admissions</h1>
          <p className="text-slate-200 text-sm sm:text-base mt-4 max-w-xl">
            Secure a premium seat for your child. Admissions open for Grade 1 through 12.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumb title="Admissions Info" />
      </div>

      <section className="py-16 bg-white font-inter">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Timeline and instructions */}
          <div className="lg:col-span-7 space-y-12">
            <SectionHeader title="Admissions Timeline & Guide" subtitle="How to Apply" alignment="left" />
            <Timeline items={ADMISSION_TIMELINE} />
            
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/60 text-xs text-slate-500 space-y-2">
              <h4 className="font-bold text-slate-700 flex items-center space-x-2">
                <FileText size={16} className="text-primary" />
                <span>Required Documentation for Interaction:</span>
              </h4>
              <ul className="list-disc pl-5 space-y-1.5 mt-2">
                <li>Birth Certificate (Original and Photocopy)</li>
                <li>Previous 2 Years of Academic Progress Cards</li>
                <li>Transfer/Leaving Certificate from previous school</li>
                <li>3 Passport Size Student Photographs</li>
              </ul>
            </div>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-lg h-fit space-y-6"
          >
            <div>
              <h3 className="text-xl font-bold font-poppins text-slate-800">Online Inquiry Form</h3>
              <p className="text-slate-400 text-xs mt-1">Submit this inquiry and our counselor will call you within 24 hours.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-xs sm:text-sm">
              <div className="space-y-1.5">
                <label className="block text-slate-600 font-semibold">Parent Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Sarah Jenkins"
                  {...register("parentName", { required: "Parent name is required" })}
                  className="w-full bg-white rounded-lg border border-slate-200 p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                {errors.parentName && <span className="text-red-500 text-xs">{errors.parentName.message}</span>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-slate-600 font-semibold">Email *</label>
                  <input
                    type="email"
                    placeholder="e.g. parent@mail.com"
                    {...register("email", { required: "Email is required" })}
                    className="w-full bg-white rounded-lg border border-slate-200 p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
                </div>
                <div className="space-y-1.5">
                  <label className="block text-slate-600 font-semibold">Phone *</label>
                  <input
                    type="tel"
                    placeholder="e.g. +1 555-0199"
                    {...register("phone", { required: "Phone is required" })}
                    className="w-full bg-white rounded-lg border border-slate-200 p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  {errors.phone && <span className="text-red-500 text-xs">{errors.phone.message}</span>}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-slate-600 font-semibold">Student Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Lily Jenkins"
                  {...register("studentName", { required: "Student name is required" })}
                  className="w-full bg-white rounded-lg border border-slate-200 p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {errors.studentName && <span className="text-red-500 text-xs">{errors.studentName.message}</span>}
              </div>

              <div className="space-y-1.5">
                <label className="block text-slate-600 font-semibold">Grade Applying For *</label>
                <select
                  {...register("grade", { required: "Select grade" })}
                  className="w-full bg-white rounded-lg border border-slate-200 p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select Grade...</option>
                  <option value="primary">Grade 1 - 5 (Primary)</option>
                  <option value="middle">Grade 6 - 8 (Middle School)</option>
                  <option value="high">Grade 9 - 10 (High School)</option>
                  <option value="jc">Grade 11 - 12 (Junior College)</option>
                </select>
                {errors.grade && <span className="text-red-500 text-xs">{errors.grade.message}</span>}
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary-light text-white font-bold py-3 rounded-lg flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-md"
              >
                <span>Submit Inquiry</span>
                <Send size={15} />
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </>
  );
}
