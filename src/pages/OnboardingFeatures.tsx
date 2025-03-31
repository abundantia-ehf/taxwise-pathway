
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { ArrowRight, Star } from 'lucide-react';
import { OptimizedImage } from '@/components/ui/optimized-image';

interface FeatureSlideProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  showTaxRate?: boolean;
  showBillion?: boolean;
}

const FeatureSlide = ({ icon, title, description, showTaxRate, showBillion }: FeatureSlideProps) => {
  if (showTaxRate) {
    return (
      <div className="flex flex-col items-center space-y-4">
        <div className="text-black text-6xl md:text-7xl font-bold drop-shadow-[3px_3px_0_rgba(255,255,255,0.7)]">
          42.5%
        </div>
        
        <div className="text-center space-y-1 max-w-xs">
          <h2 className="text-xl font-headline text-white">{title}</h2>
          <p className="text-sm text-white/80">{description}</p>
        </div>
      </div>
    );
  }

  if (showBillion) {
    return (
      <div className="flex flex-col items-center space-y-4">
        <div className="flex flex-col items-center w-full text-center">
          <div className="text-black text-6xl md:text-7xl font-bold drop-shadow-[3px_3px_0_rgba(255,255,255,0.7)] mx-auto">
            $785
          </div>
          <div className="text-black text-3xl md:text-4xl font-bold drop-shadow-[3px_3px_0_rgba(255,255,255,0.7)] mx-auto" style={{ width: 'min-content', letterSpacing: '0.25em' }}>
            BILLION
          </div>
        </div>
        
        <div className="text-center space-y-1 max-w-xs">
          <h2 className="text-xl font-headline text-white">{title}</h2>
          <p className="text-sm text-white/80">{description}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="w-36 h-36 rounded-full bg-white/10 flex items-center justify-center">
        {icon}
      </div>
      
      <div className="text-center space-y-1 max-w-xs">
        <h2 className="text-xl font-headline text-white">{title}</h2>
        <p className="text-sm text-white/80">{description}</p>
      </div>
    </div>
  );
};

const OnboardingFeatures = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  
  const features = [
    {
      icon: null,
      title: "Average tax rate a person in the developed world pays each year",
      description: "When sales tax, duties, indirect taxes, and hidden taxes are added to income tax.",
      showTaxRate: true
    },
    {
      icon: null,
      title: "Estimated tax waste in the developed world each year",
      description: "That's your money being lost to waste, mismanagement, or government fraud.",
      showBillion: true
    },
    {
      icon: (
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8zM21.2 15.4c.5.9.8 1.9.8 3.1v2M17 8a4 4 0 011.6 7.7" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Personal Help From Humans and AI",
      description: "Get personalized support from our real human tax experts as well as our ultra-intelligent tax-based AI."
    },
    {
      icon: (
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 6l-10 7L2 6M4 3h16a2 2 0 012 2v14a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2z" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Massive Savings",
      description: "The average person using Untaxable that earns $100,000 saves $21,600 the first year working with us."
    }
  ];

  const handleNext = () => {
    if (currentSlide === 3) {
      navigate('/questionnaire');
    } else {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#E63946] text-white overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/5 blur-3xl"></div>
      
      <div className="container max-w-md mx-auto px-4 py-4 h-screen flex flex-col justify-between">
        <div className="pt-6 flex justify-center">
          <OptimizedImage 
            src="/lovable-uploads/2291824e-979e-4b87-9c8f-45205548633c.png" 
            alt="Untaxable Logo" 
            className="h-8 object-contain" 
          />
        </div>
        
        <div className="flex-1 flex items-center justify-center">
          <Carousel className="w-full" 
            defaultSlideSize={100}
            onSlideChange={setCurrentSlide}
            currentSlide={currentSlide}
          >
            <CarouselContent>
              {features.map((feature, index) => (
                <CarouselItem key={index} className="flex items-center justify-center">
                  <FeatureSlide
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                    showTaxRate={feature.showTaxRate}
                    showBillion={feature.showBillion}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
        
        <div className="pb-6 space-y-4">
          <div className="flex justify-center space-x-2">
            {[0, 1, 2, 3].map((dot) => (
              <div
                key={dot}
                className={`w-2 h-2 rounded-full ${
                  currentSlide === dot ? 'bg-white' : 'bg-white/50'
                } transition-colors cursor-pointer`}
                onClick={() => setCurrentSlide(dot)}
              />
            ))}
          </div>
          
          <Button 
            className="w-full py-4 bg-zinc-900 hover:bg-zinc-800 text-white shadow-md shadow-black/20 text-base font-medium"
            onClick={handleNext}
          >
            {currentSlide < 3 ? (
              <>Next <ArrowRight size={16} className="ml-1 text-white" /></>
            ) : (
              <>Rate Us <Star size={16} className="ml-1 text-white" /></>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingFeatures;
