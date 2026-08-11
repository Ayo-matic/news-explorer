import { useEffect } from 'react';
import './Popup.css';

// Shared modal shell: handles overlay-click-to-close and Escape-key close
// once, so LoginModal/RegisterModal/SuccessModal don't each reimplement it.
function Popup({ isOpen, onClose, children }) {
  useEffect(() => {
    if (!isOpen) return;

    function handleEscape(e) {
      if (e.key === 'Escape') onClose();
    }

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div className="popup" onClick={handleOverlayClick}>
      <div className="popup__content">
        <button type="button" className="popup__close" onClick={onClose} aria-label="Close" />
        {children}
      </div>
    </div>
  );
}

export default Popup;
