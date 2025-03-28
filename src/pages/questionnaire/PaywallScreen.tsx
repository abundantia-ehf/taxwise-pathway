
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Star, Flag, ArrowRight } from 'lucide-react';
import MobileLayout from '@/components/layout/MobileLayout';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Testimonial type for strong typing
type Testimonial = {
  name: string;
  flag: string;
  text: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Anna R.",
    flag: "🇦🇺",
    text: "\"Almost all our business is global and outside Australia's borders, yet we've been paying 30% of our profits to the ATO for nearly half a decade. Now, we're paying zero tax anywhere.\""
  },
  {
    name: "Randall Kinson",
    flag: "🇺🇸",
    text: "\"Thanks to Untaxable, we'll be paying less than a third in tax compared what we paid last year on even more income.\""
  },
  {
    name: "Eva Bonillo",
    flag: "🇦🇷",
    text: "\"This Just what I was looking for as tax in Argentina is very bad and this has helped me escape from most of it.\""
  }
];

const PaywallScreen = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleContinue = () => {
    // Will be updated with Superwall/payment integration in the future
    navigate('/subscribe');
  };

  return (
    <MobileLayout hideNavigation>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col h-full"
      >
        {/* Top section with brand gradient background */}
        <div className="bg-gradient-to-br from-black to-zinc-900 px-6 py-6 pb-16">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <img 
              src="/lovable-uploads/e59d93a8-9521-40fd-b709-37eae4b6f67e.png" 
              alt="Untaxable Logo" 
              className="w-12 h-12 object-cover rounded-lg"
            />
          </div>
          
          {/* Main headline */}
          <div className="text-center mb-3">
            <h1 className="text-2xl font-bold mb-2 text-white">Pay less tax, <span className="border-b-4 border-[#ea384c]">legally</span></h1>
            <p className="text-sm text-white/80">
              Join thousands of users who have legally reduced their tax rate, often to 0%
            </p>
          </div>
          
          {/* Testimonial carousel */}
          <Carousel 
            className="w-full" 
            opts={{
              align: "start",
              containScroll: false,
              loop: true,
            }}
            onSlideChange={setCurrentSlide}
            currentSlide={currentSlide}
          >
            <CarouselContent className="-ml-2">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-2 md:basis-full basis-4/5">
                  <div className="bg-white rounded-xl p-4 shadow-lg">
                    {/* Centered name and flag */}
                    <div className="flex justify-center mb-2">
                      <span className="font-medium text-sm text-[#1A1F2C]">{testimonial.name}</span>
                      <span className="ml-1">{testimonial.flag}</span>
                    </div>
                    
                    <p className="text-gray-700 text-sm mb-3">
                      {testimonial.text}
                    </p>
                    
                    <div className="flex justify-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          
          {/* Carousel indicators */}
          <div className="flex justify-center mt-4 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`h-2 rounded-full transition-all ${
                  currentSlide === index ? "w-4 bg-white" : "w-2 bg-white/40"
                }`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        {/* Bottom section with white background */}
        <div className="bg-white rounded-t-3xl -mt-8 px-6 py-6 flex-1 flex flex-col">
          {/* Pro badge */}
          <div className="flex justify-center mb-3">
            <div className="bg-[#1A1F2C] text-white px-4 flex items-center justify-center h-7 rounded-md text-xs font-semibold">
              UNTAXABLE PRO
            </div>
          </div>
          
          {/* Offer details */}
          <div className="text-center mb-4">
            <h2 className="text-lg font-bold mb-2 text-gray-900">
              Get help from tax mitigation pros
            </h2>
            <p className="text-gray-800 text-sm mb-3">
              Make a low-tax life your reality in under two weeks
            </p>
            <p className="font-medium text-sm text-gray-900">
              3 day free trial, then just <span className="text-black bg-brand px-1 rounded font-bold">$48.50 US$/month</span>
            </p>
          </div>
          
          {/* Spacer to push button to bottom */}
          <div className="flex-grow"></div>
          
          {/* Action button */}
          <Button 
            onClick={handleContinue}
            className="w-full py-6 bg-brand text-black hover:bg-brand/90"
          >
            Continue <ArrowRight size={16} className="ml-1" />
          </Button>
          
          {/* No commitment text */}
          <p className="text-center text-gray-500 text-xs mt-2">
            No commitment, cancel any time.
          </p>
        </div>
      </motion.div>
    </MobileLayout>
  );
};

export default PaywallScreen;
