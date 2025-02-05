
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
- [Usage](#usage)
- [Modules](#modules)
- [Maintenance Mode](#maintenance-mode)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)

## 🎯 About
Enplex.js is a versatile JavaScript library designed to simplify and enhance web development. It provides a unified interface for interacting with various APIs and services, empowering developers to build robust and innovative applications.

## ⭐ Features
- **Modular Architecture**: Each functionality is encapsulated in its own module
- **Easy Integration**: Simple to integrate with existing projects
- **Comprehensive Tools**: From AI chat to Discord webhooks
- **Type Safety**: Built with reliability in mind
- **Maintenance Mode**: Built-in maintenance mode for each module

## 📦 Installation

```bash
npm install enplex.js@latest
```

## 🚀 Usage

```javascript
// CommonJS
const { NextChat, Search, Random } = require('enplex.js');

// ES Modules
import { NextChat, Search, Random } from 'enplex.js/esm';
```

## 📘 Modules

### NextChat
AI-powered chat functionality supporting multiple models:
- GPT-4
- Claude
- Gemini
- Llama models

```javascript
const response = await NextChat.ask("What is JavaScript?", { model: "gemini" });
```

### Search
Multi-platform search capabilities:
- YouTube
- Spotify
- GitHub

```javascript
const results = await Search.youtube("JavaScript tutorials");
```

### Validator
Input validation utilities:
```javascript
Validator.isEmail("user@example.com");    // true
Validator.isURL("https://example.com");   // true
```

### Logger
Advanced logging system:
```javascript
Logger.setLevel("DEBUG");
Logger.info("Application started");
```

### Rectify
Express-inspired web framework:
```javascript
const app = new Rectify();
app.get("/", (req, res) => res.send("Hello World"));
```

### Other Modules
- **DiscordWebHook**: Send Discord messages
- **Random**: Generate random content
- **Xio**: HTTP client
- **Executor**: Safe code execution
- **Queue**: Task queue management
- **EventEmitter**: Event handling
- **Collection**: Data structure utilities

## 🔧 Maintenance Mode
Check module availability:
```javascript
const Maintenance = require('enplex.js').Maintenance;
if (!Maintenance.isUnderMaintenance("NextChat")) {
  // Use NextChat module
}
```

## 📝 Examples

### AI Chat
```javascript
const { NextChat } = require('enplex.js');

async function chatExample() {
  const response = await NextChat.ask("What is the meaning of life?", {
    model: "gemini"
  });
  console.log(response);
}
```

### Discord Webhook
```javascript
const { DiscordWebHook } = require('enplex.js');

async function sendMessage() {
  const webhook = new DiscordWebHook("YOUR_WEBHOOK_URL");
  await webhook.send("Hello Discord!");
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
