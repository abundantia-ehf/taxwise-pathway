
import React from 'react';
import { motion } from 'framer-motion';
import { BadgeDollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { QuestionnaireData } from '@/types/questionnaire';

interface TaxFamiliarityStepProps {
  data: QuestionnaireData;
  updateData: (key: keyof QuestionnaireData, value: string) => void;
  onNext: () => void;
}

const TaxFamiliarityStep: React.FC<TaxFamiliarityStepProps> = ({ data, updateData, onNext }) => {
  const options = [
    'Not at all',
    'Not very',
    'A little',
    'Significantly',
    'I\'m an expert'
  ];

  const handleSelect = (option: string) => {
    updateData('taxFamiliarity', option);
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
        <BadgeDollarSign className="h-10 w-10 text-brand" />
      </div>
      
      <h2 className="text-xl font-semibold mb-6">How familiar are you with legal low tax strategies?</h2>
      
      <div className="space-y-3">
        {options.map((option) => (
          <Button 
            key={option}
            variant="outline"
            className={`w-full py-6 text-left justify-start ${data.taxFamiliarity === option ? 'border-brand bg-brand/10' : ''}`}
            onClick={() => handleSelect(option)}
          >
            {option}
          </Button>
        ))}
      </div>
    </motion.div>
  );
};

export default TaxFamiliarityStep;
