
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import MobileLayout from '@/components/layout/MobileLayout';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';
import { toast } from "sonner";
import { OptimizedImage } from '@/components/ui/optimized-image';

const Paywall = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const { hasSubscription, startSubscription, isAuthenticated } = useAuth();
  const { theme } = useTheme();

  React.useEffect(() => {
    if (isAuthenticated && hasSubscription) {
      navigate('/home');
    }
  }, [isAuthenticated, hasSubscription, navigate]);

  const handleContinue = () => {
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
  };

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
        className="flex flex-col items-center justify-center h-screen overflow-hidden bg-gradient-to-br from-black to-zinc-900"
      >
        <div className="container max-w-md mx-auto px-4 flex flex-col justify-between items-center h-full py-4">
          <div className="flex flex-col items-center w-full">
            <div className="flex justify-center mb-4">
              <OptimizedImage 
                src="/lovable-uploads/42dcb219-6a8e-4cb6-a62b-d2f8f0b622a6.png" 
                alt="Untaxable Logo" 
                className="w-10 h-10 object-cover rounded-lg"
              />
            </div>
            
            <div className="flex flex-col items-center mb-2">
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
            
            <div className="flex flex-col items-center">
              <h1 className="text-2xl font-headline font-bold mb-4 text-white text-center">
                Pay zero tax, 
                <span className={cn(
                  "border-b-4", 
                  theme === 'greyscale' ? "border-gray-400" : "border-[#ea384c]"
                )}>
                  legally
                </span>
              </h1>
              
              <p className="text-base mb-6 text-white/80 text-center">
                Join thousands of users who have legally reduced their tax rate to 0%.
              </p>
              
              {/* Testimonial with equal spacing above and below */}
              <div className="mb-6 px-3 py-3 bg-white/5 rounded-lg border border-white/10 max-w-[90%]">
                <p className="text-white/90 text-sm text-center italic">
                  "One of the best investments I've ever made. I've increased my income by five figures, just by paying less tax."
                </p>
                <p className="text-white/70 text-center text-xs mt-1">
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
              </div>
            </div>
          </div>
          
          {/* Button positioned at the bottom of the page */}
          <div className="w-full mb-2">
            <Button 
              onClick={handleContinue}
              disabled={isProcessing}
              className={cn(
                "w-full py-3 font-medium text-base",
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
                  <ArrowRight size={30} className="ml-2 animate-[pulse_1.5s_ease-in-out_infinite]" />
                </>
              )}
            </Button>
          </div>
        </div>
      </motion.div>
    </MobileLayout>
  );
};

export default Paywall;
