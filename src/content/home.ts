/** Provisional editorial content. Replace only with approved copy and consented media. */
export type HomeMedia = {
  caption: string;
  ratio: "portrait" | "landscape" | "cinematic" | "square";
} & (
  | {
      kind: "illustration";
      artwork: "seed" | "learning" | "gathering" | "story";
    }
  | { kind: "image"; src: string; alt: string; focalPoint?: string }
  | {
      kind: "video";
      src: string;
      poster: string;
      alt: string;
      captionsSrc: string;
    }
);

export type ImpactAreaContent = {
  id: string;
  title: string;
  description: string;
  category?: string;
  note: string;
  media: HomeMedia;
  link?: { href: string; label: string };
  accent?: "green" | "earth";
};

export type StatisticContent = { label: string } & (
  | { status: "pending" }
  | {
      status: "verified";
      value: string | number;
      source: string;
      prefix?: string;
      suffix?: string;
      maximumFractionDigits?: number;
    }
);

export const homeContent = {
  hero: {
    eyebrow: "SEVA / A beginning, together",
    headline: {
      opening: "Small acts.",
      emphasis: "Extraordinary",
      ending: "change.",
    },
    description:
      "Welcome to SEVA. A new space to explore service, community, and the possibilities of coming together.",
    primary: { href: "#purpose", label: "Explore the beginning" },
    secondary: { href: "#participation", label: "Ways to take part" },
    notice: "Website in development · Provisional content",
    media: {
      kind: "image",
      src: "/images/hero-humanity.jpg",
      alt: "A warm, genuine moment of community connection and human warmth in natural light",
      ratio: "portrait",
      caption:
        "Provisional documentary photograph · Ben White (Unsplash) · Human connection and everyday presence.",
      focalPoint: "50% 32%",
    } satisfies HomeMedia,
  },
  purpose: {
    eyebrow: "01 / The idea of service",
    heading: "Change begins with the way we show up for one another.",
    description:
      "A little time. A willingness to listen. A shared sense of possibility. Service can begin in ordinary moments, wherever people choose to care.",
    note: "An editorial reflection on service. SEVA’s official mission will be shared once confirmed.",
    media: {
      kind: "image",
      src: "/images/purpose-hands.jpg",
      alt: "Hands gathered in collaboration, care, and purposeful action",
      ratio: "landscape",
      caption:
        "Provisional documentary study · Joel Muniz (Unsplash) · Hands united in solidarity.",
      focalPoint: "50% 50%",
    } satisfies HomeMedia,
  },
  areas: {
    eyebrow: "02 / Possibilities, not promises",
    heading: "A place for purposeful work.",
    description:
      "This space is designed to introduce SEVA’s initiatives when they are confirmed. The themes below demonstrate the layout; they are not current SEVA programs.",
    items: [
      {
        id: "learning",
        title: "Learning opens possibilities.",
        category: "Illustrative theme / Learning",
        description:
          "A future initiative could be introduced here through the people involved, the needs they identify, and the work they choose to do together.",
        note: "Demonstration only — not a confirmed SEVA initiative.",
        accent: "green",
        media: {
          kind: "image",
          src: "/images/impact-learning.jpg",
          alt: "Community learning and mentorship in an engaging educational setting",
          ratio: "landscape",
          caption:
            "Provisional documentary study · CDC (Unsplash) · Learning opens possibilities.",
          focalPoint: "50% 40%",
        },
      },
      {
        id: "community",
        title: "Connection creates room to grow.",
        category: "Illustrative theme / Community",
        description:
          "An adaptable space for an approved community initiative, with its context, approach, and next steps clearly explained.",
        note: "Demonstration only — not a confirmed SEVA initiative.",
        accent: "earth",
        media: {
          kind: "image",
          src: "/images/impact-community.jpg",
          alt: "A warm community gathering sharing food, conversation, and fellowship",
          ratio: "square",
          caption:
            "Provisional documentary study · Hannah Busing (Unsplash) · Shared life and belonging.",
          focalPoint: "50% 50%",
        },
      },
    ] satisfies ImpactAreaContent[],
  },
  story: {
    eyebrow: "03 / The human side",
    heading: "Every story deserves to be heard with care.",
    description:
      "Behind meaningful work are people with their own voices, experiences, and hopes. This space is reserved for their stories, shared with permission and in their own terms.",
    note: "Story preview / No beneficiary story or testimonial has been published.",
    media: {
      kind: "image",
      src: "/images/story-portrait.jpg",
      alt: "A dignified portrait capturing human depth, resilience, and quiet strength",
      ratio: "portrait",
      caption:
        "Provisional documentary portrait · Ayo Ogunseinde (Unsplash) · Reserved for authentic voices.",
      focalPoint: "50% 30%",
    } satisfies HomeMedia,
    link: undefined as { href: string; label: string } | undefined,
  },
  overview: {
    eyebrow: "04 / Impact & transparency",
    heading: "Trust grows in the open.",
    description:
      "Clear information matters. Verified figures, their context, and supporting reports will belong here as SEVA confirms what can be shared.",
    statistics: [
      { label: "People participating", status: "pending" },
      { label: "Initiatives introduced", status: "pending" },
      { label: "Community reach", status: "pending" },
    ] satisfies StatisticContent[],
    noticeTitle: "Currently in development",
    notice:
      "No impact figures are published yet. This is a provisional website; official activities, reports, and contact details are awaiting confirmation.",
  },
  participation: {
    eyebrow: "05 / A place for you",
    heading: "There are many ways to show you care.",
    description:
      "Participation can take many forms. These are previews of possible ways to get involved, not open opportunities or services currently offered by SEVA.",
    options: [
      {
        title: "Give your time",
        description: "Future volunteering information",
        status: "Not open yet",
      },
      {
        title: "Share your skills",
        description: "Future collaboration information",
        status: "Not open yet",
      },
      {
        title: "Come together",
        description: "Future events and gatherings",
        status: "Not open yet",
      },
      {
        title: "Support with care",
        description: "Future ways to contribute",
        status: "Not available yet",
      },
    ],
    action: { href: "#contact", label: "View the contact status" },
  },
  closing: {
    eyebrow: "The beginning is a small act.",
    heading: "Let’s make room for what comes next.",
    description:
      "This is SEVA’s first chapter online. Explore this space with us as the details take shape.",
    action: { href: "#introduction", label: "Return to the beginning" },
    media: {
      kind: "image",
      src: "/images/closing-together.jpg",
      alt: "People gathered together in unity, community, and purpose",
      ratio: "landscape",
      caption:
        "Provisional documentary study · Duy Pham (Unsplash) · Moving forward together.",
      focalPoint: "50% 40%",
    } satisfies HomeMedia,
  },
};
