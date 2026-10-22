import Image from "next/image";
import type { ReactNode } from "react";
import Link from "next/link";
import { Container, Section } from "@/components/ui/layout";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import { Arrow, LinkButton } from "@/components/ui/button";
import { MediaFrame } from "@/components/ui/media-frame";
import { Breadcrumbs } from "@/components/layout/interior-page";
import { Reveal } from "@/components/animations/reveal";
import { ImageMaskReveal } from "@/components/animations/image-mask-reveal";
import { SplitReveal } from "@/components/animations/split-reveal";
import { ValueEmphasis } from "@/components/animations/value-emphasis";
import { navigation, type NavigationItem } from "@/config/navigation";
import { organization } from "@/content/organization";
import { focusAreas } from "@/content/focus-areas";
import { leadershipProfiles } from "@/content/leadership";
import { getMediaAsset, getApprovedMediaByCategory } from "@/content/media";
import {
  historyMilestones,
  leadershipMonograms,
  profileContent,
  profileMedia,
  type ProfilePageId,
} from "@/content/profile";

function ProfilePhoto({
  id,
  ratio = "landscape",
  className = "",
}: {
  id: string;
  ratio?: "portrait" | "landscape" | "cinematic";
  className?: string;
}) {
  const asset = getMediaAsset(id);
  if (!asset?.publicUrl || asset.approvalStatus !== "approved_for_publication")
    return null;
  return (
    <ImageMaskReveal>
      <MediaFrame
        className={`profile-photo ${className}`}
        ratio={ratio}
        image={{
          src: asset.publicUrl,
          alt: asset.altText,
          sizes: "(min-width: 1440px) 640px, (min-width: 768px) 50vw, 90vw",
        }}
        caption={asset.caption}
        focalPoint={asset.focalPoint}
      />
    </ImageMaskReveal>
  );
}

function ProfileOpening({
  item,
  id,
  children,
}: {
  item: NavigationItem;
  id: ProfilePageId;
  children?: ReactNode;
}) {
  const copy = profileContent[id];
  return (
    <section
      className={`profile-opening profile-opening--${id}`}
      aria-labelledby="profile-title"
    >
      <Container width="wide">
        <Breadcrumbs item={item} />
        <div className="profile-opening__grid">
          <div>
            <Eyebrow>{copy.eyebrow}</Eyebrow>
            <Heading
              as="h1"
              size="display"
              id="profile-title"
              className="profile-title"
            >
              <SplitReveal text={copy.heading} />
              {id !== "leadership" && (
                <em>
                  <SplitReveal text={copy.emphasis} />
                </em>
              )}
            </Heading>
            {id === "leadership" && (
              <p className="profile-opening__aside">{copy.emphasis}</p>
            )}
          </div>
          {children}
        </div>
      </Container>
    </section>
  );
}

function ProfileExplore({ current }: { current: ProfilePageId }) {
  const group = navigation.find((item) => item.id === "profile");
  return (
    <section className="profile-explore" aria-labelledby="explore-profile">
      <Container width="wide">
        <div className="profile-section-heading">
          <Eyebrow>A closer look</Eyebrow>
          <Heading id="explore-profile">Get to know SEVA.</Heading>
        </div>
        <nav
          aria-label="Explore Profile"
          className={`profile-index ${current === "profile" || current === "history" ? "profile-index--feature" : ""}`}
        >
          {group?.children
            ?.filter((item) => item.id !== current)
            .map((item, index) => (
              <Link
                className={`profile-index__link profile-index__link--${item.id}`}
                key={item.id}
                href={item.href}
                aria-label={`Explore ${item.label}`}
              >
                <span className="profile-index__number" aria-hidden="true">
                  0{index + 1}
                </span>
                <span>
                  <span className="profile-index__label">{item.label}</span>
                  <span className="profile-index__description">
                    {item.description}
                  </span>
                </span>
                <Arrow direction="right" />
              </Link>
            ))}
        </nav>
        {current !== "profile" && (
          <Link className="profile-back" href="/profile">
            Back to Profile <Arrow direction="up" />
          </Link>
        )}
      </Container>
    </section>
  );
}

function ProgrammeIndex() {
  return (
    <ol className="profile-programmes">
      {focusAreas.map((area, index) => (
        <li key={area.id}>
          <Link href={`/programmes/${area.id}`}>
            <span aria-hidden="true">0{index + 1}</span>
            <span>{area.title}</span>
            <Arrow direction="right" />
          </Link>
        </li>
      ))}
    </ol>
  );
}

function ProfileClosing() {
  return (
    <section className="profile-closing" aria-labelledby="profile-closing">
      <Container width="wide">
        <Eyebrow>Continue the conversation</Eyebrow>
        <Heading id="profile-closing">
          Purpose becomes <em>action.</em>
        </Heading>
        <div className="profile-actions">
          <LinkButton href="/programmes">
            Explore our programmes <Arrow direction="right" />
          </LinkButton>
          <LinkButton href="/contact" variant="secondary">
            Contact SEVA <Arrow direction="right" />
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}

function Overview({ item }: { item: NavigationItem }) {
  return (
    <>
      <ProfileOpening item={item} id="profile">
        <div className="profile-seal">
          <Image
            src={organization.branding.emblem}
            alt={organization.branding.alt}
            width={361}
            height={361}
            sizes="(min-width: 768px) 260px, 170px"
            preload
          />
          <span>SEVA SOCIAL SERVICE SOCIETY</span>
          <span>
            EST. {organization.establishedYear} · {organization.tagline}
          </span>
        </div>
      </ProfileOpening>
      <section
        className="profile-overview-story"
        aria-labelledby="profile-introduction"
      >
        <Container width="wide">
          <div className="profile-overview-story__grid">
            <div className="profile-overview-story__photo">
              <ProfilePhoto id={profileMedia.overview} />
              <span className="profile-photo-note" aria-hidden="true">
                People. Purpose. Possibility.
              </span>
            </div>
            <div className="profile-overview-story__copy">
              <Eyebrow>SEVA Social Service Society</Eyebrow>
              <Reveal variant="statement">
                <Heading id="profile-introduction">
                  A society rooted in <em>service.</em>
                </Heading>
              </Reveal>
              <Text size="large">{organization.introduction}</Text>
              <p className="profile-factline">
                {organization.legalStatus}
                <br />
                Established {organization.establishedYear}
              </p>
              <LinkButton href="/profile/about" variant="text">
                Our story and approach <Arrow direction="right" />
              </LinkButton>
            </div>
          </div>
          <ul className="profile-reach" aria-label="States where SEVA works">
            {organization.operationalStates.map((state, index) => (
              <li key={state}>
                <span aria-hidden="true">0{index + 1} /</span>
                {state}
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <ProfileExplore current="profile" />
      <ProfileClosing />
    </>
  );
}

function About({ item }: { item: NavigationItem }) {
  return (
    <>
      <ProfileOpening item={item} id="about">
        <div className="profile-intro-note">
          <span className="profile-large-year" aria-hidden="true">
            {organization.establishedYear}
          </span>
          <p>
            {organization.tagline}.
            <br />A commitment to service.
          </p>
        </div>
      </ProfileOpening>
      <Section className="profile-about-story" aria-labelledby="about-identity">
        <Container width="wide">
          <div className="profile-about-story__grid">
            <div>
              <Eyebrow>01 / Who we are</Eyebrow>
              <Heading id="about-identity">{organization.name}</Heading>
              <Text size="large">{organization.introduction}</Text>
              <p className="profile-factline">
                {organization.legalStatus} · Established{" "}
                {organization.establishedYear}
              </p>
              <div className="profile-about-principle">
                <Eyebrow>The purpose behind the work</Eyebrow>
                <p>{organization.mission.statement}</p>
              </div>
            </div>
            <ProfilePhoto id={profileMedia.about} ratio="portrait" />
          </div>
        </Container>
      </Section>
      <section className="profile-geography" aria-labelledby="where-we-work">
        <Container width="wide">
          <div className="profile-section-heading">
            <Eyebrow>02 / Where we work</Eyebrow>
            <Heading id="where-we-work">
              Across three states.
              <br />
              <em>Alongside communities.</em>
            </Heading>
          </div>
          <ol className="profile-states">
            {organization.operationalStates.map((state, index) => (
              <li key={state}>
                <span aria-hidden="true">0{index + 1}</span>
                <Reveal variant="statement" order={index}>
                  <h3>{state}</h3>
                </Reveal>
                <span className="profile-state-dot" aria-hidden="true" />
              </li>
            ))}
          </ol>
        </Container>
      </section>
      <Section className="profile-approach" aria-labelledby="our-approach">
        <Container width="wide">
          <div className="profile-section-heading">
            <Eyebrow>03 / Our approach</Eyebrow>
            <Heading id="our-approach">
              Dignity is the
              <br />
              <em>starting point.</em>
            </Heading>
          </div>
          <p className="profile-approach__statement">
            {organization.mission.statement}
          </p>
          <ul className="profile-pillars-inline">
            {organization.mission.pillars.map((pillar) => (
              <li key={pillar}>{pillar}</li>
            ))}
          </ul>
          <LinkButton href="/profile/vision-mission" variant="text">
            Explore our vision and mission <Arrow direction="right" />
          </LinkButton>
        </Container>
      </Section>
      <Section
        className="profile-programme-section"
        aria-labelledby="about-programmes"
      >
        <Container width="wide">
          <div className="profile-section-heading">
            <Eyebrow>04 / Our areas of work</Eyebrow>
            <Heading id="about-programmes">
              Many pathways.
              <br />
              <em>One shared purpose.</em>
            </Heading>
          </div>
          <ProgrammeIndex />
        </Container>
      </Section>
      <ProfileExplore current="about" />
      <ProfileClosing />
    </>
  );
}

function VisionMission({ item }: { item: NavigationItem }) {
  return (
    <>
      <ProfileOpening item={item} id="vision-mission" />
      <section className="profile-vision" aria-labelledby="our-vision">
        <Container width="wide">
          <div className="profile-vision__grid">
            <div className="profile-vision__statement">
              <Eyebrow>01 / Our vision</Eyebrow>
              <Heading id="our-vision" size="medium">
                The society
                <br />
                we believe in.
              </Heading>
              <blockquote>{organization.vision.statement}</blockquote>
              <p>Four values at the heart of SEVA.</p>
            </div>
            <ValueEmphasis values={organization.vision.coreValues} />
          </div>
        </Container>
      </section>
      <Section className="profile-mission" aria-labelledby="our-mission">
        <Container width="wide">
          <div className="profile-section-heading">
            <Eyebrow>02 / Our mission</Eyebrow>
            <Reveal variant="statement">
              <Heading id="our-mission">
                Restoring dignity.
                <br />
                <em>Putting values to work.</em>
              </Heading>
            </Reveal>
          </div>
          <p className="profile-mission__statement">
            {organization.mission.statement}
          </p>
          <div className="profile-mission__grid">
            <div className="profile-mission__photo">
              <ProfilePhoto id={profileMedia.mission} ratio="cinematic" />
              <p className="profile-photo-context">
                Educational support in practice · Vidya Jyothi
              </p>
            </div>
            <ol className="profile-mission-pillars">
              {organization.mission.pillars.map((pillar, index) => (
                <li key={pillar}>
                  <Reveal variant="statement" order={index}>
                    <span aria-hidden="true">0{index + 1}</span>
                    <h3>{pillar}</h3>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>
      <ProfileExplore current="vision-mission" />
      <ProfileClosing />
    </>
  );
}

function Leadership({ item }: { item: NavigationItem }) {
  const portraits = getApprovedMediaByCategory("Leadership");
  return (
    <>
      <ProfileOpening item={item} id="leadership">
        <div className="profile-leadership-intro">
          <p>{organization.name}</p>
          <p>Our official leadership directory.</p>
          <Link href="#leadership-directory">
            Meet the leadership <Arrow direction="down" />
          </Link>
        </div>
      </ProfileOpening>
      <section
        id="leadership-directory"
        className="profile-leadership"
        aria-label="Official leadership directory"
      >
        <Container width="wide">
          <div className="profile-leadership__note">
            <Eyebrow>People & responsibility</Eyebrow>
            <p>
              Official names and designations are provided below. Full
              biographies and two verified portraits await organizational
              confirmation.
            </p>
          </div>
          <div className="leadership-directory">
            {[...leadershipProfiles]
              .sort((a, b) => a.order - b.order)
              .map((leader) => {
                const portrait =
                  leader.publicationStatus === "confirmed_official"
                    ? portraits.find(
                        (asset) =>
                          asset.publicUrl === leader.image?.src &&
                          asset.identityConfidence === "confirmed",
                      )
                    : undefined;
                return (
                  <article
                    className={`leadership-feature leadership-feature--${leader.order % 2 ? "odd" : "even"}`}
                    id={`leader-${leader.id}`}
                    key={leader.id}
                    aria-labelledby={`name-${leader.id}`}
                  >
                    <div className="leadership-feature__portrait">
                      <Reveal variant="media">
                        <figure>
                          {portrait ? (
                            <>
                              <Image
                                className="portrait-image"
                                src={portrait.publicUrl}
                                alt={portrait.altText}
                                width={portrait.width}
                                height={portrait.height}
                                sizes="(min-width: 1440px) 480px, (min-width: 768px) 40vw, 90vw"
                                style={{ objectPosition: portrait.focalPoint }}
                              />
                              <figcaption>{portrait.caption}</figcaption>
                            </>
                          ) : (
                            <>
                              <div className="portrait-slot">
                                <span
                                  className="portrait-slot__monogram"
                                  aria-hidden="true"
                                >
                                  {leadershipMonograms[leader.id]}
                                </span>
                                <span className="portrait-slot__name">
                                  {leader.name}
                                </span>
                              </div>
                              <figcaption>
                                Official portrait pending confirmation.
                              </figcaption>
                            </>
                          )}
                        </figure>
                      </Reveal>
                    </div>
                    <div className="leadership-feature__text">
                      <span
                        className="leadership-feature__number"
                        aria-hidden="true"
                      >
                        0{leader.order}
                      </span>
                      <Eyebrow>{leader.title}</Eyebrow>
                      <Reveal variant="statement">
                        <Heading as="h2" size="large" id={`name-${leader.id}`}>
                          {leader.name}
                        </Heading>
                      </Reveal>
                      <span
                        className="leadership-feature__rule"
                        aria-hidden="true"
                      />
                      <p>{organization.name}</p>
                    </div>
                  </article>
                );
              })}
          </div>
        </Container>
      </section>
      <ProfileExplore current="leadership" />
      <ProfileClosing />
    </>
  );
}

function History({ item }: { item: NavigationItem }) {
  return (
    <>
      <ProfileOpening item={item} id="history" />
      <section className="profile-history" aria-labelledby="history-start">
        <Container width="wide">
          <div className="profile-history__grid">
            <div className="profile-history__year">
              <Eyebrow>The documented beginning</Eyebrow>
              <span className="history-year" aria-hidden="true">
                {organization.establishedYear}
              </span>
              <p>{organization.name}</p>
            </div>
            <div>
              <Heading id="history-start" size="medium">
                A beginning.
                <br />
                <em>An enduring purpose.</em>
              </Heading>
              <ol className="profile-timeline">
                {historyMilestones
                  .filter((milestone) => milestone.status === "confirmed")
                  .map((milestone) => (
                    <li key={milestone.id}>
                      <span className="profile-timeline__date">
                        {milestone.year}
                      </span>
                      <h3>{milestone.title}</h3>
                      <p>{milestone.description}</p>
                      <details>
                        <summary>About this record</summary>
                        <p>Source: {milestone.source}</p>
                        <p>
                          This is the confirmed establishment year. Further
                          historical milestones will be added after
                          organizational confirmation.
                        </p>
                      </details>
                    </li>
                  ))}
              </ol>
              <aside
                className="profile-history__note"
                aria-label="Historical content status"
              >
                Our history will grow here as further archival records and
                milestones are confirmed by SEVA.
              </aside>
            </div>
          </div>
        </Container>
      </section>
      <section
        className="profile-history-purpose"
        aria-labelledby="history-purpose"
      >
        <Container width="wide">
          <Eyebrow>Our purpose</Eyebrow>
          <Reveal variant="statement">
            <Heading id="history-purpose">
              Love in action.
              <br />
              <em>Then, now, onward.</em>
            </Heading>
          </Reveal>
          <p>{organization.mission.statement}</p>
        </Container>
      </section>
      <Section
        className="profile-programme-section"
        aria-labelledby="history-work"
      >
        <Container width="wide">
          <div className="profile-section-heading">
            <Eyebrow>SEVA’s work today</Eyebrow>
            <Heading id="history-work">
              A continuing
              <br />
              <em>commitment to community.</em>
            </Heading>
          </div>
          <p className="profile-current-note">
            Explore SEVA’s current areas of community work.
          </p>
          <ProgrammeIndex />
          <LinkButton href="/#website-status" variant="text">
            View organization-reported reach <Arrow direction="right" />
          </LinkButton>
        </Container>
      </Section>
      <ProfileExplore current="history" />
      <ProfileClosing />
    </>
  );
}

export function ProfilePage({
  item,
  id,
}: {
  item: NavigationItem;
  id: ProfilePageId;
}) {
  const pages = {
    profile: Overview,
    about: About,
    "vision-mission": VisionMission,
    leadership: Leadership,
    history: History,
  };
  const Page = pages[id];
  return (
    <div className={`profile-page profile-page--${id}`} data-profile-page={id}>
      <Page item={item} />
    </div>
  );
}
