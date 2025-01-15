"use client";

import React from "react";
import styles from "./button.module.css";
import { Logo } from "@/components";
import { useRouter } from "next/navigation";

export function FooterButton() {
  const router = useRouter();
  return (
    <button
      className={styles.footer_button}
      onClick={() => router.push("https://clev.kr")}
    >
      <Logo height={21} />
    </button>
  );
}
