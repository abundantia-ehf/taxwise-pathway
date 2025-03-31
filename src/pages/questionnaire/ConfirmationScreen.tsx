
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
    // Generate random data points
    const generateRandomData = () => {
      const dataPoints = [];
      // Generate 9 random data points between 20 and 80 (increased from 7 to 9)
      for (let i = 0; i < 9; i++) {
        dataPoints.push({
          value: Math.floor(Math.random() * 60) + 20, // Random value between 20 and 80
        });
      }
      return dataPoints;
    };

    setChartData(generateRandomData());
    
    // Set animation complete after a delay to match the slower animation duration (30% slower)
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 1950); // Increased from 1500ms to 1950ms (30% slower)
    
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
        <div className="flex flex-col h-full justify-center">
          {/* Chart container with edge-to-edge styling */}
          <div className="relative h-[33vh] -mx-6 mb-6">
            <div className="absolute inset-x-0 w-screen left-[calc(-50vw+50%)]">
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
                className="w-full h-[33vh]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={chartData}
                    margin={{ top: 20, right: -50, left: -50, bottom: 0 }}
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
                      animationDuration={1950} // Increased from 1500ms to 1950ms (30% slower)
                      animationEasing="ease-out"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </div>
          
          {/* Message based on questionnaire answers - moved down 5% with mt-[5vh] */}
          <div className="text-center mb-8 px-6 mt-[5vh]">
            <h2 className="text-xl font-headline font-semibold mb-3">We've Analyzed Your Answers.</h2>
            <p className="text-sm text-muted-foreground">
              Based on your input, there is a strong indication you could save a significant amount of money each year on taxes.
            </p>
          </div>
          
          {/* Bouncing downward arrow - moved down 5% */}
          <div className="flex justify-center mb-8">
            <ArrowDown className="text-brand animate-bounce-slow" size={42} />
          </div>
          
          {/* Action button - moved down 5% */}
          <div className="mt-4 px-6">
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
