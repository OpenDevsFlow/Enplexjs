const fetchData = async (prompt, url) => {
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer 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`
    },
    body: JSON.stringify({
      "messages": [
        {
          "role": "user",
          "content": [
            {
              "type": "text",
              "text": `${prompt}`
            },
            {
              "type": "image_url",
              "image_url": {
                "url": `${url}`
              }
            }
          ]
        },
        {
          "role": "assistant",
          "content": ""
        }
      ],
      "model": "llama-3.2-11b-vision-preview",
      "temperature": 1,
      "max_tokens": 1024,
      "top_p": 1,
      "stream": false,
      "stop": null
    })
  });

  if (!response.ok) {
    throw new Error(`Error fetching image analysis data: ${response.statusText}`);
  }

  const responseData = await response.json();
  return responseData.choices[0].message.content;
}

module.exports = async (prompt, url) => {
  return await fetchData(prompt, url)
}