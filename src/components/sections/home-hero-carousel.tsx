"use client";

import Image from "next/image";
import { useEffect, useState, type KeyboardEvent } from "react";
import { motionTokens } from "@/config/motion";

export type HomeHeroSlide = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  category: string;
  focalPoint?: string;
};

export function HomeHeroCarousel({ slides }: { slides: HomeHeroSlide[] }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => {
      setReducedMotion(preference.matches);
      setPlaying(!preference.matches);
    };
    updatePreference();
    preference.addEventListener("change", updatePreference);
    return () => preference.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (!playing || reducedMotion || slides.length < 2) return;
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, motionTokens.duration.carouselInterval * 1000);
    return () => window.clearInterval(timer);
  }, [playing, reducedMotion, slides.length]);

  function moveBy(offset: number) {
    setPlaying(false);
    setActiveSlide(
      (current) => (current + offset + slides.length) % slides.length,
    );
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      moveBy(-1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      moveBy(1);
    }
  }

  return (
    <div
      className="home-hero-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="SEVA programme photographs"
      tabIndex={0}
      onPointerEnter={() => setPlaying(false)}
      onFocusCapture={() => setPlaying(false)}
      onKeyDown={handleKeyDown}
    >
      <div className="home-hero-carousel__viewport">
        <div
          className="home-hero-carousel__track"
          style={{ transform: `translateX(-${activeSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <figure
              className="home-hero-carousel__slide"
              key={slide.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${slides.length}: ${slide.category}`}
              aria-hidden={activeSlide !== index}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                sizes="(min-width: 86rem) 45rem, (min-width: 64rem) 52vw, (min-width: 48rem) 50vw, 100vw"
                preload={index === 0}
                style={{ objectPosition: slide.focalPoint ?? "50% 50%" }}
              />
              <figcaption className="home-hero-carousel__caption">
                <span>{slide.category}</span>
                {slide.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div
        className="home-hero-carousel__controls"
        role="group"
        aria-label="Carousel controls"
      >
        <button
          type="button"
          className="home-hero-carousel__control"
          aria-label="Previous photograph"
          onClick={() => moveBy(-1)}
        >
          <span aria-hidden="true">‹</span>
        </button>
        <span className="home-hero-carousel__count" aria-live="off">
          {String(activeSlide + 1).padStart(2, "0")} /{" "}
          {String(slides.length).padStart(2, "0")}
        </span>
        <button
          type="button"
          className="home-hero-carousel__control"
          aria-label="Next photograph"
          onClick={() => moveBy(1)}
        >
          <span aria-hidden="true">›</span>
        </button>
        <button
          type="button"
          className="home-hero-carousel__control home-hero-carousel__play"
          aria-label={
            playing ? "Pause automatic slide show" : "Play automatic slide show"
          }
          aria-pressed={playing}
          disabled={reducedMotion}
          onClick={() => setPlaying((current) => !current)}
        >
          <span aria-hidden="true">{playing ? "Ⅱ" : "▶"}</span>
        </button>
      </div>
      {reducedMotion && (
        <p className="sr-only">
          Automatic slide movement is disabled by your motion preference.
        </p>
      )}
    </div>
  );
}
