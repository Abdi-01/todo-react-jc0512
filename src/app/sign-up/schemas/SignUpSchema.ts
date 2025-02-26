import * as Yup from "yup";

export const SignUpSchema = Yup.object().shape({
  firstname: Yup.string().required("Firstname is required"),
  lastname: Yup.string().required("Lastname is required"),
  email: Yup.string().email("Invalid email").required("email is required"),
  password: Yup.string()
    .min(3, "Password must be at least 3 characters")
    .required("Password is required"),
  confPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password must match")
    .required("Confirmation password is required"),
});
