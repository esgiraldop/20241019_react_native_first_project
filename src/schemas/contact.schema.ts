import * as Yup from 'yup';

export const contactSchema = Yup.object().shape({
  name: Yup.string()
    .required()
    .min(3, 'Name must contain at least 3 characters'),
  email: Yup.string().required('Email is required').email('Invalid email'),
  phone: Yup.number().required('Phone number is required'),
});
