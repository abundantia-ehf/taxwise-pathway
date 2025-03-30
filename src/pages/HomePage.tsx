
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
import { cn } from '@/lib/utils';

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

  // Background decoration elements for isometric design
  const backgroundDecorations = [
    {
      position: "top-[-50px] right-[-100px]",
      size: "w-[250px] h-[250px]",
      rotation: "rotate-[20deg]",
      opacity: theme === 'light' ? "opacity-5" : "opacity-10",
      delay: 0.1
    },
    {
      position: "bottom-[-150px] left-[-100px]",
      size: "w-[300px] h-[300px]",
      rotation: "rotate-[40deg]",
      opacity: theme === 'light' ? "opacity-5" : "opacity-10",
      delay: 0.2
    }
  ];

  return (
    <MobileLayout>
      <div className={cn(
        "min-h-screen bg-background relative overflow-hidden",
        // Add a subtle grid pattern for isometric effect
        theme === 'dark'
          ? "bg-[linear-gradient(rgba(40,40,40,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(40,40,40,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"
          : theme === 'greyscale'
            ? "bg-[linear-gradient(rgba(60,60,60,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(60,60,60,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"
            : "bg-[linear-gradient(rgba(200,200,200,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(200,200,200,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"
      )}>
        {/* Isometric decorative shapes in the background */}
        {backgroundDecorations.map((decoration, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: decoration.delay, duration: 0.8 }}
            className={cn(
              "absolute z-0 pointer-events-none",
              decoration.position,
              decoration.rotation,
              decoration.opacity
            )}
          >
            <div className={cn(
              decoration.size,
              "border-4 border-brand rounded-3xl transform rotate-x-[45deg] rotate-y-[-45deg]"
            )}></div>
          </motion.div>
        ))}
        
        {/* Application content */}
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
        
        <div className="container max-w-md mx-auto px-4 relative z-10">
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
