
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import MobileLayout from '@/components/layout/MobileLayout';
import { QuestionnaireData } from '@/types/questionnaire';

const TaxRateScreen = () => {
  const navigate = useNavigate();
  const [targetRate, setTargetRate] = useState<string>("0%");
  
  useEffect(() => {
    // Retrieve stored questionnaire data
    const storedData = localStorage.getItem('questionnaireData');
    if (storedData) {
      const data: QuestionnaireData = JSON.parse(storedData);
      // Set the target rate based on country selection
      setTargetRate(data.country === "United States" ? "10.5%" : "0%");
    }
  }, []);

  const handleContinue = () => {
    // Will be updated to navigate to the next screen in the future
    navigate('/onboarding');
  };

  return (
    <MobileLayout hideNavigation>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col h-full"
      >
        <div className="flex flex-col h-full px-6 py-8">
          {/* X symbol at the top */}
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 flex items-center justify-center rounded-full border-4 border-red-500">
              <X size={64} className="text-red-500" />
            </div>
          </div>
          
          {/* Message about tax rate reduction */}
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold mb-3">
              Based on your answers, we could get your tax rate down to
            </h2>
            <p className="text-4xl font-bold text-red-500">
              {targetRate}
            </p>
          </div>
          
          {/* Spacer to push the button to the bottom */}
          <div className="flex-grow"></div>
          
          {/* Action button */}
          <div className="mt-6">
            <Button 
              onClick={handleContinue}
              className="w-full py-6 bg-brand text-black hover:bg-brand/90"
            >
              Let's do it →
            </Button>
          </div>
        </div>
      </motion.div>
    </MobileLayout>
  );
};

export default TaxRateScreen;
