# Firestore Setup Instructions

## The Error You're Seeing

The `400 Bad Request` error and `WebChannelConnection RPC 'Listen' stream errored` indicates that Firestore is either not enabled or the security rules are blocking access.

## How to Fix This

### Step 1: Enable Firestore Database

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **voice-ecommerce-f0867**
3. Click on **"Firestore Database"** in the left sidebar
4. If you see a **"Create database"** button, click it:
   - Choose **"Start in test mode"** (we'll secure it properly in Step 2)
   - Select a location closest to you (e.g., `us-central1`, `europe-west1`, etc.)
   - Click **"Enable"**

### Step 2: Update Security Rules

Once Firestore is enabled, you need to set up proper security rules:

1. In the Firebase Console, go to **Firestore Database**
2. Click on the **"Rules"** tab at the top
3. Replace the existing rules with the following:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection - users can only read/write their own data
    match /users/{userId} {
      // Allow user to read and write their own document
      allow read, write: if request.auth != null && request.auth.uid == userId;
      
      // Allow user to create their own document on first sign-in
      allow create: if request.auth != null && request.auth.uid == userId;
    }
    
    // Deny all other access by default
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

4. Click **"Publish"** to save the rules

### Step 3: Verify the Setup

1. After publishing the rules, refresh your web application
2. Try signing in with Google
3. Check the browser console - you should see: "User profile created successfully in Firestore"
4. Go back to Firebase Console > Firestore Database > Data tab
5. You should see a `users` collection with your user ID as a document

## What These Rules Do

- **Authenticated users only**: Users must be logged in to access Firestore
- **Own data only**: Each user can only read and write their own document in the `users` collection
- **Secure**: No one can access other users' data
- **Everything else blocked**: All other collections are denied by default (good security practice)

## Testing

After setup, these actions should work:
- ✅ Sign in with Google → Creates user profile in Firestore
- ✅ Edit profile → Saves to Firestore
- ✅ Update settings → Saves to Firestore
- ✅ Auto-fill billing info → Reads from Firestore

## Troubleshooting

### Still seeing errors?

1. **Clear browser cache** and refresh
2. **Check Firebase Console** → Firestore Database → Make sure the database shows as "Active"
3. **Verify project ID** in your `.env` file matches the Firebase Console
4. **Check browser console** for more specific error messages

### Permission Denied?

If you see "permission-denied" errors:
- Make sure you're signed in
- Verify the security rules are published
- Try signing out and signing back in

### Need help?

Check the browser console for detailed error messages. The improved error handling will now show more specific information about what's wrong.
