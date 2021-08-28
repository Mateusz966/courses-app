import * as yup from 'yup';

export const courseSchema = yup.object().shape({
  // courseFn: yup.mixed().required('Photo is required'),
  title: yup.string().required(),
  description: yup.string().required().max(255),
});
