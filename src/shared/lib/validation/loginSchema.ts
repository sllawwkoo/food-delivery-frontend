import * as yup from "yup";

export type LoginMode = "email" | "phone";

export type LoginFormValues = {
  mode: LoginMode;
  email?: string;
  phone?: string;
  password: string;
};

export const loginSchema = yup
  .object({
    mode: yup.mixed<LoginMode>().oneOf(["email", "phone"]).required(),

    email: yup.string().when("mode", {
      is: "email",
      then: (schema) =>
        schema
          .required("Вкажіть email")
          .email("Некоректний email"),
      otherwise: (schema) => schema.notRequired(),
    }),

    phone: yup.string().when("mode", {
      is: "phone",
      then: (schema) =>
        schema
          .required("Вкажіть телефон")
          .matches(/^\+380\d{9}$/, "Вкажіть телефон у форматі +380XXXXXXXXX"),
      otherwise: (schema) => schema.notRequired(),
    }),

    password: yup
      .string()
      .required("Вкажіть пароль")
      .min(6, "Мінімум 6 символів"),
  })
  .required();

