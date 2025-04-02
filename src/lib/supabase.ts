
import { createClient } from '@supabase/supabase-js';

// Get environment variables with fallbacks for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Log to console only in development
if (import.meta.env.DEV && (!supabaseUrl || !supabaseAnonKey)) {
  console.error('Missing Supabase environment variables. Check your environment configuration.');
}

// Throw an error if variables are missing in production
if (import.meta.env.PROD && (!supabaseUrl || !supabaseAnonKey)) {
  throw new Error('Missing required Supabase environment variables in production.');
}

// Create the Supabase client with default values to prevent initialization errors
export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);

// Helper to get user profile after login
export async function getUserProfile(userId: string) {
  if (!userId) return null;
  
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
  
  return data;
}
