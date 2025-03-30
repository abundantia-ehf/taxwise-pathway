import React, { useEffect, useState } from 'react';

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

  return (
    <div className="text-center py-4 px-6 mb-4">
      <h2 className="text-xl font-semibold mb-2">{greeting}</h2>
      <div className="flex items-start mx-auto max-w-xs sm:max-w-sm md:max-w-md">
        <div>
          <p className="text-xs text-muted-foreground italic">{quote.quote}</p>
          <p className="text-xs text-right mt-1 font-medium">— {quote.author}</p>
        </div>
      </div>
    </div>
  );
};

export default GreetingQuote;
