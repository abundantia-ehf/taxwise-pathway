
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
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-brand/5 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-brand/5 blur-3xl"></div>
      
      <div className="container max-w-md mx-auto px-4 py-8 relative z-10">
        <div className="flex justify-center mb-8 mt-6">
          <OptimizedImage 
            src="/lovable-uploads/ab7cc816-8efa-4231-89af-0b746310b854.png" 
            alt="Untaxable Logo" 
            className="h-8 object-contain"
          />
        </div>
        
        <h1 className="text-2xl sm:text-3xl font-headline font-bold text-center mb-4 whitespace-nowrap">
          Start your free 3-day trial
        </h1>
        
        <p className="text-center text-white/80 mb-6 text-sm">
          <span className="font-bold">Get full access to Untaxable</span> including 1-on-1 support from Untaxable's tax pros, full tax mitigation training, and global tax databases. <span className="font-bold">Pay nothing now.</span>
        </p>
        
        <div className="grid grid-cols-2 gap-4 mb-2">
          <div 
            className={cn(
              "rounded-lg p-4 flex flex-col items-center cursor-pointer transition-all",
              selectedPlan === 'monthly' 
                ? "bg-gradient-to-tl from-[#0EA5E9] via-[#D1FF82] to-[#D1FF82] shadow-md" 
                : "bg-white/5"
            )}
            onClick={() => setSelectedPlan('monthly')}
          >
            <span className={cn(
              "text-xs font-semibold mb-1",
              selectedPlan === 'monthly' ? "text-black" : "text-white/80"
            )}>MONTHLY</span>
            <div className={cn(
              "text-2xl font-bold",
              selectedPlan === 'monthly' ? "text-black" : "text-white"
            )}>
              <span className="text-sm align-baseline">US$</span>44.99<span className="text-sm align-baseline">/mo</span>
            </div>
          </div>
          
          <div 
            className={cn(
              "rounded-lg p-4 flex flex-col items-center cursor-pointer transition-all relative",
              selectedPlan === 'yearly' 
                ? "bg-gradient-to-bl from-[#0EA5E9] via-[#D1FF82] to-[#D1FF82] shadow-md" 
                : "bg-white/5"
            )}
            onClick={() => setSelectedPlan('yearly')}
          >
            <div className={cn(
              "absolute -top-3 left-1/2 transform -translate-x-1/2 bg-black px-4 py-1 rounded text-xs font-bold text-white whitespace-nowrap",
              selectedPlan === 'yearly' ? "border border-brand" : ""
            )}>
              SAVE 65%
            </div>
            <span className={cn(
              "text-xs font-semibold mb-1",
              selectedPlan === 'yearly' ? "text-black" : "text-white/80"
            )}>YEARLY</span>
            <div className={cn(
              "text-2xl font-bold",
              selectedPlan === 'yearly' ? "text-black" : "text-white"
            )}>
              <span className="text-sm align-baseline">US$</span>188.95<span className="text-sm align-baseline">/yr</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="flex justify-center">
            <span className={cn(
              "text-xs",
              selectedPlan === 'monthly' ? "text-white" : "text-gray-400"
            )}>Basic plan</span>
          </div>
          
          <div className="flex justify-center">
            <span className={cn(
              "text-xs",
              selectedPlan === 'yearly' ? "text-white" : "text-gray-400"
            )}>Just $15.75 per month!</span>
          </div>
        </div>
        
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
        
        <div className="flex items-center justify-center gap-2 mt-4 mb-6 text-white/70 text-sm">
          <ShieldCheck className="h-4 w-4" />
          <p>Cancel anytime. 24/7 support.</p>
        </div>
        
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
