
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '@/components/layout/MobileLayout';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { CheckCircle, RefreshCw } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from "sonner";

const Subscribe = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const navigate = useNavigate();
  const { hasSubscription, startSubscription } = useAuth();
  
  useEffect(() => {
    if (hasSubscription) {
      // You might want to redirect to a subscription management page instead
      // For now, we'll keep them on this page but show different content
    }
  }, [hasSubscription]);
  
  const handleSubscribe = () => {
    setIsProcessing(true);
    
    // Simulate subscription process
    setTimeout(() => {
      setIsProcessing(false);
      // Would integrate with Superwall/Stripe here
      startSubscription();
      navigate('/learn');
      toast.success("Your free trial has started!");
    }, 2000);
  };
  
  const handleRestorePurchase = () => {
    setIsRestoring(true);
    
    // Simulate restore process
    setTimeout(() => {
      setIsRestoring(false);
      
      // This would typically check with the payment provider if the user has an active subscription
      // For demonstration, we'll sometimes pretend they have one, sometimes not
      const hasExistingSubscription = Math.random() > 0.5;
      
      if (hasExistingSubscription) {
        startSubscription();
        navigate('/learn');
        toast.success("Your subscription has been restored!");
      } else {
        toast.error("No previous subscription found.");
      }
    }, 2000);
  };
  
  const features = [
    "Full access to all course modules",
    "Exclusive tax optimization strategies",
    "AI-powered tax assistant",
    "Expert support for your questions",
    "New content added regularly",
    "Cancel anytime during trial"
  ];

  if (hasSubscription) {
    return (
      <MobileLayout hideNavigation>
        <Header title="Subscription" />
        
        <div className="container max-w-md p-4 space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold">You're Already Subscribed</h1>
            <p className="text-muted-foreground">
              You have full access to all Untaxable premium features
            </p>
          </div>
          
          <div className="rounded-lg border overflow-hidden">
            <div className="p-4 bg-brand/10 border-b">
              <div className="text-center space-y-2">
                <h2 className="text-xl font-semibold">Premium Plan</h2>
                <div className="flex items-center justify-center">
                  <span className="text-3xl font-bold">$29.99</span>
                  <span className="text-muted-foreground ml-1">/month</span>
                </div>
                <p className="text-muted-foreground text-sm">
                  Active subscription
                </p>
              </div>
            </div>
            
            <div className="p-4 space-y-3">
              <h3 className="font-medium">Your benefits:</h3>
              <ul className="space-y-2">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-brand mr-2 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <Button
            onClick={() => navigate('/learn')}
            className="w-full py-5 bg-brand text-black hover:bg-brand/90"
          >
            Continue to Content
          </Button>
          
          <p className="text-sm text-center text-muted-foreground">
            For billing questions or to cancel your subscription, please contact customer support.
          </p>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout hideNavigation>
      <Header title="Subscription" />
      
      <div className="container max-w-md p-4 space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">Unlock the Full Experience</h1>
          <p className="text-muted-foreground">
            Start your 3-day free trial and get full access to all content
          </p>
        </div>
        
        <div className="rounded-lg border overflow-hidden">
          <div className="p-4 bg-brand/10 border-b">
            <div className="text-center space-y-2">
              <h2 className="text-xl font-semibold">Premium Plan</h2>
              <div className="flex items-center justify-center">
                <span className="text-3xl font-bold">$29.99</span>
                <span className="text-muted-foreground ml-1">/month</span>
              </div>
              <p className="text-muted-foreground text-sm">
                after 3-day free trial
              </p>
            </div>
          </div>
          
          <div className="p-4 space-y-3">
            <h3 className="font-medium">What you'll get:</h3>
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-brand mr-2 mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <Button
          onClick={handleSubscribe}
          disabled={isProcessing || isRestoring}
          className="w-full py-5 bg-brand text-black hover:bg-brand/90"
        >
          {isProcessing ? 'Processing...' : 'Start 3-Day Free Trial'}
        </Button>
        
        <Button 
          onClick={handleRestorePurchase}
          disabled={isProcessing || isRestoring}
          variant="ghost" 
          className="w-full mt-2"
        >
          {isRestoring ? (
            <>Checking subscription status...</>
          ) : (
            <>
              <RefreshCw size={14} className="mr-1" />
              Restore Purchase
            </>
          )}
        </Button>
        
        <p className="text-sm text-center text-muted-foreground">
          By subscribing, you agree to our terms and conditions. You will be charged $29.99/month after your 3-day trial ends. Cancel anytime.
        </p>
      </div>
    </MobileLayout>
  );
};

export default Subscribe;
