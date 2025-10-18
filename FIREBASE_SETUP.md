# Firebase Setup Guide for VoiceCart

This guide will help you set up Firebase Authentication for the VoiceCart application.

## Prerequisites

- A Google account
- Node.js and npm installed
- Firebase CLI (optional, but recommended)

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or "Create a project"
3. Enter your project name (e.g., "VoiceCart")
4. Follow the setup wizard (you can disable Google Analytics if not needed)
5. Click "Create project"

## Step 2: Enable Google Authentication

1. In your Firebase project, click on "Authentication" in the left sidebar
2. Click "Get started" if this is your first time
3. Go to the "Sign-in method" tab
4. Find "Google" in the providers list and click on it
5. Toggle "Enable" to ON
6. Add a support email (required)
7. Click "Save"

## Step 3: Register Your Web App

1. In the Firebase console, click the gear icon (⚙️) next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click the "</>" (Web) icon to add a web app
5. Enter an app nickname (e.g., "VoiceCart Web")
6. Check "Also set up Firebase Hosting" (optional)
7. Click "Register app"
8. You'll see your Firebase configuration object

## Step 4: Get Your Firebase Configuration

Copy the configuration values from the Firebase console. It will look like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};
```

## Step 5: Configure Environment Variables

1. Copy the `.env.example` file to create a new `.env` file:
   ```bash
   cp .env.example .env
   ```

2. Open the `.env` file and replace the placeholder values with your actual Firebase configuration:

   ```bash
   # Firebase Configuration
   VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
   VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890

   # Backend URL
   VITE_BACKEND_URL=http://localhost:5000
   ```

3. Save the file

## Step 6: Add Authorized Domains (Optional)

If you're deploying to production:

1. Go to Firebase Console → Authentication → Settings → Authorized domains
2. Add your production domain (e.g., `yourapp.com`)
3. Localhost is already authorized by default for development

## Step 7: Test the Authentication

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to the app
3. Click the "Sign In" button in the navbar
4. The Google authentication modal should appear
5. Select your Google account and sign in
6. You should see your profile picture and name in the navbar

## Troubleshooting

### Error: "Firebase: Error (auth/popup-blocked)"
- **Solution**: Allow popups for localhost in your browser settings

### Error: "Firebase: Error (auth/unauthorized-domain)"
- **Solution**: Add your domain to Authorized domains in Firebase Console → Authentication → Settings

### Error: "Firebase: Error (auth/invalid-api-key)"
- **Solution**: Double-check your API key in the `.env` file

### Environment variables not loading
- **Solution**: Restart your development server after changing `.env` file
- **Solution**: Make sure variable names start with `VITE_` prefix

### Authentication works in development but not production
- **Solution**: Add your production domain to Authorized domains
- **Solution**: Make sure environment variables are set in your production environment

## Security Best Practices

1. **Never commit `.env` file to Git** - It's already in `.gitignore`
2. **Use environment variables** - Don't hardcode Firebase config in your code
3. **Restrict API keys** - In Firebase Console, restrict your API keys by HTTP referrer
4. **Enable App Check** - Add an extra layer of protection (optional but recommended)
5. **Set up Firebase Security Rules** - Configure proper access rules for your database

## Additional Features

Once basic authentication is working, you can add:

- **Email/Password authentication**
- **Phone authentication**
- **Password reset**
- **Email verification**
- **Multi-factor authentication**

All of these can be enabled from the Firebase Console → Authentication → Sign-in method tab.

## Resources

- [Firebase Authentication Documentation](https://firebase.google.com/docs/auth)
- [Firebase Console](https://console.firebase.google.com/)
- [Firebase CLI Reference](https://firebase.google.com/docs/cli)

## Current Implementation

The VoiceCart app currently uses:

- **Firebase Authentication** with Google Sign-In
- **AuthContext** (`src/context/AuthContext.jsx`) for managing auth state
- **Navbar** (`src/components/Navbar.jsx`) for sign-in/sign-out UI
- **Protected routes** (can be added as needed)

The implementation is complete and ready to use once you configure your Firebase project!
