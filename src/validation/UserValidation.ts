import * as Yup from "yup";

export const UserSchema = () =>
  Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().email("Invalid email").required(),
    password: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required(),
    role: Yup.string()
      .oneOf(["1996", "2001"], "The Role Must Be User Or Admin")
      .required(),
  });
