
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface ProgressHeaderProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressHeader: React.FC<ProgressHeaderProps> = ({ currentStep, totalSteps }) => {
  // Calculate progress percentage
  const progress = ((currentStep) / (totalSteps - 1)) * 100;

  return (
    <div className="p-4 bg-black border-b">
      <Progress value={progress} className="h-2" />
      <div className="flex justify-between mt-2 text-sm text-muted-foreground">
        <span>Question {currentStep} of {totalSteps - 1}</span>
        <span>{Math.round(progress)}% Complete</span>
      </div>
    </div>
  );
};

export default ProgressHeader;
