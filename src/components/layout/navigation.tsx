"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";

/** Tracks the explicit anchor, without scroll listeners or changing the URL on scroll. */
export function NavigationLinks({ onNavigate }: { onNavigate?: () => void }) {
  const [active, setActive] = useState("");
  const pathname = usePathname();
  useEffect(() => {
    function update() {
      setActive(
        window.location.pathname === "/"
          ? window.location.hash || "#introduction"
          : "",
      );
    }
    function onLinkClick(event: MouseEvent) {
      if (
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const anchor =
        event.target instanceof Element
          ? event.target.closest("a[href]")
          : null;
      if (
        !(anchor instanceof HTMLAnchorElement) ||
        anchor.target === "_blank" ||
        anchor.hasAttribute("download")
      )
        return;
      const url = new URL(anchor.href);
      if (
        url.origin === window.location.origin &&
        url.pathname === "/" &&
        siteConfig.navigation.some((item) => item.href === url.hash)
      )
        setActive(url.hash);
    }
    update();
    window.addEventListener("hashchange", update);
    window.addEventListener("popstate", update);
    document.addEventListener("click", onLinkClick);
    return () => {
      window.removeEventListener("hashchange", update);
      window.removeEventListener("popstate", update);
      document.removeEventListener("click", onLinkClick);
    };
  }, [pathname]);
  return siteConfig.navigation.map((item) => (
    <Link
      className="nav-link"
      key={item.href}
      href={`/${item.href}`}
      aria-current={active === item.href ? "location" : undefined}
      onClick={() => {
        setActive(item.href);
        onNavigate?.();
      }}
    >
      {item.label}
    </Link>
  ));
}
