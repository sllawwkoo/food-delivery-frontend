import * as yup from "yup";

export type RegisterFormValues = {
  name: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const registerSchema = yup
  .object({
    name: yup.string().required("Вкажіть ім'я"),
    phone: yup
      .string()
      .required("Вкажіть телефон")
      .matches(/^\+?[0-9]{10,14}$/, "Некоректний номер телефону"),
    email: yup
      .string()
      .required("Вкажіть email")
      .email("Некоректний email"),
    password: yup
      .string()
      .required("Вкажіть пароль")
      .min(6, "Мінімум 6 символів"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Паролі мають співпадати")
      .required("Підтвердіть пароль"),
  })
  .required();

