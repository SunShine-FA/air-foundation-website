// Premium School & College Website Mock Data

import mamAyesha from '../assets/Mam Ayesha.jpg';
import mamFarah from '../assets/Mam Farah.jpg';
import mamFarhat from '../assets/Mam Farhat.jpg';
import mamKainat from '../assets/Mam Kainat.jpg';
import mamMahnoor from '../assets/Mam Mahnoor.jpg';
import mamNamra from '../assets/Mam Namra.jpg';
import mamNelofar from '../assets/Mam Nelofar.jpg';
import mamRafeena from '../assets/Mam Rafeena.jpg';
import mamSaira from '../assets/Mam Saira.jpg';
import mamSana from '../assets/Mam Sana.jpg';
import mamSeema from '../assets/Mam Seema.jpg';
import mamSehrish from '../assets/Mam Sehrish.jpg';
import mamZainab from '../assets/Mam Zainab.jpg';
import mamZopash from '../assets/Mam Zopash.jpg';
import sirFaseeh from '../assets/Sir Faseeh.webp';
import sirIqbal from '../assets/Sir Iqbal.jpg';
import sirMouavia from '../assets/Sir Mouavia.jpg';
import sirUsman from '../assets/Sir Usman.jpg';
import sirZaki from '../assets/Sir Zaki.jpg';
import drAmir from '../assets/Dr Amir.jpg';
import mavatar from '../assets/mavatar.png';
import favatar from '../assets/favatar.png';
import vp from '../assets/VP.png';
import nc from '../assets/nc.jpg';
import fbise from '../assets/fbise.jpg';
import prep from '../assets/prep.avif';
import college from '../assets/college.avif';
import pImg from '../assets/P.jpeg';
import cmImg from '../assets/CM.jpeg';




export const STATS = [
  { id: 'stat-1', value: 700, suffix: '+', label: 'Students Enrolled', sort_order: 1 },
  { id: 'stat-2', value: 50, suffix: '+', label: 'Expert Faculty', sort_order: 2 },
  { id: 'stat-3', value: 100, suffix: '%', label: 'Success Rate', sort_order: 3 },
  { id: 'stat-4', value: 45, suffix: '+', label: 'Extracurricular Clubs', sort_order: 4 },
];

export const WHY_CHOOSE_US = [
  {
    title: 'Academic Excellence',
    description: 'We consistently rank among the top institutions with outstanding exam results.',
    icon: 'Award'
  },
  {
    title: 'Holistic Development',
    description: 'Our robust curriculum balances academics with visual/performing arts, athletics, and technology.',
    icon: 'TrendingUp'
  },
  {
    title: 'Global Infrastructure',
    description: 'State-of-the-art smart classrooms, science labs, and sports ground.',
    icon: 'Globe'
  },
  {
    title: 'Eminent Faculty',
    description: 'All of our academic staff hold advanced degrees and are leaders in pedagogical innovation.',
    icon: 'Users'
  }
];

export const PROGRAMS = [
  {
    id: 'pre',
    title: 'Pre Classes (P.G, Nursery & K.G)',
    description: 'Provides a nurturing and engaging environment where young children develop early literacy, numeracy, communication, social, emotional, and motor skills through play-based learning, creative activities, storytelling, basic concepts, and age-appropriate classroom experiences.',
    image: prep,
    curriculum: 'Air Foundation\'s Own Designed Curriculum'
  },
  {
    id: 'primary',
    title: 'Primary School (Grade 1 - 5)',
    description: 'Focuses on developing strong foundations in English, Urdu, Mathematics, General Knowledge, Science, Islamiat, and basic computer skills through activity-based and student-centered learning.',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800',
    curriculum: 'National Curriculum (NC)'
  },
  {
    id: 'middle',
    title: 'Middle School (Grade 6 - 8)',
    description: 'Builds students’ academic and analytical skills through Mathematics, Science, English, Urdu, Islamiat, History, Geography, Computer Science, and other curriculum subjects, preparing them for secondary-level education.',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800',
    curriculum: 'Federal Board of Intermediate and Secondary Education'
  },
  {
    id: 'senior',
    title: 'High School (Grade 9 - 10)',
    description: 'Provides comprehensive preparation for SSC/Matric examinations under the Federal Board (FBISE), with students studying compulsory subjects alongside specialized Science or Computer Science subjects according to their chosen group.',
    image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=800',
    curriculum: 'Federal Board of Intermediate and Secondary Education (Biology & Computer Science)'
  },
  {
    id: 'college',
    title: 'College (Grade 11 - 12)',
    description: 'Offers HSSC/Intermediate programs under FBISE, including Pre-Medical, Pre-Engineering,  ICS, and FA (IT) with focused subject-based education, examination preparation, practical learning, and preparation for university admission.',
    image: college,
    curriculum: 'Federal Board of Intermediate and Secondary Education (Pre-Medical, Pre-Engineering & ICS)'
  }
];

export const DEPARTMENTS = [
  {
    name: 'Computer Science & AI',
    description: 'Developing students’ digital literacy, programming, web development, computational thinking, and foundational Artificial Intelligence skills through practical and project-based learning.',
    head: 'Sir Faseeh Ur Rehman',
    labs: ['Computer Science Lab']
  },
  {
    name: 'Chemistry',
    description: 'Developing an understanding of matter, chemical reactions, atomic structure, organic and inorganic chemistry, and laboratory techniques through theoretical and practical learning.',
    head: 'Ma\'am Zopash Imran',
    labs: ['Chemistry Lab']
  },
  {
    name: 'Biology',
    description: 'Exploring living organisms, cell biology, genetics, human physiology, ecology, and biodiversity while developing scientific observation and practical laboratory skills.',
    head: 'Sir Mouavia',
    labs: ['Biology Lab']
  },
  {
    name: 'Physics',
    description: 'Building a strong understanding of motion, force, energy, electricity, waves, light, and modern physics through conceptual learning, problem-solving, and practical experiments.',
    head: 'Sir Zaki',
    labs: ['Physics Lab']
  },
  {
    name: 'Mathematics',
    description: 'Fostering logical reasoning, numerical skills, algebraic thinking, geometry, trigonometry, statistics, and quantitative problem-solving across different levels of education.',
    head: 'Sir Usman',
    labs: []
  },
  {
    name: 'Islamiyat & Translation of Quran',
    description: 'Developing students’ understanding of Islamic teachings, Quranic guidance, Seerah, Hadith, Islamic history, ethics, and the translation and comprehension of selected Quranic verses.',
    head: 'Sir Syed Hassaan',
    labs: []
  },
  {
    name: 'Pakistan Studies',
    description: 'Exploring the history, geography, culture, constitutional development, political system, economy, and national identity of Pakistan while promoting responsible citizenship.',
    head: 'Mam Bushra Abid',
    labs: []
  },
  {
    name: 'Urdu Languages & Literature',
    description: 'Strengthening Urdu language proficiency through grammar, comprehension, creative writing, poetry, prose, literary analysis, communication, and appreciation of Urdu literature.',
    head: 'Ma\'am Farhat Iqbal',
    labs: []
  },
  {
    name: 'English Languages & Literature',
    description: 'Developing English language proficiency through grammar, reading comprehension, vocabulary, creative and academic writing, communication skills, and the study of English literature.',
    head: 'Sir Abuzar',
    labs: []
  }
];

export const FACULTY = [
  {
    name: "Ma'am Farhat Iqbal",
    role: "Senior Urdu Educator & Head of Languages",
    qualification: "M.A Urdu",
    image: mamFarhat,
    experience: "8 Years Teaching Experience",
    email: "farhatiqbal131987@gmail.com"
  },
  {
    name: "Ma'am Namra Samar",
    role: "Commerce & Economics Educator",
    qualification: "B.Com",
    image: mamNamra,
    experience: "5 Years Teaching Experience",
    email: "namra.samar@gmail.com"
  },
  {
    name: "Ma'am Rana Shahzadi",
    role: "Primary Section Educator",
    qualification: "F.A, Early Childhood Certification",
    image: favatar,
    experience: "4 Years Teaching Experience",
    email: "Shahzadirana95@gmail.com"
  },
  {
    name: "Ma'am Sabaria Kiran",
    role: "Science & General Knowledge Educator",
    qualification: "B.Sc General Science",
    image: favatar,
    experience: "5 Years Teaching Experience",
    email: "sabariakiran27@gmail.com"
  },
  {
    name: "Ma'am Rafeena Faisal",
    role: "Islamic Studies & Ethics Educator",
    qualification: "M.A Islamiyat",
    image: mamRafeena,
    experience: "7 Years Teaching Experience",
    email: "rafinafaisal1314@gmail.com"
  },
  {
    name: "Ma'am Sehrish Ijaz",
    role: "Senior Physics Lecturer",
    qualification: "M.Sc Physics",
    image: mamSehrish,
    experience: "6 Years Teaching Experience",
    email: "sehrishijaz91@gmail.com"
  },
  {
    name: "Ma'am Salma Zafar",
    role: "Humanities & Social Sciences Teacher",
    qualification: "B.A",
    image: favatar,
    experience: "6 Years Teaching Experience",
    email: "salmazafar.2006@gmail.com"
  },
  {
    name: "Sir Faseeh Ur Rehman",
    role: "Computer Science & IT Coordinator",
    qualification: "BS Software Engineer",
    image: sirFaseeh,
    experience: "5 Years Industry & Academic Experience",
    email: "maliksfaseeh663@gmail.com"
  },
  {
    name: "Ma'am Kainat Arshad",
    role: "Business Studies & Management Educator",
    qualification: "BBA (Bachelor of Business Administration)",
    image: mamKainat,
    experience: "4 Years Teaching Experience",
    email: "kainatmahmood84@gmail.com"
  },
  {
    name: "Sir Ameer Muayia",
    role: "Biology & Health Sciences Instructor",
    qualification: "Pharm D (Doctor of Pharmacy)",
    image: sirMouavia,
    experience: "5 Years Clinical & Academic Experience",
    email: "moaviayaseen@gmail.com"
  },
  {
    name: "Sir Muhammad Abuzar",
    role: "Mathematics & Logic Teacher",
    qualification: "B.Sc Mathematics & Computing",
    image: mavatar,
    experience: "4 Years Teaching Experience",
    email: "muhammadabuzar@gmail.com"
  },
  {
    name: "Ma'am Sidra Tul Montaha",
    role: "English Literature Educator",
    qualification: "M.A English Literature",
    image: favatar,
    experience: "6 Years Teaching Experience",
    email: "smontaha85@gmail.com"
  },
  {
    name: "Ma'am Shazia Mehmood",
    role: "Senior Pedagogy & Primary Teacher",
    qualification: "B.A, B.Ed",
    image: favatar,
    experience: "9 Years Teaching Experience",
    email: "Shaziaali407@gmail.com"
  },
  {
    name: "Ma'am Rabia Riaz",
    role: "Accounts & Commerce Educator",
    qualification: "B.Com",
    image: favatar,
    experience: "5 Years Teaching Experience",
    email: "rabiarahman301@gmail.com"
  },
  {
    name: "Ma'am Anum Nadeem",
    role: "Mass Communication & Arts Teacher",
    qualification: "B.S Mass Communication",
    image: favatar,
    experience: "4 Years Teaching Experience",
    email: "anumafss@gmail.com"
  },
  {
    name: "Ma'am Nelofar Zahid",
    role: "General Education & Social Studies Teacher",
    qualification: "B.A",
    image: mamNelofar,
    experience: "6 Years Teaching Experience",
    email: "Mmnoor406@gmail.com"
  },
  {
    name: "Ma'am Nadia Manzoor",
    role: "Business Administration & Marketing Lecturer",
    qualification: "MBA (Marketing & Finance)",
    image: favatar,
    experience: "10 Years Academic Leadership",
    email: "dia.manzoor@yahoo.com"
  },
  {
    name: "Sir Muhammad Usman",
    role: "Head of Mathematics Department",
    qualification: "M.Sc Mathematics",
    image: sirUsman,
    experience: "8 Years Teaching Experience",
    email: "muhammad1l4637@gmail.com"
  },
  {
    name: "Ma'am Sana Ayesha Ghuman",
    role: "Educational Management & Finance Specialist",
    qualification: "M.Edu, MSc in Islamic Banking And Finance",
    image: mamSana,
    experience: "7 Years Academic Experience",
    email: "sanaaesha@gmail.com"
  },
  {
    name: "Ma'am Saira Firdous",
    role: "Senior Mathematics & Pedagogy Teacher",
    qualification: "M.Sc Maths, M.A Edu",
    image: mamSaira,
    experience: "8 Years Teaching Experience",
    email: "atiftahir786@yahoo.com"
  },
  {
    name: "Ma'am Laraib Khan",
    role: "Junior School Educator",
    qualification: "B.A English & Social Sciences",
    image: favatar,
    experience: "3 Years Teaching Experience",
    email: "klaraib158@gmail.com"
  },
  {
    name: "Sir Muhammad Zaki",
    role: "Physics Laboratory & Science Instructor",
    qualification: "B.Sc Physics",
    image: sirZaki,
    experience: "7 Years Academic Experience",
    email: "zaki9790@gmail.com"
  },
  {
    name: "Ma'am Sabahat Jalil",
    role: "Curriculum & Educational Management Teacher",
    qualification: "M.A Education",
    image: favatar,
    experience: "6 Years Teaching Experience",
    email: "sabahatusman89@gmail.com"
  },
  {
    name: "Ma'am Zopash Imran",
    role: "Chemistry Educator & Lab In-charge",
    qualification: "B.S Chemistry",
    image: mamZopash,
    experience: "5 Years Teaching Experience",
    email: "ruposh842003@gmail.com"
  },
  {
    name: "Ma'am Ayesha Saba Imran",
    role: "Primary Head & Education Specialist",
    qualification: "B.A, B.Ed",
    image: mamAyesha,
    experience: "9 Years Academic Leadership",
    email: "ayeshaimran8519@gmail.com"
  },
  {
    name: "Ma'am Zahra Manzoor",
    role: "Urdu & Islamic History Educator",
    qualification: "M.A Urdu Literature",
    image: favatar,
    experience: "5 Years Teaching Experience",
    email: "manzoorzahra87@gmail.com"
  },
  {
    name: "Ma'am Mahnoor Fatima",
    role: "Urdu Language Specialist",
    qualification: "M.A Urdu",
    image: mamMahnoor,
    experience: "4 Years Teaching Experience",
    email: "mahnoorfatima401@gmail.com"
  },
  {
    name: "Ma'am Aqsa Aziz",
    role: "Botany & General Science Teacher",
    qualification: "B.Sc Biological Sciences",
    image: favatar,
    experience: "4 Years Teaching Experience",
    email: "aqsaaziz400@gmail.com"
  },
  {
    name: "Ma'am Razia Shahzadi",
    role: "Educational Counselor & Master Trainer",
    qualification: "M.Ed (Master of Education)",
    image: favatar,
    experience: "8 Years Teaching Experience",
    email: "raziabilal776@gmail.com"
  },
  {
    name: "Ma'am Bushra Abid",
    role: "Senior Academic Coordinator & Master Educator",
    qualification: "M.A Education",
    image: vp,
    experience: "10 Years Academic Experience",
    email: "bushraabbasi3@gmail.com"
  },
  {
    name: "Ma'am Huma Khalid",
    role: "Science & Environmental Studies Teacher",
    qualification: "B.Sc",
    image: favatar,
    experience: "5 Years Teaching Experience",
    email: "humaazmat01@gmail.com"
  },
  {
    name: "Ma'am Romana Shakeel",
    role: "Social Sciences Educator",
    qualification: "M.A Political Science & History",
    image: favatar,
    experience: "6 Years Teaching Experience",
    email: "Romashakeel18@gmail.com"
  },
  {
    name: "Ma'am Zainab",
    role: "Head of English Department",
    qualification: "M.A English",
    image: mamZainab,
    experience: "7 Years Teaching Experience",
    email: "zainab@airfoundation.edu.pk"
  },
  {
    name: "Ma'am Seema",
    role: "Biochemistry & Life Sciences Teacher",
    qualification: "B.S Bio Chemistry",
    image: mamSeema,
    experience: "6 Years Teaching Experience",
    email: "seema@airfoundation.edu.pk"
  },
  {
    name: "Ma'am Farah",
    role: "Senior Biochemist & Science Educator",
    qualification: "M.Phil Bio Chemistry",
    image: mamFarah,
    experience: "8 Years Academic & Research Experience",
    email: "farah@airfoundation.edu.pk"
  },
  {
    name: "Ma'am Nabila",
    role: "Academic Counselor & Master Educator",
    qualification: "M.Edu",
    image: pImg,
    experience: "7 Years Educational Leadership",
    email: "nabila@airfoundation.edu.pk"
  },
  {
    name: "Ma'am Gulshan Bashir",
    role: "Student Counselor & Behavioral Psychologist",
    qualification: "BS Psychology",
    image: favatar,
    experience: "5 Years Counseling Experience",
    email: "gulshan.bashir@airfoundation.edu.pk"
  },
  {
    name: "Ma'am Wajiha",
    role: "Financial Accounting & Commerce Teacher",
    qualification: "BS Accounting & Finance",
    image: favatar,
    experience: "4 Years Teaching Experience",
    email: "wajiha@airfoundation.edu.pk"
  },
  {
    name: "Ma'am Sundas",
    role: "English Language & Grammar Specialist",
    qualification: "M.A English",
    image: favatar,
    experience: "6 Years Teaching Experience",
    email: "sundas@airfoundation.edu.pk"
  },
  {
    name: "Ma'am Hira Iftikhar",
    role: "English Communication & Linguistics Teacher",
    qualification: "BS English",
    image: favatar,
    experience: "4 Years Teaching Experience",
    email: "hira.iftikhar@airfoundation.edu.pk"
  },
  {
    name: "Ma'am Aneela",
    role: "Islamic Studies & Moral Philosophy Teacher",
    qualification: "M.A Islamic Studies",
    image: favatar,
    experience: "7 Years Teaching Experience",
    email: "aneela@airfoundation.edu.pk"
  },
  {
    name: "Ma'am Amna",
    role: "Commerce & Banking Educator",
    qualification: "M.Com",
    image: favatar,
    experience: "5 Years Teaching Experience",
    email: "amna@airfoundation.edu.pk"
  },
  {
    name: "Ma'am Amara",
    role: "Physics & Science Educator",
    qualification: "M.Sc Physics",
    image: favatar,
    experience: "6 Years Teaching Experience",
    email: "amara@airfoundation.edu.pk"
  },
  {
    name: "Dr. Amir",
    role: "Senior Academic Advisor & Physics Research Fellow",
    qualification: "Ph.D. in Physics & Educational Leadership",
    image: drAmir,
    experience: "15 Years Academic Leadership",
    email: "dr.amir@airfoundation.edu.pk"
  },
  {
    name: "Sir Iqbal",
    role: "Senior Chemistry Faculty & Academic Supervisor",
    qualification: "M.Sc Organic Chemistry",
    image: sirIqbal,
    experience: "14 Years Teaching Experience",
    email: "iqbal@airfoundation.edu.pk"
  }
];

export const FACILITIES = [
  {
    title: 'Smart Classrooms',
    description: 'Air-conditioned classrooms with white boards and ergonomic seating.',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'Science Lab',
    description: 'Lab for Computer, Physics, Chemistry, and Biology/Biotechnology stocked with instruments.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'Sports Ground',
    description: 'Featuring a sports ground for the students to participate in the physical activities',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=800'
  },
];

export const ADMISSION_TIMELINE = [
  {
    step: '1',
    title: 'Application',
    description: 'Submit parent and student details along with previous academic transcripts by visiting the campus.'
  },
  {
    step: '2',
    title: 'Campus Tour & Interaction',
    description: 'Shortlisted applicants are invited with parents for a structured tour and interaction with the academic counselors.'
  },
  {
    step: '3',
    title: 'Admission Assessment',
    description: 'Age-appropriate written assessment testing English, Logical Reasoning, and Mathematics competencies.'
  },
  {
    step: '4',
    title: 'Final Offer & Enrollment',
    description: 'Final merit list is published. Secure admission by paying the enrollment and academic term fees.'
  }
];

export const NEWS = [
  {
    id: 1,
    title: 'National Robofest Championship 2026: Our Students Clinch Gold',
    category: 'Achievement',
    date: 'June 28, 2026',
    excerpt: 'The high school robotics team beat 120 regional teams to claim the national trophy with their AI-guided autonomous recycling robot.',
    image: 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 2,
    title: 'Annual STEM and Arts Conclave Hosted by Ivy League Delegates',
    category: 'Event',
    date: 'June 15, 2026',
    excerpt: 'Over 500 scholars and visual artists gathered for the 3-day symposia exploring the intersection of technology and creative arts.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 3,
    title: 'Global School Exchange Program with Munich School of Sciences',
    category: 'Academics',
    date: 'May 20, 2026',
    excerpt: '15 of our senior college students have been selected for the fully funded 4-week exchange term starting in September.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800'
  }
];

export const EVENTS = [
  {
    id: '864b3baa-780a-4215-88cb-d018a4cbce7d',
    title: 'Annual Sports Meet & Athletic Championship',
    date: 'July 18, 2026',
    time: '08:00 AM - 04:00 PM',
    location: 'Main Sports Complex',
    description: 'Join us for a display of true athleticism and track matches featuring special guests from the National Olympic Committee.',
    sort_order: 1
  },
  {
    id: 'f2cd4fce-5e66-497a-a0be-be52350ee962',
    title: 'Parent-Teacher Consultations (First Term)',
    date: 'August 02, 2026',
    time: '09:00 AM - 02:00 PM',
    location: 'Homeroom Classrooms',
    description: 'One-on-one evaluations for parents to discuss individual growth metrics, target areas, and student achievements.',
    sort_order: 2
  },
  {
    id: '2403c2ce-87eb-458a-bc95-ba32280ece4e',
    title: 'Grand Symphony Concert & Cultural Gala',
    date: 'August 15, 2026',
    time: '05:00 PM - 09:00 PM',
    location: 'Performing Arts Auditorium',
    description: 'A premium symphonic display by the school chamber orchestra and choir showcasing classics as well as modern musical medleys.',
    sort_order: 3
  }
];

export const TESTIMONIALS = [
  {
    id: 'test-1',
    quote: 'We are truly grateful to the school for providing a safe, caring, and inspiring learning environment. The teachers are dedicated, approachable, and always encourage students to achieve their full potential. We have seen remarkable growth in our child\'s confidence and academic performance.',
    author: 'Mr Faisal Iqbal',
    relation: 'Father of Student Class 10',
    image: mavatar,
    sort_order: 1
  },
  {
    id: 'test-2',
    quote: 'This institution focuses not only on academic excellence but also on character building, discipline, and moral values. The management keeps parents informed, and we always feel involved in our child\'s educational journey.',
    author: 'Mr Saqib Manzoor',
    relation: 'Father of Student Class 8',
    image: mavatar,
    sort_order: 2
  },
  {
    id: 'test-3',
    quote: 'The teachers genuinely care about every student and provide individual attention whenever needed. My child enjoys coming to school every day, which speaks volumes about the positive atmosphere on campus.',
    author: 'Mrs Naveed',
    relation: 'Mother of Student Class 9',
    image: favatar,
    sort_order: 3
  },
  {
    id: 'test-4',
    quote: 'Excellent faculty, modern teaching methods, and a strong emphasis on co-curricular activities have helped my child become more confident, responsible, and independent. I highly recommend this school to every parent.',
    author: 'Mr Hassan',
    relation: 'Father of Student Class 9',
    image: mavatar,
    sort_order: 4
  },
  {
    id: 'test-5',
    quote: 'We appreciate the school\'s commitment to academic excellence, discipline, and effective communication with parents. The staff is supportive, and the leadership ensures a nurturing environment where every child can succeed.',
    author: 'Ms Fouzia',
    relation: 'Mother of Student Class 9',
    image: favatar,
    sort_order: 5
  },
  {
    id: 'test-6',
    quote: 'Choosing this school for our child has been one of the best decisions we have made. We are impressed by the professionalism of the teachers, the caring environment, and the opportunities provided for students to excel in every aspect of life.',
    author: 'Mr Masood',
    relation: 'Father of Student 2nd Year',
    image: mavatar,
    sort_order: 6
  }
];

export const DOWNLOADS = [
  { id: 'down-1', title: 'Academic Calendar (Academic Year 2026-27)', size: '84 KB', format: 'PDF', file_url: 'https://gjfszbhnxxctqjsuzlag.supabase.co/storage/v1/object/public/media/assets/pdfs/Air%20Foundation%20Academic%20Calendar%202026_2027.pdf', sort_order: 1 },
  { id: 'down-2', title: 'Admissions Prospectus & Guidelines', size: '1.4 MB', format: 'PDF', file_url: 'https://gjfszbhnxxctqjsuzlag.supabase.co/storage/v1/object/public/media/assets/pdfs/Air%20Foundation%20College%20Prospectus.pdf', sort_order: 2 },
  { id: 'down-3', title: 'Taha Shaheed Campus Fee Structure', size: '68 KB', format: 'PDF', file_url: 'https://gjfszbhnxxctqjsuzlag.supabase.co/storage/v1/object/public/media/assets/pdfs/Air%20Foundation%20Taha%20Shaheed%20Campus%20Fee%20Structure.pdf', sort_order: 3 },
  { id: 'down-4', title: 'School Admission Form Full', size: '243 KB', format: 'PDF', file_url: 'https://gjfszbhnxxctqjsuzlag.supabase.co/storage/v1/object/public/media/assets/pdfs/School%20Admision%20Form%20Full.pdf', sort_order: 4 },
  { id: 'down-5', title: 'Rules and Regulations Handbook', size: '469 KB', format: 'PDF', file_url: 'https://gjfszbhnxxctqjsuzlag.supabase.co/storage/v1/object/public/media/assets/pdfs/Rules%20and%20Regulations.pdf', sort_order: 5 },
  { id: 'down-6', title: 'Upcoming Activities Calendar (2026-2027)', size: '450 KB', format: 'PDF', file_url: 'https://gjfszbhnxxctqjsuzlag.supabase.co/storage/v1/object/public/media/assets/pdfs/upcoming%20activities%20for%20the%20year%202026-2027.pdf', sort_order: 6 },
];

export const RESULTS = [
  {
    id: 'bfcd585f-248e-4808-b805-b59e95ed643a',
    year: '2026',
    examination: 'Grade 10 (FBISE)',
    student_name: 'Anshra Khan',
    score: '1003',
    percentage: '91.18%',
    image: 'https://gjfszbhnxxctqjsuzlag.supabase.co/storage/v1/object/public/media/portal_uploads/1788030626744_Anshara_png.png',
    toppers: 'Anshra Khan (91.18%)',
    passing_percentage: '100%',
    passingPercentage: '100%',
    distinctions: '91.18%',
    sort_order: 1
  },
  {
    id: '4ecd2f45-7cd8-4ac0-b7a8-c198058ad463',
    year: '2026',
    examination: 'Grade 10 (FBISE)',
    student_name: 'Aneesha Nouman',
    score: '978',
    percentage: '88.91%',
    image: 'https://gjfszbhnxxctqjsuzlag.supabase.co/storage/v1/object/public/media/portal_uploads/1788030670604_Aneesha_jpeg.jpeg',
    toppers: 'Aneesha Nouman (88.91%)',
    passing_percentage: '100%',
    passingPercentage: '100%',
    distinctions: '88.91%',
    sort_order: 2
  },
  {
    id: 'f037e315-6306-498e-8360-c8afe764f0cf',
    year: '2026',
    examination: 'Grade 10 (FBISE)',
    student_name: 'Khadija Fatima',
    score: '975',
    percentage: '88.64%',
    image: 'https://gjfszbhnxxctqjsuzlag.supabase.co/storage/v1/object/public/media/portal_uploads/1788030807189_Khadija_png.png',
    toppers: 'Khadija Fatima (88.64%)',
    passing_percentage: '100%',
    passingPercentage: '100%',
    distinctions: '88.64%',
    sort_order: 3
  },
  {
    id: '5ed5b1c7-2a96-4ae5-ad7d-224b08b36acc',
    year: '2026',
    examination: 'Grade 10 (FBISE)',
    student_name: 'Muhammad Usman',
    score: '951',
    percentage: '86.45%',
    image: 'https://gjfszbhnxxctqjsuzlag.supabase.co/storage/v1/object/public/media/portal_uploads/1788030908570_Usman_png.png',
    toppers: 'Muhammad Usman (86.45%)',
    passing_percentage: '100%',
    passingPercentage: '100%',
    distinctions: '86.45%',
    sort_order: 4
  },
  {
    id: 'c86e01ff-40c0-4268-a1a9-150e2761c832',
    year: '2026',
    examination: 'Grade 10 (FBISE)',
    student_name: 'Muhammad Tasbeel',
    score: '887',
    percentage: '80.64%',
    image: 'https://gjfszbhnxxctqjsuzlag.supabase.co/storage/v1/object/public/media/portal_uploads/1788031011661_Tasbeel_png.png',
    toppers: 'Muhammad Tasbeel (80.64%)',
    passing_percentage: '100%',
    passingPercentage: '100%',
    distinctions: '80.64%',
    sort_order: 5
  },
  {
    id: '78bc47f4-ea6e-4156-af6d-d9fe094daf69',
    year: '2026',
    examination: 'Grade 10 (FBISE)',
    student_name: 'Muhammad Musa',
    score: '876',
    percentage: '79.64%',
    image: 'https://gjfszbhnxxctqjsuzlag.supabase.co/storage/v1/object/public/media/portal_uploads/1788031096827_Musa_png.png',
    toppers: 'Muhammad Musa (79.64%)',
    passing_percentage: '100%',
    passingPercentage: '100%',
    distinctions: '79.64%',
    sort_order: 6
  },
  {
    id: '7d263741-324e-4179-861b-7ec0b8c91468',
    year: '2026',
    examination: 'Grade 9 (FBISE)',
    student_name: 'Esha Shahid',
    score: '523',
    percentage: '94.23%',
    image: 'https://gjfszbhnxxctqjsuzlag.supabase.co/storage/v1/object/public/media/portal_uploads/1788031222151_Esha_jpeg.jpeg',
    toppers: 'Esha Shahid (94.23%)',
    passing_percentage: '100%',
    passingPercentage: '100%',
    distinctions: '94.23%',
    sort_order: 7
  },
  {
    id: '227d1dda-714f-4188-a7c5-ceeda47bb80d',
    year: '2026',
    examination: 'Grade 9 (FBISE)',
    student_name: 'Ayesha Bint e Faisal',
    score: '512',
    percentage: '92.25%',
    image: 'https://gjfszbhnxxctqjsuzlag.supabase.co/storage/v1/object/public/media/portal_uploads/1788031321240_Ayesha_jpeg.jpeg',
    toppers: 'Ayesha Bint e Faisal (92.25%)',
    passing_percentage: '100%',
    passingPercentage: '100%',
    distinctions: '92.25%',
    sort_order: 8
  },
  {
    id: '4bca50e7-0ba6-4ea5-80d4-c9713a0e0fcd',
    year: '2026',
    examination: 'Grade 9 (FBISE)',
    student_name: 'Syeda Aania Ali',
    score: '512',
    percentage: '92.25%',
    image: 'https://gjfszbhnxxctqjsuzlag.supabase.co/storage/v1/object/public/media/portal_uploads/1788031394800_Aania_jpeg.jpeg',
    toppers: 'Syeda Aania Ali (92.25%)',
    passing_percentage: '100%',
    passingPercentage: '100%',
    distinctions: '92.25%',
    sort_order: 9
  },
  {
    id: 'bb6699fc-55db-49ab-89e8-7372d7389740',
    year: '2026',
    examination: 'Grade 9 (FBISE)',
    student_name: 'Fiza Shoukat',
    score: '497',
    percentage: '89.55%',
    image: 'https://gjfszbhnxxctqjsuzlag.supabase.co/storage/v1/object/public/media/portal_uploads/1788031473730_Fiza_jpeg.jpeg',
    toppers: 'Fiza Shoukat (89.55%)',
    passing_percentage: '100%',
    passingPercentage: '100%',
    distinctions: '89.55%',
    sort_order: 10
  },
  {
    id: 'ae4905fa-6cb3-4d5b-afa0-4b80317d328c',
    year: '2026',
    examination: 'Grade 9 (FBISE)',
    student_name: 'Hamza Khan',
    score: '432',
    percentage: '77.84%',
    image: 'https://gjfszbhnxxctqjsuzlag.supabase.co/storage/v1/object/public/media/portal_uploads/1788031551839_Hamza_jpeg.jpeg',
    toppers: 'Hamza Khan (77.84%)',
    passing_percentage: '100%',
    passingPercentage: '100%',
    distinctions: '77.84%',
    sort_order: 11
  },
  {
    id: 'b4091d7f-b68f-43f8-8da6-94a57d324344',
    year: '2026',
    examination: 'Grade 9 (FBISE)',
    student_name: 'Muhammad Saad',
    score: '403',
    percentage: '72.61%',
    image: 'https://gjfszbhnxxctqjsuzlag.supabase.co/storage/v1/object/public/media/portal_uploads/1788031622721_Saad_jpeg.jpeg',
    toppers: 'Muhammad Saad (72.61%)',
    passing_percentage: '100%',
    passingPercentage: '100%',
    distinctions: '72.61%',
    sort_order: 12
  },
  {
    id: '4773ba9a-3e56-4802-93fc-111e0d6f42e3',
    year: '2026',
    examination: 'Grade 9 (FBISE)',
    student_name: 'Muhammad Affan',
    score: '396',
    percentage: '71.35%',
    image: 'https://gjfszbhnxxctqjsuzlag.supabase.co/storage/v1/object/public/media/portal_uploads/1788031687230_Affan_jpeg.jpeg',
    toppers: 'Muhammad Affan (71.35%)',
    passing_percentage: '100%',
    passingPercentage: '100%',
    distinctions: '71.35%',
    sort_order: 13
  },
  {
    id: 'c1111111-1111-4111-8111-111111111111',
    year: '2026',
    examination: '1st Year (11th FBISE)',
    student_name: 'Zainab Malik',
    score: '489 / 550',
    percentage: '88.91%',
    image: '',
    toppers: '1st Position (College HSSC-I)',
    passing_percentage: '100%',
    passingPercentage: '100%',
    distinctions: '90%+',
    sort_order: 14
  },
  {
    id: 'c2222222-2222-4222-8222-222222222222',
    year: '2026',
    examination: '1st Year (11th FBISE)',
    student_name: 'Syed Bilal Ahmed',
    score: '474 / 550',
    percentage: '86.18%',
    image: '',
    toppers: '2nd Position (College HSSC-I)',
    passing_percentage: '100%',
    passingPercentage: '100%',
    distinctions: '90%+',
    sort_order: 15
  },
  {
    id: 'c3333333-3333-4333-8333-333333333333',
    year: '2026',
    examination: '2nd Year (12th FBISE)',
    student_name: 'Muhammad Ahmad Raza',
    score: '982 / 1100',
    percentage: '89.27%',
    image: '',
    toppers: '1st Position (College HSSC-II)',
    passing_percentage: '100%',
    passingPercentage: '100%',
    distinctions: '92%+',
    sort_order: 16
  },
  {
    id: 'c4444444-4444-4444-8444-444444444444',
    year: '2026',
    examination: '2nd Year (12th FBISE)',
    student_name: 'Fatima Noor',
    score: '965 / 1100',
    percentage: '87.73%',
    image: '',
    toppers: '2nd Position (College HSSC-II)',
    passing_percentage: '100%',
    passingPercentage: '100%',
    distinctions: '92%+',
    sort_order: 17
  }
];

export const FAQS = [
  {
    id: 'faq-1',
    question: 'What is the teacher-to-student ratio at your school?',
    answer: 'We maintain an average teacher-to-student ratio of 1:12 across all sections. This ensures individual focus and customized learning plans for every pupil.',
    category: 'Academics',
    sort_order: 1
  },
  {
    id: 'faq-2',
    question: 'Are scholarship schemes available for meritorious students?',
    answer: 'Yes. We offer academic, athletic, and artistic scholarships. Merit-cum-means bursaries of up to 100% tuition waiver are awarded during admissions.',
    category: 'Admissions',
    sort_order: 2
  },
  {
    id: 'faq-3',
    question: 'Which educational boards is the school affiliated with?',
    answer: 'Our middle school uses Cambridge Secondary. High School is affiliated with both ICSE/ISC (National) and Cambridge IGCSE / International Baccalaureate (Global).',
    category: 'Academics',
    sort_order: 3
  },
  {
    id: 'faq-4',
    question: 'Do you offer transportation facilities across the city?',
    answer: 'We have a modern fleet of GPS-enabled school buses equipped with CCTV and trained female security staff, covering all major residential corridors in the city.',
    category: 'Facilities',
    sort_order: 4
  },
  {
    id: 'faq-5',
    question: 'What sports programs are offered?',
    answer: 'Students can specialize in Football, Basketball, Cricket, Lawn Tennis, Athletics, Swimming, Gymnastics, and Martial Arts under licensed professional coaches.',
    category: 'Activities',
    sort_order: 5
  }
];

export const CAREERS = [
  { id: 'car-1', title: 'PGT Computer Science (Python/AI)', department: 'Academics', type: 'Full-time', experience: '5+ Years', qualification: 'M.Tech / M.Sc in Computer Science', status: 'Open', sort_order: 1 },
  { id: 'car-2', title: 'Primary Homeroom Teacher (Grade 3)', department: 'Academics', type: 'Full-time', experience: '3+ Years', qualification: 'B.Ed with IPC/IB training', status: 'Open', sort_order: 2 },
  { id: 'car-3', title: 'High School Sports Coach (Lawn Tennis)', department: 'Athletics', type: 'Part-time', experience: '3+ Years', qualification: 'National player representation preferred', status: 'Open', sort_order: 3 },
  { id: 'car-4', title: 'Academic Coordinator', department: 'Administration', type: 'Full-time', experience: '8+ Years', qualification: 'M.Ed / Ph.D. with leadership experience', status: 'Open', sort_order: 4 }
];

export const PARTNERS = [
  { name: 'National Curriculum', logo: nc },
  { name: 'Federal Board of Intermediate and Secondary Education (FBISE)', logo: fbise },
];

export const GALLERY = [
  // Events Category
  {
    id: 'events-1',
    title: 'Parent Teacher Meeting (PTM)',
    category: 'Events',
    date: 'August 2026',
    description: 'One-on-one evaluations and collaborative counseling sessions between faculty and parents discussing student academic milestones and character development.',
    image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=1000',
    images: [
      'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1000'
    ],
    sort_order: 1
  },
  {
    id: 'events-2',
    title: 'All Pakistan Poetry & Bilingual Declamation Fest',
    category: 'Events',
    date: 'September 2026',
    description: 'Inter-campus Urdu poetry recitation, English declamation, and parliamentary debate contests showcasing student rhetoric and literary talent.',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=1000',
    images: [
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=1000'
    ],
    sort_order: 2
  },
  {
    id: 'events-3',
    title: 'Annual Science & Innovation Expo',
    category: 'Events',
    date: 'October 2026',
    description: 'A grand exhibition of scientific working models, green energy breakthroughs, chemistry demos, and biological research prepared by students.',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=1000',
    images: [
      'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&q=80&w=1000'
    ],
    sort_order: 3
  },

  // Sports Category
  {
    id: 'sports-1',
    title: 'Annual Sports Gala & Track Championship',
    category: 'Sports',
    date: 'July 2026',
    description: 'Track and sprint athletics, relay races, high-jump matches, and house trophy tournaments on the school championship field.',
    image: 'https://images.unsplash.com/photo-1526676001881-6a7eefb323b5?auto=format&fit=crop&q=80&w=1000',
    images: [
      'https://images.unsplash.com/photo-1526676001881-6a7eefb323b5?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=1000'
    ],
    sort_order: 4
  },
  {
    id: 'sports-2',
    title: 'Inter-Campus Cricket & Football Cup',
    category: 'Sports',
    date: 'August 2026',
    description: 'Thrilling inter-school fixtures, cricket league championships, penalty shootouts, and award ceremonies.',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=1000',
    images: [
      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=1000'
    ],
    sort_order: 5
  },

  // Tech Category
  {
    id: 'tech-1',
    title: 'Robotics Workshop & Supercomputing Studio',
    category: 'Tech',
    date: 'June 2026',
    description: 'Hands-on training in Python programming, Arduino robotics, smart sensors, and automated robotic arms in the STEM Innovation lab.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=1000',
    images: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1547482030-c6e8eb844788?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=1000'
    ],
    sort_order: 6
  },

  // Arts Category
  {
    id: 'arts-1',
    title: 'Fine Arts, Calligraphy & Cultural Gala',
    category: 'Arts',
    date: 'May 2026',
    description: 'Student oil paintings, Quranic calligraphy canvases, ceramic clay sculpting, and creative art galleries.',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=1000',
    images: [
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&q=80&w=1000'
    ],
    sort_order: 7
  },

  // Ceremonies Category
  {
    id: 'cerem-1',
    title: 'High School & College Graduation Ceremony',
    category: 'Ceremonies',
    date: 'May 2026',
    description: 'Annual convocation, valedictorian speeches, student council oath-taking, and gold medal presentations.',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000',
    images: [
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1000'
    ],
    sort_order: 8
  }
];

