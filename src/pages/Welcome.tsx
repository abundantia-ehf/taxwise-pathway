
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import MobileLayout from '@/components/layout/MobileLayout';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <MobileLayout hideNavigation>
      <div className="flex flex-col h-screen">
        <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-8">
          <div className="animate-fade-in space-y-2 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-brand flex items-center justify-center">
                <span className="text-black text-2xl font-bold">U</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold">Untaxable</h1>
            <p className="text-muted-foreground">
              Master legal tax strategies through expert-led video courses
            </p>
          </div>
          
          <div className="w-full max-w-sm space-y-4 animate-slide-up">
            <Button 
              className="w-full py-6 bg-brand text-black hover:bg-brand/90"
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full py-6"
              onClick={() => navigate('/signup')}
            >
              Create Account
            </Button>
          </div>
        </div>
        
        <div className="p-4 text-center text-sm text-muted-foreground">
          <p>By continuing, you agree to our Terms & Privacy Policy</p>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Welcome;
