
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '@/components/layout/MobileLayout';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Database, MessagesSquare, ArrowRight, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';
import { Switch } from '@/components/ui/switch';
import Header from '@/components/layout/Header';
import GreetingQuote from '@/components/home/GreetingQuote';
import { cn } from '@/lib/utils';

interface NavigationCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  index: number; // Added index prop to determine gradient style
}

const NavigationCard = ({ title, description, icon, onClick, index }: NavigationCardProps) => {
  const { theme } = useTheme();
  
  // Different gradient styles based on the card index and theme
  const gradientStyles = [
    // First card - diagonal gradient
    theme === 'greyscale'
      ? 'border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-700'
      : theme === 'dark'
        ? 'border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-800 to-brand/20'
        : 'border-zinc-200 bg-gradient-to-br from-white via-brand/20 to-brand/40',
    
    // Second card - horizontal gradient
    theme === 'greyscale'
      ? 'border-zinc-800 bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-700'
      : theme === 'dark'
        ? 'border-zinc-800 bg-gradient-to-r from-zinc-900 via-zinc-800 to-brand/25'
        : 'border-zinc-200 bg-gradient-to-r from-white via-brand/30 to-brand/50',
    
    // Third card - radial gradient
    theme === 'greyscale'
      ? 'border-zinc-800 bg-gradient-to-tr from-zinc-800 via-zinc-800/90 to-zinc-900'
      : theme === 'dark'
        ? 'border-zinc-800 bg-gradient-to-tr from-brand/15 via-zinc-800/90 to-zinc-900'
        : 'border-zinc-200 bg-gradient-to-bl from-brand/30 via-brand/20 to-white',
  ];
  
  const cardStyle = gradientStyles[index % gradientStyles.length];
  
  // Icon background color based on theme
  const iconBgClass = theme === 'greyscale' 
    ? 'bg-zinc-700/50' 
    : 'bg-brand/20';
  
  return (
    <Card 
      className={`relative overflow-hidden hover:shadow-md transition-all cursor-pointer border ${cardStyle}`}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${iconBgClass}`}>
              {icon}
            </div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${theme === 'dark' || theme === 'greyscale' ? 'bg-zinc-800' : 'bg-zinc-200'}`}>
              <ArrowRight size={16} className="text-muted-foreground" />
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg">{title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const HomePage = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [hasStartedLessons, setHasStartedLessons] = useState(false);
  
  useEffect(() => {
    const lessonProgress = localStorage.getItem('lesson-progress');
    setHasStartedLessons(!!lessonProgress);
  }, []);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      } 
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };
  
  const navigationItems = [
    {
      title: "Learn",
      description: "Access our comprehensive tax optimization course modules",
      icon: <BookOpen size={20} className={theme === 'greyscale' ? "text-white" : "text-brand"} />,
      path: "/learn"
    },
    {
      title: "Ask an Untaxable Pro",
      description: "Schedule a consultation with our tax experts",
      icon: <MessagesSquare size={20} className={theme === 'greyscale' ? "text-white" : "text-brand"} />,
      path: "/support"
    },
    {
      title: "Tax Databases",
      description: "Access our collection of tax optimization databases and resources",
      icon: <Database size={20} className={theme === 'greyscale' ? "text-white" : "text-brand"} />,
      path: "/data"
    }
  ];

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
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-5 mt-3"
          >
            <h2 className="text-lg font-semibold mb-3 flex items-center cursor-pointer" onClick={handleLearningNavigation}>
              {hasStartedLessons ? "Continue Learning" : "Get Started"} 
              <ArrowRight 
                size={18} 
                className={`ml-1 ${theme === 'greyscale' ? "text-white" : "text-brand"}`} 
              />
            </h2>
            
            <Card 
              className="border cursor-pointer"
              onClick={handleLearningNavigation}
            >
              <CardContent className="p-4">
                <div className="flex items-center">
                  <div className={`h-12 w-12 rounded-lg ${theme === 'greyscale' ? "bg-zinc-700" : "bg-brand/20"} flex items-center justify-center mr-4`}>
                    <BookOpen size={24} className={theme === 'greyscale' ? "text-white" : "text-brand"} />
                  </div>
                  <div className="flex-1">
                    {hasStartedLessons ? (
                      <>
                        <h3 className="font-medium">Foundations of Tax Optimization</h3>
                        <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full mt-2">
                          <div className={`h-2 ${theme === 'greyscale' ? "bg-gray-400" : "bg-brand"} rounded-full`} style={{ width: '20%' }}></div>
                        </div>
                        <div className="flex justify-between mt-1">
                          <span className="text-xs text-muted-foreground">20% complete</span>
                          <button 
                            className={`text-xs font-medium ${theme === 'greyscale' ? "text-white" : "text-brand"} hover:underline flex items-center`}
                          >
                            Continue <ArrowRight size={12} className="ml-1" />
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <h3 className="font-medium">Start Here: Course Overview</h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          Begin your tax optimization journey with our introductory lesson
                        </p>
                        <button 
                          className={`text-xs font-medium ${theme === 'greyscale' ? "text-white" : "text-brand"} hover:underline flex items-center mt-2`}
                        >
                          Watch now <ArrowRight size={12} className="ml-1" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="mb-5">
            <h2 className="text-lg font-semibold mb-3">Explore</h2>
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid gap-3"
            >
              {navigationItems.map((item, index) => (
                <motion.div key={item.title} variants={itemVariants}>
                  <NavigationCard
                    title={item.title}
                    description={item.description}
                    icon={item.icon}
                    onClick={() => navigate(item.path)}
                    index={index}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mb-5"
          >
            <h2 className="text-lg font-semibold mb-3">Your Untaxable Journey</h2>
            <div className="grid grid-cols-2 gap-3">
              <Card className="border">
                <CardContent className="p-4 text-center">
                  <h3 className={`text-3xl font-bold ${theme === 'greyscale' ? "text-white" : "text-brand"}`}>3</h3>
                  <p className="text-xs text-muted-foreground mt-1">Questions Answered</p>
                </CardContent>
              </Card>
              <Card className="border">
                <CardContent className="p-4 text-center">
                  <h3 className={`text-3xl font-bold ${theme === 'greyscale' ? "text-white" : "text-brand"}`}>3</h3>
                  <p className="text-xs text-muted-foreground mt-1">Lessons Completed</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default HomePage;
