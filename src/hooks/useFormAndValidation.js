import { useState, useCallback } from 'react';

// Reusable form state + native HTML5 validation (via each input's validity object).
// Keeps LoginModal/RegisterModal from each re-implementing the same logic.
export function useFormAndValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value, validationMessage } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validationMessage }));
    setIsValid(e.target.form.checkValidity());
  }, []);

  const resetForm = useCallback((newValues = {}, newErrors = {}, newIsValid = false) => {
    setValues(newValues);
    setErrors(newErrors);
    setIsValid(newIsValid);
  }, []);

  return { values, errors, isValid, handleChange, resetForm, setIsValid };
}
