import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthUser } from "@/features/auth";
import { Input } from "@/shared/ui/Input";
import { Loader } from "@/shared/ui/Loader";
import { Modal } from "@/shared/ui/Modal";
import { useSchemaForm } from "@/shared/hooks/useSchemaForm";
import {
  checkoutSchema,
  type CheckoutFormValues,
} from "@/shared/lib/validation/checkoutSchema";
import { clearCart } from "@/entities/cart";
import { useCheckout } from "@/features/order/checkout";
import styles from "./CheckoutForm.module.scss";

export function CheckoutForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectAuthUser);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { placeOrder, isLoading } = useCheckout();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useSchemaForm<CheckoutFormValues>({
    schema: checkoutSchema,
    defaultValues: {
      name: "",
      phone: "+380",
      address: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    reset({
      name: user?.name ?? "",
      phone: user?.phone ?? "+380",
      address: "",
    });
  }, [user, reset]);

  const onSubmit = useCallback(
    async (values: CheckoutFormValues) => {
      setSubmitError(null);
      try {
        await placeOrder(values);
        reset();
        setIsSuccessOpen(true);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Failed to place order", error);
        setSubmitError("Не вдалося оформити замовлення. Спробуйте ще раз.");
      }
    },
    [placeOrder, reset]
  );

  return (
    <>
      <form className={styles.root} onSubmit={handleSubmit(onSubmit)} noValidate>
        <h2 className={styles.title}>Дані для доставки</h2>
        <p className={styles.description}>
          Заповніть, будь ласка, інформацію для оформлення замовлення.
        </p>

        <div className={styles.fields}>
          <Input
            id="checkout-name"
            label="Імʼя"
            placeholder="Як до вас звертатися?"
            {...register("name")}
            error={errors.name?.message}
          />
          <Input
            id="checkout-phone"
            label="Телефон"
            type="tel"
            placeholder="+380XXXXXXXXX"
            maxLength={13}
            {...register("phone")}
            error={errors.phone?.message}
          />
          <Input
            id="checkout-address"
            label="Адреса доставки"
            placeholder="Місто, вулиця, будинок, квартира"
            {...register("address")}
            error={errors.address?.message}
          />
        </div>

        <button
          type="submit"
          className={styles.submit}
          disabled={!isValid || isSubmitting || isLoading}
        >
          {isSubmitting || isLoading ? (
            <Loader size="small" />
          ) : (
            "Підтвердити замовлення"
          )}
        </button>

        {submitError && <p className={styles.error}>{submitError}</p>}
      </form>

      <Modal
        isOpen={isSuccessOpen}
        onClose={() => {
          setIsSuccessOpen(false);
        }}
        ariaLabelledBy="checkout-success-title"
      >
        <div>
          <div className={styles.successIcon}>🎉</div>
          <h2 id="checkout-success-title" className={styles.successTitle}>
            Замовлення успішно оформлено
          </h2>
          <p className={styles.successText}>
            Ваше замовлення прийнято рестораном.
          </p>
          <button
            type="button"
            className={styles.submit}
            onClick={() => {
              dispatch(clearCart());
              navigate("/");
            }}
          >
            На головну
          </button>
        </div>
      </Modal>
    </>
  );
}

