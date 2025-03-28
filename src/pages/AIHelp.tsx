
import React, { useState, useRef, useEffect } from 'react';
import MobileLayout from '@/components/layout/MobileLayout';
import Header from '@/components/layout/Header';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { CircleDollarSign, Send, User, Bot } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const MAX_CHARS = 1000;

const AIHelp = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi there! I'm your AI tax assistant. Ask me any questions about tax strategies, and I'll help you find legal ways to minimize your tax burden.",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Limit input to MAX_CHARS characters
    if (value.length <= MAX_CHARS) {
      setInput(value);
    }
  };
  
  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        "Great question about tax optimization! One legal strategy is to maximize your retirement contributions to accounts like 401(k)s and IRAs, which can reduce your taxable income significantly.",
        "For business owners, setting up the right business entity (like an S-Corporation) can help you save on self-employment taxes while remaining completely legal.",
        "Real estate investing offers excellent tax advantages through depreciation deductions, even if your property is actually appreciating in value.",
        "If you're self-employed, you can deduct legitimate business expenses like home office, travel, and health insurance premiums to lower your taxable income.",
        "Tax-loss harvesting is a powerful strategy for investors - you can sell investments that have declined in value to offset capital gains from other investments."
      ];
      
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      
      const aiMessage: Message = {
        id: Date.now().toString(),
        content: randomResponse,
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <MobileLayout>
      <Header title="AI Tax Assistant" />
      
      <div className="flex flex-col h-[calc(100vh-8rem)]">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map(message => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-[85%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center mr-2 ${
                  message.sender === 'user' ? 'bg-brand/20 ml-2' : 'bg-secondary'
                }`}>
                  {message.sender === 'user' ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <Bot className="h-4 w-4" />
                  )}
                </div>
                
                <div className={`rounded-2xl p-3 ${
                  message.sender === 'user' 
                    ? 'bg-brand text-black' 
                    : 'bg-secondary text-secondary-foreground'
                }`}>
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1 text-right">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex max-w-[85%] flex-row">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-secondary flex items-center justify-center mr-2">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="rounded-2xl p-3 bg-secondary text-secondary-foreground">
                  <div className="flex space-x-1">
                    <div className="h-2 w-2 rounded-full bg-current animate-bounce" />
                    <div className="h-2 w-2 rounded-full bg-current animate-bounce delay-75" />
                    <div className="h-2 w-2 rounded-full bg-current animate-bounce delay-150" />
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        <div className="p-4 border-t">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex flex-col space-y-2"
          >
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Ask your tax questions..."
                value={input}
                onChange={handleInputChange}
                className="flex-1"
                maxLength={MAX_CHARS}
              />
              <Button 
                type="submit" 
                size="icon"
                disabled={!input.trim() || isTyping}
                className="bg-brand text-black hover:bg-brand/90"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex justify-between items-center px-1">
              <p className="text-xs text-muted-foreground">
                {input.length} / {MAX_CHARS} characters
              </p>
              <p className="text-xs text-muted-foreground">
                AI often gets things wrong. Please only use this for quick, general advice.
              </p>
            </div>
          </form>
        </div>
      </div>
    </MobileLayout>
  );
};

export default AIHelp;
