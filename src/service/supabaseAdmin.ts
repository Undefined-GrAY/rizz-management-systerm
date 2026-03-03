import { createClient } from '@supabase/supabase-js';
import { supabaseUrl } from './supabase';

const supabaseKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY;

// This client will NOT swap the user
export const supabaseAdmin = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false, // CRITICAL: This prevents the session swap
    autoRefreshToken: false,
    detectSessionInUrl: false,
    storageKey: 'sb-admin-tmp'
  }
});