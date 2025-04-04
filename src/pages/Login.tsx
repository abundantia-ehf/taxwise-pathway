
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { OptimizedImage } from '@/components/ui/optimized-image';

const Login = () => {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPlatformIOS, setIsPlatformIOS] = useState(false);
  const { login, loginWithGoogle, loginWithApple, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if already authenticated
    if (isAuthenticated) {
      navigate('/learn');
      return;
    }

    // Detect iOS platforms
    const userAgent = window.navigator.userAgent.toLowerCase();
    setIsPlatformIOS(/iphone|ipad|ipod|macintosh/.test(userAgent));
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await login(email, password);
      // Auth context will handle the redirect
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAppleSignIn = async () => {
    try {
      await loginWithApple();
      // Redirect is handled by OAuth flow
    } catch (error) {
      console.error('Apple sign-in error:', error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle();
      // Redirect is handled by OAuth flow
    } catch (error) {
      console.error('Google sign-in error:', error);
    }
  };

  const handleEmailSignIn = () => {
    // Show email form
    setShowEmailForm(true);
  };

  const handleBackToOptions = () => {
    setShowEmailForm(false);
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
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <OptimizedImage 
              src="/lovable-uploads/b492b9f7-2571-45ef-a009-d49288cfb9d5.png" 
              alt="Untaxable Logo" 
              className="h-auto w-[15%] mt-6"
            />
          </div>
          
          {showEmailForm ? (
            <>
              <Button 
                variant="ghost" 
                className="absolute top-4 left-4 p-2"
                onClick={handleBackToOptions}
              >
                <ArrowLeft size={20} />
              </Button>
              
              <div className="flex-1 flex flex-col justify-center">
                <h3 className="text-xl font-bold text-center mb-6">Log in with Email</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
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
                      placeholder="Your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full py-6 h-auto bg-brand text-black hover:bg-brand/90 shadow-md shadow-brand/20 font-medium"
                    disabled={isSubmitting || isLoading}
                  >
                    {isSubmitting || isLoading ? 'Logging in...' : 'Log in'}
                  </Button>
                  
                  <p className="text-center text-sm">
                    Don't have an account?{' '}
                    <Button 
                      variant="link" 
                      className="p-0 h-auto text-brand"
                      onClick={() => navigate('/signup')}
                    >
                      Sign up
                    </Button>
                  </p>
                </form>
              </div>
            </>
          ) : (
            <>
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
                  <h3 className="text-xl font-unitext font-bold mb-1">Welcome back.</h3>
                  <p className="text-sm text-white/70">Log in to continue your journey</p>
                </div>
                
                <div className="space-y-3">
                  {isPlatformIOS && (
                    <Button 
                      className="w-full py-4 bg-brand text-black hover:bg-brand/90 shadow-md shadow-brand/20 font-medium flex items-center justify-center gap-2"
                      onClick={handleAppleSignIn}
                      disabled={isLoading}
                    >
                      <svg viewBox="0 0 384 512" width="16" height="16" fill="currentColor">
                        <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                      </svg>
                      Continue with Apple
                    </Button>
                  )}
                  
                  <Button 
                    className="w-full py-4 bg-white text-black hover:bg-white/90 shadow-md shadow-white/20 font-medium flex items-center justify-center gap-2"
                    onClick={handleGoogleSignIn}
                    disabled={isLoading}
                  >
                    <svg viewBox="0 0 488 512" width="16" height="16">
                      <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" fill="currentColor"/>
                    </svg>
                    Continue with Google
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full py-4 border-white/10 bg-white/5 text-white hover:bg-white/10 font-medium flex items-center justify-center gap-2"
                    onClick={handleEmailSignIn}
                    disabled={isLoading}
                  >
                    <Mail size={16} />
                    Continue with Email
                  </Button>
                </div>
                
                <p className="text-center text-sm">
                  Don't have an account?{' '}
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-brand"
                    onClick={() => navigate('/signup')}
                  >
                    Sign up
                  </Button>
                </p>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
