import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import Products from "./pages/Products";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import ChatbotModal from "./components/ChatbotModal";
import { CartProvider, useCart } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import VoiceCommand from "./components/VoiceCommand";

function App() {
  const [showVoice, setShowVoice] = useState(false);
  const [chatbotOpen, setChatbotOpen] = useState(false);

  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen w-full bg-white flex flex-col">
            <Navbar />

            {/* Main Page Routes */}
            <div className="flex-1">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/home" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<FAQ />} />
              </Routes>
            </div>

            {/* Voice Modal */}
            {showVoice && (
              <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full relative">
                  <button
                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-2xl font-bold"
                    onClick={() => setShowVoice(false)}
                  >
                    ×
                  </button>
                  <VoiceCommandWrapper closeVoice={() => setShowVoice(false)} />
                </div>
              </div>
            )}

            {/* Chatbot Floating Button */}
            <button
              onClick={() => setChatbotOpen(true)}
              className="fixed z-50 bottom-8 right-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full shadow-2xl p-5 flex items-center gap-2 hover:scale-110 transition-all border-4 border-white"
              style={{ boxShadow: "0 12px 40px rgba(147, 51, 234, 0.4)" }}
              title="Open Voice Assistant"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </button>
            <ChatbotModal open={chatbotOpen} onClose={() => setChatbotOpen(false)} />

            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

// Wrapper to inject context functions
const VoiceCommandWrapper = ({ closeVoice }) => {
  const { addToCart, removeFromCart } = useCart();

  return (
    <VoiceCommand
      onAddToCart={addToCart}
      onRemoveFromCart={removeFromCart}
      closeVoice={closeVoice}
    />
  );
};

export default App;
