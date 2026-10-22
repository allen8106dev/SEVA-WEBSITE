"use client";

import { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import type { MediaAsset } from "@/content/media";

interface LightboxProps {
  isOpen: boolean;
  currentIndex: number;
  assets: readonly MediaAsset[];
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}

export function Lightbox({
  isOpen,
  currentIndex,
  assets,
  onClose,
  onNavigate,
}: LightboxProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const currentAsset = assets[currentIndex] ?? assets[0];

  const handlePrev = useCallback(() => {
    if (assets.length <= 1) return;
    onNavigate((currentIndex - 1 + assets.length) % assets.length);
  }, [currentIndex, assets.length, onNavigate]);

  const handleNext = useCallback(() => {
    if (assets.length <= 1) return;
    onNavigate((currentIndex + 1) % assets.length);
  }, [currentIndex, assets.length, onNavigate]);

  // Native modal dialogs provide browser-managed focus containment and inertness.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!isOpen || !dialog) return;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  // Keyboard navigation: Escape closes, Left/Right arrows cycle
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        handlePrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handlePrev, handleNext, onClose]);

  if (!isOpen || !currentAsset) return null;

  return (
    <dialog
      ref={dialogRef}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      className="lightbox-dialog"
      aria-modal="true"
      aria-label="Image viewer"
      aria-describedby="lightbox-caption"
      tabIndex={-1}
    >
      <div className="lightbox-backdrop" onClick={onClose} aria-hidden="true" />

      <div className="lightbox-container" role="document">
        <header className="lightbox-header">
          <div className="lightbox-meta">
            <span className="lightbox-counter">
              Photograph {currentIndex + 1} of {assets.length}
            </span>
            <span className="lightbox-category">
              {currentAsset.category} · {currentAsset.programmeAssociation}
            </span>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            className="lightbox-close-btn"
            onClick={onClose}
            aria-label="Close image viewer (Escape)"
          >
            <span aria-hidden="true">✕</span>
          </button>
        </header>

        <div className="lightbox-viewport">
          {assets.length > 1 && (
            <button
              type="button"
              className="lightbox-nav-btn lightbox-nav-btn--prev"
              onClick={handlePrev}
              aria-label="Previous photograph (Left arrow)"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
          )}

          <div className="lightbox-media-wrapper">
            <div className="lightbox-image-stage">
              <Image
                src={currentAsset.publicUrl}
                alt={currentAsset.altText}
                width={currentAsset.width}
                height={currentAsset.height}
                className="lightbox-img"
                sizes="(max-width: 1024px) 100vw, 85vw"
                loading="eager"
              />
            </div>
          </div>

          {assets.length > 1 && (
            <button
              type="button"
              className="lightbox-nav-btn lightbox-nav-btn--next"
              onClick={handleNext}
              aria-label="Next photograph (Right arrow)"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          )}
        </div>

        <footer className="lightbox-footer">
          <p
            id="lightbox-caption"
            className="lightbox-caption"
            aria-live="polite"
          >
            {currentAsset.caption}
          </p>
          <div className="lightbox-footer-details">
            <span className="lightbox-source">
              Provenance: {currentAsset.creditSource}
            </span>
          </div>
        </footer>
      </div>
    </dialog>
  );
}
