import * as yup from "yup";

export type CheckoutFormValues = {
  name: string;
  phone: string;
  address: string;
};

export const checkoutSchema = yup
  .object({
    name: yup
      .string()
      .required("Вкажіть ім'я")
      .min(2, "Ім'я повинно містити щонайменше 2 символи"),
    phone: yup
      .string()
      .required("Вкажіть номер телефону")
      .matches(/^\+380\d{9}$/, "Вкажіть телефон у форматі +380XXXXXXXXX"),
    address: yup
      .string()
      .required("Вкажіть адресу доставки")
      .min(5, "Адреса повинна містити щонайменше 5 символів"),
  })
  .required() as yup.ObjectSchema<CheckoutFormValues>;

