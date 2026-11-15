// The free News API plan only answers browser requests that come from
// localhost, so the deployed build goes through TripleTen's News API proxy.
const BASE_URL = import.meta.env.PROD
  ? 'https://nomoreparties.co/news/v2'
  : 'https://newsapi.org/v2';

// Dev/prod key handling via Vite env vars — set VITE_NEWS_API_KEY in .env
const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

function checkResponse(res) {
  if (res.ok) return res.json();
  return Promise.reject(`Error: ${res.status}`);
}

export function searchArticles(keyword) {
  const from = new Date();
  from.setDate(from.getDate() - 30); // News API free tier: max 1 month back
  const fromDate = from.toISOString().split('T')[0];

  const url = `${BASE_URL}/everything?q=${encodeURIComponent(keyword)}&from=${fromDate}&sortBy=publishedAt&language=en&apiKey=${API_KEY}`;

  return fetch(url)
    .then(checkResponse)
    .then((data) => data.articles || []);
}
