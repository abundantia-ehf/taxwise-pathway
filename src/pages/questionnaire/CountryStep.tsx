
import React from 'react';
import { motion } from 'framer-motion';
import { Globe, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { countries, allOtherCountries } from './CountryData';
import { QuestionnaireData } from '@/types/questionnaire';

interface CountryStepProps {
  data: QuestionnaireData;
  updateData: (key: keyof QuestionnaireData, value: string) => void;
  onNext: () => void;
}

const CountryStep: React.FC<CountryStepProps> = ({ data, updateData, onNext }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col h-full px-6 py-8"
    >
      <div className="flex justify-center mb-6">
        <Globe className="h-10 w-10 text-brand" />
      </div>
      
      <h2 className="text-xl font-headline font-semibold mb-6">Where do you live?</h2>
      
      <div className="mb-6">
        <Select 
          onValueChange={(value) => updateData('country', value)}
          value={data.country}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select your country" />
          </SelectTrigger>
          <SelectContent>
            {/* Preferred countries first */}
            {countries.map((country) => (
              <SelectItem key={country} value={country}>{country}</SelectItem>
            ))}
            
            {/* Divider */}
            <div className="h-px my-2 bg-border" />
            
            {/* All other countries */}
            {allOtherCountries.map((country) => (
              <SelectItem key={country} value={country}>{country}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="mt-auto">
        <Button 
          onClick={onNext} 
          disabled={!data.country}
          className="w-full py-6 bg-brand text-black hover:bg-brand/90"
        >
          Next <ArrowRight className="ml-1" size={16} />
        </Button>
      </div>
    </motion.div>
  );
};

export default CountryStep;
