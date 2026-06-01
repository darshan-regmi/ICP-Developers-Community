export function MonoLabel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`font-mono uppercase text-meta tracking-[0.08em] opacity-70 ${className}`}
    >
      {children}
    </span>
  );
}
