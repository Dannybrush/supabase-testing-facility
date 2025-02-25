import { createClient } from '@supabase/supabase-js';

// Load environment variables from .env file
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a single supabase client instance
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
