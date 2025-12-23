import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { useState } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ChatBox from "./components/ChatBox";

const queryClient = new QueryClient();

const App = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const openChat = () => setIsChatOpen(true);
  const closeChat = () => setIsChatOpen(false);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index onOpenChat={openChat} />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          
          {/* ASK AI FAB - BLACK & WHITE */}
          <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[9999] pointer-events-auto">
            <button 
              onClick={openChat}
              className="group relative w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-white to-gray-200 hover:from-gray-100 hover:to-white shadow-2xl hover:shadow-white/50 border-4 border-black/20 backdrop-blur-xl rounded-3xl hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] transition-all duration-500 hover:-translate-y-1 hover:rotate-12 active:scale-95 flex items-center justify-center outline-none focus:outline-none"
              aria-label="Ask AI"
            >
              {/* Pulsing Rings - Black & White */}
              <div className="absolute inset-0 w-full h-full border-4 border-white/50 rounded-3xl animate-ping" />
              <div className="absolute inset-0 w-full h-full border-4 border-black/30 rounded-3xl animate-ping [animation-delay:1s]" />
              
              {/* Brain Icon */}
              <svg 
                className="w-5 h-5 md:w-6 md:h-6 text-black drop-shadow-lg group-hover:scale-110 transition-all duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>

          {isChatOpen && <ChatBox onClose={closeChat} />}
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
