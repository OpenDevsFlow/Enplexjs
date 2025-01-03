const Buffer = require('node:buffer').Buffer;

class NextChat {
  static #chatModels = ["gpt4o", "gemini", "llama-vision", "gemma2-9b", "gemma-7b", "groq-70b", "groq-8b", "llama3-70b", "llama3-8b", "llama3-1b", "llama3-3b", "llama3-11b", "llama3-90b", "llama-guard"];
  static #imgModels = ["animagen", "prodia", "mageai", "xl3"];
  static cache = new Map(); 

  static async ask(prompt, options = {}) {
    NextChat.#validate(prompt, options.model);

    const cacheKey = `${options.model}-${prompt}`;

    if (options.cache && NextChat.cache.has(cacheKey)) { 
      return NextChat.cache.get(cacheKey);
    }

    try {
      const response = await NextChat.#fetchData(prompt, options.model);

      if (options.cache) {
        NextChat.cache.set(cacheKey, response); 
      }

      return response.answer;
    } catch (err) {
      throw new Error("NextChat error: " + err);
    }
  }

  static async imagine(prompt, options = {}) {
    NextChat.#validate(prompt, options.model);

    try {
      const blob = await NextChat.#fetchData(prompt, options.model);
      
      if (options.model === "prodia") {
        return blob;
      }
      
      return Buffer.from(new Uint8Array(await blob.arrayBuffer())).toString('base64'); 
    } catch (err) {
      throw new Error("NextChat error: " + err);
    }
  }

  static async upscale(url) {
    try {
      const blob = await NextChat.#fetchData(url, "upscale");
      
      return Buffer.from(new Uint8Array(await blob.arrayBuffer())).toString('base64'); 
    } catch (err) {
      throw new Error("NextChat error: " + err);
    }
  }

  static async tts(txt) {
    try {
      const blob = await NextChat.#fetchData(txt, "tts");
      
      return Buffer.from(new Uint8Array(await blob.arrayBuffer())).toString('base64'); 
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
    const apiUrl = "https://aryanchauhanapi2.onrender.com/";

    if (NextChat.#chatModels.includes(model)) {
      if (model === "gemini") {
        return await (await fetch(`${apiUrl}gemini?prompt=${prompt}`)).json();
      }
      if (model === "llama-vision") {
        return await (await fetch(`${apiUrl}api/llama-vision?prompt=${prompt}&imageUrl=${imgUrl}`)).json();
      }

      return await (await fetch(`${apiUrl}api/${model}?prompt=${prompt}`)).json();
    } else if (NextChat.#imgModels.includes(model)) {
      if (model === "animagen") {
        return await (await fetch(`${apiUrl}api/animagen?prompt=${prompt}`)).blob();
      }
      if (model === "prodia") {
        return await (await fetch(`${apiUrl}v1/generate?prompt=${prompt}`)).json();
      }
      if (model === "mageai") {
        return await (await fetch(`${apiUrl}api/mageai?prompt=${prompt}`)).blob();
      }
      if (model === "xl3") {
        return await (await fetch(`${apiUrl}/xl3?prompt=${prompt}`)).blob();
      }
    } else if (model === "upscale") {
      return await (await fetch(`${apiUrl}/api/4k?url=${prompt}`)).blob();
    } else if (model === "tts") {
      return await (await fetch(`${apiUrl}tts?text=${prompt}`)).blob();
    } else {
      throw new Error(`NextChat Error: Invalid model: ${model}`);
    }
  }
}

module.exports = NextChat;