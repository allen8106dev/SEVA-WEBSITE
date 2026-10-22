"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useRef } from "react";
import { motionTokens } from "@/config/motion";

/** Only verified numeric values use this component. Assistive technology always gets the final value. */
export function CountValue({
  value,
  prefix = "",
  suffix = "",
  maximumFractionDigits = motionTokens.count.maximumFractionDigits,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  maximumFractionDigits?: number;
}) {
  const scope = useRef<HTMLSpanElement>(null);
  const display = useRef<HTMLSpanElement>(null);
  const entered = useInView(scope, {
    once: true,
    amount: motionTokens.viewport.amount,
  });
  const reduced = useReducedMotion();
  const formatter = useMemo(
    () => new Intl.NumberFormat("en", { maximumFractionDigits }),
    [maximumFractionDigits],
  );
  const final = `${prefix}${formatter.format(value)}${suffix}`;
  useEffect(() => {
    const element = display.current;
    if (!element || !entered || reduced !== false || !Number.isFinite(value))
      return;
    const controls = animate(0, value, {
      duration: motionTokens.count.duration,
      ease: motionTokens.ease,
      onUpdate: (current) => {
        element.textContent = `${prefix}${formatter.format(current)}${suffix}`;
      },
      onComplete: () => {
        element.textContent = final;
      },
    });
    return () => {
      controls.stop();
      element.textContent = final;
    };
  }, [entered, reduced, value, formatter, prefix, suffix, final]);
  return (
    <span ref={scope} className="count-value" data-count-value>
      <span className="sr-only">{final}</span>
      <span ref={display} aria-hidden="true">
        {final}
      </span>
    </span>
  );
}
