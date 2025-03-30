
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Database, MessagesSquare } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { motion } from 'framer-motion';
import NavigationCard from './NavigationCard';

const NavigationSection = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  
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
  
  // Removed color property from icons to allow our new styling to take effect
  const navigationItems = [
    {
      title: "Learn",
      description: "Access our comprehensive tax optimization course modules",
      icon: <BookOpen size={20} />,
      path: "/learn"
    },
    {
      title: "Ask an Untaxable Pro",
      description: "Schedule a consultation with our tax experts",
      icon: <MessagesSquare size={20} />,
      path: "/support"
    },
    {
      title: "Tax Databases",
      description: "Access our collection of tax optimization databases and resources",
      icon: <Database size={20} />,
      path: "/data"
    }
  ];

  return (
    <div className="mb-5">
      <h2 className="text-lg font-headline font-semibold mb-3">Explore</h2>
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
  );
};

export default NavigationSection;
