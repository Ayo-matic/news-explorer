// The deployed build (import.meta.env.PROD is true after `vite build`) uses
// the live API on the Google Cloud VM; `npm run dev` uses the local server.
const BASE_URL = import.meta.env.PROD
  ? 'https://ayomatic.duckdns.org'
  : 'http://localhost:3001';

function checkResponse(res) {
  if (res.ok) return res.json();
  return res.json().then((err) => Promise.reject(err));
}

export function register({ email, password, name }) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, name }),
  }).then(checkResponse);
}

export function login({ email, password }) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
}

export function getCurrentUser(token) {
  return fetch(`${BASE_URL}/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  }).then(checkResponse);
}
