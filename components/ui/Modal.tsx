"use client";

import { useEffect } from "react";

export function Modal({
  open,
  onClose,
  title,
  kicker,
  children,
  size = "md",
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  kicker?: string;
  children: React.ReactNode;
  size?: "md" | "lg";
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const widthClass = size === "lg" ? "max-w-4xl" : "max-w-2xl";

  return (
    <div
      className="modal-backdrop flex items-start justify-center px-4 py-12 md:py-20"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className={`modal-panel w-full ${widthClass} relative`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-rule px-6 py-4 md:px-8 md:py-5">
          <div>
            {kicker && (
              <div className="font-mono text-meta uppercase opacity-60 mb-1">
                {kicker}
              </div>
            )}
            <h3 className="font-display font-semibold text-2xl md:text-3xl leading-tight">
              {title}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="font-mono text-meta uppercase border border-rule px-2 py-1 hover:bg-[var(--fg)] hover:text-[var(--bg)] hover:border-[var(--fg)]"
          >
            esc ×
          </button>
        </div>
        <div className="px-6 py-6 md:px-8 md:py-8">{children}</div>
      </div>
    </div>
  );
}
