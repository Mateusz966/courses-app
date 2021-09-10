import * as yup from 'yup';

export const createCourseContent = yup.object().shape({
  sectionName: yup.string().required(),
  sectionDescription: yup.string().required(),
  // eslint-disable-next-line react/forbid-prop-types
  lesson: yup.array(
    yup.object({
      description: yup.string().required(),
      title: yup.string().required(),
      video: yup.mixed().required('File is required'),
    }),
  ),
});
