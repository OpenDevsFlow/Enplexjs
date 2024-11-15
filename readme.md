**Enplex.js: A Versatile JavaScript Library**

*Enplex.js is a comprehensive JavaScript library designed to streamline various development tasks. By providing a unified interface for multiple APIs and services, Enplex.js empowers developers to build innovative solutions efficiently.*

**Key Features:**

1. **NextChat:**
   - Seamlessly interact with advanced AI models like GPT-4 and Claude.
   - Generate text, images, and analyze image content without the need for API keys.
   - Supported models include: gemini, gemini-pro, gpt4, gpt4o, claude-sonnet, claude-haiku, flux, and flux-pro.

2. **Search:**
   - Effortlessly search across popular platforms:
     - YouTube
     - Spotify
     - GitHub
   - Retrieve additional content:
     - Cat facts
     - Dog facts
     - Quotes
     - Waifu images

3. **DiscordWH:**
   - Send Discord webhook messages with customizable embeds and attachments.
   - Note: This feature may require additional setup or configuration.

4. **Rectify:**
   - Build web applications with a minimalist and efficient Express.js-inspired framework.
   - Enjoy a streamlined development experience with features like routing, middleware, error handling, and static file serving.

5. **Xio:**
   - Make HTTP requests with ease, supporting:
     - GET, POST, and other HTTP methods
     - Custom headers and timeouts
     - Retry mechanisms for unreliable APIs

**Installation:**

```bash
npm install enplex.js
```

**Usage Examples:**

```javascript
// NextChat
const { nextchat } = require("enplex.js");

(async () => {
  const response = await nextchat.ask("What is the meaning of life?", { model: "gpt4" });
  console.log(response);
})();

// Search
const { Search } = require("enplex.js");

(async () => {
  const youtubeResults = await Search.yt("JavaScript tutorial");
  console.log(youtubeResults);
})();

// Rectify
const { Rectify } = require("enplex.js");

const app = new Rectify();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

// Xio
const { Xio } = require("enplex.js");

(async () => {
  const response = await Xio.request('https://api.example.com/data', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'John Doe' })
  });
  console.log(response);
})();
```

**For more detailed usage and advanced features and support, consider joining our discord server.**

[![Discord Banner](https://api.weblutions.com/discord/invite/Qn5N7gQEcr)](https://discord.gg/Iscordian/Qn5N7gQEcr)