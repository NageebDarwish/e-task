import * as Yup from "yup";

export const ProductSchema = () =>
  Yup.object().shape({
    category: Yup.string()
      .notOneOf(["Select Category"], "Please Select Category")
      .required(),
    title: Yup.string().required(),
    description: Yup.string().required(),
    price: Yup.string().required(),
    About: Yup.string().required(),
    discount: Yup.string().required(),
    stock: Yup.string().required(),
    images: Yup.mixed().notRequired(),
  });
