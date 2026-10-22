"use client";

import { useState } from "react";
import Image from "next/image";
import type { VideoRecord } from "@/content/videos";

interface VideoPlayerProps {
  video: VideoRecord;
  className?: string;
}

export function VideoPlayer({ video, className = "" }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);

  const getEmbedUrl = () => {
    if (video.videoSource === "youtube") {
      const id = video.embedId;
      return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
    }
    if (video.videoSource === "vimeo") {
      const id = video.embedId;
      return `https://player.vimeo.com/video/${id}?autoplay=1`;
    }
    return video.videoUrl || "";
  };

  return (
    <div className={`video-card ${className}`}>
      <div className="video-player-container">
        {!isPlaying ? (
          <div className="video-facade">
            {video.thumbnailUrl ? (
              <Image
                src={video.thumbnailUrl}
                alt={video.title}
                fill
                className="video-thumbnail"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="video-placeholder-backdrop">
                <span className="video-brand-watermark" aria-hidden="true">
                  SEVA MEDIA
                </span>
              </div>
            )}
            <div className="video-overlay">
              <button
                type="button"
                className="video-play-button"
                onClick={() => setIsPlaying(true)}
                aria-label={`Play video: ${video.title}`}
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
              {video.duration && (
                <span className="video-duration-pill">{video.duration}</span>
              )}
            </div>
          </div>
        ) : (
          <div className="video-active-frame">
            {video.videoSource === "self_hosted" ? (
              <video
                src={video.videoUrl}
                controls
                autoPlay
                className="video-element"
              >
                {video.captionTracks?.map((track) => (
                  <track
                    key={track.language}
                    kind="captions"
                    src={track.src}
                    srcLang={track.language}
                    label={track.label}
                  />
                ))}
                Your browser does not support HTML5 video.
              </video>
            ) : (
              <iframe
                src={getEmbedUrl()}
                title={video.title}
                className="video-iframe"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        )}
      </div>

      <div className="video-details">
        {video.relatedProgramme && (
          <span className="video-programme-badge">
            {video.relatedProgramme}
          </span>
        )}
        <h2 className="video-title">{video.title}</h2>
        {video.publishedDate && (
          <time dateTime={video.publishedDate}>
            {new Date(video.publishedDate).toLocaleDateString("en-IN", {
              dateStyle: "long",
              timeZone: "Asia/Kolkata",
            })}
          </time>
        )}
        <p className="video-description">{video.description}</p>

        {video.hasTranscript && video.transcript && (
          <div className="video-transcript-section">
            <button
              type="button"
              className="video-transcript-toggle"
              onClick={() => setShowTranscript((prev) => !prev)}
              aria-expanded={showTranscript}
            >
              {showTranscript ? "Hide Transcript" : "View Transcript"}
            </button>
            {showTranscript && (
              <div className="video-transcript-body">
                <p>{video.transcript}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
