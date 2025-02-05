
<h1 align="center">
Enplex.js: A Comprehensive JavaScript Toolkit
</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/enplex.js">
    <img src="https://img.shields.io/badge/npm-package-red.svg">
  </a>
  <a href="https://replit.com/@OpenDevsFlow/Enplexjs">
    <img src="https://img.shields.io/badge/replit-fork_me-blue.svg">
  </a>
  <a href="https://github.com/OpenDevsFlow/Enplexjs/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/license-Apache_2.0-green.svg">
  </a>
</p>

## 📚 Table of Contents
- [About](#about)
- [Features](#features)
- [Installation](#installation)
- [Core Modules](#core-modules)
- [Advanced Usage](#advanced-usage)
- [Error Handling](#error-handling)
- [Maintenance Mode](#maintenance-mode)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)

## 🎯 About
Enplex.js is a versatile JavaScript library designed to simplify and enhance web development. It provides a unified interface for interacting with various APIs and services, empowering developers to build robust and innovative applications.

## ⭐ Features
- **AI Integration**: Chat, image generation, and TTS capabilities
- **Web Framework**: Built-in Express-like web server
- **Search APIs**: YouTube, Spotify, and GitHub integration
- **Discord Tools**: Webhook and embed builder
- **HTTP Client**: Advanced request handling with retries
- **Utilities**: Validation, logging, and collections
- **Event System**: Built-in event emitter
- **Queue Management**: Task queue processing
- **Code Execution**: Safe code evaluation

## 📦 Installation

```bash
npm install enplex.js@latest
```

## 🚀 Core Modules

### NextChat - AI Integration
<details>
<summary>View NextChat Features</summary>

#### Text Generation
```javascript
const { NextChat } = require('enplex.js');

// Basic usage
const response = await NextChat.ask("What is JavaScript?", {
  model: "gemini",
  cache: true
});

// Available models
const models = [
  "gpt4o", "gemini", "llama-vision", 
  "gemma2-9b", "gemma-7b", "groq-70b",
  "groq-8b", "llama3-70b", "llama3-8b",
  "llama3-1b", "llama3-3b", "llama3-11b",
  "llama3-90b", "llama-guard"
];
```

#### Image Generation
```javascript
// Generate image
const image = await NextChat.imagine("sunset over mountains", {
  model: "prodia"
});

// Available models
const imgModels = ["animagen", "prodia", "mageai", "xl3"];
```

#### Text-to-Speech
```javascript
// Convert text to speech
const audio = await NextChat.tts("Hello World");

// Upscale images
const upscaled = await NextChat.upscale(imageUrl);
```

</details>

### Search - Multi-Platform Search
<details>
<summary>View Search Features</summary>

```javascript
const { Search } = require('enplex.js');

// YouTube Search
const videos = await Search.yt("coding tutorials");

// GitHub Repositories
const repos = await Search.github("javascript libraries");

// Pinterest Images
const pins = await Search.pin("web design inspiration");

// Pexels Photos
const photos = await Search.pexels("nature");

// Wallpapers
const wallpapers = await Search.wallpaper("abstract");

// Anime Wallpapers
const animeWalls = await Search.animeWallpaper("naruto");
```

Each search method returns a JSON response with relevant results from the respective platform.
</details>

### Rectify - Web Framework
```javascript
const { Rectify } = require('enplex.js');

const app = new Rectify();

// Middleware
app.use(Rectify.bodyParser);
app.use(Rectify.cors);

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.listen(3000);
```

### DiscordWebHook - Discord Integration
```javascript
const { DiscordWebHook } = require('enplex.js');

const webhook = new DiscordWebHook({
  id: "WEBHOOK_ID",
  token: "WEBHOOK_TOKEN"
});

// Send Message
await webhook.send("Hello Discord!");

// Send Embed
const embed = await DiscordWebHook.createEmbed({
  title: "Hello",
  description: "This is an embed"
});
await webhook.send({ embeds: [embed] });
```

## 🔧 Advanced Usage

### Collection Management
```javascript
const { Collection } = require('enplex.js');

const collection = new Collection();
collection.set('key', 'value');

// Advanced Methods
const filtered = collection.filter(item => item.includes('value'));
const mapped = collection.map(item => item.toUpperCase());
const random = collection.random();
```

### Validation
```javascript
const { Validator } = require('enplex.js');

Validator.isEmail("user@example.com");     // true
Validator.isURL("https://example.com");    // true
Validator.isJSON('{"key": "value"}');      // true
```

### HTTP Client (Xio)
```javascript
const { Xio } = require('enplex.js');

const response = await Xio.request("https://api.example.com", {
  method: "POST",
  body: { key: "value" },
  retry: {
    maxAttempts: 3,
    delay: 1000
  }
});
```

## ❌ Error Handling
<details>
<summary>View Error Handling Examples</summary>

#### Basic Error Handling
```javascript
try {
  const response = await NextChat.ask("Question");
} catch (error) {
  Logger.error(`AI Error: ${error.message}`);
}
```

#### Validation Errors
```javascript
// Handle empty inputs
try {
  await NextChat.ask("");
} catch (error) {
  // Throws: "NextChat Error: Empty prompt"
}

// Handle invalid models
try {
  await NextChat.ask("Hello", { model: "invalid" });
} catch (error) {
  // Throws: "NextChat Error: Invalid model"
}
```

#### Network Errors
```javascript
try {
  await NextChat.imagine("prompt", { timeout: 5000 });
} catch (error) {
  // Handle timeout or network errors
  Logger.error(`Network Error: ${error.message}`);
}
```
</details>

## 🔄 Maintenance Mode
```javascript
const Maintenance = require('enplex.js').Maintenance;

// Check module status
if (!Maintenance.isUnderMaintenance("NextChat")) {
  // Use NextChat
}
```

## 📝 Examples

### Full Web Server Example
```javascript
const { Rectify, Logger } = require('enplex.js');

const app = new Rectify();

// Middleware
app.use(Rectify.bodyParser);
app.use(Rectify.cors);
app.use(Rectify.compression);

// Routes
app.get("/", (req, res) => res.send("Welcome"));
app.post("/api/data", (req, res) => res.json(req.body));

// Error Handler
app.useErrorHandler((error, req, res) => {
  Logger.error(error.message);
  res.status(500).json({ error: "Server Error" });
});

app.listen(3000, () => {
  Logger.info("Server running on port 3000");
});
```

### AI Chat with Image Generation
```javascript
const { NextChat, Logger } = require('enplex.js');

async function generateContent() {
  try {
    // Generate text
    const text = await NextChat.ask("Describe a mountain landscape");
    
    // Generate matching image
    const image = await NextChat.imagine(text);
    
    return { text, image };
  } catch (error) {
    Logger.error(`Generation failed: ${error.message}`);
    throw error;
  }
}
```

## 🤝 Contributing
1. Fork the project on Replit
2. Create your feature branch
3. Commit your changes
4. Push to your fork
5. Open a Pull Request

## 📄 License
This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

---
Made with ❤️ by the Enplex.js Team
