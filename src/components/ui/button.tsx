import Link from "next/link";
import type { ComponentPropsWithoutRef, ComponentPropsWithRef } from "react";

type Variant = "primary" | "secondary" | "text" | "icon";
export function LoadingIndicator() {
  return <span className="loading-indicator" aria-hidden="true" />;
}
type ButtonProps = ComponentPropsWithRef<"button"> & {
  variant?: Variant;
  loading?: boolean;
};
/** Icon-only controls require an aria-label. Loading retains the visible label. */
export function Button({
  variant = "primary",
  loading = false,
  disabled,
  children,
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      type={type}
      className={`button button--${variant} ${className}`}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
    >
      {loading && <LoadingIndicator />}
      {children}
    </button>
  );
}
type LinkButtonProps = ComponentPropsWithoutRef<typeof Link> & {
  variant?: Variant;
};
/** Navigation stays a real link; disabled/loading states belong to action buttons. */
export function LinkButton({
  variant = "primary",
  className = "",
  ...props
}: LinkButtonProps) {
  return (
    <Link className={`button button--${variant} ${className}`} {...props} />
  );
}
export function Arrow({
  direction = "down",
}: {
  direction?: "down" | "up" | "right";
}) {
  return (
    <svg
      className={`arrow arrow--${direction}`}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
