# VoiceCart Chatbot - Voice & Gemini AI Integration Guide

## 🤖 Overview

The VoiceCart chatbot is a fully integrated AI assistant that combines:
- **Voice Recognition** (Web Speech API)
- **Gemini AI** (Google's language model)
- **Natural Language Processing** for cart management
- **Real-time conversational interface**

## 🎯 Features

### 1. Voice Commands
- **Speech-to-Text**: Uses browser's Web Speech API
- **Natural Language Processing**: Gemini AI understands natural commands
- **Cart Actions**: Add/remove products via voice
- **Hands-free Shopping**: Complete shopping without typing

### 2. AI Chatbot (Gemini-Powered)
- **Conversational AI**: Natural language understanding
- **Product Recommendations**: Smart suggestions
- **Website Assistance**: Help with navigation and features
- **Context-Aware**: Remembers conversation context

### 3. Unified Interface
- **Dark Theme**: Matches website aesthetic
- **Real-time Updates**: Instant cart updates
- **Visual Feedback**: Animations and status indicators
- **Mobile Responsive**: Works on all devices

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────┐
│           ChatbotModal Component                │
│  ┌────────────┐        ┌──────────────┐        │
│  │   Voice    │        │   Text       │        │
│  │   Input    │◄──────►│   Input      │        │
│  └────────────┘        └──────────────┘        │
│         │                      │                │
│         ▼                      ▼                │
│  ┌──────────────────────────────────┐          │
│  │    Voice Command Hook            │          │
│  │  (useVoiceCommand)               │          │
│  └──────────────────────────────────┘          │
│                    │                            │
└────────────────────┼────────────────────────────┘
                     │
                     ▼
        ┌────────────────────────┐
        │   Backend Server       │
        │   (Express.js)         │
        └────────────────────────┘
                     │
        ┌────────────┴────────────┐
        │                         │
        ▼                         ▼
┌──────────────┐         ┌──────────────┐
│ /voice-command│         │  /chatbot    │
│   Endpoint   │         │   Endpoint   │
└──────────────┘         └──────────────┘
        │                         │
        └──────────┬──────────────┘
                   ▼
        ┌────────────────────┐
        │   Gemini AI API    │
        │  (Google Gemini)   │
        └────────────────────┘
```

## 📁 File Structure

```
voice-ecommerce/
├── src/
│   ├── components/
│   │   ├── ChatbotModal.jsx      # Main chatbot UI
│   │   ├── VoiceCommand.jsx      # Voice recognition hook
│   │   └── ProductList.jsx       # Product data
│   └── context/
│       └── CartContext.jsx       # Cart state management
├── backend/
│   └── server.js                 # Express server + Gemini API
└── .env                          # Environment variables
```

## 🔧 Setup Instructions

### 1. Backend Setup

**Install Dependencies:**
```bash
cd backend
npm install express cors body-parser dotenv axios
```

**Configure Environment Variables:**
Create `.env` file in backend folder:
```bash
GEMINI_API_KEY=your_gemini_api_key_here
```

**Get Gemini API Key:**
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create new API key
3. Copy to `.env` file

**Start Backend Server:**
```bash
cd backend
node server.js
```
Server runs on `http://localhost:5000`

### 2. Frontend Setup

**Configure Backend URL:**
In `.env` file (root directory):
```bash
VITE_BACKEND_URL=http://localhost:5000
```

**Start Frontend:**
```bash
npm run dev
```

## 💬 How It Works

### Voice Command Flow

1. **User clicks microphone button**
   ```javascript
   startListening() → Web Speech API starts
   ```

2. **User speaks command**
   ```
   "Add 2 apples and 1 milk to cart"
   ```

3. **Speech recognized**
   ```javascript
   transcript = "Add 2 apples and 1 milk to cart"
   ```

4. **Sent to Gemini AI**
   ```javascript
   POST /voice-command
   {
     command: "Add 2 apples and 1 milk to cart"
   }
   ```

5. **Gemini extracts actions**
   ```json
   {
     "actions": [
       {"action": "add", "product": "apple", "quantity": 2},
       {"action": "add", "product": "milk", "quantity": 1}
     ]
   }
   ```

6. **Cart updated**
   ```javascript
   addToCart(apple, 2)
   addToCart(milk, 1)
   ```

### Chat Flow

1. **User types message**
   ```
   "What products do you have?"
   ```

2. **Sent to Gemini AI**
   ```javascript
   POST /chatbot
   {
     message: "What products do you have?"
   }
   ```

3. **Gemini generates response**
   ```
   "We have a wide variety of products including..."
   ```

4. **Response displayed in chat**
   ```javascript
   messages.push({
     from: "bot",
     text: "We have a wide variety..."
   })
   ```

## 🎨 UI Components

### ChatbotModal Features

**Header:**
- AI assistant branding
- "Powered by Gemini AI" badge
- Close button

**Message Area:**
- User messages (right, indigo-cyan gradient)
- Bot messages (left, dark slate background)
- Listening indicator (animated pulse)
- Error messages (red theme)
- Auto-scroll to latest message

**Input Area:**
- Voice button (microphone icon)
- Text input field
- Send button (paper plane icon)
- Disabled state when listening

**Voice Status Bar:**
- Shows when voice is active
- Animated sound wave visualization
- Status text

## 🎤 Voice Commands Examples

### Shopping Commands
```
"Add 2 apples to cart"
"Remove 1 banana"
"Add 3 oranges and 2 bottles of milk"
"I want 5 tomatoes and 1 cheese"
```

### Chat Commands
```
"What products do you sell?"
"How does voice shopping work?"
"Tell me about your fruits"
"What's in my cart?"
"Help me find dairy products"
```

## 🔌 API Endpoints

### POST /voice-command

**Request:**
```json
{
  "command": "Add 2 apples and 1 milk"
}
```

**Response:**
```json
{
  "actions": [
    {
      "action": "add",
      "product": "apple",
      "quantity": 2
    },
    {
      "action": "add",
      "product": "milk",
      "quantity": 1
    }
  ]
}
```

### POST /chatbot

**Request:**
```json
{
  "message": "What products do you have?"
}
```

**Response:**
```json
{
  "reply": "We offer a wide variety of products including fresh fruits, vegetables, dairy products, snacks, and beverages. You can browse our Products page or use voice commands to add items to your cart!"
}
```

## 🎨 Dark Theme Styling

All chatbot components use consistent dark theme:

**Colors:**
- Background: `slate-800`, `slate-900`
- Borders: `slate-700`
- Text: `white`, `slate-200`, `slate-300`
- Accents: `indigo-500` to `cyan-500` gradient
- Errors: `red-500/20` with `red-300` text
- Success: `green-500/20` with `green-300` text

**Animations:**
- Modal entrance: Slide up with fade
- Messages: Fade in
- Voice button: Pulse when active
- Send button: Scale on hover

## 🚀 Advanced Features

### 1. Intelligent Cart Detection
```javascript
// Automatically detects if message is cart action
const isCartAction = await processCartActions(input);
if (!isCartAction) {
  // Treat as general chat
  sendToChatbot(input);
}
```

### 2. Context Preservation
```javascript
// Maintains conversation history
const [messages, setMessages] = useState(initialMessages);
// All messages preserved for context
```

### 3. Error Handling
```javascript
// Graceful error handling at all levels
try {
  // API call
} catch (error) {
  setMessages([...messages, {
    from: "bot",
    text: "Sorry, something went wrong..."
  }]);
}
```

### 4. Real-time Cart Updates
```javascript
// Cart updates reflected immediately
addToCart(product, quantity);
setMessages([...messages, {
  from: "bot",
  text: `Added ${quantity} ${product}(s)`
}]);
```

## 🔒 Security Considerations

1. **API Key Protection**
   - Stored in `.env` file
   - Never exposed to frontend
   - Server-side only

2. **CORS Configuration**
   - Properly configured origins
   - Secure headers

3. **Input Validation**
   - Backend validates all inputs
   - Frontend sanitizes user input

4. **Rate Limiting** (Recommended)
   ```javascript
   // Add rate limiting middleware
   npm install express-rate-limit
   ```

## 📊 Performance Optimization

1. **Lazy Loading**
   - Modal only renders when open

2. **Debouncing**
   - Voice commands debounced

3. **Message Batching**
   - Cart actions batched together

4. **Auto-scroll**
   - Only scrolls on new messages

## 🐛 Troubleshooting

### Voice Not Working
- ✅ Check browser supports Web Speech API
- ✅ Grant microphone permissions
- ✅ Use HTTPS (required for mic access)
- ✅ Check if backend is running

### Gemini Not Responding
- ✅ Verify API key in `.env`
- ✅ Check backend server is running
- ✅ Verify `VITE_BACKEND_URL` is correct
- ✅ Check API quota/limits

### Cart Actions Not Working
- ✅ Check product names match ProductList
- ✅ Verify backend `/voice-command` endpoint
- ✅ Check console for errors

### Chat Not Working
- ✅ Verify backend `/chatbot` endpoint
- ✅ Check Gemini API key
- ✅ Ensure CORS is configured

## 🎯 Testing

### Test Voice Commands
```javascript
// Open chatbot
// Click microphone
// Say: "Add 2 apples to cart"
// Verify cart updates
```

### Test Chat
```javascript
// Open chatbot
// Type: "What products do you sell?"
// Verify Gemini response appears
```

### Test Cart Integration
```javascript
// Voice: "Add 2 bananas"
// Type: "Remove 1 banana"
// Check cart has 1 banana
```

## 📝 Code Examples

### Using Voice Command Hook
```javascript
const {
  listening,
  transcript,
  error,
  startListening,
  stopListening
} = useVoiceCommand({
  onAddToCart: (product, qty) => {
    // Handle add
  },
  onRemoveFromCart: (product, qty) => {
    // Handle remove
  }
});
```

### Sending Chat Message
```javascript
const response = await fetch(`${backendURL}/chatbot`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ message: userInput })
});
const data = await response.json();
console.log(data.reply); // Gemini response
```

## 🎉 Features Summary

✅ **Voice Recognition** - Web Speech API integration
✅ **Gemini AI** - Powered by Google's latest AI
✅ **Natural Language** - Understands conversational commands
✅ **Cart Management** - Add/remove products via voice
✅ **Dark Theme** - Modern, professional design
✅ **Real-time Updates** - Instant feedback
✅ **Error Handling** - Graceful error messages
✅ **Mobile Responsive** - Works on all devices
✅ **Conversation History** - Maintains context
✅ **Dual Input** - Voice + text input

## 🚀 Production Deployment

1. **Environment Variables**
   ```bash
   GEMINI_API_KEY=prod_api_key
   VITE_BACKEND_URL=https://api.yourdomain.com
   ```

2. **HTTPS Required**
   - Voice recognition requires HTTPS
   - Use SSL certificate

3. **CORS Configuration**
   ```javascript
   app.use(cors({
     origin: 'https://yourdomain.com'
   }));
   ```

4. **Rate Limiting**
   - Implement to prevent abuse
   - Protect Gemini API quota

---

**The chatbot is fully integrated with voice recognition and Gemini AI backend! 🎉**

All components work together seamlessly for an intelligent, voice-powered shopping experience.
