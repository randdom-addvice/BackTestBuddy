import { useState, ChangeEvent, FormEvent, useCallback } from "react";

type ValueOf<T> = T[keyof T];

// type ValidationRules<T> = Record<keyof T, (value: string) => boolean>;
type ValidationRules<T> = {
  [K in keyof T]?: (value: T[K]) => boolean;
};

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
    (fieldName: keyof T, value: T[keyof T]) => {
      if (!validationRules) return true;
      const validationRule = validationRules[fieldName];
      const isValid = validationRule ? validationRule(value) : true;
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
      validateField(name as keyof T, value as T[keyof T]);
    },
    [validateField]
  );

  const checkIsValidForm = useCallback(() => {
    const isValidForm = Object.keys(formValues).every((fieldName) =>
      validateField(
        fieldName as keyof T,
        formValues[fieldName as keyof T] as T[keyof T]
      )
    );
    return isValidForm;
  }, [formValues, validateField, callback]);

  const onSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>): void => {
      event.preventDefault();
      const isValidForm = checkIsValidForm();

      if (isValidForm) {
        callback();
      }
    },
    [formValues, validateField, callback]
  );

  const handleNonFormSubmit = useCallback(() => {
    const isValidForm = checkIsValidForm();

    if (isValidForm) {
      callback();
    }
  }, [formValues, validateField, callback]);

  const getFieldError = (fieldName: keyof T): string =>
    validationErrors[fieldName];

  return {
    onChange,
    onSubmit,
    formValues,
    getFieldError,
    handleNonFormSubmit,
  };
};
