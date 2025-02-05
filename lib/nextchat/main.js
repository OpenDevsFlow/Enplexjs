
const Buffer = require('node:buffer').Buffer;

class NextChat {
  static #chatModels = ["gpt4o", "gemini", "llama-vision", "gemma2-9b", "gemma-7b", "groq-70b", "groq-8b", "llama3-70b", "llama3-8b", "llama3-1b", "llama3-3b", "llama3-11b", "llama3-90b", "llama-guard"];
  static #imgModels = ["animagen", "prodia", "mageai", "xl3"];
  static #cache = new Map();
  static #cacheDuration = 3600000; // 1 hour cache

  static async ask(prompt, options = {}) {
    if (!prompt?.trim()) throw new Error("NextChat Error: Empty prompt");
    if (!options?.model) throw new Error("NextChat Error: Model not specified");

    const cacheKey = `${options.model}-${prompt}`;
    const cached = NextChat.#getCache(cacheKey);
    if (cached) return cached;

    try {
      const response = await NextChat.#fetchData(prompt, options.model);
      if (options.cache) NextChat.#setCache(cacheKey, response.answer);
      return response.answer;
    } catch (err) {
      throw new Error(`NextChat Error: ${err.message}`);
    }
  }

  static async imagine(prompt, options = {}) {
    if (!prompt?.trim()) throw new Error("NextChat Error: Empty prompt");
    if (!options?.model) throw new Error("NextChat Error: Model not specified");

    try {
      const blob = await NextChat.#fetchData(prompt, options.model);
      return options.model === "prodia" ? blob : Buffer.from(await blob.arrayBuffer()).toString('base64');
    } catch (err) {
      throw new Error(`NextChat Error: ${err.message}`);
    }
  }

  static async upscale(url) {
    if (!url?.trim()) throw new Error("NextChat Error: Invalid URL");
    try {
      const blob = await NextChat.#fetchData(url, "upscale");
      return Buffer.from(await blob.arrayBuffer()).toString('base64');
    } catch (err) {
      throw new Error(`NextChat Error: ${err.message}`);
    }
  }

  static async tts(text) {
    if (!text?.trim()) throw new Error("NextChat Error: Empty text");
    try {
      const blob = await NextChat.#fetchData(text, "tts");
      return Buffer.from(await blob.arrayBuffer()).toString('base64');
    } catch (err) {
      throw new Error(`NextChat Error: ${err.message}`);
    }
  }

  static #getCache(key) {
    const item = NextChat.#cache.get(key);
    if (item && Date.now() - item.timestamp < NextChat.#cacheDuration) {
      return item.data;
    }
    NextChat.#cache.delete(key);
    return null;
  }

  static #setCache(key, data) {
    NextChat.#cache.set(key, { data, timestamp: Date.now() });
  }

  static async #fetchData(prompt, model, imgUrl = "") {
    const apiUrl = "https://aryanchauhanapi2.onrender.com/";
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);

    try {
      if (NextChat.#chatModels.includes(model)) {
        const endpoint = model === "gemini" ? "gemini" : 
                        model === "llama-vision" ? `api/llama-vision?imageUrl=${imgUrl}` : 
                        `api/${model}`;
        const response = await fetch(`${apiUrl}${endpoint}?prompt=${encodeURIComponent(prompt)}`, {
          signal: controller.signal
        });
        if (!response.ok) throw new Error(`API Error: ${response.status}`);
        return await response.json();
      } else if (NextChat.#imgModels.includes(model)) {
        const endpoint = model === "prodia" ? "v1/generate" : 
                        model === "xl3" ? "xl3" : 
                        `api/${model}`;
        const response = await fetch(`${apiUrl}${endpoint}?prompt=${encodeURIComponent(prompt)}`, {
          signal: controller.signal
        });
        if (!response.ok) throw new Error(`API Error: ${response.status}`);
        return model === "prodia" ? await response.json() : await response.blob();
      } else if (model === "upscale" || model === "tts") {
        const endpoint = model === "upscale" ? "api/4k" : "tts";
        const param = model === "upscale" ? "url" : "text";
        const response = await fetch(`${apiUrl}${endpoint}?${param}=${encodeURIComponent(prompt)}`, {
          signal: controller.signal
        });
        if (!response.ok) throw new Error(`API Error: ${response.status}`);
        return await response.blob();
      }
      throw new Error(`Invalid model: ${model}`);
    } finally {
      clearTimeout(timeout);
    }
  }
}

module.exports = NextChat;
