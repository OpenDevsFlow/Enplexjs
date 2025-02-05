
<h1 align="center">
Enplex.js: A Comprehensive JavaScript Toolkit
</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/enplex.js">
    <img src="https://img.shields.io/badge/npm-package-red.svg">
  </a>
  <a href="https://github.com/OpenDevsFlow/Enplexjs">
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
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)

## 🎯 About
Enplex.js is a versatile JavaScript library designed to simplify and enhance web development. It provides a unified interface for interacting with various APIs and services, empowering developers to build robust and innovative applications.

## ⭐ Features
- **AI Integration**: Chat, image generation, and TTS capabilities - **Under Maintenance**
- **Web Framework**: Built-in Express-like web server
- **Search APIs**: YouTube, Spotify, and GitHub integration - **Under Maintenance**
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

### NextChat - AI Integration - Under Maintenance!!

```javascript
const { NextChat } = require('enplex.js');

// Text Generation Example
const response = await NextChat.ask("What can you tell me about JavaScript?", {
  model: "gemini",
  cache: true
});
console.log(response);

// Image Generation Example
const image = await NextChat.imagine("A beautiful sunset over mountains", {
  model: "prodia"
});
console.log(image);

// Text-to-Speech Example
const audio = await NextChat.tts("Welcome to Enplex.js!");
console.log(audio);

// Image Upscaling Example
const upscaled = await NextChat.upscale("https://example.com/image.jpg");
console.log(upscaled);
```

<details>
<summary>View All NextChat Features</summary>

<<<<<<< HEAD
### Text Generation
- Supports multiple AI models:
  - GPT-4 (`gpt4o`)
  - Google Gemini (`gemini`)
  - Llama Vision (`llama-vision`)
  - Gemma 2 9B (`gemma2-9b`)
  - Gemma 7B (`gemma-7b`)
  - Groq Models (`groq-70b`, `groq-8b`)
  - Llama3 Models (`llama3-70b`, `llama3-8b`, `llama3-1b`, `llama3-3b`, `llama3-11b`, `llama3-90b`)
  - Llama Guard (`llama-guard`)
=======
[![ODF Banner](https://api.weblutions.com/discord/invite/a2c3QTWkuk)](https://discord.gg/a2c3QTWkuk)
>>>>>>> 4373eec0e4890a1e9409965d28881c518f952eb9

### Image Generation
- Multiple Image Models:
  - Animagen: Specialized in anime-style images
  - Prodia: General purpose image generation
  - Mage AI: Advanced image synthesis
  - XL3: High-quality image generation

### Text-to-Speech
- Features:
  - Natural voice synthesis
  - Support for multiple languages
  - Adjustable speech parameters
  - Returns base64 encoded audio

### Image Upscaling
- Capabilities:
  - 4x upscaling
  - Quality enhancement
  - Noise reduction
  - Detail preservation

### Advanced Features
- Built-in caching system
  - 1-hour cache duration
  - Automatic cache cleanup
  - Memory-efficient storage
- Error handling
  - Timeout protection (30s)
  - Invalid input validation
  - API error handling
- Performance optimizations
  - Parallel processing
  - Resource management
  - Memory efficient

```javascript
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

### Search - Multi-Platform Search - Under Maintenance

```javascript
const { Search } = require('enplex.js');

// YouTube Search Example
const videos = await Search.yt("programming tutorials");
console.log(videos);

// GitHub Search Example
const repos = await Search.github("javascript libraries");
console.log(repos);

// Pinterest Search Example
const pins = await Search.pin("web design inspiration");
console.log(pins);

// Combined Search Example
async function searchAllPlatforms(query) {
  const [videos, repos, images] = await Promise.all([
    Search.yt(query),
    Search.github(query),
    Search.pin(query)
  ]);
  return { videos, repos, images };
}
```

<details>
<summary>View All Search Features</summary>

### YouTube Search
- Features:
  - Video search with metadata
  - Channel information
  - View counts and ratings
  - Video duration
  - Thumbnail URLs

### GitHub Search
- Capabilities:
  - Repository search
  - Code search
  - User profiles
  - Star counts
  - Language statistics

### Pinterest Search
- Features:
  - Image search
  - Board discovery
  - Pin metadata
  - Creator information
  - Related pins

### Pexels Search
- Features:
  - High-quality stock photos
  - Photographer credits
  - Image dimensions
  - Download URLs
  - License information

### Wallpaper Search
- Capabilities:
  - HD wallpapers
  - Multiple resolutions
  - Categories
  - Author information
  - Download links

### Anime Wallpaper Search
- Features:
  - Anime-specific wallpapers
  - Character tags
  - Series information
  - Resolution options
  - Artist credits

### Common Features
- Rate limiting protection
- Error handling
- Response caching
- JSON formatted responses
- Pagination support

```javascript
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
1. Fork the project on GitHub
2. Create your feature branch
3. Commit your changes
4. Push to your fork
5. Open a Pull Request

## 📄 License
This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

---
Made with ❤️ by the [OpenDevsFlow](https://discord.gg/6UGYjhSS5v) Team
