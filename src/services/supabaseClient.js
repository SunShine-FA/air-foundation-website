import { createClient } from '@supabase/supabase-js';

// Supabase Configuration for Air Foundation School & College
export const SUPABASE_URL = 'https://gjfszbhnxxctqjsuzlag.supabase.co';
export const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqZnN6YmhueHhjdHFqc3V6bGFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc5MTY1NzcsImV4cCI6MjEwMzQ5MjU3N30.bhP4MMetjSI_0QeriDvwzw3nMhrjymtkvhTm_L2OAaY';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false
  }
});

// Connectivity test helper
export const checkSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase.from('site_settings').select('id').limit(1);
    if (error && error.code !== 'PGRST116') {
      // Table might not exist yet before SQL execution
      return { connected: true, initialized: false, error: error.message };
    }
    return { connected: true, initialized: true, data };
  } catch (err) {
    return { connected: false, initialized: false, error: err.message };
  }
};
