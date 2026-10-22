import type { HTMLAttributes } from "react";

type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  as?: "h1" | "h2" | "h3" | "h4";
  size?: "display" | "large" | "medium" | "small";
};
export function Heading({
  as: Tag = "h2",
  size = "large",
  className = "",
  ...props
}: HeadingProps) {
  return <Tag className={`heading heading--${size} ${className}`} {...props} />;
}
export function Eyebrow({
  className = "",
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={`eyebrow ${className}`} {...props} />;
}
export function Text({
  size = "regular",
  className = "",
  ...props
}: HTMLAttributes<HTMLParagraphElement> & {
  size?: "large" | "regular" | "caption";
}) {
  return (
    <p className={`body-text body-text--${size} ${className}`} {...props} />
  );
}
