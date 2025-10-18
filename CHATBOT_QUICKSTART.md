# 🚀 Quick Start - Chatbot with Voice & Gemini AI

## ⚡ 3-Step Setup

### Step 1: Backend Setup (2 minutes)

```bash
# Navigate to backend folder
cd backend

# Create .env file
cp .env.example .env

# Add your Gemini API key to .env
# Get key from: https://makersuite.google.com/app/apikey
GEMINI_API_KEY=your_actual_api_key_here

# Start backend server
node server.js
```

✅ Backend running on `http://localhost:5000`

### Step 2: Frontend Setup (1 minute)

```bash
# In root directory
# Make sure .env has backend URL
VITE_BACKEND_URL=http://localhost:5000

# Start frontend (if not already running)
npm run dev
```

✅ Frontend running on `http://localhost:5174`

### Step 3: Test the Chatbot (30 seconds)

1. Open the website
2. Click the **Chat** button (usually in navbar or floating button)
3. Try voice command: Click 🎤 and say **"Add 2 apples to cart"**
4. Try text chat: Type **"What products do you sell?"**

## 🎯 Features Ready to Use

### ✅ Voice Commands
- 🎤 Click microphone button
- 🗣️ Speak naturally: "Add 2 bananas and 1 milk"
- ✨ Cart updates automatically

### ✅ AI Chat (Gemini-Powered)
- 💬 Type questions about products
- 🤖 Get intelligent responses
- 🛍️ Shopping assistance

### ✅ Cart Management
- ➕ Add items via voice or text
- ➖ Remove items
- 📊 Real-time updates

## 📝 Example Commands

### Voice Shopping
```
"Add 2 apples to cart"
"I want 3 bananas and 1 milk"
"Remove 1 orange"
"Add 5 tomatoes"
```

### Chat Questions
```
"What products do you have?"
"How does voice shopping work?"
"Tell me about dairy products"
"What's on sale?"
```

## 🎨 UI Features

- **Dark Theme**: Matches website design
- **Real-time Updates**: Instant feedback
- **Animations**: Smooth transitions
- **Mobile Responsive**: Works on all devices
- **Voice Indicator**: Visual feedback when listening

## 🔧 Troubleshooting

### Voice not working?
- ✅ Allow microphone permission in browser
- ✅ Use HTTPS or localhost
- ✅ Check if backend is running

### Chat not responding?
- ✅ Verify Gemini API key in `backend/.env`
- ✅ Check backend server is running
- ✅ Look for errors in console

### Cart not updating?
- ✅ Verify backend URL in `.env`
- ✅ Check product names match inventory
- ✅ Look at browser console for errors

## 📚 Full Documentation

For detailed information, see:
- `CHATBOT_INTEGRATION.md` - Complete integration guide
- `FIREBASE_SETUP.md` - Firebase authentication setup
- `THEME_SUMMARY.md` - Design system documentation

## 🎉 You're All Set!

The chatbot is fully integrated with:
- ✅ Voice recognition (Web Speech API)
- ✅ Gemini AI backend
- ✅ Natural language understanding
- ✅ Real-time cart management
- ✅ Dark theme UI

**Start shopping with your voice! 🎤🛒**
