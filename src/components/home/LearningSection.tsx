
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';
import LearningProgressCard from './LearningProgressCard';

interface LearningSectionProps {
  hasStartedLessons: boolean;
  handleLearningNavigation: () => void;
}

const LearningSection = ({ hasStartedLessons, handleLearningNavigation }: LearningSectionProps) => {
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mb-5 mt-3"
    >
      <h2 className="text-lg font-headline font-semibold mb-3 flex items-center cursor-pointer" onClick={handleLearningNavigation}>
        {hasStartedLessons ? "Continue Learning" : "Get Started"} 
        <ArrowRight 
          size={18} 
          className={`ml-1 ${theme === 'greyscale' ? "text-white" : "text-brand"}`} 
        />
      </h2>
      
      <LearningProgressCard
        hasStartedLessons={hasStartedLessons}
        onClick={handleLearningNavigation}
      />
    </motion.div>
  );
};

export default LearningSection;
