import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/layout/interior-page";
import { Reveal } from "@/components/animations/reveal";
import { Container } from "@/components/ui/layout";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import type { NavigationItem } from "@/config/navigation";
import { partnershipsContent } from "@/content/partnerships";
import { donationsContent } from "@/content/donations";
import { contactInfo } from "@/content/contact";
import { getGalleryAssets } from "@/content/route-media";

const volunteerSubject = encodeURIComponent("Volunteer interest");
const csrSubject = encodeURIComponent("CSR partnership inquiry");
const donationSubject = encodeURIComponent("Request for donation information");
const mailto = (subject: string) =>
  `${contactInfo.email.href}?subject=${subject}`;

function LinkArrow() {
  return <span aria-hidden="true">↗</span>;
}

function InvolvementHeader({
  item,
  eyebrow,
  title,
  intro,
  tone,
}: {
  item: NavigationItem;
  eyebrow: string;
  title: ReactNode;
  intro: string;
  tone: string;
}) {
  return (
    <header className={`involvement-hero involvement-hero--${tone}`}>
      <Container width="wide">
        <Breadcrumbs item={item} />
        <Eyebrow>{eyebrow}</Eyebrow>
        <Heading as="h1" size="display" className="involvement-hero__title">
          {title}
        </Heading>
        <Text size="large" className="involvement-hero__intro">
          {intro}
        </Text>
      </Container>
    </header>
  );
}

function InquiryNote({ children }: { children: ReactNode }) {
  return <p className="involvement-note">{children}</p>;
}

function Pathway({
  number,
  title,
  text,
  href,
  action,
  tone,
}: {
  number: string;
  title: string;
  text: string;
  href: string;
  action: string;
  tone: string;
}) {
  return (
    <article className={`involvement-pathway involvement-pathway--${tone}`}>
      <span className="involvement-pathway__number" aria-hidden="true">
        {number}
      </span>
      <div>
        <h2>{title}</h2>
        <p>{text}</p>
        <Link href={href}>
          {action} <LinkArrow />
        </Link>
      </div>
    </article>
  );
}

export function GetInvolvedPage({ item }: { item: NavigationItem }) {
  return (
    <div className="involvement-page involvement-overview">
      <InvolvementHeader
        item={item}
        eyebrow="SEVA · Love In Action"
        title={
          <>
            Be part of <em>the work.</em>
          </>
        }
        intro="There are different ways to stand alongside communities in SEVA’s documented areas of work. Start a conversation to explore what may be suitable."
        tone="yellow"
      />
      <section
        className="involvement-pathways"
        aria-label="Ways to get involved"
      >
        <Container width="wide">
          <Pathway
            number="01"
            title="Volunteer"
            text="Explore documented areas of community participation, from education support to Ruby Meal distribution."
            href="/get-involved/volunteer"
            action="Explore volunteering"
            tone="coral"
          />
          <Pathway
            number="02"
            title="CSR partnerships"
            text="Learn about SEVA’s CSR-aligned programme areas and stated approach to implementation and reporting."
            href="/get-involved/csr"
            action="Explore partnerships"
            tone="blue"
          />
          <Pathway
            number="03"
            title="Give with care"
            text="See the designated giving purposes and request current, approved donation instructions directly from SEVA."
            href="/get-involved/donate"
            action="Donation information"
            tone="cream"
          />
          <Pathway
            number="04"
            title="Community collaboration"
            text="For general questions or ideas, contact the SEVA directorate using its verified contact details."
            href="/contact"
            action="Contact SEVA"
            tone="black"
          />
        </Container>
      </section>
      <section className="involvement-closing">
        <Container width="wide">
          <p>Good work begins with a conversation.</p>
          <Link href="/contact">
            Talk with SEVA <LinkArrow />
          </Link>
        </Container>
      </section>
    </div>
  );
}

export function VolunteerPage({ item }: { item: NavigationItem }) {
  const assets = getGalleryAssets().filter((asset) =>
    ["Education", "Community Welfare"].includes(asset.category),
  );
  return (
    <div className="involvement-page volunteer-page">
      <InvolvementHeader
        item={item}
        eyebrow="Community participation"
        title={
          <>
            Many hands.
            <br />
            <em>Shared purpose.</em>
          </>
        }
        intro="SEVA’s organizational material describes these areas for individual and corporate volunteering. They are areas to discuss with the directorate, not a notice of current vacancies or open applications."
        tone="coral"
      />
      {assets[0] && (
        <figure className="volunteer-photo">
          <Image
            src={assets[0].publicUrl}
            alt={assets[0].altText}
            width={assets[0].width}
            height={assets[0].height}
            priority
          />
          <figcaption>{assets[0].caption}</figcaption>
        </figure>
      )}
      <section className="volunteer-list" aria-labelledby="volunteer-areas">
        <Container width="wide">
          <Eyebrow>Documented participation areas</Eyebrow>
          <Heading as="h2" size="large" id="volunteer-areas">
            Ways to contribute time and skills
          </Heading>
          <div className="volunteer-list__items">
            {partnershipsContent.volunteeringOpportunities.map(
              (opportunity, index) => (
                <Reveal key={opportunity.id} order={index}>
                  <article>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <p>{opportunity.focusArea}</p>
                      <h3>{opportunity.title}</h3>
                      <p>{opportunity.description}</p>
                    </div>
                  </article>
                </Reveal>
              ),
            )}
          </div>
        </Container>
      </section>
      <section className="involvement-cta">
        <Container width="wide">
          <div>
            <Eyebrow>Expression of interest</Eyebrow>
            <Heading as="h2">Ask what may be a fit.</Heading>
            <Text>
              Send an email to SEVA with the area you are interested in and a
              short introduction. Please do not include sensitive personal
              information.
            </Text>
          </div>
          <a className="button button--primary" href={mailto(volunteerSubject)}>
            Email a volunteer inquiry <LinkArrow />
          </a>
          <InquiryNote>
            This opens your email application. It does not submit an application
            or confirm an available placement.
          </InquiryNote>
        </Container>
      </section>
    </div>
  );
}

export function CsrPage({ item }: { item: NavigationItem }) {
  return (
    <div className="involvement-page csr-page">
      <InvolvementHeader
        item={item}
        eyebrow="Corporate social responsibility"
        title={
          <>
            Partnerships with
            <br />
            <em>purpose.</em>
          </>
        }
        intro={partnershipsContent.summary}
        tone="blue"
      />
      <section className="csr-areas">
        <Container width="wide">
          <div className="csr-areas__intro">
            <Eyebrow>Documented alignment areas</Eyebrow>
            <Heading as="h2" size="large">
              Rooted in community needs.
            </Heading>
            <Text>
              SEVA identifies the following areas for CSR-aligned collaboration.
            </Text>
          </div>
          <ol>
            {partnershipsContent.csrAlignmentAreas.map((area, index) => (
              <li key={area.id}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{area.name}</h3>
                  <p>{area.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>
      <section className="csr-approach">
        <Container width="wide">
          <Eyebrow>How SEVA describes its approach</Eyebrow>
          <Heading as="h2" size="large">
            From community engagement to reporting.
          </Heading>
          <div className="csr-approach__grid">
            {partnershipsContent.pillars.map((pillar, index) => (
              <article key={pillar.title}>
                <span>0{index + 1}</span>
                <h3>{pillar.title}</h3>
                <p>{pillar.description}</p>
              </article>
            ))}
          </div>
          <InquiryNote>
            {partnershipsContent.disclaimer} No particular tax or regulatory
            outcome is guaranteed.
          </InquiryNote>
        </Container>
      </section>
      <section className="involvement-cta involvement-cta--blue">
        <Container width="wide">
          <div>
            <Eyebrow>Corporate inquiry</Eyebrow>
            <Heading as="h2">Start a conversation.</Heading>
            <Text>
              Share your organization’s area of interest with the SEVA
              directorate.
            </Text>
          </div>
          <a className="button button--secondary" href={mailto(csrSubject)}>
            Email a CSR inquiry <LinkArrow />
          </a>
          <InquiryNote>
            This email link is an inquiry pathway, not a structured submission
            or partnership commitment.
          </InquiryNote>
        </Container>
      </section>
    </div>
  );
}

export function DonatePage({ item }: { item: NavigationItem }) {
  return (
    <div className="involvement-page donate-page">
      <InvolvementHeader
        item={item}
        eyebrow="Giving to SEVA"
        title={
          <>
            Give with <em>confidence.</em>
          </>
        }
        intro={donationsContent.description}
        tone="cream"
      />
      <section className="donate-designations">
        <Container width="wide">
          <div className="donate-designations__intro">
            <Eyebrow>Designated giving purposes</Eyebrow>
            <Heading as="h2" size="large">
              Ask about the work you care about.
            </Heading>
            <Text>
              SEVA’s organizational material references these giving purposes.
              Contact SEVA to request current, approved donation instructions
              before making a contribution.
            </Text>
          </div>
          <div className="donate-designations__list">
            {donationsContent.designatedAccounts.map((account, index) => (
              <article key={account.id}>
                <span>0{index + 1}</span>
                <h3>{account.accountDesignation}</h3>
                <p>{account.purpose}</p>
                <small>{account.focusInitiative}</small>
              </article>
            ))}
          </div>
        </Container>
      </section>
      <section className="donate-trust">
        <Container width="wide">
          <Eyebrow>Transparency matters</Eyebrow>
          <Heading as="h2" size="large">
            Verify instructions directly with SEVA.
          </Heading>
          <Text>{donationsContent.authorizationNotice}</Text>
          <Text>
            There are no payment links or electronic contribution instructions
            on this page. No tax or regulatory benefit is promised.
          </Text>
          <a className="button button--primary" href={mailto(donationSubject)}>
            Request donation information <LinkArrow />
          </a>
        </Container>
      </section>
    </div>
  );
}

export function ContactPage({ item }: { item: NavigationItem }) {
  const { address } = contactInfo;
  const mapQuery = encodeURIComponent(
    `${address.premises}, ${address.street}, ${address.locality}, ${address.city} ${address.pinCode}, ${address.state}, ${address.country}`,
  );
  return (
    <div className="contact-page">
      <section className="contact-hero">
        <Container width="wide">
          <Breadcrumbs item={item} />
          <div className="contact-hero__grid">
            <div>
              <Eyebrow>We’re here to listen</Eyebrow>
              <Heading as="h1" size="display">
                Let’s start
                <br />
                <em>a conversation.</em>
              </Heading>
              <Text size="large">
                For questions about SEVA’s work, volunteering, partnerships, or
                giving, reach the directorate using the verified channels below.
              </Text>
            </div>
            <div className="contact-hero__mark" aria-hidden="true">
              S.
            </div>
          </div>
        </Container>
      </section>
      <section className="contact-details">
        <Container width="wide">
          <div className="contact-details__identity">
            <Eyebrow>Directorate</Eyebrow>
            <Heading as="h2" size="large">
              {contactInfo.organizationName}
            </Heading>
            <p>
              {contactInfo.role}: {contactInfo.contactPerson}
            </p>
          </div>
          <address>
            <div>
              <span>Call</span>
              <a href={contactInfo.phone.href}>{contactInfo.phone.display}</a>
            </div>
            <div>
              <span>Email</span>
              <a href={contactInfo.email.href}>{contactInfo.email.display}</a>
            </div>
            <div>
              <span>Visit</span>
              <p>
                {address.premises}
                <br />
                {address.street}
                <br />
                {address.locality}, {address.city} – {address.pinCode}
                <br />
                {address.state}, {address.country}
              </p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                target="_blank"
                rel="noreferrer"
              >
                Open address in maps <LinkArrow />
              </a>
            </div>
          </address>
        </Container>
      </section>
    </div>
  );
}
