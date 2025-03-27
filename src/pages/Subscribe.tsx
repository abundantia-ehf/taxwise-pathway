
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '@/components/layout/MobileLayout';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

const Subscribe = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  
  const handleSubscribe = () => {
    setIsProcessing(true);
    
    // Simulate subscription process
    setTimeout(() => {
      setIsProcessing(false);
      // Would integrate with Superwall/Stripe here
      navigate('/learn');
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

  return (
    <MobileLayout hideNavigation>
      <Header title="Subscription" />
      
      <div className="container max-w-md p-6 space-y-8">
        <div className="space-y-3 text-center">
          <h1 className="text-2xl font-bold">Unlock the Full Experience</h1>
          <p className="text-muted-foreground">
            Start your 3-day free trial and get full access to all content
          </p>
        </div>
        
        <div className="rounded-lg border overflow-hidden">
          <div className="p-6 bg-brand/10 border-b">
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
          
          <div className="p-6 space-y-4">
            <h3 className="font-medium">What you'll get:</h3>
            <ul className="space-y-3">
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
          disabled={isProcessing}
          className="w-full py-6 bg-brand text-black hover:bg-brand/90"
        >
          {isProcessing ? 'Processing...' : 'Start 3-Day Free Trial'}
        </Button>
        
        <p className="text-sm text-center text-muted-foreground">
          By subscribing, you agree to our terms and conditions. You will be charged $29.99/month after your 3-day trial ends. Cancel anytime.
        </p>
      </div>
    </MobileLayout>
  );
};

export default Subscribe;
