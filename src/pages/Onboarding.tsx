import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '@/components/layout/MobileLayout';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface Question {
  id: number;
  question: string;
  options: string[];
}

const questions: Question[] = [
  {
    id: 1,
    question: "What is your primary goal with tax optimization?",
    options: [
      "Reduce personal income tax",
      "Optimize business taxes",
      "International tax planning",
      "Investment tax strategies",
      "All of the above"
    ]
  },
  {
    id: 2,
    question: "What is your current annual income?",
    options: [
      "Under $50,000",
      "$50,000 - $100,000",
      "$100,000 - $250,000",
      "$250,000 - $500,000",
      "Over $500,000"
    ]
  },
  {
    id: 3,
    question: "What is your employment status?",
    options: [
      "W-2 Employee",
      "Self-employed/Freelancer",
      "Business owner (LLC/S-Corp)",
      "Business owner (C-Corp)",
      "Multiple income sources"
    ]
  },
  {
    id: 4,
    question: "What's your experience level with tax planning?",
    options: [
      "Complete beginner",
      "Some basic knowledge",
      "Intermediate understanding",
      "Advanced knowledge",
      "Professional experience"
    ]
  },
  {
    id: 5,
    question: "Do you currently have any of these?",
    options: [
      "Real estate investments",
      "Stock market investments",
      "Retirement accounts (401k, IRA, etc.)",
      "Business entities",
      "None of the above"
    ]
  },
  {
    id: 6,
    question: "What aspect of tax planning interests you most?",
    options: [
      "Legal tax avoidance strategies",
      "Business deductions",
      "Investment tax planning",
      "Retirement tax planning",
      "International tax strategies"
    ]
  }
];

const Onboarding = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const navigate = useNavigate();
  const { completeOnboarding } = useAuth();
  
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  
  const handleNext = () => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: selectedOption!
    });
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      completeOnboarding();
      navigate('/subscribe');
    }
  };

  return (
    <MobileLayout hideNavigation>
      <div className="flex flex-col min-h-screen">
        <div className="p-4 border-b bg-black">
          <div className="w-full flex justify-center mb-4">
            <img 
              src="/lovable-uploads/e59d93a8-9521-40fd-b709-37eae4b6f67e.png" 
              alt="Untaxable Logo" 
              className="h-12 object-contain"
            />
          </div>
          
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
            <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
        </div>
        
        <div className="flex-1 p-6">
          <h2 className="text-xl font-semibold mb-6">{currentQuestion.question}</h2>
          
          <RadioGroup
            value={selectedOption || ""}
            onValueChange={setSelectedOption}
            className="space-y-3"
          >
            {currentQuestion.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2 border rounded-lg p-4">
                <RadioGroupItem 
                  value={option} 
                  id={`option-${index}`}
                  className="border-2"
                />
                <Label 
                  htmlFor={`option-${index}`}
                  className="flex-1 cursor-pointer font-normal"
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        
        <div className="p-6 border-t">
          <Button
            onClick={handleNext}
            disabled={!selectedOption}
            className="w-full py-6 bg-brand text-black hover:bg-brand/90"
          >
            {currentQuestionIndex < questions.length - 1 ? 'Continue' : 'Complete'}
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Onboarding;
