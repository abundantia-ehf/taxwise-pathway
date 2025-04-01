
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from "sonner";
import { ShieldCheck } from 'lucide-react';

const SubscriptionPlan = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { startSubscription } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleStartSubscription = () => {
    setIsProcessing(true);
    
    // Simulate subscription process
    setTimeout(() => {
      setIsProcessing(false);
      startSubscription();
      navigate('/learn');
      toast.success("Your free trial has started!");
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center min-h-screen bg-gradient-to-br from-black to-zinc-900 text-white overflow-hidden"
    >
      {/* Add subtle gradient elements similar to other pages */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-brand/5 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-brand/5 blur-3xl"></div>
      
      <div className="container max-w-md mx-auto px-4 py-8 relative z-10">
        {/* Logo */}
        <div className="flex justify-center mb-8 mt-6">
          <OptimizedImage 
            src="/lovable-uploads/ab7cc816-8efa-4231-89af-0b746310b854.png" 
            alt="Untaxable Logo" 
            className="h-8 object-contain"
          />
        </div>
        
        {/* Headline - Changed to be on one line */}
        <h1 className="text-2xl sm:text-3xl font-headline font-bold text-center mb-4 whitespace-nowrap">
          Start your free 3-day trial
        </h1>
        
        {/* Subheadline - Updated with smaller text size */}
        <p className="text-center text-white/80 mb-6 text-sm">
          <span className="font-bold">Get full access to Untaxable</span> including 1-on-1 support from Untaxable's tax pros, full tax mitigation training, and global tax databases. <span className="font-bold">Pay nothing now.</span>
        </p>
        
        {/* Redesigned stylized bar graph */}
        <div className="flex items-end justify-center space-x-12 mb-8 h-32">
          {/* First bar - Red with 3D effect */}
          <div className="flex flex-col items-center">
            <div className="w-24 bg-gradient-to-t from-[#c12d3d] to-[#ea384c] rounded-t-md h-28 flex items-center justify-center text-white font-bold text-xl shadow-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-white/10 rounded-t-md"></div>
              <span className="relative z-10">42.5%</span>
            </div>
          </div>
          
          {/* Second bar - Brand green */}
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center">
              <span className="text-xs text-white/60 -mb-1">possibly</span>
              <span className="text-xl font-bold">0%</span>
              <div className="w-24 bg-gradient-to-t from-brand/30 to-brand/10 rounded-t-md h-4 shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-white/5 rounded-t-md"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Pricing boxes container */}
        <div className="grid grid-cols-2 gap-4 mb-2">
          {/* Monthly plan - Updated styling for selected state with 2px border */}
          <div 
            className={cn(
              "rounded-lg p-4 flex flex-col items-center cursor-pointer transition-all",
              selectedPlan === 'monthly' 
                ? "border-2 border-brand bg-white shadow-md" 
                : "border border-white/20 bg-white/5"
            )}
            onClick={() => setSelectedPlan('monthly')}
          >
            <span className={cn(
              "text-xs font-semibold mb-1",
              selectedPlan === 'monthly' ? "text-gray-600" : "text-white/80"
            )}>MONTHLY</span>
            <div className={cn(
              "text-2xl font-bold",
              selectedPlan === 'monthly' ? "text-black" : "text-white"
            )}>$44.99</div>
          </div>
          
          {/* Yearly plan - Updated styling for selected state with 2px border */}
          <div 
            className={cn(
              "rounded-lg p-4 flex flex-col items-center cursor-pointer transition-all relative",
              selectedPlan === 'yearly' 
                ? "border-2 border-brand bg-white shadow-md" 
                : "border border-white/20 bg-white/5"
            )}
            onClick={() => setSelectedPlan('yearly')}
          >
            {/* Discount badge - Border only when selected */}
            <div className={cn(
              "absolute -top-3 left-1/2 transform -translate-x-1/2 bg-black px-4 py-1 rounded text-xs font-bold text-white whitespace-nowrap",
              selectedPlan === 'yearly' ? "border border-brand" : ""
            )}>
              SAVE 65%
            </div>
            <span className={cn(
              "text-xs font-semibold mb-1",
              selectedPlan === 'yearly' ? "text-gray-600" : "text-white/80"
            )}>YEARLY</span>
            <div className={cn(
              "text-2xl font-bold",
              selectedPlan === 'yearly' ? "text-black" : "text-white"
            )}>$188.95</div>
          </div>
        </div>
        
        {/* Plan descriptions underneath the boxes */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {/* Monthly plan description */}
          <div className="flex justify-center">
            <span className="text-xs text-gray-400">Basic plan</span>
          </div>
          
          {/* Yearly plan description */}
          <div className="flex justify-center">
            <span className="text-xs text-white">Just $15.75 per month!</span>
          </div>
        </div>
        
        {/* Subscribe button - using same styling as paywall button */}
        <Button 
          onClick={handleStartSubscription}
          disabled={isProcessing}
          className={cn(
            "w-full py-3 font-semibold text-base",
            theme === 'greyscale' 
              ? "bg-gray-300 text-black hover:bg-gray-400" 
              : "bg-gradient-to-r from-[#0EA5E9] via-[#D1FF82] to-[#D1FF82] text-black hover:opacity-90"
          )}
        >
          {isProcessing ? "Processing..." : "Let's Get Started"}
        </Button>
        
        {/* Cancel anytime text - Added shield-check icon */}
        <div className="flex items-center justify-center gap-2 mt-4 mb-6 text-white/70 text-sm">
          <ShieldCheck className="h-4 w-4" />
          <p>Cancel anytime. 24/7 support.</p>
        </div>
        
        {/* Terms and Privacy buttons */}
        <div className="flex justify-center gap-4">
          <Button variant="ghost" size="sm" className="text-white/60 hover:text-white text-xs">
            Terms of Use
          </Button>
          <Button variant="ghost" size="sm" className="text-white/60 hover:text-white text-xs">
            Privacy Policy
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default SubscriptionPlan;
