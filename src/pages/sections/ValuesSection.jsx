import React from "react";
import { motion } from "framer-motion";
import { RocketLaunchIcon, EyeIcon, SparklesIcon } from '@heroicons/react/24/outline';

const teamValues = [
  {
    icon: <RocketLaunchIcon className="w-8 h-8 text-indigo-400" />,
    title: "Our Mission",
    description: "To revolutionize shopping by making it as natural as a conversation, eliminating barriers between thought and purchase.",
  },
  {
    icon: <EyeIcon className="w-8 h-8 text-cyan-400" />,
    title: "Our Vision",
    description: "A world where technology adapts to humans. Shopping should be effortless, intuitive, and accessible to everyone.",
  },
  {
    icon: <SparklesIcon className="w-8 h-8 text-amber-400" />,
    title: "Innovation First",
    description: "We leverage cutting-edge AI to create seamless, intelligent shopping experiences that feel like magic.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const ValuesSection = () => (
  <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-800/30">
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold text-white mb-4">Our Core Values</h2>
        <p className="text-xl text-slate-400">What drives us every day</p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ staggerChildren: 0.2 }}
        className="grid md:grid-cols-3 gap-8"
      >
        {teamValues.map((value) => (
          <motion.div
            key={value.title}
            variants={cardVariants}
            className="bg-slate-800 rounded-2xl p-8 border border-slate-700 hover:border-indigo-500 transition-all duration-300 group"
          >
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-slate-700/50 group-hover:bg-slate-700 transition-colors">
              {value.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
            <p className="text-slate-400 leading-relaxed">{value.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default ValuesSection;
