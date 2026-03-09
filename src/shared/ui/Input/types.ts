import type { ComponentProps } from "react";

export type InputProps = {
  /**
   * Підпис над полем вводу.
   */
  label?: string;
  /**
   * Текст помилки під полем.
   */
  error?: string;
  /**
   * Підказка під полем (показується тільки якщо немає помилки).
   */
  hint?: string;
} & ComponentProps<"input">;

