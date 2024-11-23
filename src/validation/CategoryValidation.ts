import * as Yup from "yup";

export const CategorySchema = () =>
  Yup.object().shape({
    title: Yup.string().required(),
    image: Yup.string().required(),
  });
