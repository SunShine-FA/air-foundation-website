import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Users, Key, User, FileText, Calendar, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ParentPortal() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleLogin = (data) => {
    if (data.username === 'parent' && data.password === 'parent123') {
      setIsLoggedIn(true);
    } else {
      alert('Invalid credentials. Use username "parent" and password "parent123" to login.');
    }
  };

  const parentData = {
    parentName: 'Sarah Jenkins',
    wardName: 'Lily Jenkins',
    wardGrade: 'Grade 9 (Middle School)',
    attendance: '96%',
    dues: '$0.00 (Current term cleared)',
    counselingNotes: [
      { date: 'June 20, 2026', subject: 'Academics consultation', teacher: 'Prof. David Vance', notes: 'Lily shows extreme talent in algebra logic. Suggested advance calculus preparation.' },
      { date: 'May 12, 2026', subject: 'Extracurricular evaluation', teacher: 'Coach Cooper', notes: 'Excellent team leadership skills in volleyball matches.' }
    ],
    paymentsHistory: [
      { date: 'April 05, 2026', term: 'First Term 2026', amount: '$5,200', method: 'Online Banking', status: 'Paid' },
      { date: 'October 12, 2025', term: 'Second Term 2025', amount: '$5,200', method: 'Credit Card', status: 'Paid' }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Parent Portal | Air Foundation School & College, Salar Campus</title>
      </Helmet>

      {!isLoggedIn ? (
        <section className="min-h-[70vh] flex items-center justify-center bg-slate-50 py-16 font-inter px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-white p-8 rounded-3xl border border-slate-100 shadow-xl space-y-6"
          >
            <div className="text-center">
              <div className="bg-primary/5 text-primary p-3 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                <Users size={24} className="text-secondary" />
              </div>
              <h1 className="text-2xl font-bold font-poppins text-slate-800">Parent Portal Login</h1>
              <p className="text-slate-400 text-xs mt-1">Access your child's grades, fee sheets, and teacher logs.</p>
            </div>

            <form onSubmit={handleSubmit(handleLogin)} className="space-y-4 text-xs sm:text-sm">
              <div className="space-y-1.5">
                <label className="block text-slate-600 font-semibold">Registered Username *</label>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-3.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="e.g. parent"
                    {...register("username", { required: "Username is required" })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
                  />
                </div>
                {errors.username && <span className="text-red-500 text-xs">{errors.username.message}</span>}
              </div>

              <div className="space-y-1.5">
                <label className="block text-slate-600 font-semibold">Portal Password *</label>
                <div className="relative">
                  <Key size={16} className="absolute left-3 top-3.5 text-slate-400" />
                  <input
                    type="password"
                    placeholder="e.g. parent123"
                    {...register("password", { required: "Password is required" })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
                  />
                </div>
                {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary-light text-white font-bold py-3.5 rounded-lg transition-all cursor-pointer shadow-md hover:shadow-lg"
              >
                Enter Portal
              </button>
            </form>

            <div className="text-center text-[10px] text-slate-400 mt-4 border-t border-slate-100 pt-3">
              Credentials Tip: Username: <strong>parent</strong> | Password: <strong>parent123</strong>
            </div>
          </motion.div>
        </section>
      ) : (
        <section className="bg-slate-50 py-12 font-inter min-h-[75vh]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            {/* Header */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              <div className="flex items-center space-x-4">
                <div className="bg-secondary text-slate-900 w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg shadow-inner font-poppins">
                  SJ
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold font-poppins text-slate-800">Welcome, {parentData.parentName}</h2>
                  <p className="text-slate-400 text-xs font-semibold">Ward: {parentData.wardName} ({parentData.wardGrade})</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-slate-50 px-4 py-2 rounded-xl text-center border border-slate-200/60">
                  <span className="block text-[10px] text-slate-400 font-bold uppercase">Attendance</span>
                  <strong className="text-primary text-base">{parentData.attendance}</strong>
                </div>
                <div className="bg-slate-50 px-4 py-2 rounded-xl text-center border border-slate-200/60">
                  <span className="block text-[10px] text-slate-400 font-bold uppercase">Outstanding Dues</span>
                  <strong className="text-green-600 text-base">{parentData.dues}</strong>
                </div>
                <button
                  onClick={() => setIsLoggedIn(false)}
                  className="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-xl font-bold text-xs uppercase self-center transition-colors cursor-pointer"
                >
                  Log out
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Teacher consultation logs */}
              <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                <h3 className="text-lg font-bold font-poppins text-slate-800 border-b border-slate-100 pb-3 flex items-center space-x-2">
                  <Calendar size={18} className="text-primary" />
                  <span>Teacher & Counseling Logs</span>
                </h3>
                <div className="space-y-4">
                  {parentData.counselingNotes.map((log, idx) => (
                    <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-2 text-xs text-slate-600">
                      <div className="flex justify-between border-b border-slate-200/50 pb-1.5 font-semibold text-slate-700">
                        <span>{log.subject}</span>
                        <span className="text-[10px] text-slate-400">{log.date}</span>
                      </div>
                      <p className="leading-relaxed">{log.notes}</p>
                      <p className="text-[10px] text-slate-400 pt-1">Logged by: <strong>{log.teacher}</strong></p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payments History */}
              <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                <h3 className="text-lg font-bold font-poppins text-slate-800 border-b border-slate-100 pb-3 flex items-center space-x-2">
                  <CreditCard size={18} className="text-primary" />
                  <span>Payments History</span>
                </h3>
                <div className="space-y-4">
                  {parentData.paymentsHistory.map((payment, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <div>
                        <strong className="text-slate-800 text-sm font-poppins">{payment.term}</strong>
                        <p className="text-slate-400 mt-1">Paid on: {payment.date} | Mode: {payment.method}</p>
                      </div>
                      <div className="text-right">
                        <strong className="text-primary text-sm font-semibold block">{payment.amount}</strong>
                        <span className="text-[10px] font-bold text-green-600 uppercase mt-0.5 bg-green-50 px-2 py-0.5 rounded border border-green-200">
                          {payment.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
