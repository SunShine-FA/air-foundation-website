import { supabase } from './supabaseClient';

const ADMIN_EMAIL = 'info@airfoundationtahashaheedcampus.com';
const LEGACY_ADMIN_EMAIL = 'afsctsc@gmail.com';
const ADMIN_PASS = '29info@29@airfoundationtahashaheedcampus';
const LOCAL_SESSION_KEY = 'afs_admin_session';

export const authService = {
  // Login with credentials
  async login(email, password) {
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPassword = (password || '').trim();

    // 1. Try Supabase Auth first
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password: cleanPassword,
      });

      if (!error && data?.session) {
        sessionStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify({
          user: data.user,
          type: 'supabase',
          email: cleanEmail,
          loggedAt: new Date().toISOString()
        }));
        return { success: true, session: data.session, user: data.user };
      }
    } catch (err) {
      console.warn('Supabase auth attempt notice:', err);
    }

    // 2. Direct Admin Credentials Validation
    if ((cleanEmail === ADMIN_EMAIL.toLowerCase() || cleanEmail === LEGACY_ADMIN_EMAIL.toLowerCase()) && cleanPassword === ADMIN_PASS) {
      const fallbackUser = {
        id: 'admin-master',
        email: ADMIN_EMAIL,
        role: 'admin',
        user_metadata: { role: 'admin', name: 'Master Administrator' }
      };

      sessionStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify({
        user: fallbackUser,
        type: 'local_master',
        email: ADMIN_EMAIL,
        loggedAt: new Date().toISOString()
      }));

      return { success: true, session: { user: fallbackUser }, user: fallbackUser };
    }

    return {
      success: false,
      error: 'Invalid credentials. Please enter the authorized administrator email and password.'
    };
  },

  // Check if admin is currently authenticated in this tab session
  async isAuthenticated() {
    try {
      const raw = sessionStorage.getItem(LOCAL_SESSION_KEY);
      if (raw) {
        const session = JSON.parse(raw);
        if (session && (session.email === ADMIN_EMAIL.toLowerCase() || session.email === LEGACY_ADMIN_EMAIL.toLowerCase())) {
          return true;
        }
      }
    } catch (e) {
      // Ignore
    }

    return false;
  },

  // Get current user details
  getCurrentUser() {
    try {
      const raw = sessionStorage.getItem(LOCAL_SESSION_KEY);
      if (raw) {
        const session = JSON.parse(raw);
        return session.user;
      }
    } catch (e) {
      // Ignore
    }
    return null;
  },

  // Sign out and purge all stored auth data
  async logout() {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      // Ignore
    }
    try {
      sessionStorage.removeItem(LOCAL_SESSION_KEY);
      localStorage.removeItem(LOCAL_SESSION_KEY);
    } catch (e) {
      // Ignore
    }
    return true;
  }
};
