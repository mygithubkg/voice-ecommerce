import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "./ProductList"; // Make sure ProductList exports `products`
import { useNavigate } from "react-router-dom";

const getSpeechRecognition = () => {
  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
};

const normalize = (word) => word.toLowerCase().replace(/s$/, ""); // for plurals
const backendURL = import.meta.env.VITE_BACKEND_URL;

const VoiceCommand = ({ onAddToCart, onRemoveFromCart }) => {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ command: finalTranscript }),
        });

        const data = await res.json();
        console.log("Parsed command:", data);

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
              onAddToCart(matchedProduct, item.quantity);
              // navigate("/cart");
              actionTaken = true;
            } else if (item.action === "remove") {
              onRemoveFromCart(matchedProduct, item.quantity);
              // navigate("/cart");
              actionTaken = true;
            } else {
              setError("⚠️ Unknown action received.");
            }
          });
        }
        
        if (actionTaken) {
              recognition.stop(); // 👈 Stop voice after action
            setListening(false);
            setTimeout(() => {
              navigate("/cart"); // 👈 Navigate to cart
            }, 500);
        } else {
          setError("❌ Command not understood. Try again.");
        }
      } catch (err) {
        console.error(err);
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

  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-lg max-w-md mx-auto mt-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={listening ? stopListening : startListening}
        className={`w-full py-3 px-5 rounded-full text-white font-semibold ${
          listening ? "bg-red-500" : "bg-blue-600"
        }`}
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
            className="mt-4 text-gray-800 text-center"
          >
            <strong>Heard:</strong> "{transcript}"
          </motion.p>
        )}
      </AnimatePresence>

      {error && (
        <p className="text-red-600 mt-3 text-sm text-center">{error}</p>
      )}

      <p className="text-xs text-gray-500 mt-4 text-center">
        Try saying: <strong>"I want 2 apples and 1 banana"</strong>
      </p>
    </motion.div>
  );
};

export default VoiceCommand;
// Changed according to your need 