
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '@/components/layout/MobileLayout';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Server, MessagesSquare, ArrowRight, ChevronUp } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/layout/Header';

interface ExpandableCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onNavigate: () => void;
  expanded: boolean;
  onToggle: () => void;
  color?: string;
}

const ExpandableCard = ({ 
  title, 
  description, 
  icon, 
  onNavigate, 
  expanded, 
  onToggle,
  color = "brand" 
}: ExpandableCardProps) => {
  const { theme } = useTheme();
  
  return (
    <motion.div
      layout
      className="w-full mb-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card 
        className={`relative overflow-hidden transition-all cursor-pointer border ${
          theme === 'dark' ? 'border-zinc-800 bg-zinc-900/50' : 'border-zinc-200 bg-white'
        } ${expanded ? 'shadow-lg' : ''}`}
        onClick={onToggle}
      >
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-${color}/20`}>
              {icon}
            </div>
            <motion.div
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronUp size={18} className="text-muted-foreground" />
            </motion.div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg">{title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          </div>
          
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800"
              >
                <div className="space-y-3">
                  <p className="text-sm">
                    {title === "Learn" && "Access our comprehensive tax optimization course modules with step-by-step guidance."}
                    {title === "Ask an Untaxable Pro" && "Get personalized advice from our tax experts to optimize your specific situation."}
                    {title === "Tax Databases" && "Browse our extensive collection of tax optimization resources, strategies, and case studies."}
                  </p>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate();
                    }}
                    className="flex items-center text-sm font-medium text-brand hover:underline"
                  >
                    Explore {title} <ArrowRight size={16} className="ml-1" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const HomePage = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [hasStartedLessons, setHasStartedLessons] = useState(false);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  
  React.useEffect(() => {
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

  const navigationItems = [
    {
      title: "Learn",
      description: "Access our comprehensive tax optimization course modules",
      icon: <BookOpen size={20} className="text-brand" />,
      path: "/learn",
      color: "brand"
    },
    {
      title: "Ask an Untaxable Pro",
      description: "Schedule a consultation with our tax experts",
      icon: <MessagesSquare size={20} className="text-purple-500" />,
      path: "/advice",
      color: "purple-500"
    },
    {
      title: "Tax Databases",
      description: "Access our collection of tax optimization databases and resources",
      icon: <Server size={20} className="text-blue-500" />,
      path: "/data",
      color: "blue-500"
    }
  ];

  const toggleCard = (title: string) => {
    if (expandedCard === title) {
      setExpandedCard(null);
    } else {
      setExpandedCard(title);
    }
  };

  return (
    <MobileLayout>
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-background' : 'bg-gray-50'}`}>
        <Header 
          title={
            <div className="h-[28px] w-auto">
              <img 
                src={theme === 'dark' 
                  ? "/lovable-uploads/e9f20d63-e4f1-4f76-8e74-f28dec18a2a6.png" 
                  : "/lovable-uploads/7c48630c-ff8f-48df-b315-dd322642ee8f.png"
                } 
                alt="Untaxable Logo" 
                className="h-full w-auto object-contain"
                style={{ maxHeight: "28px" }}
              />
            </div>
          } 
          showBack={false}
          showThemeToggle={true}
        />
        
        <div className="container max-w-md mx-auto px-4 py-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <h2 className="text-lg font-semibold mb-4 flex items-center cursor-pointer" onClick={handleLearningNavigation}>
              {hasStartedLessons ? "Continue Learning" : "Get Started"} 
              <ArrowRight 
                size={18} 
                className={`ml-1 ${theme === 'dark' ? 'text-brand' : 'text-foreground'}`} 
              />
            </h2>
            <Card 
              className={`border ${theme === 'dark' ? 'border-zinc-800 bg-zinc-900/50' : 'border-zinc-200 bg-white'} cursor-pointer`}
              onClick={handleLearningNavigation}
            >
              <CardContent className="p-4">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-lg bg-brand/20 flex items-center justify-center mr-4">
                    <BookOpen size={24} className="text-brand" />
                  </div>
                  <div className="flex-1">
                    {hasStartedLessons ? (
                      <>
                        <h3 className="font-medium">Foundations of Tax Optimization</h3>
                        <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full mt-2">
                          <div className="h-2 bg-brand rounded-full" style={{ width: '20%' }}></div>
                        </div>
                        <div className="flex justify-between mt-1">
                          <span className="text-xs text-muted-foreground">20% complete</span>
                          <button 
                            className={`text-xs font-medium text-brand hover:underline flex items-center ${theme === 'light' ? 'bg-gray-800 px-2 py-1 rounded' : ''}`}
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
                          className={`text-xs font-medium text-brand hover:underline flex items-center mt-2 ${theme === 'light' ? 'bg-gray-800 px-2 py-1 rounded' : ''}`}
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

          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Explore</h2>
            <motion.div
              className="space-y-0"
              layout
            >
              {navigationItems.map((item) => (
                <ExpandableCard
                  key={item.title}
                  title={item.title}
                  description={item.description}
                  icon={item.icon}
                  onNavigate={() => navigate(item.path)}
                  expanded={expandedCard === item.title}
                  onToggle={() => toggleCard(item.title)}
                  color={item.color}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default HomePage;
