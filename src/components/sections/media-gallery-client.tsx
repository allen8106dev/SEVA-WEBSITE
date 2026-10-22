"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import type { MediaAsset } from "@/content/media";
import { Reveal } from "@/components/animations/reveal";
import { Lightbox } from "@/components/ui/lightbox";

interface MediaGalleryClientProps {
  initialAssets: readonly MediaAsset[];
  projectFilters: readonly {
    id: string;
    label: string;
    assetIds: readonly string[];
  }[];
}

export function MediaGalleryClient({
  initialAssets,
  projectFilters,
}: MediaGalleryClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedProgramme, setSelectedProgramme] = useState("All");
  const [selectedProject, setSelectedProject] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const activeTriggerIdRef = useRef<string | null>(null);
  const prevIndexRef = useRef<number | null>(null);

  // Extract only categories that actually have approved photographs
  const categoriesWithCounts = useMemo(() => {
    const counts: Record<string, number> = { All: initialAssets.length };
    initialAssets.forEach((asset) => {
      counts[asset.category] = (counts[asset.category] || 0) + 1;
    });
    return Object.entries(counts);
  }, [initialAssets]);

  // Filtered assets based on selection
  const filteredAssets = useMemo(() => {
    const project = projectFilters.find(
      (entry) => entry.id === selectedProject,
    );
    return initialAssets.filter(
      (asset) =>
        (selectedCategory === "All" || asset.category === selectedCategory) &&
        (selectedProgramme === "All" ||
          asset.programmeAssociation === selectedProgramme) &&
        (!project || project.assetIds.includes(asset.id)),
    );
  }, [
    initialAssets,
    selectedCategory,
    selectedProgramme,
    selectedProject,
    projectFilters,
  ]);

  const handleOpenLightbox = (index: number, assetId: string) => {
    activeTriggerIdRef.current = `gallery-trigger-${assetId}`;
    setLightboxIndex(index);
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
  };

  // Restore focus to trigger after modal closes
  useEffect(() => {
    if (prevIndexRef.current !== null && lightboxIndex === null) {
      if (activeTriggerIdRef.current) {
        const el = document.getElementById(activeTriggerIdRef.current);
        if (el) {
          el.focus();
        }
      }
    }
    prevIndexRef.current = lightboxIndex;
  }, [lightboxIndex]);

  const handleNavigateLightbox = (newIndex: number) => {
    setLightboxIndex(newIndex);
  };

  return (
    <div className="gallery-section">
      <h2 className="gallery-grid-heading">Photographs</h2>
      {/* Category Filter Controls */}
      <nav
        className="gallery-filter-nav"
        aria-label="Filter gallery by category"
      >
        <ul className="gallery-filter-list">
          {categoriesWithCounts.map(([category, count]) => {
            const isActive = selectedCategory === category;
            return (
              <li key={category} className="gallery-filter-item">
                <button
                  type="button"
                  className={`gallery-filter-btn ${isActive ? "gallery-filter-btn--active" : ""}`}
                  onClick={() => setSelectedCategory(category)}
                  aria-pressed={isActive}
                >
                  <span className="gallery-filter-label">{category}</span>
                  <span className="gallery-filter-count" aria-hidden="true">
                    {count}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="gallery-select-filters">
        <div>
          <label htmlFor="gallery-programme">Programme</label>
          <select
            id="gallery-programme"
            value={selectedProgramme}
            onChange={(event) => setSelectedProgramme(event.target.value)}
          >
            <option value="All">All programmes</option>
            {[
              ...new Set(
                initialAssets.map((asset) => asset.programmeAssociation),
              ),
            ].map((programme) => (
              <option key={programme} value={programme}>
                {programme} (
                {
                  initialAssets.filter(
                    (asset) => asset.programmeAssociation === programme,
                  ).length
                }
                )
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="gallery-project">Project</label>
          <select
            id="gallery-project"
            value={selectedProject}
            onChange={(event) => setSelectedProject(event.target.value)}
          >
            <option value="All">All projects</option>
            {projectFilters.map((project) => (
              <option key={project.id} value={project.id}>
                {project.label} ({project.assetIds.length})
              </option>
            ))}
          </select>
        </div>
      </div>
      <noscript>
        <p>
          All approved photographs are shown below. Open an image link to view
          it at full size. Filtering and the image viewer require JavaScript.
        </p>
      </noscript>
      {/* Result Status Announcement */}
      <div className="gallery-status-bar" aria-live="polite">
        <p className="gallery-count-text">
          Showing <strong>{filteredAssets.length}</strong>{" "}
          {filteredAssets.length === 1 ? "photograph" : "photographs"}
          {selectedCategory !== "All" && ` in ${selectedCategory}`}
        </p>
      </div>

      {filteredAssets.length === 0 && (
        <p>
          No photographs match these filters.{" "}
          <button
            type="button"
            className="button button--secondary"
            onClick={() => {
              setSelectedCategory("All");
              setSelectedProgramme("All");
              setSelectedProject("All");
            }}
          >
            Reset filters
          </button>
        </p>
      )}
      {/* Editorial Responsive Grid */}
      <div
        className="gallery-grid"
        role="region"
        aria-label="Photo gallery photographs"
      >
        {filteredAssets.map((asset, index) => {
          const isFeatured = index === 0 && selectedCategory === "All";
          const isCollage = asset.category === "Project Collages";
          const triggerId = `gallery-trigger-${asset.id}`;

          return (
            <article
              key={asset.id}
              className={`gallery-card ${isFeatured ? "gallery-card--featured" : ""} ${isCollage ? "gallery-card--collage" : ""}`}
            >
              <Reveal variant="media" order={index % 3}>
                <a
                  href={asset.publicUrl}
                  id={triggerId}
                  className="gallery-card-trigger"
                  onClick={(event) => {
                    event.preventDefault();
                    handleOpenLightbox(index, asset.id);
                  }}
                  aria-label={`View full image: ${asset.caption}`}
                >
                  <div
                    className={`gallery-card-media gallery-card-media--${asset.aspectRatio}`}
                  >
                    <Image
                      src={asset.publicUrl}
                      alt={asset.altText}
                      width={asset.width}
                      height={asset.height}
                      className="gallery-card-img"
                      sizes={
                        isFeatured
                          ? "(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
                          : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      }
                    />
                    <div className="gallery-card-overlay">
                      <span
                        className="gallery-card-expand-icon"
                        aria-hidden="true"
                      >
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="15 3 21 3 21 9" />
                          <polyline points="9 21 3 21 3 15" />
                          <line x1="21" y1="3" x2="14" y2="10" />
                          <line x1="3" y1="21" x2="10" y2="14" />
                        </svg>
                      </span>
                      <span className="gallery-card-expand-text">
                        View photograph
                      </span>
                    </div>
                  </div>

                  <div className="gallery-card-meta">
                    <div className="gallery-card-tags">
                      <span className="gallery-tag gallery-tag--category">
                        {asset.category}
                      </span>
                      <span className="gallery-tag gallery-tag--programme">
                        {asset.programmeAssociation}
                      </span>
                    </div>
                    <h3 className="gallery-card-caption">{asset.caption}</h3>
                    <p className="gallery-card-provenance">
                      Archive: {asset.creditSource}
                    </p>
                  </div>
                </a>
              </Reveal>
            </article>
          );
        })}
      </div>

      {/* Accessible Full-screen Lightbox Modal */}
      <Lightbox
        isOpen={lightboxIndex !== null}
        currentIndex={lightboxIndex ?? 0}
        assets={filteredAssets}
        onClose={handleCloseLightbox}
        onNavigate={handleNavigateLightbox}
      />
    </div>
  );
}
