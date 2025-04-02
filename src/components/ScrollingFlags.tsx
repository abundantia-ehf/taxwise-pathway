
import React from 'react';
import { motion } from 'framer-motion';

// List of country codes in the specified order
const COUNTRY_FLAGS = [
  // First specified countries
  'us', 'ar', 'mx', 'ca', 'za', 'sg', 'my', 'nz', 'hk', 'gb', 'id', 'au',
  // European countries in alphabetical order (excluding UK)
  'al', 'ad', 'at', 'by', 'be', 'ba', 'bg', 'hr', 'cy', 'cz', 'dk', 
  'ee', 'fi', 'fr', 'de', 'gr', 'hu', 'is', 'ie', 'it', 'lv', 'li', 
  'lt', 'lu', 'mt', 'md', 'mc', 'me', 'nl', 'mk', 'no', 'pl', 'pt', 
  'ro', 'ru', 'sm', 'rs', 'sk', 'si', 'es', 'se', 'ch', 'ua', 'va'
];

// Duplicate the array to create a seamless loop
const ALL_FLAGS = [...COUNTRY_FLAGS, ...COUNTRY_FLAGS];

const ScrollingFlags = () => {
  return (
    <div className="w-full overflow-hidden">
      <motion.div 
        className="flex"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ 
          repeat: Infinity,
          repeatType: "loop",
          duration: 30,
          ease: "linear"
        }}
      >
        {ALL_FLAGS.map((code, index) => (
          <div key={index} className="mx-2 flex-shrink-0">
            <img 
              src={`https://flagcdn.com/24x18/${code.toLowerCase()}.png`}
              alt={`Flag ${code}`}
              className="h-4 w-auto object-contain"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default ScrollingFlags;
