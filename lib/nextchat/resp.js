const API = "https://c-v5.onrender.com/";

const models = {
  gemini: "gemini-1.5-flash-exp-0827",
  "gemini-pro": "gemini-1.5-pro-exp-0827",
  gpt4: "gpt-4-turbo-2024-04-09",
  gpt4o: "gpt-4o-2024-08-06",
  "claude-sonnet": "claude-3-5-sonnet-20240620",
  "claude-haiku": "claude-3-haiku-20240307",
};

const fetchData = async (prompt, model) => {
  /**
   * @description Fetches data from the NextChat API for a given prompt and model.
   * @param {string} prompt - The text prompt for the model.
   * @param {string} model - The model to use for text generation.
   * @returns {Promise<any>} - The JSON response from the API.
   * @throws {Error} - If the API request fails.
   * @example
   * ```javascript
   * const response = await fetchData('What is the meaning of life?', 'gemini');
   * console.log(response); // Output: The API response.
   * ```
   */
  const url = `${API}v1/chat/completions?prompt=${prompt}&model=${models[model]}`;
  const response = await fetch(url);
  return response.json();
};

const fetchFluxData = async (prompt) => {
  /**
   * @description Fetches data from the NextChat API for image generation using the "flux" model.
   * @param {string} prompt - The text prompt for image generation.
   * @returns {Promise<any>} - The JSON response from the API.
   * @throws {Error} - If the API request fails.
   * @example
   * ```javascript
   * const response = await fetchFluxData('A beautiful sunset over a mountain range');
   * console.log(response); // Output: The API response.
   * ```
   */
  const url = `${API}flux?prompt=${prompt}`;
  const response = await fetch(url);
  return response.json();
};

const fetchFluxProData = async (prompt) => {
  /**
   * @description Fetches data from the ElectronHub API for image generation using the "flux-pro" model.
   * @param {string} prompt - The text prompt for image generation.
   * @returns {Promise<any>} - The JSON response from the API.
   * @throws {Error} - If the API request fails.
   * @example
   * ```javascript
   * const response = await fetchFluxProData('A beautiful sunset over a mountain range');
   * console.log(response); // Output: The API response.
   * ```
   */
  const response = await fetch(
    "https://api.electronhub.top/v1/images/generate",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ek-nFO8tz6qiu5cJ31lwCfPZNNrxFZLsJYou6yx4X1FS2Jyr2dm0a`,
      },
      body: JSON.stringify({
        model: "flux-pro",
        prompt: prompt,
        n: 1,
      }),
    },
  );

  if (!response.ok) {
    throw new Error(`Error fetching Flux Pro data: ${response.statusText}`);
  }

  const responseData = await response.json();
  return responseData.data[0].url;
};

module.exports = async (prompt, model) => {
  /**
   * @description Fetches data from the NextChat API for text generation or image generation using the specified model.
   * @param {string} prompt - The text prompt for the model.
   * @param {string} model - The model to use.
   * @returns {Promise<string>} - The response from the API (text or image URL).
   * @throws {Error} - If the API request fails or the model is invalid.
   * @example
   * ```javascript
   * // Generate text using the "gemini" model
   * const response = await resp('What is the meaning of life?', 'gemini');
   * console.log(response); // Output: The API response.
   *
   * // Generate an image using the "flux" model
   * const imageUrl = await resp('A beautiful sunset over a mountain range', 'flux');
   * console.log(imageUrl); // Output: The image URL.
   * ```
   */
  if (model === "flux") {
    const resp = await fetchFluxData(prompt);
    return resp;
  }
  if (model === "flux-pro") {
    const resp = await fetchFluxProData(prompt);
    return resp.result;
  }

  if (!models[model]) {
    console.error("NextChat Error: Invalid model");
    return null;
  }

  const resp = await fetchData(prompt, model);
  return resp.answer;
};
