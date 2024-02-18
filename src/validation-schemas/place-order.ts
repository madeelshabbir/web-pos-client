import * as Yup from 'yup';

export const placeOrderFormSchema = Yup.object({
  price: Yup.number().positive('must be at least 1').required('Required'),
});
