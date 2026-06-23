import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, X, CheckCircle2 } from "lucide-react";
import { products } from "./ProductList";

const getSpeechRecognition = () => {
  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
};

const normalize = (word) => word.toLowerCase().replace(/s$/, "");
const backendURL = import.meta.env.VITE_BACKEND_URL;

export function useVoiceCommand({ onAddToCart, onRemoveFromCart, onNavigate }) {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const startListening = () => {
    const SpeechRecognition = getSpeechRecognition();
    if (!SpeechRecognition) {
      setError("Web Speech API not supported in this browser.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = true;
    
    let actionTaken = false;

    recognition.onresult = async (event) => {
      const current = event.resultIndex;
      const t = event.results[current][0].transcript;
      setTranscript(t);

      if (event.results[current].isFinal) {
        try {
          const res = await fetch(`${backendURL}/voice-command`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ command: t }),
          });
          const data = await res.json();
          if (Array.isArray(data.actions)) {
            let errorShown = false;
            data.actions.forEach((item) => {
              const matchedProduct = products.find(
                (p) => normalize(p.name) === normalize(item.product)
              );
              if (!matchedProduct) {
                if (!errorShown) {
                  setError(`Product '${item.product}' is not available.`);
                  errorShown = true;
                }
                return;
              }
              if (item.action === "add") {
                onAddToCart && onAddToCart(matchedProduct, item.quantity);
                actionTaken = true;
              } else if (item.action === "remove") {
                onRemoveFromCart && onRemoveFromCart(matchedProduct, item.quantity);
                actionTaken = true;
              } else if (item.action === "navigate" && onNavigate) {
                onNavigate(item.target);
                actionTaken = true;
              }
            });
          }
          if (actionTaken) {
            setSuccess(true);
            setTimeout(() => {
              setSuccess(false);
              setListening(false);
            }, 2000);
          } else {
            setError("Command not understood. Try again.");
          }
        } catch (err) {
          setError("Backend error. Try again later.");
        }
      }
    };

    recognition.onerror = (e) => {
      setError("Speech error: " + e.error);
      setListening(false);
    };

    recognition.onend = () => {
      if (!actionTaken) setListening(false);
    };

    setError("");
    setSuccess(false);
    setTranscript("");
    recognition.start();
    setListening(true);
  };

  const stopListening = () => {
    getSpeechRecognition()?.stop();
    setListening(false);
  };

  return {
    listening,
    transcript,
    error,
    success,
    startListening,
    stopListening,
  };
}

const VoiceCommand = ({ onAddToCart, onRemoveFromCart }) => {
  const {
    listening,
    transcript,
    error,
    success,
    startListening,
    stopListening,
  } = useVoiceCommand({ onAddToCart, onRemoveFromCart });

  // Floating Action Button
  return (
    <>
      <div className="fixed bottom-6 left-6 z-[100]">
        {/* Sonar Ripple effect when listening */}
        {listening && (
          <>
            <motion.div
              animate={{ scale: [1, 1.4, 1.7], opacity: [0.6, 0.3, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
              className="absolute inset-0 bg-[#6C63FF] rounded-full pointer-events-none"
            />
            <motion.div
              animate={{ scale: [1, 1.3, 1.5], opacity: [0.5, 0.2, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, delay: 0.5, ease: "easeOut" }}
              className="absolute inset-0 bg-[#FF4D6D] rounded-full pointer-events-none"
            />
          </>
        )}
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={listening ? stopListening : startListening}
          className={`relative w-14 h-14 rounded-full flex items-center justify-center text-white shadow-2xl z-10 transition-colors ${
            listening ? "bg-gradient-to-r from-[#6C63FF] to-[#FF4D6D]" : "bg-[#6C63FF] hover:bg-[#5b54d6]"
          }`}
        >
          <Mic className="w-6 h-6" />
        </motion.button>
      </div>

      {/* Voice Input Modal */}
      <AnimatePresence>
        {listening && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 z-[110] flex justify-center p-4 pointer-events-none"
          >
            <div className="bg-[#111118] border border-[rgba(255,255,255,0.1)] rounded-3xl p-8 max-w-lg w-full shadow-[0_0_50px_rgba(0,0,0,0.5)] pointer-events-auto flex flex-col items-center">
              
              <button 
                onClick={stopListening}
                className="absolute top-4 right-4 text-[#5A5A6E] hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {success ? (
                <motion.div 
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center gap-4 py-8"
                >
                  <motion.div 
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <CheckCircle2 className="w-16 h-16 text-[#00D4AA]" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-white">Got it!</h3>
                </motion.div>
              ) : (
                <>
                  <h3 className="text-[#9898A8] font-medium mb-8">Listening... tap mic to stop</h3>
                  
                  {/* Waveform Visualization */}
                  <div className="flex items-center justify-center gap-1.5 h-20 mb-8">
                    {[...Array(20)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ height: [10, Math.random() * 60 + 20, 10] }}
                        transition={{ repeat: Infinity, duration: Math.random() * 0.5 + 0.5, ease: "easeInOut" }}
                        className="w-1.5 bg-[#6C63FF] rounded-full"
                      />
                    ))}
                  </div>

                  <p className="text-center text-xl font-display text-white min-h-[60px] italic opacity-80">
                    {transcript || "Say something like 'Add 2 apples'..."}
                  </p>

                  {error && (
                    <p className="text-[#FF4D6D] text-sm mt-4 text-center">{error}</p>
                  )}
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VoiceCommand;