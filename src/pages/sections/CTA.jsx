import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CTA = () => (
  <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-900">
    <div className="max-w-4xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-3xl p-12 shadow-2xl"
      >
        <h2 className="text-4xl font-bold text-white mb-6">
          Ready to Experience the Future?
        </h2>
        <p className="text-xl text-white/90 mb-8">
          Step into the new era of online shopping. It's time to talk, not type.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/products"
            className="inline-block px-10 py-4 bg-white text-indigo-600 font-bold rounded-full shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-300"
          >
            Start Shopping Now
          </Link>
          <Link
            to="/contact"
            className="inline-block px-10 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-indigo-600 transition-all duration-300"
          >
            Get in Touch
          </Link>
        </div>
      </motion.div>
    </div>
  </section>
);

export default CTA;
