import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log("Subscribed:", email);
    setEmail("");
  };

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "FAQ", path: "/faq" },
  ];

  const categories = [
    { name: "Fresh Produce", path: "/products" },
    { name: "Dairy & Eggs", path: "/products" },
    { name: "Bakery", path: "/products" },
    { name: "Beverages", path: "/products" },
  ];

  return (
    <footer className="bg-[#0A0A0F] pt-24 pb-8 px-6 lg:px-12 relative overflow-hidden flex flex-col justify-between min-h-[60vh]">

      {/* Subtle Ambient Glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#6C63FF] opacity-[0.03] blur-[150px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3"></div>

      <div className="max-w-[1200px] mx-auto w-full relative z-10 flex-1 flex flex-col justify-between">

        {/* Top Section: Brand & Newsletter vs Links */}
        <div className="flex flex-col lg:flex-row justify-between gap-16 mb-24">

          {/* Left: Brand & Newsletter */}
          <div className="flex flex-col gap-8 max-w-md">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-1.5 group w-fit">
              <span className="font-serif font-medium text-4xl tracking-tight text-white">
                aura
              </span>
              <motion.div
                animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="w-2 h-2 rounded-full bg-[#00D4AA] mb-2"
              />
            </Link>

            <p className="text-white/50 text-lg leading-relaxed font-light">
              Shop smarter. Just speak. The premium voice-powered grocery experience that saves you time and effort.
            </p>

            {/* Premium Newsletter Input */}
            <form onSubmit={handleSubscribe} className="relative mt-4">
              <div className="flex items-center w-full bg-white/5 border border-white/10 rounded-full p-1.5 focus-within:border-white/30 focus-within:bg-white/10 transition-all duration-300">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Join the inner circle..."
                  className="bg-transparent pl-5 pr-4 w-full outline-none text-white placeholder:text-white/30 font-light"
                />
                <button
                  type="submit"
                  className="w-10 h-10 shrink-0 bg-white/10 hover:bg-[#00D4AA] rounded-full flex items-center justify-center text-white hover:text-[#0A0A0F] transition-colors duration-300 group"
                >
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </form>
          </div>

          {/* Right: Links Grid */}
          <div className="grid grid-cols-2 gap-12 lg:gap-24">
            {/* Quick Links */}
            <div className="flex flex-col gap-6">
              <h4 className="text-white font-serif text-xl tracking-wide">Explore</h4>
              <ul className="flex flex-col gap-4">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-white/50 hover:text-[#00D4AA] flex items-center gap-2 transition-all duration-300 group"
                    >
                      <span className="w-0 h-px bg-[#00D4AA] transition-all duration-300 group-hover:w-3"></span>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div className="flex flex-col gap-6">
              <h4 className="text-white font-serif text-xl tracking-wide">Aisles</h4>
              <ul className="flex flex-col gap-4">
                {categories.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-white/50 hover:text-[#6C63FF] flex items-center gap-2 transition-all duration-300 group"
                    >
                      <span className="w-0 h-px bg-[#6C63FF] transition-all duration-300 group-hover:w-3"></span>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-white/10">
          <p className="text-white/40 text-sm font-light">
            &copy; {new Date().getFullYear()} Aura Commerce. All rights reserved.
          </p>
          <div className="flex items-center gap-8 text-white/40 text-sm font-light">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>

      {/* Massive Background Typography Anchor */}
      <div className="absolute bottom-[-5%] left-0 w-full overflow-hidden flex justify-center pointer-events-none select-none z-0 opacity-[0.02]">
        <h1 className="text-[15vw] font-serif font-bold tracking-tighter text-white whitespace-nowrap leading-none">
          aura.
        </h1>
      </div>
    </footer>
  );
};

export default Footer;