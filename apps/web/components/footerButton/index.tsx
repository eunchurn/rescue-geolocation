"use client";

import React from "react";
import { Logo } from "@/components";
import { useRouter } from "next/navigation";

export function FooterButton() {
  const router = useRouter();
  return (
    <button
      className="h-8 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center"
      onClick={() => router.push("https://idlerecord.com")}
    >
      <Logo height={21} />
    </button>
  );
}
