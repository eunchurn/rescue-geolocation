import React from "react";
import styles from "./snackbar.module.css";

interface SnackbarProps {
  isActive: boolean;
  message: string;
}

export function Snackbar(props: SnackbarProps) {
  const { isActive, message } = props;
  return (
    <div
      className={
        isActive
          ? [styles.snackbar, styles.fadeIn].join(" ")
          : [styles.snackbar, styles.fadeOut].join(" ")
      }
    >
      {message}
    </div>
  );
}
