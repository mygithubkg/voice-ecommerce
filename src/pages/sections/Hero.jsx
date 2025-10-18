import React from "react";
import { motion } from "framer-motion";

const Hero = () => (
  <header className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
    {/* Background Grid Pattern */}
    <div className="absolute inset-0 bg-slate-900">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(148, 163, 184, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
    </div>
    
    <div className="relative max-w-4xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
          The Future of Commerce is a{" "}
          <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Conversation
          </span>
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
          VoiceCart is pioneering the next wave of e-commerce by merging advanced AI
          with the simplicity of voice, making shopping intuitive for everyone.
        </p>
      </motion.div>
    </div>
  </header>
);

export default Hero;
