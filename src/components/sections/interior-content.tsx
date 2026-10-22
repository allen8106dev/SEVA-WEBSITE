import Image from "next/image";
import Link from "next/link";
import type { NavigationItem } from "@/config/navigation";
import { ContentStatusNotice } from "@/components/layout/interior-page";
import { contactInfo } from "@/content/contact";
import { partnershipsContent } from "@/content/partnerships";
import { donationsContent } from "@/content/donations";
import { complianceRegistry } from "@/content/compliance";
import type { MediaAsset } from "@/content/media";
import { getGalleryAssets } from "@/content/route-media";

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
