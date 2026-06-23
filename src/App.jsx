import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import Products from "./pages/Products";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import ChatbotModal from "./components/ChatbotModal";
import VoiceCommand from "./components/VoiceCommand";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";

import { CartProvider, useCart } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";

// Page transition wrapper
const PageWrapper = ({ children }) => {
  const shouldAnimate = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!shouldAnimate) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      className="w-full flex-1 flex flex-col"
    >
      {children}
    </motion.div>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><LandingPage /></PageWrapper>} />
        <Route path="/home" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/products" element={<PageWrapper><Products /></PageWrapper>} />
        <Route path="/cart" element={<PageWrapper><CartPage /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
        <Route path="/faq" element={<PageWrapper><FAQ /></PageWrapper>} />
        <Route path="/profile" element={<PageWrapper><Profile /></PageWrapper>} />
        <Route path="/settings" element={<PageWrapper><Settings /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  const [showVoice, setShowVoice] = useState(false);
  const [chatbotOpen, setChatbotOpen] = useState(false);

  return (
    <ErrorBoundary>
      <ToastProvider>
        <BrowserRouter>
          <ScrollToTop />
          <AuthProvider>
            <CartProvider>
              <div className="min-h-screen w-full bg-[#0A0A0F] text-[#F4F4F8] flex flex-col relative font-sans overflow-x-hidden selection:bg-[#6C63FF] selection:bg-opacity-30">
                <Navbar />

                {/* Main Page Routes */}
                <main className="flex-1 w-full flex flex-col">
                  <AnimatedRoutes />
                </main>

                {/* Footer */}
                <Footer />

                {/* Global Utilities */}
                <VoiceCommandWrapper
                  showVoice={showVoice}
                  closeVoice={() => setShowVoice(false)}
                />

                <ChatbotModal
                  open={chatbotOpen}
                  onClose={() => setChatbotOpen(false)}
                />
              </div>
            </CartProvider>
          </AuthProvider>
        </BrowserRouter>
      </ToastProvider>
    </ErrorBoundary>
  );
}

// Wrapper to inject context functions into VoiceCommand
const VoiceCommandWrapper = ({ showVoice, closeVoice }) => {
  const { addToCart, removeFromCart } = useCart();

  return (
    <VoiceCommand
      isActive={showVoice}
      onAddToCart={addToCart}
      onRemoveFromCart={removeFromCart}
      closeVoice={closeVoice}
    />
  );
};

export default App;
