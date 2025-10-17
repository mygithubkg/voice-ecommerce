import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FAQModal from "../pages/FAQ";

const Footer = () => {
  const navigate = useNavigate();
  const [faqOpen, setFaqOpen] = useState(false);
  return (
    <footer className="w-full bg-gradient-to-r from-indigo-800 to-blue-700 text-white py-10 mt-16 shadow-inner">
      <FAQModal open={faqOpen} onClose={() => setFaqOpen(false)} />
      <div className="w-4/5 max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between gap-8 text-lg">
        {/* Left: Branding & About */}
        <div className="flex-1 flex flex-col gap-3 min-w-[220px]">
          <div className="flex items-center gap-2 mb-2">
            <img src="/vite.svg" alt="Logo" className="w-8 h-8 mr-2 drop-shadow" />
            <span className="font-bold text-2xl tracking-tight">VoiceCart</span>
          </div>
          <p className="text-gray-200 text-base max-w-xs">
            VoiceCart is a modern, voice-driven e-commerce platform for seamless shopping. Enjoy a smarter, faster, and more accessible way to buy your daily needs.
          </p>
          <div className="flex gap-3 mt-2">
            <a href="#" className="hover:text-yellow-300 transition" title="Twitter">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557a9.93 9.93 0 01-2.828.775 4.932 4.932 0 002.165-2.724c-.951.564-2.005.974-3.127 1.195a4.92 4.92 0 00-8.384 4.482C7.691 8.095 4.066 6.13 1.64 3.161c-.542.929-.856 2.01-.857 3.17 0 2.188 1.115 4.117 2.823 5.254a4.904 4.904 0 01-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 01-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 010 21.543a13.94 13.94 0 007.548 2.209c9.142 0 14.307-7.721 13.995-14.646A9.936 9.936 0 0024 4.557z" /></svg>
            </a>
            <a href="#" className="hover:text-yellow-300 transition" title="GitHub">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.157-1.11-1.465-1.11-1.465-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.338 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .267.18.577.688.479C19.138 20.2 22 16.448 22 12.021 22 6.484 17.523 2 12 2z" /></svg>
            </a>
            <a href="mailto:support@voicecart.com" className="hover:text-yellow-300 transition" title="Email">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 12l-4-4-4 4m8 0v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6" /></svg>
            </a>
          </div>
        </div>
        {/* Center: Navigation & FAQ */}
        <div className="flex-1 flex flex-col gap-3 min-w-[180px]">
          <h4 className="font-bold text-xl mb-2">Quick Links</h4>
          <button onClick={() => navigate("/products")} className="text-gray-200 hover:text-yellow-300 text-base text-left transition">Products</button>
          <button onClick={() => navigate("/cart")} className="text-gray-200 hover:text-yellow-300 text-base text-left transition">Cart</button>
          <button onClick={() => setFaqOpen(true)} className="text-yellow-300 font-semibold text-base text-left transition flex items-center gap-2 mt-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 14h.01M16 10h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" /></svg>
            FAQ
          </button>
          <button onClick={() => navigate("/")} className="text-gray-200 hover:text-yellow-300 text-base text-left transition">Home</button>
        </div>
        {/* Right: Contact & Copyright */}
        <div className="flex-1 flex flex-col gap-3 min-w-[220px]">
          <h4 className="font-bold text-xl mb-2">Contact</h4>
          <div className="text-base text-gray-200">support@voicecart.com</div>
          <div className="text-base text-gray-200">+1 (555) 123-4567</div>
          <div className="text-base text-gray-200">123 Market St, City, Country</div>
          <div className="text-xs text-gray-300 mt-4">&copy; {new Date().getFullYear()} VoiceCart. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 