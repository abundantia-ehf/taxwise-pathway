
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const StatsSection = () => {
  const { theme } = useTheme();

  // Isometric transformation classes
  const isometricTransform = 'transform perspective-[800px] rotate-x-[12deg] rotate-y-[-12deg]';
  const hoverEffect = 'hover:rotate-x-[8deg] hover:rotate-y-[-8deg] hover:translate-y-[-3px] hover:shadow-lg';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="mb-5"
    >
      <h2 className="text-lg font-headline font-semibold mb-3">Your Untaxable Journey</h2>
      <div className="grid grid-cols-2 gap-3">
        <Card className={cn(
          "border transition-all duration-300",
          isometricTransform,
          hoverEffect,
          // Add depth with shadows based on theme
          theme === 'dark' || theme === 'greyscale' 
            ? 'shadow-[3px_3px_10px_rgba(0,0,0,0.5)]' 
            : 'shadow-[3px_3px_10px_rgba(0,0,0,0.2)]'
        )}>
          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/10 pointer-events-none rounded-lg"></div>
          <CardContent className="p-4 text-center relative z-10">
            <h3 className={cn(
              `text-3xl font-headline font-semibold`,
              theme === 'greyscale' ? "text-white" : "text-brand"
            )}>3</h3>
            <p className="text-xs text-muted-foreground mt-1">Questions Answered</p>
          </CardContent>
        </Card>
        <Card className={cn(
          "border transition-all duration-300",
          isometricTransform,
          hoverEffect,
          // Add depth with shadows based on theme
          theme === 'dark' || theme === 'greyscale' 
            ? 'shadow-[3px_3px_10px_rgba(0,0,0,0.5)]' 
            : 'shadow-[3px_3px_10px_rgba(0,0,0,0.2)]'
        )}>
          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/10 pointer-events-none rounded-lg"></div>
          <CardContent className="p-4 text-center relative z-10">
            <h3 className={cn(
              `text-3xl font-headline font-semibold`,
              theme === 'greyscale' ? "text-white" : "text-brand"
            )}>3</h3>
            <p className="text-xs text-muted-foreground mt-1">Lessons Completed</p>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default StatsSection;
