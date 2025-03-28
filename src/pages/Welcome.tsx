
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
      
      <div className="container max-w-md mx-auto px-6 py-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-between h-[85vh]"
        >
          {/* Logo section */}
          <div className="pt-12 flex flex-col items-center space-y-6 w-full">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="w-64 p-2 rounded-2xl bg-transparent flex items-center justify-center"
            >
              <img 
                src="/lovable-uploads/bce91dd7-e69e-4ac6-a7c0-a42f182b9eda.png" 
                alt="Untaxable Logo" 
                className="w-full h-auto object-contain"
              />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-center space-y-3"
            >
              <h1 className="text-4xl font-unitext font-bold tracking-tight">
                Become Untaxable
              </h1>
              <p className="text-lg text-white/70">
                Let's begin your path to legally paying zero taxes.
              </p>
            </motion.div>
          </div>
          
          {/* Bottom section with button */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="w-full pb-12"
          >
            <Button 
              className="w-full py-6 bg-brand text-black hover:bg-brand/90 shadow-md shadow-brand/20 text-lg font-medium"
              onClick={() => navigate('/onboarding-features')}
            >
              Get Started <ArrowRight className="ml-1" size={20} />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Welcome;
