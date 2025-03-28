
import React from 'react';
import { motion } from 'framer-motion';
import { FileText, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
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
    'Entrepreneur'
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
      
      <h2 className="text-xl font-semibold mb-6">What best describes how you make money?</h2>
      
      <RadioGroup
        value={data.employmentType}
        onValueChange={(value) => updateData('employmentType', value)}
        className="space-y-3"
      >
        {options.map((option) => (
          <div key={option} className="flex items-center space-x-2 border rounded-lg p-4">
            <RadioGroupItem value={option} id={`employment-${option}`} className="border-2" />
            <Label htmlFor={`employment-${option}`} className="flex-1 cursor-pointer font-normal">
              {option}
            </Label>
          </div>
        ))}
      </RadioGroup>
      
      <div className="mt-auto pt-6">
        <Button 
          onClick={onNext} 
          disabled={!data.employmentType}
          className="w-full py-6 bg-brand text-black hover:bg-brand/90"
        >
          Next <ArrowRight className="ml-1" size={16} />
        </Button>
      </div>
    </motion.div>
  );
};

export default EmploymentTypeStep;
