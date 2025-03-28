
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Star, ArrowRight } from 'lucide-react';
import MobileLayout from '@/components/layout/MobileLayout';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from "sonner";
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
    text: "\"We've been paying the ATO 30% of our profits for nearly half a decade. Now, we're paying zero tax anywhere.\""
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
  const [isProcessing, setIsProcessing] = useState(false);
  const { startSubscription } = useAuth();

  const handleContinue = () => {
    setIsProcessing(true);
    
    // Simulate subscription process
    setTimeout(() => {
      setIsProcessing(false);
      // Would integrate with Superwall/Stripe here
      startSubscription();
      navigate('/home');
      toast.success("Your free trial has started!");
    }, 2000);
  };

  return (
    <MobileLayout hideNavigation>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col h-full"
      >
        {/* Top section with brand gradient background */}
        <div className="bg-gradient-to-br from-black to-zinc-900 px-0 py-6 pb-16">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <img 
              src="/lovable-uploads/e59d93a8-9521-40fd-b709-37eae4b6f67e.png" 
              alt="Untaxable Logo" 
              className="w-12 h-12 object-cover rounded-lg"
            />
          </div>
          
          {/* Main headline */}
          <div className="text-center mb-3 px-6">
            <h1 className="text-2xl font-bold mb-2 text-white">Pay less tax, <span className="border-b-4 border-[#ea384c]">legally</span></h1>
            <p className="text-sm text-white/80">
              Join thousands of users who have legally reduced their tax rate, often to 0%
            </p>
          </div>
          
          {/* Testimonial carousel - removed the outer div with overflow-hidden */}
          <Carousel 
            className="w-full" 
            opts={{
              align: "center",
              containScroll: false,
              loop: true,
              dragFree: false,
              slidesToScroll: 1,
            }}
            onSlideChange={setCurrentSlide}
            currentSlide={currentSlide}
          >
            <CarouselContent className="-ml-0 overflow-visible">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-0 basis-[85%] transition-all duration-300">
                  <div className="mx-2">
                    <div className="bg-white rounded-xl p-4 shadow-lg h-[160px] flex flex-col">
                      {/* Centered name and flag */}
                      <div className="flex justify-center mb-1">
                        <span className="font-medium text-sm text-[#1A1F2C]">{testimonial.name}</span>
                        <span className="ml-1">{testimonial.flag}</span>
                      </div>
                      
                      <p className="text-gray-700 text-sm mb-2 flex-grow">
                        {testimonial.text}
                      </p>
                      
                      <div className="flex justify-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          
          {/* Carousel indicators */}
          <div className="flex justify-center mt-4 space-x-2 px-6">
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
            disabled={isProcessing}
            className="w-full py-6 bg-brand text-black hover:bg-brand/90"
          >
            {isProcessing ? (
              <>Processing...</>
            ) : (
              <>Start 3-Day Free Trial <ArrowRight size={16} className="ml-1" /></>
            )}
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
