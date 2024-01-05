import { useState, ChangeEvent, FormEvent, useCallback } from "react";

type ValidationRules<T> = Record<keyof T, (value: string) => boolean>;

export const useForm = <T extends {} = {}>(
  callback: () => void,
  initialState: T,
  validationRules?: ValidationRules<T>
) => {
  const [formValues, setFormValues] = useState<T>(initialState);
  const [validationErrors, setValidationErrors] = useState<
    Record<keyof T, string>
  >({} as any);

  const validateField = useCallback(
    (fieldName: keyof T, value: string) => {
      if (!validationRules) return true;
      const validationRule = validationRules[fieldName];
      const isValid = validationRule(value);
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: isValid ? "" : "Field is invalid",
      }));
      return isValid;
    },
    [validationRules]
  );

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
      const { name, value } = event.target;
      setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
      validateField(name as keyof T, value);
    },
    [validateField]
  );

  const onSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>): void => {
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
    },
    [formValues, validateField, callback]
  );

  const getFieldError = (fieldName: keyof T): string =>
    validationErrors[fieldName];

  return {
    onChange,
    onSubmit,
    formValues,
    getFieldError,
  };
};
