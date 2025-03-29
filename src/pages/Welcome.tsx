
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const DotMatrixWorldMap = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  
  // World map data - simplified dot matrix representation
  const mapData = [
    "                                                                        ",
    "                                                                        ",
    "                   ***        *****                                     ",
    "                  *****    **********                                   ",
    "                 **********************                                 ",
    "                  ******** ***********       ******                     ",
    "                   *********************    *********                   ",
    "                   *************************************                ",
    "                    *************************************               ",
    "                    **************************************              ",
    "                  ****************************************              ",
    "                 *******************************************            ",
    "                *********************************************           ",
    "                **********************************************          ",
    "                 **********************************************         ",
    "                   ********************************************         ",
    "                    *******************************************         ",
    "                    *****************************************          ",
    "                      ***************************************          ",
    "                        **************************************         ",
    "                       **************************************          ",
    "                       *************************************           ",
    "                          *********************************            ",
    "                           ********************************            ",
    "                            ******************************             ",
    "                             ****************************              ",
    "                               ***********************                 ",
    "                                  *****************                    ",
    "                                      **********                       ",
    "                                                                        ",
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = Math.min(window.innerHeight * 0.25, 200); // Limit height to 25% of viewport or 200px max
    };

    // Initial resize
    resizeCanvas();

    // Resize on window resize
    window.addEventListener('resize', resizeCanvas);

    // Variables for animation
    const dotSize = 4;
    const dotSpacing = 12;
    const mapWidth = mapData[0].length * dotSpacing;
    let offsetX = 0;

    // Set the dot color based on theme
    const dotColor = theme === 'dark' ? 'rgba(209, 255, 130, 0.6)' : 'rgba(160, 197, 102, 0.8)';
    
    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Calculate vertical centering
      const startY = (canvas.height - mapData.length * dotSpacing) / 2;
      
      // Draw the dot matrix
      for (let y = 0; y < mapData.length; y++) {
        for (let x = 0; x < mapData[y].length; x++) {
          if (mapData[y][x] === '*') {
            const posX = (x * dotSpacing + offsetX) % (mapWidth + canvas.width) - mapWidth;
            const posY = startY + y * dotSpacing;
            
            // Only draw dots that are visible on the canvas
            if (posX >= -dotSize && posX <= canvas.width) {
              ctx.beginPath();
              ctx.arc(posX, posY, dotSize, 0, Math.PI * 2);
              ctx.fillStyle = dotColor;
              ctx.fill();
            }
          }
        }
      }
      
      // Move the map
      offsetX -= 0.5; // Controls the speed of scrolling
      
      requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [theme]);

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full" 
      style={{ maxHeight: '200px' }}
    />
  );
};

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-zinc-900 text-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-brand/5 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-brand/5 blur-3xl"></div>
      
      {/* Dot Matrix World Map */}
      <div className="w-full mb-4 pt-6 px-6">
        <DotMatrixWorldMap />
      </div>
      
      <div className="container max-w-md mx-auto px-6 py-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-center"
        >
          {/* Logo section */}
          <div className="flex flex-col items-center space-y-8 w-full mt-8">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="w-20 h-20"
            >
              <img 
                src="/lovable-uploads/e59d93a8-9521-40fd-b709-37eae4b6f67e.png" 
                alt="Untaxable Logo" 
                className="w-full h-full object-cover rounded-xl"
              />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-center space-y-2"
            >
              <h1 className="text-3xl font-unitext font-bold tracking-tight">
                Become Untaxable
              </h1>
              <p className="text-base text-white/70">
                Let's begin your path to legally paying zero taxes.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex justify-center mt-20"
            >
              <ArrowDown className="text-brand animate-bounce" size={42} />
            </motion.div>
            
            {/* Button now positioned with equal spacing */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="w-full mt-20"
            >
              <Button 
                className="w-full py-5 bg-brand text-black hover:bg-brand/90 shadow-md shadow-brand/20 text-base font-medium"
                onClick={() => navigate('/onboarding-features')}
              >
                Get Started <ArrowRight className="ml-1" size={18} />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Welcome;
