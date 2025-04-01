
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
        className="flex flex-col min-h-screen bg-gradient-to-br from-black to-zinc-900"
      >
        <div className="container max-w-md mx-auto px-4 py-8 h-full flex flex-col">
          <div className="flex justify-center mt-4 mb-8">
            <OptimizedImage 
              src="/lovable-uploads/42dcb219-6a8e-4cb6-a62b-d2f8f0b622a6.png" 
              alt="Untaxable Logo" 
              className="w-12 h-12 object-cover rounded-lg"
            />
          </div>
          
          <div className="flex flex-col items-center mb-6">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Laurel />
              <p className="text-gray-500 text-sm">8,000+ customers</p>
              <Laurel />
            </div>
            
            <div className="flex items-center justify-center">
              {[...Array(5)].map((_, i) => (
                <svg 
                  key={i} 
                  width="14" 
                  height="14" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="text-gray-500 fill-gray-500"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
            </div>
          </div>
          
          <div className="flex-1 flex flex-col items-center justify-center">
            <h1 className="text-3xl font-headline font-bold mb-6 text-white text-center">
              Pay less tax, 
              <span className={cn(
                "border-b-4", 
                theme === 'greyscale' ? "border-gray-400" : "border-[#ea384c]"
              )}>
                legally
              </span>
            </h1>
            
            <p className="text-lg mb-8 text-white/80 text-center">
              Join thousands of users who have legally reduced their tax rate to 0%
            </p>
            
            <Button 
              onClick={handleContinue}
              disabled={isProcessing}
              className={cn(
                "w-full py-6 mt-8",
                theme === 'greyscale' 
                  ? "bg-gray-300 text-black hover:bg-gray-400" 
                  : "bg-brand text-black hover:bg-brand/90"
              )}
            >
              {isProcessing ? (
                <>Processing...</>
              ) : (
                <>Start 3-Day Free Trial <ArrowRight size={16} className="ml-1" /></>
              )}
            </Button>
          </div>
        </div>
      </motion.div>
    </MobileLayout>
  );
};

export default Paywall;
