
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { OptimizedImage } from '@/components/ui/optimized-image';

const Method = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: "The Flag Method",
      description: "Our proprietary system for effectively eliminating your tax burden through legally-supported residency strategies.",
      imageUrl: "/lovable-uploads/e59d93a8-9521-40fd-b709-37eae4b6f67e.png"
    },
    {
      title: "Legal & Proven",
      description: "Used by thousands of individuals worldwide to drastically reduce or eliminate their tax burden while maintaining their lifestyle.",
      imageUrl: "/lovable-uploads/2d441c39-e935-49df-a144-c9d9ddf0b127.png"
    },
    {
      title: "Simple Implementation",
      description: "Follow our step-by-step process to establish yourself as a non-taxable entity in your current country of residence.",
      imageUrl: "/lovable-uploads/e59d93a8-9521-40fd-b709-37eae4b6f67e.png"
    }
  ];

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      navigate('/proof');
    }
  };

  return (
    <div className="min-h-screen text-white overflow-hidden relative">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute bottom-0 left-0 w-full h-2/5 bg-gradient-to-t from-[#D1FF82]/60 via-[#D1FF82]/20 to-transparent"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container max-w-md mx-auto px-4 py-4 h-screen flex flex-col justify-between">
        <div className="pt-6 flex justify-center">
          <OptimizedImage 
            src="/lovable-uploads/2d441c39-e935-49df-a144-c9d9ddf0b127.png" 
            alt="Untaxable Logo" 
            className="h-8 object-contain"
          />
        </div>
        
        <motion.div 
          key={activeStep}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
          className="flex-1 flex items-center justify-center"
        >
          <div className="text-center space-y-6">
            <div className="w-24 h-24 mx-auto mb-4">
              <OptimizedImage 
                src={steps[activeStep].imageUrl}
                alt={steps[activeStep].title}
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-2xl font-bold">{steps[activeStep].title}</h1>
            <p className="text-white/80">{steps[activeStep].description}</p>
          </div>
        </motion.div>
        
        <div className="pb-6 space-y-4">
          <div className="flex justify-center space-x-2">
            {steps.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full ${
                  activeStep === index ? 'bg-white' : 'bg-white/30'
                } transition-colors cursor-pointer`}
                onClick={() => setActiveStep(index)}
                aria-label={`Go to step ${index + 1}`}
              />
            ))}
          </div>
          
          <button
            type="button"
            onClick={handleNext}
            className="w-full h-14 py-4 bg-[#D1FF82] hover:bg-[#C4EE75] text-black shadow-md shadow-black/20 text-base font-medium rounded-md flex items-center justify-center"
            style={{
              WebkitTapHighlightColor: 'transparent',
              touchAction: 'manipulation',
              cursor: 'pointer',
              position: 'relative',
              zIndex: 30,
              border: 'none',
              outline: 'none'
            }}
          >
            {activeStep < steps.length - 1 ? (
              <>Next <ArrowRight size={16} className="ml-1 text-black" /></>
            ) : (
              <>Continue to Proof <ArrowRight size={16} className="ml-1 text-black" /></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Method;
