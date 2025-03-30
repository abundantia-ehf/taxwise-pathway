
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from "sonner";

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
  const [hasAnonymousSubscription, setHasAnonymousSubscription] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('untaxable-user');
    const hasSubscription = localStorage.getItem('untaxable-subscription') === 'true';
    
    setHasAnonymousSubscription(hasSubscription);
    
    setTimeout(() => {
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      setIsLoading(false);
    }, 1000);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: '123',
        email,
        name: email.split('@')[0],
        provider: 'email',
        subscription: {
          status: 'trial',
          startDate: new Date(),
          trialEndDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        },
        onboardingCompleted: false
      };
      
      setUser(mockUser);
      localStorage.setItem('untaxable-user', JSON.stringify(mockUser));
      toast.success("Login successful!");
    } catch (error) {
      toast.error("Login failed. Please check your credentials and try again.");
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    try {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: '123',
        email,
        name,
        provider: 'email',
        subscription: {
          status: 'trial',
          startDate: new Date(),
          trialEndDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        },
        onboardingCompleted: false
      };
      
      setUser(mockUser);
      localStorage.setItem('untaxable-user', JSON.stringify(mockUser));
      toast.success("Account created successfully!");
    } catch (error) {
      toast.error("Signup failed. Please try again.");
      console.error('Signup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    try {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: '456',
        email: 'user@gmail.com',
        name: 'Google User',
        photoUrl: 'https://lh3.googleusercontent.com/a/default-user',
        provider: 'google',
        subscription: {
          status: 'trial',
          startDate: new Date(),
          trialEndDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        },
        onboardingCompleted: false
      };
      
      setUser(mockUser);
      localStorage.setItem('untaxable-user', JSON.stringify(mockUser));
      toast.success("Google login successful!");
    } catch (error) {
      toast.error("Google login failed. Please try again.");
      console.error('Google login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithApple = async () => {
    try {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: '789',
        email: 'user@icloud.com',
        name: 'Apple User',
        provider: 'apple',
        subscription: {
          status: 'trial',
          startDate: new Date(),
          trialEndDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        },
        onboardingCompleted: false
      };
      
      setUser(mockUser);
      localStorage.setItem('untaxable-user', JSON.stringify(mockUser));
      toast.success("Apple login successful!");
    } catch (error) {
      toast.error("Apple login failed. Please try again.");
      console.error('Apple login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('untaxable-user');
    toast.info("You've been logged out");
  };

  const completeOnboarding = () => {
    if (user) {
      const updatedUser = {
        ...user,
        onboardingCompleted: true
      };
      setUser(updatedUser);
      localStorage.setItem('untaxable-user', JSON.stringify(updatedUser));
    }
  };

  const startSubscription = () => {
    setHasAnonymousSubscription(true);
    localStorage.setItem('untaxable-subscription', 'true');
    toast.success("Subscription activated!");
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
