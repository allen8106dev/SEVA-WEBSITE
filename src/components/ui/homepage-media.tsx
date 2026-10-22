import { MediaFrame } from "./media-frame";
import type { HomeMedia } from "@/content/home";

function Illustration({
  artwork,
}: {
  artwork: "seed" | "learning" | "gathering" | "story";
}) {
  return (
    <svg
      className={`illustration illustration--${artwork}`}
      viewBox="0 0 480 600"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      {artwork === "seed" ? (
        <>
          <circle cx="326" cy="160" r="62" fill="var(--color-art-sun)" />
          <path
            d="M0 443C130 345 258 433 480 340V600H0Z"
            fill="var(--color-art-far)"
          />
          <path
            d="M0 518C154 436 298 494 480 419V600H0Z"
            fill="var(--color-art-near)"
          />
          <path
            d="M235 500V265"
            stroke="var(--color-primary)"
            strokeWidth="3"
          />
          <path
            d="M235 365C157 365 137 315 148 272C211 275 239 310 235 365Z"
            fill="var(--color-primary)"
          />
          <path
            d="M236 318C235 252 276 213 333 222C338 279 300 319 236 318Z"
            fill="var(--color-art-leaf)"
          />
          <path
            d="M236 423C244 364 284 344 328 351C326 395 294 425 236 423Z"
            fill="var(--color-art-leaf)"
          />
          <path
            d="M115 530Q235 496 369 530"
            stroke="var(--color-art-leaf)"
            strokeWidth="1.5"
          />
        </>
      ) : artwork === "learning" ? (
        <>
          <circle cx="350" cy="210" r="65" fill="var(--color-art-sun)" />
          <path
            d="M65 390V222Q154 204 240 259V425Q150 370 65 390Z"
            fill="var(--color-art-near)"
          />
          <path
            d="M240 425V259Q325 204 415 222V390Q326 370 240 425Z"
            fill="var(--color-surface-elevated)"
          />
          <path
            d="M240 425V259M91 278Q153 268 209 301M91 310Q153 300 209 333M271 301Q331 268 389 278M271 333Q331 300 389 310"
            stroke="var(--color-primary)"
            strokeWidth="2"
          />
          <path
            d="M49 420Q240 498 431 420"
            stroke="var(--color-art-leaf)"
            strokeWidth="2"
          />
        </>
      ) : artwork === "gathering" ? (
        <>
          <circle
            cx="240"
            cy="300"
            r="133"
            stroke="var(--color-primary)"
            strokeWidth="2"
          />
          <circle cx="240" cy="300" r="88" fill="var(--color-art-far)" />
          <circle cx="240" cy="167" r="37" fill="var(--color-primary)" />
          <circle cx="355" cy="365" r="37" fill="var(--color-art-leaf)" />
          <circle cx="125" cy="365" r="37" fill="var(--color-art-sun)" />
          <path
            d="M216 304Q239 252 265 304Q240 346 216 304Z"
            fill="var(--color-primary)"
          />
        </>
      ) : (
        <>
          <path
            d="M100 480V240a140 140 0 0 1 280 0v240H100Z"
            fill="var(--color-art-far)"
          />
          <path
            d="M125 480V240a115 115 0 0 1 230 0v240"
            stroke="var(--color-art-leaf)"
            strokeWidth="1.5"
          />
          <circle cx="293" cy="245" r="42" fill="var(--color-art-sun)" />
          <path
            d="M100 421Q224 310 380 377V480H100Z"
            fill="var(--color-art-near)"
          />
          <path
            d="M100 461Q259 375 380 436V480H100Z"
            fill="var(--color-art-leaf)"
          />
        </>
      )}
    </svg>
  );
}

/** Server-rendered media; no autoplay or external asset requests in the demonstration. */
export function HomepageMedia({
  media,
  className,
  sizes,
  preload = false,
}: {
  media: HomeMedia;
  className?: string;
  sizes?: string;
  preload?: boolean;
}) {
  if (media.kind === "image")
    return (
      <MediaFrame
        ratio={media.ratio}
        className={className}
        caption={media.caption}
        image={{ src: media.src, alt: media.alt, sizes, preload }}
        focalPoint={media.focalPoint}
      />
    );
  return (
    <MediaFrame
      ratio={media.ratio}
      className={className}
      caption={media.caption}
    >
      {media.kind === "video" ? (
        <video
          controls
          playsInline
          preload="none"
          poster={media.poster}
          aria-label={media.alt}
        >
          <source src={media.src} />
          <track
            kind="captions"
            src={media.captionsSrc}
            srcLang="en"
            label="English"
            default
          />
          Your browser cannot play this video.
        </video>
      ) : (
        <Illustration artwork={media.artwork} />
      )}
    </MediaFrame>
  );
}
