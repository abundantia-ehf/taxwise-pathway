
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import MobileLayout from '@/components/layout/MobileLayout';
import { QuestionnaireData } from '@/types/questionnaire';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

const TaxRateScreen = () => {
  const navigate = useNavigate();
  const [targetRate, setTargetRate] = useState<string>("0%");
  const { theme } = useTheme();
  
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
    // Navigate to the paywall screen
    navigate('/questionnaire/paywall');
  };

  return (
    <MobileLayout hideNavigation>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col h-full"
      >
        <div className="flex flex-col h-full px-6 py-8 justify-center">
          {/* X symbol at the top */}
          <div className="flex justify-center mb-12">
            <div className={cn(
              "w-24 h-24 flex items-center justify-center rounded-full border-4", 
              theme === 'greyscale' 
                ? "border-gray-500" 
                : "border-red-500"
            )}>
              <X size={64} className={theme === 'greyscale' ? "text-gray-500" : "text-red-500"} />
            </div>
          </div>
          
          {/* Message about tax rate reduction */}
          <div className="text-center mb-12">
            <h2 className="text-lg font-headline font-semibold mb-3">
              Based on your answers, you could get a legal tax rate of
            </h2>
            <p className={cn(
              "text-4xl font-headline font-semibold",
              theme === 'greyscale' ? "text-gray-300" : "text-red-500"
            )}>
              {targetRate}
            </p>
          </div>
          
          {/* Spacer to push the button to the bottom */}
          <div className="flex-grow"></div>
          
          {/* Action button */}
          <div className="mt-6">
            <Button 
              onClick={handleContinue}
              className={cn(
                "w-full py-6",
                theme === 'greyscale' 
                  ? "bg-gray-300 text-black hover:bg-gray-400" 
                  : "bg-brand text-black hover:bg-brand/90"
              )}
            >
              Let's do it <ArrowRight className="ml-1" size={16} />
            </Button>
          </div>
        </div>
      </motion.div>
    </MobileLayout>
  );
};

export default TaxRateScreen;
