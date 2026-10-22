"use client";

import type { ReactNode } from "react";

export function Marquee({
  children,
  className = "",
  direction = "left",
}: {
  children: ReactNode;
  className?: string;
  direction?: "left" | "right";
}) {
  return (
    <div
      className={`kinetic-marquee ${direction === "right" ? "kinetic-marquee--reverse" : ""} ${className}`}
      role="region"
      aria-label="Editorial announcement"
    >
      <div className="kinetic-marquee__inner">
        <div className="kinetic-marquee__track">{children}</div>
        <div className="kinetic-marquee__track" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
