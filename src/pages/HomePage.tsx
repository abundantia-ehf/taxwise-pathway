
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '@/components/layout/MobileLayout';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Database, MessagesSquare, ArrowRight, ChevronDown } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/layout/Header';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface StackedCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

const StackedCard = ({ 
  title, 
  description, 
  icon, 
  onClick, 
  isOpen, 
  onToggle 
}: StackedCardProps) => {
  const { theme } = useTheme();
  
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={onToggle}
      className={`mb-3 border rounded-lg transition-all overflow-hidden ${
        theme === 'dark' ? 'border-zinc-800 bg-zinc-900/50' : 'border-zinc-200 bg-white'
      } ${isOpen ? 'shadow-md' : ''}`}
    >
      <CollapsibleTrigger className="w-full p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-brand/20 mr-3`}>
              {icon}
            </div>
            <h3 className="font-semibold text-lg text-left">{title}</h3>
          </div>
          <ChevronDown 
            size={18} 
            className={`text-muted-foreground transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} 
          />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="px-4 pb-4 pt-0">
          <div className="pl-[52px]"> {/* This aligns with the icon + spacing */}
            <p className="text-sm text-muted-foreground mb-3">{description}</p>
            <button 
              onClick={onClick}
              className="flex items-center text-sm font-medium text-brand hover:underline"
            >
              Open <ArrowRight size={14} className="ml-1" />
            </button>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

const HomePage = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [hasStartedLessons, setHasStartedLessons] = useState(false);
  const [openCard, setOpenCard] = useState<string | null>("learn"); // Default open card
  
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
  
  const handleLearningNavigation = () => {
    if (hasStartedLessons) {
      navigate('/learn');
    } else {
      navigate('/video/intro/start-here');
    }
  };

  const navigationItems = [
    {
      id: "learn",
      title: "Learn",
      description: "Access our comprehensive tax optimization course modules",
      icon: <BookOpen size={20} className="text-brand" />,
      path: "/learn",
      onClick: () => navigate("/learn")
    },
    {
      id: "support",
      title: "Ask an Untaxable Pro",
      description: "Schedule a consultation with our tax experts",
      icon: <MessagesSquare size={20} className="text-brand" />,
      path: "/support",
      onClick: () => navigate("/support")
    },
    {
      id: "data",
      title: "Tax Databases",
      description: "Access our collection of tax optimization databases and resources",
      icon: <Database size={20} className="text-brand" />,
      path: "/data",
      onClick: () => navigate("/data")
    }
  ];

  const toggleCard = (id: string) => {
    setOpenCard(openCard === id ? null : id);
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
        
        <div className="container max-w-md mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8 mt-4"
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
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-1"
            >
              <AnimatePresence>
                {navigationItems.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <StackedCard
                      title={item.title}
                      description={item.description}
                      icon={item.icon}
                      onClick={item.onClick}
                      isOpen={openCard === item.id}
                      onToggle={() => toggleCard(item.id)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h2 className="text-lg font-semibold mb-4">Your Untaxable Journey</h2>
            <div className="grid grid-cols-2 gap-4">
              <Card className={`border ${theme === 'dark' ? 'border-zinc-800 bg-zinc-900/50' : 'border-zinc-200 bg-white'}`}>
                <CardContent className="p-4 text-center">
                  <h3 className="text-3xl font-bold text-brand">3</h3>
                  <p className="text-xs text-muted-foreground mt-1">Questions Answered</p>
                </CardContent>
              </Card>
              <Card className={`border ${theme === 'dark' ? 'border-zinc-800 bg-zinc-900/50' : 'border-zinc-200 bg-white'}`}>
                <CardContent className="p-4 text-center">
                  <h3 className="text-3xl font-bold text-brand">3</h3>
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
