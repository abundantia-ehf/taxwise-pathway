
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Earth } from 'lucide-react';
import { motion } from 'framer-motion';
import { OptimizedImage } from '@/components/ui/optimized-image';

const Method = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: "Legal & Proven",
      description: "Used by thousands of people around the world to drastically reduce or eliminate their tax burden via legal means.",
      extraInfo: "Our customers live in 130+ countries",
      showEarthIcon: true,
      showStaticFlags: true,
      hideImage: true,
      imageUrl: "/lovable-uploads/2d441c39-e935-49df-a144-c9d9ddf0b127.png"
    },
    {
      title: "The Flag Method",
      description: "Our proprietary system for effectively eliminating your tax burden through legally-supported residency strategies.",
      imageUrl: "/lovable-uploads/e59d93a8-9521-40fd-b709-37eae4b6f67e.png"
    },
    {
      title: "1-on-1 Support",
      description: "Don't go through this alone. Our Untaxable pros will guide you based on your own personal income and tax situation.",
      imageUrl: "/lovable-uploads/e59d93a8-9521-40fd-b709-37eae4b6f67e.png"
    }
  ];

  const staticFlags = ['us', 'au', 'sg', 'za', 'ru', 'ca', 'gb', 'de', 'se', 'be', 'ar', 'es'];

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      navigate('/proof');
    }
  };

  return (
    <div className="min-h-screen text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-black">
        <div className="absolute top-0 left-0 w-full h-2/5 bg-gradient-to-b from-[#D1FF82] via-[#D1FF82]/30 to-transparent"></div>
      </div>
      
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
            {!steps[activeStep].hideImage && (
              <div className="w-24 h-24 mx-auto mb-4">
                <OptimizedImage 
                  src={steps[activeStep].imageUrl}
                  alt={steps[activeStep].title}
                  className="w-full h-full object-contain"
                />
              </div>
            )}
            <h1 className="text-2xl font-bold">{steps[activeStep].title}</h1>
            <p className="text-white/80">{steps[activeStep].description}</p>
            
            {steps[activeStep].extraInfo && (
              <p className="text-sm text-white/60 flex items-center justify-center gap-1">
                {steps[activeStep].showEarthIcon && <Earth size={16} className="text-[#D1FF82]" />}
                {steps[activeStep].extraInfo}
              </p>
            )}
            
            {steps[activeStep].showStaticFlags && (
              <div className="mt-3 flex justify-center space-x-2">
                {staticFlags.map((code, index) => (
                  <div key={index} className="flex-shrink-0">
                    <img 
                      src={`https://flagcdn.com/24x18/${code.toLowerCase()}.png`}
                      alt={`Flag ${code}`}
                      className="h-3 w-auto object-contain"
                    />
                  </div>
                ))}
              </div>
            )}
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
