import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, ThemeColors } from '../types';
import { MessageCircle, X, Send, Sparkles, User, HelpCircle, ArrowRight } from 'lucide-react';

interface ChatbotProps {
  colors: ThemeColors;
}

export default function Chatbot({ colors }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Suggested questions for easier discovery
  const suggestions = [
    "Who is Kavindi?",
    "What is Fusion Art?",
    "Do you craft 3D pop-up cards?",
    "How do I order custom gifts?",
  ];

  // Initialize with a warm greeting
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          role: 'model',
          content: "Warm greetings! 🌸 I'm the paper thread assistant of *PaperThreads*. Kavindi Samudika founded us in 2018 to turn imagination into handmade treasures.\n\nI can tell you all about our Arts (Minimalistic Line Art, Abstracts, Fusions) and Crafts (Handicrafts, amazing 3D Pop-Up Cards/Occasion gifts), our Memory Lane events, or how to place order commissions. How can I inspire your day?",
          timestamp: new Date()
        }
      ]);
    }
  }, [messages]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: textToSend.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Build the payload with the recent 10 messages
      const historyPayload = [...messages, userMsg].slice(-10).map(m => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: historyPayload }),
      });

      if (!res.ok) {
        throw new Error('Endpoint returned error status');
      }

      const data = await res.json();
      
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: data.reply || "I'm not sure how to assist with that, but feel free to check out our Contact page to message Kavindi directly!",
        timestamp: new Date()
      }]);
    } catch (err) {
      console.warn("Express API offline or failed, falling back to local chat compiler:", err);
      
      // Smart contextual client-side response compiler
      const generateLocalResponse = (message: string): string => {
        const msg = message.toLowerCase();
        
        if (msg.includes("kavindi") || msg.includes("founder") || msg.includes("story") || msg.includes("who is") || msg.includes("creator")) {
          return "PaperThreads was lovingly founded by Kavindi Samudika in 2018. 🌸 It started as a relaxing hobby while she was pursuing her degree, drawing inspiration from paper crafts on Pinterest.\n\nDuring the pandemic, her passion expanded into beautiful hand-drawn art and intricate thread alignments. Kavindi transforms raw paper and delicate thread structures into highly personalized treasures filled with heart and absolute patience!";
        }
        
        if (msg.includes("fusion") || msg.includes("abstract") || msg.includes("line art") || msg.includes("art")) {
          return "We offer three distinguished Art styles:\n\n1. **Line Art**: Elegant, sophisticated hand-drawn black & white silhouettes capturing human bonds and organic symmetry.\n2. **Abstract Art**: High-emotion canvas creations conveying dynamic feelings through bold palettes.\n3. **Fusion Art**: Masterful mixed-media blending textured paper carving, traditional paints, and fine pen strokes.\n\nYou can explore these in our dedicated galleries inside the portal!";
        }
        
        if (msg.includes("pop-up") || msg.includes("card") || msg.includes("craft") || msg.includes("shadowbox") || msg.includes("handicraft")) {
          return "Our Crafts collections celebrate meticulous paper-cut techniques:\n\n- **Handicrafts**: Stunning 3D quilled wall frames, shadowboxes, and circular mandala weaving.\n- **Customized Greeting Cards**: Spectacular interactive 3D pop-up cards, wedding invitation boxes, and customized envelopes.\n\nOur 'Order Tracker' is perfect for managing custom commissions!";
        }
        
        if (msg.includes("order") || msg.includes("price") || msg.includes("pricing") || msg.includes("buy") || msg.includes("inquire") || msg.includes("custom")) {
          return "Placing an order is simple! You can:\n\n1. Click the **'Order Tracker'** tab to dispatch a customized ticket slip directly to Kavindi.\n2. Tap the **'Inquiry'** button on any art or craft piece to complete our custom specifications form.\n3. Chat directly via **WhatsApp (+94 77 123 4567)** by clicking the link at the bottom of this chat window to discuss design specifics, frames, or express delivery.";
        }
        
        if (msg.includes("memory") || msg.includes("lane") || msg.includes("calendar")) {
          return "Make sure to check our **Memory Lane** and the **Interactive Calendar**!\n\nThese showcases display historic workshops, real-time booking slots for custom family commissions, and significant milestone threads from Kavindi's design records.";
        }
        
        return "What a delightful question! 🧵 While my online cloud services are offline, I am completely equipped to handle information about PaperThreads' fine crafts.\n\nCould I help you learn about **Kavindi's story**, her premium **shadowboxes & pop-up cards**, or how to open an **Order Tracker ticket**?";
      };

      const replyContent = generateLocalResponse(textToSend);

      // Soft graceful offline fallback
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: replyContent,
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(input);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Floating Chat Bubble Button */}
      {!isOpen && (
        <button
          id="btn-chatbot-float"
          onClick={() => setIsOpen(true)}
          className="relative group p-4 rounded-full bg-gradient-to-r from-pink-500 to-fuchsia-600 hover:from-pink-600 hover:to-fuchsia-700 text-white shadow-2xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center cursor-pointer animate-bounce"
          style={{ animationDuration: '3s' }}
        >
          <MessageCircle className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-pink-100"></span>
          </span>
          {/* Subtle tooltip */}
          <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-black/80 text-white text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded border border-pink-500/30 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Chat with AI ✨
          </div>
        </button>
      )}

      {/* Main Chat Panel */}
      {isOpen && (
        <div
          id="chatbot-panel"
          className={`w-[360px] sm:w-[400px] h-[550px] rounded-2xl flex flex-col ${colors.bgCard} border border-pink-500/20 shadow-[-10px_10px_35px_rgba(20,5,30,0.8)] overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-300`}
        >
          {/* Chat Header */}
          <div className="p-4 bg-gradient-to-r from-purple-950 via-[#1b082e] to-pink-950 border-b border-pink-500/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-lg border border-pink-300/20">
                <Sparkles className="w-5 h-5 text-pink-100 animate-pulse" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white tracking-wide">PaperThreads AI</h4>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  <p className="text-[10px] text-purple-300 font-mono tracking-widest uppercase">Creative Helper</p>
                </div>
              </div>
            </div>
            <button
              id="btn-chatbot-close"
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-purple-300 hover:text-white hover:bg-white/10 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick suggestions overview */}
          <div className="px-4 py-2 bg-purple-950/20 border-b border-purple-500/5 flex items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-none">
            <HelpCircle className="w-3.5 h-3.5 text-pink-400 flex-shrink-0" />
            <span className="text-[10px] text-purple-300 font-mono tracking-wider uppercase mr-1">Tap to ask:</span>
            {suggestions.map((s, idx) => (
              <button
                key={idx}
                id={`chat-suggestion-${idx}`}
                onClick={() => handleSendMessage(s)}
                className="text-xs bg-pink-500/5 hover:bg-pink-500/10 text-pink-300/90 hover:text-pink-200 border border-pink-500/15 py-1 px-2.5 rounded-full transition-all duration-300 cursor-pointer text-ellipsis overflow-hidden"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Messages Display */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-black/10">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.role !== 'user' && (
                  <div className="w-7 h-7 rounded-full bg-pink-950 border border-pink-500/30 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-3.5 h-3.5 text-pink-300" />
                  </div>
                )}
                
                <div
                  className={`max-w-[78%] p-3 rounded-2xl text-xs leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-pink-600 text-white rounded-tr-none shadow-md'
                      : 'bg-purple-900/40 text-purple-50 border border-purple-800/30 rounded-tl-none shadow-sm'
                  }`}
                >
                  <p className="whitespace-pre-line font-medium leading-relaxed">
                    {m.content}
                  </p>
                  <span className="block text-[8px] opacity-60 text-right mt-1 font-mono">
                    {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                {m.role === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-purple-900 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                    <User className="w-3.5 h-3.5 text-purple-300" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2.5 justify-start">
                <div className="w-7 h-7 rounded-full bg-pink-950 border border-pink-500/30 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-3.5 h-3.5 text-pink-300 animate-spin" />
                </div>
                <div className="bg-purple-900/40 border border-purple-800/30 p-3 rounded-2xl rounded-tl-none flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                  <span className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Form Input */}
          <form onSubmit={handleSubmit} className="p-3 bg-purple-950/40 border-t border-pink-500/20 flex gap-2">
            <input
              type="text"
              required
              disabled={isLoading}
              placeholder="Ask about arts, pop-up cards, or pricing..."
              value={input}
              onChange={e => setInput(e.target.value)}
              className="flex-1 bg-black/40 text-white placeholder-purple-400 outline-none text-xs rounded-xl px-3 border border-purple-500/20 focus:border-pink-500/50 transition"
            />
            <button
              id="btn-chatbot-send"
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-2.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white shadow-md disabled:opacity-40 disabled:hover:bg-pink-600 transition flex items-center justify-center"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* WhatsApp Direct link reference */}
          <div className="p-2 bg-pink-500/5 border-t border-pink-500/10 text-center">
            <a
              id="chatbot-wa-link"
              href="https://wa.me/94771234567?text=Hi%20Kavindi,%20I%20saw%20your%20gorgeous%20arts%20and%20crafts%20on%20PaperThreads%20and%20would%20love%20to%20inquire!"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[10px] font-mono hover:text-pink-300 font-semibold tracking-wider text-green-400 transition"
            >
              Direct WhatsApp chat (+94 77 123 4567) <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
