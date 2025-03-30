
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, DoorOpen, ArrowRight } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

interface LearningProgressCardProps {
  hasStartedLessons: boolean;
  onClick: () => void;
}

const LearningProgressCard = ({ hasStartedLessons, onClick }: LearningProgressCardProps) => {
  const { theme } = useTheme();

  // Isometric transformation classes
  const isometricTransform = 'transform perspective-[800px] rotate-x-[12deg] rotate-y-[-12deg]';
  const hoverEffect = 'hover:rotate-x-[8deg] hover:rotate-y-[-8deg] hover:translate-y-[-5px] hover:shadow-xl';

  return (
    <Card 
      className={cn(
        "border cursor-pointer transition-all duration-300",
        isometricTransform,
        hoverEffect,
        // Add depth with shadows based on theme
        theme === 'dark' || theme === 'greyscale' 
          ? 'shadow-[5px_5px_15px_rgba(0,0,0,0.5)]' 
          : 'shadow-[5px_5px_15px_rgba(0,0,0,0.2)]'
      )}
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/10 pointer-events-none rounded-lg"></div>
      <CardContent className="p-4 relative z-10">
        <div className="flex items-center">
          <div className={cn(
            `h-12 w-12 rounded-lg flex items-center justify-center mr-4`,
            theme === 'greyscale' ? "bg-zinc-700" : "bg-brand/20",
            // Add a 3D effect to the icon container
            'shadow-[2px_2px_5px_rgba(0,0,0,0.2)]',
            'transform translate-y-[-2px]'
          )}>
            {hasStartedLessons ? (
              <BookOpen size={24} className={theme === 'greyscale' ? "text-white" : "text-zinc-900"} />
            ) : (
              <DoorOpen size={24} className={theme === 'greyscale' ? "text-white" : "text-zinc-900"} />
            )}
          </div>
          <div className="flex-1">
            {hasStartedLessons ? (
              <>
                <h3 className="font-headline font-semibold">Foundations of Tax Optimization</h3>
                <div className={cn(
                  "h-2 w-full rounded-full mt-2 overflow-hidden shadow-inner",
                  theme === 'dark' || theme === 'greyscale' ? "bg-gray-700" : "bg-gray-200"
                )}>
                  <div className={cn(
                    `h-2 rounded-full transform translate-z-[2px]`,
                    theme === 'greyscale' ? "bg-gray-400" : "bg-brand"
                  )} style={{ width: '20%' }}></div>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-muted-foreground">20% complete</span>
                  <button 
                    className={cn(
                      `text-xs font-medium hover:underline flex items-center`,
                      theme === 'greyscale' ? "text-white" : "text-brand"
                    )}
                  >
                    Continue <ArrowRight size={12} className="ml-1" />
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 className="font-headline font-semibold">Start Here: Course Overview</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Begin your tax optimization journey with our introductory lesson
                </p>
                <button 
                  className={cn(
                    `text-xs font-medium hover:underline flex items-center mt-2`,
                    theme === 'greyscale' ? "text-white" : "text-brand"
                  )}
                >
                  Watch now <ArrowRight size={12} className="ml-1" />
                </button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LearningProgressCard;
