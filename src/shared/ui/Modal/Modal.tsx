import type { ReactNode, MouseEvent } from "react";
import { useEffect, useRef } from "react";
import styles from "./Modal.module.scss";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  ariaLabelledBy?: string;
  children: ReactNode;
};

export function Modal({ isOpen, onClose, ariaLabelledBy, children }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const lastActiveElementRef = useRef<HTMLElement | null>(null);

  if (!isOpen) {
    return null;
  }

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    lastActiveElementRef.current = document.activeElement as HTMLElement | null;

    if (contentRef.current) {
      const focusable = contentRef.current.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      (focusable ?? contentRef.current).focus();
    }

    return () => {
      if (lastActiveElementRef.current) {
        lastActiveElementRef.current.focus();
      }
    };
  }, [isOpen]);

  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      ref={overlayRef}
      className={styles.overlay}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={ariaLabelledBy}
    >
      <div ref={contentRef} className={styles.content} tabIndex={-1}>
        {children}
      </div>
    </div>
  );
}

