"use client";
import { useState } from "react";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/experience";
import { Spinner } from "@/components/experience/loading";
export function RescueButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  return (
    <button
      className="primary-button"
      disabled={busy}
      aria-busy={busy}
      onClick={() => {
        setBusy(true);
        router.push(`/create/${nanoid(12)}`);
      }}
    >
      {busy ? "링크를 만들고 있어요…" : "위치 공유 링크 만들기"}
      {busy ? <Spinner small /> : <Icon name="arrow" size={20} />}
    </button>
  );
}
