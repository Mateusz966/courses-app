import * as yup from 'yup';

export const profileSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
});
