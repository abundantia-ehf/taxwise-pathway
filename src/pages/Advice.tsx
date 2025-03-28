
import React, { useState } from 'react';
import MobileLayout from '@/components/layout/MobileLayout';
import Header from '@/components/layout/Header';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from "sonner";
import { MessageSquare, User, Clock } from 'lucide-react';

const Advice = () => {
  const [question, setQuestion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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
      <Header title="Expert Help" />
      
      <div className="container p-4 space-y-6">
        <Card>
          <CardContent className="p-6 space-y-4">
            <h2 className="font-semibold text-lg flex items-center">
              <MessageSquare className="h-5 w-5 mr-2 text-brand" />
              Ask an Untaxable Pro
            </h2>
            
            <p className="text-xs text-muted-foreground">
              Get personal tax help from our Untaxable pros. Please be as detailed as possible with your question, providing as much info as possible (location, type of income, industry, taxes previously paid, etc.) for the best response. Responses typically arrive within 24-72 hours, depending on the complexity of your question.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="question" className="text-sm font-medium">
                  Your Tax Question
                </label>
                <Textarea
                  id="question"
                  rows={5}
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="e.g., How can I optimize my tax strategy for my online business?"
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-brand text-black hover:bg-brand/90"
                disabled={isSubmitting || !question.trim()}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Question'}
              </Button>
              
              <p className="text-xs text-muted-foreground text-center mt-2">
                By submitting your question, you accept answers provided are general feedback only. The risk is always on you for all actions carried out in relation to your taxes.
              </p>
            </form>
          </CardContent>
        </Card>
        
        {previousQuestions.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-medium px-1">Previous Questions</h3>
            
            {previousQuestions.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium flex items-start">
                      <User className="h-4 w-4 mr-2 text-brand mt-1 flex-shrink-0" />
                      <span>{item.question}</span>
                    </h4>
                    <span className="text-xs text-muted-foreground flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {new Date(item.date).toLocaleDateString()}
                    </span>
                  </div>
                  
                  {item.answered ? (
                    <div className="ml-6 p-3 bg-secondary rounded-md">
                      <p className="text-sm">{item.answer}</p>
                    </div>
                  ) : (
                    <div className="ml-6 p-3 border border-dashed rounded-md border-muted-foreground/50">
                      <p className="text-sm text-muted-foreground">Awaiting response from our tax professionals...</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </MobileLayout>
  );
};

export default Advice;
