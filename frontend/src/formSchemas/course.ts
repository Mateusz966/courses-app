import * as yup from 'yup';

export const courseSchema = yup.object().shape({
  // courseFn: yup.mixed().required('Photo is required'),
  title: yup.string().required('Pole wymagane'),
  description: yup.string().required('Pole wymagane').max(255),
  price: yup
    .number()
    .positive('Liczba musi być dodatnia')
    .required('Pole wymagane'),
});
