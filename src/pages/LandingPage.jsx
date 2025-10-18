import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MicrophoneIcon, SparklesIcon, BoltIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
import ChatbotModal from "../components/ChatbotModal";

const LandingPage = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const features = [
    {
      icon: <MicrophoneIcon className="w-12 h-12" />,
      title: "Voice Commands",
      description: "Shop naturally using your voice. Just say what you need, and we'll handle the rest.",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      icon: <SparklesIcon className="w-12 h-12" />,
      title: "AI-Powered Assistant",
      description: "Get intelligent recommendations and instant answers from our smart chatbot.",
      gradient: "from-cyan-500 to-blue-500"
    },
    {
      icon: <BoltIcon className="w-12 h-12" />,
      title: "Lightning Fast",
      description: "Experience seamless shopping with real-time cart updates and instant processing.",
      gradient: "from-amber-500 to-orange-500"
    },
    {
      icon: <ShieldCheckIcon className="w-12 h-12" />,
      title: "Secure & Private",
      description: "Your data is protected with enterprise-grade security and encrypted transactions.",
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-300 antialiased">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Grid Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(rgba(148, 163, 184, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.1) 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }}></div>
          </div>
          {/* Gradient Orbs */}
          <div className="absolute top-20 left-10 w-96 h-96 bg-indigo-500/20 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/20 rounded-full filter blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[600px]">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block mb-6">
                <span className="px-4 py-2 bg-slate-800 border border-slate-700 text-indigo-400 rounded-full text-sm font-semibold inline-flex items-center gap-2">
                  <MicrophoneIcon className="w-4 h-4" />
                  Voice-Powered Shopping
                </span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight text-white">
                Shop with Your
                <span className="block bg-gradient-to-r from-indigo-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Voice
                </span>
              </h1>
              
              <p className="text-xl text-slate-400 mb-8 leading-relaxed">
                Experience the future of e-commerce. Add items to your cart, ask questions, and complete purchases—all hands-free with our AI-powered voice assistant.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/products"
                  className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold rounded-full hover:shadow-2xl hover:shadow-indigo-500/50 hover:scale-105 transition-all duration-200 text-center"
                >
                  Start Shopping
                </Link>
                <button
                  onClick={() => setIsChatOpen(true)}
                  className="px-8 py-4 bg-slate-800 border-2 border-slate-700 text-slate-300 font-semibold rounded-full hover:border-indigo-500 hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <MicrophoneIcon className="w-5 h-5" />
                  <span>Try Voice Demo</span>
                </button>
              </div>

              {/* Stats */}
              <div className="mt-12 grid grid-cols-3 gap-6">
                <div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">50+</div>
                  <div className="text-sm text-slate-500">Products</div>
                </div>
                <div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">24/7</div>
                  <div className="text-sm text-slate-500">AI Support</div>
                </div>
                <div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">99%</div>
                  <div className="text-sm text-slate-500">Accuracy</div>
                </div>
              </div>
            </motion.div>

            {/* Right Content - Voice Interface Animation */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative">
                {/* Main card */}
                <div className="relative bg-slate-800 border border-slate-700 rounded-3xl shadow-2xl p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                      <MicrophoneIcon className="w-10 h-10 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl text-white">Voice Assistant</h3>
                      <p className="text-sm text-slate-400">Listening...</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="bg-slate-700/50 rounded-xl p-4 border border-slate-600">
                      <p className="text-sm text-slate-300">"Add 2 apples and 1 milk to cart"</p>
                    </div>
                    <div className="bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 rounded-xl p-4 border border-indigo-500/30">
                      <p className="text-sm text-slate-200">✓ Added 2 apples to your cart</p>
                      <p className="text-sm text-slate-200">✓ Added 1 milk to your cart</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full flex items-center justify-center"
                    >
                      <MicrophoneIcon className="w-12 h-12 text-white" />
                    </motion.div>
                  </div>
                </div>

                {/* Floating elements */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-8 -right-8 bg-slate-800 border border-slate-700 rounded-2xl shadow-xl p-4"
                >
                  <div className="text-2xl">🛒</div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                  className="absolute -bottom-8 -left-8 bg-slate-800 border border-slate-700 rounded-2xl shadow-xl p-4"
                >
                  <div className="text-2xl">✨</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Why Choose <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">VoiceCart</span>
            </h2>
            <p className="text-xl text-slate-400">Experience shopping like never before with cutting-edge technology</p>
          </motion.div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-slate-800 p-8 rounded-2xl hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 border border-slate-700 hover:border-indigo-500"
              >
                <div className={`inline-block p-4 bg-gradient-to-r ${feature.gradient} rounded-2xl mb-4 text-white group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-slate-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-3xl p-12 shadow-2xl"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Shopping Experience?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of users who are already shopping smarter with voice commands
            </p>
            <Link
              to="/products"
              className="inline-block px-10 py-5 bg-white text-indigo-600 font-bold rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-200 text-lg"
            >
              Get Started Now →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Chatbot Modal */}
      {isChatOpen && <ChatbotModal open={isChatOpen} onClose={() => setIsChatOpen(false)} />}
    </div>
  );
};

export default LandingPage;
