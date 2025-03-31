
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { ArrowRight, Star, Eye, EyeOff } from 'lucide-react';
import { OptimizedImage } from '@/components/ui/optimized-image';

interface FeatureSlideProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  showTaxRate?: boolean;
  showBillion?: boolean;
  showYears?: boolean;
  isFinalSlide?: boolean;
}

const FeatureSlide = ({ icon, title, description, showTaxRate, showBillion, showYears, isFinalSlide }: FeatureSlideProps) => {
  if (showTaxRate) {
    return (
      <div className="flex flex-col items-center space-y-4">
        <div className="text-black text-6xl md:text-7xl font-black">
          42.5<span className="text-3xl md:text-4xl">%</span>
        </div>
        
        <div className="text-center space-y-2 max-w-xs">
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
          <div className="text-black text-6xl md:text-7xl font-black mx-auto">
            <span className="text-3xl md:text-4xl">$</span>785
          </div>
          <div className="text-black text-3xl md:text-4xl font-black mx-auto" style={{ width: 'min-content' }}>
            BILLION
          </div>
        </div>
        
        <div className="text-center space-y-2 max-w-xs">
          <h2 className="text-xl font-headline text-white">{title}</h2>
          <p className="text-sm text-white/80">{description}</p>
        </div>
      </div>
    );
  }

  if (showYears) {
    return (
      <div className="flex flex-col items-center space-y-4">
        <div className="text-black text-6xl md:text-7xl font-black">
          19.1
        </div>
        
        <div className="text-center space-y-2 max-w-xs">
          <h2 className="text-xl font-headline text-white">{title}</h2>
          <p className="text-sm text-white/80">{description}</p>
        </div>
      </div>
    );
  }

  if (isFinalSlide) {
    return (
      <div className="flex flex-col items-center space-y-6">
        <div className="text-center space-y-3 max-w-xs">
          <h2 className="text-2xl font-headline text-black font-semibold">Thankfully, there is a better way</h2>
          <p className="text-base text-black/80">You don't have to live within this broken system.</p>
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
  const [isEyeOpen, setIsEyeOpen] = useState(true);
  const navigate = useNavigate();
  
  // Effect for eye blinking animation
  useEffect(() => {
    if (currentSlide === 3) {
      const blinkInterval = setInterval(() => {
        setIsEyeOpen(false);
        
        // First blink
        setTimeout(() => {
          setIsEyeOpen(true);
          
          // Brief pause between blinks
          setTimeout(() => {
            setIsEyeOpen(false);
            
            // Second blink
            setTimeout(() => {
              setIsEyeOpen(true);
            }, 150);
          }, 200);
        }, 150);
      }, 4000); // Repeat every 4 seconds
      
      return () => clearInterval(blinkInterval);
    }
  }, [currentSlide]);
  
  const features = [
    {
      icon: null,
      title: "Average yearly tax rate in the developed world",
      description: "When sales tax, duties, indirect taxes, and hidden taxes are added to income tax.",
      showTaxRate: true
    },
    {
      icon: null,
      title: "Estimated yearly tax waste in the developed world",
      description: "That's your money being lost to waste, mismanagement, or government fraud.",
      showBillion: true
    },
    {
      icon: null,
      title: "Years spent working just to pay taxes",
      description: "Nearly 20 years of life working just to pay the government. This is based on the average person working a 45 year career before retirement.",
      showYears: true
    },
    {
      icon: null,
      title: "",
      description: "",
      isFinalSlide: true
    }
  ];

  const handleNext = () => {
    if (currentSlide === 3) {
      navigate('/questionnaire/paywall');
    } else {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const getSlideBackgroundColor = (slideIndex: number) => {
    if (slideIndex === 3) {
      return "bg-[#D1FF82]"; // Brand color for slide 4
    }
    return "bg-[#E63946]"; // Original color for other slides
  };

  return (
    <div className={`min-h-screen ${getSlideBackgroundColor(currentSlide)} text-white overflow-hidden`}>
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
                    showYears={feature.showYears}
                    isFinalSlide={feature.isFinalSlide}
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
            className={`w-full py-4 ${currentSlide === 3 ? 'bg-zinc-900' : 'bg-zinc-900'} hover:bg-zinc-800 text-white shadow-md shadow-black/20 text-base font-medium`}
            onClick={handleNext}
          >
            {currentSlide < 3 ? (
              <>Next <ArrowRight size={16} className="ml-1 text-white" /></>
            ) : (
              <>Show me {isEyeOpen ? 
                <Eye size={16} className="ml-1 text-white" /> : 
                <EyeOff size={16} className="ml-1 text-white" />
              }</>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingFeatures;
