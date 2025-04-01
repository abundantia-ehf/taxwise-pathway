import React, { ReactNode, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Presentation, Grid2x2Check, MessageSquare, Settings2, Home } from 'lucide-react';
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
  
  const isOnboardingRoute = 
    location.pathname === '/welcome' ||
    location.pathname === '/onboarding-features' ||
    location.pathname === '/questionnaire' ||
    location.pathname.startsWith('/questionnaire/') ||
    location.pathname === '/onboarding' ||
    location.pathname === '/subscribe';
  
  const isPaywallRoute = location.pathname === '/paywall';
  
  useEffect(() => {
    if (isOnboardingRoute) {
      forceDarkMode();
    } else {
      resetThemeForce();
    }
    
    if (isPaywallRoute) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOnboardingRoute, isPaywallRoute, forceDarkMode, resetThemeForce]);
  
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
      icon: Presentation,
      path: '/learn',
    },
    {
      label: 'Ask Untaxable',
      icon: MessageSquare,
      path: '/advice',
    },
    {
      label: 'Data',
      icon: Grid2x2Check,
      path: '/data',
    },
    {
      label: 'Settings',
      icon: Settings2,
      path: '/settings',
    },
  ];

  return (
    <div className={cn(
      "flex flex-col min-h-screen w-full",
      isPaywallRoute ? "overflow-hidden" : "overflow-hidden",
      theme === 'dark' || theme === 'greyscale' ? 'bg-background text-foreground' : 'bg-background text-foreground'
    )}>
      <main className={cn(
        "flex-1",
        isPaywallRoute ? "overflow-hidden" : "overflow-y-auto pb-16"
      )}>
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
                  "flex items-center justify-center w-1/5 py-2 px-1 rounded-lg transition-all",
                  active 
                    ? theme === 'greyscale' ? "text-white" : "text-brand"
                    : "text-muted-foreground hover:text-foreground"
                )}
                aria-label={item.label}
              >
                <div className="flex items-center justify-center">
                  <item.icon size={24} />
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
