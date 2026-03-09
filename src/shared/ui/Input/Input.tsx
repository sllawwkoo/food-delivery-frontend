import { forwardRef } from "react";
import type { InputProps } from "./types";
import styles from "./Input.module.scss";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className, ...rest }, ref) => {
    const hasError = Boolean(error);
    const showHint = hint && !hasError;

    const inputClassName = [styles.input, hasError ? styles.inputError : "", className]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={styles.root}>
        {label && <label className={styles.label}>{label}</label>}

        <div className={styles.fieldWrapper}>
          <input ref={ref} className={inputClassName} {...rest} />
        </div>

        <div className={styles.support}>
          {hasError ? (
            <span className={styles.error}>{error}</span>
          ) : showHint ? (
            <span className={styles.hint}>{hint}</span>
          ) : null}
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";

