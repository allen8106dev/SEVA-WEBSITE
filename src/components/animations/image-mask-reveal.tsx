"use client";

import { useRef, useSyncExternalStore, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionStyle,
} from "motion/react";

const capabilityQuery =
  "(min-width: 48rem) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

function subscribe(callback: () => void) {
  const query = window.matchMedia(capabilityQuery);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(capabilityQuery).matches;
}

function getServerSnapshot() {
  return false;
}

function ActiveMaskReveal({ children }: { children: ReactNode }) {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "center center"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 38,
    mass: 0.7,
  });

  // Mask expands from inset crop to full container
  const clipInset = useTransform(
    smoothProgress,
    [0, 1],
    ["inset(10% 8% 10% 8% round 16px)", "inset(0% 0% 0% 0% round 16px)"],
  );
  const scale = useTransform(smoothProgress, [0, 1], [1.12, 1]);

  return (
    <motion.div
      ref={container}
      className="mask-reveal-container"
      style={
        {
          clipPath: clipInset,
          WebkitClipPath: clipInset,
        } as MotionStyle
      }
    >
      <motion.div
        className="mask-reveal-inner"
        style={{ scale } as MotionStyle}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export function ImageMaskReveal({ children }: { children: ReactNode }) {
  const capable = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  if (!capable) {
    return <div className="mask-reveal-container">{children}</div>;
  }

  return <ActiveMaskReveal>{children}</ActiveMaskReveal>;
}
