class Random {
  static async catfact() {
    return await Random.#fetchByType(Random.#API_TYPES.CAT_FACT);
  }

  static async dogfact() {
    return await Random.#fetchByType(Random.#API_TYPES.DOG_FACT);
  }

  static async quote() {
    return await Random.#fetchByType(Random.#API_TYPES.QUOTE);
  }

  static async joke() {
    return await Random.#fetchByType(Random.#API_TYPES.JOKE);
  }

  static async waifu() {
    return await Random.#fetchByType(Random.#API_TYPES.WAIFU);
  }

  static async waifupic(name) {
    return await Random.#fetchByType(Random.#API_TYPES.WAIFUPIC, name);
  }

  static #API_TYPES = {
    CAT_FACT: "catfact",
    DOG_FACT: "dogfact",
    QUOTE: "quote",
    JOKE: "joke",
    WAIFU: "waifu",
    WAIFUPIC: "waifupic"
  };

  static async #fetchByType(type, query) {
    const API_URL = "https://aryanchauhanapi2.onrender.com/api/";
    const url = `${API_URL}${type}${query ? `?name=${query}` : ""}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    return await response.json();
  }
}

module.exports = Random;