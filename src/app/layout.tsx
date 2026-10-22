import type { Metadata } from "next";
import Link from "next/link";
import localFont from "next/font/local";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { siteConfig } from "@/config/site";
import { motionStyles } from "@/config/motion";
import { navigation } from "@/config/navigation";
import "./globals.css";
import "@/styles/home.css";
import "@/styles/navigation.css";
import "@/styles/profile.css";
import "@/styles/programmes.css";

const editorial = localFont({
  src: [
    {
      path: "../assets/fonts/cormorant-garamond-latin.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/cormorant-garamond-latin-italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-editorial",
  display: "swap",
  fallback: ["Georgia"],
});
const body = localFont({
  src: "../assets/fonts/manrope-latin.woff2",
  weight: "200 800",
  variable: "--font-body",
  display: "swap",
  fallback: ["Arial"],
});

export const metadata: Metadata = {
  metadataBase: siteConfig.url,
  title: { default: siteConfig.title, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  robots: { index: siteConfig.indexable, follow: siteConfig.indexable },
  openGraph: {
    type: "website",
    locale: "en",
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    ...(siteConfig.url ? { url: siteConfig.url } : {}),
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${editorial.variable} ${body.variable}`}
      style={motionStyles}
    >
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteHeader />
        <noscript>
          <nav
            aria-label="Navigation without JavaScript"
            className="no-script-navigation"
          >
            {navigation
              .filter((item) => item.visible)
              .map((item) => (
                <Link key={item.id} href={item.href}>
                  {item.label}
                </Link>
              ))}
          </nav>
        </noscript>
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
