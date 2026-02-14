import { useState } from "react";
import WizardForm from "./components/WizardForm";
import Step1 from "./wizard/Step1";
import Step2 from "./wizard/Step2";
import Step3 from "./wizard/Step3";
import FinalStep from "./wizard/FinalStep";

function App() {
  let initialState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    city: "",
  };

  const [formData, setFormData] = useState(initialState);
  let [currentpage, setCurrentpage] = useState(0);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [submit, setSubmit] = useState(false);
  const validators = {
    name: (v) =>
      v.length < 3 ? "Name must be at least 3 characters long" : "",
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

  const validateField = (name, value, updated = formData) => {
    let func = validators[name];
    if (typeof func !== "function") return;
    let message = func(value, updated);
    setErrors((prev) => {
      return { ...prev, [name]: message };
    });
  };

  const changeHandler = (e) => {
    let { name, value } = e.target;
    setFormData((prev) => {
      let obj = { ...prev, [name]: value };
      validateField(name, value);
      return obj;
    });
  };
  const blurHandler = (e) => {
    let { name, value } = e.target;
    if (value !== "") {
      setTouched((prev) => ({ ...prev, [name]: true }));
      validateField(name, value);
    }
  };

  let component = [
    {
      components: Step1,
      fields: ["name", "email"],
    },
    {
      components: Step2,
      fields: ["password", "confirmPassword"],
    },
    {
      components: Step3,
      fields: ["city", "age"],
    },
  ];
  let Component = component[currentpage]["components"];

  let allowedPage = component[currentpage].fields.every(
    (key) =>
      formData[key] !== "" && (errors[key] === "" || errors[key] === undefined)
  )
    ? currentpage + 1
    : currentpage;

  let submitHandler = () => {
    setSubmit(true);
    setTimeout(() => {
      setFormData(initialState);
      setErrors({});
      setTouched({});
      setCurrentpage(0);
      setSubmit(false);
    }, 5000);
  };
  return (
    <main className=" flex justify-center h-screen items-center border">
      <WizardForm
        currentStep={currentpage}
        onchangeStep={setCurrentpage}
        validateField={validateField}
        allowedPage={allowedPage}
        totalPage={component.length}
        submitHandler={submitHandler}
      >
        {!submit ? (
          <Component
            formData={formData}
            onChange={changeHandler}
            onBlur={blurHandler}
            errors={errors}
            touched={touched}
          />
        ) : (
          <FinalStep formData={formData} />
        )}
      </WizardForm>
    </main>
  );
}

export default App;
