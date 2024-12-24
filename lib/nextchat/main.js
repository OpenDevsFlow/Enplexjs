const Buffer = require('node:buffer').Buffer;

class NextChat {
  constructor() {
    this.cache = new Map();
  }

  static #chatModels = ["gpt4o", "claude", "gemini", "llama-vision", "gemma2-9b", "gemma-7b", "groq-70b", "groq-8b", "llama3-70b", "llama3-8b", "llama3-1b", "llama3-3b", "llama3-11b", "llama3-90b", "llama-guard"];
  static #imgModels = ["animagen", "prodia", "mageai", "xl3"];

  static async ask(prompt, options = {}) {
    NextChat.#validate(prompt, options.model);

    const cacheKey = `${options.model}-${prompt}`;

    if (options.cache && this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const resp = await NextChat.#fetchData(prompt, options.model, options.imgUrl = "");

      if (options.cache) {
        this.cache.set(cacheKey, resp);
      }

      return resp.answer;
    } catch (err) {
      throw new Error("NextChat error: " + err);
    }
  }

  static async imagine(prompt, options = {}) {
    NextChat.#validate(prompt, options.model);

    try {
      const blob = await NextChat.#fetchData(prompt, options.model);
      const arrayBuffer = await blob.arrayBuffer(); // Convert Blob to ArrayBuffer
      return Buffer.from(new Uint8Array(arrayBuffer)).toString('base64'); // Convert to base64
    } catch (err) {
      throw new Error("NextChat error: " + err);
    }
  }

  static async upscale(url) {
    try {
      const blob = await NextChat.#fetchData(url, "upscale");
      const arrayBuffer = await blob.arrayBuffer(); // Convert Blob to ArrayBuffer
      return Buffer.from(new Uint8Array(arrayBuffer)).toString('base64'); // Convert to base64
    } catch (err) {
      throw new Error("NextChat error: " + err);
    }
  }

  static async tts(txt) {
    try {
      const blob = await NextChat.#fetchData(txt, "tts");
      const arrayBuffer = await blob.arrayBuffer(); // Convert Blob to ArrayBuffer
      return Buffer.from(new Uint8Array(arrayBuffer)).toString('base64'); // Convert to base64
    } catch (err) {
      throw new Error("NextChat error: " + err);
    }
  }

  static #validate(prompt, model) {
    if (!prompt) {
      throw new Error("NextChat Error: prompt is required");
    }
    if (!model) {
      throw new Error("NextChat Error: model is required");
    }
  }

  static async #fetchData(prompt, model, imgUrl = "") {
    if (NextChat.#chatModels.includes(model)) {
      if (model === "gemini") {
        return await (await fetch(`${api}gemini?prompt=${prompt}`)).json();
      }
      if (model === "llama-vision") {
        return await (await fetch(`${api}api/llama-vision?prompt=${prompt}&imageUrl=${imgUrl}`)).json();
      }
      if (model === "claude") {
        return await fetch(`${api}api/cloud3?prompt=${prompt}`);
      }

      return await (await fetch(`${api}api/${model}?prompt=${prompt}`)).json();
    } else if (NextChat.#imgModels.includes(model)) {
      if (model === "animagen") {
        return await (await fetch(`${api}api/animagen?prompt=${prompt}`)).blob();
      }
      if (model === "prodia") {
        return await (await fetch(`${api}v1/generate?prompt=${prompt}`)).json();
      }
      if (model === "mageai") {
        return await (await fetch(`${api}api/mageai?prompt=${prompt}`)).blob();
      }
      if (model === "xl3") {
        return await (await fetch(`${api}/xl3?prompt=${prompt}`)).blob();
      }
    } else if (model === "upscale") {
      return await (await fetch(`${api}/api/4k?url=${prompt}`)).blob();
    } else if (model === "tts") {
      return await (await fetch(`${api}tts?text=${prompt}`)).blob();
    } else {
      throw new Error(`NextChat Error: Invalid model: ${model}`);
    }
  }
}

const api = "https://aryanchauhanapi.onrender.com/";

module.exports = NextChat;
