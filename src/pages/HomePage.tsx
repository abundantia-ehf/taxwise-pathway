
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '@/components/layout/MobileLayout';
import { ArrowUpRight, Bell, User, BookOpen, Database, MessagesSquare, Menu } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  onClick?: () => void;
}

const StatCard = ({ title, value, subtitle, onClick }: StatCardProps) => {
  const { theme } = useTheme();
  
  return (
    <div 
      className={`w-[48%] p-4 rounded-2xl ${theme === 'dark' ? 'bg-zinc-900' : 'bg-white'} cursor-pointer`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-2">
        <span className="text-sm text-muted-foreground">{title}</span>
        <ArrowUpRight size={16} className="text-muted-foreground" />
      </div>
      <div className="mb-1">
        <span className="text-3xl font-semibold">{value}</span>
      </div>
      <div className="text-xs text-muted-foreground">
        {subtitle}
      </div>
    </div>
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

  const handleLearningNavigation = () => {
    if (hasStartedLessons) {
      navigate('/learn');
    } else {
      navigate('/video/intro/start-here');
    }
  };

  return (
    <MobileLayout>
      <div className={cn(
        "min-h-screen",
        theme === 'dark' ? 'bg-background' : 'bg-gray-50'
      )}>
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <img 
                src={theme === 'dark' 
                  ? "/lovable-uploads/e9f20d63-e4f1-4f76-8e74-f28dec18a2a6.png" 
                  : "/lovable-uploads/7c48630c-ff8f-48df-b315-dd322642ee8f.png"
                } 
                alt="Untaxable Logo" 
                className="h-8 w-auto object-contain"
              />
            </div>
            <div className="flex gap-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}>
                <Bell size={20} className="text-foreground" />
              </div>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'}`}>
                <User size={20} className="text-foreground" />
              </div>
            </div>
          </div>

          {/* Page Title */}
          <div className="mb-10">
            <h1 className="text-4xl font-bold mb-1">Tax Overview</h1>
            <p className="text-muted-foreground">Welcome to your tax optimization dashboard</p>
          </div>

          {/* Stats Grid */}
          <div className="mb-10 space-y-6">
            <div className="flex justify-between gap-4">
              <StatCard 
                title="Lessons Completed" 
                value="3" 
                subtitle="Keep learning"
                onClick={() => navigate('/learn')}
              />
              <StatCard 
                title="Tax Rate" 
                value="28%" 
                subtitle="Potential to reduce"
                onClick={() => navigate('/data')}
              />
            </div>
            <div className="flex justify-between gap-4">
              <StatCard 
                title="Questions Asked" 
                value="3" 
                subtitle="Need more help?"
                onClick={() => navigate('/advice')}
              />
              <StatCard 
                title="Potential Savings" 
                value="$12k" 
                subtitle="Yearly estimate"
                onClick={() => navigate('/data')}
              />
            </div>
          </div>

          {/* Tax Optimization Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className={cn(
              "relative rounded-3xl overflow-hidden p-6 h-56 mb-8",
              theme === 'dark' ? 'bg-zinc-900' : 'bg-white'
            )}
            onClick={() => navigate('/data')}
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-xl font-semibold">Tax Reduction Target</h3>
              </div>
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center",
                theme === 'dark' ? 'bg-white' : 'bg-black'
              )}>
                <ArrowUpRight 
                  size={18} 
                  className={theme === 'dark' ? 'text-black' : 'text-white'} 
                />
              </div>
            </div>
            
            {/* Chart visualization - simplified for the example */}
            <div className="mt-4 h-24 relative">
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-brand/20 to-transparent rounded-lg"></div>
              <div className="absolute bottom-0 left-0 right-0 h-10 flex items-end">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div 
                    key={i} 
                    className="flex-1 mx-1 rounded-t-md bg-brand" 
                    style={{ 
                      height: `${Math.random() * 80 + 20}%`,
                      opacity: i % 2 === 0 ? 0.6 : 1
                    }} 
                  />
                ))}
              </div>
              <div className="absolute top-0 left-0 right-0 h-full">
                <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
                  <path 
                    d="M0,50 C80,30 150,80 300,20 L400,20 L400,100 L0,100 Z" 
                    fill="none" 
                    stroke="#D1FF82" 
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Main Actions */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            <div
              className={cn(
                "p-5 rounded-2xl flex items-center cursor-pointer",
                theme === 'dark' ? 'bg-zinc-900 hover:bg-zinc-800' : 'bg-white hover:bg-gray-50'
              )}
              onClick={handleLearningNavigation}
            >
              <div className="w-12 h-12 rounded-full bg-brand/20 flex items-center justify-center mr-4">
                <BookOpen size={20} className="text-brand" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{hasStartedLessons ? "Continue Learning" : "Start Learning"}</h3>
                <p className="text-sm text-muted-foreground">Access tax optimization course modules</p>
              </div>
              <ArrowUpRight size={18} className="text-muted-foreground" />
            </div>

            <div
              className={cn(
                "p-5 rounded-2xl flex items-center cursor-pointer",
                theme === 'dark' ? 'bg-zinc-900 hover:bg-zinc-800' : 'bg-white hover:bg-gray-50'
              )}
              onClick={() => navigate('/advice')}
            >
              <div className="w-12 h-12 rounded-full bg-brand/20 flex items-center justify-center mr-4">
                <MessagesSquare size={20} className="text-brand" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">Ask an Expert</h3>
                <p className="text-sm text-muted-foreground">Get answers from tax professionals</p>
              </div>
              <ArrowUpRight size={18} className="text-muted-foreground" />
            </div>

            <div
              className={cn(
                "p-5 rounded-2xl flex items-center cursor-pointer",
                theme === 'dark' ? 'bg-zinc-900 hover:bg-zinc-800' : 'bg-white hover:bg-gray-50'
              )}
              onClick={() => navigate('/data')}
            >
              <div className="w-12 h-12 rounded-full bg-brand/20 flex items-center justify-center mr-4">
                <Database size={20} className="text-brand" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">Tax Databases</h3>
                <p className="text-sm text-muted-foreground">Explore tax optimization resources</p>
              </div>
              <ArrowUpRight size={18} className="text-muted-foreground" />
            </div>
          </motion.div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default HomePage;
