
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

interface NavigationCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
  index: number;
}

const NavigationCard = ({ title, description, icon, onClick, index }: NavigationCardProps) => {
  const { theme } = useTheme();
  
  // Different gradient styles based on the card index and theme
  const gradientStyles = [
    // First card - diagonal gradient
    theme === 'greyscale'
      ? 'border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-700'
      : theme === 'dark'
        ? 'border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-800 to-brand/20'
        : 'border-zinc-200 bg-gradient-to-br from-white via-brand/20 to-brand/40',
    
    // Second card - horizontal gradient
    theme === 'greyscale'
      ? 'border-zinc-800 bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-700'
      : theme === 'dark'
        ? 'border-zinc-800 bg-gradient-to-r from-zinc-900 via-zinc-800 to-brand/25'
        : 'border-zinc-200 bg-gradient-to-r from-white via-brand/30 to-brand/50',
    
    // Third card - radial gradient
    theme === 'greyscale'
      ? 'border-zinc-800 bg-gradient-to-tr from-zinc-800 via-zinc-800/90 to-zinc-900'
      : theme === 'dark'
        ? 'border-zinc-800 bg-gradient-to-tr from-brand/15 via-zinc-800/90 to-zinc-900'
        : 'border-zinc-200 bg-gradient-to-bl from-brand/30 via-brand/20 to-white',
  ];
  
  const cardStyle = gradientStyles[index % gradientStyles.length];
  
  // Icon background color
  const iconBgClass = theme === 'greyscale' 
    ? 'bg-zinc-700' 
    : 'bg-brand';
  
  // Arrow background color
  const arrowBgClass = theme === 'dark' || theme === 'greyscale' 
    ? 'bg-zinc-800' 
    : 'bg-zinc-200';
  
  return (
    <Card 
      className={`relative overflow-hidden hover:shadow-md transition-all cursor-pointer border ${cardStyle}`}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex flex-col">
          {/* Card Header Row - contains heading and icons */}
          <div className="flex justify-between items-center mb-2">
            {/* Heading with increased font size (50% larger) */}
            <h3 className="font-headline font-semibold text-2xl">{title}</h3>
            
            {/* Icons section - both on the right side with overlap */}
            <div className="flex items-center -space-x-2">
              {/* Main icon with increased size (20% larger) */}
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${iconBgClass} z-10`} style={{ width: '48px', height: '48px' }}>
                {icon}
              </div>
              
              {/* Arrow icon underneath */}
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${arrowBgClass} z-0`} style={{ width: '48px', height: '48px' }}>
                <ArrowRight size={19.2} className="text-muted-foreground" />
              </div>
            </div>
          </div>
          
          {/* Description text appears below the heading and icons */}
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default NavigationCard;
