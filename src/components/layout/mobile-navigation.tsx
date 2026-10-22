"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { NavigationLinks } from "./navigation";
import { RouteNavigation } from "./route-navigation";
import { usePathname } from "next/navigation";

export function MobileNavigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: PointerEvent) {
      if (event.target instanceof Node && !root.current?.contains(event.target))
        setOpen(false);
    }
    const desktop = window.matchMedia("(min-width: 48rem)");
    function onBreakpoint() {
      if (desktop.matches) setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [open]);

  return (
    <div
      className="mobile-nav"
      ref={root}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          setOpen(false);
          toggle.current?.focus();
        }
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <Button
        ref={toggle}
        className="menu-toggle"
        variant="secondary"
        type="button"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen(!open)}
      >
        <span className="menu-toggle__label">{open ? "Close" : "Menu"}</span>
        <span className="menu-toggle__icon" aria-hidden="true">
          {open ? "−" : "+"}
        </span>
      </Button>
      <nav
        id="mobile-navigation"
        aria-label="Mobile navigation"
        className="mobile-panel"
        hidden={!open}
        inert={!open}
        aria-hidden={!open}
      >
        <div className="mobile-panel__badge" aria-hidden="true">
          <span>NAVIGATION</span>
          <span>EST. 2015</span>
        </div>
        <div className="mobile-panel__links">
          <RouteNavigation
            key={open ? "open" : "closed"}
            mobile
            onNavigate={() => {
              setOpen(false);
              toggle.current?.focus();
            }}
          />
          {pathname === "/" && (
            <>
              <p className="route-panel__intro">On this homepage</p>
              <NavigationLinks
                onNavigate={() => {
                  setOpen(false);
                  toggle.current?.focus();
                }}
              />
            </>
          )}
        </div>
        <div className="mobile-panel__footer" aria-hidden="true">
          <span className="mobile-panel__status-dot" />
          <span>Love In Action · SEVA</span>
        </div>
      </nav>
    </div>
  );
}
