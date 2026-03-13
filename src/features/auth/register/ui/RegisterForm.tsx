import { useNavigate } from "react-router-dom";
import { useSchemaForm } from "@/shared/hooks/useSchemaForm";
import { Input } from "@/shared/ui/Input";
import { registerSchema, type RegisterFormValues } from "@/shared/lib/validation/registerSchema";
import { useRegisterMutation } from "@/features/auth";
import { frontRoutes } from "@/shared/config/routes/frontRoutes";
import styles from "./RegisterForm.module.scss";

export function RegisterForm() {
  const navigate = useNavigate();
  const [registerMutation, { isLoading }] = useRegisterMutation();

  const form = useSchemaForm<RegisterFormValues>({
    schema: registerSchema,
    defaultValues: {
      name: "",
      phone: "+380",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = form;

  const onSubmit = handleSubmit(async (data) => {
    const { confirmPassword, ...payload } = data;

    try {
      const result = await registerMutation(payload).unwrap();

      if (result?.data?.user) {
        navigate(frontRoutes.pages.HomePage.navigationPath);
      }
    } catch (error) {
      setError("root", {
        type: "server",
        message: "Не вдалося зареєструватися. Спробуйте ще раз.",
      });
      // eslint-disable-next-line no-console
      console.error(error);
    }
  });

  const submitting = isSubmitting || isLoading;

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <Input
        label="Ім'я"
        placeholder="Ваше ім'я"
        autoComplete="name"
        error={errors.name?.message}
        {...register("name")}
      />

      <Input
        label="Телефон"
        placeholder="+380XXXXXXXXX"
        maxLength={13}
        autoComplete="tel"
        error={errors.phone?.message}
        {...register("phone")}
      />

      <Input
        label="Email"
        placeholder="Email"
        autoComplete="email"
        error={errors.email?.message}
        {...register("email")}
      />

      <Input
        type="password"
        label="Пароль"
        placeholder="Пароль"
        autoComplete="new-password"
        error={errors.password?.message}
        {...register("password")}
      />

      <Input
        type="password"
        label="Підтвердіть пароль"
        placeholder="Підтвердіть пароль"
        autoComplete="new-password"
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />

      {errors.root?.message && <p className={styles.formError}>{errors.root.message}</p>}

      <button className={styles.submit} type="submit" disabled={submitting}>
        Зареєструватися
      </button>
    </form>
  );
}

