import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "@/shared/ui/Input";
import { useSchemaForm } from "@/shared/hooks/useSchemaForm";
import {
  profileSchema,
  type ProfileFormValues,
} from "@/shared/lib/validation/profileSchema";
import {
  useUpdateProfileMutation,
} from "@/features/auth/api/authApi";
import { setCredentials, selectAccessToken } from "@/features/auth/api/authSlice";
import type { AuthUser } from "@/features/auth/types/auth.types";
import styles from "./ProfileSettingsForm.module.scss";

type ProfileSettingsFormProps = {
  initialValues: Pick<AuthUser, "name" | "email" | "phone">;
  onSuccess: () => void;
};

export function ProfileSettingsForm({
  initialValues,
  onSuccess,
}: ProfileSettingsFormProps) {
  const dispatch = useDispatch();
  const accessToken = useSelector(selectAccessToken);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const form = useSchemaForm<ProfileFormValues>({
    schema: profileSchema,
    defaultValues: {
      name: initialValues.name ?? "",
      email: initialValues.email ?? "",
      phone: initialValues.phone ?? "",
    },
    mode: "onChange",
  });

  const { register, handleSubmit, formState: { errors, isSubmitting }, setError, reset } = form;

  useEffect(() => {
    reset({
      name: initialValues.name ?? "",
      email: initialValues.email ?? "",
      phone: initialValues.phone ?? "",
    });
  }, [initialValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const result = await updateProfile(data).unwrap();
      if (result?.data?.user && accessToken) {
        dispatch(setCredentials({ user: result.data.user, accessToken }));
      }
      onSuccess();
    } catch {
      setError("root", {
        type: "server",
        message: "Не вдалося оновити профіль. Спробуйте ще раз.",
      });
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
        label="Email"
        type="email"
        placeholder="Email"
        autoComplete="email"
        error={errors.email?.message}
        {...register("email")}
      />
      <Input
        label="Телефон"
        placeholder="+380XXXXXXXXX"
        autoComplete="tel"
        maxLength={13}
        error={errors.phone?.message}
        {...register("phone")}
      />
      {errors.root?.message && (
        <p className={styles.formError}>{errors.root.message}</p>
      )}
      <button className={styles.submit} type="submit" disabled={submitting}>
        Зберегти зміни
      </button>
    </form>
  );
}
