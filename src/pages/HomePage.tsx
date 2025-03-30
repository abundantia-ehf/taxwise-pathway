
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '@/components/layout/MobileLayout';
import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import GreetingQuote from '@/components/home/GreetingQuote';
import NavigationSection from '@/components/home/NavigationSection';
import LearningSection from '@/components/home/LearningSection';
import StatsSection from '@/components/home/StatsSection';

const HomePage = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [hasStartedLessons, setHasStartedLessons] = useState(false);
  
  useEffect(() => {
    const lessonProgress = localStorage.getItem('lesson-progress');
    setHasStartedLessons(!!lessonProgress);
  }, []);
  
  const handleLearningNavigation = () => {
    if (hasStartedLessons) {
      navigate('/learn');
    } else {
      navigate('/video/intro/start-here');
    }
  };

  // Determine the logo path based on theme
  const logoPath = theme === 'greyscale' 
    ? "/lovable-uploads/bce91dd7-e69e-4ac6-a7c0-a42f182b9eda.png" // Use a greyscale logo
    : theme === 'dark' 
      ? "/lovable-uploads/e9f20d63-e4f1-4f76-8e74-f28dec18a2a6.png" 
      : "/lovable-uploads/7c48630c-ff8f-48df-b315-dd322642ee8f.png";

  return (
    <MobileLayout>
      <div className="min-h-screen bg-background">
        <Header 
          title={
            <div className="h-[28px] w-auto">
              <img 
                src={logoPath}
                alt="Untaxable Logo" 
                className="h-full w-auto object-contain"
                style={{ maxHeight: "28px" }}
              />
            </div>
          } 
          showBack={false}
          showThemeToggle={true}
        />
        
        <div className="container max-w-md mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <GreetingQuote />
          </motion.div>
          
          <LearningSection 
            hasStartedLessons={hasStartedLessons} 
            handleLearningNavigation={handleLearningNavigation} 
          />

          <NavigationSection />

          <StatsSection />
        </div>
      </div>
    </MobileLayout>
  );
};

export default HomePage;
