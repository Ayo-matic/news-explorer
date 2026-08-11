import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

function Header({ isLoggedIn, userName, onSignInClick, onSignOutClick }) {
  const location = useLocation();
  const isSavedNewsPage = location.pathname === '/saved-news';
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header className={`header ${isSavedNewsPage ? 'header_saved-news' : ''}`}>
      <div className="header__container">
        <Link to="/" className="header__logo" onClick={closeMenu}>NewsExplorer</Link>

        <button
          type="button"
          className="header__menu-toggle"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M4 4l14 14M18 4L4 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          )}
        </button>

        <nav className={`header__nav ${isMenuOpen ? 'header__nav_open' : ''}`}>
          <Link to="/" className="header__nav-link header__nav-link_active" onClick={closeMenu}>Home</Link>

          {isLoggedIn && (
            <Link to="/saved-news" className="header__nav-link" onClick={closeMenu}>Saved articles</Link>
          )}

          {isLoggedIn ? (
            <button
              type="button"
              className="header__user-button"
              onClick={() => { onSignOutClick(); closeMenu(); }}
            >
              {userName}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5 1H2a1 1 0 00-1 1v10a1 1 0 001 1h3M9 10l3-3-3-3M12 7H4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ) : (
            <button
              type="button"
              className="header__signin-button"
              onClick={() => { onSignInClick(); closeMenu(); }}
            >
              Sign in
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
