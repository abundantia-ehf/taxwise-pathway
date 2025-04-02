
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '@/components/layout/MobileLayout';
import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import GreetingQuote from '@/components/home/GreetingQuote';
import NavigationSection from '@/components/home/NavigationSection';
import LearningSection from '@/components/home/LearningSection';
import { OptimizedImage } from '@/components/ui/optimized-image';

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

  // Determine the logo path based on theme - using the symbol logos instead of the wide logos
  const logoPath = theme === 'greyscale' 
    ? "/lovable-uploads/585e995d-eb07-4bfc-ad3f-e2612e89b865.png" // White logo for greyscale
    : theme === 'dark' 
      ? "/lovable-uploads/cad1c605-826a-4af3-93da-4914437ce841.png" // Green logo for dark mode
      : "/lovable-uploads/a9b6522b-688c-437c-b455-fbca829d7fce.png"; // Black logo for light mode

  return (
    <MobileLayout>
      <div className="min-h-screen bg-background">
        <Header 
          title={
            <div className="h-[28px] w-auto">
              <OptimizedImage 
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
          
          {/* StatsSection has been removed as requested */}
        </div>
      </div>
    </MobileLayout>
  );
};

export default HomePage;
