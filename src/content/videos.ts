/**
 * Videos Content Model for SEVA Social Service Society.
 *
 * Designed for future CMS integration and strict publication safeguards.
 * Only verified, directorate-approved video materials are published.
 */

import type { ProgrammeAssociation } from "./media";

export type VideoSource = "youtube" | "vimeo" | "self_hosted";

export type VideoPublicationStatus =
  "approved_for_publication" | "pending_review" | "archived";

interface VideoDetails {
  id: string;
  slug: string;
  title: string;
  description: string;
  thumbnailUrl?: string;
  duration?: string;
  relatedProgramme?: ProgrammeAssociation;
  relatedProgrammeSlug?: string;
  publicationStatus: VideoPublicationStatus;
  publishedDate?: string;
  captionTracks?: readonly { src: string; language: string; label: string }[];
  hasTranscript?: boolean;
  transcript?: string;
}

/** Required playback data depends on the host; an approved record cannot omit it. */
export type VideoRecord = VideoDetails &
  (
    | { videoSource: "youtube" | "vimeo"; embedId: string; videoUrl?: never }
    | { videoSource: "self_hosted"; videoUrl: string; embedId?: never }
  );

/**
 * Official registry of video assets.
 * Currently, no authentic video recordings have been authorized by the SEVA
 * directorate for public broadcast. In accordance with strict truth-in-advertising
 * and child-protection policies, no placeholder or stock video is published.
 */
export const videosData: readonly VideoRecord[] = [];

/**
 * Retrieve all approved videos for public presentation.
 */
export function getApprovedVideos(): readonly VideoRecord[] {
  return videosData.filter(
    (video) => video.publicationStatus === "approved_for_publication",
  );
}

/**
 * Retrieve a single video by ID.
 */
export function getVideoById(id: string): VideoRecord | undefined {
  return videosData.find((video) => video.id === id);
}

/**
 * Retrieve videos associated with a specific programme.
 */
export function getVideosByProgramme(
  programme: ProgrammeAssociation,
): readonly VideoRecord[] {
  return getApprovedVideos().filter(
    (video) => video.relatedProgramme === programme,
  );
}
