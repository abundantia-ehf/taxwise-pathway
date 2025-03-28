
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, CreditCard } from 'lucide-react';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-brand-light text-black overflow-hidden relative">
      {/* Background elements */}
      <div className="absolute inset-0">
        {/* Concentric circles */}
        <svg className="w-full h-full" viewBox="0 0 390 844" preserveAspectRatio="xMidYMid slice">
          <circle cx="195" cy="300" r="180" fill="none" stroke="#000" strokeOpacity="0.05" strokeWidth="1" />
          <circle cx="195" cy="300" r="150" fill="none" stroke="#000" strokeOpacity="0.05" strokeWidth="1" />
          <circle cx="195" cy="300" r="120" fill="none" stroke="#000" strokeOpacity="0.05" strokeWidth="1" />
          <circle cx="195" cy="300" r="90" fill="none" stroke="#000" strokeOpacity="0.05" strokeWidth="1" />
          {/* Black triangle at bottom */}
          <path d="M120,650 L270,650 L195,844 Z" fill="black" />
        </svg>
        
        {/* Decorative dots */}
        <div className="absolute top-[10%] left-[15%] w-3 h-3 rounded-full bg-black"></div>
        <div className="absolute top-[15%] right-[20%] w-2 h-2 rounded-full bg-black"></div>
        <div className="absolute top-[35%] right-[25%] w-4 h-4 rounded-full bg-black"></div>
      </div>
      
      <div className="container max-w-md mx-auto px-6 py-10 h-screen relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-between h-full"
        >
          {/* Logo section */}
          <div className="pt-8 flex flex-col items-center space-y-6 w-full">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="w-20 h-20 p-3 bg-white rounded-2xl flex items-center justify-center border border-gray-100 shadow-lg"
            >
              <img 
                src="/lovable-uploads/e59d93a8-9521-40fd-b709-37eae4b6f67e.png" 
                alt="Untaxable Logo" 
                className="w-full h-full object-cover rounded-lg"
              />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-center space-y-3"
            >
              <h1 className="text-3xl font-unitext font-bold tracking-tight">
                Become Untaxable
              </h1>
              <p className="text-base text-gray-700">
                Let's begin your path to legally paying zero taxes.
              </p>
            </motion.div>
          </div>
          
          {/* Credit card element */}
          <motion.div
            initial={{ opacity: 0, y: 20, rotate: 0 }}
            animate={{ opacity: 1, y: 0, rotate: 12 }}
            transition={{ delay: 0.8, duration: 0.8, type: "spring" }}
            className="w-64 h-40 bg-black rounded-xl shadow-xl transform rotate-12 flex flex-col justify-between p-4 text-white"
          >
            <div className="flex justify-between items-start">
              <span className="text-xs opacity-70">1737</span>
              <CreditCard className="w-6 h-6 opacity-70" />
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-white/20"></div>
              <div className="w-8 h-8 rounded-full bg-white/40"></div>
            </div>
          </motion.div>
          
          {/* Bottom section with button */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="w-full pb-8"
          >
            <Button 
              className="w-full py-5 bg-brand text-black hover:bg-brand/90 shadow-md shadow-brand/20 text-base font-medium"
              onClick={() => navigate('/onboarding-features')}
            >
              Get Started <ArrowRight className="ml-1" size={18} />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Welcome;
