
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '@/components/layout/MobileLayout';
import Header from '@/components/layout/Header';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Apple, Mail } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await login(email, password);
      navigate('/learn');
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAppleSignIn = () => {
    // Implement Apple sign-in logic
    navigate('/onboarding');
  };

  const handleEmailSignIn = () => {
    // Show email form
    navigate('/signup');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-zinc-900 text-white">
      <div className="container max-w-md mx-auto px-6 py-4 h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="h-full flex flex-col justify-between"
        >
          {/* Logo - increased size by 50% */}
          <div className="flex justify-center mb-4">
            <img 
              src="/lovable-uploads/aa12aa21-fe26-4c35-8eed-2cad093d11f6.png" 
              alt="Untaxable Logo" 
              className="h-9" /* Changed from h-6 to h-9 (50% increase) */
            />
          </div>
          
          {/* Phone illustration */}
          <div className="flex items-center justify-center mb-4">
            <div className="relative w-40 h-[280px] rounded-3xl border-4 border-gray-800 bg-zinc-900 p-2 shadow-xl">
              <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-14 h-2 bg-black rounded-full"></div>
              <div className="h-full rounded-2xl overflow-hidden border border-gray-800">
                <div className="h-full w-full bg-gradient-to-br from-zinc-800 to-black flex items-center justify-center p-4">
                  <div className="text-center space-y-1">
                    <div className="w-12 h-12 mx-auto rounded-xl bg-black p-2">
                      <img 
                        src="/lovable-uploads/e59d93a8-9521-40fd-b709-37eae4b6f67e.png" 
                        alt="Untaxable Logo" 
                        className="w-full h-full object-cover rounded-md" 
                      />
                    </div>
                    <p className="text-xs text-white/70">Untaxable App</p>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gray-700 rounded-full"></div>
            </div>
          </div>
          
          {/* Text and buttons */}
          <div className="pb-4 space-y-4">
            <div className="text-center">
              <h3 className="text-xl font-unitext font-bold mb-1">You're on your way to 0%</h3>
              <p className="text-sm text-white/70">Create an account to continue</p>
            </div>
            
            <div className="space-y-3">
              <Button 
                className="w-full py-4 bg-brand text-black hover:bg-brand/90 shadow-md shadow-brand/20 font-medium flex items-center justify-center gap-2"
                onClick={handleAppleSignIn}
              >
                <Apple size={16} />
                Continue with Apple
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full py-4 border-white/10 bg-white/5 text-white hover:bg-white/10 font-medium flex items-center justify-center gap-2"
                onClick={handleEmailSignIn}
              >
                <Mail size={16} />
                Continue with Email
              </Button>
            </div>
            
            <p className="text-xs text-center text-white/50">
              By continuing, you agree to our Terms & Privacy Policy
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
