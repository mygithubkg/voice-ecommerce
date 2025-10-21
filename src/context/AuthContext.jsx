import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, signInWithGoogle, logOut, getUserProfile, updateUserProfile, updateUserSettings } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        // Load user profile from Firestore
        try {
          const profile = await getUserProfile(currentUser.uid);
          setUserProfile(profile);
        } catch (error) {
          console.error("Error loading user profile:", error);
          setUserProfile(null);
        }
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async () => {
    try {
      const user = await signInWithGoogle();
      setUser(user);
      
      // Load user profile after sign in
      const profile = await getUserProfile(user.uid);
      setUserProfile(profile);
      
      return user;
    } catch (error) {
      console.error("Sign in error:", error);
      throw error;
    }
  };

  const signOutUser = async () => {
    try {
      await logOut();
      setUser(null);
      setUserProfile(null);
    } catch (error) {
      console.error("Sign out error:", error);
      throw error;
    }
  };

  const updateProfile = async (profileData) => {
    if (!user) {
      throw new Error("No user logged in");
    }
    
    try {
      await updateUserProfile(user.uid, profileData);
      
      // Reload user profile
      const updatedProfile = await getUserProfile(user.uid);
      setUserProfile(updatedProfile);
      
      return updatedProfile;
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  };

  const updateSettings = async (settings) => {
    if (!user) {
      throw new Error("No user logged in");
    }
    
    try {
      await updateUserSettings(user.uid, settings);
      
      // Reload user profile
      const updatedProfile = await getUserProfile(user.uid);
      setUserProfile(updatedProfile);
      
      return updatedProfile;
    } catch (error) {
      console.error("Error updating settings:", error);
      throw error;
    }
  };

  const value = {
    user,
    userProfile,
    loading,
    signIn,
    signOut: signOutUser,
    updateProfile,
    updateSettings,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
