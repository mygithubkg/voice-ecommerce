import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

// Your web app's Firebase configuration
// Replace these with your actual Firebase project credentials
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// Sign in with Google
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Create user profile in Firestore if it doesn't exist
    try {
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      
      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          displayName: user.displayName || "",
          email: user.email || "",
          photoURL: user.photoURL || "",
          phone: "",
          address: "",
          createdAt: new Date().toISOString(),
          settings: {
            emailNotifications: true,
            orderUpdates: true,
            promotionalEmails: false,
            voiceCommands: true,
            autoSave: true,
            language: "en",
            currency: "USD"
          }
        });
        console.log("User profile created successfully in Firestore");
      }
    } catch (firestoreError) {
      console.error("Error creating user profile in Firestore:", firestoreError);
      console.warn("User can still authenticate, but profile data won't be saved. Please check Firestore setup.");
    }
    
    return user;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
};

// Sign out
export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

// Get user profile data from Firestore
export const getUserProfile = async (userId) => {
  try {
    const userDocRef = doc(db, "users", userId);
    const userDoc = await getDoc(userDocRef);
    
    if (userDoc.exists()) {
      return userDoc.data();
    }
    return null;
  } catch (error) {
    console.error("Error getting user profile:", error);
    console.error("Error details:", error.code, error.message);
    
    // If Firestore is not enabled or has permission issues, return null gracefully
    if (error.code === 'permission-denied' || error.code === 'unavailable') {
      console.warn("Firestore access issue. Please check Firebase console setup.");
      return null;
    }
    throw error;
  }
};

// Update user profile data in Firestore
export const updateUserProfile = async (userId, profileData) => {
  try {
    const userDocRef = doc(db, "users", userId);
    await updateDoc(userDocRef, {
      ...profileData,
      updatedAt: new Date().toISOString()
    });
    
    // Update Firebase Auth profile if display name is being updated
    if (profileData.displayName && auth.currentUser) {
      await updateProfile(auth.currentUser, {
        displayName: profileData.displayName
      });
    }
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};

// Update user settings in Firestore
export const updateUserSettings = async (userId, settings) => {
  try {
    const userDocRef = doc(db, "users", userId);
    await updateDoc(userDocRef, {
      settings: settings,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error("Error updating user settings:", error);
    throw error;
  }
};
