import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import { CartProvider, useCart } from "./context/CartContext";
import VoiceCommand from "./components/VoiceCommand";

function App() {
  const [showVoice, setShowVoice] = useState(false);

  return (
    <BrowserRouter>
      <CartProvider>
        <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 to-indigo-200">
          <Header onVoiceClick={() => setShowVoice(true)} />

          {/* Main Page Routes */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>

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
        </div>
      </CartProvider>
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
      closeVoice={closeVoice} // this is important
    />
  );
};

export default App;
