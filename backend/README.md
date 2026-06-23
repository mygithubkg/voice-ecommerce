# 🔧 VoiceCart Backend API

Welcome to the backend server for VoiceCart! This is the brain behind the voice-powered shopping experience, handling AI-powered natural language processing and product management.

## 📚 Table of Contents
- [What Does This Backend Do?](#what-does-this-backend-do)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [How It Works](#how-it-works)
- [Environment Variables](#environment-variables)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)

---

## 🤔 What Does This Backend Do?

This backend server acts as a bridge between your voice commands and the shopping cart. When you speak commands like "add 2 apples to cart" or "remove bananas", this server:

1. **Receives** your spoken command from the frontend
2. **Understands** it using Google Gemini AI (artificial intelligence)
3. **Processes** the command to figure out what product and quantity you want
4. **Responds** with structured data (in JSON format) that the frontend can use

Think of it as a translator that converts human speech into actions the computer can perform!

---

## 🛠️ Technologies Used

### Core Technologies
- **Node.js** - JavaScript runtime that lets us run JavaScript on the server
- **Express.js** - Web framework that makes building APIs easy and fast
- **Google Gemini AI** - Advanced AI model that understands natural language

### Additional Libraries
- **dotenv** - Loads secret keys and configurations from `.env` file
- **cors** - Allows the frontend (running on a different port) to talk to this backend
- **body-parser** - Helps read JSON data sent from the frontend
- **axios** - Makes HTTP requests to the Google Gemini API

---

## 📁 Project Structure

```
backend/
├── server.js           # Main server file (the heart of the backend)
├── productlist.js      # Product catalog database (all available products)
├── test-rag.js         # Testing file to check if AI is working correctly
├── package.json        # Lists all dependencies and scripts
├── .env                # Secret keys (YOU NEED TO CREATE THIS!)
└── README.md           # This file you're reading
```

### File Descriptions

#### `server.js`
This is the **main file** that runs the server. It:
- Sets up the Express server on port 5000
- Creates API endpoints (URLs that the frontend can call)
- Communicates with Google Gemini AI
- Processes voice commands and returns responses

#### `productlist.js`
This file contains all the products available in your store:
- Product names, prices, descriptions, and images
- Category organization (Fruits, Vegetables, Dairy, etc.)
- Product aliases (different ways to refer to the same product)

#### `test-rag.js`
A testing script to verify that the AI is working correctly. Run this to test voice commands without starting the full server.

---

## 🚀 Getting Started

### Prerequisites
Before you begin, make sure you have:
- **Node.js** installed (version 16 or higher) - [Download here](https://nodejs.org/)
- A **Google Gemini API Key** - [Get one here](https://aistudio.google.com/app/apikey)
- A **code editor** like VS Code - [Download here](https://code.visualstudio.com/)

### Step 1: Install Dependencies

Open your terminal, navigate to the backend folder, and run:

```bash
cd backend
npm install
```

This downloads all the required libraries listed in `package.json`.

### Step 2: Create Environment File

Create a file named `.env` in the `backend` folder and add your Gemini API key:

```env
GEMINI_API_KEY=your_actual_api_key_here
PORT=5000
```

**Important**: Replace `your_actual_api_key_here` with your real API key from Google!

### Step 3: Start the Server

Run the server with:

```bash
npm start
```

Or for development (auto-restarts on file changes):

```bash
npm run dev
```

You should see:
```
✅ Server running on http://localhost:5000
🤖 Gemini API configured
```

---

## 🌐 API Endpoints

### 1. Get All Products
Retrieve the complete product catalog.

**Endpoint**: `GET /products`

**Example Request**:
```javascript
fetch('http://localhost:5000/products')
  .then(res => res.json())
  .then(data => console.log(data))
```

**Example Response**:
```json
{
  "success": true,
  "catalog": {
    "Fruits": [
      {
        "id": 1,
        "name": "Apple",
        "price": 1.99,
        "description": "Fresh red apples",
        "category": "Fruits",
        "image": "🍎",
        "aliases": ["apple", "apples", "red apple"]
      }
    ]
  },
  "totalProducts": 24
}
```

---

### 2. Process Voice Command
The main endpoint that processes natural language voice commands.

**Endpoint**: `POST /voice-command`

**Request Body**:
```json
{
  "command": "add 3 apples to my cart"
}
```

**Example Response (Add to Cart)**:
```json
{
  "intent": "add",
  "item": "Apple",
  "quantity": 3,
  "price": 1.99,
  "total": 5.97,
  "confidence": "high",
  "response": "Added 3 Apple(s) to your cart for $5.97"
}
```

**Example Response (Remove from Cart)**:
```json
{
  "intent": "remove",
  "item": "Banana",
  "quantity": 2,
  "response": "Removed 2 Banana(s) from your cart"
}
```

**Example Response (Question/Chat)**:
```json
{
  "intent": "chat",
  "response": "We have fresh apples available at $1.99 each. They are crisp and delicious!"
}
```

---

### 3. Cart Monitor
Receives live cart updates from the frontend for monitoring.

**Endpoint**: `POST /cart-monitor`

**Request Body**:
```json
{
  "cart": [
    { "id": 1, "name": "Apple", "quantity": 3 }
  ]
}
```

---

## 🧠 How It Works

### The Voice Command Flow

```
1. User speaks: "Add 2 bananas to cart"
   ↓
2. Frontend sends to backend: POST /voice-command
   ↓
3. Backend builds context with all available products
   ↓
4. Backend sends to Google Gemini AI with instructions
   ↓
5. Gemini AI understands the command and returns JSON
   ↓
6. Backend formats the response
   ↓
7. Backend sends JSON back to frontend
   ↓
8. Frontend updates the cart UI
```

### RAG (Retrieval-Augmented Generation)

The backend uses **RAG** to make the AI smarter:

1. **Retrieval**: First, it retrieves all available products from `productlist.js`
2. **Augmentation**: It adds this product list to the AI prompt
3. **Generation**: The AI generates a response based on actual available products

This ensures the AI only suggests products that actually exist in your store!

### Example AI Prompt

```
You are an intelligent shopping assistant AI with access to the product catalog.

AVAILABLE PRODUCTS IN OUR STORE:
- Apple ($1.99) [aliases: apple, apples, red apple]
- Banana ($0.99) [aliases: banana, bananas]
...

USER COMMAND: "add 2 apples"

Analyze this command and respond with JSON only...
```

---

## 🔐 Environment Variables

Create a `.env` file in the backend folder:

| Variable | Description | Example |
|----------|-------------|---------|
| `GEMINI_API_KEY` | Your Google Gemini API key (required) | `AIzaSyD...` |
| `PORT` | Port number for the server | `5000` |

---

## 🧪 Testing

### Test the AI Without Starting the Server

Run the test script:

```bash
npm test
```

This will test various voice commands like:
- "add 2 apples to cart"
- "remove 1 banana"
- "what fruits do you have?"

### Test with cURL

Once the server is running, test endpoints with cURL:

```bash
# Get all products
curl http://localhost:5000/products

# Test voice command
curl -X POST http://localhost:5000/voice-command \
  -H "Content-Type: application/json" \
  -d '{"command":"add 2 apples to cart"}'
```

### Test with Browser

Visit in your browser:
```
http://localhost:5000/products
```

---

## 🐛 Troubleshooting

### Server won't start?

**Error**: `Cannot find module 'express'`
- **Solution**: Run `npm install` in the backend folder

**Error**: `Missing GEMINI_API_KEY`
- **Solution**: Create a `.env` file with your API key

**Error**: `Port 5000 already in use`
- **Solution**: Change PORT in `.env` to another number (e.g., 5001)

### AI not responding correctly?

**Problem**: Getting generic responses
- **Solution**: Make sure your GEMINI_API_KEY is valid
- **Solution**: Check your internet connection

**Problem**: Products not recognized
- **Solution**: Check if the product exists in `productlist.js`
- **Solution**: Try using product aliases (e.g., "apples" instead of "apple")

### CORS Errors?

**Error**: `Access-Control-Allow-Origin`
- **Solution**: Make sure `cors()` is enabled in `server.js`
- **Solution**: Check that your frontend is using the correct backend URL

---

## 📖 Learning Resources

### Beginner Topics
- [What is an API?](https://www.freecodecamp.org/news/what-is-an-api-in-english-please-b880a3214a82/)
- [Understanding REST APIs](https://restfulapi.net/)
- [Intro to Express.js](https://expressjs.com/en/starter/hello-world.html)

### Intermediate Topics
- [What is RAG?](https://blogs.nvidia.com/blog/what-is-retrieval-augmented-generation/)
- [Environment Variables Explained](https://www.twilio.com/en-us/blog/environment-variables-node)
- [Async/Await in JavaScript](https://javascript.info/async-await)

### Advanced Topics
- [Google Gemini AI Documentation](https://ai.google.dev/docs)
- [Express Middleware](https://expressjs.com/en/guide/using-middleware.html)
- [Error Handling in Express](https://expressjs.com/en/guide/error-handling.html)

---

## 🎯 Key Concepts Explained

### What is JSON?
JSON (JavaScript Object Notation) is a way to structure data. Think of it like a recipe card:

```json
{
  "recipe": "Chocolate Cake",
  "ingredients": ["flour", "sugar", "chocolate"],
  "servings": 8
}
```

### What is an API Endpoint?
An endpoint is like a phone number. When you call it with specific information, you get a specific response back.

- `/products` → "Give me the product list"
- `/voice-command` → "Process this voice command"

### What is CORS?
CORS (Cross-Origin Resource Sharing) is like a security guard. It decides which websites can talk to your server. We enable it so our frontend can communicate with this backend.

---

## 💡 Tips for Beginners

1. **Start Simple**: Test endpoints one at a time using the browser or cURL
2. **Read Error Messages**: They usually tell you exactly what's wrong
3. **Use Console Logs**: Add `console.log()` statements to see what's happening
4. **Check the Network Tab**: In browser DevTools, watch requests and responses
5. **Test AI Separately**: Use `test-rag.js` before testing the full application

---

## 🤝 Contributing

Want to improve this backend? Here are some ideas:

- Add more products to `productlist.js`
- Improve AI prompts for better accuracy
- Add product search functionality
- Implement product categories filtering
- Add a database (MongoDB, PostgreSQL)
- Create user order history

---

## 📞 Need Help?

- Check the main project README
- Review the troubleshooting section above
- Test with `test-rag.js` to isolate issues
- Make sure your `.env` file is configured correctly

---

**Happy Coding! 🚀**

*Remember: Every expert was once a beginner. Take your time, experiment, and don't be afraid to break things – that's how you learn!*
