import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Sparkles } from "lucide-react";

// Updated FAQ copy to match the "Aura" premium spatial commerce theme
const faqs = [
  { question: "What exactly is Aura?", answer: "Aura is a paradigm-shifting spatial commerce platform. It allows you to stock your pantry and manage your household entirely through conversational, context-aware voice commands." },
  { question: "How does the voice engine work?", answer: "Simply summon the assistant by clicking the mic or using your wake word. Speak naturally—'Add organic apples and almond milk'—and our edge-computing AI will instantly construct your cart." },
  { question: "Is my biometric data secure?", answer: "Absolutely. We utilize enterprise-grade encryption and process voice commands locally where possible. Your unique voice prints and personal data are never sold or shared." },
  { question: "How do I reach the concierge?", answer: "For bespoke support, you can dispatch an email to concierge@aura.com or utilize the secure line at +1 (555) 000-AURA. Our team is available 24/7." },
  { question: "Can I shop using a traditional interface?", answer: "Yes. While Aura is optimized for spatial voice interaction, you can seamlessly transition to our tactile, glassmorphic UI to browse aisles and manage your ledger manually." },
  { question: "Where can I find my digital receipts?", answer: "Post-fulfillment, your detailed invoices are encrypted and stored in your profile's Ledger section, available for PDF download at any time." },
];

const FAQModal = ({ open, onClose }) => {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 font-sans">

          {/* Frosted Backdrop */}
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0A0A0F]/60"
          />

          {/* Main Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            className="w-full max-w-2xl bg-[#0A0A0F]/90 border border-white/10 backdrop-blur-3xl rounded-[2.5rem] p-8 sm:p-12 relative z-10 shadow-[0_20px_80px_rgba(0,0,0,0.8)] max-h-[85vh] flex flex-col overflow-hidden"
          >
            {/* Ambient Interior Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00D4AA]/10 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#6C63FF]/10 rounded-full blur-[80px] pointer-events-none translate-y-1/2 -translate-x-1/3"></div>

            {/* Minimalist Close Button */}
            <button
              onClick={onClose}
              className="absolute top-8 right-8 w-10 h-10 bg-white/[0.03] text-white/50 hover:text-white hover:bg-white/10 rounded-full flex items-center justify-center transition-all border border-white/5 z-20"
            >
              <X className="w-5 h-5 stroke-[1.5]" />
            </button>

            {/* Editorial Header */}
            <div className="mb-10 relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-[#00D4AA]" />
                <span className="text-[10px] font-medium text-[#00D4AA] uppercase tracking-[0.2em]">Knowledge Base</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-serif text-white tracking-tight pr-12 leading-none">
                inquiries.
              </h2>
            </div>

            {/* Accordion List */}
            <div className="flex-1 overflow-y-auto pr-4 -mr-4 custom-scrollbar space-y-2 relative z-10">
              {faqs.map((faq, idx) => {
                const isOpen = openIdx === idx;
                return (
                  <div key={idx} className="border-b border-white/5 last:border-0">
                    <button
                      className="w-full flex items-center justify-between py-6 text-left focus:outline-none group"
                      onClick={() => setOpenIdx(isOpen ? null : idx)}
                    >
                      <span className={`font-serif text-xl sm:text-2xl transition-colors duration-300 pr-8 ${isOpen ? 'text-white' : 'text-white/70 group-hover:text-white'}`}>
                        {faq.question}
                      </span>

                      {/* Premium Rotating Plus Icon */}
                      <motion.div
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300 border ${isOpen ? 'bg-white text-[#0A0A0F] border-transparent' : 'bg-transparent text-white/40 border-white/10 group-hover:border-white/30 group-hover:text-white'}`}
                      >
                        <Plus className="w-4 h-4 stroke-[1.5]" />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pb-8 pt-2 text-white/50 font-light leading-relaxed max-w-[90%]">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      )}

      {/* Invisible styling injection for the sleek scrollbar */}
      {open && (
        <style dangerouslySetInnerHTML={{
          __html: `
          .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.2);
          }
        `}} />
      )}
    </AnimatePresence>
  );
};

export default FAQModal;