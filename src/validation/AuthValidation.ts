import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required(),
  password: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required(),
});

export const RegisterSchema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().email("Invalid email").required(),
  password: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required(),
  password_confirmation: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .oneOf([Yup.ref("password"), ""], "password must match")
    .required("Password Confirmation Is Required"),
});
