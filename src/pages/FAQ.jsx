import React, { useState } from "react";

const faqs = [
  {
    question: "What is VoiceCart?",
    answer: "VoiceCart is a modern, voice-driven e-commerce platform that lets you shop for groceries and daily needs using both traditional and voice commands for a seamless experience.",
  },
  {
    question: "How do I use voice commands?",
    answer: "Click the 'Voice' button in the header or on the cart page, then speak your command (e.g., 'Add 2 apples to cart'). The system will process your request and update your cart accordingly.",
  },
  {
    question: "Is my data secure?",
    answer: "Yes, we use industry-standard security practices to protect your data and never share your personal information with third parties.",
  },
  {
    question: "How do I contact support?",
    answer: "You can email us at support@voicecart.com or call +1 (555) 123-4567. Our team is available 24/7 to assist you.",
  },
  {
    question: "Can I shop without using voice commands?",
    answer: "Absolutely! You can browse products, add to cart, and checkout using the website interface as well as voice commands.",
  },
  {
    question: "How do I download my invoice?",
    answer: "After checkout, you can download your invoice as a PDF from the cart page's billing section.",
  },
];

const FAQModal = ({ open, onClose }) => {
  const [openIdx, setOpenIdx] = useState(null);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-slate-800 rounded-3xl shadow-2xl shadow-indigo-500/20 p-8 max-w-2xl w-full border border-slate-700 relative animate-fade-in">
        <button
          className="absolute top-4 right-4 text-slate-400 hover:text-white text-3xl font-bold"
          onClick={onClose}
          aria-label="Close FAQ"
        >
          ×
        </button>
        <h1 className="text-4xl font-extrabold text-white mb-8 text-center">Frequently Asked Questions</h1>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border-b border-slate-700 pb-2">
              <button
                className="w-full flex items-center justify-between text-left text-2xl font-bold text-white mb-1 focus:outline-none focus:text-indigo-400 transition"
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                aria-expanded={openIdx === idx}
                aria-controls={`faq-panel-${idx}`}
              >
                <span className="flex items-center gap-2">
                  <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 14h.01M16 10h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" /></svg>
                  {faq.question}
                </span>
                <svg className={`w-6 h-6 ml-2 transition-transform duration-200 text-indigo-400 ${openIdx === idx ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              </button>
              <div
                id={`faq-panel-${idx}`}
                className={`overflow-hidden transition-all duration-300 ${openIdx === idx ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}
                aria-hidden={openIdx !== idx}
              >
                <p className="text-slate-400 pl-10 text-lg">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQModal; 