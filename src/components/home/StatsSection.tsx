
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';

const StatsSection = () => {
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="mb-5"
    >
      <h2 className="text-lg font-headline font-semibold mb-3">Your Untaxable Journey</h2>
      <div className="grid grid-cols-2 gap-3">
        <Card className="border">
          <CardContent className="p-4 text-center">
            <h3 className={`text-3xl font-headline font-semibold ${theme === 'greyscale' ? "text-white" : "text-brand"}`}>3</h3>
            <p className="text-xs text-muted-foreground mt-1">Questions Answered</p>
          </CardContent>
        </Card>
        <Card className="border">
          <CardContent className="p-4 text-center">
            <h3 className={`text-3xl font-headline font-semibold ${theme === 'greyscale' ? "text-white" : "text-brand"}`}>3</h3>
            <p className="text-xs text-muted-foreground mt-1">Lessons Completed</p>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default StatsSection;
