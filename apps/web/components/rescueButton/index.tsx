"use client";

import styles from "./rescue.module.css";
import React from "react";

export function RescueButton() {
  const handleCreate = React.useCallback(() => {
    fetch("/api/create");
  }, []);
  return (
    <button
      className={[styles.button, styles.buttonHelp].join(" ")}
      onClick={handleCreate}
    >
      구조링크 생성
    </button>
  );
}
