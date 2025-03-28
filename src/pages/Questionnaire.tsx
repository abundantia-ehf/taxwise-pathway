
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '@/components/layout/MobileLayout';
import { QuestionnaireData } from '@/types/questionnaire';
import IntroductionStep from './questionnaire/IntroductionStep';
import CountryStep from './questionnaire/CountryStep';
import TaxAmountStep from './questionnaire/TaxAmountStep';
import ProgressHeader from './questionnaire/ProgressHeader';

const Questionnaire = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<QuestionnaireData>({});
  const navigate = useNavigate();
  
  // Total steps in the questionnaire
  const totalSteps = 3; // Introduction + 2 questions
  
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
        {step > 0 && <ProgressHeader currentStep={step} totalSteps={totalSteps} />}
        
        <div className="flex-1 p-6 flex flex-col">
          {step === 0 && <IntroductionStep onNext={handleNext} />}
          {step === 1 && <CountryStep data={data} updateData={updateData} onNext={handleNext} />}
          {step === 2 && <TaxAmountStep data={data} updateData={updateData} onNext={handleNext} />}
        </div>
      </div>
    </MobileLayout>
  );
};

export default Questionnaire;
