import type { ReactNode } from "react";
/** Quiet editorial panel. Compose explicit links rather than implying a click target. */
export function EditorialCard({
  children,
  labelledBy,
}: {
  children: ReactNode;
  labelledBy: string;
}) {
  return (
    <article className="editorial-card" aria-labelledby={labelledBy}>
      {children}
    </article>
  );
}
