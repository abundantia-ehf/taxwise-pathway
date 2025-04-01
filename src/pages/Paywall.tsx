
import React, { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';
import MobileLayout from '@/components/layout/MobileLayout';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';
import { toast } from "sonner";
import { OptimizedImage } from '@/components/ui/optimized-image';

const Paywall = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const { hasSubscription, startSubscription, isAuthenticated } = useAuth();
  const { theme } = useTheme();

  React.useEffect(() => {
    if (isAuthenticated && hasSubscription) {
      navigate('/home');
    }
  }, [isAuthenticated, hasSubscription, navigate]);

  useEffect(() => {
    // Preload video
    const video = document.createElement('video');
    video.src = '/start-background.mp4';
    video.muted = true;
    video.playsInline = true;
    video.onloadeddata = () => setIsVideoLoaded(true);
    video.load();
    
    return () => {
      video.onloadeddata = null;
    };
  }, []);

  const handleContinue = useCallback(() => {
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      startSubscription();
      
      if (!isAuthenticated) {
        navigate('/signup');
      } else {
        navigate('/home');
      }
      
      toast.success("Your free trial has started!");
    }, 2000);
  }, [isAuthenticated, navigate, startSubscription]);

  // Benefits list for the paywall
  const benefits = [
    "Access premium tax strategies",
    "Step-by-step guidance for implementation",
    "Regular updates on tax laws",
    "Full support from tax experts"
  ];

  const Laurel = ({ className }: { className?: string }) => (
    <div className={cn("text-gray-500", className)}>
      {"{"}{"}"} {/* Simple representation of laurel */}
    </div>
  );

  return (
    <MobileLayout hideNavigation>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-black"
      >
        {/* Background video with overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {isVideoLoaded && (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute object-cover w-full h-full opacity-30"
              src="/start-background.mp4"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/90" />
        </div>

        <div className="container relative z-10 max-w-md mx-auto px-4 py-8 flex flex-col h-full justify-center items-center">
          <div className="flex flex-col items-center w-full max-w-xs mx-auto">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center mb-8"
            >
              <OptimizedImage 
                src="/lovable-uploads/42dcb219-6a8e-4cb6-a62b-d2f8f0b622a6.png" 
                alt="Untaxable Logo" 
                className="w-20 h-20 object-cover rounded-lg"
              />
            </motion.div>
            
            <div className="flex flex-col items-center mb-6">
              <div className="flex items-center justify-center space-x-1">
                <Laurel />
                <p className="text-gray-500 text-xs">8,000+ customers</p>
                <Laurel />
              </div>
              
              <div className="flex items-center justify-center">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i} 
                    width="12" 
                    height="12" 
                    viewBox="0 0 24 24" 
                    fill="currentColor"
                    className="text-gray-500"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
            </div>
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col items-center"
            >
              <h1 className="text-3xl font-headline font-bold mb-4 text-white text-center">
                Pay zero tax, 
                <span className={cn(
                  "border-b-4", 
                  theme === 'greyscale' ? "border-gray-400" : "border-[#ea384c]"
                )}>
                  legally.
                </span>
              </h1>
              
              <p className="text-base mb-8 text-white/80 text-center">
                Join thousands of users who have legally reduced their tax rate to 0%.
              </p>
              
              {/* Testimonial - with increased spacing above and below */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mb-10 px-5 py-5 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 w-full"
              >
                <p className="text-white/90 text-center italic text-base leading-relaxed">
                  "One of the best investments I've ever made. I've increased my income by five figures, just by paying less tax."
                </p>
                <p className="text-white/70 text-center text-sm mt-2 font-medium">
                  — Rob Danilo 🇨🇦
                </p>
                <div className="flex items-center justify-center mt-1">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      width="12" 
                      height="12" 
                      viewBox="0 0 24 24" 
                      fill="currentColor"
                      className={theme === 'greyscale' ? "text-yellow-200" : "text-yellow-400"}
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
              </motion.div>
              
              {/* Benefits section */}
              <div className="w-full mb-10">
                <h3 className="text-white/90 font-medium text-center mb-4">What you'll get:</h3>
                <div className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="flex items-center"
                    >
                      <CheckCircle className={cn(
                        "h-5 w-5 mr-3 flex-shrink-0",
                        theme === 'greyscale' ? "text-gray-300" : "text-[#0EA5E9]"
                      )} />
                      <span className="text-white/80">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Button positioned at the bottom of the page */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="w-full max-w-xs mx-auto mb-4"
          >
            <Button 
              onClick={handleContinue}
              disabled={isProcessing}
              className={cn(
                "w-full py-4 font-semibold text-base shadow-lg",
                theme === 'greyscale' 
                  ? "bg-gray-300 text-black hover:bg-gray-400" 
                  : "bg-gradient-to-r from-[#0EA5E9] via-[#D1FF82] to-[#D1FF82] text-black hover:opacity-90"
              )}
            >
              {isProcessing ? (
                <>Processing...</>
              ) : (
                <>
                  Start My Free Trial 
                  <ArrowRight size={24} className="ml-2 animate-[pulse_1.5s_ease-in-out_infinite]" />
                </>
              )}
            </Button>
            
            <p className="text-center text-white/50 text-xs mt-4">
              Cancel anytime during your 3-day trial
            </p>
          </motion.div>
        </div>
      </motion.div>
    </MobileLayout>
  );
};

export default Paywall;
