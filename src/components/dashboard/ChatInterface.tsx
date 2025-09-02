import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Mic, MicOff, Zap, TrendingUp, BarChart3 } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  suggestions?: string[];
}

const mockResponses = [
  "The ocean temperature trend shows a 2.3°C increase over the past 6 months, likely caused by increased solar radiation and reduced cloud cover.",
  "Based on the predictive analysis, we can expect a 15% increase in efficiency next quarter. This is primarily due to optimized resource allocation.",
  "The data correlation suggests a strong relationship between user engagement and conversion rates (R² = 0.87).",
  "Current anomaly detected: unusual spike in Activity Zone C. Recommended action: investigate environmental factors.",
];

const suggestionCards = [
  { icon: TrendingUp, text: "Analyze trend patterns", action: "Show me the key trend patterns in the data" },
  { icon: BarChart3, text: "Compare datasets", action: "Compare this month's performance with last month" },
  { icon: Zap, text: "Predict outcomes", action: "What are the predicted outcomes for next quarter?" },
];

export const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI analytics assistant. I can help you understand your data, explain trends, and make predictions. What would you like to explore?",
      isUser: false,
      timestamp: new Date(),
      suggestions: ["Analyze recent trends", "Compare datasets", "Predict outcomes"]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (content: string = inputValue) => {
    if (!content.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        content: mockResponses[Math.floor(Math.random() * mockResponses.length)],
        isUser: false,
        timestamp: new Date(),
        suggestions: Math.random() > 0.5 ? ["Tell me more", "Show related data", "Export this analysis"] : undefined
      };
      setMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, 1500);
  };

  const toggleVoiceInput = () => {
    setIsListening(!isListening);
    // Voice input logic would go here
  };

  return (
    <Card className="glass-panel h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-card-border/30">
        <h3 className="text-lg font-semibold text-foreground">AI Analytics Assistant</h3>
        <p className="text-sm text-foreground-muted">Ask questions, get insights, explore data</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] ${message.isUser ? 'chat-bubble-user' : 'chat-bubble-ai'} p-3 rounded-2xl`}>
              <p className="text-sm text-foreground">{message.content}</p>
              {message.suggestions && (
                <div className="mt-3 space-y-2">
                  {message.suggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="h-auto p-2 text-xs glass-panel border-card-border/50 hover:bg-glass-accent/20"
                      onClick={() => handleSendMessage(suggestion)}
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="chat-bubble-ai p-3 rounded-2xl">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions Cards */}
      <div className="px-4 pb-2">
        <div className="grid grid-cols-3 gap-2">
          {suggestionCards.map((card, index) => (
            <Button
              key={index}
              variant="ghost"
              className="h-auto p-3 glass-panel-hover border-card-border/30 flex flex-col items-center gap-2"
              onClick={() => handleSendMessage(card.action)}
            >
              <card.icon className="w-4 h-4 text-primary" />
              <span className="text-xs text-foreground-subtle text-center">{card.text}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-card-border/30">
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask me anything about your data..."
              className="pr-12 glass-panel border-card-border/50 bg-glass/50 text-foreground placeholder:text-foreground-subtle"
            />
            <Button
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim()}
              className="absolute right-1 top-1 h-8 w-8 p-0 bg-primary hover:bg-primary-glow glow-primary"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Voice Input Button */}
          <Button
            onClick={toggleVoiceInput}
            className={`ripple-effect w-12 h-12 rounded-full p-0 transition-all duration-300 ${
              isListening 
                ? 'bg-destructive hover:bg-destructive/90 animate-pulse-glow' 
                : 'bg-secondary hover:bg-secondary-glow glow-secondary'
            }`}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </Button>
        </div>
      </div>
    </Card>
  );
};