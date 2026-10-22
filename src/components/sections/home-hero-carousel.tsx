"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type TransitionEvent,
} from "react";
import { motionTokens } from "@/config/motion";

export type HomeHeroSlide = {
  id: string;
  src: string;
  alt: string;
  category: string;
  focalPoint?: string;
};

export function HomeHeroCarousel({ slides }: { slides: HomeHeroSlide[] }) {
  const slideCount = slides.length;
  const [slidePosition, setSlidePosition] = useState(slideCount);
  const [transitioning, setTransitioning] = useState(false);
  const [rebasing, setRebasing] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef(slideCount);
  const transitioningRef = useRef(false);
  const rebaseFrameRef = useRef<number | null>(null);

  const updatePosition = useCallback((position: number) => {
    positionRef.current = position;
    setSlidePosition(position);
  }, []);

  const goTo = useCallback(
    (targetSlide: number) => {
      if (slideCount < 2 || transitioningRef.current) return;

      const currentPosition = positionRef.current;
      const currentSlide = currentPosition % slideCount;
      const distance = (targetSlide - currentSlide + slideCount) % slideCount;
      if (distance === 0) return;

      let nextPosition = currentPosition + distance;
      if (reducedMotion) {
        if (nextPosition >= slideCount * 2) nextPosition -= slideCount;
        updatePosition(nextPosition);
        return;
      }

      transitioningRef.current = true;
      setTransitioning(true);
      updatePosition(nextPosition);
    },
    [reducedMotion, slideCount, updatePosition],
  );

  const moveBy = useCallback(
    (offset: number) => {
      if (slideCount < 2) return;
      const currentSlide = positionRef.current % slideCount;
      const direction = offset > 0 ? 1 : slideCount - 1;
      goTo((currentSlide + direction) % slideCount);
    },
    [goTo, slideCount],
  );

  useEffect(() => {
    const hero = carouselRef.current?.closest<HTMLElement>(".home-hero");
    if (!hero) return;

    const pauseForInteraction = () => setHovering(true);
    const resumeAfterInteraction = () => setHovering(false);
    const pauseForFocus = () => setFocusWithin(true);
    const resumeAfterFocus = (event: FocusEvent) => {
      if (!hero.contains(event.relatedTarget as Node | null)) {
        setFocusWithin(false);
      }
    };

    hero.addEventListener("pointerenter", pauseForInteraction);
    hero.addEventListener("pointerleave", resumeAfterInteraction);
    hero.addEventListener("focusin", pauseForFocus);
    hero.addEventListener("focusout", resumeAfterFocus);
    return () => {
      hero.removeEventListener("pointerenter", pauseForInteraction);
      hero.removeEventListener("pointerleave", resumeAfterInteraction);
      hero.removeEventListener("focusin", pauseForFocus);
      hero.removeEventListener("focusout", resumeAfterFocus);
    };
  }, []);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => {
      const shouldReduceMotion = preference.matches;
      setReducedMotion(shouldReduceMotion);

      if (!shouldReduceMotion || slideCount < 1) return;

      transitioningRef.current = false;
      setTransitioning(false);
      setRebasing(false);

      const position = positionRef.current;
      if (position >= slideCount * 2) updatePosition(position - slideCount);
    };
    updatePreference();
    preference.addEventListener("change", updatePreference);
    return () => preference.removeEventListener("change", updatePreference);
  }, [slideCount, updatePosition]);

  useEffect(() => {
    if (!reducedMotion || slideCount < 1) return;
    const position = positionRef.current;
    if (position >= slideCount * 2) updatePosition(position - slideCount);
  }, [reducedMotion, slideCount, updatePosition]);

  useEffect(() => {
    return () => {
      if (rebaseFrameRef.current !== null) {
        window.cancelAnimationFrame(rebaseFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (reducedMotion || hovering || focusWithin || slideCount < 2) return;
    const timer = window.setInterval(
      () => moveBy(1),
      motionTokens.duration.carouselInterval * 1000,
    );
    return () => window.clearInterval(timer);
  }, [focusWithin, hovering, moveBy, reducedMotion, slideCount, slidePosition]);

  const activeSlide = slideCount === 0 ? 0 : slidePosition % slideCount;

  function handleTransitionEnd(event: TransitionEvent<HTMLDivElement>) {
    if (
      event.target !== event.currentTarget ||
      event.propertyName !== "transform"
    ) {
      return;
    }

    if (slideCount > 0 && positionRef.current >= slideCount * 2) {
      setRebasing(true);
      updatePosition(positionRef.current - slideCount);
      rebaseFrameRef.current = window.requestAnimationFrame(() => {
        rebaseFrameRef.current = window.requestAnimationFrame(() => {
          rebaseFrameRef.current = null;
          setRebasing(false);
          transitioningRef.current = false;
          setTransitioning(false);
        });
      });
      return;
    }

    transitioningRef.current = false;
    setTransitioning(false);
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

  const repeatedSlides = Array.from({ length: slideCount * 3 }, (_, index) => {
    const logicalIndex = index % slideCount;
    return { slide: slides[logicalIndex], logicalIndex, position: index };
  });

  return (
    <div
      ref={carouselRef}
      className="home-hero-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="SEVA programme photographs"
      onKeyDown={handleKeyDown}
    >
      <div className="home-hero-carousel__viewport">
        <div
          className="home-hero-carousel__track"
          style={{
            transform: `translateX(-${slidePosition * 100}%)`,
            transition: rebasing ? "none" : undefined,
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {repeatedSlides.map(({ slide, logicalIndex, position }) => (
            <figure
              className="home-hero-carousel__slide"
              key={`${position}-${slide.id}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${logicalIndex + 1} of ${slideCount}: ${slide.category}`}
              aria-hidden={slidePosition !== position}
            >
              <div className="home-hero-carousel__image">
                <Image
                  src={slide.src}
                  alt=""
                  fill
                  sizes="(min-width: 48rem) 78vw, 94vw"
                  className="home-hero-carousel__backdrop"
                  style={{ objectPosition: slide.focalPoint ?? "50% 50%" }}
                />
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  sizes="(min-width: 48rem) 78vw, 94vw"
                  preload={position === slideCount}
                  className="home-hero-carousel__main-image"
                  style={{ objectPosition: "right center" }}
                />
              </div>
            </figure>
          ))}
        </div>
      </div>

      <div
        className="home-hero-carousel__controls"
        role="group"
        aria-label="Choose a hero photograph"
      >
        {slides.map((slide, index) => (
          <button
            type="button"
            className="home-hero-carousel__control"
            key={slide.id}
            aria-label={`Show photograph ${index + 1} of ${slideCount}`}
            aria-current={activeSlide === index ? "true" : undefined}
            disabled={transitioning}
            onClick={() => goTo(index)}
          >
            <span aria-hidden="true" />
          </button>
        ))}
      </div>
      {reducedMotion && (
        <p className="sr-only">
          Automatic slide movement is disabled by your motion preference.
        </p>
      )}
    </div>
  );
}
