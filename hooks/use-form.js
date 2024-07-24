import { GlobalErrorContext } from "@/store/error-context";
import { useContext, useState } from "react";

export function useForm() {
  const { setGlobalError } = useContext(GlobalErrorContext);

  const [formError, setFormError] = useState(null);
  const [inputErrors, setInputErrors] = useState({});
  const [inputData, setInputData] = useState({});

  // Appends data in the form of an object to a formData instance
  const appendFormDataHandler = (formData, data) => {
    Object.keys(data).forEach((key) => formData.append(key, data[key]));
  };

  // Sets a single input error
  const setInputErrorHandler = (fieldName, message) => {
    setInputErrors((p) => ({ ...p, [fieldName]: message }));
  };

  // Sets multiple input errors
  const setInputErrorsHandler = (errors) => {
    Object.keys(errors).forEach((key, i) => setInputErrorHandler(key, errors[key]));
  };

  // Sets a single input data value
  const setInputDataHandler = (label, value) => {
    setInputData((p) => ({ ...p, [label]: value }));
  };

  // Appends all input data values to a formData instance
  const appendInputDataToFormHandler = (formData) => {
    appendFormDataHandler(formData, inputData);
  };

  return {
    formError,
    inputErrors,
    appendFormData: appendFormDataHandler,
    setFormError,
    setInputError: setInputErrorHandler,
    setInputErrors: setInputErrorsHandler,
    setGlobalError,
    setInputData: setInputDataHandler,
    appendInputDataToForm: appendInputDataToFormHandler,
  };
}
