import { useState } from "react";
import { Input } from "@/shared/ui/Input";
import {
  loginSchema,
  type LoginFormValues,
  type LoginMode,
} from "@/shared/lib/validation/loginSchema";
import { useSchemaForm } from "@/shared/hooks/useSchemaForm";
import { useLogin } from "../model/useLogin";
import styles from "./LoginForm.module.scss";

export function LoginForm() {
  const [mode, setMode] = useState<LoginMode>("email");

  const form = useSchemaForm<LoginFormValues>({
    schema: loginSchema,
    defaultValues: {
      mode: "email",
      email: "",
      phone: "+380",
      password: "",
    },
    mode: "onChange",
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
    setValue,
  } = form;

  const { login } = useLogin();

  const onSubmit = handleSubmit(async (data) => {
    const identifier = data.mode === "email" ? data.email ?? "" : data.phone ?? "";

    try {
      await login({
        identifier,
        password: data.password,
      });
    } catch (error) {
      setError("root", {
        type: "server",
        message: "Не вдалося увійти. Перевірте дані та спробуйте ще раз.",
      });
      console.error(error);
    }
  });

  const handleModeChange = (nextMode: LoginMode) => {
    setMode(nextMode);
    setValue("mode", nextMode);
    clearErrors(["email", "phone"]);

    if (nextMode === "email") {
      setValue("phone", "");
    } else {
      setValue("email", "");
    }
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <input type="hidden" {...register("mode")} />

      <div className={styles.tabs}>
        <button
          type="button"
          className={`${styles.tab} ${mode === "email" ? styles.activeTab : ""}`}
          onClick={() => handleModeChange("email")}
        >
          Email
        </button>
        <button
          type="button"
          className={`${styles.tab} ${mode === "phone" ? styles.activeTab : ""}`}
          onClick={() => handleModeChange("phone")}
        >
          Телефон
        </button>
      </div>

      {mode === "email" ? (
        <Input
          id="login-email"
          label="Email"
          placeholder="Email"
          autoComplete="username"
          error={errors.email?.message}
          {...register("email")}
        />
      ) : (
        <Input
          id="login-phone"
          label="Телефон"
          placeholder="+380XXXXXXXXX"
          maxLength={13}
          autoComplete="tel"
          error={errors.phone?.message}
          {...register("phone")}
        />
      )}

      <Input
        id="login-password"
        type="password"
        label="Пароль"
        placeholder="Пароль"
        autoComplete="current-password"
        error={errors.password?.message}
        {...register("password")}
      />

      {errors.root?.message && (
        <p className={styles.formError}>{errors.root.message}</p>
      )}

      <button className={styles.submit} type="submit" disabled={isSubmitting}>
        Увійти
      </button>
    </form>
  );
}

