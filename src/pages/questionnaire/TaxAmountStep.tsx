
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import CurrencyIcon from './CurrencyIcon';
import { QuestionnaireData } from '@/types/questionnaire';

interface TaxAmountStepProps {
  data: QuestionnaireData;
  updateData: (key: keyof QuestionnaireData, value: string) => void;
  onNext: () => void;
}

const TaxAmountStep: React.FC<TaxAmountStepProps> = ({ data, updateData, onNext }) => {
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
      
      <RadioGroup
        value={data.taxAmount}
        onValueChange={(value) => updateData('taxAmount', value)}
        className="space-y-3"
      >
        {['Under $5,000', '$5K - $15K', '$15K - $50K', '$50K - $100K', 'Over $100K'].map((option) => (
          <div key={option} className="flex items-center space-x-2 border rounded-lg p-4">
            <RadioGroupItem value={option} id={`tax-${option}`} className="border-2" />
            <Label htmlFor={`tax-${option}`} className="flex-1 cursor-pointer font-normal">
              {option}
            </Label>
          </div>
        ))}
      </RadioGroup>
      
      <div className="mt-auto pt-6">
        <Button 
          onClick={onNext} 
          disabled={!data.taxAmount}
          className="w-full py-6 bg-brand text-black hover:bg-brand/90"
        >
          Next <ArrowRight className="ml-1" size={16} />
        </Button>
      </div>
    </motion.div>
  );
};

export default TaxAmountStep;
