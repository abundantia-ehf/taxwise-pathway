import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useDragControls, PanInfo } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { OptimizedImage } from '@/components/ui/optimized-image';

const Start = () => {
  const [isPlatformIOS, setIsPlatformIOS] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isCardMinimized, setIsCardMinimized] = useState(false);
  const { isAuthenticated, loginWithGoogle, loginWithApple } = useAuth();
  const navigate = useNavigate();
  const dragControls = useDragControls();
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if user is already authenticated
    if (isAuthenticated) {
      navigate('/home');
      return;
    }

    // Detect iOS platforms
    const userAgent = window.navigator.userAgent.toLowerCase();
    setIsPlatformIOS(/iphone|ipad|ipod|macintosh/.test(userAgent));
    
    // Preload video
    const video = document.getElementById('bg-video') as HTMLVideoElement;
    if (video) {
      video.addEventListener('loadeddata', () => {
        setVideoLoaded(true);
      });
    }
  }, [isAuthenticated, navigate]);

  const handleAppleSignIn = async () => {
    try {
      await loginWithApple();
      // Redirect happens automatically on OAuth callback
    } catch (error) {
      console.error('Apple sign-in error:', error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle();
      // Redirect happens automatically on OAuth callback
    } catch (error) {
      console.error('Google sign-in error:', error);
    }
  };

  const handleEmailSignIn = () => {
    navigate('/signup');
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.y > 50) {
      setIsCardMinimized(true);
    } else if (info.offset.y < -50) {
      setIsCardMinimized(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      <div className="absolute inset-0 h-full w-full">
        <OptimizedImage
          src="https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=2960&auto=format&fit=crop"
          alt="Background Landscape"
          className="h-full w-full object-cover opacity-70"
        />
      </div>
      
      <motion.div 
        ref={cardRef}
        className="absolute bottom-0 left-0 right-0 rounded-t-3xl bg-black/30 backdrop-blur-[2px] border-2 border-white/20 p-6 pt-8"
        drag="y"
        dragControls={dragControls}
        dragConstraints={{ top: 0, bottom: 250 }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
        animate={{ 
          y: isCardMinimized ? 250 : 0,
          transition: { type: "spring", stiffness: 300, damping: 30 }
        }}
      >
        <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-white/20 rounded-full" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-col items-center"
        >
          <img 
            src="/lovable-uploads/b89fefba-9fdf-4996-a4e2-72b71b30db58.png" 
            alt="Untaxable Logo" 
            className="w-7 h-7 mb-8"
          />
          
          <div className="w-[90%] mx-auto space-y-4 mb-4">
            {isPlatformIOS && (
              <Button 
                className="w-full py-4 bg-brand text-black hover:bg-brand/90 shadow-md shadow-brand/20 font-sans flex items-center justify-center gap-2 border-3 border-white/20"
                onClick={handleAppleSignIn}
              >
                <div className="flex items-center justify-center w-5 h-5">
                  <svg viewBox="0 0 384 512" width="18" height="18" fill="currentColor">
                    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                  </svg>
                </div>
                Continue with Apple
              </Button>
            )}
            
            <Button 
              className="w-full py-4 bg-white text-black hover:bg-white/90 shadow-md shadow-white/20 font-sans flex items-center justify-center gap-2 border-3 border-white/20"
              onClick={handleGoogleSignIn}
            >
              <div className="flex items-center justify-center w-5 h-5">
                <svg viewBox="0 0 488 512" width="18" height="18">
                  <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" fill="currentColor"/>
                </svg>
              </div>
              Continue with Google
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full py-4 border-white/20 bg-white/5 text-white hover:bg-white/10 font-sans flex items-center justify-center gap-2 border-3"
              onClick={handleEmailSignIn}
            >
              <div className="flex items-center justify-center w-5 h-5">
                <Mail size={18} />
              </div>
              Continue with Email
            </Button>
          </div>
          
          <p className="w-3/4 mx-auto text-xs text-center text-white/50 mt-2 font-sans">
            By continuing, you agree to our Terms & Privacy Policy
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Start;
