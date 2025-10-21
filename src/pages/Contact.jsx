import React, { useState } from "react";
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      ),
      title: "Email Us",
      detail: "support@voicecart.com",
      description: "Send us an email anytime"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
        </svg>
      ),
      title: "Call Us",
      detail: "+1 (555) 123-4567",
      description: "Mon-Fri from 8am to 6pm"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
      ),
      title: "Visit Us",
      detail: "123 Tech Street, SF",
      description: "Come say hello"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
        </svg>
      ),
      title: "Live Chat",
      detail: "24/7 Support",
      description: "Get instant help"
    }
  ];

  const faqs = [
    {
      question: "How does voice shopping work?",
      answer: "Simply click the microphone button and speak naturally. Our AI understands commands like 'Add 2 apples to cart' or 'Show me dairy products'."
    },
    {
      question: "Is my data secure?",
      answer: "Yes! We use enterprise-grade encryption and never store your voice data. All transactions are secured with industry-standard protocols."
    },
    {
      question: "What languages are supported?",
      answer: "Currently, we support English with plans to add more languages soon. Our AI is trained to understand various accents and dialects."
    }
  ];

  return (
  <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <section className="relative py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 md:mb-6">
              <span className="bg-gradient-to-r from-indigo-500 to-cyan-500 bg-clip-text text-transparent">
                Get in Touch
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
              Have a question? We're here to help. Reach out to our team anytime.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-8 md:py-12 px-4 sm:px-6 lg:px-8 -mt-8 md:-mt-12 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-800 rounded-xl md:rounded-2xl p-5 md:p-6 shadow-lg hover:shadow-indigo-500/20 transition-all border border-slate-700 text-center hover:border-indigo-500"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-xl md:rounded-2xl text-white mb-3 md:mb-4">
                  {info.icon}
                </div>
                <h3 className="font-bold text-base md:text-lg mb-2 text-white">{info.title}</h3>
                <p className="text-indigo-400 font-semibold mb-1 text-sm md:text-base">{info.detail}</p>
                <p className="text-xs md:text-sm text-slate-400">{info.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
            {/* Left - Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 md:mb-6 text-white">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-slate-500 transition-all text-base"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-slate-500 transition-all text-base"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-slate-500 transition-all text-base"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-slate-500 resize-none transition-all text-base"
                    placeholder="Tell us more..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-indigo-500/30 hover:scale-105 transition-all duration-200 text-base"
                >
                  {isSubmitted ? "Message Sent! ✓" : "Send Message"}
                </button>

                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-500/10 border border-green-500/50 text-green-400 rounded-xl text-center text-sm"
                  >
                    Thank you! We'll get back to you soon.
                  </motion.div>
                )}
              </form>
            </motion.div>

            {/* Right - FAQs */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 md:mb-6 text-white">Frequently Asked Questions</h2>
              <div className="space-y-4 md:space-y-6">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-slate-800 p-5 md:p-6 rounded-xl border border-slate-700 hover:border-indigo-500 transition-colors"
                  >
                    <h3 className="text-base md:text-lg font-bold text-white mb-2 md:mb-3">{faq.question}</h3>
                    <p className="text-sm md:text-base text-slate-400">{faq.answer}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 md:mt-8 p-5 md:p-6 bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 rounded-xl md:rounded-2xl border border-indigo-500/20">
                <h3 className="text-lg md:text-xl font-bold text-white mb-2">Need Immediate Help?</h3>
                <p className="text-sm md:text-base text-slate-400 mb-4">
                  Our AI-powered voice assistant is available 24/7 to help you shop faster.
                </p>
                <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                  <button className="px-5 md:px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors text-sm md:text-base">
                    Start Voice Shopping
                  </button>
                  <button className="px-5 md:px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg border border-slate-700 transition-colors text-sm md:text-base">
                    View Products
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
