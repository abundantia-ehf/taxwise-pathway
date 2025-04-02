
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { Card } from '@/components/ui/card';
import { Star, Fingerprint } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';

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
    <Card className="bg-white rounded-lg p-3 shadow-md w-full">
      <div className="flex items-center justify-center mb-2">
        <h3 className="font-semibold text-gray-800">{name}, {age}</h3>
        <span className="ml-2 text-lg">{flag}</span>
      </div>
      
      <p className="text-gray-700 text-sm sm:text-base mb-2">
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
  const { toast } = useToast();
  
  const handleContinue = () => {
    if ((/iPhone|iPad|iPod|Android/i).test(navigator.userAgent)) {
      toast({
        title: "Rate our app",
        description: "Enjoying Untaxable? Please take a moment to rate us.",
        action: (
          <Button variant="default" size="sm" onClick={() => navigate('/prepaywall')}>
            Rate Now
          </Button>
        ),
      });
    } else {
      navigate('/prepaywall');
    }
  };
  
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden flex flex-col">
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/5 blur-3xl"></div>
      
      <div className="container max-w-md mx-auto px-4 py-4 h-screen flex flex-col">
        <div className="pt-4 flex justify-center">
          <OptimizedImage 
            src="/lovable-uploads/ab7cc816-8efa-4231-89af-0b746310b854.png" 
            alt="Untaxable Logo" 
            className="h-8 object-contain"
          />
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-start pt-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-headline font-bold text-white text-center">
            Pay 0% tax. Legally.
          </h1>
          
          <div className="w-full grid gap-4 mt-6 mb-6">
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
              quote="We've been paying 30% of our profits to the ATO for 5 years. Now, we're legally paying zero tax thanks to Untaxable."
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
            <span className="flex items-center justify-center w-full">
              Continue <ArrowRight className="ml-1 h-4 w-4 text-black" />
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Proof;
