import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Main from './components/Main/Main'
import SavedNews from './components/SavedNews/SavedNews'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import LoginModal from './components/LoginModal/LoginModal'
import RegisterModal from './components/RegisterModal/RegisterModal'
import SuccessModal from './components/SuccessModal/SuccessModal'
import * as auth from './utils/auth'
import * as articlesApi from './utils/articlesApi'
import './App.css'

function App() {
  // activeModal: 'login' | 'register' | 'success' | null — only one modal open at a time
  const [activeModal, setActiveModal] = useState(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [authError, setAuthError] = useState('');

  const [savedArticles, setSavedArticles] = useState([]);

  function loadSavedArticles(token) {
    articlesApi.getSavedArticles(token)
      .then((articles) => {
        setSavedArticles(articles.map(articlesApi.toFrontendShape));
      })
      .catch((err) => console.error('Failed to load saved articles', err));
  }

  // On page load, check for a saved token and restore the session
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (!token) return;

    auth.getCurrentUser(token)
      .then((user) => {
        setIsLoggedIn(true);
        setCurrentUser(user);
        loadSavedArticles(token);
      })
      .catch(() => {
        localStorage.removeItem('jwt');
      });
  }, []);

  function closeActiveModal() {
    setActiveModal(null);
    setAuthError('');
  }

  function handleSignInClick() {
    setActiveModal('login');
  }

  function handleSignOutClick() {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    setCurrentUser(null);
    setSavedArticles([]);
  }

  function handleLogin({ email, password }) {
    setAuthError('');
    auth.login({ email, password })
      .then((data) => {
        localStorage.setItem('jwt', data.token);
        return auth.getCurrentUser(data.token);
      })
      .then((user) => {
        setIsLoggedIn(true);
        setCurrentUser(user);
        loadSavedArticles(localStorage.getItem('jwt'));
        closeActiveModal();
      })
      .catch((err) => {
        setAuthError(err.message || 'Incorrect email or password');
      });
  }

  function handleRegister({ email, password, name }) {
    setAuthError('');
    auth.register({ email, password, name })
      .then(() => {
        setActiveModal('success');
      })
      .catch((err) => {
        setAuthError(err.message || 'Registration failed');
      });
  }

  function handleSaveArticle(article, keyword) {
    const token = localStorage.getItem('jwt');
    const payload = articlesApi.toBackendShape(article, keyword);
    articlesApi.saveArticle(payload, token)
      .then((saved) => {
        setSavedArticles((prev) => [...prev, articlesApi.toFrontendShape(saved)]);
      })
      .catch((err) => console.error('Failed to save article', err));
  }

  function handleUnsaveArticle(article) {
    const token = localStorage.getItem('jwt');
    // article may come from a search result (no _id) or the saved list (_id present)
    const saved = savedArticles.find((a) => a.url === article.url);
    if (!saved) return;

    articlesApi.deleteArticle(saved._id, token)
      .then(() => {
        setSavedArticles((prev) => prev.filter((a) => a.url !== article.url));
      })
      .catch((err) => console.error('Failed to remove article', err));
  }

  return (
    <div className="page">
      <Header
        isLoggedIn={isLoggedIn}
        userName={currentUser?.name}
        onSignInClick={handleSignInClick}
        onSignOutClick={handleSignOutClick}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Main
              isLoggedIn={isLoggedIn}
              savedArticles={savedArticles}
              onSaveArticle={handleSaveArticle}
              onUnsaveArticle={handleUnsaveArticle}
            />
          }
        />
        <Route
          path="/saved-news"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <SavedNews savedArticles={savedArticles} onUnsaveArticle={handleUnsaveArticle} userName={currentUser?.name} />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />

      <LoginModal
        isOpen={activeModal === 'login'}
        onClose={closeActiveModal}
        onLogin={handleLogin}
        onSwitchToRegister={() => setActiveModal('register')}
        errorMessage={authError}
      />
      <RegisterModal
        isOpen={activeModal === 'register'}
        onClose={closeActiveModal}
        onRegister={handleRegister}
        onSwitchToLogin={() => setActiveModal('login')}
        errorMessage={authError}
      />
      <SuccessModal
        isOpen={activeModal === 'success'}
        onClose={closeActiveModal}
        onSwitchToLogin={() => setActiveModal('login')}
      />
    </div>
  )
}

export default App
