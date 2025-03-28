
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { OptimizedImage } from '@/components/ui/optimized-image';

interface LoadingScreenProps {
  onFinished: () => void;
}

const LoadingScreen = ({ onFinished }: LoadingScreenProps) => {
  useEffect(() => {
    // Automatically dismiss the loading screen after 3 seconds
    const timer = setTimeout(() => {
      onFinished();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onFinished]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-black to-black/90 flex items-center justify-center z-50">
      {/* Decorative circles */}
      <div className="absolute top-10 left-10 w-24 h-24 rounded-full bg-brand/5 blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-brand/10 blur-xl"></div>
      
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          duration: 0.5, 
          ease: "easeOut",
        }}
        className="w-36 h-36 flex items-center justify-center z-10"
      >
        <OptimizedImage 
          src="/lovable-uploads/e59d93a8-9521-40fd-b709-37eae4b6f67e.png" 
          alt="Untaxable Logo" 
          className="w-full h-full object-cover rounded-md"
          loadingHeight={144} // 36*4
        />
      </motion.div>
    </div>
  );
};

export default LoadingScreen;
