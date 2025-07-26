import React from "react";

interface SnackbarProps {
  isActive: boolean;
  message: string;
}

export function Snackbar(props: SnackbarProps) {
  const { isActive, message } = props;
  return (
    <div
      className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 px-6 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-xl shadow-lg transition-all duration-300 z-50 ${
        isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
      }`}
    >
      {message}
    </div>
  );
}
