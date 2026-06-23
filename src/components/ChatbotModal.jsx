import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { X, Send, Mic, Sparkles } from "lucide-react";

const initialMessages = [
  {
    from: "bot",
    text: "Welcome to aura. I can curate your cart, manage your items, or answer questions. Try saying: 'Add 2 organic apples'."
  },
];

const ChatbotModal = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const chatEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const { addToCart, removeFromCart } = useCart();
  const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setListening(false);
    };

    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);

    recognitionRef.current = recognition;
    return () => recognitionRef.current?.stop();
  }, []);

  const toggleVoiceListening = () => {
    if (!recognitionRef.current) return;
    if (listening) {
      recognitionRef.current.stop();
      setListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setListening(true);
      } catch (error) {
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
      const cartKeywords = /\b(add|remove|delete|put|take|cart|buy|purchase|get)\b/i;
      const hasCartAction = cartKeywords.test(userMessage);

      if (hasCartAction) {
        const response = await fetch(`${backendURL}/voice-command`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ command: userMessage }),
        });
        const data = await response.json();

        if (data.actions && data.actions.length > 0) {
          let botResponse = "";
          let successCount = 0;
          let unavailableCount = 0;

          data.actions.forEach(action => {
            if (action.action === "unavailable") {
              unavailableCount++;
              botResponse += `— Currently unavailable: "${action.product}"\n`;
            } else if (action.action === "add") {
              const product = { id: action.productId, name: action.productName, price: action.price };
              addToCart(product, action.quantity);
              successCount++;
              botResponse += `+ Added ${action.quantity} ${action.productName}(s) to cart.\n`;
            } else if (action.action === "remove") {
              const product = { id: action.productId, name: action.productName, price: action.price };
              const removed = removeFromCart(product, action.quantity);
              if (removed) {
                successCount++;
                botResponse += `- Removed ${action.quantity} ${action.productName}(s).\n`;
              } else {
                botResponse += `— ${action.productName} is not in your cart.\n`;
              }
            }
          });

          if (successCount > 0 || unavailableCount > 0) {
            botResponse += `\nProcessed ${successCount} action(s).`;
          }
          setMessages((msgs) => [...msgs, { from: "bot", text: botResponse || "Request processed." }]);
        } else {
          throw new Error("No actions detected");
        }
      } else {
        const response = await fetch(`${backendURL}/chatbot`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
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
      setMessages((msgs) => [
        ...msgs,
        { from: "bot", text: "Connection anomaly detected. Please try again." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button - Dark Premium Style */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-8 right-8 z-[100] w-16 h-16 rounded-full bg-[#0A0A0F] border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex items-center justify-center group overflow-hidden"
          >
            {/* Subtle hover glow effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#00D4AA]/20 to-[#6C63FF]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl rounded-full" />
            <Sparkles className="w-6 h-6 text-white/80 group-hover:text-white transition-colors relative z-10" />

            {/* Tiny breathing notification dot */}
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute top-4 right-4 w-1.5 h-1.5 bg-[#00D4AA] rounded-full z-20"
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Main Chat Interface - Frosted Glass Glassmorphism */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className="fixed bottom-6 right-6 z-[120] w-[calc(100vw-32px)] sm:w-[420px] h-[600px] bg-[#0A0A0F]/80 backdrop-blur-3xl border border-white/10 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden"
          >
            {/* Minimalist Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/5 bg-white/[0.02] shrink-0">
              <div className="flex items-center gap-1.5">
                <span className="font-serif font-medium text-2xl tracking-tight text-white">
                  aura
                </span>
                <motion.div
                  animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="w-1.5 h-1.5 rounded-full bg-[#00D4AA] mb-1"
                />
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full text-white/50 hover:bg-white/10 hover:text-white transition-colors"
              >
                <X className="w-5 h-5 stroke-[1.5]" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 [&::-webkit-scrollbar]:hidden relative z-10">
              {messages.map((msg, idx) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={idx}
                  className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`
                    px-5 py-3.5 max-w-[80%] text-[15px] leading-relaxed font-light
                    ${msg.from === "user"
                      ? "bg-white text-[#0A0A0F] rounded-2xl rounded-tr-sm font-medium"
                      : "bg-white/5 border border-white/10 text-white/90 rounded-2xl rounded-tl-sm whitespace-pre-wrap backdrop-blur-md"}
                  `}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {/* Minimal Loading Indicator */}
              {isLoading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="px-5 py-4 bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm backdrop-blur-md flex items-center gap-2 h-[48px]">
                    <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0 }} className="w-1.5 h-1.5 bg-white/50 rounded-full" />
                    <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-white/50 rounded-full" />
                    <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-white/50 rounded-full" />
                  </div>
                </motion.div>
              )}
              <div ref={chatEndRef} className="h-2" />
            </div>

            {/* Input Area */}
            <div className="p-5 border-t border-white/5 bg-gradient-to-t from-[#0A0A0F] to-transparent shrink-0 relative">

              {/* Elegant Listening Indicator */}
              <AnimatePresence>
                {listening && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#00D4AA]/10 border border-[#00D4AA]/30 text-[#00D4AA] backdrop-blur-md px-4 py-1.5 rounded-full text-xs tracking-wide flex items-center gap-2 shadow-[0_0_20px_rgba(0,212,170,0.2)]"
                  >
                    <span className="w-1.5 h-1.5 bg-[#00D4AA] rounded-full animate-ping" />
                    Listening
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSend} className="relative flex items-center bg-white/[0.03] border border-white/10 rounded-full p-1.5 focus-within:border-white/30 focus-within:bg-white/[0.05] transition-all duration-300">

                {/* Voice Button */}
                <button
                  type="button"
                  onClick={toggleVoiceListening}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 ${listening
                      ? "bg-[#00D4AA] text-[#0A0A0F] shadow-[0_0_15px_rgba(0,212,170,0.5)]"
                      : "bg-transparent text-white/50 hover:bg-white/10 hover:text-white"
                    }`}
                >
                  <Mic className="w-5 h-5 stroke-[1.5]" />
                </button>

                {/* Text Input */}
                <input
                  type="text"
                  className="flex-1 bg-transparent text-white px-3 py-2 text-[15px] font-light placeholder:text-white/30 focus:outline-none"
                  placeholder="Speak or type a command..."
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  disabled={listening || isLoading}
                />

                {/* Send Button */}
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="w-10 h-10 rounded-full bg-white text-[#0A0A0F] flex items-center justify-center disabled:opacity-30 disabled:bg-white/20 disabled:text-white transition-all shrink-0 hover:scale-105 active:scale-95"
                >
                  <Send className="w-4 h-4 -ml-0.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotModal;