import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "@/shared/ui/Input";
import styles from "./CheckoutForm.module.scss";

type CheckoutFormValues = {
  name: string;
  phone: string;
  address: string;
};

const checkoutSchema = yup.object({
  name: yup
    .string()
    .required("Вкажіть ім'я")
    .min(2, "Мінімум 2 символи"),
  phone: yup
    .string()
    .required("Вкажіть телефон")
    .matches(/^[0-9+\-\s()]{7,}$/, "Вкажіть коректний номер телефону"),
  address: yup
    .string()
    .required("Вкажіть адресу доставки")
    .min(5, "Мінімум 5 символів"),
}) as yup.ObjectSchema<CheckoutFormValues>;

export function CheckoutForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({
    resolver: yupResolver(checkoutSchema),
    mode: "onBlur",
  });

  const onSubmit = useCallback(
    (values: CheckoutFormValues) => {
      // TODO: інтегрувати з бекендом /api/orders
      // Поки що просто лог для розробки.
      // eslint-disable-next-line no-console
      console.log("Checkout submit:", values);
    },
    []
  );

  return (
    <form className={styles.root} onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2 className={styles.title}>Дані для доставки</h2>
      <p className={styles.description}>
        Заповніть, будь ласка, інформацію для оформлення замовлення.
      </p>

      <div className={styles.fields}>
        <Input
          label="Імʼя"
          placeholder="Як до вас звертатися?"
          {...register("name")}
          error={errors.name?.message}
        />
        <Input
          label="Телефон"
          placeholder="+380..."
          {...register("phone")}
          error={errors.phone?.message}
        />
        <Input
          label="Адреса доставки"
          placeholder="Місто, вулиця, будинок, квартира"
          {...register("address")}
          error={errors.address?.message}
        />
      </div>

      <button type="submit" className={styles.submit} disabled={isSubmitting}>
        Підтвердити замовлення
      </button>
    </form>
  );
}

