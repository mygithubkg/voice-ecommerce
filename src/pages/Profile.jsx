import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { User, Mail, Phone, MapPin, Calendar, Clock, ShoppingBag, Settings, LogOut, ShieldCheck, Check, Sparkles } from "lucide-react";

const Profile = () => {
  const { user, userProfile, signOut, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (user) {
      setEmail(user.email || "");
      setDisplayName(userProfile?.displayName || user.displayName || "");
      setPhone(userProfile?.phone || "");
      setAddress(userProfile?.address || "");
    }
  }, [user, userProfile]);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleSaveProfile = async () => {
    try {
      setIsSaving(true);
      await updateProfile({ displayName, phone, address });
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      setIsSaving(false);
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
          <p className="text-white/40 font-light mb-8 leading-relaxed">Please authenticate your session to access your personal dashboard and preferences.</p>
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

  const joinDate = user.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Recently';
  const lastSignIn = user.metadata?.lastSignInTime ? new Date(user.metadata.lastSignInTime).toLocaleDateString('en-US', { hour: '2-digit', minute: '2-digit' }) : 'Just now';

  // --- Authenticated State ---
  return (
    <div className="min-h-screen bg-[#0A0A0F] pt-32 pb-24 px-6 lg:px-12 relative overflow-hidden font-sans">

      {/* Editorial Ambient Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00D4AA] opacity-[0.02] blur-[150px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/4"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#6C63FF] opacity-[0.02] blur-[150px] rounded-full pointer-events-none translate-y-1/3 -translate-x-1/4"></div>

      <div className="max-w-[1000px] mx-auto w-full relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="space-y-12">

          {/* Cinematic Header */}
          <div className="flex items-baseline gap-4">
            <h1 className="text-5xl lg:text-7xl font-serif text-white tracking-tighter">
              your profile.
            </h1>
            <motion.div
              animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-2.5 h-2.5 rounded-full bg-[#00D4AA] mb-2 lg:mb-4"
            />
          </div>

          {/* Main Profile Card - Frosted Bento Box */}
          <div className="bg-white/[0.02] border border-white/5 backdrop-blur-3xl rounded-[2.5rem] p-8 sm:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.5)] relative overflow-hidden">

            {/* Identity Section */}
            <div className="flex flex-col sm:flex-row items-center gap-8 mb-12 relative z-10">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#00D4AA] to-[#6C63FF] rounded-full opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500"></div>
                <img
                  src={user.photoURL || `https://ui-avatars.com/api/?name=${displayName}&background=0A0A0F&color=fff&size=128&border=1&border-color=333`}
                  alt={displayName}
                  className="w-32 h-32 rounded-full border border-white/10 relative z-10 object-cover shadow-2xl"
                />
                <div className="absolute bottom-2 right-2 w-7 h-7 bg-white border-[3px] border-[#0A0A0F] rounded-full flex items-center justify-center z-20">
                  <Check className="w-3.5 h-3.5 text-[#0A0A0F] stroke-[2.5]" />
                </div>
              </div>

              <div className="text-center sm:text-left flex-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#00D4AA]/30 bg-[#00D4AA]/5 mb-4">
                  <Sparkles className="w-3 h-3 text-[#00D4AA]" />
                  <span className="text-[10px] font-medium text-[#00D4AA] uppercase tracking-[0.2em]">Verified</span>
                </div>
                <h2 className="text-3xl font-serif text-white mb-2 tracking-tight">{displayName || "Anonymous User"}</h2>
                <p className="text-white/40 font-light mb-4">{email}</p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-6 text-sm text-white/30 font-light">
                  <span className="flex items-center gap-2"><Calendar className="w-4 h-4 stroke-[1.5]" /> Authenticated {joinDate}</span>
                  <span className="flex items-center gap-2"><Clock className="w-4 h-4 stroke-[1.5]" /> Pinged {lastSignIn}</span>
                </div>
              </div>
            </div>

            {/* Editable Info Grid */}
            <div className="grid sm:grid-cols-2 gap-6 relative z-10">

              {/* Display Name */}
              <div className="bg-white/[0.01] border border-white/5 rounded-[1.5rem] p-6 hover:bg-white/[0.02] transition-colors">
                <label className="flex items-center gap-2 text-[10px] font-medium text-[#00D4AA] uppercase tracking-[0.2em] mb-4">
                  <User className="w-4 h-4" /> Full Name
                </label>
                {isEditing ? (
                  <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="w-full bg-white/[0.03] border border-white/10 text-white font-light px-5 py-3 rounded-xl focus:border-white/30 focus:bg-white/[0.05] outline-none transition-all" />
                ) : (
                  <p className="text-white font-light text-lg">{displayName || "—"}</p>
                )}
              </div>

              {/* Email (Read Only) */}
              <div className="bg-white/[0.01] border border-white/5 rounded-[1.5rem] p-6 opacity-60">
                <label className="flex items-center gap-2 text-[10px] font-medium text-[#00D4AA] uppercase tracking-[0.2em] mb-4">
                  <Mail className="w-4 h-4" /> Primary Email
                </label>
                <p className="text-white font-light text-lg mb-1">{email}</p>
                <p className="text-[10px] text-white/40 tracking-wider uppercase">Immutable</p>
              </div>

              {/* Phone */}
              <div className="bg-white/[0.01] border border-white/5 rounded-[1.5rem] p-6 hover:bg-white/[0.02] transition-colors">
                <label className="flex items-center gap-2 text-[10px] font-medium text-[#00D4AA] uppercase tracking-[0.2em] mb-4">
                  <Phone className="w-4 h-4" /> Secure Line
                </label>
                {isEditing ? (
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-white/[0.03] border border-white/10 text-white font-light px-5 py-3 rounded-xl focus:border-white/30 focus:bg-white/[0.05] outline-none transition-all" />
                ) : (
                  <p className="text-white font-light text-lg">{phone || "—"}</p>
                )}
              </div>

              {/* Address */}
              <div className="bg-white/[0.01] border border-white/5 rounded-[1.5rem] p-6 hover:bg-white/[0.02] transition-colors">
                <label className="flex items-center gap-2 text-[10px] font-medium text-[#00D4AA] uppercase tracking-[0.2em] mb-4">
                  <MapPin className="w-4 h-4" /> Dispatch Coordinates
                </label>
                {isEditing ? (
                  <textarea rows={2} value={address} onChange={(e) => setAddress(e.target.value)} className="w-full bg-white/[0.03] border border-white/10 text-white font-light px-5 py-3 rounded-xl focus:border-white/30 focus:bg-white/[0.05] outline-none transition-all resize-none" />
                ) : (
                  <p className="text-white font-light text-lg truncate">{address || "—"}</p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-10 pt-10 border-t border-white/5 flex flex-wrap gap-4 relative z-10">
              <AnimatePresence mode="wait">
                {isEditing ? (
                  <motion.div key="editing" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="flex gap-4 w-full sm:w-auto">
                    <button onClick={handleSaveProfile} disabled={isSaving} className="flex-1 sm:flex-none px-10 py-3.5 bg-white text-[#0A0A0F] font-medium rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50">
                      {isSaving ? "Syncing..." : "Confirm"}
                    </button>
                    <button onClick={() => setIsEditing(false)} className="flex-1 sm:flex-none px-10 py-3.5 bg-transparent border border-white/10 text-white/70 hover:text-white hover:bg-white/5 font-medium rounded-full transition-colors">
                      Abort
                    </button>
                  </motion.div>
                ) : (
                  <motion.button key="viewing" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} onClick={() => setIsEditing(true)} className="w-full sm:w-auto px-10 py-3.5 border border-white/20 text-white hover:bg-white hover:text-[#0A0A0F] font-medium rounded-full transition-all duration-300">
                    Modify Parameters
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Quick Actions (Editorial Cards) */}
          <div className="grid sm:grid-cols-3 gap-6">

            <button onClick={() => navigate("/cart")} className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 text-left hover:bg-white/[0.04] transition-colors group flex flex-col justify-between min-h-[200px]">
              <div className="w-12 h-12 bg-white/[0.03] border border-white/10 rounded-full flex items-center justify-center text-white/50 group-hover:text-[#00D4AA] group-hover:border-[#00D4AA]/30 transition-all">
                <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
              </div>
              <div>
                <h3 className="font-serif text-white text-2xl mb-2">Ledger</h3>
                <p className="text-white/40 font-light text-sm leading-relaxed">Review your past requisitions and fulfillment statuses.</p>
              </div>
            </button>

            <button onClick={() => navigate("/settings")} className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 text-left hover:bg-white/[0.04] transition-colors group flex flex-col justify-between min-h-[200px]">
              <div className="w-12 h-12 bg-white/[0.03] border border-white/10 rounded-full flex items-center justify-center text-white/50 group-hover:text-[#6C63FF] group-hover:border-[#6C63FF]/30 transition-all">
                <Settings className="w-5 h-5 stroke-[1.5]" />
              </div>
              <div>
                <h3 className="font-serif text-white text-2xl mb-2">System</h3>
                <p className="text-white/40 font-light text-sm leading-relaxed">Calibrate your notifications, language, and interface.</p>
              </div>
            </button>

            <button onClick={handleSignOut} className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 text-left hover:bg-white/[0.04] transition-colors group flex flex-col justify-between min-h-[200px]">
              <div className="w-12 h-12 bg-white/[0.03] border border-white/10 rounded-full flex items-center justify-center text-white/50 group-hover:text-red-400 group-hover:border-red-400/30 transition-all">
                <LogOut className="w-5 h-5 stroke-[1.5]" />
              </div>
              <div>
                <h3 className="font-serif text-white text-2xl mb-2">Disconnect</h3>
                <p className="text-white/40 font-light text-sm leading-relaxed">Securely terminate your current authenticated session.</p>
              </div>
            </button>

          </div>

        </motion.div>
      </div>
    </div>
  );
};

export default Profile;