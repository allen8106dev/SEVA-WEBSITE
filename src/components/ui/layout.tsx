import type { ComponentPropsWithoutRef } from "react";

type ContainerProps = ComponentPropsWithoutRef<"div"> & {
  width?: "standard" | "narrow" | "wide" | "full";
};
export function Container({
  width = "standard",
  className = "",
  ...props
}: ContainerProps) {
  return (
    <div className={`container container--${width} ${className}`} {...props} />
  );
}
export function Section({
  className = "",
  ...props
}: ComponentPropsWithoutRef<"section">) {
  return <section className={`section ${className}`} {...props} />;
}
export function EditorialGrid({
  className = "",
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return <div className={`editorial-grid ${className}`} {...props} />;
}
export function Divider() {
  return <hr className="divider" />;
}
