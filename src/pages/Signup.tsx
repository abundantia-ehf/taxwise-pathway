
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '@/components/layout/MobileLayout';
import Header from '@/components/layout/Header';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signup, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if already authenticated
    if (isAuthenticated) {
      navigate('/welcome');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await signup(email, password, name);
      navigate('/welcome');
    } catch (error) {
      console.error('Signup error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-zinc-900 text-white">
      <div className="container max-w-md mx-auto px-6 py-4 h-screen relative">
        <Button 
          variant="ghost" 
          className="absolute top-4 left-4 p-2 text-white"
          onClick={() => navigate('/start')}
        >
          <ArrowLeft size={20} />
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="h-full flex flex-col justify-center py-10"
        >
          <div className="space-y-1 text-center mb-8">
            <h1 className="text-2xl font-bold">Create your account</h1>
            <p className="text-sm text-white/70">Enter your information to get started</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Full Name
              </label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <p className="text-xs text-white/50">
                Password must be at least 8 characters
              </p>
            </div>
            
            <Button 
              type="submit" 
              className="w-full py-6 h-auto mt-4 bg-brand text-black hover:bg-brand/90 shadow-md shadow-brand/20 font-medium"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating account...' : 'Create Account'}
            </Button>
            
            <p className="text-center text-sm mt-4">
              Already have an account?{' '}
              <Button 
                variant="link" 
                className="p-0 h-auto text-brand"
                onClick={() => navigate('/login')}
              >
                Log in
              </Button>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
