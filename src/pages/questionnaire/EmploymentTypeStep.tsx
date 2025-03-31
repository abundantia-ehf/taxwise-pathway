
import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import { QuestionnaireData } from '@/types/questionnaire';

interface EmploymentTypeStepProps {
  data: QuestionnaireData;
  updateData: (key: keyof QuestionnaireData, value: string) => void;
  onNext: () => void;
}

const EmploymentTypeStep: React.FC<EmploymentTypeStepProps> = ({ data, updateData, onNext }) => {
  const options = [
    'Employee',
    'Contractor',
    'Self-Employed',
    'Business Owner',
    'Investor',
    'Entrepreneur',
    'Multiple Income Sources'
  ];

  const handleSelect = (option: string) => {
    updateData('employmentType', option);
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
        <FileText className="h-10 w-10 text-brand" />
      </div>
      
      <h2 className="text-xl font-headline font-semibold mb-6">What best describes how you make money?</h2>
      
      <div className="space-y-3">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => handleSelect(option)}
            className={`w-full p-4 text-left bg-gray-100 text-black border rounded-lg shadow-[4px_4px_0_0_rgba(209,255,130,0.8)] transition-all hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0_0_rgba(209,255,130,0.8)] ${
              data.employmentType === option ? 'border-brand bg-brand/10' : 'border-gray-200'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default EmploymentTypeStep;
