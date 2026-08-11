import './NewsCard.css';

function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

function NewsCard({ article, isLoggedIn, isSaved, onSaveArticle, onUnsaveArticle, isSavedNewsPage, keyword }) {
  function handleSaveClick() {
    if (isSaved) {
      onUnsaveArticle(article);
    } else {
      onSaveArticle(article);
    }
  }

  return (
    <article className="news-card">
      <div className="news-card__image-wrap">
        <img src={article.urlToImage} alt={article.title} className="news-card__image" />

        {keyword && <span className="news-card__keyword">{keyword}</span>}

        {isLoggedIn ? (
          <button
            type="button"
            className={`news-card__bookmark ${isSaved ? 'news-card__bookmark_active' : ''}`}
            onClick={handleSaveClick}
            aria-label={isSaved ? 'Remove from saved' : 'Save article'}
            title={isSaved ? 'Remove from saved' : 'Save article'}
          >
            <svg width="14" height="18" viewBox="0 0 14 18" fill={isSaved ? 'currentColor' : 'none'}>
              <path d="M1 1h12v16l-6-4-6 4V1z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
          </button>
        ) : (
          !isSavedNewsPage && (
            <span className="news-card__bookmark-hint">Sign in to save articles</span>
          )
        )}
      </div>

      <div className="news-card__info">
        <p className="news-card__date">{formatDate(article.publishedAt)}</p>
        <h3 className="news-card__title">{article.title}</h3>
        <p className="news-card__text">{article.description}</p>
        <span className="news-card__source">{article.source?.name}</span>
      </div>
    </article>
  );
}

export default NewsCard;
