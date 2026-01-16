import { useState } from "react";
import FormUser from "./components/FOrmUser";

// Initial form data structure for reuse
const initialFormData = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  age: "",
};

// Validators map for each field
const validators = {
  name: (v) => (v.length < 3 ? "Name must be at least 3 characters long" : ""),
  email: (v) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v)
      ? ""
      : "Invalid email format",
  password: (v) =>
    v.length < 8 ? "Password must be at least 8 characters" : "",
  confirmPassword: (v, values) =>
    v !== values.password ? "Passwords do not match" : "",
  age: (v) => (Number(v) < 18 ? "Must be 18 or older" : ""),
};

function App() {
  let [formData, setFormData] = useState(initialFormData);
  let [submitting, setSubmitting] = useState(false);

  // touched tracks fields that have been interacted with
  let [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

  // Validate a single field using validators map
  const validateField = (name, value, values = formData) => {
    const validator = validators[name];
    const message = validator ? validator(value, values) : "";
    setErrors((prev) => ({ ...prev, [name]: message }));
    return message;
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      if (touched[name]) validateField(name, value, updated);
      return updated;
    });
  };

  // Submit-level validation: mark all touched, validate all fields in one pass, abort if errors
  const submitHandler = (e) => {
    e.preventDefault();

    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {}
    );
    setTouched(allTouched);

    // Validate all fields and collect errors in one pass
    const newErrors = Object.keys(formData).reduce((acc, key) => {
      const msg = validators[key]
        ? validators[key](formData[key], formData)
        : "";
      if (msg) acc[key] = msg;
      return acc;
    }, {});

    // Update errors state once
    setErrors(newErrors);

    // Abort submission if there are any errors
    if (Object.keys(newErrors).length > 0) return;

    // Proceed with submission
    setSubmitting(true);
    setTimeout(() => {
      setFormData(initialFormData);
      setErrors({});
      setTouched({});
      setSubmitting(false);
    }, 2000);
  };

  const isFormValid =
    Object.values(formData).every((value) => value.trim() !== "") &&
    Object.values(errors).every((msg) => msg === "");
  return (
    <main className=" h-screen  p-2 border flex items-center justify-center ">
      <FormUser
        formData={formData}
        onChange={changeHandler}
        onSubmit={submitHandler}
        onBlur={handleBlur}
        errors={errors}
        submitting={submitting}
        isFormValid={isFormValid}
      />
    </main>
  );
}

export default App;
