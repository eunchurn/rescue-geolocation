"use client";
import { useId, useRef, useState } from "react";
import { Icon } from ".";
export function ShareLink({ link }: { link: string }) {
  const inputId = useId();
  const input = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState("");
  async function copy() {
    try {
      await navigator.clipboard.writeText(link);
      setMessage("링크를 복사했어요. 문자나 메신저에 붙여넣어주세요.");
    } catch {
      input.current?.select();
      setMessage("주소를 길게 누르거나 선택해 직접 복사해주세요.");
    }
  }
  async function share() {
    if (!navigator.share) {
      await copy();
      return;
    }
    try {
      await navigator.share({
        title: "구조 · 위치 공유 요청",
        text: "현재 위치를 알려주세요. 링크를 열고 위치 공유를 시작해주세요.",
        url: link,
      });
    } catch (e) {
      if ((e as Error).name !== "AbortError")
        setMessage("공유하지 못했어요. 링크를 복사해 전달해주세요.");
    }
  }
  return (
    <div className="share-box">
      <label htmlFor={inputId}>도움이 필요한 분에게 보낼 링크</label>
      <div className="link-field">
        <input id={inputId} ref={input} readOnly value={link} />
        <button onClick={copy}>복사</button>
      </div>
      <button className="primary-button" onClick={share}>
        링크 보내기
        <Icon name="arrow" size={20} />
      </button>
      <p className="feedback" role="status">
        {message || "문자, 카카오톡 등 평소 사용하는 방법으로 보내주세요."}
      </p>
    </div>
  );
}
