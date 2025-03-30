
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '@/components/layout/MobileLayout';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'; 
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { 
  User, 
  CircleDollarSign, 
  Bell, 
  Lock, 
  LogOut, 
  Moon, 
  Sun, 
  Contrast,
  Mail,
  Apple,
  Github
} from 'lucide-react';

const Settings = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  
  // Check if subscription is trial and format date
  const isTrialActive = user?.subscription?.status === 'trial' && user?.subscription?.trialEndDate ? 
    new Date(user.subscription.trialEndDate) > new Date() : false;
  
  const formatDate = (date: Date | undefined) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Get the appropriate theme icon and label
  const getThemeIcon = () => {
    switch (theme) {
      case 'dark':
        return <Moon className="h-5 w-5 mr-2" />;
      case 'light':
        return <Sun className="h-5 w-5 mr-2" />;
      case 'greyscale':
        return <Contrast className="h-5 w-5 mr-2" />;
      default:
        return <Moon className="h-5 w-5 mr-2" />;
    }
  };

  // Get provider icon
  const getProviderIcon = () => {
    if (!user?.provider) return <Mail className="h-4 w-4" />;
    
    switch (user.provider) {
      case 'apple':
        return <Apple className="h-4 w-4" />;
      case 'google':
        return (
          <svg viewBox="0 0 488 512" width="16" height="16">
            <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" fill="currentColor"/>
          </svg>
        );
      case 'email':
      default:
        return <Mail className="h-4 w-4" />;
    }
  };

  const getThemeLabel = () => {
    switch (theme) {
      case 'dark':
        return 'Dark Mode';
      case 'light':
        return 'Light Mode';
      case 'greyscale':
        return 'Greyscale Mode';
      default:
        return 'Dark Mode';
    }
  };

  // Generate avatar fallback initials from name
  const getInitials = () => {
    if (!user?.name) return "U";
    return user.name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <MobileLayout>
      <Header title="Settings" />
      
      <div className="container p-3 space-y-3">
        {/* Profile Card */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Avatar className="h-16 w-16 mr-3">
                <AvatarImage src={user?.photoUrl} alt={user?.name} />
                <AvatarFallback className="bg-brand/20">{getInitials()}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center">
                  <h2 className="font-semibold text-lg mr-2">{user?.name || 'User'}</h2>
                  <span className="inline-flex items-center justify-center bg-secondary rounded-full p-1">
                    {getProviderIcon()}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Subscription Card */}
        <Card>
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CircleDollarSign className="h-5 w-5 mr-2 text-brand" />
                <h3 className="font-medium">Subscription</h3>
              </div>
              <span className="text-sm px-2 py-1 rounded-full bg-brand/20">
                {isTrialActive ? 'Trial' : user?.subscription?.status || 'Inactive'}
              </span>
            </div>
            
            {isTrialActive && (
              <div className="bg-secondary p-3 rounded-md text-sm">
                <p>Your trial ends on {formatDate(user?.subscription?.trialEndDate)}</p>
              </div>
            )}
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate('/subscribe')}
            >
              {isTrialActive ? 'Subscribe Now' : 'Manage Subscription'}
            </Button>
          </CardContent>
        </Card>
        
        {/* Settings Section */}
        <div className="space-y-2">
          <h3 className="font-medium px-1">Settings</h3>
          
          <Card>
            <CardContent className="p-0">
              <div className="flex items-center justify-between p-3">
                <div className="flex items-center">
                  {getThemeIcon()}
                  <Label htmlFor="theme-toggle" className="cursor-pointer">{getThemeLabel()}</Label>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2"
                  onClick={toggleTheme}
                >
                  Change
                </Button>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between p-3">
                <div className="flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  <Label htmlFor="notifications" className="cursor-pointer">Push Notifications</Label>
                </div>
                <Switch id="notifications" defaultChecked />
              </div>
              
              <Separator />
              
              <Button
                variant="ghost"
                className="w-full flex items-center justify-start p-3 h-auto rounded-none"
                onClick={() => navigate('/change-password')}
              >
                <Lock className="h-5 w-5 mr-2" />
                <span>Change Password</span>
              </Button>
            </CardContent>
          </Card>
          
          <Button
            variant="outline"
            className="w-full flex items-center justify-center"
            onClick={() => {
              logout();
              navigate('/start');
            }}
          >
            <LogOut className="h-4 w-4 mr-2" />
            <span>Log Out</span>
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Settings;
