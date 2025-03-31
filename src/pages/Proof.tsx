
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { Card } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const TestimonialCard = ({ 
  name, 
  age, 
  flag, 
  quote 
}: { 
  name: string; 
  age: number; 
  flag: string; 
  quote: string;
}) => {
  const isMobile = useIsMobile();
  
  return (
    <Card className="bg-white rounded-lg p-3 shadow-md w-full mb-3">
      <div className="flex items-center justify-center mb-2">
        <h3 className="font-semibold text-gray-800">{name}, {age}</h3>
        <span className="ml-2 text-lg">{flag}</span>
      </div>
      
      <p className="text-gray-700 text-xs sm:text-sm mb-2">
        "{quote}"
      </p>
      
      <div className="flex justify-center">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400 fill-yellow-400" />
        ))}
      </div>
    </Card>
  );
};

const Proof = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const handleContinue = () => {
    navigate('/questionnaire/paywall');
  };
  
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden flex flex-col">
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/5 blur-3xl"></div>
      
      <div className="container max-w-md mx-auto px-4 py-4 h-screen flex flex-col">
        <div className="pt-4 flex justify-center">
          <OptimizedImage 
            src="/lovable-uploads/2291824e-979e-4b87-9c8f-45205548633c.png" 
            alt="Untaxable Logo" 
            className="h-8 object-contain"
          />
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-start pt-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-headline font-bold text-white">
            Pay 0% tax.
          </h1>
          
          <div className="relative mb-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-headline font-bold text-white">
              Legally.
            </h2>
            <div className="absolute bottom-[-6px] left-0 w-full h-2 bg-[#E63946]"></div>
          </div>
          
          <div className="w-full grid gap-3 mt-2">
            <TestimonialCard 
              name="Eva" 
              age={25} 
              flag="🇦🇷" 
              quote="This is just what I was looking for as tax in Argentina is very bad and this has helped me escape from most of it."
            />
            
            <TestimonialCard 
              name="Anna" 
              age={48} 
              flag="🇦🇺" 
              quote="Almost all our business is global and outside Australia's borders, yet we've been paying 30% of our profits to the ATO for 5 years. Now, we're legally paying zero tax thanks to Untaxable."
            />
            
            <TestimonialCard 
              name="Adrian" 
              age={31} 
              flag="🇩🇪" 
              quote="Confirmed it all with a tax lawyer before we set things up and got the green light that it's totally legal. Honestly can't believe this isn't more well-known."
            />
          </div>
        </div>
        
        <div className="pb-4">
          <Button 
            className="w-full py-4 bg-brand hover:bg-brand/90 text-black shadow-md shadow-black/20 text-base font-medium"
            onClick={handleContinue}
          >
            Continue <ArrowRight size={16} className="ml-1 text-black" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Proof;
