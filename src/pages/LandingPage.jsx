import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { Mic, ArrowRight, Sparkles, Fingerprint, Waves } from "lucide-react";

// --- 1. Dark Ambient Mouse-Tracking Background ---
// Generates a deep, organic glow that subtly tracks the user's cursor
const AmbientBackground = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 30, stiffness: 120 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 250);
      cursorY.set(e.clientY - 250);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div
        style={{ x: cursorXSpring, y: cursorYSpring }}
        className="absolute w-[500px] h-[500px] rounded-full mix-blend-screen filter blur-[120px] opacity-20 bg-gradient-to-tr from-[#6C63FF] to-[#00D4AA]"
      />
    </div>
  );
};

// --- 2. Dark-Mode Voice Visualizer Component ---
const ActiveListeningWave = () => {
  return (
    <div className="flex items-center justify-center gap-1.5 h-16">
      {[...Array(7)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ height: ["12px", "40px", "12px"] }}
          transition={{
            repeat: Infinity,
            duration: 1,
            delay: i * 0.1,
            ease: "easeInOut",
          }}
          className="w-1.5 bg-white/40 rounded-full group-hover:bg-[#00D4AA] transition-colors"
        />
      ))}
    </div>
  );
};

// --- 3. Main Landing Page ---
const LandingPage = () => {
  const { scrollYProgress } = useScroll();
  const scaleHero = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <div className="w-full relative bg-[#0A0A0F] text-white overflow-hidden font-sans selection:bg-[#6C63FF]/30 selection:text-white">
      <AmbientBackground />

      {/* --- HERO SECTION --- */}
      <motion.section
        style={{ scale: scaleHero, opacity: opacityHero }}
        className="relative w-full h-screen flex flex-col items-center justify-center pt-20 px-6 z-10"
      >
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-sm mb-8">
            <Sparkles className="w-4 h-4 text-[#00D4AA]" />
            <span className="text-sm font-medium tracking-wide text-white/70">The first intuitive pantry.</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-serif font-medium leading-[1.1] tracking-tight mb-8">
            Don't type it.<br />
            <span className="italic text-white/30">Just tell us.</span>
          </h1>

          <p className="text-xl text-white/50 max-w-xl mx-auto mb-12 font-light leading-relaxed">
            A radical new way to stock your home. Speak naturally, and watch your cart assemble itself in real-time.
          </p>

          <div className="flex flex-col items-center justify-center relative group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-24 h-24 bg-white/[0.03] border border-white/10 rounded-full flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] cursor-pointer z-10 group-hover:border-[#00D4AA]/40 transition-colors duration-500"
            >
              <Mic className="w-8 h-8 text-white/80 group-hover:text-[#00D4AA] transition-colors duration-500" />
            </motion.div>
            <div className="absolute top-full mt-6">
              <ActiveListeningWave />
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* --- BENTO BOX GRID (Features) --- */}
      <section className="relative z-10 px-6 py-32 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">

          {/* Box 1: Spans 2 columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="md:col-span-2 bg-white/[0.01] rounded-[2rem] p-10 border border-white/5 backdrop-blur-3xl shadow-2xl relative overflow-hidden flex flex-col justify-end group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#6C63FF]/10 to-transparent opacity-50 rounded-bl-[100px] transition-transform duration-700 group-hover:scale-110" />
            <Waves className="w-10 h-10 text-[#00D4AA] mb-6 stroke-[1.5]" />
            <h3 className="text-3xl font-serif mb-3">Contextual Understanding</h3>
            <p className="text-white/50 font-light max-w-md">
              "Get the ingredients for lasagna, but make it gluten-free." We understand recipes, dietary limits, and your past preferences instantly.
            </p>
          </motion.div>

          {/* Box 2: Square */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="bg-white text-[#0A0A0F] rounded-[2rem] p-10 relative overflow-hidden flex flex-col justify-between"
          >
            <Fingerprint className="w-10 h-10 text-[#6C63FF] stroke-[1.5]" />
            <div>
              <h3 className="text-2xl font-serif mb-2 font-medium tracking-tight">Zero Carts</h3>
              <p className="text-[#0A0A0F]/60 text-sm font-light">Say the word, and it's already dispatched to your door.</p>
            </div>
          </motion.div>

          {/* Box 3: Square */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
            className="bg-white/[0.01] border border-white/5 backdrop-blur-3xl rounded-[2rem] p-10 flex flex-col justify-center items-center text-center shadow-2xl"
          >
            <h2 className="text-6xl font-serif text-white tracking-tighter mb-2">0.2s</h2>
            <p className="text-white/40 font-light text-sm uppercase tracking-widest">Processing Speed</p>
          </motion.div>

          {/* Box 4: Spans 2 columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.3 }}
            className="md:col-span-2 bg-white/[0.01] rounded-[2rem] p-10 border border-white/5 backdrop-blur-3xl shadow-2xl flex items-center justify-between"
          >
            <div>
              <h3 className="text-3xl font-serif mb-3">Live Inventory Sync</h3>
              <p className="text-white/50 font-light max-w-sm">
                If the organic apples are out, we suggest the closest local alternative mid-sentence.
              </p>
            </div>
            <div className="hidden md:flex gap-3">
              <span className="px-4 py-2 bg-white/5 rounded-full text-sm border border-white/5 text-white/80">Apples ✅</span>
              <span className="px-4 py-2 bg-white/5 rounded-full text-sm border border-white/5 text-white/80">Almond Milk ✅</span>
            </div>
          </motion.div>

        </div>
      </section>

      {/* --- MINIMALIST MARQUEE --- */}
      <section className="py-20 border-y border-white/5 bg-white/[0.01] relative z-10 overflow-hidden flex">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="flex whitespace-nowrap"
        >
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-16 px-8 items-center text-5xl md:text-7xl font-serif italic text-white/[0.03]">
              <span>Fresh</span> <span>•</span>
              <span>Organic</span> <span>•</span>
              <span>Local</span> <span>•</span>
              <span>Instant</span> <span>•</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* --- FOOTER CTA --- */}
      <section className="relative z-10 py-32 px-6 flex flex-col items-center text-center">
        <h2 className="text-5xl md:text-7xl font-serif tracking-tighter mb-8">Ready to clear your mind?</h2>
        <button className="group flex items-center gap-3 bg-white text-[#0A0A0F] px-8 py-4 rounded-full text-lg font-medium hover:scale-105 active:scale-95 transition-transform duration-300">
          Start speaking
          <ArrowRight className="w-5 h-5 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
        </button>
      </section>

    </div>
  );
};

export default LandingPage;