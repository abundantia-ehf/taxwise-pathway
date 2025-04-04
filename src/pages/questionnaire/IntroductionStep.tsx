
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Clock, Lock, Check } from 'lucide-react';
import ScrollingIcons from '@/components/questionnaire/ScrollingIcons';

interface IntroductionStepProps {
  onNext: () => void;
}

const IntroductionStep: React.FC<IntroductionStepProps> = ({ onNext }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center h-full py-8 px-4 text-center overflow-hidden"
    >
      <div className="space-y-4 max-w-md px-4 mb-6">
        <h1 className="text-lg font-headline">Let's start by understanding your current tax situation.</h1>
        <div className="flex items-center justify-center space-x-2 text-brand">
          <Clock className="h-4 w-4" />
          <span className="text-sm">Takes 1 minute</span>
        </div>
      </div>
      
      <ScrollingIcons />
      
      <div className="w-full max-w-md mt-6">
        <Button 
          onClick={onNext} 
          className="w-[90%] mx-auto py-6 bg-brand text-black hover:bg-brand/90"
        >
          Let's go <Check className="ml-1" size={16} />
        </Button>
        <div className="flex items-center justify-center mt-4 text-xs text-muted-foreground">
          <Lock className="h-3 w-3 mr-1" />
          <span>Your answers are anonymous</span>
        </div>
      </div>
    </motion.div>
  );
};

export default IntroductionStep;
