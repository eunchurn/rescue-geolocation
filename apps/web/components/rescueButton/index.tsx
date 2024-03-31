"use client";

import { useRouter } from "next/navigation";
import styles from "./rescue.module.css";

export function RescueButton() {
  const router = useRouter();
  return (
    <button
      className={[styles.button, styles.buttonHelp].join(" ")}
      onClick={() => {
        router.push("/create")
      }}
    >
      구조링크 생성
    </button>
  );
}
