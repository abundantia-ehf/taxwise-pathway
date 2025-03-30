
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Clock, Lock, Check } from 'lucide-react';
import TaxDocument from '@/components/icons/TaxDocument';

interface IntroductionStepProps {
  onNext: () => void;
}

const IntroductionStep: React.FC<IntroductionStepProps> = ({ onNext }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-between h-full py-8 px-4 text-center overflow-hidden"
    >
      <div className="flex-1 max-h-24 flex items-center justify-center">
        <TaxDocument size={48} className="text-brand" />
      </div>
      
      <div className="space-y-4 max-w-md px-4">
        <h1 className="text-lg font-headline">Let's start by understanding your current tax situation.</h1>
        <div className="flex items-center justify-center space-x-2 text-brand">
          <Clock className="h-4 w-4" />
          <span className="text-sm">Takes 1 minute</span>
        </div>
      </div>
      
      <div className="flex-1" />
      
      <div className="w-full max-w-md mt-4">
        <Button 
          onClick={onNext} 
          className="w-[81%] mx-auto py-6 bg-brand text-black hover:bg-brand/90"
        >
          Got it <Check className="ml-1" size={16} />
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
