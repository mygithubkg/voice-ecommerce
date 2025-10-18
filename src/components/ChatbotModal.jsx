import React, { useState, useRef, useContext, useEffect } from "react";
import { useVoiceCommand } from "./VoiceCommand";
import { CartContext } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

const initialMessages = [
  { 
    from: "bot", 
    text: "👋 Hi! I'm your VoiceCart AI Assistant powered by Gemini! 🎙️\n\n✨ I can help you:\n• Shop using voice commands\n• Add/remove items from cart\n• Answer questions about products\n• Guide you through the website\n\nTry saying: 'Add 2 apples to cart' or ask me anything!" 
  },
];

const ChatbotModal = ({ open, onClose }) => {
  const { addToCart, removeFromCart } = useContext(CartContext);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  // Track if last voice command was a cart action
  const cartActionRef = useRef(false);

  // Voice command integration (must be called unconditionally)
  const {
    listening,
    transcript,
    error,
    startListening,
    stopListening,
    setTranscript,
    setError,
  } = useVoiceCommand({
    onAddToCart: (product, qty) => {
      setMessages((msgs) => [...msgs, { from: "bot", text: `Added ${qty} ${product.name}(s) to your cart.` }]);
      addToCart(product, qty);
      cartActionRef.current = true;
    },
    onRemoveFromCart: (product, qty) => {
      setMessages((msgs) => [...msgs, { from: "bot", text: `Removed ${qty} ${product.name}(s) from your cart.` }]);
      removeFromCart(product, qty);
      cartActionRef.current = true;
    },
    onNavigate: (target) => {
      setMessages((msgs) => [...msgs, { from: "bot", text: `Navigating to ${target}...` }]);
      cartActionRef.current = true;
    },
  });

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, transcript]);

  // When voice transcript is received, if no cart action, treat as general chat
  useEffect(() => {
    if (transcript) {
      setMessages((msgs) => [...msgs, { from: "user", text: transcript }]);
      if (!cartActionRef.current) {
        // Not a cart action, treat as chat
        fetch(`${backendURL}/chatbot`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: transcript }),
        })
          .then((res) => res.json())
          .then((data) => {
            setMessages((msgs) => [...msgs, { from: "bot", text: data.reply || "Sorry, I couldn't understand that." }]);
          })
          .catch(() => {
            setMessages((msgs) => [...msgs, { from: "bot", text: "Sorry, there was an error contacting the assistant." }]);
          });
      }
      cartActionRef.current = false;
      setTranscript("");
    }
    // eslint-disable-next-line
  }, [transcript]);

  if (!open) return null;

  // Helper function to process cart actions from typed messages
  const processCartActions = async (message) => {
    try {
      const res = await fetch(`${backendURL}/voice-command`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ command: message }),
      });
      const data = await res.json();
      
      if (data.actions && Array.isArray(data.actions) && data.actions.length > 0) {
        // Process each cart action
        data.actions.forEach((action) => {
          const product = { name: action.product };
          const qty = action.quantity || 1;
          
          if (action.action === "add") {
            addToCart(product, qty);
            setMessages((msgs) => [...msgs, { from: "bot", text: `Added ${qty} ${action.product}(s) to your cart.` }]);
          } else if (action.action === "remove") {
            removeFromCart(product, qty);
            setMessages((msgs) => [...msgs, { from: "bot", text: `Removed ${qty} ${action.product}(s) from your cart.` }]);
          }
        });
        return true; // Cart action was processed
      }
      return false; // No cart actions found
    } catch (error) {
      console.error("Error processing cart actions:", error);
      return false;
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((msgs) => [...msgs, { from: "user", text: input }]);
    
    // First, try to process as cart action
    const isCartAction = await processCartActions(input);
    
    // If not a cart action, treat as general chat
    if (!isCartAction) {
      try {
        const res = await fetch(`${backendURL}/chatbot`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: input }),
        });
        const data = await res.json();
        setMessages((msgs) => [...msgs, { from: "bot", text: data.reply || "Sorry, I couldn't understand that." }]);
      } catch {
        setMessages((msgs) => [...msgs, { from: "bot", text: "Sorry, there was an error contacting the assistant." }]);
      }
    }
    
    setInput("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 60 }}
        className="bg-slate-800 rounded-3xl shadow-2xl shadow-indigo-500/20 w-full max-w-md mx-auto mb-0 md:mb-10 border border-slate-700 flex flex-col overflow-hidden min-h-[600px]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-indigo-600 to-cyan-600">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <div>
              <span className="font-bold text-lg text-white">VoiceCart AI Assistant</span>
              <p className="text-xs text-cyan-200 flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="4"/>
                </svg>
                Powered by Gemini AI
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-white text-3xl font-bold hover:text-cyan-300 transition-colors">×</button>
        </div>

        {/* Chat Messages Area */}
        <div className="flex-1 overflow-y-auto px-6 py-4 bg-slate-900" style={{ maxHeight: 400 }}>
          <div className="space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`rounded-2xl px-4 py-3 max-w-xs shadow-lg ${msg.from === "user" ? "bg-gradient-to-r from-indigo-600 to-cyan-600 text-white ml-auto" : "bg-slate-800 text-slate-200 border border-slate-700"}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {listening && (
              <div className="flex justify-start">
                <div className="rounded-2xl px-4 py-3 bg-indigo-500/20 text-indigo-300 animate-pulse border border-indigo-500/50 flex items-center gap-2">
                  <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                  🎤 Listening...
                </div>
              </div>
            )}
            {error && (
              <div className="flex justify-start">
                <div className="rounded-2xl px-4 py-3 bg-red-500/20 text-red-300 border border-red-500/50">{error}</div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <form onSubmit={handleSend} className="flex items-center gap-2 px-6 py-4 bg-slate-800 border-t border-slate-700">
          <button
            type="button"
            onClick={listening ? stopListening : startListening}
            className={`rounded-full p-3 shadow-lg transition-all ${listening ? "bg-red-500 text-white animate-pulse scale-110" : "bg-gradient-to-r from-indigo-600 to-cyan-600 text-white hover:shadow-xl hover:shadow-indigo-500/30 hover:scale-105"}`}
            title={listening ? "Stop Listening" : "Start Voice Command"}
          >
            {listening ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            )}
          </button>
          <input
            type="text"
            className="flex-1 border-2 border-slate-600 bg-slate-700 text-white rounded-full px-4 py-3 text-base placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            placeholder="Type or use voice to chat..."
            value={input}
            onChange={e => setInput(e.target.value)}
            disabled={listening}
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-full px-6 py-3 font-semibold shadow-lg hover:shadow-xl hover:shadow-indigo-500/30 hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!input.trim()}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </button>
        </form>

        {/* Voice Status Indicator */}
        {listening && (
          <div className="px-6 py-2 bg-indigo-600/20 border-t border-indigo-500/30 flex items-center justify-center gap-2 text-indigo-300 text-sm">
            <div className="flex gap-1">
              <span className="w-1 h-4 bg-indigo-400 rounded-full animate-pulse" style={{animationDelay: '0ms'}}></span>
              <span className="w-1 h-4 bg-indigo-400 rounded-full animate-pulse" style={{animationDelay: '150ms'}}></span>
              <span className="w-1 h-4 bg-indigo-400 rounded-full animate-pulse" style={{animationDelay: '300ms'}}></span>
            </div>
            <span>Voice input active - speak now</span>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ChatbotModal;