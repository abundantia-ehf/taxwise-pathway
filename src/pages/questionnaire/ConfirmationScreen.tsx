
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Handshake, ArrowDown, PartyPopper } from 'lucide-react';
import MobileLayout from '@/components/layout/MobileLayout';
import '@/styles/customAnimations.css';

const ConfirmationScreen = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    // Navigate to the tax rate screen
    navigate('/questionnaire/tax-rate');
  };

  return (
    <MobileLayout hideNavigation>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col h-full"
      >
        <div className="flex flex-col h-full px-6 py-8 justify-center">
          {/* Party popper icon that pulses instead of the image - now smaller */}
          <div className="flex justify-center mb-6">
            <div className="animate-pulse" style={{ animationDuration: '1.5s' }}>
              <PartyPopper className="w-16 h-16 text-brand" />
            </div>
          </div>
          
          {/* Message based on questionnaire answers */}
          <div className="text-center mb-8">
            <h2 className="text-xl font-headline font-semibold mb-3">We've Analyzed Your Answers</h2>
            <p className="text-lg">
              Based on your answers, there is a strong indication you could save a significant amount of money each year on taxes.
            </p>
          </div>
          
          {/* Bouncing downward arrow */}
          <div className="flex justify-center mb-8">
            <ArrowDown className="text-brand animate-bounce-slow" size={42} />
          </div>
          
          {/* Action button */}
          <div className="mt-4">
            <Button 
              onClick={handleContinue}
              className="w-full py-6 bg-brand text-black hover:bg-brand/90"
            >
              Let's fix that together <Handshake className="ml-2" size={20} />
            </Button>
          </div>
        </div>
      </motion.div>
    </MobileLayout>
  );
};

export default ConfirmationScreen;
