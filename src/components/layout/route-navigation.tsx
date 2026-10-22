"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { isNavigationActive, navigation } from "@/config/navigation";

export function RouteNavigation({
  mobile = false,
  onNavigate,
}: {
  mobile?: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState<string | null>(null);
  const root = useRef<HTMLUListElement>(null);
  const prefix = mobile ? "mobile" : "desktop";

  useEffect(() => {
    function dismiss(event: PointerEvent) {
      if (event.target instanceof Node && !root.current?.contains(event.target))
        setExpanded(null);
    }
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, []);

  return (
    <ul
      className={`route-navigation ${mobile ? "route-navigation--mobile" : "route-navigation--desktop"}`}
      ref={root}
    >
      {navigation
        .filter((item) => item.visible)
        .map((item) => {
          const open = expanded === item.id;
          const active = isNavigationActive(pathname, item);
          return (
            <li
              key={item.id}
              className="route-group"
              data-active={active || undefined}
              onPointerEnter={(event) => {
                if (!mobile && event.pointerType === "mouse" && item.children)
                  setExpanded(item.id);
              }}
              onPointerLeave={(event) => {
                if (
                  !mobile &&
                  event.pointerType === "mouse" &&
                  !event.currentTarget.contains(document.activeElement)
                )
                  setExpanded(null);
              }}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget))
                  setExpanded(null);
              }}
              onKeyDown={(event) => {
                if (event.key === "Escape" && open) {
                  event.preventDefault();
                  event.stopPropagation();
                  setExpanded(null);
                  event.currentTarget.querySelector("button")?.focus();
                }
              }}
            >
              <div className="route-group__row">
                <Link
                  className="nav-link"
                  href={item.href}
                  aria-current={
                    pathname === item.href
                      ? "page"
                      : active
                        ? "location"
                        : undefined
                  }
                  onClick={() => {
                    setExpanded(null);
                    onNavigate?.();
                  }}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <button
                    className="route-toggle"
                    type="button"
                    aria-label={`${item.label} submenu`}
                    aria-expanded={open}
                    aria-controls={`${prefix}-${item.id}`}
                    onClick={() => setExpanded(open ? null : item.id)}
                  >
                    <span aria-hidden="true">⌄</span>
                  </button>
                )}
              </div>
              {item.children && (
                <div
                  id={`${prefix}-${item.id}`}
                  className="route-panel"
                  hidden={!open}
                  inert={!open}
                >
                  <p className="route-panel__intro">{item.description}</p>
                  <ul>
                    {item.children
                      .filter((child) => child.visible)
                      .map((child) => (
                        <li key={child.id}>
                          <Link
                            href={child.href}
                            aria-current={
                              pathname === child.href
                                ? "page"
                                : isNavigationActive(pathname, child)
                                  ? "location"
                                  : undefined
                            }
                            onClick={() => {
                              setExpanded(null);
                              onNavigate?.();
                            }}
                          >
                            <span>{child.label}</span>
                            <span aria-hidden="true">↗</span>
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </li>
          );
        })}
    </ul>
  );
}
