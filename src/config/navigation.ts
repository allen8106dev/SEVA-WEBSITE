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
): NavigationItem {
  return {
    id,
    label,
    href: `/${parent}/${id}`,
    description,
    visible: true,
    status,
    match: "subtree",
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
      ),
      child(
        "healthcare",
        "Healthcare",
        "programmes",
        "Community health and preventive care.",
        "available",
      ),
      child(
        "women-empowerment",
        "Women Empowerment",
        "programmes",
        "Livelihoods, self-help groups and leadership.",
        "available",
      ),
      child(
        "community-welfare",
        "Community Welfare",
        "programmes",
        "Compassionate support for vulnerable communities.",
        "available",
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
    description: "Programme documentation and future updates.",
    visible: true,
    status: "foundation",
    match: "subtree",
    children: [
      child(
        "gallery",
        "Photo Gallery",
        "media",
        "Approved photographs from the SEVA archive.",
      ),
      child(
        "videos",
        "Videos",
        "media",
        "Approved videos are not yet available.",
        "pending",
      ),
      child(
        "news-events",
        "News & Events",
        "media",
        "Updates await approved material.",
        "pending",
      ),
    ],
  },
  {
    id: "resources",
    label: "Resources",
    href: "/resources",
    description: "Public documents will appear after publication approval.",
    visible: true,
    status: "foundation",
    match: "subtree",
    children: [
      child(
        "annual-reports",
        "Annual Reports",
        "resources",
        "Public annual reports are not yet available.",
        "pending",
      ),
      child(
        "financial-statements",
        "Audited Financial Statements",
        "resources",
        "Public financial statements await approval.",
        "pending",
      ),
      child(
        "compliance",
        "Compliance Documents",
        "resources",
        "Public compliance documents await approval.",
        "pending",
      ),
    ],
  },
  {
    id: "get-involved",
    label: "Get Involved",
    href: "/get-involved",
    description: "Explore ways to support community work.",
    visible: true,
    status: "foundation",
    match: "subtree",
    children: [
      child(
        "volunteer",
        "Volunteer",
        "get-involved",
        "Learn about volunteering areas and contact the directorate.",
      ),
      child(
        "csr",
        "CSR Partnerships",
        "get-involved",
        "Explore areas for corporate collaboration.",
      ),
      child(
        "donate",
        "Donate",
        "get-involved",
        "Giving channels await management authorization.",
        "pending",
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

export const interiorNavigation = navigation
  .filter((item) => item.href !== "/")
  .flatMap((item) => [item, ...(item.children ?? [])]);
