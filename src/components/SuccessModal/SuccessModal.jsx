import Popup from '../Popup/Popup';
import './SuccessModal.css';

function SuccessModal({ isOpen, onClose, onSwitchToLogin }) {
  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <h2 className="modal__title">Registration successfully completed!</h2>
      <button type="button" className="modal__switch" onClick={onSwitchToLogin}>
        Sign in
      </button>
    </Popup>
  );
}

export default SuccessModal;
