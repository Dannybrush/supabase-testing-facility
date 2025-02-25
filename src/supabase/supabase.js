// Import the createClient method from the supabase-js library
import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client using the environment variables
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL, // Your Supabase URL
  import.meta.env.VITE_SUPABASE_ANON_KEY // Your Supabase anon key
);
