"use client";

import { useRef, useSyncExternalStore, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionStyle,
} from "motion/react";
import { motionTokens } from "@/config/motion";

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

/** Mount the scroll subscription only on supported, non-reduced-motion devices. */
function ActiveScrollMedia({ children }: { children: ReactNode }) {
  const target = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target,
    offset: [...motionTokens.parallax.offset],
  });
  const progress = useSpring(scrollYProgress, motionTokens.spring);
  const y = useTransform(
    progress,
    [0, 1],
    [
      `${motionTokens.parallax.distance}px`,
      `${-motionTokens.parallax.distance}px`,
    ],
  );
  return (
    <motion.div
      ref={target}
      className="scroll-media__layer"
      data-parallax-layer
      data-motion-active="true"
      style={{ "--parallax-y": y } as MotionStyle}
    >
      {children}
    </motion.div>
  );
}

/** Only the image within the reserved frame moves; captions and layout stay fixed. */
export function ScrollMedia({
  children,
  mediaKind = "image",
}: {
  children: ReactNode;
  mediaKind?: "image" | "illustration" | "video";
}) {
  const capable = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  return (
    <div className="scroll-media" data-scroll-media>
      {capable && mediaKind !== "video" ? (
        <ActiveScrollMedia>{children}</ActiveScrollMedia>
      ) : (
        <div
          className="scroll-media__layer"
          data-parallax-layer
          data-motion-active="false"
        >
          {children}
        </div>
      )}
    </div>
  );
}
