import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Bell, Globe, ShieldAlert, Check, Sparkles, SlidersHorizontal, ShieldCheck } from "lucide-react";

const Settings = () => {
  const { user, userProfile, signOut, updateSettings } = useAuth();
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [orderUpdates, setOrderUpdates] = useState(true);
  const [promotionalEmails, setPromotionalEmails] = useState(false);
  const [voiceCommands, setVoiceCommands] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [language, setLanguage] = useState("en");
  const [currency, setCurrency] = useState("USD");

  useEffect(() => {
    if (userProfile?.settings) {
      setEmailNotifications(userProfile.settings.emailNotifications ?? true);
      setOrderUpdates(userProfile.settings.orderUpdates ?? true);
      setPromotionalEmails(userProfile.settings.promotionalEmails ?? false);
      setVoiceCommands(userProfile.settings.voiceCommands ?? true);
      setAutoSave(userProfile.settings.autoSave ?? true);
      setLanguage(userProfile.settings.language ?? "en");
      setCurrency(userProfile.settings.currency ?? "USD");
    }
  }, [userProfile]);

  const handleSaveSettings = async () => {
    try {
      setIsSaving(true);
      await updateSettings({
        emailNotifications, orderUpdates, promotionalEmails,
        voiceCommands, autoSave, language, currency,
      });
      // Optional: Add a brief timeout to show the success state before resetting the button
      setTimeout(() => setIsSaving(false), 800);
    } catch (error) {
      console.error("Error saving settings:", error);
      setIsSaving(false);
    }
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you certain you wish to terminate your account? This action is irreversible.")) {
      signOut();
      navigate("/");
    }
  };

  // --- Unauthenticated State (Premium Frosted Glass) ---
  if (!user) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center p-6 relative overflow-hidden font-sans">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#6C63FF] opacity-[0.05] blur-[150px] rounded-full pointer-events-none"></div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/[0.02] border border-white/5 backdrop-blur-3xl rounded-[2.5rem] p-12 text-center max-w-md w-full relative z-10 shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
        >
          <div className="w-20 h-20 bg-white/[0.03] border border-white/10 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <ShieldCheck className="w-8 h-8 text-[#00D4AA] stroke-[1.5]" />
          </div>
          <h2 className="text-3xl font-serif text-white mb-3 tracking-tight">Identity Required</h2>
          <p className="text-white/40 font-light mb-8 leading-relaxed">Please authenticate your session to calibrate your system settings.</p>
          <button
            onClick={() => navigate("/")}
            className="w-full px-8 py-4 bg-white text-[#0A0A0F] font-medium rounded-full hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
          >
            Return to Initialization
          </button>
        </motion.div>
      </div>
    );
  }

  // --- Authenticated State ---
  return (
    <div className="min-h-screen bg-[#0A0A0F] pt-32 pb-24 px-6 lg:px-12 relative overflow-hidden font-sans">

      {/* Editorial Ambient Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#6C63FF] opacity-[0.02] blur-[150px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/4"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#00D4AA] opacity-[0.02] blur-[150px] rounded-full pointer-events-none translate-y-1/3 -translate-x-1/4"></div>

      <div className="max-w-[1200px] mx-auto w-full relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="space-y-12">

          {/* Cinematic Header */}
          <div className="flex items-baseline gap-4">
            <h1 className="text-5xl lg:text-7xl font-serif text-white tracking-tighter">
              system preferences.
            </h1>
            <motion.div
              animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-2.5 h-2.5 rounded-full bg-[#6C63FF] mb-2 lg:mb-4"
            />
          </div>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* Left Sidebar / Navigation (Desktop) */}
            <div className="lg:col-span-4 space-y-3 sticky top-32">
              <button className="w-full text-left px-6 py-4 bg-white/[0.03] border border-white/10 rounded-[1.5rem] flex items-center gap-4 group transition-all duration-300">
                <div className="w-10 h-10 rounded-full bg-white/[0.05] flex items-center justify-center text-white group-hover:text-[#6C63FF] transition-colors">
                  <Bell className="w-4 h-4 stroke-[1.5]" />
                </div>
                <div>
                  <h3 className="text-white font-medium">Signals</h3>
                  <p className="text-white/40 text-xs font-light">Alerts & communications</p>
                </div>
              </button>

              <button className="w-full text-left px-6 py-4 border border-transparent hover:bg-white/[0.02] hover:border-white/5 rounded-[1.5rem] flex items-center gap-4 group transition-all duration-300">
                <div className="w-10 h-10 rounded-full bg-transparent border border-white/10 flex items-center justify-center text-white/50 group-hover:text-[#00D4AA] group-hover:border-[#00D4AA]/30 transition-colors">
                  <SlidersHorizontal className="w-4 h-4 stroke-[1.5]" />
                </div>
                <div>
                  <h3 className="text-white/70 group-hover:text-white transition-colors font-medium">Parameters</h3>
                  <p className="text-white/30 text-xs font-light">Language, currency & voice</p>
                </div>
              </button>

              <button className="w-full text-left px-6 py-4 border border-transparent hover:bg-white/[0.02] hover:border-white/5 rounded-[1.5rem] flex items-center gap-4 group transition-all duration-300">
                <div className="w-10 h-10 rounded-full bg-transparent border border-white/10 flex items-center justify-center text-white/50 group-hover:text-red-400 group-hover:border-red-400/30 transition-colors">
                  <ShieldAlert className="w-4 h-4 stroke-[1.5]" />
                </div>
                <div>
                  <h3 className="text-white/70 group-hover:text-white transition-colors font-medium">Security</h3>
                  <p className="text-white/30 text-xs font-light">Data & account deletion</p>
                </div>
              </button>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-8 space-y-10">

              {/* 1. Notifications Panel */}
              <div className="bg-white/[0.02] border border-white/5 backdrop-blur-3xl rounded-[2.5rem] p-8 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
                <div className="flex items-center gap-3 mb-8">
                  <Sparkles className="w-5 h-5 text-[#6C63FF]" />
                  <h2 className="text-2xl font-serif text-white tracking-tight">Signals</h2>
                </div>
                <div className="space-y-4">
                  <ToggleSetting label="System Transmissions" desc="Receive critical email updates regarding your account status." checked={emailNotifications} onChange={setEmailNotifications} />
                  <ToggleSetting label="Fulfillment Tracking" desc="Real-time pings on your cart dispatch and delivery." checked={orderUpdates} onChange={setOrderUpdates} />
                  <ToggleSetting label="Curated Offers" desc="Occasional insights and early access to premium inventory." checked={promotionalEmails} onChange={setPromotionalEmails} />
                </div>
              </div>

              {/* 2. Preferences Panel */}
              <div className="bg-white/[0.02] border border-white/5 backdrop-blur-3xl rounded-[2.5rem] p-8 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
                <div className="flex items-center gap-3 mb-8">
                  <Globe className="w-5 h-5 text-[#00D4AA] stroke-[1.5]" />
                  <h2 className="text-2xl font-serif text-white tracking-tight">Parameters</h2>
                </div>

                <div className="space-y-4 mb-8">
                  <ToggleSetting label="Spatial Voice Engine" desc="Allow continuous local microphone access for instant commands." checked={voiceCommands} onChange={setVoiceCommands} />
                  <ToggleSetting label="Persistent Cart" desc="Maintain your items securely across different sessions." checked={autoSave} onChange={setAutoSave} />
                </div>

                <div className="grid sm:grid-cols-2 gap-6 pt-8 border-t border-white/5">
                  <div className="relative">
                    <label className="block text-[10px] font-medium text-[#00D4AA] uppercase tracking-[0.2em] mb-3 pl-4">Linguistics</label>
                    <select value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full bg-white/[0.03] border border-white/10 rounded-full text-white font-light px-6 py-4 focus:outline-none focus:border-white/30 focus:bg-white/[0.05] appearance-none transition-all cursor-pointer">
                      <option value="en" className="bg-[#0A0A0F]">English</option>
                      <option value="es" className="bg-[#0A0A0F]">Español</option>
                      <option value="fr" className="bg-[#0A0A0F]">Français</option>
                    </select>
                  </div>

                  <div className="relative">
                    <label className="block text-[10px] font-medium text-[#00D4AA] uppercase tracking-[0.2em] mb-3 pl-4">Currency</label>
                    <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="w-full bg-white/[0.03] border border-white/10 rounded-full text-white font-light px-6 py-4 focus:outline-none focus:border-white/30 focus:bg-white/[0.05] appearance-none transition-all cursor-pointer">
                      <option value="USD" className="bg-[#0A0A0F]">USD ($)</option>
                      <option value="EUR" className="bg-[#0A0A0F]">EUR (€)</option>
                      <option value="GBP" className="bg-[#0A0A0F]">GBP (£)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 3. Global Action */}
              <div className="flex justify-end">
                <button
                  onClick={handleSaveSettings}
                  disabled={isSaving}
                  className="w-full sm:w-auto px-10 py-4 bg-white text-[#0A0A0F] font-medium rounded-full transition-all duration-300 flex items-center justify-center gap-3 disabled:bg-white/10 disabled:text-white/50 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <AnimatePresence mode="wait">
                    {isSaving ? (
                      <motion.div key="saving" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex items-center gap-2">
                        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-4 h-4 border-2 border-black/20 border-t-[#0A0A0F] rounded-full" />
                        <span>Calibrating...</span>
                      </motion.div>
                    ) : (
                      <motion.div key="save" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex items-center gap-2">
                        <Check className="w-4 h-4" />
                        <span>Lock Configuration</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </div>

              {/* 4. Danger Zone */}
              <div className="bg-red-500/[0.02] border border-red-500/10 rounded-[2.5rem] p-8 sm:p-10 relative overflow-hidden group">
                <div className="absolute inset-0 bg-red-500/0 group-hover:bg-red-500/[0.02] transition-colors duration-500"></div>
                <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div>
                    <h2 className="text-xl font-serif text-white tracking-tight mb-2 flex items-center gap-3">
                      <ShieldAlert className="w-5 h-5 text-red-400 stroke-[1.5]" />
                      Irreversible Action
                    </h2>
                    <p className="text-white/40 font-light text-sm max-w-md leading-relaxed">
                      Eradicating your profile will wipe all historical ledgers, preferences, and voice data completely.
                    </p>
                  </div>
                  <button
                    onClick={handleDeleteAccount}
                    className="px-8 py-3.5 bg-transparent border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white hover:border-red-500 font-medium rounded-full transition-colors shrink-0"
                  >
                    Terminate Identity
                  </button>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Premium Toggle Component
const ToggleSetting = ({ label, desc, checked, onChange }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white/[0.01] hover:bg-white/[0.02] border border-white/5 rounded-[1.5rem] transition-colors">
    <div className="pr-4">
      <h3 className="text-white font-medium mb-1">{label}</h3>
      <p className="text-white/40 font-light text-sm leading-relaxed">{desc}</p>
    </div>
    <button
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20 ${checked ? "bg-[#00D4AA]" : "bg-white/10"}`}
    >
      <span className="sr-only">Toggle {label}</span>
      <motion.span
        layout
        className={`inline-block h-5 w-5 rounded-full bg-white shadow-sm ring-0 transition-transform`}
        animate={{ x: checked ? 24 : 4 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </button>
  </div>
);

export default Settings;