import * as yup from 'yup';

export const createCourseContent = yup.object().shape({
  sectionName: yup.string().required(),
  sectionDescription: yup.string().required(),
  lesson: yup.array().of(
    yup.object({
      description: yup.string().required(),
      title: yup.string().required(),
    }),
  ),
});
