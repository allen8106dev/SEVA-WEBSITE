"use client";

import { useEffect, useRef, type ReactNode } from "react";

const HOME_LINK_EVENT = "seva:home-link";

export function HomeHeroCopy({ children }: { children: ReactNode }) {
  const copy = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function replayIntro() {
      const element = copy.current;
      if (!element) return;

      element.classList.remove("home-hero__copy--intro");
      void element.offsetWidth;
      element.classList.add("home-hero__copy--intro");
    }

    window.addEventListener(HOME_LINK_EVENT, replayIntro);
    return () => window.removeEventListener(HOME_LINK_EVENT, replayIntro);
  }, []);

  return (
    <div ref={copy} className="home-hero__copy home-hero__copy--intro">
      {children}
    </div>
  );
}
