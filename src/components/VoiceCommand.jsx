import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// DO NOT import useVoiceCommand from itself
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

  const startListening = () => {
    const SpeechRecognition = getSpeechRecognition();
    if (!SpeechRecognition) {
      setError("Web Speech API not supported in this browser.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    let actionTaken = false;
    recognition.onresult = async (event) => {
      const finalTranscript = event.results[0][0].transcript;
      setTranscript(finalTranscript);
      try {
        const res = await fetch(`${backendURL}/voice-command`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ command: finalTranscript }),
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
                setError(`❌ Product '${item.product}' is not available.`);
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
            } else {
              setError("⚠️ Unknown action received.");
            }
          });
        }
        if (!actionTaken) {
          setError("❌ Command not understood. Try again.");
        }
      } catch (err) {
        setError("⚠️ Backend error. Try again later.");
      }
    };
    recognition.onerror = (e) => {
      setError("🎤 Speech recognition error: " + e.error);
    };
    recognition.onend = () => setListening(false);
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
    startListening,
    stopListening,
    setTranscript,
    setError,
  };
}

const VoiceCommand = ({ onAddToCart, onRemoveFromCart, closeVoice }) => {
  const {
    listening,
    transcript,
    error,
    startListening,
    stopListening,
    setTranscript,
  } = useVoiceCommand({ onAddToCart, onRemoveFromCart });

  return (
    <motion.div
      className="bg-white/70 backdrop-blur-lg border border-indigo-100 p-8 rounded-3xl shadow-2xl max-w-md mx-auto mt-8 relative"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {closeVoice && (
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-3xl font-bold"
          onClick={closeVoice}
          aria-label="Close Voice"
        >
          ×
        </button>
      )}
      <div className="flex flex-col items-center gap-4">
        <div className={`rounded-full p-4 shadow-lg ${listening ? 'bg-red-100' : 'bg-blue-100'} transition-colors duration-200`}>
          <svg className={`w-10 h-10 ${listening ? 'text-red-500 animate-pulse' : 'text-blue-600'}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75v1.5m0 0a6.75 6.75 0 01-6.75-6.75h1.5A5.25 5.25 0 0012 19.5a5.25 5.25 0 005.25-5.25h1.5A6.75 6.75 0 0112 20.25zm0-15v6.75m0 0a2.25 2.25 0 002.25-2.25V5.25A2.25 2.25 0 0012 3a2.25 2.25 0 00-2.25 2.25v6.75A2.25 2.25 0 0012 12.75z" />
          </svg>
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={listening ? stopListening : startListening}
          className={`w-full py-3 px-5 rounded-full text-white font-semibold text-lg shadow-lg transition-colors duration-200 ${listening ? "bg-red-500 hover:bg-red-600" : "bg-blue-600 hover:bg-blue-700"}`}
        >
          {listening ? "🛑 Stop Listening" : "🎙️ Start Voice Command"}
        </motion.button>
        <AnimatePresence>
          {transcript && (
            <motion.p
              key="transcript"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-2 text-gray-800 text-center text-base font-medium"
            >
              <strong>Heard:</strong> "{transcript}"
            </motion.p>
          )}
        </AnimatePresence>
        {error && (
          <p className="text-red-600 mt-2 text-sm text-center font-semibold">{error}</p>
        )}
        <p className="text-xs text-gray-500 mt-2 text-center">
          Try saying: <strong>"I want 2 apples and 1 banana"</strong>
        </p>
      </div>
    </motion.div>
  );
};

export default VoiceCommand; 