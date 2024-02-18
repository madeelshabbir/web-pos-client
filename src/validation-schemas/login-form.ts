import * as Yup from 'yup';

export const loginFormSchema = Yup.object({
  username: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});
