import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";

const initialMessages = [
  { 
    from: "bot", 
    text: "👋 Hi!\n I'm your VoiceCart AI Assistant,🎙️\n\n✨ I can help you:\n• Shop using voice commands\n• Add/remove items from cart\n• Answer questions about products\n• Guide you through the website\n\nTry saying: 'Add 2 apples to cart' or ask me anything! "
  },
];

const ChatbotModal = ({ open = true, onClose = () => {} }) => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const { addToCart, removeFromCart } = useCart();

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      console.warn("⚠️ Web Speech API not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log("🎤 Voice captured:", transcript);
      setInput(transcript);
      setListening(false);
    };

    recognition.onerror = (event) => {
      console.error("❌ Speech recognition error:", event.error);
      setMessages((msgs) => [...msgs, { 
        from: "bot", 
        text: `⚠️ Voice error: ${event.error}. Please try again or type your message.` 
      }]);
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Toggle voice listening
  const toggleVoiceListening = () => {
    if (!recognitionRef.current) {
      setMessages((msgs) => [...msgs, { 
        from: "bot", 
        text: "⚠️ Voice recognition not supported in your browser. Please use Chrome, Edge, or Safari." 
      }]);
      return;
    }

    if (listening) {
      recognitionRef.current.stop();
      setListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setListening(true);
        setMessages((msgs) => [...msgs, { 
          from: "bot", 
          text: "🎤 Listening... Speak now!" 
        }]);
      } catch (error) {
        console.error("Error starting recognition:", error);
        setListening(false);
      }
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    const userMessage = input.trim();
    setMessages((msgs) => [...msgs, { from: "user", text: userMessage }]);
    setInput("");
    setIsLoading(true);
    
    try {
      // Check if message contains cart-related keywords
      const cartKeywords = /\b(add|remove|delete|put|take|cart|buy|purchase|get)\b/i;
      const hasCartAction = cartKeywords.test(userMessage);
      
      if (hasCartAction) {
        // Use voice-command endpoint for cart actions
        const response = await fetch("http://localhost:5000/voice-command", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ command: userMessage }),
        });

        const data = await response.json();
        
        if (data.actions && data.actions.length > 0) {
          let botResponse = "";
          let successCount = 0;
          let unavailableCount = 0;
          
          // Process each action
          data.actions.forEach(action => {
            if (action.action === "unavailable") {
              unavailableCount++;
              botResponse += `❌ Sorry, "${action.product}" is not available in our catalog.\n`;
            } else if (action.action === "add") {
              const product = {
                id: action.productId,
                name: action.productName,
                price: action.price,
              };
              addToCart(product, action.quantity);
              successCount++;
              botResponse += `✅ Added ${action.quantity} ${action.productName}(s) to your cart ($${action.price} each)\n`;
            } else if (action.action === "remove") {
              const product = {
                id: action.productId,
                name: action.productName,
                price: action.price,
              };
              const removed = removeFromCart(product, action.quantity);
              if (removed) {
                successCount++;
                botResponse += `✅ Removed ${action.quantity} ${action.productName}(s) from your cart\n`;
              } else {
                botResponse += `⚠️ ${action.productName} is not in your cart\n`;
              }
            }
          });
          
          // Add summary
          if (successCount > 0 || unavailableCount > 0) {
            botResponse += `\n📊 Summary: ${successCount} action(s) completed`;
            if (unavailableCount > 0) {
              botResponse += `, ${unavailableCount} item(s) unavailable`;
            }
          }
          
          setMessages((msgs) => [...msgs, { from: "bot", text: botResponse || "I processed your request!" }]);
        } else {
          // No actions detected, fall back to chatbot
          throw new Error("No actions detected");
        }
      } else {
        // Use regular chatbot endpoint for general questions
        const response = await fetch("http://localhost:5000/chatbot", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: userMessage }),
        });

        const data = await response.json();
        
        if (data.reply) {
          setMessages((msgs) => [...msgs, { from: "bot", text: data.reply }]);
        } else {
          throw new Error("No reply from chatbot");
        }
      }
    } catch (error) {
      console.error("Chatbot error:", error);
      setMessages((msgs) => [
        ...msgs, 
        { from: "bot", text: "Sorry, I'm having trouble connecting. Please make sure the backend server is running on port 5000." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 60 }}
        className="w-full max-w-md h-[90vh] md:h-[600px] bg-slate-800 rounded-2xl md:rounded-3xl shadow-2xl shadow-indigo-500/20 border border-slate-700 flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 bg-gradient-to-r from-indigo-600 to-cyan-600 flex-shrink-0">
          <div className="flex items-center gap-2 md:gap-3 min-w-0">
            <div className="w-8 md:w-10 h-8 md:h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-5 md:w-6 h-5 md:h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <div className="min-w-0">
              <span className="font-bold text-sm md:text-lg text-white block truncate">VoiceCart AI</span>
              <p className="text-xs text-cyan-200 flex items-center gap-1">
                <svg className="w-2 md:w-3 h-2 md:h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="4"/>
                </svg>
                <span className="truncate">Powered by VOICECART</span>
              </p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="text-white text-2xl md:text-3xl font-bold hover:text-cyan-300 transition-colors flex-shrink-0 ml-2"
          >
            ×
          </button>
        </div>

        {/* Chat Messages Area */}
        <div className="flex-1 overflow-y-auto px-3 md:px-6 py-3 md:py-4 bg-slate-900 space-y-3 md:space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`rounded-lg md:rounded-2xl px-3 md:px-4 py-2 md:py-3 max-w-xs text-sm md:text-base shadow-lg break-words ${msg.from === "user" ? "bg-gradient-to-r from-indigo-600 to-cyan-600 text-white" : "bg-slate-800 text-slate-200 border border-slate-700"}`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="rounded-lg md:rounded-2xl px-3 md:px-4 py-2 md:py-3 bg-slate-800 text-slate-400 border border-slate-700 flex items-center gap-2 text-sm md:text-base">
                <svg className="w-4 md:w-5 h-4 md:h-5 animate-spin" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span className="truncate">Thinking...</span>
              </div>
            </div>
          )}
          {listening && (
            <div className="flex justify-start">
              <div className="rounded-lg md:rounded-2xl px-3 md:px-4 py-2 md:py-3 bg-indigo-500/20 text-indigo-300 animate-pulse border border-indigo-500/50 flex items-center gap-2 text-sm md:text-base">
                <svg className="w-4 md:w-5 h-4 md:h-5 animate-pulse flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
                <span className="truncate">🎤 Listening...</span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Voice Status Indicator */}
        {listening && (
          <div className="px-3 md:px-6 py-2 bg-indigo-600/20 border-t border-indigo-500/30 flex items-center justify-center gap-2 text-indigo-300 text-xs md:text-sm flex-shrink-0">
            <div className="flex gap-1">
              <span className="w-1 h-3 md:h-4 bg-indigo-400 rounded-full animate-pulse" style={{animationDelay: '0ms'}}></span>
              <span className="w-1 h-3 md:h-4 bg-indigo-400 rounded-full animate-pulse" style={{animationDelay: '150ms'}}></span>
              <span className="w-1 h-3 md:h-4 bg-indigo-400 rounded-full animate-pulse" style={{animationDelay: '300ms'}}></span>
            </div>
            <span className="truncate">Voice input active</span>
          </div>
        )}

        {/* Input Area */}
        <form onSubmit={handleSend} className="flex items-center gap-2 px-3 md:px-6 py-2 md:py-4 bg-slate-800 border-t border-slate-700 flex-shrink-0">
          <button
            type="button"
            onClick={toggleVoiceListening}
            className={`rounded-full p-2 md:p-3 shadow-lg transition-all flex-shrink-0 ${listening ? "bg-red-500 text-white animate-pulse scale-105" : "bg-gradient-to-r from-indigo-600 to-cyan-600 text-white hover:shadow-xl hover:shadow-indigo-500/30 hover:scale-105"}`}
            title={listening ? "Stop Listening" : "Start Voice Command"}
          >
            {listening ? (
              <svg className="w-5 md:w-6 h-5 md:h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z" />
              </svg>
            ) : (
              <svg className="w-5 md:w-6 h-5 md:h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            )}
          </button>
          <input
            type="text"
            className="flex-1 min-w-0 border-2 border-slate-600 bg-slate-700 text-white rounded-full px-3 md:px-4 py-2 md:py-3 text-sm md:text-base placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            placeholder="Type or use voice..."
            value={input}
            onChange={e => setInput(e.target.value)}
            disabled={listening}
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-full px-3 md:px-6 py-2 md:py-3 font-semibold shadow-lg hover:shadow-xl hover:shadow-indigo-500/30 hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
            disabled={!input.trim() || isLoading}
          >
            <svg className="w-4 md:w-5 h-4 md:h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ChatbotModal;