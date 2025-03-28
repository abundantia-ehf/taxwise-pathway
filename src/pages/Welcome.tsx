
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Welcome = () => {
  const navigate = useNavigate();

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
          className="flex flex-col items-center justify-between h-full"
        >
          {/* Logo section */}
          <div className="pt-8 flex flex-col items-center space-y-4 w-full">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="w-20 h-20"
            >
              <img 
                src="/lovable-uploads/e59d93a8-9521-40fd-b709-37eae4b6f67e.png" 
                alt="Untaxable Logo" 
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-center space-y-2"
            >
              <h1 className="text-3xl font-unitext font-bold tracking-tight">
                Become Untaxable
              </h1>
              <p className="text-base text-white/70">
                Let's begin your path to legally paying zero taxes.
              </p>
            </motion.div>
          </div>
          
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
