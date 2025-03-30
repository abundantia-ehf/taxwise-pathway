
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '@/components/layout/MobileLayout';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { User, CircleDollarSign, Bell, Lock, LogOut, Moon, Sun } from 'lucide-react';

const Profile = () => {
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

  return (
    <MobileLayout>
      <Header title="Profile" />
      
      <div className="container p-3 space-y-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="h-16 w-16 rounded-full bg-brand/20 flex items-center justify-center mr-3">
                <User className="h-8 w-8" />
              </div>
              <div>
                <h2 className="font-semibold text-lg">{user?.name || 'User'}</h2>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
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
        
        <div className="space-y-3">
          <h3 className="font-medium px-1">Settings</h3>
          
          <Card>
            <CardContent className="p-0">
              <div className="flex items-center justify-between p-3">
                <div className="flex items-center">
                  {theme === 'dark' ? (
                    <Moon className="h-5 w-5 mr-2" />
                  ) : (
                    <Sun className="h-5 w-5 mr-2" />
                  )}
                  <Label htmlFor="dark-mode" className="cursor-pointer">Dark Mode</Label>
                </div>
                <Switch
                  id="dark-mode"
                  checked={theme === 'dark'}
                  onCheckedChange={toggleTheme}
                />
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
            onClick={logout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            <span>Log Out</span>
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Profile;
