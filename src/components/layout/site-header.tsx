"use client";

import { useEffect, useState, type MouseEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/layout";
import { MobileNavigation } from "./mobile-navigation";
import { RouteNavigation } from "./route-navigation";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  function replayHomeIntro(event: MouseEvent<HTMLElement>) {
    const target = event.target;
    if (!(target instanceof Element) || !target.closest('a[href="/"]')) return;
    window.dispatchEvent(new Event("seva:home-link"));
  }

  useEffect(() => {
    // Use hysteresis thresholds to prevent oscillation when the sticky header
    // shrinking causes scrollY to dip below the compact trigger point.
    // Compact at 72px; only expand again once scrollY drops below 20px.
    const COMPACT_AT = 72;
    const EXPAND_AT = 20;

    function onScroll() {
      const y = window.scrollY;
      setScrolled((prev) => {
        if (!prev && y > COMPACT_AT) return true;
        if (prev && y < EXPAND_AT) return false;
        return prev;
      });
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      onClick={replayHomeIntro}
      className={`site-header ${scrolled ? "site-header--floating site-header--compact" : "site-header--expanded"}`}
      data-scrolled={scrolled ? "true" : "false"}
    >
      <Container width="wide" className="header-inner">
        <div className="wordmark-lockup">
          <Link
            href="/"
            className="wordmark"
            aria-label="SEVA Social Service Society home"
          >
            <Image
              src="/images/seva-logo-header.png"
              alt="SEVA Social Service Society official logo"
              className="wordmark-logo-emblem"
              width={443}
              height={431}
              preload
            />
          </Link>
        </div>
        <nav aria-label="Main navigation" className="desktop-nav">
          <RouteNavigation />
          <Link
            className="nav-donate"
            href="/get-involved/donate"
            aria-current={
              pathname === "/get-involved/donate" ? "page" : undefined
            }
          >
            Donate
          </Link>
        </nav>
        <MobileNavigation />
      </Container>
    </header>
  );
}
