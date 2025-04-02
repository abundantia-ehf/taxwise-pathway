
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from "sonner";
import { supabase, getUserProfile, createUserProfile } from '@/lib/supabase';
import { User as SupabaseUser, AuthError } from '@supabase/supabase-js';
import { Database } from '@/integrations/supabase/types';

// Define types based on the Database type
type ProfileRow = Database['public']['Tables']['profiles']['Row'];
type SubscriptionRow = Database['public']['Tables']['subscriptions']['Row'];
type SubscriptionInsert = Database['public']['Tables']['subscriptions']['Insert'];

interface User {
  id: string;
  email: string;
  name?: string;
  photoUrl?: string;
  provider?: 'email' | 'google' | 'apple';
  subscription?: {
    status: 'trial' | 'active' | 'canceled' | 'expired';
    trialEndDate?: Date;
    startDate: Date;
    nextBillingDate?: Date;
  };
  onboardingCompleted: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  hasSubscription: boolean;
  isTrialActive: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithApple: () => Promise<void>;
  logout: () => void;
  completeOnboarding: () => void;
  startSubscription: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [supabaseUser, setSupabaseUser] = useState<SupabaseUser | null>(null);
  const [hasAnonymousSubscription, setHasAnonymousSubscription] = useState(false);

  // Initialize user when component mounts
  useEffect(() => {
    const hasSubscription = localStorage.getItem('untaxable-subscription') === 'true';
    setHasAnonymousSubscription(hasSubscription);
    
    // Get initial session
    setIsLoading(true);
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        // Handle auth state changes
        console.log('Auth state change:', event);
        
        if (session?.user) {
          setSupabaseUser(session.user);
          let profile = await getUserProfile(session.user.id);
          
          // If no profile exists, create one
          if (!profile) {
            profile = await createUserProfile(session.user.id, {
              name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || '',
              provider: session.user.app_metadata?.provider || 'email',
              photo_url: session.user.user_metadata?.avatar_url
            });
          }
          
          if (profile) {
            const userProfile: User = {
              id: session.user.id,
              email: session.user.email || '',
              name: profile.name || undefined,
              photoUrl: profile.photo_url || undefined,
              provider: (profile.provider as 'email' | 'google' | 'apple') || 'email',
              onboardingCompleted: profile.onboarding_completed || false,
            };
            
            // Get subscription data
            try {
              const { data: subscriptionData } = await supabase
                .from('subscriptions')
                .select('*')
                .eq('user_id', session.user.id)
                .single();
                
              if (subscriptionData) {
                const status = subscriptionData.status as 'trial' | 'active' | 'canceled' | 'expired';
                userProfile.subscription = {
                  status: status,
                  startDate: subscriptionData.start_date ? new Date(subscriptionData.start_date) : new Date(),
                  trialEndDate: subscriptionData.trial_end_date ? new Date(subscriptionData.trial_end_date) : undefined,
                  nextBillingDate: subscriptionData.next_billing_date ? new Date(subscriptionData.next_billing_date) : undefined,
                };
              } else {
                // Create initial subscription if none exists
                const newSubscriptionData: SubscriptionInsert = {
                  user_id: session.user.id,
                  status: 'trial',
                  start_date: new Date().toISOString(),
                  trial_end_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString() // 3 days trial
                };
                
                const { data: newSubscription } = await supabase
                  .from('subscriptions')
                  .insert(newSubscriptionData)
                  .select()
                  .single();
                  
                if (newSubscription) {
                  userProfile.subscription = {
                    status: 'trial',
                    startDate: newSubscription.start_date ? new Date(newSubscription.start_date) : new Date(),
                    trialEndDate: newSubscription.trial_end_date ? new Date(newSubscription.trial_end_date) : undefined,
                    nextBillingDate: undefined
                  };
                }
              }
            } catch (error) {
              console.error('Error fetching subscription data:', error);
            }
            
            setUser(userProfile);
          } else {
            console.error('No profile found for user:', session.user.id);
          }
        } else {
          setSupabaseUser(null);
          setUser(null);
        }
        
        setIsLoading(false);
      }
    );
    
    // Initial auth check
    const checkUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          setSupabaseUser(session.user);
          let profile = await getUserProfile(session.user.id);
          
          // If no profile exists, create one
          if (!profile) {
            profile = await createUserProfile(session.user.id, {
              name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || '',
              provider: session.user.app_metadata?.provider || 'email',
              photo_url: session.user.user_metadata?.avatar_url
            });
          }
          
          if (profile) {
            const userProfile: User = {
              id: session.user.id,
              email: session.user.email || '',
              name: profile.name || undefined,
              photoUrl: profile.photo_url || undefined,
              provider: (profile.provider as 'email' | 'google' | 'apple') || 'email',
              onboardingCompleted: profile.onboarding_completed || false,
            };
            
            // Get subscription data
            try {
              const { data: subscriptionData } = await supabase
                .from('subscriptions')
                .select('*')
                .eq('user_id', session.user.id)
                .single();
                
              if (subscriptionData) {
                const status = subscriptionData.status as 'trial' | 'active' | 'canceled' | 'expired';
                userProfile.subscription = {
                  status: status,
                  startDate: subscriptionData.start_date ? new Date(subscriptionData.start_date) : new Date(),
                  trialEndDate: subscriptionData.trial_end_date ? new Date(subscriptionData.trial_end_date) : undefined,
                  nextBillingDate: subscriptionData.next_billing_date ? new Date(subscriptionData.next_billing_date) : undefined,
                };
              } else {
                // Create initial subscription if none exists
                const newSubscriptionData: SubscriptionInsert = {
                  user_id: session.user.id,
                  status: 'trial',
                  start_date: new Date().toISOString(),
                  trial_end_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString() // 3 days trial
                };
                
                const { data: newSubscription } = await supabase
                  .from('subscriptions')
                  .insert(newSubscriptionData)
                  .select()
                  .single();
                  
                if (newSubscription) {
                  userProfile.subscription = {
                    status: 'trial',
                    startDate: newSubscription.start_date ? new Date(newSubscription.start_date) : new Date(),
                    trialEndDate: newSubscription.trial_end_date ? new Date(newSubscription.trial_end_date) : undefined,
                    nextBillingDate: undefined
                  };
                }
              }
            } catch (error) {
              console.error('Error fetching subscription data:', error);
            }
            
            setUser(userProfile);
          }
        }
      } catch (error) {
        console.error('Error checking user session:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkUser();
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleAuthError = (error: AuthError) => {
    console.error('Auth error:', error);
    toast.error(error.message || 'Authentication failed');
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        handleAuthError(error);
      } else {
        toast.success("Login successful!");
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error("Login failed. Please check your credentials and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            name,
            provider: 'email'
          }
        }
      });
      
      if (error) {
        handleAuthError(error);
      } else {
        toast.success("Account created successfully! Please check your email for verification.");
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast.error("Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin + '/welcome'
        }
      });
      
      if (error) {
        handleAuthError(error);
      }
    } catch (error) {
      console.error('Google login error:', error);
      toast.error("Google login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithApple = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'apple',
        options: {
          redirectTo: window.location.origin + '/welcome'
        }
      });
      
      if (error) {
        handleAuthError(error);
      }
    } catch (error) {
      console.error('Apple login error:', error);
      toast.error("Apple login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Logout error:', error);
      toast.error("Logout failed. Please try again.");
    } else {
      setUser(null);
      toast.info("You've been logged out");
    }
  };

  const completeOnboarding = async () => {
    if (user && supabaseUser) {
      try {
        const { error } = await supabase
          .from('profiles')
          .update({ onboarding_completed: true })
          .eq('id', user.id);
          
        if (error) {
          console.error('Error updating onboarding status:', error);
          toast.error("Failed to update onboarding status");
          return;
        }
        
        setUser({
          ...user,
          onboardingCompleted: true
        });
        
      } catch (error) {
        console.error('Error completing onboarding:', error);
        toast.error("Failed to complete onboarding");
      }
    }
  };

  const startSubscription = async () => {
    // This is a placeholder for real subscription integration
    // In a real app, this would connect to Stripe or another payment processor
    setHasAnonymousSubscription(true);
    localStorage.setItem('untaxable-subscription', 'true');
    
    if (user && supabaseUser) {
      try {
        // Update subscription in Supabase
        const { error } = await supabase
          .from('subscriptions')
          .update({ 
            status: 'active',
            next_billing_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days from now
          })
          .eq('user_id', user.id);
          
        if (error) {
          console.error('Error updating subscription:', error);
          return;
        }
        
        // Update local user state
        setUser({
          ...user,
          subscription: {
            ...user.subscription,
            status: 'active',
            nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          }
        });
        
        toast.success("Subscription activated!");
      } catch (error) {
        console.error('Error starting subscription:', error);
      }
    }
  };

  const hasSubscription = !!user?.subscription && (user.subscription.status === 'active' || user.subscription.status === 'trial') || hasAnonymousSubscription;
  const isTrialActive = !!user?.subscription && user.subscription.status === 'trial' && user.subscription.trialEndDate ? new Date(user.subscription.trialEndDate) > new Date() : false;

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isLoading, 
        isAuthenticated: !!user,
        hasSubscription,
        isTrialActive,
        login, 
        signup, 
        loginWithGoogle,
        loginWithApple,
        logout,
        completeOnboarding,
        startSubscription
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
