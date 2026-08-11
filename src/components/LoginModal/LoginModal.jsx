import { useEffect } from 'react';
import Popup from '../Popup/Popup';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import './LoginModal.css';

function LoginModal({ isOpen, onClose, onLogin, onSwitchToRegister, errorMessage }) {
  const { values, errors, isValid, handleChange, resetForm } = useFormAndValidation();

  useEffect(() => {
    if (isOpen) resetForm();
  }, [isOpen, resetForm]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!isValid) return;
    onLogin({ email: values.email, password: values.password });
  }

  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <h2 className="modal__title">Sign in</h2>
      <form className="modal__form" onSubmit={handleSubmit} noValidate>
        <label className="modal__label">
          Email
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            className="modal__input"
            value={values.email || ''}
            onChange={handleChange}
            required
          />
          {errors.email && <span className="modal__field-error">{errors.email}</span>}
        </label>
        <label className="modal__label">
          Password
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            className="modal__input"
            value={values.password || ''}
            onChange={handleChange}
            required
            minLength={8}
          />
          {errors.password && <span className="modal__field-error">{errors.password}</span>}
        </label>
        {errorMessage && <p className="modal__error">{errorMessage}</p>}
        <button type="submit" className="modal__submit" disabled={!isValid}>
          Sign in
        </button>
      </form>
      <button type="button" className="modal__switch" onClick={onSwitchToRegister}>
        or Sign up
      </button>
    </Popup>
  );
}

export default LoginModal;
