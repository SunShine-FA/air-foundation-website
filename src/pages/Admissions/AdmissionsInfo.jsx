import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import Breadcrumb from '../../components/Breadcrumb';
import SectionHeader from '../../components/SectionHeader';
import Timeline from '../../components/Timeline';
import { ADMISSION_TIMELINE } from '../../data/mockData';
import { Send, FileText, CheckCircle2, AlertCircle, Sparkles, BookOpen, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';
import prepImg from '../../assets/prep.avif';
import collegeImg from '../../assets/college.avif';

export default function AdmissionsInfo() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = (data) => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      reset();
      setTimeout(() => setSubmitted(false), 6000);
    }, 600);
  };

  return (
    <>
      <Helmet>
        <title>Admissions Info & Registry | Air Foundation School & College</title>
      </Helmet>

      <section className="bg-primary text-white py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-3xl sm:text-5xl font-extrabold font-poppins">Admissions</h1>
          <p className="text-slate-200 text-sm sm:text-base mt-4 max-w-xl">
            Secure a premium seat for your child. Admissions open for Pre-Classes through Grade 12 (College).
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumb title="Admissions Info" />
      </div>

      <section className="py-16 bg-white font-inter">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Timeline and instructions */}
          <div className="lg:col-span-7 space-y-12 text-left">
            <SectionHeader title="Admissions Timeline & Guide" subtitle="How to Apply" alignment="left" />
            <Timeline items={ADMISSION_TIMELINE} />
            
            {/* Visual Picture Box Duo: One Large + One Small */}
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200/70 relative overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                {/* Large picture */}
                <div className="sm:col-span-7 relative rounded-2xl overflow-hidden shadow-md aspect-[16/10]">
                  <img
                    src={collegeImg}
                    alt="College Campus"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-secondary text-slate-900 px-2 py-0.5 rounded">
                      Senior Campus
                    </span>
                    <p className="text-xs font-semibold mt-1">Grade 9 to 12 (Matric & F.Sc / ICS)</p>
                  </div>
                </div>

                {/* Small Picture & Info */}
                <div className="sm:col-span-5 space-y-4">
                  <div className="relative rounded-2xl overflow-hidden shadow-md aspect-video sm:aspect-square">
                    <img
                      src={prepImg}
                      alt="Early Years Pre Classes"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 text-white">
                      <span className="text-[9px] font-bold uppercase tracking-wider bg-primary text-white px-2 py-0.5 rounded">
                        Early Years
                      </span>
                      <p className="text-[11px] font-semibold mt-0.5">P.G to Primary</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Checklist */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold font-poppins text-slate-800 flex items-center space-x-2">
                <FileText size={20} className="text-primary" />
                <span>Required Documentation Checklist</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200/70 shadow-sm flex flex-col justify-between hover:bg-white hover:shadow-md transition-all h-full">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-slate-200/60">
                      <h4 className="font-bold text-slate-800 text-sm font-poppins flex items-center space-x-2">
                        <BookOpen size={16} className="text-primary" />
                        <span>P.G to 10th Grade</span>
                      </h4>
                      <span className="text-[10px] bg-primary/10 text-primary font-bold px-2.5 py-1 rounded-full uppercase">
                        Pre to Matric
                      </span>
                    </div>
                    <ul className="space-y-3 mt-4 text-xs text-slate-600">
                      <li className="flex items-start space-x-2.5">
                        <CheckCircle2 size={14} className="text-primary shrink-0 mt-0.5" />
                        <span>Birth Certificate / Form-B (Original & Photocopy)</span>
                      </li>
                      <li className="flex items-start space-x-2.5">
                        <CheckCircle2 size={14} className="text-primary shrink-0 mt-0.5" />
                        <span>Father's / Guardian's CNIC copy</span>
                      </li>
                      <li className="flex items-start space-x-2.5">
                        <CheckCircle2 size={14} className="text-primary shrink-0 mt-0.5" />
                        <span>Previous 2 Years Academic Progress Cards (if applicable)</span>
                      </li>
                      <li className="flex items-start space-x-2.5">
                        <CheckCircle2 size={14} className="text-primary shrink-0 mt-0.5" />
                        <span>School Leaving / Transfer Certificate (if applicable)</span>
                      </li>
                      <li className="flex items-start space-x-2.5">
                        <CheckCircle2 size={14} className="text-primary shrink-0 mt-0.5" />
                        <span>2 Passport Size Student Photographs</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200/70 shadow-sm flex flex-col justify-between hover:bg-white hover:shadow-md transition-all h-full">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-slate-200/60">
                      <h4 className="font-bold text-slate-800 text-sm font-poppins flex items-center space-x-2">
                        <GraduationCap size={16} className="text-primary" />
                        <span>College / HSSC (11th - 12th)</span>
                      </h4>
                      <span className="text-[10px] bg-secondary/30 text-slate-800 font-bold px-2.5 py-1 rounded-full uppercase">
                        F.Sc / ICS / FA-IT
                      </span>
                    </div>
                    <ul className="space-y-3 mt-4 text-xs text-slate-600">
                      <li className="flex items-start space-x-2.5">
                        <CheckCircle2 size={14} className="text-primary shrink-0 mt-0.5" />
                        <span>Matriculation Result Card / Marksheet copy</span>
                      </li>
                      <li className="flex items-start space-x-2.5">
                        <CheckCircle2 size={14} className="text-primary shrink-0 mt-0.5" />
                        <span>Character / Provisional Certificate from previous school</span>
                      </li>
                      <li className="flex items-start space-x-2.5">
                        <CheckCircle2 size={14} className="text-primary shrink-0 mt-0.5" />
                        <span>Father's / Guardian's CNIC copy</span>
                      </li>
                      <li className="flex items-start space-x-2.5">
                        <CheckCircle2 size={14} className="text-primary shrink-0 mt-0.5" />
                        <span>NOC from relevant board (for non-FBISE students)</span>
                      </li>
                      <li className="flex items-start space-x-2.5">
                        <CheckCircle2 size={14} className="text-primary shrink-0 mt-0.5" />
                        <span>4 Passport Size Student Photographs</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Online Inquiry Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 bg-slate-50 p-8 sm:p-10 rounded-3xl border border-slate-200/70 shadow-xl h-fit space-y-6 text-left"
          >
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-md">
                Fast-Track Admissions
              </span>
              <h3 className="text-xl font-bold font-poppins text-slate-900 mt-2">Online Inquiry Form</h3>
              <p className="text-slate-500 text-xs mt-1">Submit this inquiry and our counselor will call you within 24 hours.</p>
            </div>

            {submitted && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl text-xs flex items-start space-x-2.5">
                <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                <span>Thank you! Your registration query has been received. Our admissions officer will contact you shortly.</span>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-xs sm:text-sm">
              <div className="space-y-1.5">
                <label className="block text-slate-700 font-semibold">Parent / Guardian Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Sarah Jenkins"
                  {...register("parentName", { required: "Parent name is required" })}
                  className="w-full bg-white rounded-xl border border-slate-200 p-3.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-slate-800"
                />
                {errors.parentName && <span className="text-red-500 text-xs">{errors.parentName.message}</span>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-slate-700 font-semibold">Email *</label>
                  <input
                    type="email"
                    placeholder="e.g. parent@mail.com"
                    {...register("email", { required: "Email is required" })}
                    className="w-full bg-white rounded-xl border border-slate-200 p-3.5 focus:outline-none focus:ring-2 focus:ring-primary text-slate-800"
                  />
                  {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
                </div>
                <div className="space-y-1.5">
                  <label className="block text-slate-700 font-semibold">Phone *</label>
                  <input
                    type="tel"
                    placeholder="e.g. 0300 1234567"
                    {...register("phone", { required: "Phone is required" })}
                    className="w-full bg-white rounded-xl border border-slate-200 p-3.5 focus:outline-none focus:ring-2 focus:ring-primary text-slate-800"
                  />
                  {errors.phone && <span className="text-red-500 text-xs">{errors.phone.message}</span>}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-slate-700 font-semibold">Student Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Lily Jenkins"
                  {...register("studentName", { required: "Student name is required" })}
                  className="w-full bg-white rounded-xl border border-slate-200 p-3.5 focus:outline-none focus:ring-2 focus:ring-primary text-slate-800"
                />
                {errors.studentName && <span className="text-red-500 text-xs">{errors.studentName.message}</span>}
              </div>

              <div className="space-y-1.5">
                <label className="block text-slate-700 font-semibold">Grade Applying For *</label>
                <select
                  {...register("grade", { required: "Select grade" })}
                  className="w-full bg-white rounded-xl border border-slate-200 p-3.5 focus:outline-none focus:ring-2 focus:ring-primary text-slate-800"
                >
                  <option value="">Select Grade...</option>
                  <option value="prep">Pre-Classes (P.G, Nursery & K.G.)</option>
                  <option value="primary">Grade 1 - 5 (Primary)</option>
                  <option value="middle">Grade 6 - 8 (Middle School)</option>
                  <option value="high">Grade 9 - 10 (High School)</option>
                  <option value="jc">Grade 11 - 12 (College - F.Sc / ICS / FA-IT)</option>
                </select>
                {errors.grade && <span className="text-red-500 text-xs">{errors.grade.message}</span>}
              </div>

              <div className="space-y-1.5">
                <label className="block text-slate-700 font-semibold">Preferred Campus Visit / Assessment Date</label>
                <input
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  {...register("preferredDate")}
                  className="w-full bg-white rounded-xl border border-slate-200 p-3.5 focus:outline-none focus:ring-2 focus:ring-primary text-slate-800"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary-light text-white font-bold py-3.5 rounded-xl flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Submitting Inquiry...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Inquiry</span>
                    <Send size={15} />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </>
  );
}
