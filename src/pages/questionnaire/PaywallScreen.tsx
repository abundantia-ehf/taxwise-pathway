
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Star, Flag, CreditCard, ArrowRight } from 'lucide-react';
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
        className="flex flex-col h-full bg-[#F2FCE2] relative overflow-hidden"
      >
        {/* Background geometric elements */}
        <div className="absolute inset-0 z-0">
          {/* Concentric circles */}
          <svg className="w-full h-full" viewBox="0 0 390 844" preserveAspectRatio="xMidYMid slice">
            <circle cx="195" cy="422" r="180" fill="none" stroke="#000" strokeOpacity="0.05" strokeWidth="1" />
            <circle cx="195" cy="422" r="150" fill="none" stroke="#000" strokeOpacity="0.05" strokeWidth="1" />
            <circle cx="195" cy="422" r="120" fill="none" stroke="#000" strokeOpacity="0.05" strokeWidth="1" />
            <circle cx="195" cy="422" r="90" fill="none" stroke="#000" strokeOpacity="0.05" strokeWidth="1" />
            {/* Black triangle at bottom */}
            <path d="M120,650 L270,650 L195,844 Z" fill="black" />
          </svg>
          
          {/* Decorative dots */}
          <div className="absolute top-[15%] left-[20%] w-3 h-3 rounded-full bg-black"></div>
          <div className="absolute top-[10%] right-[25%] w-2 h-2 rounded-full bg-black"></div>
          <div className="absolute top-[40%] right-[15%] w-4 h-4 rounded-full bg-black"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 px-6 pt-10 pb-20 flex flex-col h-full">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="bg-white p-3 rounded-2xl shadow-sm">
              <img 
                src="/lovable-uploads/e59d93a8-9521-40fd-b709-37eae4b6f67e.png" 
                alt="Untaxable Logo" 
                className="w-10 h-10 object-cover rounded-lg"
              />
            </div>
          </div>
          
          {/* Main headline */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-3 text-black">Pay less tax, <span className="border-b-4 border-[#ea384c]">legally</span></h1>
            <p className="text-md text-gray-700">
              Join thousands of users who have legally reduced their tax rate, often to 0%
            </p>
          </div>
          
          {/* Black credit card element */}
          <div className="relative mb-12 mx-auto">
            <div className="w-64 h-40 bg-black rounded-xl shadow-xl transform rotate-12 flex flex-col justify-between p-4 text-white">
              <div className="flex justify-between items-start">
                <span className="text-xs opacity-70">1737</span>
                <CreditCard className="w-6 h-6 opacity-70" />
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-white/20"></div>
                <div className="w-8 h-8 rounded-full bg-white/40"></div>
              </div>
            </div>
          </div>
          
          {/* Testimonial card */}
          <div className="bg-white rounded-3xl p-5 shadow-md mb-8">
            {/* Centered name and flag */}
            <div className="flex justify-center mb-2">
              <span className="font-medium text-sm text-[#1A1F2C]">Anna R.</span>
              <span className="ml-1">🇦🇺</span>
            </div>
            
            <p className="text-gray-700 text-sm mb-3 text-center">
              "Almost all our business is global and outside Australia's borders, yet we've been paying 30% of our profits to the ATO for nearly half a decade. Now, we're paying zero tax anywhere."
            </p>
            
            <div className="flex justify-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
          </div>
          
          {/* Offer card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-5 shadow-md mb-6">
            {/* Pro badge */}
            <div className="flex justify-center mb-3">
              <div className="bg-[#1A1F2C] text-white px-4 flex items-center justify-center h-7 rounded-md text-xs font-semibold">
                UNTAXABLE PRO
              </div>
            </div>
            
            {/* Offer details */}
            <div className="text-center mb-3">
              <h2 className="text-lg font-bold mb-2 text-gray-900">
                Get help from tax mitigation pros
              </h2>
              <p className="text-gray-800 text-sm mb-3">
                Make a low-tax or no-tax life a reality in two weeks or less
              </p>
              <p className="font-medium text-sm text-gray-900">
                3 day free trial, then just <span className="text-black bg-brand px-1 rounded font-bold">$48.50 US$/month</span>
              </p>
            </div>
          </div>
          
          {/* Action button */}
          <Button 
            onClick={handleContinue}
            className="w-full py-6 mt-auto bg-brand text-black hover:bg-brand/90 shadow-md flex items-center justify-center"
          >
            Continue <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </motion.div>
    </MobileLayout>
  );
};

export default PaywallScreen;
