
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Star, Flag } from 'lucide-react';
import MobileLayout from '@/components/layout/MobileLayout';

const PaywallScreen = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    // Will be updated with Superwall/payment integration in the future
    navigate('/subscribe');
  };

  return (
    <MobileLayout hideNavigation>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col h-full"
      >
        {/* Top section with blue background */}
        <div className="bg-blue-500 px-6 py-8 pb-20">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 bg-brand rounded-lg"></div>
          </div>
          
          {/* Main headline */}
          <div className="text-center text-white mb-4">
            <h1 className="text-3xl font-bold mb-3">Pay less tax, legally</h1>
            <p className="text-lg">
              Join thousands of users who have legally reduced their tax rate, often to 0%
            </p>
          </div>
          
          {/* Testimonial card */}
          <div className="bg-white rounded-xl p-5 shadow-lg">
            <p className="text-gray-700 mb-3">
              "Almost all our business is global and outside Australia's borders, yet we've been paying 30% of our profits to the ATO for nearly half a decade. Now, we're paying zero tax anywhere. Payroll tax for our employees is the only thing we really have to cover now."
            </p>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="font-medium">Anna R.</span>
                <span className="ml-1">🇦🇺</span>
              </div>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom section with white background */}
        <div className="bg-white rounded-t-3xl -mt-10 px-6 py-8 flex-1 flex flex-col">
          {/* Pro badge */}
          <div className="flex justify-center mb-4">
            <div className="bg-[#1A1F2C] text-white px-4 py-1 rounded-full text-sm font-semibold">
              UNTAXABLE PRO
            </div>
          </div>
          
          {/* Offer details */}
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold mb-2">
              Personalized, actionable advice from tax mitigation pros
            </h2>
            <p className="text-gray-600 mb-4">
              Make a low-tax or no-tax life a reality in two weeks or less
            </p>
            <p className="font-medium">
              3 day free trial, then just <span className="text-blue-500">$48.50 US$/month</span>
            </p>
          </div>
          
          {/* Spacer to push button to bottom */}
          <div className="flex-grow"></div>
          
          {/* Action button */}
          <Button 
            onClick={handleContinue}
            className="w-full py-6 bg-blue-500 hover:bg-blue-600 text-white"
          >
            Continue →
          </Button>
        </div>
      </motion.div>
    </MobileLayout>
  );
};

export default PaywallScreen;
