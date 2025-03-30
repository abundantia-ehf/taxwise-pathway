
import React from 'react';
import { motion } from 'framer-motion';
import { Target } from 'lucide-react';
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

  const handleSelect = (option: string) => {
    updateData('taxGoal', option);
    // Automatically proceed to the next step
    onNext();
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col h-full px-6 py-8"
    >
      <div className="flex justify-center mb-6">
        <Target className="h-10 w-10 text-brand" />
      </div>
      
      <h2 className="text-xl font-headline font-semibold mb-6">What is your primary goal with legal tax optimization?</h2>
      
      <div className="space-y-3">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => handleSelect(option)}
            className={`w-full p-4 text-left bg-white border rounded-lg shadow-[0_4px_0_0_rgba(209,255,130,0.8)] transition-all hover:translate-y-[2px] hover:shadow-[0_2px_0_0_rgba(209,255,130,0.8)] ${
              data.taxGoal === option ? 'border-brand bg-brand/10' : 'border-gray-200'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default TaxGoalStep;
