
import React, { useState } from 'react';
import MobileLayout from '@/components/layout/MobileLayout';
import Header from '@/components/layout/Header';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from "sonner";
import { CircleDollarSign, FileText, MessageSquare, HelpCircle } from 'lucide-react';

const Support = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Support request submitted successfully");
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setIsSubmitting(false);
    }, 1500);
  };
  
  const faqItems = [
    {
      question: "How long is the free trial?",
      answer: "The free trial lasts for 3 days, giving you access to all premium features. You'll be billed at the regular rate after the trial period unless you cancel."
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel your subscription at any time. If you cancel during your trial period, you won't be charged. If you cancel after the trial, you'll still have access until the end of your billing period."
    },
    {
      question: "Are the tax strategies legal?",
      answer: "Absolutely. All strategies taught in Untaxable focus on legal tax avoidance, not tax evasion. We teach you to work within the existing tax code to minimize your tax burden legally."
    },
    {
      question: "Do I need accounting knowledge?",
      answer: "No prior accounting knowledge is required. Our courses are designed to be accessible to beginners while still valuable for those with some tax planning experience."
    },
    {
      question: "Can I download the videos for offline viewing?",
      answer: "Currently, videos are only available for streaming. We're working on implementing offline viewing in a future update."
    },
    {
      question: "Are the strategies applicable outside the US?",
      answer: "Most of our content focuses on US tax strategies. We do offer a dedicated international section, but specific applicability will vary by country."
    },
  ];

  return (
    <MobileLayout>
      <Header title="Help & Support" />
      
      <div className="container p-4">
        <Tabs defaultValue="faq">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="faq" className="flex-1">FAQs</TabsTrigger>
            <TabsTrigger value="contact" className="flex-1">Contact Us</TabsTrigger>
          </TabsList>
          
          <TabsContent value="faq" className="space-y-4">
            <div className="grid gap-4">
              {faqItems.map((item, index) => (
                <div key={index} className="rounded-lg border p-4">
                  <h3 className="font-medium flex items-center">
                    <HelpCircle className="h-4 w-4 mr-2 text-brand" />
                    {item.question}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="contact" className="space-y-4">
            <div className="rounded-lg border p-4 space-y-2">
              <h3 className="font-medium flex items-center">
                <CircleDollarSign className="h-4 w-4 mr-2 text-brand" />
                Billing Issues
              </h3>
              <p className="text-sm text-muted-foreground">
                For subscription, billing, or payment issues, please email us at billing@untaxable.com
              </p>
            </div>
            
            <div className="rounded-lg border p-4 space-y-2">
              <h3 className="font-medium flex items-center">
                <FileText className="h-4 w-4 mr-2 text-brand" />
                Course Content Questions
              </h3>
              <p className="text-sm text-muted-foreground">
                For questions about course content, please use the AI Assistant or fill out the form below.
              </p>
            </div>
            
            <div className="rounded-lg border p-4 space-y-4">
              <h3 className="font-medium flex items-center">
                <MessageSquare className="h-4 w-4 mr-2 text-brand" />
                Contact Support
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-brand text-black hover:bg-brand/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MobileLayout>
  );
};

export default Support;
