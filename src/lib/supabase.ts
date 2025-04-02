
import { createClient } from '@supabase/supabase-js';
import { supabase as configuredSupabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

// Type for profile
type ProfileRow = Database['public']['Tables']['profiles']['Row'];
type ProfileInsert = Database['public']['Tables']['profiles']['Insert'];

// Use the pre-configured Supabase client from the integrations folder
export const supabase = configuredSupabase;

// Helper to get user profile after login
export async function getUserProfile(userId: string): Promise<ProfileRow | null> {
  if (!userId) return null;
  
  try {
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
  } catch (error) {
    console.error('Error in getUserProfile:', error);
    return null;
  }
}

// Helper to create initial profile if none exists
export async function createUserProfile(userId: string, userData: {
  name?: string;
  provider?: string;
  photo_url?: string;
}): Promise<ProfileRow | null> {
  if (!userId) return null;
  
  try {
    // First check if profile exists
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', userId)
      .single();
      
    if (existingProfile) {
      // Profile exists, no need to create
      return getUserProfile(userId);
    }
    
    // Create new profile
    const profileData: ProfileInsert = {
      id: userId,
      name: userData.name || '',
      provider: userData.provider || 'email',
      photo_url: userData.photo_url || null,
      onboarding_completed: false
    };
    
    const { data, error } = await supabase
      .from('profiles')
      .insert(profileData)
      .select()
      .single();
    
    if (error) {
      console.error('Error creating user profile:', error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Error in createUserProfile:', error);
    return null;
  }
}
