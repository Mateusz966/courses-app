import * as yup from 'yup';

export const profileSetPasswordSchema = yup.object().shape({
  oldPassword: yup.string().required().min(6, 'Too short password'),
  newPassword: yup.string().required().min(6, 'Too short password'),
});
