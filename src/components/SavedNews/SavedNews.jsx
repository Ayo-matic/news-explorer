import NewsCardList from '../NewsCardList/NewsCardList';
import './SavedNews.css';

function SavedNews({ savedArticles, onUnsaveArticle, userName }) {
  return (
    <main className="saved-news">
      <section className="saved-news__header">
        <h1 className="saved-news__title">Saved articles</h1>
        <p className="saved-news__count">
          {userName ? `${userName}, you have` : 'You have'} {savedArticles.length} saved article{savedArticles.length !== 1 ? 's' : ''}
        </p>
      </section>

      <NewsCardList
        articles={savedArticles}
        isLoggedIn={true}
        savedArticles={savedArticles}
        onUnsaveArticle={onUnsaveArticle}
        isSavedNewsPage={true}
      />
    </main>
  );
}

export default SavedNews;
