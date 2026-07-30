"use client";

import { useEffect } from "react";

type ToastProps = {
  message: string;
  onClose: () => void;
  duration?: number;
};

export default function Toast({ message, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  return (
    <div className="fixed top-4 left-1/2 z-50 -translate-x-1/2">
      <div className="rounded-md border border-[var(--error)] bg-[var(--surface)] px-4 py-3 text-sm font-medium text-[var(--error)]">
        {message}
      </div>
    </div>
  );
}
