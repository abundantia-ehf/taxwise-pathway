
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
      theme === 'dark' ? 'bg-zinc-950 text-foreground' : 'bg-gray-50 text-foreground'
    )}>
      <main className="flex-1 overflow-y-auto pb-20">
        {children}
      </main>

      {!hideNavigation && (
        <nav className={cn(
          "fixed bottom-4 left-4 right-4 rounded-full border-t flex justify-between items-center px-4 py-3 z-50",
          theme === 'dark' 
            ? 'bg-zinc-900 border-zinc-800' 
            : 'bg-white border-gray-200 shadow-sm'
        )}>
          {navigationItems.map((item) => {
            const active = isActive(item.path);
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={cn(
                  "flex flex-col items-center justify-center w-10 h-10 rounded-full transition-all",
                  active 
                    ? "text-brand bg-brand/10"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <div className="flex items-center justify-center">
                  <item.icon size={20} />
                </div>
              </button>
            );
          })}
        </nav>
      )}
    </div>
  );
};

export default MobileLayout;
