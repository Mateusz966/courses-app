import * as yup from 'yup';

export const courseSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required().max(255),
});
