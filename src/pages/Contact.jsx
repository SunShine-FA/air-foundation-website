import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import Breadcrumb from '../components/Breadcrumb';
import SectionHeader from '../components/SectionHeader';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Contact() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    alert(`Thank you ${data.name}. Your query has been logged. We will contact you soon.`);
    reset();
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
          <div className="lg:col-span-5 space-y-8">
            <SectionHeader title="Reach Our Offices" subtitle="Get In Touch" alignment="left" />
            
            <div className="space-y-6 text-sm text-slate-600">
              <div className="flex items-start space-x-4">
                <div className="bg-primary/5 text-primary p-3 rounded-xl shrink-0"><MapPin size={20} className="text-secondary" /></div>
                <div>
                  <h4 className="font-bold text-slate-800 font-poppins">School Campus Address</h4>
                  <p className="mt-1 leading-relaxed">House # 7 Dua chowk main university road capital enclave Jinnah Garden Islamabad</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-primary/5 text-primary p-3 rounded-xl shrink-0"><Phone size={20} className="text-secondary" /></div>
                <div>
                  <h4 className="font-bold text-slate-800 font-poppins">Phone Contact Channels</h4>
                  <p className="mt-1 font-semibold text-primary">
                    <a href="tel:0515148033" className="hover:underline">051 5148033</a>
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-primary/5 text-primary p-3 rounded-xl shrink-0"><Mail size={20} className="text-secondary" /></div>
                <div>
                  <h4 className="font-bold text-slate-800 font-poppins">Email Portals</h4>
                  <p className="mt-1 font-semibold text-primary">admissions@premschool.edu</p>
                  <p className="text-xs text-slate-400 font-semibold mt-0.5">General Queries: info@premschool.edu</p>
                </div>
              </div>
            </div>

            {/* Map Mockup */}
            <div className="bg-slate-100 rounded-3xl overflow-hidden aspect-video border border-slate-200/60 shadow-sm relative flex items-center justify-center text-slate-400 text-xs">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=600')] bg-cover bg-center opacity-40" />
              <div className="relative z-10 bg-white/95 text-slate-800 p-4 rounded-2xl shadow-lg border border-slate-100 text-center space-y-1 max-w-[200px]">
                <h5 className="font-bold text-xs font-poppins">Air Foundation School & College</h5>
                <p className="text-[10px] text-slate-500">Salar Campus</p>
                <a href="https://maps.google.com/?q=33.57347093367743,73.16629491313103" target="_blank" rel="noreferrer" className="text-[10px] text-primary font-bold hover:underline block pt-1">
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
            className="lg:col-span-7 bg-slate-50 p-8 sm:p-10 rounded-3xl border border-slate-100/60 shadow-lg h-fit space-y-6"
          >
            <div>
              <h3 className="text-xl font-bold font-poppins text-slate-800">Submit Your Query</h3>
              <p className="text-slate-400 text-xs mt-1">If you have specific doubts, fill out the form below.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-slate-600 font-semibold">Your Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. John Doe"
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

              <div className="space-y-1.5">
                <label className="block text-slate-600 font-semibold">Subject *</label>
                <input
                  type="text"
                  placeholder="e.g. Counseling queries"
                  {...register("subject", { required: "Subject is required" })}
                  className="w-full bg-white rounded-lg border border-slate-200 p-3 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {errors.subject && <span className="text-red-500 text-xs">{errors.subject.message}</span>}
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
                className="bg-primary hover:bg-primary-light text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-md hover:shadow-lg w-fit"
              >
                <span>Send Message</span>
                <Send size={14} />
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </>
  );
}
