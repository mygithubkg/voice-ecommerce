# 🎙️ VoiceCart - Voice-Powered E-Commerce Platform

A modern, elegant e-commerce platform featuring AI-powered voice commands and natural language shopping. Built with React, Firebase, Google Gemini AI, and Express.js.

![VoiceCart](https://img.shields.io/badge/Voice-Commerce-purple?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![Firebase](https://img.shields.io/badge/Firebase-Auth-orange?style=for-the-badge&logo=firebase)
![AI](https://img.shields.io/badge/Google-Gemini%20AI-green?style=for-the-badge)

## ✨ Features

- 🎤 **Voice Shopping** - Add/remove items to cart using natural voice commands
- 🤖 **AI Chatbot** - Intelligent assistant powered by Google Gemini
- 🔐 **Google Authentication** - Secure Firebase Google OAuth integration
- 🎨 **Modern UI/UX** - Professional design with gradient themes and smooth animations
- 📱 **Fully Responsive** - Optimized for desktop, tablet, and mobile
- ⚡ **Real-time Updates** - Instant cart synchronization
- 🌐 **Professional Navigation** - Clean navbar with Home, About, Contact, Products
- 💳 **Smart Checkout** - Streamlined purchase flow

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern UI framework
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Web Speech API** - Browser-native voice recognition

### Backend
- **Node.js + Express** - RESTful API server
- **Google Gemini AI** - Natural language processing
- **Axios** - HTTP client

### Authentication & Database
- **Firebase Authentication** - Google OAuth
- **Firebase Config** - Secure credential management

### Design
- **Inter & Poppins Fonts** - Professional typography
- **Purple-Blue Gradient Theme** - Modern color scheme
- **Custom Animations** - Blob effects and smooth transitions

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Google Cloud account (for Gemini API)
- Firebase project (for authentication)

## 🛠️ Installation

### 1. Clone the Repository
```bash
git clone https://github.com/mygithubkg/voice-ecommerce.git
cd voice-ecommerce
```

### 2. Install Frontend Dependencies
```bash
npm install
```

### 3. Install Backend Dependencies
```bash
cd backend
npm install
cd ..
```

### 4. Configure Environment Variables

Create a `.env` file in the **root directory**:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Backend URL
VITE_BACKEND_URL=http://localhost:5000
```

Create a `.env` file in the **backend directory**:

```env
# Google Gemini API
GEMINI_API_KEY=your_google_gemini_api_key
PORT=5000
```

### 5. Get Your API Keys

#### Firebase Setup:
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing
3. Enable **Authentication** → **Google Sign-In**
4. Go to **Project Settings** → **General**
5. Scroll to "Your apps" and select Web app
6. Copy the config values to your `.env` file

#### Google Gemini API:
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create an API key
3. Copy to `backend/.env` as `GEMINI_API_KEY`

## 🏃 Running the Application

### Start Backend Server
```bash
cd backend
npm start
```
Server will run on `http://localhost:5000`

### Start Frontend (in a new terminal)
```bash
npm run dev
```
Frontend will run on `http://localhost:5173`

## 📱 Usage

### Voice Commands
1. Click the floating voice assistant button (bottom-right)
2. Click the microphone icon or type your command
3. Try commands like:
   - "Add 2 apples to cart"
   - "Remove 1 milk"
   - "Show me products"
   - "What's in my cart?"

### Authentication
1. Click "Sign In" in the navigation bar
2. Choose "Continue with Google"
3. Authorize with your Google account

### Shopping
1. Browse products on the Products page
2. Use voice or click to add items
3. View cart and checkout

## 🎨 Design Features

- **Modern Typography**: Inter for body, Poppins for headings
- **Color Theme**: Purple (#9333ea) to Blue (#3b82f6) gradients
- **Animations**: Blob animations, smooth transitions, hover effects
- **Professional Layout**: Clean navigation, hero sections, feature cards
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support

## 📁 Project Structure

```
voice-ecommerce/
├── backend/
│   ├── server.js          # Express server with Gemini AI
│   └── package.json
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Main navigation with auth
│   │   ├── ChatbotModal.jsx    # AI assistant modal
│   │   ├── ProductList.jsx     # Product grid
│   │   ├── VoiceCommand.jsx    # Voice recognition
│   │   └── Footer.jsx
│   ├── pages/
│   │   ├── LandingPage.jsx     # Hero landing page
│   │   ├── About.jsx           # About page
│   │   ├── Contact.jsx         # Contact form
│   │   ├── Products.jsx        # Product listing
│   │   ├── CartPage.jsx        # Shopping cart
│   │   └── Home.jsx
│   ├── context/
│   │   ├── AuthContext.jsx     # Firebase auth state
│   │   └── CartContext.jsx     # Cart management
│   ├── config/
│   │   └── firebase.js         # Firebase config
│   ├── App.jsx                 # Main app with routing
│   ├── main.jsx
│   └── index.css               # Global styles
├── .env.example
├── package.json
└── README.md
```

## 🌟 Key Features Explained

### Voice Command Processing
- Uses Web Speech API for voice capture
- Sends audio transcript to backend
- Google Gemini AI parses natural language
- Extracts product names, quantities, and actions
- Updates cart in real-time

### AI Chatbot
- Conversational interface
- Answers product questions
- Processes cart commands via text or voice
- Context-aware responses

### Firebase Authentication
- Google OAuth integration
- Persistent user sessions
- Protected routes
- User profile display

## 🐛 Troubleshooting

**Voice not working?**
- Ensure microphone permissions are granted
- Use HTTPS or localhost (required for Web Speech API)
- Check browser compatibility (Chrome recommended)

**Firebase errors?**
- Verify all Firebase config values in `.env`
- Ensure Google Auth is enabled in Firebase Console
- Check domain is authorized in Firebase settings

**Backend connection failed?**
- Confirm backend is running on port 5000
- Check `VITE_BACKEND_URL` in frontend `.env`
- Verify CORS settings in `server.js`

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build the app: `npm run build`
2. Deploy `dist` folder
3. Add environment variables in hosting platform

### Backend (Heroku/Railway)
1. Push backend folder to hosting service
2. Add `GEMINI_API_KEY` environment variable
3. Update `VITE_BACKEND_URL` in frontend

## 📄 License

MIT License - feel free to use for personal or commercial projects

## 👨‍💻 Developer

**Karrtik Gupta**
- Email: karrtikgupta9@gmail.com
- GitHub: [@mygithubkg](https://github.com/mygithubkg)

## 🙏 Acknowledgments

- Google Gemini AI for natural language processing
- Firebase for authentication infrastructure
- Tailwind CSS for styling system
- Framer Motion for animations

---

**Built with ❤️ and voice technology**

