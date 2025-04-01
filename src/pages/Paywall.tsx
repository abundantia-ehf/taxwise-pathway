
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Star, ArrowRight, RefreshCw } from 'lucide-react';
import MobileLayout from '@/components/layout/MobileLayout';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';
import { toast } from "sonner";
import { OptimizedImage } from '@/components/ui/optimized-image';

const Paywall = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const { hasSubscription, startSubscription } = useAuth();
  const { theme } = useTheme();

  // If user already has a subscription, redirect to home
  React.useEffect(() => {
    if (hasSubscription) {
      navigate('/home');
    }
  }, [hasSubscription, navigate]);

  const handleContinue = () => {
    setIsProcessing(true);
    
    // Simulate subscription process
    setTimeout(() => {
      setIsProcessing(false);
      // Would integrate with Superwall/Stripe here
      startSubscription();
      navigate('/home');
      toast.success("Your free trial has started!");
    }, 2000);
  };

  const handleRestorePurchase = () => {
    setIsRestoring(true);
    
    // Simulate restore process
    setTimeout(() => {
      setIsRestoring(false);
      
      // This would typically check with the payment provider if the user has an active subscription
      const hasExistingSubscription = Math.random() > 0.5;
      
      if (hasExistingSubscription) {
        startSubscription();
        navigate('/home');
        toast.success("Your subscription has been restored!");
      } else {
        toast.error("No previous subscription found.");
      }
    }, 2000);
  };

  // Laurel component for decoration
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
          {/* Logo */}
          <div className="flex justify-center mt-8 mb-12">
            <OptimizedImage 
              src="/lovable-uploads/42dcb219-6a8e-4cb6-a62b-d2f8f0b622a6.png" 
              alt="Untaxable Logo" 
              className="w-16 h-16 object-cover rounded-lg"
            />
          </div>
          
          {/* Customer count and stars with laurels */}
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-2">
              <Laurel />
              <p className="text-gray-500 text-sm">8,000+ customers</p>
              <Laurel />
            </div>
            
            <div className="flex items-center justify-center space-x-3">
              <Laurel />
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-gray-500 fill-gray-500" />
                ))}
              </div>
              <Laurel />
            </div>
          </div>
          
          {/* Main content */}
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
              Join thousands of users who have legally reduced their tax rate, often to 0%
            </p>
          </div>
          
          {/* Bottom section with subscription details */}
          <div className="bg-white rounded-t-3xl px-6 py-8">
            {/* Pro badge */}
            <div className="flex justify-center mb-3">
              <div className={cn(
                "px-4 flex items-center justify-center h-7 rounded-md text-xs font-semibold",
                theme === 'greyscale' ? "bg-gray-800 text-white" : "bg-[#1A1F2C] text-white"
              )}>
                UNTAXABLE PRO
              </div>
            </div>
            
            {/* Offer details */}
            <div className="text-center mb-6">
              <h2 className="text-lg font-headline font-semibold mb-2 text-gray-900">
                Get help from tax mitigation pros
              </h2>
              <p className="text-gray-800 text-sm mb-3">
                Make a low-tax life your reality in under two weeks
              </p>
              <p className="font-medium text-sm text-gray-900">
                3 day free trial, then just 
                <span className={cn(
                  "px-1 rounded font-bold",
                  theme === 'greyscale' ? "text-black bg-gray-300" : "text-black bg-brand"
                )}>
                  $48.50 US$/month
                </span>
              </p>
            </div>
            
            {/* Action button */}
            <Button 
              onClick={handleContinue}
              disabled={isProcessing || isRestoring}
              className={cn(
                "w-full py-6",
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
            
            {/* Restore purchase button */}
            <Button 
              onClick={handleRestorePurchase}
              disabled={isProcessing || isRestoring}
              variant="ghost" 
              className="mt-3 w-full"
            >
              {isRestoring ? (
                <>Checking subscription status...</>
              ) : (
                <>
                  <RefreshCw size={14} className="mr-1" />
                  Restore Purchase
                </>
              )}
            </Button>
            
            {/* No commitment text */}
            <p className="text-center text-gray-500 text-xs mt-2">
              No commitment, cancel any time.
            </p>
          </div>
        </div>
      </motion.div>
    </MobileLayout>
  );
};

export default Paywall;
