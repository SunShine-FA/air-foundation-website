import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { BookOpen, Calendar, Key, User, FileText, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function StudentPortal() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleLogin = (data) => {
    if (data.username === 'student' && data.password === 'student123') {
      setIsLoggedIn(true);
    } else {
      alert('Invalid credentials. Use username "student" and password "student123" to login.');
    }
  };

  const studentData = {
    name: 'Julian Thorne',
    grade: 'Grade 12 (Science Stream)',
    roll: 'A-2026-104',
    attendance: '94%',
    gpa: '3.92 / 4.00',
    assignments: [
      { subject: 'Advanced Physics', due: 'July 10, 2026', status: 'Pending' },
      { subject: 'Calculus II', due: 'July 12, 2026', status: 'Pending' },
      { subject: 'Computational AI Practical', due: 'Completed', status: 'Graded (A)' }
    ],
    schedule: [
      { time: '08:30 AM', subject: 'Astrophysics Lecture', room: 'Lab 4' },
      { time: '10:30 AM', subject: 'Vector Calculus practicals', room: 'Maths Lab' },
      { time: '01:00 PM', subject: 'Lawn Tennis Coaching', room: 'Sports Arena' }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Student Portal | Air Foundation School & College, Taha Shaheed Campus</title>
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
                <BookOpen size={24} className="text-secondary" />
              </div>
              <h1 className="text-2xl font-bold font-poppins text-slate-800">Student Portal Login</h1>
              <p className="text-slate-400 text-xs mt-1">Access schedules, scores, and assignments boards.</p>
            </div>

            <form onSubmit={handleSubmit(handleLogin)} className="space-y-4 text-xs sm:text-sm">
              <div className="space-y-1.5">
                <label className="block text-slate-600 font-semibold">Student Username *</label>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-3.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="e.g. student"
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
                    placeholder="e.g. student123"
                    {...register("password", { required: "Password is required" })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all"
                  />
                </div>
                {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
              </div>

              <button
                type="submit"
                disabled
                className="w-full bg-primary hover:bg-primary-light text-white font-bold py-3.5 rounded-lg transition-all cursor-pointer shadow-md hover:shadow-lg"
              >
                Enter Portal
              </button>
            </form>

            <div className="text-center text-[10px] text-slate-400 mt-4 border-t border-slate-100 pt-3">
              Credentials Tip: Username: <strong>student</strong> | Password: <strong>student123</strong>
            </div>
          </motion.div>
        </section>
      ) : (
        <section className="bg-slate-50 py-12 font-inter min-h-[75vh]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            {/* Header info */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              <div className="flex items-center space-x-4">
                <div className="bg-secondary text-slate-900 w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg shadow-inner font-poppins">
                  JT
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold font-poppins text-slate-800">{studentData.name}</h2>
                  <p className="text-slate-400 text-xs font-semibold">{studentData.grade} | Roll: {studentData.roll}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-slate-50 px-4 py-2 rounded-xl text-center border border-slate-200/60">
                  <span className="block text-[10px] text-slate-400 font-bold uppercase">Attendance</span>
                  <strong className="text-primary text-base">{studentData.attendance}</strong>
                </div>
                <div className="bg-slate-50 px-4 py-2 rounded-xl text-center border border-slate-200/60">
                  <span className="block text-[10px] text-slate-400 font-bold uppercase">Cumulative GPA</span>
                  <strong className="text-primary text-base">{studentData.gpa}</strong>
                </div>
                <button
                  onClick={() => setIsLoggedIn(false)}
                  className="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-xl font-bold text-xs uppercase self-center transition-colors cursor-pointer"
                >
                  Log out
                </button>
              </div>
            </div>

            {/* Dashboard content */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Daily Schedule */}
              <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                <h3 className="text-lg font-bold font-poppins text-slate-800 border-b border-slate-100 pb-3 flex items-center space-x-2">
                  <Calendar size={18} className="text-primary" />
                  <span>Today's Classes</span>
                </h3>
                <div className="space-y-4">
                  {studentData.schedule.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                      <div>
                        <span className="text-[10px] font-bold text-primary block">{item.time}</span>
                        <strong className="text-slate-800 text-sm mt-0.5 block font-poppins">{item.subject}</strong>
                      </div>
                      <span className="text-slate-400 bg-white border border-slate-200 px-2 py-0.5 rounded font-semibold shrink-0">
                        {item.room}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tasks & Assignments */}
              <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                <h3 className="text-lg font-bold font-poppins text-slate-800 border-b border-slate-100 pb-3 flex items-center space-x-2">
                  <FileText size={18} className="text-primary" />
                  <span>Assignments Pipeline</span>
                </h3>
                <div className="space-y-4">
                  {studentData.assignments.map((task, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <div>
                        <strong className="text-slate-800 text-sm font-poppins">{task.subject}</strong>
                        <p className="text-slate-400 mt-1">Deadline: {task.due}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full font-bold text-[10px] uppercase ${
                        task.status.startsWith('Graded')
                          ? 'bg-green-50 text-green-600 border border-green-200'
                          : 'bg-yellow-50 text-yellow-600 border border-yellow-200'
                      }`}>
                        {task.status}
                      </span>
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
