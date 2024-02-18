import { type FormikErrors, type FormikTouched } from 'formik';

export const errorMessage = <Type>(
  name: string,
  touched: FormikTouched<Type>,
  errors: FormikErrors<Type>,
  responseErrors: Record<string, string> = {},
): string => {
  return (
    touched[name as keyof Type] &&
    (errors[name as keyof Type] as string)
  ) || responseErrors[name];
};
