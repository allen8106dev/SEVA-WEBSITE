"use client";

import { motion, useReducedMotion } from "motion/react";
import { motionTokens } from "@/config/motion";

export function SplitReveal({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const reducedMotion = useReducedMotion();
  const words = text.split(" ");

  return (
    <span className={`split-reveal-text ${className}`}>
      {words.map((word, index) => (
        <span key={index} className="split-reveal-word-mask">
          <motion.span
            className="split-reveal-word"
            initial={false}
            whileInView={
              reducedMotion === false
                ? { y: [28, 0], opacity: [0.3, 1] }
                : undefined
            }
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: motionTokens.reveal,
              ease: motionTokens.ease,
              delay: delay + index * 0.045,
            }}
          >
            {word}
            {index < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
