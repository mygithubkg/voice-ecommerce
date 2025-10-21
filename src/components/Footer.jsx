import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Use Link for navigation
import FAQModal from "../pages/FAQ";

// A helper component for social icons to keep the main component clean
const SocialIcon = ({ href, title, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    title={title}
    className="text-gray-400 hover:text-white transition-colors duration-300"
  >
    {children}
  </a>
);

const ModernFooter = () => {
  const [faqOpen, setFaqOpen] = useState(false);
  // useNavigate can be kept if needed for other programmatic navigation, but Link is better for standard links.

  return (
    <>
      <FAQModal open={faqOpen} onClose={() => setFaqOpen(false)} />
      <footer className="bg-slate-900 text-gray-400">
        <div className="max-w-7xl mx-auto py-12 md:py-16 px-4 sm:px-6 lg:px-8">
          {/* Main footer content grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8">
            {/* 1. Branding & Socials */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img src="/vite.svg" alt="Logo" className="w-7 h-7 md:w-8 md:h-8" />
                <span className="font-bold text-xl md:text-2xl text-white">VoiceCart</span>
              </div>
              <p className="text-sm">
                A modern, voice-driven e-commerce platform for seamless shopping.
              </p>
              <div className="flex space-x-4">
                <SocialIcon href="#" title="Twitter">
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                </SocialIcon>
                <SocialIcon href="#" title="GitHub">
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" /></svg>
                </SocialIcon>
              </div>
            </div>

            {/* 2. Quick Links */}
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-3 md:mb-4">Navigate</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="hover:text-white transition-colors text-sm">Home</Link></li>
                <li><Link to="/products" className="hover:text-white transition-colors text-sm">Products</Link></li>
                <li><Link to="/cart" className="hover:text-white transition-colors text-sm">Your Cart</Link></li>
              </ul>
            </div>

            {/* 3. Support & Legal */}
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-3 md:mb-4">Support</h3>
              <ul className="space-y-2">
                <li><button onClick={() => setFaqOpen(true)} className="hover:text-white transition-colors text-left text-sm">FAQ</button></li>
                <li><Link to="/contact" className="hover:text-white transition-colors text-sm">Contact Us</Link></li>
                <li><Link to="/terms" className="hover:text-white transition-colors text-sm">Terms of Service</Link></li>
              </ul>
            </div>

            {/* 4. Newsletter Subscription */}
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-3 md:mb-4">Stay in touch</h3>
              <p className="text-sm mb-4">Get the latest updates and offers.</p>
              <form className="flex w-full">
                <label htmlFor="email-address" className="sr-only">Email address</label>
                <input type="email" name="email-address" id="email-address" autoComplete="email" required
                  className="w-full min-w-0 appearance-none rounded-l-md border-0 bg-white/5 px-3 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-500 text-sm"
                  placeholder="Enter your email"
                />
                <button type="submit"
                  className="flex-none rounded-r-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-500 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Bottom copyright section */}
          <div className="mt-10 md:mt-12 border-t border-white/10 pt-6 md:pt-8">
            <p className="text-xs md:text-sm text-center">&copy; {new Date().getFullYear()} VoiceCart, Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default ModernFooter;