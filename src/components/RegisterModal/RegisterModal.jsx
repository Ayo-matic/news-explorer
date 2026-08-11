import { useEffect } from 'react';
import Popup from '../Popup/Popup';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import './RegisterModal.css';

function RegisterModal({ isOpen, onClose, onRegister, onSwitchToLogin, errorMessage }) {
  const { values, errors, isValid, handleChange, resetForm } = useFormAndValidation();

  useEffect(() => {
    if (isOpen) resetForm();
  }, [isOpen, resetForm]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!isValid) return;
    onRegister({ email: values.email, password: values.password, name: values.name });
  }

  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <h2 className="modal__title">Sign up</h2>
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
        <label className="modal__label">
          Username
          <input
            type="text"
            name="name"
            placeholder="Enter your username"
            className="modal__input"
            value={values.name || ''}
            onChange={handleChange}
            required
            minLength={2}
            maxLength={30}
          />
          {errors.name && <span className="modal__field-error">{errors.name}</span>}
        </label>
        {errorMessage && <p className="modal__error">{errorMessage}</p>}
        <button type="submit" className="modal__submit" disabled={!isValid}>
          Sign up
        </button>
      </form>
      <button type="button" className="modal__switch" onClick={onSwitchToLogin}>
        or Sign in
      </button>
    </Popup>
  );
}

export default RegisterModal;
