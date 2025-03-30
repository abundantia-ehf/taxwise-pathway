
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface ProgressHeaderProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressHeader: React.FC<ProgressHeaderProps> = ({ currentStep, totalSteps }) => {
  // Calculate progress percentage - now ensuring it maxes at 100%
  const progress = Math.min(((currentStep) / totalSteps) * 100, 100);

  return (
    <div className="p-4 bg-black border-b">
      <div className="h-4 w-full bg-secondary/30 relative overflow-hidden rounded-full">
        {/* Hazard stripes in the background - with closer lines */}
        <div className="absolute inset-0 w-full h-full" 
          style={{ 
            backgroundImage: 'repeating-linear-gradient(45deg, #2a2a2a 0px, #2a2a2a 5px, #1a1a1a 5px, #1a1a1a 10px)',
            backgroundSize: '14px 14px'
          }}>
        </div>
        {/* Progress bar */}
        <div className="h-full bg-brand relative z-10" style={{ width: `${progress}%` }} />
      </div>
      <div className="flex justify-between mt-2 text-sm text-muted-foreground">
        <span>Question {currentStep} of {totalSteps}</span>
      </div>
    </div>
  );
};

export default ProgressHeader;
