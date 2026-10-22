import Image from "next/image";
import Link from "next/link";
import type { NavigationItem } from "@/config/navigation";
import { ContentStatusNotice } from "@/components/layout/interior-page";
import { organization } from "@/content/organization";
import { leadershipProfiles } from "@/content/leadership";
import { focusAreas } from "@/content/focus-areas";
import { projects } from "@/content/projects";
import { contactInfo } from "@/content/contact";
import { partnershipsContent } from "@/content/partnerships";
import { donationsContent } from "@/content/donations";
import { complianceRegistry } from "@/content/compliance";
import { getApprovedMediaByCategory, type MediaAsset } from "@/content/media";
import { getGalleryAssets, getProjectAssets } from "@/content/route-media";

export function ContactDetails() {
  return (
    <address className="interior-contact">
      <p>
        <strong>{contactInfo.organizationName}</strong>
        <br />
        {contactInfo.contactPerson}, {contactInfo.role}
      </p>
      <p>
        <a href={contactInfo.phone.href}>{contactInfo.phone.display}</a>
        <br />
        <a href={contactInfo.email.href}>{contactInfo.email.display}</a>
      </p>
      <p>{contactInfo.address.fullFormatted}</p>
    </address>
  );
}

function MediaCollection({ assets }: { assets: readonly MediaAsset[] }) {
  return (
    <div className="interior-grid">
      {assets.map((asset) => (
        <figure className="interior-card" key={asset.id}>
          <Image
            src={asset.publicUrl}
            alt={asset.altText}
            width={asset.width}
            height={asset.height}
            sizes="(min-width: 768px) 45vw, 90vw"
          />
          <figcaption>{asset.caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}

export function InteriorContent({ item }: { item: NavigationItem }) {
  if (item.id === "contact") return <ContactDetails />;
  if (item.href === "/profile" || item.id === "about")
    return (
      <section>
        <h2>Love In Action</h2>
        <p>{organization.introduction}</p>
        <p>
          {organization.legalStatus} · Established{" "}
          {organization.establishedYear}
        </p>
      </section>
    );
  if (item.id === "vision-mission")
    return (
      <>
        <section>
          <h2>Our vision</h2>
          <p>{organization.vision.statement}</p>
          <ul>
            {organization.vision.coreValues.map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </section>
        <section>
          <h2>Our mission</h2>
          <p>{organization.mission.statement}</p>
        </section>
      </>
    );
  if (item.id === "history")
    return (
      <>
        <p>
          SEVA Social Service Society was established in{" "}
          {organization.establishedYear}.
        </p>
        <ContentStatusNotice>
          Further historical milestones and archival material await
          organizational confirmation.
        </ContentStatusNotice>
      </>
    );
  if (item.id === "leadership") {
    const portraits = getApprovedMediaByCategory("Leadership");
    return (
      <>
        <ContentStatusNotice>
          Full biographies and two official portraits await confirmation.
          Unverified archival portraits are withheld.
        </ContentStatusNotice>
        <div className="interior-grid">
          {leadershipProfiles.map((leader) => {
            const portrait = portraits.find(
              (asset) =>
                asset.publicUrl === leader.image?.src &&
                asset.identityConfidence === "confirmed",
            );
            return (
              <article className="interior-card" key={leader.id}>
                <figure>
                  {portrait ? (
                    <>
                      <Image
                        className="portrait-image"
                        src={portrait.publicUrl}
                        alt={portrait.altText}
                        width={portrait.width}
                        height={portrait.height}
                        sizes="(min-width: 768px) 40vw, 90vw"
                        style={{ objectPosition: portrait.focalPoint }}
                      />
                      <figcaption>{portrait.caption}</figcaption>
                    </>
                  ) : (
                    <div className="portrait-slot">
                      Official portrait pending confirmation
                    </div>
                  )}
                </figure>
                <h2>{leader.name}</h2>
                <p>{leader.role}</p>
              </article>
            );
          })}
        </div>
      </>
    );
  }
  if (item.id === "programmes") return <p>{organization.mission.statement}</p>;
  if (item.href.startsWith("/programmes/")) {
    const area = focusAreas.find((area) => area.id === item.id);
    if (!area) return null;
    const related = projects.filter(
      (project) => project.focusAreaId === area.id,
    );
    return (
      <>
        <section>
          <h2>{area.category}</h2>
          <p>{area.detailedDescription}</p>
          <ul>
            {area.activities.map((activity) => (
              <li key={activity}>{activity}</li>
            ))}
          </ul>
        </section>
        {related.length > 0 && (
          <section>
            <h2>Associated projects</h2>
            {related.map((project) => (
              <article className="interior-card" key={project.id}>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <p>
                  Project details and extended photography are in preparation.
                </p>
                <details>
                  <summary>
                    Approved project photographs (
                    {getProjectAssets(project).length})
                  </summary>
                  <MediaCollection assets={getProjectAssets(project)} />
                </details>
              </article>
            ))}
          </section>
        )}
        <ContentStatusNotice>
          Detailed programme pages and project stories will follow in a later
          phase.
        </ContentStatusNotice>
      </>
    );
  }
  if (item.id === "media")
    return (
      <p>
        Explore approved programme photography. Videos, news and event material
        will be added after organizational approval.
      </p>
    );
  if (item.id === "gallery")
    return (
      <>
        <ContentStatusNotice>
          This is the approved archive preview. Full gallery organization and
          remaining media integration will follow during detailed page
          development.
        </ContentStatusNotice>
        <MediaCollection assets={getGalleryAssets()} />
      </>
    );
  if (item.id === "videos" || item.id === "news-events")
    return (
      <ContentStatusNotice>
        {item.id === "videos"
          ? "No approved videos have been supplied for publication."
          : "No approved news articles or event notices are currently available."}
      </ContentStatusNotice>
    );
  if (item.href.startsWith("/resources")) {
    const publicDocuments = complianceRegistry.filter(
      (document) =>
        document.publicDisplayAllowed && document.status === "verified_active",
    );
    return (
      <>
        <ContentStatusNotice>
          Public annual reports, audited financial statements and compliance
          downloads are not yet available. Publication requires approved
          documents and confirmation of their current status.
        </ContentStatusNotice>
        {publicDocuments.length > 0 && (
          <p>Document download preparation is pending.</p>
        )}
        <p>For documentation enquiries, please contact the directorate.</p>
        <Link href="/contact">Contact SEVA</Link>
      </>
    );
  }
  if (item.id === "get-involved")
    return (
      <>
        <p>{partnershipsContent.summary}</p>
        <p>
          Discuss volunteering, collaboration or giving with the directorate
          through our official contact channels.
        </p>
        <Link href="/contact">Contact the directorate</Link>
      </>
    );
  if (item.id === "volunteer")
    return (
      <>
        <ContentStatusNotice>
          Participation areas are informational previews. Arrangements and
          availability must be confirmed with the directorate.
        </ContentStatusNotice>
        <div className="interior-grid">
          {partnershipsContent.volunteeringOpportunities.map((opportunity) => (
            <article key={opportunity.id} className="interior-card">
              <h2>{opportunity.title}</h2>
              <p>{opportunity.description}</p>
            </article>
          ))}
        </div>
        <Link href="/contact">Ask about volunteering</Link>
      </>
    );
  if (item.id === "csr")
    return (
      <>
        <p>{partnershipsContent.summary}</p>
        <div className="interior-grid">
          {partnershipsContent.csrAlignmentAreas.map((area) => (
            <article key={area.id} className="interior-card">
              <h2>{area.name}</h2>
              <p>{area.description}</p>
            </article>
          ))}
        </div>
        <p>{partnershipsContent.disclaimer}</p>
        <Link href="/contact">Discuss a partnership</Link>
      </>
    );
  if (item.id === "donate")
    return (
      <>
        <ContentStatusNotice>
          {donationsContent.authorizationNotice}
        </ContentStatusNotice>
        <p>
          For enquiries about supporting SEVA’s work, contact the directorate.
        </p>
        <Link href="/contact">Contact SEVA about giving</Link>
      </>
    );
  return null;
}
