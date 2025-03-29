
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '@/components/layout/MobileLayout';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, Database, MessagesSquare, Settings, Home } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';

interface NavigationSpoke {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  color: string;
}

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

  // Navigation spokes data
  const navigationSpokes: NavigationSpoke[] = [
    {
      title: "Learn",
      description: "Access our tax optimization courses",
      icon: <BookOpen size={24} className="text-white" />,
      path: "/learn",
      color: "bg-gradient-to-br from-purple-500 to-purple-700"
    },
    {
      title: "Ask an Expert",
      description: "Get help from our tax experts",
      icon: <MessagesSquare size={24} className="text-white" />,
      path: "/advice",
      color: "bg-gradient-to-br from-blue-500 to-blue-700"
    },
    {
      title: "Data",
      description: "Tax optimization resources",
      icon: <Database size={24} className="text-white" />,
      path: "/data",
      color: "bg-gradient-to-br from-emerald-500 to-emerald-700"
    },
    {
      title: "Settings",
      description: "Manage your account",
      icon: <Settings size={24} className="text-white" />,
      path: "/settings",
      color: "bg-gradient-to-br from-gray-500 to-gray-700"
    }
  ];

  return (
    <MobileLayout hideNavigation={true}>
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
        
        <div className="container max-w-md mx-auto px-4 pb-12">
          {/* Greeting Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-6 mb-8"
          >
            <h1 className="text-2xl font-bold">Welcome to Untaxable</h1>
            <p className="text-muted-foreground">Your path to zero taxes starts here</p>
          </motion.div>

          {/* Continue Learning Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-10"
          >
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
                        <h3 className="font-medium">Continue Learning</h3>
                        <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full mt-2">
                          <div className="h-2 bg-brand rounded-full" style={{ width: '20%' }}></div>
                        </div>
                        <div className="flex justify-between mt-1">
                          <span className="text-xs text-muted-foreground">20% complete</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <h3 className="font-medium">Start Your Tax Journey</h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          Begin with our introductory lesson
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Hub and Spoke Navigation */}
          <div className="relative">
            {/* Central Hub */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-20 h-20 rounded-full bg-brand flex items-center justify-center mx-auto mb-10 shadow-lg"
              onClick={() => navigate('/home')}
            >
              <Home size={30} className="text-white" />
            </motion.div>

            {/* Spokes */}
            <div className="grid grid-cols-2 gap-4">
              {navigationSpokes.map((spoke, index) => (
                <motion.div
                  key={spoke.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  onClick={() => navigate(spoke.path)}
                  className="cursor-pointer"
                >
                  <div className={`rounded-xl ${spoke.color} p-4 h-full shadow-md transition-transform duration-200 hover:scale-105`}>
                    <div className="rounded-full w-10 h-10 flex items-center justify-center bg-white/20 mb-3">
                      {spoke.icon}
                    </div>
                    <h3 className="font-semibold text-white text-lg">{spoke.title}</h3>
                    <p className="text-white/80 text-xs mt-1">{spoke.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-10"
          >
            <h2 className="text-lg font-semibold mb-4">Your Progress</h2>
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
