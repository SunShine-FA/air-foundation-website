-- ==============================================================================
-- AIR FOUNDATION SCHOOL & COLLEGE (Taha Shaheed CAMPUS) - SUPABASE DATABASE SCHEMA
-- Project ID: gjfszbhnxxctqjsuzlag
-- Run this entire script in Supabase SQL Editor to initialize all tables,
-- Row Level Security (RLS) policies, storage bucket ('media'), and complete seed data.
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 0. CLEAN RESET PREVIOUS TABLES (PREVENTS SCHEMA MISMATCH)
-- ==============================================================================
DROP TABLE IF EXISTS public.site_settings CASCADE;
DROP TABLE IF EXISTS public.hero_banners CASCADE;
DROP TABLE IF EXISTS public.stats CASCADE;
DROP TABLE IF EXISTS public.leadership_messages CASCADE;
DROP TABLE IF EXISTS public.programs CASCADE;
DROP TABLE IF EXISTS public.faculty CASCADE;
DROP TABLE IF EXISTS public.departments CASCADE;
DROP TABLE IF EXISTS public.facilities CASCADE;
DROP TABLE IF EXISTS public.gallery CASCADE;
DROP TABLE IF EXISTS public.news CASCADE;
DROP TABLE IF EXISTS public.events CASCADE;
DROP TABLE IF EXISTS public.testimonials CASCADE;
DROP TABLE IF EXISTS public.downloads CASCADE;
DROP TABLE IF EXISTS public.results CASCADE;
DROP TABLE IF EXISTS public.careers CASCADE;
DROP TABLE IF EXISTS public.faqs CASCADE;
DROP TABLE IF EXISTS public.history_milestones CASCADE;
DROP TABLE IF EXISTS public.management_team CASCADE;
DROP TABLE IF EXISTS public.contact_submissions CASCADE;

-- ==============================================================================
-- 1. TABLE DEFINITIONS
-- ==============================================================================

-- 1.1 Site Settings & General Config
CREATE TABLE public.site_settings (
    id TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 1.2 Hero Banner & Virtual Campus Tour
CREATE TABLE public.hero_banners (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    badge_text TEXT,
    title TEXT NOT NULL,
    title_highlight TEXT,
    description TEXT NOT NULL,
    apply_button_text TEXT DEFAULT 'Apply Now',
    apply_button_link TEXT DEFAULT '/admissions',
    learn_button_text TEXT DEFAULT 'Learn More',
    learn_button_link TEXT DEFAULT '/about',
    background_image TEXT,
    video_url TEXT,
    video_thumbnail TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 1.3 Key Statistics Counters
CREATE TABLE public.stats (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    value NUMERIC NOT NULL,
    suffix TEXT DEFAULT '+',
    label TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 1.4 Leadership Messages (Managing Director, Principal, Vice Principal)
CREATE TABLE public.leadership_messages (
    id TEXT PRIMARY KEY, -- 'chairman', 'principal', 'vice_principal'
    title TEXT NOT NULL,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    campus TEXT,
    image TEXT,
    office_hours TEXT,
    email TEXT,
    quote TEXT,
    paragraphs JSONB NOT NULL DEFAULT '[]'::jsonb,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 1.5 Academic Programs
CREATE TABLE public.programs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    image TEXT,
    curriculum TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 1.6 Faculty & Teaching Staff
CREATE TABLE public.faculty (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    qualification TEXT NOT NULL,
    image TEXT,
    experience TEXT,
    email TEXT,
    department TEXT DEFAULT 'Academics',
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 1.7 Academic Departments & Labs
CREATE TABLE public.departments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    head TEXT NOT NULL,
    head_image TEXT,
    labs TEXT[] DEFAULT ARRAY[]::TEXT[],
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 1.8 Campus Facilities
CREATE TABLE public.facilities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    image TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 1.9 Media Gallery (Event Albums)
CREATE TABLE public.gallery (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    image TEXT NOT NULL,
    images TEXT[] DEFAULT ARRAY[]::TEXT[],
    description TEXT,
    date TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 1.10 News & Bulletins
CREATE TABLE public.news (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    date TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    image TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 1.11 Upcoming Events Calendar
CREATE TABLE public.events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    location TEXT NOT NULL,
    description TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 1.12 Parent & Student Testimonials
CREATE TABLE public.testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quote TEXT NOT NULL,
    author TEXT NOT NULL,
    relation TEXT NOT NULL,
    image TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 1.13 Academic Downloads & PDFs
CREATE TABLE public.downloads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    size TEXT NOT NULL,
    format TEXT DEFAULT 'PDF',
    file_url TEXT DEFAULT '#',
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 1.14 Examination Results & Toppers
CREATE TABLE public.results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    year TEXT NOT NULL,
    examination TEXT NOT NULL,
    student_name TEXT,
    score TEXT,
    percentage TEXT,
    image TEXT,
    toppers TEXT NOT NULL,
    passing_percentage TEXT NOT NULL,
    distinctions TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 1.15 Careers & Job Openings
CREATE TABLE public.careers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    department TEXT DEFAULT 'Academics',
    type TEXT DEFAULT 'Full-time',
    experience TEXT NOT NULL,
    qualification TEXT NOT NULL,
    status TEXT DEFAULT 'Open',
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 1.16 FAQs
CREATE TABLE public.faqs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category TEXT DEFAULT 'General',
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 1.17 History Milestones
CREATE TABLE public.history_milestones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    year TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 1.18 Management Board
CREATE TABLE public.management_team (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    bg TEXT,
    image TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
ALTER TABLE public.management_team ADD COLUMN IF NOT EXISTS image TEXT;

-- 1.19 Contact Submissions (From website visitors)
CREATE TABLE public.contact_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'Unread',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- 2. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hero_banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leadership_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faculty ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.facilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.careers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.history_milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.management_team ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

DO $$ 
DECLARE
    t text;
BEGIN
    FOR t IN 
        SELECT table_name FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name IN (
            'site_settings', 'hero_banners', 'stats', 'leadership_messages',
            'programs', 'faculty', 'departments', 'facilities', 'gallery',
            'news', 'events', 'testimonials', 'downloads', 'results',
            'careers', 'faqs', 'history_milestones', 'management_team', 'contact_submissions'
        )
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS "Public Read Access" ON public.%I', t);
        EXECUTE format('DROP POLICY IF EXISTS "Authenticated Admin Full Access" ON public.%I', t);
        EXECUTE format('DROP POLICY IF EXISTS "Public Full Access" ON public.%I', t);
        EXECUTE format('DROP POLICY IF EXISTS "Public Can Submit Contact" ON public.%I', t);
        EXECUTE format('DROP POLICY IF EXISTS "Authenticated Admin Can Manage Submissions" ON public.%I', t);
        
        EXECUTE format('CREATE POLICY "Public Full Access" ON public.%I FOR ALL USING (true) WITH CHECK (true)', t);
    END LOOP;
END $$;

-- ==============================================================================
-- 3. STORAGE BUCKET CONFIGURATION ('media')
-- ==============================================================================

INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true)
ON CONFLICT (id) DO UPDATE SET public = true;

DROP POLICY IF EXISTS "Public Read Media" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Insert Media" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Update Media" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Delete Media" ON storage.objects;
DROP POLICY IF EXISTS "Public Full Media Access" ON storage.objects;

CREATE POLICY "Public Full Media Access" ON storage.objects
    FOR ALL USING (bucket_id = 'media') WITH CHECK (bucket_id = 'media');

-- ==============================================================================
-- 4. SEED ALL WEBSITE DATA
-- ==============================================================================

-- 4.1 Site Settings
INSERT INTO public.site_settings (id, value) VALUES
('general', '{
    "schoolName": "Air Foundation School & College",
    "campus": "Taha Shaheed Campus",
    "tagline": "Inspiring Excellence",
    "address": "House # 7 Dua chowk main university road capital enclave Jinnah Garden Islamabad",
    "phone": "051 5148033",
    "email": "info@airfoundationtahashaheedcampus.com",
    "admissionsEmail": "info@airfoundationtahashaheedcampus.com",
    "facebook": "https://facebook.com",
    "instagram": "https://instagram.com",
    "youtube": "https://youtube.com",
    "mapCoordinates": "33.57347093367743,73.16629491313103"
}'::jsonb);

-- 4.2 Hero Banner
INSERT INTO public.hero_banners (badge_text, title, title_highlight, description, apply_button_text, apply_button_link, learn_button_text, learn_button_link, background_image, video_url, video_thumbnail) VALUES
(
    'Admissions Open for 2026-2027',
    'Shaping Visionary leaders For Tomorrow',
    'Visionary leaders',
    'Welcome to Air Foundation School & College (Taha Shaheed Campus), where premium academic values meet world-class campus facilities to foster intellectual, moral, and creative growth.',
    'Apply Now',
    '/admissions',
    'Learn More',
    '/about',
    'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1920',
    'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
    'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1200'
);

-- 4.3 Key Statistics
INSERT INTO public.stats (value, suffix, label, sort_order) VALUES
(700, '+', 'Students Enrolled', 1),
(50, '+', 'Expert Faculty', 2),
(100, '%', 'Success Rate', 3),
(45, '+', 'Extracurricular Clubs', 4);

-- 4.4 Leadership Messages
INSERT INTO public.leadership_messages (id, title, name, role, campus, image, office_hours, email, quote, paragraphs) VALUES
(
    'chairman',
    'Managing Director''s Message',
    'Mr. Sajid Kiani',
    'Managing Director',
    'Air Foundation School & College (Taha Shaheed Campus)',
    '/src/assets/CM.jpeg',
    '10:00 AM - 1:00 PM (Mon-Fri)',
    'info@airfoundationtahashaheedcampus.com',
    'Education is not merely the acquisition of knowledge; it is the development of character, values, and the ability to transform society.',
    '[
        "Dear Parents, Students, Teachers and Visitors,",
        "Education is the foundation upon which strong individuals, successful communities, and prosperous nations are built.",
        "We believe that every child is blessed with unique abilities and immense potential, and it is our responsibility to provide an environment where these talents can flourish.",
        "Our mission is to deliver quality education that combines academic excellence with moral values, creativity, critical thinking, and character building.",
        "In today''s dynamic world, students need more than knowledge; they need confidence, resilience, compassion, and the ability to adapt to change.",
        "We are committed to providing modern educational opportunities, dedicated faculty, and a safe, nurturing environment that inspires every learner to achieve excellence. Through the collective efforts of students, parents, teachers, and management, we strive to prepare young minds to become responsible citizens and future leaders.",
        "Thank you for your trust and confidence in our institution. Together, let us empower our children with the knowledge, values, and skills needed to create a brighter future."
    ]'::jsonb
),
(
    'principal',
    'Principal''s Address',
    'Ms. Nabeela Sajid',
    'Principal',
    'Air Foundation School & College (Taha Shaheed Campus)',
    '/src/assets/P.jpeg',
    '10:00 AM - 1:00 PM (Mon-Fri)',
    'info@airfoundationtahashaheedcampus.com',
    'Education is the light that empowers minds, builds character, and transforms the future.',
    '[
        "Dear Parents, Students, and Visitors,",
        "Welcome to the digital portal of Air Foundation School & College. As Principal, it is a privilege to lead an institution that is deeply committed to nurturing the academic core and moral capabilities of our next generation.",
        "Education is the most powerful investment we can make in the future. It opens minds, builds confidence, strengthens character, and prepares young people to become responsible citizens and compassionate leaders.",
        "At our school, we are committed to creating an environment where every child feels valued, inspired, and encouraged to reach their highest potential.",
        "We believe that true education goes beyond textbooks. It nurtures creativity, critical thinking, integrity, discipline, and respect for others. Our dedicated teachers strive to provide meaningful learning experiences that prepare students not only for examinations but also for the opportunities and challenges of life.",
        "Together with our parents and the wider community, we aim to shape confident individuals who possess knowledge, values, and the courage to make a positive difference in society."
    ]'::jsonb
),
(
    'vice_principal',
    'Vice Principal''s Address',
    'Ms. Bushra Abid',
    'Vice Principal & Academic Head',
    'Air Foundation School & College (Taha Shaheed Campus)',
    '/src/assets/VP.png',
    '10:00 AM - 12:00 PM (Mon-Fri)',
    'info@airfoundationtahashaheedcampus.com',
    'Education enlightens the mind, while discipline shapes the character. Together, they create responsible individuals and future leaders.',
    '[
        "Dear Parents, Students, and Visitors,",
        "It is my pleasure to welcome you to Air Foundation School & College. As Vice Principal, I am dedicated to fostering a supportive and innovative environment where every student is encouraged to reach their full potential.",
        "Education and discipline are the two pillars of success, and together they lay the foundation for a bright and meaningful future.",
        "We are committed to providing quality education while nurturing strong moral values, responsibility, and respect. Our dedicated teachers inspire students to think critically, learn confidently, and develop their unique talents.",
        "We believe that discipline builds character, integrity, and leadership, preparing students to become responsible citizens. We value the partnership between parents and the school in shaping the future of every child."
    ]'::jsonb
);

-- 4.5 Academic Programs
INSERT INTO public.programs (slug, title, description, image, curriculum, sort_order) VALUES
(
    'pre-classes',
    'Pre Classes (P.G, Nursery & K.G)',
    'Provides a nurturing and engaging environment where young children develop early literacy, numeracy, communication, social, emotional, and motor skills through play-based learning, creative activities, storytelling, basic concepts, and age-appropriate classroom experiences.',
    '/src/assets/prep.avif',
    'Air Foundation''s Own Designed Curriculum',
    1
),
(
    'primary',
    'Primary School (Grade 1 - 5)',
    'Focuses on developing strong foundations in English, Urdu, Mathematics, General Knowledge, Science, Islamiat, and basic computer skills through activity-based and student-centered learning.',
    'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800',
    'National Curriculum (NC)',
    2
),
(
    'middle',
    'Middle School (Grade 6 - 8)',
    'Builds students’ academic and analytical skills through Mathematics, Science, English, Urdu, Islamiat, History, Geography, Computer Science, and other curriculum subjects, preparing them for secondary-level education.',
    'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800',
    'Federal Board of Intermediate and Secondary Education',
    3
),
(
    'high-school',
    'High School (Grade 9 - 10)',
    'Provides comprehensive preparation for SSC/Matric examinations under the Federal Board (FBISE), with students studying compulsory subjects alongside specialized Science or Computer Science subjects according to their chosen group.',
    'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=800',
    'Federal Board of Intermediate and Secondary Education (Biology & Computer Science)',
    4
),
(
    'college',
    'College (Grade 11 - 12)',
    'Offers HSSC/Intermediate programs under FBISE, including Pre-Medical, Pre-Engineering, ICS, and FA (IT) with focused subject-based education, examination preparation, practical learning, and preparation for university admission.',
    'https://gjfszbhnxxctqjsuzlag.supabase.co/storage/v1/object/public/media/portal_uploads/1788029170863_college_avif.avif',
    'Federal Board of Intermediate and Secondary Education (Pre-Medical, Pre-Engineering & ICS)',
    6
);

-- 4.6 Faculty & Staff
INSERT INTO public.faculty (name, role, qualification, image, experience, email, department, sort_order) VALUES
('Ma''am Farhat Iqbal', 'Senior Urdu Educator & Head of Languages', 'M.A Urdu', '/src/assets/Mam Farhat.jpg', '8 Years Teaching Experience', 'farhatiqbal131987@gmail.com', 'Languages', 1),
('Ms Namra Samar', 'Commerce & Economics Educator', 'B.Com', '/src/assets/Mam Namra.jpg', '5 Years Teaching Experience', 'namra.samar@gmail.com', 'Commerce', 2),
('Ma''am Rana Shahzadi', 'Primary Section Educator', 'F.A, Early Childhood Certification', '/src/assets/favatar.png', '4 Years Teaching Experience', 'Shahzadirana95@gmail.com', 'Primary', 3),
('Ma''am Sabaria Kiran', 'Science & General Knowledge Educator', 'B.Sc General Science', '/src/assets/favatar.png', '5 Years Teaching Experience', 'sabariakiran27@gmail.com', 'Science', 4),
('Ma''am Rafeena Faisal', 'Islamic Studies & Ethics Educator', 'M.A Islamiyat', '/src/assets/Mam Rafeena.jpg', '7 Years Teaching Experience', 'rafinafaisal1314@gmail.com', 'Islamiyat', 5),
('Ma''am Sehrish Ijaz', 'Senior Physics Lecturer', 'M.Sc Physics', '/src/assets/Mam Sehrish.jpg', '6 Years Teaching Experience', 'sehrishijaz91@gmail.com', 'Physics', 6),
('Ma''am Salma Zafar', 'Humanities & Social Sciences Teacher', 'B.A', '/src/assets/favatar.png', '6 Years Teaching Experience', 'salmazafar.2006@gmail.com', 'Humanities', 7),
('Sir Faseeh Ur Rehman', 'Computer Science & IT Coordinator', 'BS Software Engineer', '/src/assets/Sir Faseeh.webp', '5 Years Industry & Academic Experience', 'maliksfaseeh663@gmail.com', 'Computer Science', 8),
('Ma''am Kainat Arshad', 'Business Studies & Management Educator', 'BBA (Bachelor of Business Administration)', '/src/assets/Mam Kainat.jpg', '4 Years Teaching Experience', 'kainatmahmood84@gmail.com', 'Commerce', 9),
('Sir Ameer Muayia', 'Biology & Health Sciences Instructor', 'Pharm D (Doctor of Pharmacy)', '/src/assets/Sir Mouavia.jpg', '5 Years Clinical & Academic Experience', 'moaviayaseen@gmail.com', 'Biology', 10),
('Sir Muhammad Abuzar', 'Mathematics & Logic Teacher', 'B.Sc Mathematics & Computing', '/src/assets/mavatar.png', '4 Years Teaching Experience', 'muhammadabuzar@gmail.com', 'Mathematics', 11),
('Ma''am Sidra Tul Montaha', 'English Literature Educator', 'M.A English Literature', '/src/assets/favatar.png', '6 Years Teaching Experience', 'smontaha85@gmail.com', 'Languages', 12),
('Ma''am Shazia Mehmood', 'Senior Pedagogy & Primary Teacher', 'B.A, B.Ed', '/src/assets/favatar.png', '9 Years Teaching Experience', 'Shaziaali407@gmail.com', 'Primary', 13),
('Ma''am Rabia Riaz', 'Accounts & Commerce Educator', 'B.Com', '/src/assets/favatar.png', '5 Years Teaching Experience', 'rabiarahman301@gmail.com', 'Commerce', 14),
('Ma''am Anum Nadeem', 'Mass Communication & Arts Teacher', 'B.S Mass Communication', '/src/assets/favatar.png', '4 Years Teaching Experience', 'anumafss@gmail.com', 'Arts', 15),
('Ma''am Nelofar Zahid', 'General Education & Social Studies Teacher', 'B.A', '/src/assets/Mam Nelofar.jpg', '6 Years Teaching Experience', 'Mmnoor406@gmail.com', 'Social Studies', 16),
('Ma''am Nadia Manzoor', 'Business Administration & Marketing Lecturer', 'MBA (Marketing & Finance)', '/src/assets/favatar.png', '10 Years Academic Leadership', 'dia.manzoor@yahoo.com', 'Commerce', 17),
('Sir Muhammad Usman', 'Head of Mathematics Department', 'M.Sc Mathematics', '/src/assets/Sir Usman.jpg', '8 Years Teaching Experience', 'muhammad1l4637@gmail.com', 'Mathematics', 18),
('Ma''am Sana Ayesha Ghuman', 'Educational Management & Finance Specialist', 'M.Edu, MSc in Islamic Banking And Finance', '/src/assets/Mam Sana.jpg', '7 Years Academic Experience', 'sanaaesha@gmail.com', 'Management', 19),
('Ma''am Saira Firdous', 'Senior Mathematics & Pedagogy Teacher', 'M.Sc Maths, M.A Edu', '/src/assets/Mam Saira.jpg', '8 Years Teaching Experience', 'atiftahir786@yahoo.com', 'Mathematics', 20),
('Ma''am Laraib Khan', 'Junior School Educator', 'B.A English & Social Sciences', '/src/assets/favatar.png', '3 Years Teaching Experience', 'klaraib158@gmail.com', 'Primary', 21),
('Sir Muhammad Zaki', 'Physics Laboratory & Science Instructor', 'B.Sc Physics', '/src/assets/Sir Zaki.jpg', '7 Years Academic Experience', 'zaki9790@gmail.com', 'Physics', 22),
('Ma''am Sabahat Jalil', 'Curriculum & Educational Management Teacher', 'M.A Education', '/src/assets/favatar.png', '6 Years Teaching Experience', 'sabahatusman89@gmail.com', 'Management', 23),
('Ma''am Zopash Imran', 'Chemistry Educator & Lab In-charge', 'B.S Chemistry', '/src/assets/Mam Zopash.jpg', '5 Years Teaching Experience', 'ruposh842003@gmail.com', 'Chemistry', 24),
('Ma''am Ayesha Saba Imran', 'Primary Head & Education Specialist', 'B.A, B.Ed', '/src/assets/Mam Ayesha.jpg', '9 Years Academic Leadership', 'ayeshaimran8519@gmail.com', 'Primary', 25),
('Ma''am Zahra Manzoor', 'Urdu & Islamic History Educator', 'M.A Urdu Literature', '/src/assets/favatar.png', '5 Years Teaching Experience', 'manzoorzahra87@gmail.com', 'Languages', 26),
('Ma''am Mahnoor Fatima', 'Urdu Language Specialist', 'M.A Urdu', '/src/assets/Mam Mahnoor.jpg', '4 Years Teaching Experience', 'mahnoorfatima401@gmail.com', 'Languages', 27),
('Ma''am Aqsa Aziz', 'Botany & General Science Teacher', 'B.Sc Biological Sciences', '/src/assets/favatar.png', '4 Years Teaching Experience', 'aqsaaziz400@gmail.com', 'Biology', 28),
('Ma''am Razia Shahzadi', 'Educational Counselor & Master Trainer', 'M.Ed (Master of Education)', '/src/assets/favatar.png', '8 Years Teaching Experience', 'raziabilal776@gmail.com', 'Counseling', 29),
('Ma''am Bushra Abid', 'Senior Academic Coordinator & Master Educator', 'M.A Education', '/src/assets/VP.png', '10 Years Academic Experience', 'bushraabbasi3@gmail.com', 'Academics', 30),
('Ma''am Huma Khalid', 'Science & Environmental Studies Teacher', 'B.Sc', '/src/assets/favatar.png', '5 Years Teaching Experience', 'humaazmat01@gmail.com', 'Science', 31),
('Ma''am Romana Shakeel', 'Social Sciences Educator', 'M.A Political Science & History', '/src/assets/favatar.png', '6 Years Teaching Experience', 'Romashakeel18@gmail.com', 'Social Studies', 32),
('Ma''am Zainab', 'Head of English Department', 'M.A English', '/src/assets/Mam Zainab.jpg', '7 Years Teaching Experience', 'zainab@airfoundation.edu.pk', 'Languages', 33),
('Ma''am Seema', 'Biochemistry & Life Sciences Teacher', 'B.S Bio Chemistry', '/src/assets/Mam Seema.jpg', '6 Years Teaching Experience', 'seema@airfoundation.edu.pk', 'Chemistry', 34),
('Ma''am Farah', 'Senior Biochemist & Science Educator', 'M.Phil Bio Chemistry', '/src/assets/Mam Farah.jpg', '8 Years Academic & Research Experience', 'farah@airfoundation.edu.pk', 'Chemistry', 35),
('Ma''am Nabila', 'Academic Counselor & Master Educator', 'M.Edu', '/src/assets/P.jpeg', '7 Years Educational Leadership', 'nabila@airfoundation.edu.pk', 'Counseling', 36),
('Ma''am Gulshan Bashir', 'Student Counselor & Behavioral Psychologist', 'BS Psychology', '/src/assets/favatar.png', '5 Years Counseling Experience', 'gulshan.bashir@airfoundation.edu.pk', 'Counseling', 37),
('Ma''am Wajiha', 'Financial Accounting & Commerce Teacher', 'BS Accounting & Finance', '/src/assets/favatar.png', '4 Years Teaching Experience', 'wajiha@airfoundation.edu.pk', 'Commerce', 38),
('Ma''am Sundas', 'English Language & Grammar Specialist', 'M.A English', '/src/assets/favatar.png', '6 Years Teaching Experience', 'sundas@airfoundation.edu.pk', 'Languages', 39),
('Ma''am Hira Iftikhar', 'English Communication & Linguistics Teacher', 'BS English', '/src/assets/favatar.png', '4 Years Teaching Experience', 'hira.iftikhar@airfoundation.edu.pk', 'Languages', 40),
('Ma''am Aneela', 'Islamic Studies & Moral Philosophy Teacher', 'M.A Islamic Studies', '/src/assets/favatar.png', '7 Years Teaching Experience', 'aneela@airfoundation.edu.pk', 'Islamiyat', 41),
('Ma''am Amna', 'Commerce & Banking Educator', 'M.Com', '/src/assets/favatar.png', '5 Years Teaching Experience', 'amna@airfoundation.edu.pk', 'Commerce', 42),
('Ma''am Amara', 'Physics & Science Educator', 'M.Sc Physics', '/src/assets/favatar.png', '6 Years Teaching Experience', 'amara@airfoundation.edu.pk', 'Physics', 43),
('Dr. Amir', 'Senior Academic Advisor & Physics Research Fellow', 'Ph.D. in Physics & Educational Leadership', '/src/assets/Dr Amir.jpg', '15 Years Academic Leadership', 'dr.amir@airfoundation.edu.pk', 'Physics', 44),
('Sir Iqbal', 'Senior Chemistry Faculty & Academic Supervisor', 'M.Sc Organic Chemistry', '/src/assets/Sir Iqbal.jpg', '14 Years Teaching Experience', 'iqbal@airfoundation.edu.pk', 'Chemistry', 45);

-- 4.7 Academic Departments & Labs
INSERT INTO public.departments (name, description, head, labs, sort_order) VALUES
(
    'Computer Science & AI',
    'Developing students’ digital literacy, programming, web development, computational thinking, and foundational Artificial Intelligence skills through practical and project-based learning.',
    'Sir Faseeh Ur Rehman',
    ARRAY['Computer Science Lab'],
    1
),
(
    'Chemistry',
    'Developing an understanding of matter, chemical reactions, atomic structure, organic and inorganic chemistry, and laboratory techniques through theoretical and practical learning.',
    'Ma''am Zopash Imran',
    ARRAY['Chemistry Lab'],
    2
),
(
    'Biology',
    'Exploring living organisms, cell biology, genetics, human physiology, ecology, and biodiversity while developing scientific observation and practical laboratory skills.',
    'Sir Mouavia',
    ARRAY['Biology Lab'],
    3
),
(
    'Physics',
    'Building a strong understanding of motion, force, energy, electricity, waves, light, and modern physics through conceptual learning, problem-solving, and practical experiments.',
    'Sir Zaki',
    ARRAY['Physics Lab'],
    4
),
(
    'Mathematics',
    'Fostering logical reasoning, numerical skills, algebraic thinking, geometry, trigonometry, statistics, and quantitative problem-solving across different levels of education.',
    'Sir Usman',
    ARRAY[]::TEXT[],
    5
),
(
    'Islamiyat & Translation of Quran',
    'Developing students’ understanding of Islamic teachings, Quranic guidance, Seerah, Hadith, Islamic history, ethics, and the translation and comprehension of selected Quranic verses.',
    'Sir Syed Hassaan',
    ARRAY[]::TEXT[],
    6
),
(
    'Pakistan Studies',
    'Exploring the history, geography, culture, constitutional development, political system, economy, and national identity of Pakistan while promoting responsible citizenship.',
    'Mam Bushra Abid',
    ARRAY[]::TEXT[],
    7
),
(
    'Urdu Languages & Literature',
    'Strengthening Urdu language proficiency through grammar, comprehension, creative writing, poetry, prose, literary analysis, communication, and appreciation of Urdu literature.',
    'Ma''am Farhat Iqbal',
    ARRAY[]::TEXT[],
    8
),
(
    'English Languages & Literature',
    'Developing English language proficiency through grammar, reading comprehension, vocabulary, creative and academic writing, communication skills, and the study of English literature.',
    'Sir Abuzar',
    ARRAY[]::TEXT[],
    9
);

-- 4.8 Campus Facilities
INSERT INTO public.facilities (title, description, image, sort_order) VALUES
(
    'Smart Classrooms',
    'Air-conditioned classrooms with white boards and ergonomic seating.',
    'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800',
    1
),
(
    'Science Lab',
    'Lab for Computer, Physics, Chemistry, and Biology/Biotechnology stocked with instruments.',
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
    2
),
(
    'Sports Ground',
    'Featuring a sports ground for the students to participate in the physical activities',
    'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=800',
    3
);

-- 4.9 Media Gallery (Event Albums)
INSERT INTO public.gallery (title, category, date, description, image, images, sort_order) VALUES
(
    'Parent Teacher Meeting (PTM)',
    'Events',
    'August 2026',
    'One-on-one evaluations and collaborative counseling sessions between faculty and parents discussing student academic milestones.',
    'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=1000',
    ARRAY[
        'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=1000',
        'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1000',
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1000',
        'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1000'
    ],
    1
),
(
    'All Pakistan Poetry & Bilingual Declamation Fest',
    'Events',
    'September 2026',
    'Inter-campus Urdu poetry recitation, English declamation, and parliamentary debate contests showcasing student rhetoric.',
    'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=1000',
    ARRAY[
        'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=1000',
        'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1000',
        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1000',
        'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&q=80&w=1000'
    ],
    2
),
(
    'Annual Science & Innovation Expo',
    'Events',
    'October 2026',
    'A grand exhibition of scientific working models, green energy breakthroughs, chemistry demos, and biological research.',
    'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=1000',
    ARRAY[
        'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=1000',
        'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000',
        'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&q=80&w=1000'
    ],
    3
),
(
    'Annual Sports Gala & Track Championship',
    'Sports',
    'July 2026',
    'Track and sprint athletics, relay races, high-jump matches, and house trophy tournaments on the school championship field.',
    'https://images.unsplash.com/photo-1526676001881-6a7eefb323b5?auto=format&fit=crop&q=80&w=1000',
    ARRAY[
        'https://images.unsplash.com/photo-1526676001881-6a7eefb323b5?auto=format&fit=crop&q=80&w=1000',
        'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=1000',
        'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&q=80&w=1000',
        'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=1000'
    ],
    4
),
(
    'Inter-Campus Cricket & Football Cup',
    'Sports',
    'August 2026',
    'Thrilling inter-school fixtures, cricket league championships, penalty shootouts, and award ceremonies.',
    'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=1000',
    ARRAY[
        'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=1000',
        'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=1000',
        'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=1000'
    ],
    5
),
(
    'Robotics Workshop & Supercomputing Studio',
    'Tech',
    'June 2026',
    'Hands-on training in Python programming, Arduino robotics, smart sensors, and automated robotic arms in the STEM lab.',
    'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=1000',
    ARRAY[
        'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=1000',
        'https://images.unsplash.com/photo-1547482030-c6e8eb844788?auto=format&fit=crop&q=80&w=1000',
        'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=1000'
    ],
    6
),
(
    'Fine Arts, Calligraphy & Cultural Gala',
    'Arts',
    'May 2026',
    'Student oil paintings, Quranic calligraphy canvases, ceramic clay sculpting, and creative art galleries.',
    'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=1000',
    ARRAY[
        'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=1000',
        'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&q=80&w=1000',
        'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&q=80&w=1000',
        'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&q=80&w=1000'
    ],
    7
),
(
    'High School & College Graduation Ceremony',
    'Ceremonies',
    'May 2026',
    'Annual convocation, valedictorian speeches, student council oath-taking, and gold medal presentations.',
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000',
    ARRAY[
        'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1000',
        'https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?auto=format&fit=crop&q=80&w=1000',
        'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1000'
    ],
    8
);

-- 4.10 News & Bulletins
INSERT INTO public.news (title, category, date, excerpt, image, sort_order) VALUES
(
    'National Robofest Championship 2026: Our Students Clinch Gold',
    'Achievement',
    'June 28, 2026',
    'The high school robotics team beat 120 regional teams to claim the national trophy with their AI-guided autonomous recycling robot.',
    'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?auto=format&fit=crop&q=80&w=800',
    1
),
(
    'Annual STEM and Arts Conclave Hosted by Ivy League Delegates',
    'Event',
    'June 15, 2026',
    'Over 500 scholars and visual artists gathered for the 3-day symposia exploring the intersection of technology and creative arts.',
    'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800',
    2
),
(
    'Global School Exchange Program with Munich School of Sciences',
    'Academics',
    'May 20, 2026',
    '15 of our senior college students have been selected for the fully funded 4-week exchange term starting in September.',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
    3
);

-- 4.11 Upcoming Events Calendar
INSERT INTO public.events (title, date, time, location, description, sort_order) VALUES
(
    'Annual Sports Meet & Athletic Championship',
    'July 18, 2026',
    '08:00 AM - 04:00 PM',
    'Main Sports Complex',
    'Join us for a display of true athleticism and track matches featuring special guests from the National Olympic Committee.',
    1
),
(
    'Parent-Teacher Consultations (First Term)',
    'August 02, 2026',
    '09:00 AM - 02:00 PM',
    'Homeroom Classrooms',
    'One-on-one evaluations for parents to discuss individual growth metrics, target areas, and student achievements.',
    2
),
(
    'Grand Symphony Concert & Cultural Gala',
    'August 15, 2026',
    '05:00 PM - 09:00 PM',
    'Performing Arts Auditorium',
    'A premium symphonic display by the school chamber orchestra and choir showcasing classics as well as modern musical medleys.',
    3
);

-- 4.12 Testimonials
INSERT INTO public.testimonials (quote, author, relation, image, sort_order) VALUES
(
    'We are truly grateful to the school for providing a safe, caring, and inspiring learning environment. The teachers are dedicated, approachable, and always encourage students to achieve their full potential. We have seen remarkable growth in our child''s confidence and academic performance.',
    'Mr Faisal Iqbal',
    'Father of Student Class 10',
    '/src/assets/mavatar.png',
    1
),
(
    'This institution focuses not only on academic excellence but also on character building, discipline, and moral values. The management keeps parents informed, and we always feel involved in our child''s educational journey.',
    'Mr Saqib Manzoor',
    'Father of Student Class 8',
    '/src/assets/mavatar.png',
    2
),
(
    'The teachers genuinely care about every student and provide individual attention whenever needed. My child enjoys coming to school every day, which speaks volumes about the positive atmosphere on campus.',
    'Mrs Naveed',
    'Mother of Student Class 9',
    '/src/assets/favatar.png',
    3
),
(
    'Excellent faculty, modern teaching methods, and a strong emphasis on co-curricular activities have helped my child become more confident, responsible, and independent. I highly recommend this school to every parent.',
    'Mr Hassan',
    'Father of Student Class 9',
    '/src/assets/mavatar.png',
    4
),
(
    'We appreciate the school''s commitment to academic excellence, discipline, and effective communication with parents. The staff is supportive, and the leadership ensures a nurturing environment where every child can succeed.',
    'Ms Fouzia',
    'Mother of Student Class 9',
    '/src/assets/favatar.png',
    5
),
(
    'Choosing this school for our child has been one of the best decisions we have made. We are impressed by the professionalism of the teachers, the caring environment, and the opportunities provided for students to excel in every aspect of life.',
    'Mr Masood',
    'Father of Student 2nd Year',
    '/src/assets/mavatar.png',
    6
);

-- 4.13 Academic Downloads
INSERT INTO public.downloads (title, size, format, file_url, sort_order) VALUES
('Academic Calendar (Academic Year 2026-27)', '1.4 MB', 'PDF', '#', 1),
('Admissions Prospectus & Guidelines', '4.8 MB', 'PDF', '#', 2),
('Student Handbook & Code of Conduct', '2.1 MB', 'PDF', '#', 3),
('Fee Structure and Scholarship Matrix 2026', '890 KB', 'PDF', '#', 4),
('Syllabus & Stream Guide for Grade 11 & 12', '3.2 MB', 'PDF', '#', 5);

-- 4.14 Examination Results (All 13 FBISE Merit & High Achievers)
INSERT INTO public.results (year, examination, student_name, score, percentage, image, toppers, passing_percentage, distinctions, sort_order) VALUES
('2026', 'Grade 10 (FBISE)', 'Anshra Khan', '1003', '91.18%', 'https://gjfszbhnxxctqjsuzlag.supabase.co/storage/v1/object/public/media/portal_uploads/1788030626744_Anshara_png.png', 'Anshra Khan (91.18%)', '100%', '91.18%', 1),
('2026', 'Grade 10 (FBISE)', 'Aneesha Nouman', '978', '88.91%', 'https://gjfszbhnxxctqjsuzlag.supabase.co/storage/v1/object/public/media/portal_uploads/1788030670604_Aneesha_jpeg.jpeg', 'Aneesha Nouman (88.91%)', '100%', '88.91%', 2),
('2026', 'Grade 10 (FBISE)', 'Khadija Fatima', '975', '88.64%', 'https://gjfszbhnxxctqjsuzlag.supabase.co/storage/v1/object/public/media/portal_uploads/1788030807189_Khadija_png.png', 'Khadija Fatima (88.64%)', '100%', '88.64%', 3),
('2026', 'Grade 10 (FBISE)', 'Muhammad Usman', '951', '86.45%', 'https://gjfszbhnxxctqjsuzlag.supabase.co/storage/v1/object/public/media/portal_uploads/1788030908570_Usman_png.png', 'Muhammad Usman (86.45%)', '100%', '86.45%', 4),
('2026', 'Grade 10 (FBISE)', 'Muhammad Tasbeel', '887', '80.64%', 'https://gjfszbhnxxctqjsuzlag.supabase.co/storage/v1/object/public/media/portal_uploads/1788031011661_Tasbeel_png.png', 'Muhammad Tasbeel (80.64%)', '100%', '80.64%', 5),
('2026', 'Grade 10 (FBISE)', 'Muhammad Musa', '876', '79.64', 'https://gjfszbhnxxctqjsuzlag.supabase.co/storage/v1/object/public/media/portal_uploads/1788031096827_Musa_png.png', 'Muhammad Musa (79.64)', '100%', '79.64%', 6),
('2026', 'Grade 9 (FBISE)', 'Esha Shahid', '523', '94.23%', 'https://gjfszbhnxxctqjsuzlag.supabase.co/storage/v1/object/public/media/portal_uploads/1788031222151_Esha_jpeg.jpeg', 'Esha Shahid (94.23%)', '100%', '94.23%', 7),
('2026', 'Grade 9 (FBISE)', 'Ayesha Bint e Faisal', '512', '92.25%', 'https://gjfszbhnxxctqjsuzlag.supabase.co/storage/v1/object/public/media/portal_uploads/1788031321240_Ayesha_jpeg.jpeg', 'Ayesha Bint e Faisal (92.25%)', '100%', '92.25%', 8),
('2026', 'Grade 9 (FBISE)', 'Syeda Aania Ali', '512', '92.25%', 'https://gjfszbhnxxctqjsuzlag.supabase.co/storage/v1/object/public/media/portal_uploads/1788031394800_Aania_jpeg.jpeg', 'Syeda Aania Ali (92.25%)', '100%', '92.25%', 9),
('2026', 'Grade 9 (FBISE)', 'Fiza Shoukat', '497', '89.55%', 'https://gjfszbhnxxctqjsuzlag.supabase.co/storage/v1/object/public/media/portal_uploads/1788031473730_Fiza_jpeg.jpeg', 'Fiza Shoukat (89.55%)', '100%', '89.55%', 10),
('2026', 'Grade 9 (FBISE)', 'Hamza Khan', '432', '77.84%', 'https://gjfszbhnxxctqjsuzlag.supabase.co/storage/v1/object/public/media/portal_uploads/1788031551839_Hamza_jpeg.jpeg', 'Hamza Khan (77.84%)', '100%', '77.84%', 11),
('2026', 'Grade 9 (FBISE)', 'Muhammad Saad', '403', '72.61%', 'https://gjfszbhnxxctqjsuzlag.supabase.co/storage/v1/object/public/media/portal_uploads/1788031622721_Saad_jpeg.jpeg', 'Muhammad Saad (72.61%)', '100%', '72.61%', 12),
('2026', 'Grade 9 (FBISE)', 'Muhammad Affan', '396', '71.35%', 'https://gjfszbhnxxctqjsuzlag.supabase.co/storage/v1/object/public/media/portal_uploads/1788031687230_Affan_jpeg.jpeg', 'Muhammad Affan (71.35%)', '100%', '71.35%', 13);

-- 4.15 Careers & Job Openings
INSERT INTO public.careers (title, department, type, experience, qualification, status, sort_order) VALUES
('PGT Computer Science (Python/AI)', 'Academics', 'Full-time', '5+ Years', 'M.Tech / M.Sc in Computer Science', 'Open', 1),
('Primary Homeroom Teacher (Grade 3)', 'Academics', 'Full-time', '3+ Years', 'B.Ed with IPC/IB training', 'Open', 2),
('High School Sports Coach (Lawn Tennis)', 'Athletics', 'Part-time', '3+ Years', 'National player representation preferred', 'Open', 3),
('Academic Coordinator', 'Administration', 'Full-time', '8+ Years', 'M.Ed / Ph.D. with leadership experience', 'Open', 4);

-- 4.16 FAQs
INSERT INTO public.faqs (question, answer, category, sort_order) VALUES
(
    'What is the teacher-to-student ratio at your school?',
    'We maintain an average teacher-to-student ratio of 1:12 across all sections. This ensures individual focus and customized learning plans for every pupil.',
    'Academics',
    1
),
(
    'Are scholarship schemes available for meritorious students?',
    'Yes. We offer academic, athletic, and artistic scholarships. Merit-cum-means bursaries of up to 100% tuition waiver are awarded during admissions.',
    'Admissions',
    2
),
(
    'Which educational boards is the school affiliated with?',
    'Our middle school uses Cambridge Secondary. High School is affiliated with both ICSE/ISC (National) and Cambridge IGCSE / International Baccalaureate (Global).',
    'Academics',
    3
),
(
    'Do you offer transportation facilities across the city?',
    'We have a modern fleet of GPS-enabled school buses equipped with CCTV and trained female security staff, covering all major residential corridors in the city.',
    'Facilities',
    4
),
(
    'What sports programs are offered?',
    'Students can specialize in Football, Basketball, Cricket, Lawn Tennis, Athletics, Swimming, Gymnastics, and Martial Arts under licensed professional coaches.',
    'Activities',
    5
);

-- 4.17 History Milestones
INSERT INTO public.history_milestones (year, title, description, sort_order) VALUES
('1998', 'The Foundation', 'Air Foundation School & College is registered with 5 academic rooms and 85 students in the primary program.', 1),
('2005', 'High School Expansion', 'Affiliation secured with National ICSE boards. Building of the science block completed.', 2),
('2012', 'Global Curriculum Integration', 'Introduced Cambridge Secondary curricula and constructed the Olympic-size sports center.', 3),
('2018', 'College & IB Diploma', 'Launched Grade 11 & 12 Specialized Streams and secured International Baccalaureate (IB) authorization.', 4),
('2025', 'Digital Era & Super Computing', 'Classrooms upgraded to smart-interactive technology. Launch of the advanced STEM Tinkering and AI Labs.', 5);

-- 4.18 Management Board
INSERT INTO public.management_team (name, role, bg, sort_order) VALUES
('Dr. Arthur Sterling', 'Chairman, Board of Governors', 'MIT, Former Chancellor', 1),
('Mrs. Helen Vance', 'Managing Director & Treasurer', 'MBA, Stanford University', 2),
('Dr. Robert Chen', 'Principal & Ex-officio Member', 'Ph.D., MIT', 3),
('Mr. George Cooper', 'Director of Campus Infrastructure', 'M.Tech, Cornell', 4),
('Ms. Diane Fletcher', 'Director of Human Resources', 'M.A., Columbia University', 5);
