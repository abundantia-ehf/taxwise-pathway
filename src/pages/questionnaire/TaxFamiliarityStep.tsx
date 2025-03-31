
import React from 'react';
import { motion } from 'framer-motion';
import { BadgeDollarSign } from 'lucide-react';
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
      
      <h2 className="text-xl font-headline">How familiar are you with legal low tax strategies?</h2>
      
      <div className="space-y-3 mt-6">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => handleSelect(option)}
            className={`w-full p-4 text-left bg-gray-100 text-black border-2 border-gray-700 rounded-lg shadow-[4px_4px_0_0_rgba(209,255,130,0.8)] transition-all hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0_0_rgba(209,255,130,0.8)] ${
              data.taxFamiliarity === option ? 'border-brand bg-brand/10' : 'border-gray-700'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default TaxFamiliarityStep;
