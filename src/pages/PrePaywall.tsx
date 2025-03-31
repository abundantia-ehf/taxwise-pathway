
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Fingerprint, ArrowDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PrePaywall = () => {
  const navigate = useNavigate();
  const [animating, setAnimating] = useState(false);
  
  const handleFingerprintClick = () => {
    if (!animating) {
      setAnimating(true);
      // Animation will trigger navigation after 1.5 seconds in the useEffect
    }
  };
  
  useEffect(() => {
    if (animating) {
      const timer = setTimeout(() => {
        navigate('/paywall');
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [animating, navigate]);
  
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden flex flex-col relative">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/5 blur-3xl"></div>
      
      <div className="container max-w-md mx-auto px-4 py-8 h-screen flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center text-center mt-[15vh]">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-headline font-bold text-brand mb-6">
            It's time to get started.
          </h1>
          
          <p className="text-lg mb-8 text-white/90">
            Paying tax is optional. We'll help you achieve this legally, in as little as a few weeks.
          </p>
          
          <p className="text-md mb-8 text-white/80">
            Hold your finger below and we'll begin setting things up.
          </p>
          
          {/* Bouncing Arrow - updated to match Welcome page */}
          <div className="flex-1 flex flex-col justify-center items-center">
            <motion.div
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center my-7"
            >
              <ArrowDown className="text-brand animate-bounce-slow" size={50} />
            </motion.div>
          </div>
          
          <div className="relative flex justify-center items-center mb-16">
            <Fingerprint 
              size={64} 
              className="text-brand cursor-pointer z-10" 
              onClick={handleFingerprintClick}
            />
            
            <AnimatePresence>
              {animating && (
                <motion.div
                  className="absolute rounded-full bg-brand"
                  initial={{ width: 0, height: 0, opacity: 0.7 }}
                  animate={{ 
                    width: '300vw', 
                    height: '300vw', 
                    opacity: 0.9 
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrePaywall;
