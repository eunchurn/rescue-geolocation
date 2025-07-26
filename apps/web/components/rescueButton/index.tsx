"use client";

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
      className={`btn-primary w-full relative ${!active ? 'opacity-70 cursor-not-allowed' : ''}`}
      onClick={handleCreate}
      disabled={!active}
    >
      {!active && <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>}
      <span className={!active ? 'opacity-0' : ''}>구조링크 생성</span>
    </button>
  );
}
