import React from "react";
import { motion } from "framer-motion";

const SoundWave = () => (
  <div className="flex items-center justify-center gap-1.5 h-full">
    {[...Array(12)].map((_, i) => (
      <motion.div
        key={i}
        className="w-3 bg-indigo-400 rounded-full"
        animate={{ height: ["20%", "80%", "20%"] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: i * 0.1,
        }}
      />
    ))}
  </div>
);

const Story = () => (
  <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-900">
    <div className="max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            The Voice Commerce Revolution
          </h2>
          <div className="space-y-4 text-slate-400 leading-relaxed">
            <p>
              In a world where time is precious, we asked:{" "}
              <strong className="text-slate-300">"Why should shopping be a chore of clicks and taps?"</strong>
            </p>
            <p>
              VoiceCart was born from this question. We believe technology should
              disappear, letting you shop as naturally as you talk. By integrating
              advanced AI, we've created an experience that understands you.
            </p>
            <p>
              Our mission is to eliminate friction between thought and purchase, making
              online shopping as effortless as having a conversation with a friend.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="relative aspect-square bg-slate-800/50 rounded-3xl p-8 border border-slate-700 hover:border-indigo-500/50 transition-colors"
        >
          <SoundWave />
          
          {/* Floating stats */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute -top-4 -right-4 bg-slate-800 rounded-2xl shadow-xl p-4 border border-slate-700"
          >
            <div className="text-3xl font-bold text-indigo-400">3x</div>
            <div className="text-sm text-slate-400">Faster Checkout</div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            className="absolute -bottom-4 -left-4 bg-slate-800 rounded-2xl shadow-xl p-4 border border-slate-700"
          >
            <div className="text-3xl font-bold text-cyan-400">99%</div>
            <div className="text-sm text-slate-400">Voice Accuracy</div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default Story;
