
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Euro, PoundSterling, JapaneseYen, RussianRuble } from 'lucide-react';

const CurrencyIcon = () => {
  const [currentIcon, setCurrentIcon] = useState(0);
  const icons = [
    <DollarSign key="dollar" className="h-10 w-10 text-brand" />,
    <Euro key="euro" className="h-10 w-10 text-brand" />,
    <PoundSterling key="pound" className="h-10 w-10 text-brand" />,
    <JapaneseYen key="yen" className="h-10 w-10 text-brand" />,
    <RussianRuble key="ruble" className="h-10 w-10 text-brand" />
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIcon((prev) => (prev + 1) % icons.length);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <motion.div
      key={currentIcon}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      {icons[currentIcon]}
    </motion.div>
  );
};

export default CurrencyIcon;
