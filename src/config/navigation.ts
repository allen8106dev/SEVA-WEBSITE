export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  description: string;
  visible: boolean;
  status: "available" | "foundation" | "pending";
  match: "exact" | "subtree";
  children?: readonly NavigationItem[];
}

function child(
  id: string,
  label: string,
  parent: string,
  description: string,
  status: NavigationItem["status"] = "foundation",
  children?: readonly NavigationItem[],
): NavigationItem {
  return {
    id,
    label,
    href: `/${parent}/${id}`,
    description,
    visible: true,
    status,
    match: "subtree",
    children,
  };
}

function projectChild(
  id: string,
  label: string,
  programmeSlug: string,
  description: string,
): NavigationItem {
  return {
    id,
    label,
    href: `/programmes/${programmeSlug}/${id}`,
    description,
    visible: true,
    status: "available",
    match: "exact",
  };
}

export const navigation: readonly NavigationItem[] = [
  {
    id: "home",
    label: "Home",
    href: "/",
    description: "Love In Action",
    visible: true,
    status: "available",
    match: "exact",
  },
  {
    id: "profile",
    label: "Profile",
    href: "/profile",
    description: "Our identity, purpose and people.",
    visible: true,
    status: "available",
    match: "subtree",
    children: [
      child(
        "about",
        "About SEVA",
        "profile",
        "Get to know SEVA Social Service Society.",
        "available",
      ),
      child(
        "vision-mission",
        "Vision & Mission",
        "profile",
        "The values that guide our work.",
        "available",
      ),
      child(
        "leadership",
        "Leadership",
        "profile",
        "Our official leadership directory.",
        "available",
      ),
      child(
        "history",
        "Our History",
        "profile",
        "Established in 2015; further milestones await confirmation.",
        "available",
      ),
    ],
  },
  {
    id: "programmes",
    label: "Programmes",
    href: "/programmes",
    description: "Explore our seven areas of community work.",
    visible: true,
    status: "available",
    match: "subtree",
    children: [
      child(
        "education",
        "Education",
        "programmes",
        "Learning, mentoring and educational support.",
        "available",
        [
          projectChild(
            "cnewa",
            "CNEWA Non-Formal Education",
            "education",
            "Foundational learning for migrant & vulnerable children.",
          ),
          projectChild(
            "vidya-jyoti",
            "Vidya Jyoti Scholarship Programme",
            "education",
            "Comprehensive educational assistance & mentoring.",
          ),
        ],
      ),
      child(
        "healthcare",
        "Healthcare",
        "programmes",
        "Community health and preventive care.",
        "available",
        [
          projectChild(
            "medical-outreach",
            "Healthcare and Medical Outreach",
            "healthcare",
            "Preventive health camps & medical assistance.",
          ),
        ],
      ),
      child(
        "women-empowerment",
        "Women Empowerment",
        "programmes",
        "Livelihoods, self-help groups and leadership.",
        "available",
        [
          projectChild(
            "jeevan",
            "Jeevan Project",
            "women-empowerment",
            "Women's empowerment & sustainable community governance in Raigad.",
          ),
          projectChild(
            "sui-daga",
            "Sui Daga Tailoring Project",
            "women-empowerment",
            "Vocational tailoring training & livelihood development.",
          ),
        ],
      ),
      child(
        "community-welfare",
        "Community Welfare",
        "programmes",
        "Compassionate support for vulnerable communities.",
        "available",
        [
          projectChild(
            "seva-ruby-meal",
            "SEVA Ruby Meal",
            "community-welfare",
            "Weekly Friday community nutrition initiative in Khadki-Pune.",
          ),
        ],
      ),
      child(
        "rural-tribal-development",
        "Rural & Tribal Development",
        "programmes",
        "Grassroots resilience and sustainable development.",
        "available",
      ),
      child(
        "skill-development",
        "Skill Development",
        "programmes",
        "Vocational training and employability.",
        "available",
      ),
      child(
        "relief-works",
        "Relief Works",
        "programmes",
        "Humanitarian aid and rehabilitation.",
        "available",
      ),
    ],
  },
  {
    id: "media",
    label: "Media",
    href: "/media",
    description:
      "Official documentary photography, video archives, and community dispatches.",
    visible: true,
    status: "available",
    match: "subtree",
    children: [
      child(
        "gallery",
        "Photo Gallery",
        "media",
        "Approved documentary photography from SEVA's grassroots initiatives.",
        "available",
      ),
      child(
        "videos",
        "Videos",
        "media",
        "Official video archives and documentary features.",
        "available",
      ),
      child(
        "news-events",
        "News & Events",
        "media",
        "Updates, community announcements, and press coverage.",
        "available",
      ),
    ],
  },
  {
    id: "resources",
    label: "Resources",
    href: "/resources",
    description: "Public documents will appear after publication approval.",
    visible: true,
    status: "available",
    match: "subtree",
    children: [
      child(
        "annual-reports",
        "Annual Reports",
        "resources",
        "Public annual reports are not yet available.",
        "available",
      ),
      child(
        "financial-statements",
        "Audited Financial Statements",
        "resources",
        "Public financial statements await approval.",
        "available",
      ),
      child(
        "compliance",
        "Compliance Documents",
        "resources",
        "Public compliance documents await approval.",
        "available",
      ),
    ],
  },
  {
    id: "get-involved",
    label: "Get Involved",
    href: "/get-involved",
    description: "Explore ways to support community work.",
    visible: true,
    status: "available",
    match: "subtree",
    children: [
      child(
        "volunteer",
        "Volunteer",
        "get-involved",
        "Learn about volunteering areas and contact the directorate.",
        "available",
      ),
      child(
        "csr",
        "CSR Partnerships",
        "get-involved",
        "Explore areas for corporate collaboration.",
        "available",
      ),
      child(
        "donate",
        "Donate",
        "get-involved",
        "Giving channels await management authorization.",
        "available",
      ),
    ],
  },
  {
    id: "contact",
    label: "Contact Us",
    href: "/contact",
    description: "Speak with the SEVA directorate.",
    visible: true,
    status: "available",
    match: "exact",
  },
];

export function isNavigationActive(
  pathname: string,
  item: NavigationItem,
): boolean {
  return (
    pathname === item.href ||
    (item.match === "subtree" && pathname.startsWith(`${item.href}/`))
  );
}

function flattenNav(items: readonly NavigationItem[]): NavigationItem[] {
  return items.flatMap((item) => [
    item,
    ...(item.children ? flattenNav(item.children) : []),
  ]);
}

export const interiorNavigation: readonly NavigationItem[] = flattenNav(
  navigation.filter((item) => item.href !== "/"),
);
