import * as yup from 'yup';


export const registerSchema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required().min(6, 'Too short password'),
    userCategories: yup.array().required()
});