
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowDown } from 'lucide-react';

const Welcome = () => {
  const navigate = useNavigate();
  const [displayText, setDisplayText] = useState('');
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showArrow, setShowArrow] = useState(false);
  const fullText = "Become Untaxable.";
  const typingSpeed = 100; // milliseconds per character
  const typingIndex = useRef(0);

  useEffect(() => {
    if (typingIndex.current < fullText.length) {
      const typingTimer = setTimeout(() => {
        setDisplayText(fullText.substring(0, typingIndex.current + 1));
        typingIndex.current += 1;
        
        // Trigger vibration if available (only on devices that support it)
        if (navigator.vibrate) {
          navigator.vibrate(10); // 10ms subtle vibration
        }
      }, typingSpeed);
      
      return () => clearTimeout(typingTimer);
    } else {
      // When typing is complete, show the subtitle
      const subtitleTimer = setTimeout(() => {
        setShowSubtitle(true);
        
        // After subtitle fade-in and 1 second delay, show the arrow
        const arrowTimer = setTimeout(() => {
          setShowArrow(true);
        }, 1000); // 1 second after subtitle appears (changed from 500ms)
        
        return () => clearTimeout(arrowTimer);
      }, 300); // Short delay after typing finishes
      
      return () => clearTimeout(subtitleTimer);
    }
  }, [displayText, fullText]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-zinc-900 text-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-brand/5 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-brand/5 blur-3xl"></div>
      
      <div className="container max-w-md mx-auto px-6 py-4 h-screen relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center h-full"
        >
          {/* Logo section */}
          <div className="flex flex-col items-center space-y-8 w-full">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="w-20 h-20"
            >
              <img 
                src="/lovable-uploads/e59d93a8-9521-40fd-b709-37eae4b6f67e.png" 
                alt="Untaxable Logo" 
                className="w-full h-full object-cover rounded-xl"
              />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-center space-y-2"
            >
              <h1 className="text-3xl font-headline">
                {displayText}
              </h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: showSubtitle ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                className="text-base text-white/70"
              >
                Your path to legally paying zero taxes starts now
              </motion.p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: showArrow ? 1 : 0, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center mt-40"
            >
              <ArrowDown className="text-brand animate-bounce" size={42} />
            </motion.div>
            
            {/* Button now positioned with equal spacing */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="w-full mt-40"
            >
              <Button 
                className="w-full py-5 bg-brand text-black hover:bg-brand/90 shadow-md shadow-brand/20 text-base font-medium"
                onClick={() => navigate('/onboarding-features')}
              >
                Get Started <ArrowRight className="ml-1" size={18} />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Welcome;
