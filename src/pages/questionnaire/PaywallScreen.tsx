
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
        {/* Top section with brand gradient background */}
        <div className="gradient-brand-subtle px-6 py-6 pb-16">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <img 
              src="/lovable-uploads/e59d93a8-9521-40fd-b709-37eae4b6f67e.png" 
              alt="Untaxable Logo" 
              className="w-12 h-12 object-cover rounded-lg"
            />
          </div>
          
          {/* Main headline */}
          <div className="text-center mb-3">
            <h1 className="text-2xl font-bold mb-2">Pay less tax, legally</h1>
            <p className="text-sm">
              Join thousands of users who have legally reduced their tax rate, often to 0%
            </p>
          </div>
          
          {/* Testimonial card */}
          <div className="bg-white rounded-xl p-4 shadow-lg">
            <div className="flex items-center mb-2">
              <span className="font-medium text-sm">Anna R.</span>
              <span className="ml-1">🇦🇺</span>
            </div>
            
            <p className="text-gray-700 text-sm mb-3">
              "Almost all our business is global and outside Australia's borders, yet we've been paying 30% of our profits to the ATO for nearly half a decade. Now, we're paying zero tax anywhere."
            </p>
            
            <div className="flex justify-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
          </div>
        </div>
        
        {/* Bottom section with white background */}
        <div className="bg-white rounded-t-3xl -mt-8 px-6 py-6 flex-1 flex flex-col">
          {/* Pro badge */}
          <div className="flex justify-center mb-3">
            <div className="bg-[#1A1F2C] text-white px-4 py-1 rounded-full text-xs font-semibold">
              UNTAXABLE PRO
            </div>
          </div>
          
          {/* Offer details */}
          <div className="text-center mb-4">
            <h2 className="text-lg font-bold mb-2 text-gray-900">
              Personalized, actionable advice from tax mitigation pros
            </h2>
            <p className="text-gray-800 text-sm mb-3">
              Make a low-tax or no-tax life a reality in two weeks or less
            </p>
            <p className="font-medium text-sm text-gray-900">
              3 day free trial, then just <span className="text-brand">$48.50 US$/month</span>
            </p>
          </div>
          
          {/* Spacer to push button to bottom */}
          <div className="flex-grow"></div>
          
          {/* Action button */}
          <Button 
            onClick={handleContinue}
            className="w-full py-6 bg-brand text-black hover:bg-brand/90"
          >
            Continue →
          </Button>
        </div>
      </motion.div>
    </MobileLayout>
  );
};

export default PaywallScreen;
