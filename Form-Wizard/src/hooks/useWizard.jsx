import { useState, useEffect } from "react";

export const useWizard = (initialData, validators, steps) => {
  const [formData, setFormData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(0);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Centralized Validation Logic
  const validateField = (name, value, currentData = formData) => {
    const validator = validators[name];
    if (typeof validator !== "function") return "";

    const errorMessage = validator(value, currentData);
    setErrors((prev) => ({ ...prev, [name]: errorMessage }));
    return errorMessage;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
    validateField(name, value, updatedData); // Pass updated data directly
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (value !== "") {
      setTouched((prev) => ({ ...prev, [name]: true }));
      validateField(name, value);
    }
  };

  // Derived State: Is the current step valid?
  const currentStepFields = steps[currentPage].fields;
  const isStepValid = currentStepFields.every(
    (key) => formData[key] !== "" && !errors[key]
  );

  const nextStep = () => isStepValid && setCurrentPage((p) => p + 1);
  const prevStep = () => setCurrentPage((p) => Math.max(0, p - 1));

  const resetForm = () => {
    setFormData(initialData);
    setErrors({});
    setTouched({});
    setCurrentPage(0);
    setIsSubmitted(false);
  };

  return {
    formData,
    currentPage,
    touched,
    errors,
    isSubmitted,
    isStepValid,
    setIsSubmitted,
    handleChange,
    handleBlur,
    nextStep,
    prevStep,
    resetForm,
  };
};
