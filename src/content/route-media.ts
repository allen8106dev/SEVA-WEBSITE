import {
  getApprovedMediaByProgramme,
  mediaRegistry,
  type MediaAsset,
  type ProgrammeAssociation,
} from "./media";
import type { ProjectRecord } from "./projects";

/** Every approved archive photograph is eligible, independently of homepage placement. */
export function getGalleryAssets(): readonly MediaAsset[] {
  return mediaRegistry.filter(
    (asset) =>
      asset.approvalStatus === "approved_for_publication" &&
      Boolean(asset.publicUrl) &&
      asset.sourceArchive === "Pictures.zip",
  );
}

const projectMediaAssociations: Readonly<Record<string, ProgrammeAssociation>> =
  {
    "cnewa-education": "CNEWA Non-Formal Education",
    "vidya-jyoti": "Vidya Jyothi",
    "seva-ruby-meal": "SEVA Ruby Meal",
  };

/** An array supports multiple photos per project; no unrelated fallback photographs. */
export function getProjectAssets(
  project: Pick<ProjectRecord, "id">,
): readonly MediaAsset[] {
  const association = projectMediaAssociations[project.id];
  return association
    ? getApprovedMediaByProgramme(association).filter((asset) =>
        Boolean(asset.publicUrl),
      )
    : [];
}
