
import React, { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BookOpen, Bot, MessagesSquare, Settings, Home } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

interface MobileLayoutProps {
  children: ReactNode;
  hideNavigation?: boolean;
}

const MobileLayout = ({ children, hideNavigation = false }: MobileLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme } = useTheme();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navigationItems = [
    {
      label: 'Home',
      icon: Home,
      path: '/home',
    },
    {
      label: 'Learn',
      icon: BookOpen,
      path: '/learn',
    },
    {
      label: 'AI Help',
      icon: Bot,
      path: '/ai-help',
    },
    {
      label: 'Expert Help',
      icon: MessagesSquare,
      path: '/advice',
    },
    {
      label: 'Settings',
      icon: Settings,
      path: '/settings',
    },
  ];

  return (
    <div className={cn(
      "flex flex-col min-h-screen w-full overflow-hidden",
      theme === 'dark' ? 'bg-background text-foreground' : 'bg-background text-foreground'
    )}>
      <main className="flex-1 overflow-y-auto pb-16">
        {children}
      </main>

      {!hideNavigation && (
        <nav className="fixed bottom-0 left-0 right-0 border-t bg-background/80 backdrop-blur-md flex justify-between items-center px-2 py-2 z-50">
          {navigationItems.map((item) => {
            const active = isActive(item.path);
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={cn(
                  "flex flex-col items-center justify-center w-1/5 py-1 px-1 rounded-lg transition-all",
                  active 
                    ? theme === 'dark' ? "text-brand" : "text-brand-dark" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <div className="flex items-center justify-center">
                  <item.icon size={20} />
                </div>
                <span className="text-xs mt-1">{item.label}</span>
              </button>
            );
          })}
        </nav>
      )}
    </div>
  );
};

export default MobileLayout;
