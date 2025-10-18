import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [email, setEmail] = useState(user?.email || "");

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleSaveProfile = () => {
    // In a real app, you would update Firebase user profile here
    console.log("Saving profile:", { displayName, email });
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-900 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Please Sign In</h2>
          <p className="text-slate-400 mb-6">You need to be signed in to view your profile</p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-lg hover:from-indigo-700 hover:to-cyan-700 transition-all"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 pt-20">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent mb-2">
              My Profile
            </h1>
            <p className="text-slate-400">Manage your account information</p>
          </div>

          {/* Profile Card */}
          <div className="bg-slate-800 rounded-2xl shadow-xl p-8 mb-6">
            {/* Profile Photo */}
            <div className="flex items-center mb-8">
              <img
                src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}&background=4f46e5&color=fff&size=128`}
                alt={user.displayName}
                className="w-24 h-24 rounded-full border-4 border-indigo-500 shadow-lg"
              />
              <div className="ml-6">
                <h2 className="text-2xl font-bold text-white">{user.displayName}</h2>
                <p className="text-slate-400">{user.email}</p>
                <span className="inline-block mt-2 px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-sm">
                  ✓ Verified Account
                </span>
              </div>
            </div>

            {/* Account Information */}
            <div className="space-y-6">
              <div>
                <label className="block text-slate-400 mb-2 text-sm font-medium">
                  Display Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                  />
                ) : (
                  <p className="text-white text-lg">{user.displayName}</p>
                )}
              </div>

              <div>
                <label className="block text-slate-400 mb-2 text-sm font-medium">
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                    disabled
                  />
                ) : (
                  <p className="text-white text-lg">{user.email}</p>
                )}
                <p className="text-slate-500 text-sm mt-1">Email cannot be changed</p>
              </div>

              <div>
                <label className="block text-slate-400 mb-2 text-sm font-medium">
                  Account Created
                </label>
                <p className="text-white text-lg">
                  {user.metadata?.creationTime 
                    ? new Date(user.metadata.creationTime).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })
                    : 'Not available'}
                </p>
              </div>

              <div>
                <label className="block text-slate-400 mb-2 text-sm font-medium">
                  Last Sign In
                </label>
                <p className="text-white text-lg">
                  {user.metadata?.lastSignInTime 
                    ? new Date(user.metadata.lastSignInTime).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })
                    : 'Not available'}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSaveProfile}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-lg hover:from-indigo-700 hover:to-cyan-700 transition-all font-medium"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setDisplayName(user?.displayName || "");
                      setEmail(user?.email || "");
                    }}
                    className="flex-1 px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-all font-medium"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-lg hover:from-indigo-700 hover:to-cyan-700 transition-all font-medium"
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={() => navigate("/settings")}
                    className="flex-1 px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-all font-medium"
                  >
                    Settings
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={() => navigate("/cart")}
              className="p-6 bg-slate-800 rounded-xl text-left hover:bg-slate-700 transition-all group"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-white font-semibold text-lg">My Cart</h3>
                <svg className="w-6 h-6 text-indigo-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <p className="text-slate-400 text-sm">View your shopping cart</p>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={handleSignOut}
              className="p-6 bg-slate-800 rounded-xl text-left hover:bg-red-500/10 transition-all group border border-transparent hover:border-red-500/30"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-white font-semibold text-lg">Sign Out</h3>
                <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </div>
              <p className="text-slate-400 text-sm">Sign out of your account</p>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
