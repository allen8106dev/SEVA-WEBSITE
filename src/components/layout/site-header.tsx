"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/layout";
import { MobileNavigation } from "./mobile-navigation";
import { NavigationLinks } from "./navigation";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 60);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`site-header ${scrolled ? "site-header--floating" : ""}`}
      data-scrolled={scrolled ? "true" : "false"}
    >
      <Container width="wide" className="header-inner">
        <div className="wordmark-lockup">
          <Link
            href="/"
            className="wordmark"
            aria-label="SEVA Social Service Society home"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/seva-logo.png"
              alt=""
              className="wordmark-logo-emblem"
              width={36}
              height={32}
              aria-hidden="true"
            />
            <span className="wordmark__lettering">SEVA</span>
            <span className="wordmark__dot" aria-hidden="true" />
          </Link>
          <span className="wordmark-note">
            Love In Action
            <br />
            Est. 2015
          </span>
        </div>
        <nav aria-label="Main navigation" className="desktop-nav">
          <NavigationLinks />
        </nav>
        <MobileNavigation />
      </Container>
    </header>
  );
}
