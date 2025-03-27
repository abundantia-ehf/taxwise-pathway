
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  onFinished: () => void;
}

const LoadingScreen = ({ onFinished }: LoadingScreenProps) => {
  useEffect(() => {
    // Automatically dismiss the loading screen after 2 seconds
    const timer = setTimeout(() => {
      onFinished();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onFinished]);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-24 h-24 flex items-center justify-center"
      >
        <div className="rounded-xl overflow-hidden">
          <img 
            src="/lovable-uploads/e59d93a8-9521-40fd-b709-37eae4b6f67e.png" 
            alt="Untaxable Logo" 
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default LoadingScreen;
