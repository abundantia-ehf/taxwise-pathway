
import React, { useState } from 'react';
import MobileLayout from '@/components/layout/MobileLayout';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";
import { MessageSquare, User, Clock, ArrowLeft, Share2, ArrowUpRight } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

const Advice = () => {
  const [question, setQuestion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { theme } = useTheme();
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Your question has been submitted to our tax professionals");
      setQuestion('');
      setIsSubmitting(false);
    }, 1500);
  };

  const previousQuestions = [
    {
      id: 1,
      question: "Can I claim a home office deduction if I'm running a business from my residence?",
      answer: "Yes, if you use part of your home exclusively and regularly for business, you may be eligible for a home office deduction. This applies whether you're a homeowner or renter, and you can choose between the simplified method ($5 per square foot) or the regular method (calculating actual expenses).",
      date: "2023-04-15",
      answered: true
    },
    {
      id: 2,
      question: "What documents do I need to maintain for my offshore company to stay compliant?",
      answer: null,
      date: "2023-04-18",
      answered: false
    }
  ];

  return (
    <MobileLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <div 
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center mr-4 cursor-pointer",
                theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'
              )}
              onClick={() => navigate('/home')}
            >
              <ArrowLeft size={18} className="text-foreground" />
            </div>
            <h1 className="text-2xl font-bold">Expert Help</h1>
          </div>
          <div 
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center",
              theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'
            )}
          >
            <Share2 size={18} className="text-foreground" />
          </div>
        </div>
        
        <div className="space-y-8">
          {/* Statistics */}
          <div className={cn(
            "p-6 rounded-2xl",
            theme === 'dark' ? 'bg-zinc-900' : 'bg-white'
          )}>
            <h2 className="text-xl font-semibold mb-4">Questions Overview</h2>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <User size={14} className="text-brand" />
                  <span className="text-2xl font-bold">3</span>
                </div>
                <p className="text-xs text-muted-foreground">Total Questions</p>
              </div>
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <User size={14} className="text-brand" />
                  <span className="text-2xl font-bold">2</span>
                </div>
                <p className="text-xs text-muted-foreground">Answered</p>
              </div>
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <User size={14} className="text-brand" />
                  <span className="text-2xl font-bold">1</span>
                </div>
                <p className="text-xs text-muted-foreground">Pending</p>
              </div>
            </div>
          </div>
          
          {/* Ask a question form */}
          <div className={cn(
            "p-6 rounded-2xl",
            theme === 'dark' ? 'bg-zinc-900' : 'bg-white'
          )}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Ask a Question</h2>
              <div className="text-xs text-muted-foreground border border-muted-foreground/30 px-2 py-1 rounded-full">1 per 24h</div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <Textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="What tax question can we help you with?"
                className={cn(
                  "min-h-28 border-none",
                  theme === 'dark' ? 'bg-zinc-800 focus-visible:ring-brand/50' : 'bg-gray-100 focus-visible:ring-brand/50'
                )}
                required
              />
              
              <Button 
                type="submit" 
                className="w-full bg-brand text-black hover:bg-brand/90 rounded-xl py-6"
                disabled={isSubmitting || !question.trim()}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Question'}
              </Button>
              
              <p className="text-xs text-muted-foreground text-center mt-2">
                Responses typically arrive within 24-72 hours.
              </p>
            </form>
          </div>
          
          {/* Previous questions */}
          {previousQuestions.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Previous Questions</h2>
              
              {previousQuestions.map((item) => (
                <div 
                  key={item.id} 
                  className={cn(
                    "p-6 rounded-2xl",
                    theme === 'dark' ? 'bg-zinc-900' : 'bg-white'
                  )}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-start">
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center mr-3 mt-1",
                        theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'
                      )}>
                        <User size={16} className="text-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">{item.question}</p>
                        <div className="flex items-center mt-1 text-xs text-muted-foreground">
                          <Clock size={12} className="mr-1" />
                          <span>{new Date(item.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <ArrowUpRight size={16} className="text-muted-foreground cursor-pointer" />
                  </div>
                  
                  {item.answered ? (
                    <div className="ml-11 p-4 rounded-xl bg-brand/10">
                      <p className="text-sm">{item.answer}</p>
                      <div className="mt-2 text-xs text-muted-foreground flex justify-between">
                        <span>From: Untaxable Pro</span>
                        <span>24 hrs ago</span>
                      </div>
                    </div>
                  ) : (
                    <div className="ml-11 p-4 rounded-xl border border-dashed border-muted-foreground/30">
                      <p className="text-sm text-muted-foreground">Awaiting response from our tax professionals...</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </MobileLayout>
  );
};

export default Advice;
