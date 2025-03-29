
import React, { ReactNode, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BookOpen, Database, MessagesSquare, Settings, Home } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

interface MobileLayoutProps {
  children: ReactNode;
  hideNavigation?: boolean;
}

const MobileLayout = ({ children, hideNavigation = false }: MobileLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, forceDarkMode, resetThemeForce } = useTheme();
  
  // Check if the current route is part of the onboarding flow
  const isOnboardingRoute = 
    location.pathname === '/welcome' ||
    location.pathname === '/onboarding-features' ||
    location.pathname === '/questionnaire' ||
    location.pathname.startsWith('/questionnaire/') ||
    location.pathname === '/onboarding' ||
    location.pathname === '/subscribe';
  
  // Force dark mode for onboarding routes
  useEffect(() => {
    if (isOnboardingRoute) {
      forceDarkMode();
    } else {
      resetThemeForce();
    }
  }, [isOnboardingRoute, forceDarkMode, resetThemeForce]);
  
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
      label: 'Expert Help',
      icon: MessagesSquare,
      path: '/advice',
    },
    {
      label: 'Data',
      icon: Database,
      path: '/data',
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
        <nav className="fixed bottom-0 left-0 right-0 border-t bg-[#121212] backdrop-blur-md flex justify-between items-center px-2 py-2 z-50">
          {navigationItems.map((item) => {
            const active = isActive(item.path);
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={cn(
                  "flex flex-col items-center justify-center w-1/5 py-1 px-1 rounded-lg transition-all",
                  active 
                    ? "text-brand"
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

/* Original light mode navigation styling for future reference:
active 
  ? cn(
      "text-brand",
      theme === 'light' ? "bg-gray-800 dark:bg-transparent" : ""
    ) 
  : "text-muted-foreground hover:text-foreground"
*/

export default MobileLayout;
