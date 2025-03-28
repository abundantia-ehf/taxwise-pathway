
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '@/components/layout/MobileLayout';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from "sonner";
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { User, CircleDollarSign, Bell, Lock, LogOut, Moon, Sun, HelpCircle, FileText, MessageSquare } from 'lucide-react';

const Settings = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  
  // Support form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Support request submitted successfully");
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setIsSubmitting(false);
    }, 1500);
  };
  
  const faqItems = [
    {
      question: "How long is the free trial?",
      answer: "The free trial lasts for 3 days, giving you access to all premium features. You'll be billed at the regular rate after the trial period unless you cancel."
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel your subscription at any time. If you cancel during your trial period, you won't be charged. If you cancel after the trial, you'll still have access until the end of your billing period."
    },
    {
      question: "Are the tax strategies legal?",
      answer: "Absolutely. All strategies taught in Untaxable focus on legal tax avoidance, not tax evasion. We teach you to work within the existing tax code to minimize your tax burden legally."
    },
    {
      question: "Do I need accounting knowledge?",
      answer: "No prior accounting knowledge is required. Our courses are designed to be accessible to beginners while still valuable for those with some tax planning experience."
    },
    {
      question: "Can I download the videos for offline viewing?",
      answer: "Currently, videos are only available for streaming. We're working on implementing offline viewing in a future update."
    },
    {
      question: "Are the strategies applicable outside the US?",
      answer: "Most of our content focuses on US tax strategies. We do offer a dedicated international section, but specific applicability will vary by country."
    },
  ];

  return (
    <MobileLayout>
      <Header title="Settings" />
      
      <div className="container p-4 space-y-6">
        <Tabs defaultValue="profile">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="profile" className="flex-1">Profile</TabsTrigger>
            <TabsTrigger value="help" className="flex-1">Help & FAQ</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="h-16 w-16 rounded-full bg-brand/20 flex items-center justify-center mr-4">
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
              <CardContent className="p-6 space-y-4">
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
            
            <div className="space-y-4">
              <h3 className="font-medium px-1">Settings</h3>
              
              <Card>
                <CardContent className="p-0">
                  <div className="flex items-center justify-between p-4">
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
                  
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center">
                      <Bell className="h-5 w-5 mr-2" />
                      <Label htmlFor="notifications" className="cursor-pointer">Push Notifications</Label>
                    </div>
                    <Switch id="notifications" defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <Button
                    variant="ghost"
                    className="w-full flex items-center justify-start p-4 h-auto rounded-none"
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
          </TabsContent>
          
          <TabsContent value="help" className="space-y-6">
            <div className="grid gap-4">
              {faqItems.map((item, index) => (
                <div key={index} className="rounded-lg border p-4">
                  <h3 className="font-medium flex items-center">
                    <HelpCircle className="h-4 w-4 mr-2 text-brand" />
                    {item.question}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="space-y-4 mt-6">
              <div className="rounded-lg border p-4 space-y-2">
                <h3 className="font-medium flex items-center">
                  <CircleDollarSign className="h-4 w-4 mr-2 text-brand" />
                  Billing Issues
                </h3>
                <p className="text-sm text-muted-foreground">
                  For subscription, billing, or payment issues, please email us at billing@untaxable.com
                </p>
              </div>
              
              <div className="rounded-lg border p-4 space-y-2">
                <h3 className="font-medium flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-brand" />
                  Course Content Questions
                </h3>
                <p className="text-sm text-muted-foreground">
                  For questions about course content, please use the AI Assistant or fill out the form below.
                </p>
              </div>
              
              <div className="rounded-lg border p-4 space-y-4">
                <h3 className="font-medium flex items-center">
                  <MessageSquare className="h-4 w-4 mr-2 text-brand" />
                  Contact Support
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-brand text-black hover:bg-brand/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MobileLayout>
  );
};

export default Settings;
