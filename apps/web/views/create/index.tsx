"use client";

import React from "react";
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
    <div className="w-full max-w-md mx-auto p-6 flex flex-col justify-center min-h-screen space-y-8 animate-fade-in">
      {/* Status Icon */}
      <div className="flex justify-center">
        <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center shadow-xl">
          <div className="w-8 h-8 bg-white rounded-full relative">
            <div className="absolute inset-2 bg-emerald-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
      
      {/* Instructions */}
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          구조링크 생성완료
        </h2>
        <div className="space-y-2 text-gray-600 dark:text-gray-300">
          <p>아래 링크를 조난자에게 공유해주세요.</p>
          <p className="text-sm">
            조난자가 링크를 클릭하면 실시간 위치 추적이 시작됩니다.
          </p>
        </div>
      </div>
      
      {/* Link Input */}
      <div className="space-y-3">
        <div className="flex rounded-xl overflow-hidden shadow-lg">
        <input
          ref={inputRef}
          type="text"
          value={link}
          className="flex-1 px-4 py-3 bg-white dark:bg-gray-800 border-0 focus:ring-0 text-sm font-mono"
          onChange={() => void 0}
          readOnly
        />
        <button 
          className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium transition-colors duration-200"
          onClick={handleCopy}
        >
          <span className="text-sm">복사</span>
        </button>
        </div>
      </div>
      
      <Snackbar isActive={isActive} message={message} />
      
      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          className="w-full"
          onClick={() => {
            router.push(trackingLink);
          }}
        >
          추적 시작하기
        </Button>
        <Button
          className="w-full btn-secondary"
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
