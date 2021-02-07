import * as yup from 'yup';

export const courseCategorySchema = yup.object().shape({
  category: yup.array().required(),
});

export const courseSubcategorySchema = yup.object().shape({
  subcategory: yup.array().required(),
});

export const courseTopicsScheMA = yup.object().shape({
  topics: yup.array().required(),
});
