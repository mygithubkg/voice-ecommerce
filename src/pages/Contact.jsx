import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, MessageSquare, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  const contactInfo = [
    { icon: <Mail className="w-5 h-5 stroke-[1.5]" />, title: "Email", detail: "hello@aura.com" },
    { icon: <Phone className="w-5 h-5 stroke-[1.5]" />, title: "Call", detail: "+1 (555) 123-4567" },
    { icon: <MapPin className="w-5 h-5 stroke-[1.5]" />, title: "Visit", detail: "San Francisco, CA" },
    { icon: <MessageSquare className="w-5 h-5 stroke-[1.5]" />, title: "Chat", detail: "24/7 AI Support" }
  ];

  const faqs = [
    { question: "How does spatial voice shopping work?", answer: "Simply summon the assistant and speak naturally. Our AI understands intent, context, and complex lists in real-time." },
    { question: "Is my voice data secure?", answer: "Absolutely. We utilize edge-computing and enterprise-grade encryption. Your voice prints are never stored." },
    { question: "Can I change my order post-checkout?", answer: "You have a 5-minute grace period to simply say 'cancel my last order' or 'remove the apples'." }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0F] pt-32 pb-24 px-6 lg:px-12 relative overflow-hidden font-sans">

      {/* Editorial Ambient Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00D4AA] opacity-[0.03] blur-[150px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/4"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#6C63FF] opacity-[0.03] blur-[150px] rounded-full pointer-events-none translate-y-1/3 -translate-x-1/4"></div>

      <div className="max-w-[1200px] mx-auto w-full relative z-10">

        {/* Cinematic Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <div className="flex items-baseline gap-4 mb-6">
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-serif text-white tracking-tighter">
              reach out.
            </h1>
            <motion.div
              animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-3 h-3 rounded-full bg-[#00D4AA] mb-4 sm:mb-6"
            />
          </div>
          <p className="text-white/50 text-xl font-light max-w-2xl leading-relaxed">
            Whether you have a technical inquiry or just want to explore the future of commerce, our team is listening.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">

          {/* Left Column: Info & FAQs (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col gap-16">

            {/* Contact Pills Grid */}
            <div className="grid grid-cols-2 gap-4">
              {contactInfo.map((info, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 flex flex-col hover:bg-white/[0.04] transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center mb-4 text-white/50 group-hover:text-[#00D4AA] transition-colors">
                    {info.icon}
                  </div>
                  <h3 className="text-white/40 text-sm font-light uppercase tracking-widest mb-1">{info.title}</h3>
                  <p className="text-white font-medium">{info.detail}</p>
                </motion.div>
              ))}
            </div>

            {/* FAQs */}
            <div>
              <div className="flex items-center gap-2 mb-8">
                <Sparkles className="w-4 h-4 text-[#6C63FF]" />
                <h2 className="text-2xl font-serif text-white tracking-tight">Frequently Asked</h2>
              </div>
              <div className="space-y-8">
                {faqs.map((faq, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="border-b border-white/5 pb-8 last:border-0"
                  >
                    <h3 className="text-lg font-serif text-white mb-3">{faq.question}</h3>
                    <p className="text-white/40 font-light leading-relaxed">{faq.answer}</p>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Premium Form (7 Columns) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="bg-white/[0.02] border border-white/5 backdrop-blur-3xl rounded-[2.5rem] p-8 sm:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.5)] relative overflow-hidden">

              <h2 className="text-3xl font-serif text-white mb-10 tracking-tight">Send a dispatch.</h2>

              <form onSubmit={handleSubmit} className="space-y-6">

                <div className="grid sm:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="relative">
                    <label className="block text-[10px] font-medium text-[#00D4AA] uppercase tracking-[0.2em] mb-2 pl-4">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedInput('name')}
                      onBlur={() => setFocusedInput(null)}
                      required
                      className="w-full px-6 py-4 bg-white/[0.02] border border-white/10 rounded-full text-white font-light placeholder:text-white/20 focus:outline-none focus:border-white/30 focus:bg-white/[0.04] transition-all"
                      placeholder="Jane Doe"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="relative">
                    <label className="block text-[10px] font-medium text-[#00D4AA] uppercase tracking-[0.2em] mb-2 pl-4">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedInput('email')}
                      onBlur={() => setFocusedInput(null)}
                      required
                      className="w-full px-6 py-4 bg-white/[0.02] border border-white/10 rounded-full text-white font-light placeholder:text-white/20 focus:outline-none focus:border-white/30 focus:bg-white/[0.04] transition-all"
                      placeholder="jane@example.com"
                    />
                  </div>
                </div>

                {/* Subject Input */}
                <div className="relative">
                  <label className="block text-[10px] font-medium text-[#00D4AA] uppercase tracking-[0.2em] mb-2 pl-4">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={() => setFocusedInput('subject')}
                    onBlur={() => setFocusedInput(null)}
                    required
                    className="w-full px-6 py-4 bg-white/[0.02] border border-white/10 rounded-full text-white font-light placeholder:text-white/20 focus:outline-none focus:border-white/30 focus:bg-white/[0.04] transition-all"
                    placeholder="How can we assist you?"
                  />
                </div>

                {/* Message Input */}
                <div className="relative">
                  <label className="block text-[10px] font-medium text-[#00D4AA] uppercase tracking-[0.2em] mb-2 pl-4">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedInput('message')}
                    onBlur={() => setFocusedInput(null)}
                    required
                    rows="5"
                    className="w-full px-6 py-5 bg-white/[0.02] border border-white/10 rounded-[2rem] text-white font-light placeholder:text-white/20 focus:outline-none focus:border-white/30 focus:bg-white/[0.04] transition-all resize-none"
                    placeholder="Describe your inquiry in detail..."
                  />
                </div>

                {/* Action Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitted}
                    className="w-full sm:w-auto px-10 py-4 bg-white text-[#0A0A0F] font-medium rounded-full transition-all duration-300 flex items-center justify-center gap-3 disabled:bg-white/10 disabled:text-white/50 group hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <AnimatePresence mode="wait">
                      {isSubmitted ? (
                        <motion.div
                          key="success"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-center gap-2"
                        >
                          <CheckCircle2 className="w-5 h-5 text-[#00D4AA]" />
                          <span>Dispatch Confirmed</span>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="send"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-center gap-2"
                        >
                          <span>Initialize Transmission</span>
                          <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                </div>

              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Contact;