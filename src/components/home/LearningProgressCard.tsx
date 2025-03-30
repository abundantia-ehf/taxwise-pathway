
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, DoorOpen, ArrowRight } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface LearningProgressCardProps {
  hasStartedLessons: boolean;
  onClick: () => void;
}

const LearningProgressCard = ({ hasStartedLessons, onClick }: LearningProgressCardProps) => {
  const { theme } = useTheme();

  return (
    <Card 
      className="border cursor-pointer"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-center">
          <div className={`h-12 w-12 rounded-lg ${theme === 'greyscale' ? "bg-zinc-700" : "bg-brand/20"} flex items-center justify-center mr-4`}>
            {hasStartedLessons ? (
              <BookOpen size={24} className={theme === 'greyscale' ? "text-white" : "text-brand"} />
            ) : (
              <DoorOpen size={24} className={theme === 'greyscale' ? "text-white" : "text-brand"} />
            )}
          </div>
          <div className="flex-1">
            {hasStartedLessons ? (
              <>
                <h3 className="font-headline font-semibold">Foundations of Tax Optimization</h3>
                <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full mt-2">
                  <div className={`h-2 ${theme === 'greyscale' ? "bg-gray-400" : "bg-brand"} rounded-full`} style={{ width: '20%' }}></div>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-muted-foreground">20% complete</span>
                  <button 
                    className={`text-xs font-medium ${theme === 'greyscale' ? "text-white" : "text-brand"} hover:underline flex items-center`}
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
                  className={`text-xs font-medium ${theme === 'greyscale' ? "text-white" : "text-brand"} hover:underline flex items-center mt-2`}
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
