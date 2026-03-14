import * as yup from "yup";

export type ProfileFormValues = {
  name: string;
  email: string;
  phone: string;
};

export const profileSchema = yup
  .object({
    name: yup.string().required("Вкажіть ім'я"),
    email: yup
      .string()
      .required("Вкажіть email")
      .email("Некоректний email"),
    phone: yup
      .string()
      .required("Вкажіть телефон")
      .matches(/^\+380\d{9}$/, "Вкажіть телефон у форматі +380XXXXXXXXX"),
  })
  .required();
