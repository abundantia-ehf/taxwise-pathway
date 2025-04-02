
import { createClient } from '@supabase/supabase-js';
import { supabase as configuredSupabase } from '@/integrations/supabase/client';

// Use the pre-configured Supabase client from the integrations folder
export const supabase = configuredSupabase;

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
