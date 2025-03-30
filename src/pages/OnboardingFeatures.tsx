
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { ArrowRight, Star } from 'lucide-react';

interface FeatureSlideProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const AnimatedCounter = () => {
  const calculateCurrentCount = () => {
    const startDate = new Date('2025-03-30T12:00:00Z').getTime();
    const initialValue = 99320600;
    const now = Date.now();
    const elapsedMs = now - startDate;
    const elapsedTenSeconds = Math.floor(elapsedMs / 10000);
    return initialValue + (elapsedTenSeconds * 21);
  };

  const [count, setCount] = useState(calculateCurrentCount());
  const [displayValue, setDisplayValue] = useState(0);
  const lastUpdateRef = useRef<number>(Date.now());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const initialValue = calculateCurrentCount();
    setCount(initialValue);
    setDisplayValue(initialValue);
    
    intervalRef.current = setInterval(() => {
      const newValue = calculateCurrentCount();
      if (newValue > count) {
        setCount(newValue);
        lastUpdateRef.current = Date.now();
      }
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (count <= displayValue) return;
    
    const animateToNewValue = () => {
      const diff = count - displayValue;
      
      if (displayValue < count) {
        setDisplayValue(prevValue => {
          if (diff <= 5) {
            return count;
          }
          return prevValue + Math.max(1, Math.floor(diff / 10));
        });
        
        requestAnimationFrame(animateToNewValue);
      }
    };

    requestAnimationFrame(animateToNewValue);
  }, [count, displayValue]);

  const formatNumberToDigits = (num: number) => {
    const formatted = num.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    
    const withoutCommas = formatted.replace(/,/g, '');
    
    return {
      individualDigits: withoutCommas.split(''),
      withCommas: formatted
    };
  };

  const { individualDigits, withCommas } = formatNumberToDigits(displayValue);

  return (
    <div className="flex flex-col items-center">
      <div className="relative mb-2">
        <div className="absolute -inset-1 bg-gradient-to-br from-brand/30 to-purple-500/20 blur-lg rounded-xl"></div>
        <div className="relative flex items-center justify-center py-3 px-3 rounded-xl bg-black/50 backdrop-blur-md border border-brand/20 shadow-xl">
          <span className="text-brand text-4xl md:text-5xl font-bold mr-1">$</span>
          <div className="grid grid-flow-col gap-0.5">
            {individualDigits.map((digit, index) => (
              <div key={index} className="relative">
                <div className="flex flex-col items-center">
                  <div className="h-0.5 w-full bg-zinc-700/50 rounded-t-sm"></div>
                  <div className="bg-gradient-to-b from-zinc-800 to-zinc-900 w-6 md:w-8 h-10 md:h-12 flex items-center justify-center rounded overflow-hidden shadow-inner border border-zinc-700/50">
                    <span className="font-mono text-3xl md:text-4xl font-bold bg-gradient-to-b from-brand to-green-300 bg-clip-text text-transparent">
                      {digit}
                    </span>
                  </div>
                  <div className="h-0.5 w-full bg-zinc-700/50 rounded-b-sm"></div>
                </div>
                {(withCommas.length - index) % 4 === 0 && index !== individualDigits.length - 1 && (
                  <div className="absolute -right-1.5 top-1/2 transform -translate-y-1/2">
                    <span className="text-white/60 text-xl font-bold">,</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="text-sm text-white/70 mt-2 font-medium">Total tax savings by Untaxable users</div>
    </div>
  );
};

const FeatureSlide = ({ icon, title, description }: FeatureSlideProps) => {
  if (title === "Start Paying Less Today") {
    return (
      <div className="flex flex-col items-center space-y-4">
        <AnimatedCounter />
        
        <div className="text-center space-y-1 max-w-xs">
          <h2 className="text-xl font-headline">{title}</h2>
          <p className="text-sm text-white/70">{description}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="w-36 h-36 rounded-full bg-brand/10 flex items-center justify-center">
        {icon}
      </div>
      
      <div className="text-center space-y-1 max-w-xs">
        <h2 className="text-xl font-headline">{title}</h2>
        <p className="text-sm text-white/70">{description}</p>
      </div>
    </div>
  );
};

const OnboardingFeatures = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  
  const features = [
    {
      icon: (
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 1v22M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6" stroke="#D1FF82" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Start Paying Less Today",
      description: "Implement legal strategies to get your tax rate to 10%, 5%, 2%, or even ZERO."
    },
    {
      icon: (
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8zM21.2 15.4c.5.9.8 1.9.8 3.1v2M17 8a4 4 0 011.6 7.7" stroke="#D1FF82" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Personal Help From Humans and AI",
      description: "Get personalized support from our real human tax experts as well as our ultra-intelligent tax-based AI."
    },
    {
      icon: (
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 6l-10 7L2 6M4 3h16a2 2 0 012 2v14a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2z" stroke="#D1FF82" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Massive Savings",
      description: "The average person using Untaxable that earns $100,000 saves $21,600 the first year working with us."
    },
    {
      icon: (
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.256-.02-.51-.062-.76M7 20H2v-2a3 3 0 013-3 4.99 4.99 0 012.938 1.243M7 20v-2c0-.256.02-.51.062-.76M16 3.13a4 4 0 010 7.75M19 6a4 4 0 00-3 6.75M6.5 10a3.5 3.5 0 100-7 3.5 3.5 0 000 7z" stroke="#D1FF82" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Help Us Get More People to 0%",
      description: "Your review helps spread Untaxable's mission and create more low-tax citizens."
    }
  ];

  const handleNext = () => {
    if (currentSlide === 3) {
      navigate('/questionnaire');
    } else {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-zinc-900 text-white overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-brand/5 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-brand/5 blur-3xl"></div>
      
      <div className="container max-w-md mx-auto px-4 py-4 h-screen flex flex-col justify-between">
        <div className="flex-1 flex items-center justify-center">
          <Carousel className="w-full" 
            defaultSlideSize={100}
            onSlideChange={setCurrentSlide}
            currentSlide={currentSlide}
          >
            <CarouselContent>
              {features.map((feature, index) => (
                <CarouselItem key={index} className="flex items-center justify-center">
                  <FeatureSlide
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
        
        <div className="pb-6 space-y-4">
          <div className="flex justify-center space-x-2">
            {[0, 1, 2, 3].map((dot) => (
              <div
                key={dot}
                className={`w-2 h-2 rounded-full ${
                  currentSlide === dot ? 'bg-brand' : 'bg-white/30'
                } transition-colors cursor-pointer`}
                onClick={() => setCurrentSlide(dot)}
              />
            ))}
          </div>
          
          <Button 
            className="w-full py-4 bg-brand text-black hover:bg-brand/90 shadow-md shadow-brand/20 text-base font-medium"
            onClick={handleNext}
          >
            {currentSlide < 3 ? (
              <>Next <ArrowRight size={16} className="ml-1" /></>
            ) : (
              <>Rate Us <Star size={16} className="ml-1" /></>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingFeatures;
