function getSiteUrl(value: string | undefined): URL | undefined {
  if (!value) return undefined;
  const url = new URL(value);
  if (
    !["https:", "http:"].includes(url.protocol) ||
    url.username ||
    url.password ||
    url.pathname !== "/" ||
    url.search ||
    url.hash
  ) {
    throw new Error(
      "SITE_URL must be an HTTP(S) origin without credentials, a path, query, or fragment.",
    );
  }
  return url;
}

const url = getSiteUrl(process.env.SITE_URL);

export const siteConfig = {
  name: "SEVA",
  title: "SEVA — Small acts. Extraordinary change.",
  description:
    "The official SEVA website is under development. A new space to learn about the organization is taking shape.",
  url,
  // Vercel preview deployments must remain private to search engines.
  indexable: Boolean(
    url &&
    process.env.SITE_INDEXABLE === "true" &&
    (!process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production"),
  ),
  navigation: [
    { href: "#introduction", label: "Introduction" },
    { href: "#purpose", label: "Our approach" },
    { href: "#website-status", label: "Website status" },
    { href: "#contact", label: "Contact" },
  ],
} as const;
