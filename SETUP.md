# 🚀 Quick Setup Guide - VoiceCart

## IMPORTANT: Before Running the App

### 1. Set Up Firebase (Required for Authentication)

1. Go to https://console.firebase.google.com/
2. Click "Add Project" or select existing project
3. Enable Google Authentication:
   - Click "Authentication" in left sidebar
   - Click "Get Started"
   - Click "Sign-in method" tab
   - Enable "Google" provider
   - Save
4. Get your config:
   - Click gear icon → Project Settings
   - Scroll to "Your apps" section
   - Click web icon (</>)
   - Copy the config object

### 2. Get Google Gemini API Key

1. Go to https://makersuite.google.com/app/apikey
2. Click "Create API Key"
3. Copy the key

### 3. Create Environment Files

**Root directory `.env` file:**
```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
VITE_BACKEND_URL=http://localhost:5000
```

**Backend `.env` file (create in `backend/` folder):**
```env
GEMINI_API_KEY=AIzaSy...
PORT=5000
```

### 4. Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### 5. Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### 6. Open in Browser

Go to http://localhost:5173

## ✅ Checklist

- [ ] Firebase project created
- [ ] Google Auth enabled in Firebase
- [ ] Firebase config copied to `.env`
- [ ] Gemini API key obtained
- [ ] Both `.env` files created
- [ ] Dependencies installed (frontend & backend)
- [ ] Backend running on port 5000
- [ ] Frontend running on port 5173

## 🎯 Test Voice Commands

Once running, click the purple chat button and try:
- "Add 2 apples to cart"
- "Remove 1 milk"
- "What products do you have?"

## 🐛 Common Issues

**"Firebase: Error (auth/...)"**
→ Check Firebase config in `.env` file

**"Network Error" or "Failed to fetch"**
→ Make sure backend is running on port 5000

**Voice not working**
→ Allow microphone permission in browser
→ Use Chrome or Edge (Safari has limited support)

## 📧 Need Help?

Email: karrtikgupta9@gmail.com
