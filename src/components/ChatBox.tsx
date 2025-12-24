// ChatBox.tsx
import React, { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const ChatBox: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    fetch('https://lordcarbin-portfolio-backend.hf.space/health')
      .catch(() => {});
  }, []);

  // Initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: 'welcome',
        role: 'assistant',
        content: 'Powered by a RAG-based AI for context-aware answers. This chatbot is still in development and may be inaccurate; response times may vary.',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 500) {
      setInputValue(e.target.value);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('https://lordcarbin-portfolio-backend.hf.space/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.content
        }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response || "I'm having trouble processing that. Could you try rephrasing?",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Error accessing neural layers. Please retry.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center p-4 lg:p-8 animate-in fade-in zoom-in duration-200">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-background/90 backdrop-blur-md"
        onClick={onClose}
      />
      
      {/* Chat Container - RAG Neural Interface Style */}
      <div className="relative w-full max-w-2xl max-h-[90vh] lg:max-h-[80vh] bg-zinc-950/95 backdrop-blur-2xl border border-zinc-900/50 rounded-3xl shadow-2xl shadow-zinc-900/50 overflow-hidden flex flex-col animate-in slide-in-from-bottom-4 duration-300 lg:duration-500">
        {/* Header - Neural Interface Style */}
        <div className="sticky top-0 z-20 p-6 border-b border-zinc-900/50 bg-zinc-950/100 backdrop-blur-xl">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-[0.4em] text-zinc-400 font-mono">Neural Interface</span>
              <span className="text-[10px] font-mono text-zinc-600 mt-1 uppercase tracking-wider">v3.0_Augmented-Active</span>
            </div>
            <button 
              onClick={onClose}
              className="text-zinc-500 hover:text-zinc-200 transition-all duration-200 text-xs uppercase tracking-widest border border-zinc-800/50 px-4 py-2 hover:bg-zinc-900/50 active:bg-zinc-800/50 rounded-lg backdrop-blur-sm hover:scale-105"
            >
              Close
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 min-h-0 p-8 lg:p-10 overflow-y-auto flex flex-col space-y-6 bg-zinc-950/80 scrollbar-thin scrollbar-thumb-zinc-700/50 scrollbar-track-zinc-900/50 pr-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2`}
            >
              <div
                className={`max-w-[85%] p-5 lg:p-6 rounded-2xl shadow-xl border transition-all duration-500 backdrop-blur-xl group hover:shadow-2xl ${
                  message.role === 'user'
                    ? 'bg-zinc-100/20 border-zinc-400/30 text-zinc-100 hover:border-zinc-300/50 hover:bg-zinc-100/30'
                    : 'border-zinc-900/50 bg-zinc-900/30 text-zinc-200 hover:border-zinc-800/50 hover:bg-zinc-900/40'
                }`}
              >
                <p className="text-sm lg:text-base leading-relaxed font-light break-words hyphens-auto whitespace-pre-wrap max-h-48 overflow-y-auto">
                  {message.content}
                </p>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-zinc-800/20">
                  <span className={`text-xs font-mono tracking-wider font-light ${
                    message.role === 'user' ? 'text-zinc-300/70' : 'text-zinc-500/60'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  {message.role === 'assistant' && (
                    <span className="text-xs px-2 py-1 bg-zinc-800/40 text-zinc-400/70 rounded-full font-mono tracking-wider text-[10px]">
                      AI
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start animate-in slide-in-from-bottom-2">
              <div className="px-6 py-5 border border-zinc-900/50 bg-zinc-900/30 backdrop-blur-xl rounded-2xl shadow-xl max-w-[75%]">
                <div className="flex items-center gap-4">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 bg-zinc-500/60 rounded-full animate-pulse [animation-duration:1s]" />
                    <div className="w-2 h-2 bg-zinc-500/60 rounded-full animate-pulse [animation-duration:1s] [animation-delay:200ms]" />
                    <div className="w-2 h-2 bg-zinc-500/60 rounded-full animate-pulse [animation-duration:1s] [animation-delay:400ms]" />
                  </div>
                  <span className="text-xs uppercase tracking-[0.3em] text-zinc-500 font-mono font-medium">
                    Neural Processing
                  </span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input - Neural Interface Style */}
        <form onSubmit={sendMessage} className="p-6 lg:p-8 border-t border-zinc-900/50 bg-zinc-950/100 backdrop-blur-2xl pt-6 pb-4 relative">
          <div className="relative">
            <input
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Inquire with neural precision..."
              maxLength={500}
              className="w-full bg-transparent py-4 px-0 text-sm lg:text-base placeholder:text-zinc-600/70 focus:outline-none border-b border-zinc-800/50 focus:border-zinc-600/70 transition-all duration-300 font-light tracking-tight backdrop-blur-sm hover:border-zinc-700/70"
              disabled={isLoading}
              autoFocus
            />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[10px] text-zinc-600/50 font-mono tracking-wider">
              {inputValue.length}/500
            </div>
          </div>
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-zinc-900/30">
            <p className="text-[10px] uppercase tracking-widest text-zinc-600/60 font-mono">Neural Layer Connected</p>
            <button 
              type="submit" 
              disabled={!inputValue.trim() || isLoading}
              className={`text-xs uppercase tracking-[0.2em] px-5 py-2 font-mono font-medium transition-all duration-300 border border-zinc-800/50 rounded-lg backdrop-blur-sm hover:border-zinc-600/70 hover:bg-zinc-900/30 active:bg-zinc-800/50 active:scale-95 ${
                inputValue.trim() && !isLoading 
                  ? 'text-zinc-100 hover:text-zinc-50' 
                  : 'text-zinc-700/50 cursor-not-allowed'
              }`}
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatBox;
