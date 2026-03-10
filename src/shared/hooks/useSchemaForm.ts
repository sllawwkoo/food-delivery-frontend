import { useMemo } from "react";
import {
  Controller,
  type FieldErrors,
  type FieldValues,
  type UseFormProps,
  type UseFormReturn,
  useForm,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { AnyObjectSchema } from "yup";

type UseSchemaFormOptions<TFieldValues extends FieldValues> = {
  schema: AnyObjectSchema;
} & UseFormProps<TFieldValues>;

type UseSchemaFormField<TFieldValues extends FieldValues> = {
  Controller: typeof Controller;
  errors: FieldErrors<TFieldValues>;
};

export type UseSchemaFormReturn<TFieldValues extends FieldValues> =
  UseFormReturn<TFieldValues> & {
    field: UseSchemaFormField<TFieldValues>;
  };

export function useSchemaForm<TFieldValues extends FieldValues>({
  schema,
  ...formProps
}: UseSchemaFormOptions<TFieldValues>): UseSchemaFormReturn<TFieldValues> {
  const form = useForm<TFieldValues>({
    ...formProps,
    resolver: yupResolver(schema),
  });

  const field = useMemo<UseSchemaFormField<TFieldValues>>(
    () => ({
      Controller,
      errors: form.formState.errors,
    }),
    [form.formState.errors]
  );

  return { ...form, field };
}

export default useSchemaForm;

