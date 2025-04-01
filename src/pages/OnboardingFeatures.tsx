import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { ArrowRight, Eye, EyeClosed, Star } from 'lucide-react';
import { OptimizedImage } from '@/components/ui/optimized-image';
import { useIsMobile } from '@/hooks/use-mobile';

interface FeatureSlideProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  showTaxRate?: boolean;
  showBillion?: boolean;
  showYears?: boolean;
  isFinalSlide?: boolean;
  isActive?: boolean;
}

const FeatureSlide = ({ icon, title, description, showTaxRate, showBillion, showYears, isFinalSlide, isActive }: FeatureSlideProps) => {
  const [typedText, setTypedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const textToType = "there is a better way.";
  const typingSpeed = 100;

  useEffect(() => {
    if (isFinalSlide && isActive) {
      setTypedText('');
      setIsTypingComplete(false);
      
      let index = 0;
      const timer = setInterval(() => {
        if (index < textToType.length) {
          setTypedText(textToType.substring(0, index + 1));
          
          if (navigator.vibrate) {
            navigator.vibrate(10);
          }
          
          index++;
        } else {
          clearInterval(timer);
          setIsTypingComplete(true);
        }
      }, typingSpeed);
      
      return () => clearInterval(timer);
    }
  }, [isFinalSlide, isActive]);

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
          <h2 className="text-2xl font-headline text-black font-semibold">
            Thankfully, {typedText}
            {!isTypingComplete && <span className="animate-pulse">|</span>}
          </h2>
          <p className="text-base text-black/80">You don't have to live within this broken system.</p>
        </div>
        
        <div className="bg-white rounded-lg p-5 shadow-md w-full max-w-xs mt-4">
          <div className="flex items-center justify-center mb-3">
            <h3 className="font-semibold text-gray-800">Dane, 36</h3>
            <span className="ml-2 text-lg">🇺🇸</span>
          </div>
          
          <p className="text-gray-700 text-sm mb-3">
            "I was instantly able to stop paying tax on $130,000 of my income via a benefit I had no idea even existed. I wish I had known about this years ago."
          </p>
          
          <div className="flex justify-center">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            ))}
          </div>
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
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const carouselRef = useRef<any>(null);

  useEffect(() => {
    if (currentSlide === 3) {
      const blinkInterval = setInterval(() => {
        setIsEyeOpen(false);
        
        setTimeout(() => {
          setIsEyeOpen(true);
          
          setTimeout(() => {
            setIsEyeOpen(false);
            
            setTimeout(() => {
              setIsEyeOpen(true);
            }, 150);
          }, 200);
        }, 150);
      }, 4000);
      
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
      navigate('/proof');
    } else {
      const nextSlide = currentSlide + 1;
      setCurrentSlide(nextSlide);
      
      if (carouselRef.current?.api) {
        carouselRef.current.api.scrollTo(nextSlide);
      }
    }
  };

  const getSlideBackgroundColor = (slideIndex: number) => {
    if (slideIndex === 3) {
      return "bg-[#D1FF82]";
    }
    return "bg-[#E63946]";
  };

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className={`min-h-screen ${getSlideBackgroundColor(currentSlide)} text-white overflow-hidden`}>
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/5 blur-3xl"></div>
      
      <div className="container max-w-md mx-auto px-4 py-4 h-screen flex flex-col justify-between">
        <div className="pt-6 flex justify-center">
          {currentSlide === 3 ? (
            <OptimizedImage 
              src="/lovable-uploads/2d441c39-e935-49df-a144-c9d9ddf0b127.png" 
              alt="Untaxable Logo" 
              className="h-8 object-contain"
            />
          ) : (
            <OptimizedImage 
              src="/lovable-uploads/2291824e-979e-4b87-9c8f-45205548633c.png" 
              alt="Untaxable Logo" 
              className="h-8 object-contain"
            />
          )}
        </div>
        
        <div className="flex-1 flex items-center justify-center">
          <Carousel 
            className="w-full" 
            ref={carouselRef}
            opts={{ 
              loop: false,
              dragFree: false
            }}
            onSlideChange={handleSlideChange}
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
                    isActive={currentSlide === index}
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
                  currentSlide === dot 
                    ? currentSlide === 3 ? 'bg-zinc-900' : 'bg-white' 
                    : currentSlide === 3 ? 'bg-zinc-500' : 'bg-white/50'
                } transition-colors cursor-pointer`}
                onClick={() => {
                  setCurrentSlide(dot);
                  if (carouselRef.current?.api) {
                    carouselRef.current.api.scrollTo(dot);
                  }
                }}
              />
            ))}
          </div>
          
          <Button 
            className={`w-full py-4 ${currentSlide === 3 ? 'bg-zinc-900' : 'bg-zinc-900'} hover:bg-zinc-800 text-white shadow-md shadow-black/20 text-base font-medium`}
            onClick={handleNext}
            type="button"
          >
            {currentSlide < 3 ? (
              <>Next <ArrowRight size={16} className="ml-1 text-white" /></>
            ) : (
              <>Show me {isEyeOpen ? 
                <Eye size={16} className="ml-1 text-white" /> : 
                <EyeClosed size={16} className="ml-1 text-white" />
              }</>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingFeatures;
