
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Handshake, ArrowDown } from 'lucide-react';
import MobileLayout from '@/components/layout/MobileLayout';

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
        <div className="flex flex-col h-full px-6 py-8">
          {/* Image in the top third */}
          <div className="flex justify-center mb-8">
            <img
              src="/lovable-uploads/e73d9bd8-ca64-4f6e-a2ae-6eaae61fdb07.png"
              alt="Tax Savings Illustration"
              className="w-48 h-48 object-contain"
            />
          </div>
          
          {/* Message based on questionnaire answers */}
          <div className="text-center mb-12">
            <h2 className="text-xl font-semibold mb-3">We've Analyzed Your Answers</h2>
            <p className="text-lg">
              Based on your answers, there is a strong indication you could save a significant amount of money each year on taxes.
            </p>
          </div>
          
          {/* Downward arrow (non-bouncing) */}
          <div className="flex justify-center mb-12">
            <ArrowDown className="text-brand" size={42} />
          </div>
          
          {/* Spacer to push the button to the bottom */}
          <div className="flex-grow"></div>
          
          {/* Action button */}
          <div className="mt-6">
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
