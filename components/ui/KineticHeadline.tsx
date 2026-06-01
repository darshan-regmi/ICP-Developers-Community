"use client";

import { useEffect, useState } from "react";

export function KineticHeadline({
  variants,
  intervalMs = 5500,
}: {
  variants: string[];
  intervalMs?: number;
}) {
  const [current, setCurrent] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);

  useEffect(() => {
    if (variants.length < 2) return;
    const id = setInterval(() => {
      setCurrent((c) => {
        setPrevious(c);
        return (c + 1) % variants.length;
      });
    }, intervalMs);
    return () => clearInterval(id);
  }, [variants.length, intervalMs]);

  // Drop the outgoing element once its animation is finished.
  useEffect(() => {
    if (previous === null) return;
    const id = setTimeout(() => setPrevious(null), 750);
    return () => clearTimeout(id);
  }, [previous, current]);

  return (
    <span
      className="kinetic-window"
      style={{ height: "1em", minWidth: "8ch" }}
      aria-live="polite"
    >
      {previous !== null && (
        <span key={`out-${previous}`} className="kinetic-out">
          {variants[previous]}
        </span>
      )}
      <span key={`in-${current}`} className="kinetic-in">
        {variants[current]}
      </span>
    </span>
  );
}
