
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from "sonner";

interface User {
  id: string;
  email: string;
  name?: string;
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
  logout: () => void;
  completeOnboarding: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data - would connect to backend service
  useEffect(() => {
    // Simulate loading user data
    const savedUser = localStorage.getItem('untaxable-user');
    
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
      // Mock login - would call an API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulated successful login response
      const mockUser: User = {
        id: '123',
        email,
        name: 'Demo User',
        subscription: {
          status: 'trial',
          startDate: new Date(),
          trialEndDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
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
      // Mock signup - would call an API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulated successful signup response
      const mockUser: User = {
        id: '123',
        email,
        name,
        subscription: {
          status: 'trial',
          startDate: new Date(),
          trialEndDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
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

  // Derive subscription status
  const hasSubscription = !!user?.subscription && (user.subscription.status === 'active' || user.subscription.status === 'trial');
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
        logout,
        completeOnboarding
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
