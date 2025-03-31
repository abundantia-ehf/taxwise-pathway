
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '@/components/layout/MobileLayout';
import { QuestionnaireData, QuestionnaireScreen } from '@/types/questionnaire';
import IntroductionStep from './questionnaire/IntroductionStep';
import CountryStep from './questionnaire/CountryStep';
import TaxAmountStep from './questionnaire/TaxAmountStep';
import EmploymentTypeStep from './questionnaire/EmploymentTypeStep';
import TaxFamiliarityStep from './questionnaire/TaxFamiliarityStep';
import InvestmentIncomeStep from './questionnaire/InvestmentIncomeStep';
import ForeignIncomeStep from './questionnaire/ForeignIncomeStep';
import TaxGoalStep from './questionnaire/TaxGoalStep';
import ProgressHeader from './questionnaire/ProgressHeader';

const Questionnaire = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<QuestionnaireData>({});
  const navigate = useNavigate();
  
  // Total number of questions (excluding introduction)
  const totalQuestions = 7;
  
  const handleNext = () => {
    if (step < QuestionnaireScreen.TaxGoal) {
      setStep(step + 1);
    } else {
      // Save data to storage
      localStorage.setItem('questionnaireData', JSON.stringify(data));
      // Navigate to the confirmation screen (now a separate route)
      navigate('/questionnaire/confirmation');
    }
  };
  
  const updateData = (key: keyof QuestionnaireData, value: string) => {
    setData(prev => ({ ...prev, [key]: value }));
  };
  
  return (
    <MobileLayout hideNavigation>
      <div className="flex flex-col h-screen">
        {step > 0 && step <= QuestionnaireScreen.TaxGoal && 
          <ProgressHeader currentStep={step} totalSteps={totalQuestions} />
        }
        
        <div className="flex-1 flex flex-col overflow-hidden">
          {step === QuestionnaireScreen.Introduction && <IntroductionStep onNext={handleNext} />}
          {step === QuestionnaireScreen.Country && <CountryStep data={data} updateData={updateData} onNext={handleNext} />}
          {step === QuestionnaireScreen.TaxAmount && <TaxAmountStep data={data} updateData={updateData} onNext={handleNext} />}
          {step === QuestionnaireScreen.EmploymentType && <EmploymentTypeStep data={data} updateData={updateData} onNext={handleNext} />}
          {step === QuestionnaireScreen.TaxFamiliarity && <TaxFamiliarityStep data={data} updateData={updateData} onNext={handleNext} />}
          {step === QuestionnaireScreen.InvestmentIncome && <InvestmentIncomeStep data={data} updateData={updateData} onNext={handleNext} />}
          {step === QuestionnaireScreen.ForeignIncome && <ForeignIncomeStep data={data} updateData={updateData} onNext={handleNext} />}
          {step === QuestionnaireScreen.TaxGoal && <TaxGoalStep data={data} updateData={updateData} onNext={handleNext} />}
        </div>
      </div>
    </MobileLayout>
  );
};

export default Questionnaire;
