const fetchData = async (prompt, url) => {
  /**
   * @description Fetches image analysis data from the Groq API using a provided prompt and image URL.
   * @param {string} prompt - The text prompt for the image analysis.
   * @param {string} url - The URL of the image to be analyzed.
   * @returns {Promise<string>} - The text analysis of the image.
   * @throws {Error} - If there is an error fetching the data.
   * @example
   * ```javascript
   * const analysis = await fetchData('Describe the image.', 'https://example.com/image.jpg');
   * console.log(analysis); // Output: The text analysis of the image.
   * ```
   */
  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer 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`,
      },
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `${prompt}`,
              },
              {
                type: "image_url",
                image_url: {
                  url: `${url}`,
                },
              },
            ],
          },
          {
            role: "assistant",
            content: "",
          },
        ],
        model: "llama-3.2-11b-vision-preview",
        temperature: 1,
        max_tokens: 1024,
        top_p: 1,
        stream: false,
        stop: null,
      }),
    },
  );

  if (!response.ok) {
    throw new Error(
      `Error fetching image analysis data: ${response.statusText}`,
    );
  }

  const responseData = await response.json();
  return responseData.choices[0].message.content;
};

module.exports = async (prompt, url) => {
  /**
   * @description Analyzes an image using the Groq API.
   * @param {string} prompt - The text prompt for the image analysis.
   * @param {string} url - The URL of the image to be analyzed.
   * @returns {Promise<string>} - The text analysis of the image.
   * @throws {Error} - If there is an error fetching the data.
   * @example
   * ```javascript
   * const analysis = await imageAnalysis('Describe the image.', 'https://example.com/image.jpg');
   * console.log(analysis); // Output: The text analysis of the image.
   * ```
   */
  return await fetchData(prompt, url);
};
