"use client";

import React from "react";
import styles from "./created.module.css";
import { Button, Snackbar } from "@/components";
import { useRouter } from "next/navigation";
import { useSnackbar } from "@/hooks";

interface CreatedLocationProps {
  link: string;
  trackingLink: string;
}
export function CreatedLocation(props: CreatedLocationProps) {
  const { link, trackingLink } = props;
  const inputRef = React.useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { isActive, message, openSnackBar } = useSnackbar();
  const handleCopy = () => {
    if (inputRef.current) {
      navigator.clipboard.writeText(link);
      openSnackBar("주소를 클립보드로 복사했습니다.");
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.eyeContainer}>
        <div className={styles.eye}></div>
      </div>
      <div>아래 링크를 조난자에게 공유해주세요.</div>
      <div>
        조난자가 링크를 클릭하면 추적 시작하기 클릭하여 조난자의 위치를 공유
        받을 수 있습니다.
      </div>
      <div className={styles.inputContainer}>
        <input
          ref={inputRef}
          type="text"
          value={link}
          onChange={() => void 0}
        />
        <button className={styles.copyButton} onClick={handleCopy}>
          복사
        </button>
      </div>
      <Snackbar isActive={isActive} message={message} />
      <div className={styles.startButton}>
        <Button
          onClick={() => {
            router.push(trackingLink);
          }}
        >
          추적 시작하기
        </Button>
        <Button
          onClick={() => {
            router.push("/");
            router.refresh();
          }}
        >
          처음으로 돌아가기
        </Button>
      </div>
    </div>
  );
}
