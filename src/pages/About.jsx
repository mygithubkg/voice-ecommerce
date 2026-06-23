import React from "react";
import { motion } from "framer-motion";
import { Mic, Zap, Shield, Globe, ArrowRight, Sparkles } from "lucide-react";

const About = () => {
  const features = [
    { icon: <Mic className="w-6 h-6 stroke-[1.5]" />, title: "Contextual AI", desc: "Our engine doesn't just hear words; it understands intent, dietary limits, and your past preferences." },
    { icon: <Zap className="w-6 h-6 stroke-[1.5]" />, title: "Zero Latency", desc: "Edge-computing models transcribe and fetch inventory in milliseconds. Faster than your thumb." },
    { icon: <Shield className="w-6 h-6 stroke-[1.5]" />, title: "Voice Biometrics", desc: "Secure checkout authenticated entirely by the unique pitch and cadence of your voice." },
    { icon: <Globe className="w-6 h-6 stroke-[1.5]" />, title: "Spatial Awareness", desc: "Available anywhere. Ask what's in your fridge, and let the AI deduce your missing staples." },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0F] pt-32 pb-24 px-6 lg:px-12 relative overflow-hidden font-sans">

      {/* Editorial Ambient Glows */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#6C63FF] opacity-[0.03] blur-[150px] rounded-full pointer-events-none -translate-y-1/2 -translate-x-1/4"></div>
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-[#00D4AA] opacity-[0.02] blur-[120px] rounded-full pointer-events-none translate-x-1/3"></div>

      {/* 1. Cinematic Hero Section */}
      <section className="relative max-w-[1200px] mx-auto pt-10 pb-32 z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-sm mb-8">
            <Sparkles className="w-4 h-4 text-[#00D4AA]" />
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-white/70">Our Story</span>
          </div>

          <h1 className="text-6xl sm:text-7xl md:text-8xl font-serif text-white leading-[1.05] tracking-tighter mb-8">
            speaking of <br />
            <span className="italic text-white/40">the future.</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/50 font-light max-w-2xl mx-auto leading-relaxed">
            We believe shopping should be as effortless as having a conversation. Aura bridges the gap between intention and instant fulfillment.
          </p>
        </motion.div>
      </section>

      {/* 2. The Story & Visualizer (Editorial Split) */}
      <section className="max-w-[1200px] mx-auto mb-40 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left: Typography & Stats */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="text-4xl sm:text-5xl font-serif text-white tracking-tight">
              A paradigm shift in commerce.
            </h2>
            <div className="space-y-6 text-white/50 text-lg font-light leading-relaxed">
              <p>
                Founded in 2024, Aura started with a simple question: Why do we still click, scroll, and type through endless menus when we can just ask for what we want?
              </p>
              <p>
                By engineering bespoke neural networks and proprietary voice recognition, we've bypassed the traditional UI entirely. We built a platform that understands context, local dialects, and complex conditional grocery lists.
              </p>
            </div>

            {/* Minimalist Stats */}
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
              <div>
                <h4 className="text-5xl font-serif text-white mb-2 tracking-tighter">99<span className="text-[#00D4AA]">.9%</span></h4>
                <p className="text-white/40 font-light text-sm uppercase tracking-widest">Accuracy Rate</p>
              </div>
              <div>
                <h4 className="text-5xl font-serif text-white mb-2 tracking-tighter">120<span className="text-[#6C63FF]">ms</span></h4>
                <p className="text-white/40 font-light text-sm uppercase tracking-widest">Processing Time</p>
              </div>
            </div>
          </motion.div>

          {/* Right: Premium Glass Visualizer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="bg-white/[0.02] border border-white/5 backdrop-blur-3xl rounded-[2.5rem] p-12 aspect-square relative flex flex-col items-center justify-center overflow-hidden group shadow-[0_20px_60px_rgba(0,0,0,0.5)]">

              <div className="absolute inset-0 bg-gradient-to-br from-[#00D4AA]/5 to-[#6C63FF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

              {/* Central Mic Element */}
              <div className="w-20 h-20 bg-white/[0.03] border border-white/10 rounded-full flex items-center justify-center mb-12 relative z-10 shadow-inner group-hover:border-[#00D4AA]/30 transition-colors duration-500">
                <Mic className="w-8 h-8 text-white/80" />
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#00D4AA] rounded-full"
                />
              </div>

              {/* Elegant Waveform */}
              <div className="flex items-end gap-1.5 h-24 z-10">
                {[...Array(11)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: [20, Math.random() * 80 + 20, 20] }}
                    transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.1, ease: "easeInOut" }}
                    className="w-1.5 bg-white/20 rounded-full group-hover:bg-white/40 transition-colors duration-500"
                  />
                ))}
              </div>

              <p className="absolute bottom-8 text-white/30 font-serif italic text-sm">listening to the market...</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Core Principles (Bento Box / Magazine Style) */}
      <section className="max-w-[1200px] mx-auto mb-40 relative z-10">
        <div className="mb-16">
          <h2 className="text-4xl font-serif text-white tracking-tight mb-4">Architecture of intent.</h2>
          <p className="text-white/50 font-light max-w-xl">The foundational pillars that allow our intelligence to operate frictionlessly in the background of your life.</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-10 hover:bg-white/[0.04] transition-colors duration-500 relative overflow-hidden group"
            >
              {/* Giant Faint Number Background */}
              <div className="absolute -right-4 -bottom-10 text-[10rem] font-serif font-bold text-white/[0.02] group-hover:text-white/[0.04] transition-colors duration-500 pointer-events-none select-none">
                0{idx + 1}
              </div>

              <div className="w-12 h-12 bg-white/[0.03] border border-white/10 text-[#6C63FF] rounded-full flex items-center justify-center mb-8 relative z-10 group-hover:text-[#00D4AA] transition-colors duration-500">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-serif text-white mb-3 relative z-10">{feature.title}</h3>
              <p className="text-white/50 font-light leading-relaxed relative z-10 max-w-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. Editorial CTA */}
      <section className="max-w-[1200px] mx-auto relative z-10 pt-20 border-t border-white/10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl sm:text-7xl font-serif text-white tracking-tighter mb-8">
            clear your mind.
          </h2>
          <p className="text-white/50 text-lg font-light max-w-lg mx-auto mb-12">
            Step into the future of commerce. No carts, no menus, no friction. Just your voice.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <button className="w-full sm:w-auto px-10 py-4 bg-white text-[#0A0A0F] font-medium rounded-full transition-transform hover:scale-105 flex items-center justify-center gap-3 group">
              Initialize Voice
              <Mic className="w-4 h-4 text-[#0A0A0F]/60 group-hover:text-[#0A0A0F] transition-colors" />
            </button>
            <button className="w-full sm:w-auto px-10 py-4 bg-transparent border border-white/10 text-white hover:bg-white/5 font-medium rounded-full transition-colors flex items-center justify-center gap-2 group">
              Read the Manifesto
              <ArrowRight className="w-4 h-4 text-white/50 group-hover:translate-x-1 group-hover:text-white transition-all" />
            </button>
          </div>
        </motion.div>
      </section>

    </div>
  );
};

export default About;