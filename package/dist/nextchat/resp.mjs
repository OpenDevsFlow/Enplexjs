const API = 'https://c-v5.onrender.com/';

const models = {
  gemini: 'gemini-1.5-flash-exp-0827',
  'gemini-pro': 'gemini-1.5-pro-exp-0827',
  gpt4: 'gpt-4-turbo-2024-04-09',
  gpt4o: 'gpt-4o-2024-08-06',
  'claude-sonnet': 'claude-3-5-sonnet-20240620',
  'claude-haiku': 'claude-3-haiku-20240307',
};

const fetchData = async (prompt, model) => {
  const url = `${API}v1/chat/completions?prompt=${prompt}&model=${models[model]}`;
  const response = await fetch(url);
  return response.json();
};

const fetchFluxData = async (prompt) => {
  const url = `${API}flux?prompt=${prompt}`;
  const response = await fetch(url);
  return response.json();
};

const fetchFluxProData = async (prompt) => {
  const response = await fetch("https://api.electronhub.top/v1/images/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ek-nFO8tz6qiu5cJ31lwCfPZNNrxFZLsJYou6yx4X1FS2Jyr2dm0a`
    },
    body: JSON.stringify({
      model: "flux-pro",
      prompt: prompt,
      n: 1
    })
  });

  if (!response.ok) {
    throw new Error(`Error fetching Flux Pro data: ${response.statusText}`);
  }

  const responseData = await response.json();
  return responseData.data[0].url;
};

export default async (prompt, model) => {
  if (model === 'flux') {
    const resp = await fetchFluxData(prompt);
    return resp;
  }
  if (model === "flux-pro") {
    const resp = await fetchFluxProData(prompt);
    return resp.result;
  }

  if (!models[model]) {
    console.error('NextChat Error: Invalid model');
    return null;
  }

  const resp = await fetchData(prompt, model);
  return resp.answer;
};