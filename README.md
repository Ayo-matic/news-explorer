# NewsExplorer

A React app for finding news on any topic and saving the articles you want to keep.

Search results come from [News API](https://newsapi.org/). Accounts and saved articles are handled by my own Express/MongoDB API, [se_project_express](https://github.com/Ayo-matic/se_project_express).

This is my final project for the TripleTen Software Engineering program.

## Live demo

[ayomatic-news-explorer.vercel.app](https://ayomatic-news-explorer.vercel.app)

## Features

- **Keyword search**: finds English-language articles from the last 30 days, newest first.
- **Show more**: results appear three at a time, with a button to load the next three.
- **Loading, empty, and error states**: a preloader while the request runs, a "Nothing found" message when nothing matches, and an error message if the request fails.
- **Accounts**: sign up and sign in through modal forms with HTML5 validation. The JWT is stored in `localStorage`, so the session is restored on page load.
- **Saved articles**: signed-in users can bookmark and un-bookmark articles. Each saved article keeps the keyword it was found with.
- **Protected route**: `/saved-news` redirects to the home page unless the user is signed in.
- **Responsive layout** with a mobile navigation menu.

## Tech

- React 19 (function components and hooks, including a custom `useFormAndValidation` hook)
- React Router 7
- Vite 8
- Plain CSS with BEM class names, one stylesheet per component
- Fetch API for News API and the backend
- Oxlint for linting

## Backend

The app uses the [se_project_express](https://github.com/Ayo-matic/se_project_express) API for:

- `POST /signup` and `POST /signin`: registration and login (JWT)
- `GET /users/me`: the current user
- `GET /articles`, `POST /articles`, and `DELETE /articles/:articleId`: saved articles

The API base URL is set in `src/utils/auth.js` and `src/utils/articlesApi.js`: the deployed build uses the live API at `https://ayomatic.duckdns.org`, and `npm run dev` uses `http://localhost:3001`.

## Deployment

The app is hosted on Vercel and redeploys automatically on every push to `main`.

- `VITE_NEWS_API_KEY` is set as an environment variable in the Vercel project settings.
- The free News API plan only answers browser requests from `localhost`, so the deployed build sends searches through TripleTen's proxy (`https://nomoreparties.co/news/v2`). The switch is in `src/utils/NewsApi.js`.
- `vercel.json` rewrites every path to `index.html` so `/saved-news` still loads after a refresh.

## Getting started

1. Get a free API key from [newsapi.org](https://newsapi.org/).
2. Copy `.env.example` to `.env` and set `VITE_NEWS_API_KEY` to your key.
3. Install the dependencies and start the dev server:

   ```bash
   npm install
   npm run dev
   ```
