"use client";

import { useEffect, useState } from "react";

export function LiveTime() {
  const [time, setTime] = useState<string>("--:--:--");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const utc = now.getTime() + now.getTimezoneOffset() * 60_000;
      const nepal = new Date(utc + (5 * 60 + 45) * 60_000);
      const hh = String(nepal.getHours()).padStart(2, "0");
      const mm = String(nepal.getMinutes()).padStart(2, "0");
      const ss = String(nepal.getSeconds()).padStart(2, "0");
      setTime(`${hh}:${mm}:${ss}`);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="font-mono text-meta tracking-[0.08em] tabular-nums">
      {time}
    </span>
  );
}
