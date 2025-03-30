
import React, { useEffect, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

// Array of quotes about taxation, freedom, etc.
const quotes = [
  {
    quote: "The only way to deal with an unfree world is to become so absolutely free that your very existence is an act of rebellion.",
    author: "Albert Camus"
  }
];

const GreetingQuote = () => {
  const [greeting, setGreeting] = useState('');
  const [quote, setQuote] = useState(quotes[0]);
  const { theme } = useTheme();

  useEffect(() => {
    // Set greeting based on time of day
    const setGreetingByTime = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) {
        setGreeting('Good morning.');
      } else if (hour >= 12 && hour < 18) {
        setGreeting('Good afternoon.');
      } else {
        setGreeting('Good evening.');
      }
    };
    
    // Set initial greeting
    setGreetingByTime();
    
    // Update greeting if user keeps the app open across time boundaries
    const intervalId = setInterval(setGreetingByTime, 60000); // Check every minute
    
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // Select quote based on the day of the year
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 0);
    const diff = today.getTime() - startOfYear.getTime();
    const dayOfYear = Math.floor(diff / (24 * 60 * 60 * 1000));
    const quoteIndex = dayOfYear % quotes.length;
    setQuote(quotes[quoteIndex]);
  }, []);

  // Subtle isometric transformation for the quote
  const isometricTransform = 'transform perspective-[1000px] rotate-x-[5deg] rotate-y-[-3deg]';

  return (
    <div className="text-center py-3 px-6 mb-3">
      <h2 className="text-xl font-semibold mb-1">{greeting}</h2>
      <div className={cn(
        "flex items-start mx-auto max-w-xs sm:max-w-sm md:max-w-md",
        isometricTransform,
        "transition-all duration-300"
      )}>
        <div className={cn(
          "w-full p-3 rounded-lg",
          theme === 'dark' 
            ? "bg-zinc-800/50" 
            : theme === 'greyscale' 
              ? "bg-zinc-700/50" 
              : "bg-zinc-100/50",
          "shadow-sm"
        )}>
          <p className="text-xs text-muted-foreground italic">"{ quote.quote }"</p>
          <p className="text-xs text-right mt-1 font-medium">— {quote.author}</p>
        </div>
      </div>
    </div>
  );
};

export default GreetingQuote;
