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

function ActiveKineticClosing({ children }: { children: ReactNode }) {
  const target = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start end", "end end"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 35,
    mass: 0.8,
  });

  const textShift = useTransform(smooth, [0, 1], ["24px", "-24px"]);
  const scale = useTransform(smooth, [0, 1], [0.96, 1.02]);

  return (
    <motion.div
      ref={target}
      className="kinetic-closing-wrapper"
      style={
        {
          "--kinetic-shift": textShift,
          "--kinetic-scale": scale,
        } as MotionStyle
      }
    >
      {children}
    </motion.div>
  );
}

export function KineticClosing({ children }: { children: ReactNode }) {
  const capable = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  if (!capable) {
    return <div className="kinetic-closing-wrapper">{children}</div>;
  }

  return <ActiveKineticClosing>{children}</ActiveKineticClosing>;
}
