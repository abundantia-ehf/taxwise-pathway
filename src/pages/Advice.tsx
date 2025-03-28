
import React, { useState } from 'react';
import MobileLayout from '@/components/layout/MobileLayout';
import Header from '@/components/layout/Header';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from "sonner";
import { MessageSquare, User, Clock, ExternalLink } from 'lucide-react';

const FORM_SUBMISSION_OPTIONS = [
  { 
    name: 'Tally',
    url: 'https://tally.so', 
    description: 'Create a free form and paste the URL here' 
  },
  { 
    name: 'Typeform',
    url: 'https://typeform.com', 
    description: 'Create a Typeform and paste the URL here' 
  },
  { 
    name: 'Google Forms',
    url: 'https://forms.google.com', 
    description: 'Create a Google Form and paste the URL here' 
  },
  { 
    name: 'Formspree',
    url: 'https://formspree.io', 
    description: 'Create a Formspree form and paste the URL here' 
  },
  { 
    name: 'Airtable',
    url: 'https://airtable.com', 
    description: 'Create an Airtable form and paste the URL here' 
  }
];

const Advice = () => {
  const [question, setQuestion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSetup, setFormSetup] = useState({
    formUrl: '',
    isConfigured: false
  });
  
  // Check if form URL is in localStorage or use setup mode
  React.useEffect(() => {
    const savedFormUrl = localStorage.getItem('expertHelpFormUrl');
    if (savedFormUrl) {
      setFormSetup({
        formUrl: savedFormUrl,
        isConfigured: true
      });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    
    setIsSubmitting(true);
    
    // If we have a form URL configured, redirect to it
    if (formSetup.formUrl) {
      // Open the form URL in a new tab with the question pre-filled if possible
      // Most form services allow prefilling via URL parameters
      const formUrl = new URL(formSetup.formUrl);
      
      // Try to add the question as a parameter (this works with many form services)
      // Different services use different parameter names, so we're using common ones
      formUrl.searchParams.append('question', question);
      formUrl.searchParams.append('entry.1', question); // For Google Forms
      formUrl.searchParams.append('prefill', question);
      
      window.open(formUrl.toString(), '_blank');
      
      toast.success("Opening form submission page. Please complete your submission there.");
      setQuestion('');
    } else {
      toast.error("Form not configured. Please set up the form URL in the settings.");
    }
    
    setIsSubmitting(false);
  };

  const handleFormSetup = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Basic URL validation
      new URL(formSetup.formUrl);
      
      // Save to localStorage for persistence
      localStorage.setItem('expertHelpFormUrl', formSetup.formUrl);
      
      setFormSetup({
        ...formSetup,
        isConfigured: true
      });
      
      toast.success("Form URL configured successfully!");
    } catch (error) {
      toast.error("Please enter a valid URL");
    }
  };

  // Form setup mode
  if (!formSetup.isConfigured) {
    return (
      <MobileLayout>
        <Header title="Expert Help - Setup" />
        <div className="container p-4 space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="font-semibold text-lg">Set Up Form Service</h2>
              <p className="text-sm text-muted-foreground">
                To enable users to submit questions to your team, please configure a form service URL.
                We recommend using one of the following free services:
              </p>
              
              <div className="space-y-3">
                {FORM_SUBMISSION_OPTIONS.map((option) => (
                  <a 
                    key={option.name}
                    href={option.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-secondary rounded-md hover:bg-secondary/80 transition-colors"
                  >
                    <div>
                      <h3 className="font-medium">{option.name}</h3>
                      <p className="text-xs text-muted-foreground">{option.description}</p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </a>
                ))}
              </div>
              
              <form onSubmit={handleFormSetup} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="formUrl" className="text-sm font-medium">Form URL</label>
                  <Input 
                    id="formUrl"
                    value={formSetup.formUrl}
                    onChange={(e) => setFormSetup({...formSetup, formUrl: e.target.value})}
                    placeholder="https://your-form-service.com/your-form"
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-brand text-black hover:bg-brand/90"
                >
                  Save Configuration
                </Button>
                
                <div className="text-xs text-muted-foreground p-2 bg-secondary rounded-md">
                  <p className="font-medium">Instructions:</p>
                  <ol className="list-decimal pl-4 space-y-1 mt-1">
                    <li>Create a form using one of the services above</li>
                    <li>Copy the public URL of your form</li>
                    <li>Paste it in the input field above</li>
                    <li>When users submit questions, they'll be directed to your form</li>
                  </ol>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </MobileLayout>
    );
  }

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
            <div className="space-y-1">
              <h2 className="font-semibold text-lg flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-brand" />
                Ask an Untaxable Pro
              </h2>
              <p className="text-xs text-muted-foreground">
                Limited to 1 submission per 24 hours
              </p>
            </div>
            
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
              
              <div className="flex justify-between items-center text-xs text-muted-foreground mt-2">
                <p>
                  You accept answers provided by Untaxable are general feedback only. The risk is always on you for all actions carried out in relation to your taxes.
                </p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs h-auto p-1"
                  onClick={() => {
                    localStorage.removeItem('expertHelpFormUrl');
                    setFormSetup({formUrl: '', isConfigured: false});
                  }}
                >
                  Reset Form
                </Button>
              </div>
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
