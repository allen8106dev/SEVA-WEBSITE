import Image, { type ImageProps } from "next/image";
import type { ReactNode } from "react";

type MediaFrameProps = {
  ratio?: "portrait" | "landscape" | "cinematic" | "square";
  caption: string;
  className?: string;
} & (
  | {
      image: Pick<ImageProps, "src" | "alt" | "sizes" | "preload">;
      focalPoint?: string;
      children?: never;
    }
  | { image?: never; focalPoint?: never; children: ReactNode }
);
/** Captions identify demo assets; real images require alt text and a responsive sizes value. */
export function MediaFrame({
  ratio = "portrait",
  caption,
  className = "",
  ...props
}: MediaFrameProps) {
  return (
    <figure className={`media-frame ${className}`}>
      <div className={`media-frame__visual media-frame__visual--${ratio}`}>
        {props.image ? (
          <>
            <Image
              {...props.image}
              alt={props.image.alt}
              fill
              sizes={props.image.sizes ?? "(min-width: 768px) 45vw, 100vw"}
              style={{
                objectFit: "cover",
                objectPosition: props.focalPoint ?? "50% 50%",
              }}
            />
            <svg
              className="media-frame__editorial-stamp"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <rect width="100" height="100" fill="none" stroke="transparent" />
            </svg>
          </>
        ) : (
          props.children
        )}
      </div>
      <figcaption className="media-frame__caption">{caption}</figcaption>
    </figure>
  );
}
