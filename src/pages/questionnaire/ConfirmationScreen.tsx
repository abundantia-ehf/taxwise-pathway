
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Handshake, ArrowDown } from 'lucide-react';
import MobileLayout from '@/components/layout/MobileLayout';
import { ChartContainer } from '@/components/ui/chart';
import { Area, AreaChart, ResponsiveContainer } from 'recharts';
import '@/styles/customAnimations.css';

const ConfirmationScreen = () => {
  const navigate = useNavigate();
  const [chartData, setChartData] = useState<{ value: number }[]>([]);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    // Generate data points with the last ones extending beyond visible area
    const generateRandomData = () => {
      // Adding extra points to ensure it extends beyond the right edge
      const points = Array.from({ length: 12 }, (_, i) => ({
        value: Math.floor(Math.random() * 60) + 20 // Values between 20 and 80
      }));
      return points;
    };

    setChartData(generateRandomData());
    
    // Set animation complete after a delay to match the animation duration
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleContinue = () => {
    // Navigate to the tax rate screen
    navigate('/questionnaire/tax-rate');
  };

  return (
    <MobileLayout hideNavigation>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col h-full"
      >
        <div className="flex flex-col h-full px-6 justify-center">
          {/* Graph visualization taking up the top third - with extra width to extend beyond screen */}
          <div className="w-full h-[33vh] -mx-6 mb-6 overflow-hidden">
            <ChartContainer 
              config={{
                line: {
                  theme: { 
                    light: '#D1FF82', 
                    dark: '#D1FF82' 
                  }
                },
                gradient: {
                  theme: { 
                    light: 'rgba(209, 255, 130, 0.2)', 
                    dark: 'rgba(209, 255, 130, 0.2)' 
                  }
                }
              }}
              className="w-[calc(100%+3rem)] -ml-6 h-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{ top: 20, right: -200, left: -30, bottom: 0 }}
                  style={{ width: '150%' }} // Making the chart wider than the container
                >
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#D1FF82" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#D1FF82" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#D1FF82"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorValue)"
                    isAnimationActive={true}
                    animationDuration={1500}
                    animationEasing="ease-out"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
          
          {/* Message based on questionnaire answers */}
          <div className="text-center mb-8">
            <h2 className="text-xl font-headline font-semibold mb-3">We've Analyzed Your Answers.</h2>
            <p className="text-base text-muted-foreground">
              Based on your answers, there is a strong indication you could save a significant amount of money each year on taxes.
            </p>
          </div>
          
          {/* Bouncing downward arrow */}
          <div className="flex justify-center mb-8">
            <ArrowDown className="text-brand animate-bounce-slow" size={42} />
          </div>
          
          {/* Action button */}
          <div className="mt-4">
            <Button 
              onClick={handleContinue}
              className="w-full py-6 bg-brand text-black hover:bg-brand/90"
            >
              Let's fix that together <Handshake className="ml-2" size={20} />
            </Button>
          </div>
        </div>
      </motion.div>
    </MobileLayout>
  );
};

export default ConfirmationScreen;
