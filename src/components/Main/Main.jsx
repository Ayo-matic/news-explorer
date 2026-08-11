import { useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import NewsCardList from '../NewsCardList/NewsCardList';
import About from '../About/About';
import { searchArticles } from '../../utils/NewsApi';
import heroImage from '../../assets/hero.jpg';
import './Main.css';

function Main({ isLoggedIn, savedArticles, onSaveArticle, onUnsaveArticle }) {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const [keyword, setKeyword] = useState('');
  const [keywordHistory, setKeywordHistory] = useState([]);

  // Derived, not stored: noResults is true only when a search has completed,
  // returned nothing, and isn't currently loading. Storing this as its own
  // state would risk it going stale/out of sync with `articles`.
  const noResults = hasSearched && !isLoading && !hasError && articles.length === 0;

  function handleSearch(searchKeyword) {
    setIsLoading(true);
    setHasSearched(true);
    setHasError(false);
    setVisibleCount(3); // reset pagination on every new search
    setKeyword(searchKeyword);
    setKeywordHistory((prev) => (prev.includes(searchKeyword) ? prev : [...prev, searchKeyword]));

    searchArticles(searchKeyword)
      .then((results) => {
        setArticles(results);
      })
      .catch((err) => {
        console.error(err);
        setHasError(true);
        setArticles([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleShowMore() {
    setVisibleCount((prev) => prev + 3);
  }

  function renderKeywordSummary() {
    if (keywordHistory.length === 0) return null;
    const [first, second, ...rest] = keywordHistory;
    let summary = first;
    if (second) summary += `, ${second}`;
    if (rest.length > 0) summary += `, and ${rest.length} other${rest.length > 1 ? 's' : ''}`;
    return `By keywords: ${summary}`;
  }

  return (
    <main className="main">
      <section className="main__hero" style={{ backgroundImage: `linear-gradient(180deg, rgba(20, 23, 31, 0.55) 0%, rgba(20, 23, 31, 0.75) 100%), url(${heroImage})` }}>
        <h1 className="main__title">What's going on in the world?</h1>
        <p className="main__subtitle">
          Find the latest news on any topic and save the articles you like.
        </p>
        <SearchForm onSearch={handleSearch} />
      </section>

      {isLoading && <Preloader />}

      {hasError && (
        <p className="main__error">
          Sorry, something went wrong during the request. Please try again later.
        </p>
      )}

      {noResults && (
        <div className="main__no-results">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="main__no-results-icon">
            <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.6" />
            <line x1="21.5" y1="21.5" x2="29" y2="29" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <p className="main__no-results-title">Nothing found</p>
          <p className="main__no-results-text">Sorry, but nothing matched your search terms.</p>
        </div>
      )}

      {!isLoading && !hasError && articles.length > 0 && (
        <div className="main__results">
          <div className="main__results-header">
            <h2 className="main__results-title">Search results</h2>
            {renderKeywordSummary() && (
              <p className="main__results-summary">{renderKeywordSummary()}</p>
            )}
          </div>
          <NewsCardList
            articles={articles.slice(0, visibleCount)}
            isLoggedIn={isLoggedIn}
            savedArticles={savedArticles}
            onSaveArticle={(article) => onSaveArticle(article, keyword)}
            onUnsaveArticle={onUnsaveArticle}
            onShowMore={handleShowMore}
            hasMore={visibleCount < articles.length}
          />
        </div>
      )}

      <About />
    </main>
  );
}

export default Main;
