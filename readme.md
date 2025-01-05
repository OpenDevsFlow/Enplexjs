<p align = "center">
   
![Screenshot 2024-12-24 205609](https://github.com/user-attachments/assets/415145ab-18f3-4da2-8298-80b6fde96db3)
</p>

<h1 align = "center">
Enplex.js: A Comprehensive JavaScript Toolkit
</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/enplex.js">
    <img src="https://img.shields.io/badge/npm-package-red.svg">
  </a>
</p>

## 💻 About:

Enplex.js is a versatile JavaScript library designed to simplify and enhance web development. It provides a unified interface for interacting with various APIs and services, empowering developers to build robust and innovative applications.

## ⭐ Key Features:

* **NextChat:** 
   - Seamless integration with advanced AI models for generating text, images, and upscaling image.
   - Supports a wide range of models, including GPT-4, Claude, and various Llama models.
   - No need for individual API keys.
* **Search:** 
   - Effortless searching across popular platforms like YouTube, Spotify, and GitHub.
* **Random:** 
   - Access to a variety of random content, including cat facts, dog facts, quotes, and anime-related images.
* **DiscordWH:** 
   - Send customized Discord webhook messages with embeds and attachments.
* **Rectify:** 
   - A minimalist framework for building web applications inspired by Express.js.
   - Features include routing, middleware, error handling, and static file serving.
* **Xio:** 
   - A powerful HTTP client for making requests with ease, supporting various HTTP methods, custom headers, timeouts, and retry mechanisms.
* **Executor:** 
   - Safely execute JavaScript code within your applications.
* **Import:** 
   - Import ES modules in CommonJS files.
   - Import CommonJS modules in ESM files.

## ⚡ Installation:

```bash
npm install enplex.js@latest
```

## Usage Example:

```js
const { NextChat } = require("enplex.js");

(async () => {
  const response = await NextChat.ask("What is the meaning of life?", { model: "gemini" });
  console.log(response);
})();
```

**For more in-depth usage and advanced features, join our community on Discord.**

[![Iscordian Community Banner](https://api.weblutions.com/discord/invite/a2c3QTWkuk)](https://discord.gg/a2c3QTWkuk)

