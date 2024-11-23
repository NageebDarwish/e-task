import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required(),
  password: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required(),
});
