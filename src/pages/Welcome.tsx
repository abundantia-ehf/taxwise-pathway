
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import MobileLayout from '@/components/layout/MobileLayout';
import { ArrowRight } from 'lucide-react';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-zinc-900 text-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-brand/5 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-brand/5 blur-3xl"></div>
      
      <div className="container max-w-md mx-auto px-6 py-12 relative z-10">
        <div className="h-screen flex flex-col">
          <div className="flex-1 flex flex-col items-center justify-center space-y-12">
            {/* Logo section */}
            <div className="animate-fade-in space-y-4 text-center w-full">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 p-1 rounded-2xl bg-black flex items-center justify-center border border-white/10 shadow-lg">
                  <img 
                    src="/lovable-uploads/e59d93a8-9521-40fd-b709-37eae4b6f67e.png" 
                    alt="Untaxable Logo" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <h1 className="text-4xl font-bold tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                  Untaxable
                </span>
              </h1>
              
              <p className="text-gray-400 text-lg max-w-xs mx-auto">
                Master legal tax strategies through expert-led video courses
              </p>
            </div>
            
            {/* Feature cards */}
            <div className="w-full space-y-4 animate-slide-in">
              <div className="card-highlight bg-white/5 p-5">
                <div className="flex items-center">
                  <div className="mr-4 rounded-full bg-brand/20 p-3">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 6V18M6 12H18" stroke="#D1FF82" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Expert-Led Courses</h3>
                    <p className="text-sm text-gray-400">Learn from industry professionals</p>
                  </div>
                </div>
              </div>
              
              <div className="card-highlight bg-white/5 p-5">
                <div className="flex items-center">
                  <div className="mr-4 rounded-full bg-brand/20 p-3">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#D1FF82" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Legal Strategies</h3>
                    <p className="text-sm text-gray-400">Maximize your tax savings legally</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Buttons */}
            <div className="w-full max-w-sm space-y-4 animate-slide-in">
              <Button 
                className="w-full py-6 bg-brand text-black hover:bg-brand/90 shadow-md shadow-brand/20 text-base font-medium"
                onClick={() => navigate('/login')}
              >
                Login 
                <ArrowRight size={18} />
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full py-6 border-white/10 bg-white/5 text-white hover:bg-white/10 text-base font-medium"
                onClick={() => navigate('/signup')}
              >
                Create Account
              </Button>
            </div>
          </div>
          
          <div className="py-6 text-center text-sm text-gray-500">
            <p>By continuing, you agree to our Terms & Privacy Policy</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
