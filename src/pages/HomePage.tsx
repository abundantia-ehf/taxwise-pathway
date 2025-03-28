
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '@/components/layout/MobileLayout';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, MessageSquare, Headset, ArrowRight, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';
import { Switch } from '@/components/ui/switch';

interface NavigationCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const NavigationCard = ({ title, description, icon, onClick }: NavigationCardProps) => {
  const { theme } = useTheme();
  
  return (
    <Card 
      className={`relative overflow-hidden hover:shadow-md transition-all cursor-pointer border ${
        theme === 'dark' ? 'border-zinc-800 bg-zinc-900/50' : 'border-zinc-200 bg-white'
      }`}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex flex-col space-y-3">
          <div className="flex justify-between items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-brand/20`}>
              {icon}
            </div>
            <ArrowRight size={18} className="text-muted-foreground" />
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
  const { theme, toggleTheme } = useTheme();
  
  // Animation variants
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
      icon: <BookOpen size={20} className="text-brand" />,
      path: "/learn"
    },
    {
      title: "Ask Our AI",
      description: "Get instant answers to your tax questions from our AI assistant",
      icon: <MessageSquare size={20} className="text-brand" />,
      path: "/ai-help"
    },
    {
      title: "Ask a Human",
      description: "Schedule a consultation with our tax experts",
      icon: <Headset size={20} className="text-brand" />,
      path: "/support"
    }
  ];

  return (
    <MobileLayout>
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-background' : 'bg-gray-50'}`}>
        <div className="container max-w-md mx-auto px-4">
          {/* Header with Logo and Theme Toggle */}
          <div className="flex justify-between items-center py-4">
            {/* Logo - moved to left, removed text */}
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center"
            >
              <div className="w-10 h-10">
                <img 
                  src={theme === 'dark' 
                    ? "/lovable-uploads/e9f20d63-e4f1-4f76-8e74-f28dec18a2a6.png" 
                    : "/lovable-uploads/7c48630c-ff8f-48df-b315-dd322642ee8f.png"
                  } 
                  alt="Untaxable Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
            </motion.div>
            
            {/* Theme Toggle - updated to match other pages */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center"
            >
              <button
                onClick={toggleTheme}
                className="rounded-md p-2 hover:bg-accent"
              >
                {theme === 'dark' ? (
                  <Sun className="h-[1.2rem] w-[1.2rem]" />
                ) : (
                  <Moon className="h-[1.2rem] w-[1.2rem]" />
                )}
              </button>
            </motion.div>
          </div>
          
          {/* Recent Progress Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8 mt-4"
          >
            <h2 className="text-lg font-semibold mb-4">Continue Learning</h2>
            <Card className={`border ${theme === 'dark' ? 'border-zinc-800 bg-zinc-900/50' : 'border-zinc-200 bg-white'}`}>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-lg bg-brand/20 flex items-center justify-center mr-4">
                    <BookOpen size={24} className="text-brand" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">Foundations of Tax Optimization</h3>
                    <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full mt-2">
                      <div className="h-2 bg-brand rounded-full" style={{ width: '20%' }}></div>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-muted-foreground">20% complete</span>
                      <button 
                        onClick={() => navigate('/learn')}
                        className="text-xs font-medium text-brand hover:underline flex items-center"
                      >
                        Continue <ArrowRight size={12} className="ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Navigation Section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Explore</h2>
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid gap-4"
            >
              {navigationItems.map((item, index) => (
                <motion.div key={item.title} variants={itemVariants}>
                  <NavigationCard
                    title={item.title}
                    description={item.description}
                    icon={item.icon}
                    onClick={() => navigate(item.path)}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Quick Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h2 className="text-lg font-semibold mb-4">Your Tax Journey</h2>
            <div className="grid grid-cols-2 gap-4">
              <Card className={`border ${theme === 'dark' ? 'border-zinc-800 bg-zinc-900/50' : 'border-zinc-200 bg-white'}`}>
                <CardContent className="p-4 text-center">
                  <h3 className="text-3xl font-bold text-brand">$5,210</h3>
                  <p className="text-xs text-muted-foreground mt-1">Potential Savings</p>
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
