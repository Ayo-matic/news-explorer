import { useState } from 'react';
import './SearchForm.css';

function SearchForm({ onSearch }) {
  const [keyword, setKeyword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!keyword.trim()) return;
    onSearch(keyword.trim());
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-form__input-wrap">
        <svg className="search-form__icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5" />
          <line x1="11.5" y1="11.5" x2="15" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <input
          type="text"
          className="search-form__input"
          placeholder="Enter topic"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>
      <button type="submit" className="search-form__button">
        Search
      </button>
    </form>
  );
}

export default SearchForm;
