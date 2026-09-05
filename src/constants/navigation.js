export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  {
    name: 'About Us',
    dropdown: [
      { name: 'Overview', path: '/about' },
      { name: 'Vision', path: '/about/vision' },
      { name: 'Mission', path: '/about/mission' },
      { name: 'History', path: '/about/history' },
      { name: 'Managing Director\'s Message', path: '/about/chairman' },
      { name: 'Principal\'s Message', path: '/about/principal' },
      { name: 'Vice Principal\'s Message', path: '/about/vice-principal' },
      { name: 'Management Desk', path: '/about/management' },
    ]
  },
  {
    name: 'Academics',
    dropdown: [
      { name: 'Overview', path: '/academics' },
      { name: 'Our Faculty', path: '/academics/faculty' },
      { name: 'Departments', path: '/academics/departments' },
      { name: 'Downloads', path: '/downloads' },
      { name: 'Results', path: '/results' },
    ]
  },
  {
    name: 'Admissions',
    dropdown: [
      { name: 'Admission Info', path: '/admissions' },
      { name: 'Fee Structure', path: '/admissions/fees' },
      { name: 'Scholarships', path: '/admissions/scholarships' },
    ]
  },
  { name: 'Facilities', path: '/facilities' },
  { name: 'Gallery', path: '/gallery' },
  {
    name: 'Media & Life',
    dropdown: [
      { name: 'Latest News', path: '/news' },
      { name: 'Upcoming Events', path: '/events' },
      { name: 'Careers', path: '/careers' },
      { name: 'FAQs', path: '/faqs' },
    ]
  },
  { name: 'Contact', path: '/contact' }
];

export const PORTAL_LINKS = [
  { name: 'Student Portal', path: '/portal/student', color: 'bg-primary hover:bg-primary-dark text-white' },
  { name: 'Parent Portal', path: '/portal/parent', color: 'bg-secondary hover:bg-secondary-dark text-slate-900' }
];
