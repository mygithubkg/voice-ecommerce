import React, { useState, useRef, useContext, useEffect } from "react";
import { useVoiceCommand } from "./VoiceCommand";
import { CartContext } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

const initialMessages = [
  { from: "bot", text: "Hi! I'm your VoiceCart assistant. 🎙️ You can ask me about the website, use voice commands to shop, or type your question below. Try saying 'Add 2 apples' or ask me anything!" },
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
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 60 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md mx-auto mb-0 md:mb-10 border border-gray-200 flex flex-col overflow-hidden"
      >
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <div>
              <span className="font-bold text-lg text-white">VoiceCart Assistant</span>
              <p className="text-xs text-white/80">Always here to help</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white text-3xl font-bold hover:text-yellow-300 transition-colors">×</button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4 bg-gradient-to-br from-gray-50 to-white" style={{ maxHeight: 400 }}>
          <div className="space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`rounded-2xl px-4 py-3 max-w-xs shadow-sm ${msg.from === "user" ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white ml-auto" : "bg-white text-gray-800 border border-gray-200"}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {listening && (
              <div className="flex justify-start">
                <div className="rounded-2xl px-4 py-3 bg-purple-100 text-purple-700 animate-pulse border border-purple-200">
                  🎤 Listening...
                </div>
              </div>
            )}
            {error && (
              <div className="flex justify-start">
                <div className="rounded-2xl px-4 py-3 bg-red-50 text-red-700 border border-red-200">{error}</div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
        </div>
        <form onSubmit={handleSend} className="flex items-center gap-2 px-6 py-4 bg-white border-t border-gray-200">
          <button
            type="button"
            onClick={listening ? stopListening : startListening}
            className={`rounded-full p-3 shadow-lg transition-all ${listening ? "bg-red-500 text-white animate-pulse" : "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-xl"}`}
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
            className="flex-1 border-2 border-gray-200 rounded-full px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            placeholder="Type your message or use voice..."
            value={input}
            onChange={e => setInput(e.target.value)}
            disabled={listening}
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full px-6 py-3 font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!input.trim()}
          >
            Send
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ChatbotModal;