import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { 
  Clock, 
  Lock, 
  Globe, 
  DollarSign, 
  Euro, 
  PoundSterling, 
  ArrowRight,
  JapaneseYen,
  RussianRuble
} from 'lucide-react';
import MobileLayout from '@/components/layout/MobileLayout';

// Types for questionnaire data
interface QuestionnaireData {
  country?: string;
  taxAmount?: string;
}

// List of countries with preferred ones at the top
const countries = [
  "United States",
  "Canada",
  "Australia",
  "United Kingdom",
  "Ireland",
  "New Zealand",
  "Singapore",
  // All other countries will be rendered after a divider
];

// All countries in alphabetical order (excluding preferred ones)
const allOtherCountries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Austria", "Azerbaijan",
  "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia",
  "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon",
  "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba",
  "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea",
  "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia",
  "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras",
  "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Israel", "Italy", "Jamaica", "Japan",
  "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon",
  "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives",
  "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia",
  "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Nicaragua", "Niger",
  "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea",
  "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis",
  "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone",
  "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan",
  "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo",
  "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "Uruguay",
  "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

const CurrencyIcon = () => {
  const [currentIcon, setCurrentIcon] = useState(0);
  const icons = [
    <DollarSign key="dollar" className="h-10 w-10 text-brand" />,
    <Euro key="euro" className="h-10 w-10 text-brand" />,
    <PoundSterling key="pound" className="h-10 w-10 text-brand" />,
    <JapaneseYen key="yen" className="h-10 w-10 text-brand" />,
    <RussianRuble key="ruble" className="h-10 w-10 text-brand" />
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIcon((prev) => (prev + 1) % icons.length);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <motion.div
      key={currentIcon}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      {icons[currentIcon]}
    </motion.div>
  );
};

const Questionnaire = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<QuestionnaireData>({});
  const navigate = useNavigate();
  
  // Calculate progress percentage
  const totalSteps = 3; // Introduction + 2 questions
  const progress = ((step + 1) / totalSteps) * 100;
  
  const handleNext = () => {
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      // Save data to storage
      localStorage.setItem('questionnaireData', JSON.stringify(data));
      // Navigate to the next page in the flow (Onboarding for now)
      navigate('/onboarding');
    }
  };
  
  const updateData = (key: keyof QuestionnaireData, value: string) => {
    setData(prev => ({ ...prev, [key]: value }));
  };
  
  return (
    <MobileLayout hideNavigation>
      <div className="flex flex-col min-h-screen">
        {step > 0 && (
          <div className="p-4 bg-black border-b">
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between mt-2 text-sm text-muted-foreground">
              <span>Question {step} of {totalSteps - 1}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
          </div>
        )}
        
        <div className="flex-1 p-6 flex flex-col">
          {step === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-full space-y-8 text-center"
            >
              <h1 className="text-2xl font-bold">Take the Untaxable survey so we can better serve you with a low-tax plan</h1>
              <p className="text-muted-foreground">Let's start by learning more about your situation.</p>
              <div className="flex items-center space-x-2 text-brand">
                <Clock className="h-5 w-5" />
                <span>Takes 1 minute</span>
              </div>
              <div className="mt-auto w-full">
                <Button 
                  onClick={handleNext} 
                  className="w-full py-6 bg-brand text-black hover:bg-brand/90"
                >
                  Take the survey <ArrowRight className="ml-1" size={16} />
                </Button>
                <div className="flex items-center justify-center mt-4 text-xs text-muted-foreground">
                  <Lock className="h-3 w-3 mr-1" />
                  <span>Your answers are anonymous and will not be shared</span>
                </div>
              </div>
            </motion.div>
          )}
          
          {step === 1 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col h-full"
            >
              <div className="flex justify-center mb-6">
                <Globe className="h-10 w-10 text-brand" />
              </div>
              
              <h2 className="text-xl font-semibold mb-6">Where do you live?</h2>
              
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
                  onClick={handleNext} 
                  disabled={!data.country}
                  className="w-full py-6 bg-brand text-black hover:bg-brand/90"
                >
                  Next <ArrowRight className="ml-1" size={16} />
                </Button>
              </div>
            </motion.div>
          )}
          
          {step === 2 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col h-full"
            >
              <div className="flex justify-center mb-6">
                <CurrencyIcon />
              </div>
              
              <h2 className="text-xl font-semibold mb-6">How much did you pay in taxes last year?</h2>
              
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
                  onClick={handleNext} 
                  disabled={!data.taxAmount}
                  className="w-full py-6 bg-brand text-black hover:bg-brand/90"
                >
                  Next <ArrowRight className="ml-1" size={16} />
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </MobileLayout>
  );
};

export default Questionnaire;
