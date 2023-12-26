import { useState, ChangeEvent, FormEvent } from "react";

type ValidationRules<T> = Record<keyof T, (value: string) => boolean>;

export const useForm = <T extends {}>(
  callback: () => void,
  initialState: T,
  validationRules: ValidationRules<T>
) => {
  const [formValues, setFormValues] = useState<T>(initialState);
  const [validationErrors, setValidationErrors] = useState<
    Record<keyof T, string>
  >({} as any);

  const validateField = (fieldName: keyof T, value: string) => {
    const validationRule = validationRules[fieldName];
    const isValid = validationRule(value);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: isValid ? "" : "Invalid",
    }));
    return isValid;
  };

  const onChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    validateField(name as keyof T, value);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const isValidForm = Object.keys(formValues).every((fieldName) =>
      validateField(
        fieldName as keyof T,
        formValues[fieldName as keyof T] as string
      )
    );

    if (isValidForm) {
      callback();
    }
  };

  const getFieldError = (fieldName: keyof T): string =>
    validationErrors[fieldName];

  return {
    onChange,
    onSubmit,
    formValues,
    getFieldError,
  };
};
