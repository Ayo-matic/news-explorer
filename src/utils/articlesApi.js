const BASE_URL = 'https://se-project-express-o2tk.onrender.com';

function checkResponse(res) {
  if (res.ok) return res.json();
  return res.json().then((err) => Promise.reject(err));
}

function authHeaders(token) {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
}

export function getSavedArticles(token) {
  return fetch(`${BASE_URL}/articles`, {
    headers: authHeaders(token),
  }).then(checkResponse);
}

export function saveArticle(article, token) {
  return fetch(`${BASE_URL}/articles`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify(article),
  }).then(checkResponse);
}

export function deleteArticle(articleId, token) {
  return fetch(`${BASE_URL}/articles/${articleId}`, {
    method: 'DELETE',
    headers: authHeaders(token),
  }).then(checkResponse);
}

// News API shape -> backend Article schema
export function toBackendShape(article, keyword) {
  return {
    keyword,
    title: article.title,
    text: article.description,
    date: article.publishedAt,
    source: article.source?.name || 'Unknown',
    link: article.url,
    image: article.urlToImage,
  };
}

// backend Article shape -> shape NewsCard already expects (matches News API fields)
export function toFrontendShape(saved) {
  return {
    _id: saved._id,
    keyword: saved.keyword,
    title: saved.title,
    description: saved.text,
    publishedAt: saved.date,
    source: { name: saved.source },
    url: saved.link,
    urlToImage: saved.image,
  };
}
