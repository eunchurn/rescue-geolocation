"use client";

import styles from "./rescue.module.css";
import React from "react";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";

export function RescueButton() {
  const router = useRouter();
  const [active, setActive] = React.useState(true);
  const handleCreate = React.useCallback(() => {
    setActive(false);
    router.push(`/create/${nanoid(6)}`);
  }, [router]);
  return (
    <button
      className={[
        styles.button,
        styles.buttonHelp,
        active ? "" : styles.loading,
      ].join(" ")}
      onClick={handleCreate}
      disabled={!active}
    >
      구조링크 생성
    </button>
  );
}
