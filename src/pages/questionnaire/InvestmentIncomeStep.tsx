
import React from 'react';
import { motion } from 'framer-motion';
import { CircleDollarSign } from 'lucide-react';
import { QuestionnaireData } from '@/types/questionnaire';

interface InvestmentIncomeStepProps {
  data: QuestionnaireData;
  updateData: (key: keyof QuestionnaireData, value: string) => void;
  onNext: () => void;
}

const InvestmentIncomeStep: React.FC<InvestmentIncomeStepProps> = ({ data, updateData, onNext }) => {
  const options = [
    '5% or less',
    'Less than half',
    'More than half',
    'All of it'
  ];

  const handleSelect = (option: string) => {
    updateData('investmentIncome', option);
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
        <CircleDollarSign className="h-10 w-10 text-brand" />
      </div>
      
      <h2 className="text-xl font-headline font-semibold mb-6">How much of your income comes from investments?</h2>
      
      <div className="space-y-3">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => handleSelect(option)}
            className={`w-full p-4 text-left bg-gray-100 text-black border-2 border-[#999] rounded-lg shadow-[4px_4px_0_0_rgba(209,255,130,0.8)] transition-all hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0_0_rgba(209,255,130,0.8)] ${
              data.investmentIncome === option ? 'border-brand bg-brand/10' : 'border-[#999]'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default InvestmentIncomeStep;
