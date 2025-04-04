
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowDown } from 'lucide-react';

const Welcome = () => {
  const navigate = useNavigate();
  const [displayText, setDisplayText] = useState('');
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showElements, setShowElements] = useState(false);
  const fullText = "Become Untaxable."; // Changed back to space-separated text
  const typingSpeed = 100; // milliseconds per character
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const arrowAnimationRef = useRef<number | null>(null);
  const arrowRef = useRef<HTMLDivElement | null>(null);
  
  // This effect handles the typing animation
  useEffect(() => {
    // Reset states
    setDisplayText('');
    setShowSubtitle(false);
    setShowElements(false);
    
    // Initialize audio
    audioRef.current = new Audio('/dink-sound.mp3');
    audioRef.current.volume = 0.2;
    
    // Type out text one character at a time
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        // Add the next character
        setDisplayText(fullText.substring(0, index + 1));
        
        // Vibrate device if supported
        if (navigator.vibrate) {
          navigator.vibrate(10);
        }
        
        index++;
      } else {
        // Stop typing when complete
        clearInterval(timer);
        
        // Show subtitle after typing is complete
        setTimeout(() => {
          setShowSubtitle(true);
          
          // Show elements after subtitle appears
          setTimeout(() => {
            setShowElements(true);
          }, 1000);
        }, 300);
      }
    }, typingSpeed);
    
    // Cleanup on unmount
    return () => {
      clearInterval(timer);
      if (arrowAnimationRef.current) {
        cancelAnimationFrame(arrowAnimationRef.current);
      }
    };
  }, []); // Empty dependency array ensures this only runs once on mount

  // This effect handles the arrow animation after elements are shown
  useEffect(() => {
    if (!showElements || !arrowRef.current) return;
    
    let previousY = 0;
    let isMovingDown = true;
    
    const checkArrowPosition = () => {
      if (!arrowRef.current || !showElements) return;
      
      const currentY = arrowRef.current.getBoundingClientRect().y;
      
      if (isMovingDown && currentY < previousY) {
        isMovingDown = false;
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.play().catch(err => console.log("Audio play error:", err));
        }
      } else if (!isMovingDown && currentY > previousY) {
        isMovingDown = true;
      }
      
      previousY = currentY;
      arrowAnimationRef.current = requestAnimationFrame(checkArrowPosition);
    };
    
    arrowAnimationRef.current = requestAnimationFrame(checkArrowPosition);
    
    return () => {
      if (arrowAnimationRef.current) {
        cancelAnimationFrame(arrowAnimationRef.current);
      }
    };
  }, [showElements]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-zinc-900 text-white overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-brand/5 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-brand/5 blur-3xl"></div>
      
      <div className="container max-w-md mx-auto px-6 py-4 h-screen relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center h-full"
        >
          <div className="flex flex-col items-center space-y-8 w-full">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: showElements ? 1 : 0.8, opacity: showElements ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              className="w-16 h-16"
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
            
            <div className="flex-1 flex flex-col justify-center items-center">
              <motion.div
                ref={arrowRef}
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: showElements ? 1 : 0, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex justify-center my-7"
              >
                <ArrowDown className="text-brand animate-bounce-slow" size={50} />
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: showElements ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <Button 
                className="w-full py-5 bg-brand text-black hover:bg-brand/90 shadow-md shadow-brand/20 text-base font-medium"
                onClick={() => navigate('/questionnaire')}
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
