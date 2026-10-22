"use client";

import { useRef, useSyncExternalStore } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { motionTokens } from "@/config/motion";

const query = "(prefers-reduced-motion: no-preference)";
function subscribe(callback: () => void) {
  const preference = window.matchMedia(query);
  preference.addEventListener("change", callback);
  return () => preference.removeEventListener("change", callback);
}
function getSnapshot() {
  return window.matchMedia(query).matches;
}
function getServerSnapshot() {
  return false;
}

function ValueRow({
  value,
  index,
  count,
  progress,
}: {
  value: string;
  index: number;
  count: number;
  progress: MotionValue<number>;
}) {
  const emphasis = useTransform(
    progress,
    [index / count, (index + 1) / count],
    [0, 1],
  );
  const x = useTransform(
    emphasis,
    [0, 1],
    [0, -motionTokens.statement.distance],
  );
  return (
    <li className="profile-value">
      <span className="profile-value__number" aria-hidden="true">
        0{index + 1}
      </span>
      <motion.span className="profile-value__word" style={{ x }}>
        {value}
      </motion.span>
      <motion.span
        className="profile-value__rule"
        aria-hidden="true"
        style={{ scaleX: emphasis }}
      />
    </li>
  );
}

function AnimatedValues({ values }: { values: readonly string[] }) {
  const target = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start 85%", "end 35%"],
  });
  const progress = useSpring(scrollYProgress, motionTokens.spring);
  return (
    <ol className="profile-values" ref={target} data-values-active="true">
      {values.map((value, index) => (
        <ValueRow
          key={value}
          value={value}
          index={index}
          count={values.length}
          progress={progress}
        />
      ))}
    </ol>
  );
}

/** Underlines progress with native scroll. Every word is readable before enhancement. */
export function ValueEmphasis({ values }: { values: readonly string[] }) {
  const animate = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  if (animate) return <AnimatedValues values={values} />;
  return (
    <ol className="profile-values" data-values-active="false">
      {values.map((value, index) => (
        <li className="profile-value" key={value}>
          <span className="profile-value__number" aria-hidden="true">
            0{index + 1}
          </span>
          <span className="profile-value__word">{value}</span>
          <span className="profile-value__rule" aria-hidden="true" />
        </li>
      ))}
    </ol>
  );
}
