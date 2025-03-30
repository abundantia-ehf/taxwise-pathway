
import React from 'react';
import { motion } from 'framer-motion';
import CurrencyIcon from './CurrencyIcon';
import { QuestionnaireData } from '@/types/questionnaire';

interface TaxAmountStepProps {
  data: QuestionnaireData;
  updateData: (key: keyof QuestionnaireData, value: string) => void;
  onNext: () => void;
}

const TaxAmountStep: React.FC<TaxAmountStepProps> = ({ data, updateData, onNext }) => {
  const handleSelect = (option: string) => {
    updateData('taxAmount', option);
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
        <CurrencyIcon />
      </div>
      
      <h2 className="text-xl font-headline font-semibold mb-6">How much did you pay in taxes last year?</h2>
      
      <div className="space-y-3">
        {['Under $5,000', '$5K - $15K', '$15K - $50K', '$50K - $100K', 'Over $100K'].map((option) => (
          <button
            key={option}
            onClick={() => handleSelect(option)}
            className={`w-full p-4 text-left bg-white text-black border rounded-lg shadow-[4px_4px_0_0_rgba(209,255,130,0.8)] transition-all hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0_0_rgba(209,255,130,0.8)] ${
              data.taxAmount === option ? 'border-brand bg-brand/10' : 'border-gray-200'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default TaxAmountStep;
