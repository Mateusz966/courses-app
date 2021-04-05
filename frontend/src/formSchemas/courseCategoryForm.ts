import * as yup from 'yup';

export const courseCategorySchema = yup.object().shape({
  category: yup.object().required(),
});

export const courseSubcategorySchema = yup.object().shape({
  subcategory: yup.object().required(),
});

export const courseTopicsSchema = yup.object().shape({
  topics: yup.array().required(),
});
