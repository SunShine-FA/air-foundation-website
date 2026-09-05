import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Layout
import MainLayout from '../layouts/MainLayout';

// Pages
import Home from '../pages/Home';
import AboutOverview from '../pages/About/AboutOverview';
import Vision from '../pages/About/Vision';
import Mission from '../pages/About/Mission';
import History from '../pages/About/History';
import Chairman from '../pages/About/Chairman';
import Principal from '../pages/About/Principal';
import VicePrincipal from '../pages/About/VicePrincipal';
import Management from '../pages/About/Management';
import AcademicsOverview from '../pages/Academics/AcademicsOverview';
import Faculty from '../pages/Academics/Faculty';
import Departments from '../pages/Academics/Departments';
import AdmissionsInfo from '../pages/Admissions/AdmissionsInfo';
import Fees from '../pages/Admissions/Fees';
import Scholarships from '../pages/Admissions/Scholarships';
import Facilities from '../pages/Facilities';
import Gallery from '../pages/Gallery';
import News from '../pages/News';
import Events from '../pages/Events';
import Downloads from '../pages/Downloads';
import Results from '../pages/Results';
import Careers from '../pages/Careers';
import FAQs from '../pages/FAQs';
import Contact from '../pages/Contact';
import StudentPortal from '../pages/Portals/StudentPortal';
import ParentPortal from '../pages/Portals/ParentPortal';
import AdminPortal from '../pages/Admin/AdminPortal';
import NotFound from '../pages/NotFound';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Standalone Pages wrapped with MainLayout */}
      <Route path="/" element={<MainLayout><Home /></MainLayout>} />
      
      {/* About sub-routes */}
      <Route path="/about" element={<MainLayout><AboutOverview /></MainLayout>} />
      <Route path="/about/vision" element={<MainLayout><Vision /></MainLayout>} />
      <Route path="/about/mission" element={<MainLayout><Mission /></MainLayout>} />
      <Route path="/about/history" element={<MainLayout><History /></MainLayout>} />
      <Route path="/about/chairman" element={<MainLayout><Chairman /></MainLayout>} />
      <Route path="/about/principal" element={<MainLayout><Principal /></MainLayout>} />
      <Route path="/about/vice-principal" element={<MainLayout><VicePrincipal /></MainLayout>} />
      <Route path="/about/management" element={<MainLayout><Management /></MainLayout>} />
      
      {/* Academics sub-routes */}
      <Route path="/academics" element={<MainLayout><AcademicsOverview /></MainLayout>} />
      <Route path="/academics/faculty" element={<MainLayout><Faculty /></MainLayout>} />
      <Route path="/academics/departments" element={<MainLayout><Departments /></MainLayout>} />
      
      {/* Admissions sub-routes */}
      <Route path="/admissions" element={<MainLayout><AdmissionsInfo /></MainLayout>} />
      <Route path="/admissions/fees" element={<MainLayout><Fees /></MainLayout>} />
      <Route path="/admissions/scholarships" element={<MainLayout><Scholarships /></MainLayout>} />
      
      {/* Media and life standalone */}
      <Route path="/facilities" element={<MainLayout><Facilities /></MainLayout>} />
      <Route path="/gallery" element={<MainLayout><Gallery /></MainLayout>} />
      <Route path="/news" element={<MainLayout><News /></MainLayout>} />
      <Route path="/events" element={<MainLayout><Events /></MainLayout>} />
      <Route path="/downloads" element={<MainLayout><Downloads /></MainLayout>} />
      <Route path="/results" element={<MainLayout><Results /></MainLayout>} />
      <Route path="/careers" element={<MainLayout><Careers /></MainLayout>} />
      <Route path="/faqs" element={<MainLayout><FAQs /></MainLayout>} />
      <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />
      
      {/* Portals sub-routes */}
      <Route path="/portal/student" element={<MainLayout><StudentPortal /></MainLayout>} />
      <Route path="/portal/parent" element={<MainLayout><ParentPortal /></MainLayout>} />
      
      {/* Protected Admin Management Portal (Access by typing /admin-portal in address bar) */}
      <Route path="/admin-portal" element={<AdminPortal />} />

      {/* Fallback 404 */}
      <Route path="*" element={<MainLayout><NotFound /></MainLayout>} />
    </Routes>
  );
}
