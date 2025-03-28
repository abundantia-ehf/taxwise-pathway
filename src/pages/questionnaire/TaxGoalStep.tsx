
import React from 'react';
import { motion } from 'framer-motion';
import { FileText, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { QuestionnaireData } from '@/types/questionnaire';

interface TaxGoalStepProps {
  data: QuestionnaireData;
  updateData: (key: keyof QuestionnaireData, value: string) => void;
  onNext: () => void;
}

const TaxGoalStep: React.FC<TaxGoalStepProps> = ({ data, updateData, onNext }) => {
  const options = [
    'Reduce personal income tax',
    'Reduce business taxes',
    'International tax planning',
    'Investment tax strategies',
    'All of the above'
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col h-full px-6 py-8"
    >
      <div className="flex justify-center mb-6">
        <FileText className="h-10 w-10 text-brand" />
      </div>
      
      <h2 className="text-xl font-semibold mb-6">What is your primary goal with legal tax optimization?</h2>
      
      <div className="flex-1 overflow-y-auto">
        <RadioGroup
          value={data.taxGoal}
          onValueChange={(value) => updateData('taxGoal', value)}
          className="space-y-2 mb-6"
        >
          {options.map((option) => (
            <div key={option} className="flex items-center space-x-2 border rounded-lg p-3">
              <RadioGroupItem value={option} id={`taxgoal-${option}`} className="border-2" />
              <Label htmlFor={`taxgoal-${option}`} className="flex-1 cursor-pointer font-normal">
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      
      <div className="mt-6 pt-4">
        <Button 
          onClick={onNext} 
          disabled={!data.taxGoal}
          className="w-full py-6 bg-brand text-black hover:bg-brand/90"
        >
          Continue <ArrowRight className="ml-1" size={16} />
        </Button>
      </div>
    </motion.div>
  );
};

export default TaxGoalStep;
