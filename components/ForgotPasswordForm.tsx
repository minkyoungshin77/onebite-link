"use client";

import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Toast from "./Toast";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSent, setIsSent] = useState(false);

  const isFormFilled = email.trim() !== "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || !isFormFilled) return;

    setIsSubmitting(true);
    setErrorMessage("");
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        setErrorMessage("비밀번호 리셋 링크 발송에 실패했습니다.");
        return;
      }

      setIsSent(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--background)] px-6">
      <div className="w-full max-w-sm">
        <h1 className="mb-8 text-center text-2xl font-bold text-[var(--text)]">
          한입 링크
        </h1>

        {isSent ? (
          <p className="text-center text-sm text-[var(--text)]">
            입력하신 이메일로 비밀번호 리셋 링크를 보냈습니다. 메일함을
            확인해주세요.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-[var(--text)]"
              >
                이메일
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="rounded-md border border-[var(--border)] px-3 py-2 text-base text-[var(--text)] outline-none placeholder:text-[var(--placeholder)] focus:border-[var(--accent)]"
              />
            </div>

            <button
              type="submit"
              disabled={!isFormFilled || isSubmitting}
              className="mt-2 rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isSubmitting ? "발송 중..." : "비밀번호 리셋 링크 발송"}
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-[var(--text-sub)]">
          <Link href="/login" className="text-[var(--accent)] hover:underline">
            로그인으로 돌아가기
          </Link>
        </p>
      </div>

      {errorMessage && (
        <Toast message={errorMessage} onClose={() => setErrorMessage("")} />
      )}
    </div>
  );
}
