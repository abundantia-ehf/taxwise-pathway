
import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Landmark, Home, BarChart4, Wallet, Ban, Coins } from 'lucide-react';
import { QuestionnaireData } from '@/types/questionnaire';

interface InvestmentIncomeStepProps {
  data: QuestionnaireData;
  updateData: (key: keyof QuestionnaireData, value: string) => void;
  onNext: () => void;
}

const InvestmentIncomeStep: React.FC<InvestmentIncomeStepProps> = ({ data, updateData, onNext }) => {
  const options = [
    { value: 'None', icon: <Ban className="h-6 w-6" /> },
    { value: '5% or less', icon: <BarChart4 className="h-6 w-6" /> },
    { value: 'Less than half', icon: <Home className="h-6 w-6" /> },
    { value: 'More than half', icon: <Landmark className="h-6 w-6" /> },
    { value: 'All of it', icon: <Wallet className="h-6 w-6" /> }
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
        <Coins className="h-10 w-10 text-brand" />
      </div>
      
      <h2 className="text-xl font-headline font-semibold mb-6">How much of your income comes from investments?</h2>
      
      <div className="space-y-3">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => handleSelect(option.value)}
            className={`w-full p-4 text-left bg-gray-100 text-black border-2 rounded-lg shadow-[4px_4px_0_0_rgba(209,255,130,0.8)] transition-all hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0_0_rgba(209,255,130,0.8)] ${
              data.investmentIncome === option.value ? 'border-brand bg-brand/10' : 'border-[#999]'
            }`}
          >
            <div className="flex items-center">
              <div className="mr-3 text-brand">
                {option.icon}
              </div>
              <span>{option.value}</span>
            </div>
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default InvestmentIncomeStep;
