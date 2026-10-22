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

function ActiveHeroScroll({ children }: { children: ReactNode }) {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 35,
    mass: 0.6,
  });

  const photoY = useTransform(smoothProgress, [0, 1], ["0px", "32px"]);
  const photoScale = useTransform(smoothProgress, [0, 1], [1, 1.04]);
  const opacity = useTransform(smoothProgress, [0, 0.85, 1], [1, 0.95, 0.8]);

  return (
    <motion.div
      ref={container}
      className="hero-scroll-wrapper"
      style={
        {
          "--hero-scroll-y": photoY,
          "--hero-scroll-scale": photoScale,
          opacity,
        } as MotionStyle
      }
    >
      {children}
    </motion.div>
  );
}

export function HeroScroll({ children }: { children: ReactNode }) {
  const capable = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  if (!capable) {
    return <div className="hero-scroll-wrapper">{children}</div>;
  }

  return <ActiveHeroScroll>{children}</ActiveHeroScroll>;
}
