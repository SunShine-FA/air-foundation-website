import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import Breadcrumb from '../components/Breadcrumb';
import SectionHeader from '../components/SectionHeader';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { contentService } from '../services/contentService';
import { useData } from '../context/DataContext';

export default function Contact() {
  const { siteSettings } = useData();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // { type: 'success'|'error', msg: string }

  const settings = siteSettings || {
    address: 'House # 7 Dua chowk main university road capital enclave Jinnah Garden Islamabad',
    phone: '051 5148033',
    email: 'info@airfoundationtahashaheedcampus.com',
    admissionsEmail: 'info@airfoundationtahashaheedcampus.com',
    mapCoordinates: '33.57347093367743,73.16629491313103'
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      const res = await contentService.submitContactQuery(data);
      if (res.success) {
        setSubmitStatus({
          type: 'success',
          msg: `Thank you ${data.name}! Your inquiry has been submitted directly to the Admissions Desk. We will get in touch shortly.`
        });
        reset();
      } else {
        setSubmitStatus({
          type: 'error',
          msg: res.error || 'Failed to submit query. Please try calling directly or emailing us.'
        });
      }
    } catch (err) {
      setSubmitStatus({
        type: 'error',
        msg: err.message || 'An error occurred while submitting your message.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Our Admissions Desk | Air Foundation School & College</title>
      </Helmet>

      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-5xl font-extrabold font-poppins">Contact Us</h1>
          <p className="text-slate-200 text-sm sm:text-base mt-4 max-w-xl">
            Admissions counseling, campus tours, and administrative desks coordinates.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumb title="Contact" />
      </div>

      <section className="py-16 bg-white font-inter">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Quick Info & Address */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <SectionHeader title="Reach Our Office" subtitle="Get In Touch" alignment="left" />
            
            <div className="space-y-6 text-sm text-slate-600">
              <div className="flex items-start space-x-4">
                <div className="bg-primary/5 text-primary p-3 rounded-xl shrink-0"><MapPin size={20} className="text-secondary" /></div>
                <div>
                  <h4 className="font-bold text-slate-800 font-poppins">School Campus Address</h4>
                  <p className="mt-1 leading-relaxed">{settings.address}</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-primary/5 text-primary p-3 rounded-xl shrink-0"><Phone size={20} className="text-secondary" /></div>
                <div>
                  <h4 className="font-bold text-slate-800 font-poppins">Phone Contact Channels</h4>
                  <p className="mt-1 font-semibold text-primary">
                    <a href={`tel:${settings.phone?.replace(/[^0-9]/g, '') || '0515148033'}`} className="hover:underline">
                      {settings.phone || '051 5148033'}
                    </a>
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-primary/5 text-primary p-3 rounded-xl shrink-0"><Mail size={20} className="text-secondary" /></div>
                <div>
                  <h4 className="font-bold text-slate-800 font-poppins">Email Portals</h4>
                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(settings.admissionsEmail || 'info@airfoundationtahashaheedcampus.com')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 font-semibold text-primary hover:underline block cursor-pointer"
                    title="Send email via Gmail"
                  >
                    {settings.admissionsEmail || 'info@airfoundationtahashaheedcampus.com'}
                  </a>
                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(settings.email || 'info@airfoundationtahashaheedcampus.com')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-slate-500 hover:text-primary font-semibold mt-0.5 block hover:underline cursor-pointer"
                    title="Send email via Gmail"
                  >
                    General Queries: {settings.email || 'info@airfoundationtahashaheedcampus.com'}
                  </a>
                </div>
              </div>
            </div>

            {/* Map Mockup */}
            <div className="bg-slate-100 rounded-3xl overflow-hidden aspect-video border border-slate-200/60 shadow-sm relative flex items-center justify-center text-slate-400 text-xs">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=600')] bg-cover bg-center opacity-40" />
              <div className="relative z-10 bg-white/95 text-slate-800 p-4 rounded-2xl shadow-lg border border-slate-100 text-center space-y-1 max-w-[220px]">
                <h5 className="font-bold text-xs font-poppins">Air Foundation School & College</h5>
                <p className="text-[10px] text-slate-500">Taha Shaheed Campus, Islamabad</p>
                <a
                  href={`https://maps.google.com/?q=${settings.mapCoordinates || '33.57347093367743,73.16629491313103'}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[10px] text-primary font-bold hover:underline block pt-1"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 bg-slate-50 p-8 sm:p-10 rounded-3xl border border-slate-100/60 shadow-lg h-fit space-y-6 text-left"
          >
            <div>
              <h3 className="text-xl font-bold font-poppins text-slate-800">Submit Your Query</h3>
              <p className="text-slate-400 text-xs mt-1">If you have specific doubts, fill out the form below.</p>
            </div>

            {submitStatus && (
              <div
                className={`p-4 rounded-2xl border text-xs flex items-start space-x-2.5 ${
                  submitStatus.type === 'success'
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                    : 'bg-rose-50 border-rose-200 text-rose-800'
                }`}
              >
                {submitStatus.type === 'success' ? (
                  <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle size={18} className="text-rose-600 shrink-0 mt-0.5" />
                )}
                <span>{submitStatus.msg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-slate-600 font-semibold">Your Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Muhammad Ali"
                    {...register("name", { required: "Name is required" })}
                    className="w-full bg-white rounded-lg border border-slate-200 p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
                </div>
                <div className="space-y-1.5">
                  <label className="block text-slate-600 font-semibold">Email *</label>
                  <input
                    type="email"
                    placeholder="e.g. name@mail.com"
                    {...register("email", { required: "Email is required" })}
                    className="w-full bg-white rounded-lg border border-slate-200 p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-slate-600 font-semibold">Phone (Optional)</label>
                  <input
                    type="tel"
                    placeholder="e.g. 0300 1234567"
                    {...register("phone")}
                    className="w-full bg-white rounded-lg border border-slate-200 p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-slate-600 font-semibold">Subject *</label>
                  <input
                    type="text"
                    placeholder="e.g. Counseling & Admissions"
                    {...register("subject", { required: "Subject is required" })}
                    className="w-full bg-white rounded-lg border border-slate-200 p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  {errors.subject && <span className="text-red-500 text-xs">{errors.subject.message}</span>}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-slate-600 font-semibold">Message *</label>
                <textarea
                  rows={4}
                  placeholder="Type your message details here..."
                  {...register("message", { required: "Message is required" })}
                  className="w-full bg-white rounded-lg border border-slate-200 p-3 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
                {errors.message && <span className="text-red-500 text-xs">{errors.message.message}</span>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary hover:bg-primary-light text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-md hover:shadow-lg w-fit disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Submitting Query...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send size={14} />
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
