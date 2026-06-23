# 🎨 VoiceCart Frontend

Welcome to the frontend of VoiceCart! This is the visual interface users interact with – the website, buttons, shopping cart, and voice interface you see in your browser.

## 📚 Table of Contents
- [What is the Frontend?](#what-is-the-frontend)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Key Features](#key-features)
- [Components Explained](#components-explained)
- [Pages Overview](#pages-overview)
- [Styling & Design](#styling--design)
- [Configuration](#configuration)
- [Common Tasks](#common-tasks)
- [Troubleshooting](#troubleshooting)

---

## 🤔 What is the Frontend?

The frontend is everything users see and interact with in their web browser:
- The beautiful product catalog
- The shopping cart
- Voice command interface
- AI chatbot
- Navigation menus
- Checkout process

Think of it as the "face" of your application – while the backend is the "brain"!

---

## 🛠️ Technologies Used

### Core Framework
- **React 19** - A JavaScript library for building user interfaces
  - Makes it easy to build reusable components (like LEGO blocks)
  - Efficiently updates only what changes on the page
  - Uses JSX (HTML-like syntax in JavaScript)

### Routing
- **React Router v7** - Handles navigation between pages
  - `/` → Landing page
  - `/products` → Product list
  - `/cart` → Shopping cart

### Styling
- **Tailwind CSS v4** - Utility-first CSS framework
  - Write styles directly in your HTML/JSX
  - Example: `className="bg-blue-500 text-white p-4"`
  - Responsive design made easy

### Animation
- **Framer Motion** - Smooth animations and transitions
  - Fade-ins, slide-ins, hover effects
  - Makes the UI feel polished and professional

### Authentication
- **Firebase Authentication** - Google OAuth integration
  - Secure user login with Google accounts
  - No need to manage passwords yourself

### AI/Voice
- **Web Speech API** - Browser's built-in voice recognition
- **jsPDF** - Generate PDF invoices

---

## 📁 Project Structure

```
src/
├── App.jsx                    # Main app component (entry point)
├── main.jsx                   # React app initialization
├── index.css                  # Global styles
├── App.css                    # App-specific styles
├── responsive.css             # Mobile/tablet styles
│
├── components/                # Reusable UI components
│   ├── Navbar.jsx            # Top navigation bar
│   ├── Footer.jsx            # Bottom footer
│   ├── Header.jsx            # Page headers
│   ├── ProductList.jsx       # Product grid display
│   ├── VoiceCommand.jsx      # Voice input handler
│   ├── VoiceHandler.jsx      # Voice processing logic
│   ├── VoiceIntegration.jsx  # Voice integration utilities
│   ├── ChatbotModal.jsx      # AI chat interface
│   ├── InvoiceGenerator.jsx  # PDF invoice component
│   ├── Icons.jsx             # Custom icon components
│   ├── PageContainer.jsx     # Layout wrapper
│   └── ScrollToTop.jsx       # Auto-scroll to top on navigation
│
├── pages/                     # Full page components
│   ├── LandingPage.jsx       # Home page (/)
│   ├── Home.jsx              # Main dashboard
│   ├── Products.jsx          # Product catalog
│   ├── CartPage.jsx          # Shopping cart
│   ├── About.jsx             # About page
│   ├── Contact.jsx           # Contact form
│   ├── FAQ.jsx               # FAQs
│   ├── Profile.jsx           # User profile
│   ├── Settings.jsx          # User settings
│   └── sections/             # Page sections
│       ├── Hero.jsx          # Hero section
│       ├── Story.jsx         # Story section
│       ├── TechStack.jsx     # Tech stack showcase
│       ├── ValuesSection.jsx # Company values
│       └── CTA.jsx           # Call-to-action
│
├── context/                   # State management
│   ├── CartContext.jsx       # Shopping cart state
│   └── AuthContext.jsx       # User authentication state
│
├── config/                    # Configuration files
│   └── firebase.js           # Firebase setup
│
├── data/                      # Static data
│   └── productlist.js        # Product catalog (frontend copy)
│
├── utils/                     # Helper functions
│   └── InvoiceGenerator.js   # Invoice creation logic
│
└── assets/                    # Images, icons, etc.
    └── itemIcons.jsx         # Product icon components
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (version 16+) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** (optional) - [Download here](https://git-scm.com/)
- A modern web browser (Chrome, Firefox, Edge)

### Step 1: Install Dependencies

From the project root directory:

```bash
npm install
```

This installs all the packages listed in `package.json`.

### Step 2: Configure Environment Variables

Create a `.env` file in the **root directory** (not in `src/`):

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef

# Backend API URL
VITE_BACKEND_URL=http://localhost:5000
```

**Note**: All environment variables must start with `VITE_` to be accessible in the frontend!

### Step 3: Start the Development Server

```bash
npm run dev
```

This starts the Vite development server. You should see:
```
  VITE v6.3.5  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.1.100:5173/
```

Open `http://localhost:5173/` in your browser!

---

## ✨ Key Features

### 1. 🎤 Voice Shopping
Users can add/remove items using voice commands:
- "Add 3 apples to cart"
- "Remove bananas"
- "What's in my cart?"

**Files Involved**:
- [components/VoiceCommand.jsx](components/VoiceCommand.jsx)
- [components/VoiceHandler.jsx](components/VoiceHandler.jsx)

### 2. 🤖 AI Chatbot
Floating chatbot that answers questions about products:
- "What fruits do you have?"
- "Tell me about organic products"

**Files Involved**:
- [components/ChatbotModal.jsx](components/ChatbotModal.jsx)

### 3. 🔐 Google Authentication
Secure login using Firebase:
- Click "Sign in with Google"
- Instant authentication
- Profile management

**Files Involved**:
- [config/firebase.js](config/firebase.js)
- [context/AuthContext.jsx](context/AuthContext.jsx)

### 4. 🛒 Shopping Cart
Real-time cart management:
- Add/remove products
- Adjust quantities
- Calculate totals
- Generate invoices

**Files Involved**:
- [context/CartContext.jsx](context/CartContext.jsx)
- [pages/CartPage.jsx](pages/CartPage.jsx)

### 5. 📱 Responsive Design
Works perfectly on:
- Desktop computers
- Tablets
- Mobile phones

**Files Involved**:
- [responsive.css](responsive.css)
- Tailwind's built-in responsive utilities

---

## 🧩 Components Explained

### Core Components

#### Navbar.jsx
The top navigation bar with links to all pages.

```jsx
<Navbar />
// Renders: Home | Products | Cart | About | Contact
```

**Key Features**:
- Responsive mobile menu
- Cart item count badge
- User authentication status
- Active page highlighting

---

#### VoiceCommand.jsx
Handles voice input from users.

```jsx
<VoiceCommand 
  onAddToCart={addToCart}
  onRemoveFromCart={removeFromCart}
/>
```

**How It Works**:
1. User clicks microphone button
2. Browser asks for microphone permission
3. User speaks command
4. Component captures audio
5. Converts speech to text
6. Sends to backend for processing
7. Updates cart based on response

---

#### ProductList.jsx
Displays all products in a grid layout.

```jsx
<ProductList 
  products={products}
  onAddToCart={handleAddToCart}
/>
```

**Features**:
- Grid layout (3-4 columns on desktop)
- Product cards with image, name, price
- "Add to Cart" buttons
- Category filtering

---

#### ChatbotModal.jsx
AI-powered chat interface.

```jsx
<ChatbotModal 
  open={isOpen}
  onClose={() => setIsOpen(false)}
/>
```

**Features**:
- Floating button (bottom-right)
- Message history
- Typing indicators
- Product recommendations

---

### Layout Components

#### PageContainer.jsx
Wraps page content with consistent padding and max-width.

```jsx
<PageContainer>
  <YourContent />
</PageContainer>

// Or full-width:
<PageContainer fullWidth>
  <YourContent />
</PageContainer>
```

#### Footer.jsx
Bottom footer with links and copyright info.

```jsx
<Footer />
```

#### ScrollToTop.jsx
Automatically scrolls to top when navigating to a new page.

```jsx
<ScrollToTop />
```

---

## 📄 Pages Overview

### LandingPage.jsx (`/`)
The first page users see.

**Sections**:
- Hero section with animated gradient
- Feature highlights
- Tech stack showcase
- Company values
- Call-to-action

---

### Products.jsx (`/products`)
Product catalog page.

**Features**:
- Search bar
- Category filters
- Product grid
- Quick "Add to Cart" buttons

---

### CartPage.jsx (`/cart`)
Shopping cart and checkout.

**Features**:
- Cart items list
- Quantity adjusters
- Remove items
- Subtotal/total calculation
- Checkout button
- Invoice generator

---

### Profile.jsx (`/profile`)
User profile page (requires login).

**Displays**:
- User name
- Email address
- Profile picture
- Order history (future feature)

---

## 🎨 Styling & Design

### Design System

**Colors**:
- Primary: Purple (`#9333EA`)
- Secondary: Blue (`#3B82F6`)
- Background: Dark Slate (`#0F172A`)
- Text: White/Gray

**Gradients**:
```css
bg-gradient-to-r from-purple-600 to-blue-600
```

**Typography**:
- Headings: Poppins (bold, modern)
- Body: Inter (clean, readable)

### Tailwind CSS Cheat Sheet

```jsx
// Spacing
p-4          // padding: 1rem (16px)
mt-8         // margin-top: 2rem (32px)
gap-4        // gap: 1rem

// Colors
bg-blue-500  // blue background
text-white   // white text
border-gray-300

// Layout
flex         // display: flex
grid         // display: grid
hidden       // display: none

// Responsive
sm:flex      // flex on small screens+
md:grid-cols-3  // 3 columns on medium screens+
lg:text-xl   // larger text on large screens+
```

### Custom Animations

Defined in [App.css](App.css):

```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.fade-in {
  animation: fadeIn 0.5s ease-in;
}
```

---

## ⚙️ Configuration

### Firebase Setup

Edit [config/firebase.js](config/firebase.js):

```javascript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  // ... other config
};
```

### Backend URL

The frontend talks to the backend at:
```javascript
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
```

Change this in `.env` if your backend runs on a different port.

---

## 🔧 Common Tasks

### Adding a New Page

1. Create a new file in `src/pages/`:

```jsx
// src/pages/MyNewPage.jsx
import React from 'react';

function MyNewPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <h1 className="text-4xl font-bold">My New Page</h1>
      <p>This is my new page!</p>
    </div>
  );
}

export default MyNewPage;
```

2. Add a route in [App.jsx](App.jsx):

```jsx
import MyNewPage from './pages/MyNewPage';

// Inside <Routes>:
<Route path="/my-new-page" element={<PageContainer><MyNewPage /></PageContainer>} />
```

3. Add a link in [components/Navbar.jsx](components/Navbar.jsx):

```jsx
<Link to="/my-new-page">My New Page</Link>
```

---

### Adding a New Product

Edit [data/productlist.js](data/productlist.js):

```javascript
export const PRODUCT_CATALOG = {
  Fruits: [
    // ... existing products
    {
      id: 25, // Use next available ID
      name: "Pineapple",
      price: 3.99,
      description: "Sweet tropical pineapple",
      category: "Fruits",
      image: "🍍",
      aliases: ["pineapple", "pineapples"]
    }
  ]
};
```

**Important**: Also update the backend's `productlist.js`!

---

### Customizing Styles

#### Option 1: Inline Tailwind Classes
```jsx
<div className="bg-purple-600 text-white p-4 rounded-lg">
  My styled div
</div>
```

#### Option 2: Custom CSS
Add to [App.css](App.css):

```css
.my-custom-class {
  background: linear-gradient(to right, purple, blue);
  padding: 20px;
  border-radius: 10px;
}
```

Use in component:
```jsx
<div className="my-custom-class">
  My styled div
</div>
```

---

### Testing Voice Commands Locally

1. Make sure backend is running (`npm start` in backend folder)
2. Open browser DevTools (F12)
3. Go to Console tab
4. Try voice commands and watch for errors
5. Check Network tab to see API requests

---

## 🐛 Troubleshooting

### App Won't Start

**Error**: `Cannot find module 'react'`
- **Solution**: Run `npm install`

**Error**: `Port 5173 already in use`
- **Solution**: Kill the process or use a different port:
  ```bash
  npm run dev -- --port 3000
  ```

---

### Voice Not Working

**Problem**: Microphone permission denied
- **Solution**: Allow microphone access in browser settings

**Problem**: Voice commands not processed
- **Solution**: Make sure backend is running on port 5000
- **Solution**: Check `VITE_BACKEND_URL` in `.env`

**Problem**: Speech recognition not starting
- **Solution**: Use Chrome or Edge (best compatibility)
- **Solution**: Check browser console for errors

---

### Firebase Authentication Errors

**Error**: `Firebase configuration invalid`
- **Solution**: Check all `VITE_FIREBASE_*` variables in `.env`
- **Solution**: Verify values match Firebase Console

**Error**: `Google sign-in not working`
- **Solution**: Enable Google authentication in Firebase Console
- **Solution**: Add your domain to authorized domains

---

### Styling Issues

**Problem**: Tailwind classes not working
- **Solution**: Check `tailwind.config.js` exists
- **Solution**: Restart dev server (`npm run dev`)

**Problem**: Styles look broken on mobile
- **Solution**: Check [responsive.css](responsive.css)
- **Solution**: Use responsive prefixes: `sm:`, `md:`, `lg:`

---

### Cart Not Updating

**Problem**: Items not added to cart
- **Solution**: Check [context/CartContext.jsx](context/CartContext.jsx)
- **Solution**: Verify `CartProvider` wraps `App` in [main.jsx](main.jsx)

**Problem**: Cart resets on page refresh
- **Solution**: Cart is stored in memory (resets are normal)
- **Future**: Implement localStorage or database persistence

---

## 📖 Learning Resources

### React Basics
- [React Official Tutorial](https://react.dev/learn)
- [React for Beginners](https://reactforbeginners.com/)
- [JSX Explained](https://react.dev/learn/writing-markup-with-jsx)

### Tailwind CSS
- [Tailwind Documentation](https://tailwindcss.com/docs)
- [Tailwind Cheat Sheet](https://tailwindcomponents.com/cheatsheet/)
- [Responsive Design](https://tailwindcss.com/docs/responsive-design)

### React Router
- [React Router Tutorial](https://reactrouter.com/en/main/start/tutorial)
- [Navigation Guide](https://reactrouter.com/en/main/components/link)

### Firebase
- [Firebase Authentication](https://firebase.google.com/docs/auth/web/start)
- [Firebase Setup Guide](https://firebase.google.com/docs/web/setup)

---

## 💡 Key Concepts for Beginners

### What is a Component?
A component is a reusable piece of UI. Think of it like a function that returns HTML:

```jsx
function Button() {
  return <button>Click Me</button>;
}

// Use it anywhere:
<Button />
```

### What is State?
State is data that can change over time:

```jsx
const [count, setCount] = useState(0);

// count = current value (0)
// setCount = function to update it

<button onClick={() => setCount(count + 1)}>
  Clicked {count} times
</button>
```

### What is Context?
Context lets you share data across components without passing props manually:

```jsx
// CartContext provides cart data
// Any component can access it
const { cart, addToCart } = useCart();
```

### What is JSX?
JSX looks like HTML but it's actually JavaScript:

```jsx
const name = "John";
return <h1>Hello, {name}!</h1>;
// Renders: <h1>Hello, John!</h1>
```

---

## 🎯 Project Architecture

```
User Browser
     ↓
  App.jsx (Main Component)
     ↓
  ├── AuthContext (Authentication)
  ├── CartContext (Shopping Cart)
  ↓
  Routes (React Router)
     ↓
  ├── / → LandingPage
  ├── /products → Products
  ├── /cart → CartPage
  ├── /about → About
  └── /contact → Contact
     ↓
  Components (Navbar, Footer, etc.)
     ↓
  Backend API (localhost:5000)
     ↓
  Google Gemini AI
```

---

## 🚀 Building for Production

When ready to deploy:

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### Deployment Options
- **Vercel** - Automatic deployment (recommended)
- **Netlify** - Easy static hosting
- **GitHub Pages** - Free hosting for static sites

---

## 🤝 Contributing

Want to improve the frontend? Ideas:

- Add dark/light mode toggle
- Implement product search
- Add product reviews/ratings
- Create wish list feature
- Add order history
- Improve mobile navigation
- Add animations with Framer Motion

---

## 📞 Need Help?

- Check the browser console (F12) for errors
- Review the troubleshooting section
- Make sure backend is running
- Verify `.env` configuration
- Test in Chrome/Edge (best browser support)

---

**Happy Building! 🎨**

*Remember: The best way to learn is by doing. Don't be afraid to modify code, break things, and rebuild. That's how you become a great developer!*
