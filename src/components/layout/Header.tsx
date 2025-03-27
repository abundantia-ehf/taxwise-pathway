
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Moon, Sun } from 'lucide-react';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  showThemeToggle?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  title, 
  showBack = false,
  showThemeToggle = true
}) => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-14 items-center">
        <div className="flex w-full justify-between items-center">
          <div className="flex items-center">
            {showBack && (
              <button 
                onClick={() => navigate(-1)}
                className="mr-2 rounded-md p-1 hover:bg-accent"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            )}
            <h1 className="font-semibold text-lg">{title}</h1>
          </div>
          
          {showThemeToggle && (
            <button
              onClick={toggleTheme}
              className="rounded-md p-2 hover:bg-accent"
            >
              {theme === 'dark' ? (
                <Sun className="h-[1.2rem] w-[1.2rem]" />
              ) : (
                <Moon className="h-[1.2rem] w-[1.2rem]" />
              )}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
