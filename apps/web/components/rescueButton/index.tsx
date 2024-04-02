"use client";

import styles from "./rescue.module.css";
import React from "react";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";

export function RescueButton() {
  const router = useRouter();
  const handleCreate = React.useCallback(() => {
    router.push(`/create/${nanoid(6)}`);
  }, [router]);
  return (
    <button
      className={[styles.button, styles.buttonHelp].join(" ")}
      onClick={handleCreate}
    >
      구조링크 생성
    </button>
  );
}
