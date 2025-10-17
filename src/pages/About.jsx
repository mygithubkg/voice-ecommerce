import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const About = () => {
  const teamValues = [
    {
      icon: "🎯",
      title: "Our Mission",
      description: "To revolutionize online shopping by making it as natural as having a conversation, eliminating barriers between thought and purchase."
    },
    {
      icon: "🔮",
      title: "Our Vision",
      description: "A world where technology adapts to humans, not the other way around. Shopping should be effortless, intuitive, and accessible to everyone."
    },
    {
      icon: "💡",
      title: "Innovation First",
      description: "We leverage cutting-edge AI and voice recognition technology to create seamless, intelligent shopping experiences."
    }
  ];

  const technologies = [
    {
      name: "React",
      description: "Modern UI framework for responsive interfaces",
      color: "from-blue-400 to-blue-600"
    },
    {
      name: "Google Gemini AI",
      description: "Advanced natural language understanding",
      color: "from-purple-400 to-purple-600"
    },
    {
      name: "Web Speech API",
      description: "Browser-native voice recognition",
      color: "from-green-400 to-green-600"
    },
    {
      name: "Node.js + Express",
      description: "Scalable backend infrastructure",
      color: "from-yellow-400 to-orange-600"
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 -z-10"></div>
        
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              About <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">VoiceCart</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              We're pioneering the future of e-commerce by combining artificial intelligence with natural voice interaction, making shopping effortless and intuitive for everyone.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">The Voice Commerce Revolution</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  In a world where time is precious and convenience is king, we asked ourselves: <strong>"Why should shopping require typing, clicking, and navigating through endless menus?"</strong>
                </p>
                <p>
                  VoiceCart was born from this simple yet powerful question. We believe that the best technology disappears into the background, allowing you to focus on what matters—finding and purchasing the products you need.
                </p>
                <p>
                  By integrating advanced AI language models with intuitive voice recognition, we've created an experience where you can shop as naturally as you would talk to a friend.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-3xl p-8 aspect-square flex items-center justify-center">
                <div className="text-center">
                  <div className="text-8xl mb-4">🎤</div>
                  <p className="text-2xl font-bold text-gray-800">Speak. Shop. Done.</p>
                </div>
              </div>
              
              {/* Floating stats */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 border border-gray-100"
              >
                <div className="text-3xl font-bold text-purple-600">3x</div>
                <div className="text-sm text-gray-600">Faster Checkout</div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 border border-gray-100"
              >
                <div className="text-3xl font-bold text-blue-600">99%</div>
                <div className="text-sm text-gray-600">Voice Accuracy</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600">What drives us every day</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {teamValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow border border-gray-100"
              >
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Powered by Cutting-Edge Technology</h2>
            <p className="text-xl text-gray-600">The innovation stack behind VoiceCart</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-2xl p-6 border border-gray-200 hover:border-transparent hover:shadow-xl transition-all"
              >
                <div className="flex items-start space-x-4">
                  <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-r ${tech.color} rounded-xl flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform`}>
                    {tech.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{tech.name}</h3>
                    <p className="text-gray-600">{tech.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Experience the Future?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join us in revolutionizing the way people shop online
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products"
                className="px-8 py-4 bg-white text-purple-600 font-bold rounded-full hover:shadow-2xl hover:scale-105 transition-all"
              >
                Start Shopping
              </Link>
              <Link
                to="/contact"
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-purple-600 transition-all"
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
