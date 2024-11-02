const fetchByType = async (type, query) => {
  const API_URL = 'https://c-v5.onrender.com/';
  const url = `${API_URL}${type}${query ? `?query=${query}` : ''}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  return await response.json();
};

export default async (type, query) => fetchByType(type, query);