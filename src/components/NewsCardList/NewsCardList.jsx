import NewsCard from '../NewsCard/NewsCard';
import './NewsCardList.css';

function NewsCardList({
  articles,
  isLoggedIn,
  savedArticles = [],
  onSaveArticle,
  onUnsaveArticle,
  onShowMore,
  hasMore,
  isSavedNewsPage,
}) {
  function isArticleSaved(article) {
    return savedArticles.some((saved) => saved.url === article.url);
  }

  return (
    <section className="news-card-list">
      <div className="news-card-list__grid">
        {articles.map((article) => (
          <NewsCard
            key={article.url}
            article={article}
            isLoggedIn={isLoggedIn}
            isSaved={isArticleSaved(article)}
            onSaveArticle={onSaveArticle}
            onUnsaveArticle={onUnsaveArticle}
            isSavedNewsPage={isSavedNewsPage}
            keyword={article.keyword}
          />
        ))}
      </div>
      {hasMore && (
        <button type="button" className="news-card-list__show-more" onClick={onShowMore}>
          Show more
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M12.25 7A5.25 5.25 0 112.6 4.03M2.6 4.03V1.4M2.6 4.03H5.23" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
    </section>
  );
}

export default NewsCardList;
