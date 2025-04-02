
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
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
  Github,
  HelpCircle
} from 'lucide-react';

const Settings = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  
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

  const getInitials = () => {
    if (!user?.name) return "U";
    return user.name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

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

  const faqItems = [
    {
      question: "How should I use this app?",
      answer: "To get the most out of Untaxable, we suggest you go through the course material first (sections I, II, and III for everyone, and also section IV for US citizens or residents). Once you've done that, get suggestions from Untaxable pros in the advice section, and use our databases to help setup your perfect legal tax structure."
    },
    {
      question: "How do I maximize tax savings?",
      answer: "That will depend on your own unique situation. For some people, simply setting up a cheap offshore company will do the trick. For others, you may need to change your personal tax residency, or move to a low-tax country. You'll learn what strategy may be best for you when you go through our training material."
    },
    {
      question: "Are these strategies legal?",
      answer: "At Untaxable, we do our best to provide you with up to the minute tax mitigation information. However, even though we have a full research team on our side, as laws change extremely regularly, and we cannot hope to know your personal tax situation, it is possible that information provided in this app or on Untaxable.io is incorrect, or out of date. Information provided in this app is for general education and entertainment puposes only, and should not be considered official legal or tax advice. The responsibility will always be on you to confirm whether information provided in this app is correct."
    },
    {
      question: "Do I need an accountant to implement these strategies?",
      answer: "We always suggest you do not implement any tax mitigation plan or low tax strategy without first consulting the advice of an accountant, tax lawyer, or other similar legal tax professional in your home country, and/or the countries you are doing business in. The information in this app should be considered an introduction into low tax strategies, and not the final word on how you should apply these to your life. This should come from a trusted lawyer and/or accountant."
    },
    {
      question: "How often is the content updated?",
      answer: "In some cases, daily. Our databases are updated sometimes on a daily basis when new information becomes available, and our course/learning modules are re-recorded whenever we need to update a lesson or section. However, please be advises that we cannot guarantee the information provided is accurate up to the current moment. Always remember that you will also need to update the app to its most recent version to ensure you have the most up to date information in the app."
    },
    {
      question: "Does this work for anyone?",
      answer: "The simple answer is yes, the information provided in this app can work for just about anyone, though how effective it will be in its implementation will depend on many factors. For example, if you earn primarily passive income, it will be harder to mitigate taxes than if you earn primarily active business income. Furthermore, US citizens will almost never be able to legally reduce their tax rate to zero, simply due to the US' citizenship-based taxation—however, even US citizens can benefit from significantly lower taxes, often bringing these down to a maximum of 10.5%"
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel your subscription at any time. If you cancel during your trial period, you won't be charged. If you cancel after the trial, you'll still have access until the end of your billing period."
    },
    {
      question: "How long is the free trial?",
      answer: "The free trial lasts for 7 days. During this period, you'll have full access to all premium features and content."
    }
  ];

  return (
    <MobileLayout>
      <Header title="Settings" />
      
      <div className="container p-3 space-y-3">
        <Tabs defaultValue="help" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="help">Help & FAQ</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="help" className="space-y-4">
            <h2 className="text-lg font-semibold mb-3 px-1">Frequently Asked Questions</h2>
            
            <Card>
              <CardContent className="p-3">
                <Accordion type="single" collapsible className="w-full">
                  {faqItems.map((faq, index) => (
                    <AccordionItem key={index} value={`faq-${index}`}>
                      <AccordionTrigger className="text-left">
                        <div className="flex items-start">
                          <HelpCircle className="h-4 w-4 mr-2 mt-1 flex-shrink-0 text-brand" />
                          <span>{faq.question}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground pl-6">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 space-y-3">
                <h3 className="font-medium flex items-center">
                  <CircleDollarSign className="h-4 w-4 mr-2 text-brand" />
                  Help & Support
                </h3>
                <p className="text-sm text-muted-foreground">
                  For any customer service, support, or billing/payment issues, please email us at hello@anticitizen.com
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-3">
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
          </TabsContent>
        </Tabs>
      </div>
    </MobileLayout>
  );
};

export default Settings;
