"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { motionTokens } from "@/config/motion";

/** Content remains visible in server HTML and when JavaScript is disabled. */
export function Reveal({
  children,
  variant = "rise",
  order = 0,
}: {
  children: ReactNode;
  variant?: "rise" | "statement" | "media" | "closing";
  order?: number;
}) {
  const reducedMotion = useReducedMotion();
  const entrance =
    variant === "statement"
      ? {
          x: [-motionTokens.statement.distance, 0],
        }
      : variant === "media"
        ? {
            scale: [motionTokens.media.scale, 1],
          }
        : variant === "closing"
          ? {
              scale: [motionTokens.feedback.pressScale, 1],
            }
          : { y: [motionTokens.distance, 0] };
  return (
    <motion.div
      data-reveal={variant}
      className={`reveal reveal--${variant}`}
      initial={false}
      whileInView={reducedMotion === false ? entrance : undefined}
      viewport={{
        once: true,
        amount:
          variant === "media"
            ? motionTokens.viewport.mediaAmount
            : motionTokens.viewport.amount,
      }}
      transition={{
        duration:
          variant === "media"
            ? motionTokens.duration.media
            : motionTokens.reveal,
        ease: motionTokens.ease,
        delay: Math.min(
          order * motionTokens.stagger.area,
          motionTokens.stagger.maximum,
        ),
      }}
    >
      {children}
    </motion.div>
  );
}
