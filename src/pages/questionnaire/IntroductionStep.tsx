
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Clock, Lock, ArrowRight } from 'lucide-react';

interface IntroductionStepProps {
  onNext: () => void;
}

const IntroductionStep: React.FC<IntroductionStepProps> = ({ onNext }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-between h-full py-8 px-4 text-center"
    >
      <div className="flex-1" />
      
      <div className="space-y-6 max-w-md">
        <h1 className="text-2xl font-bold">Take the Untaxable survey so we can better serve you with a low-tax plan</h1>
        <p className="text-muted-foreground">Let's start by learning more about your situation.</p>
        <div className="flex items-center justify-center space-x-2 text-brand">
          <Clock className="h-5 w-5" />
          <span>Takes 1 minute</span>
        </div>
      </div>
      
      <div className="flex-1" />
      
      <div className="w-full max-w-md mt-4">
        <Button 
          onClick={onNext} 
          className="w-full py-6 bg-brand text-black hover:bg-brand/90"
        >
          Take the survey <ArrowRight className="ml-1" size={16} />
        </Button>
        <div className="flex items-center justify-center mt-4 text-xs text-muted-foreground">
          <Lock className="h-3 w-3 mr-1" />
          <span>Your answers are anonymous and will not be shared</span>
        </div>
      </div>
    </motion.div>
  );
};

export default IntroductionStep;
