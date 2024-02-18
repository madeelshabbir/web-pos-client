import { type TypeOptions, toast } from 'react-toastify';

import { Toast } from '../types/enums/toast';

export const notify = (
  message: string, type: TypeOptions = Toast.SUCCESS,
): void => {
  toast(message, { type });
};
