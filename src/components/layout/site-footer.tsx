import { siteConfig } from "@/config/site";
import Link from "next/link";
import { Container } from "@/components/ui/layout";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import { Arrow, LinkButton } from "@/components/ui/button";

export function SiteFooter() {
  return (
    <footer className="site-footer" id="contact">
      <Container width="wide">
        <div className="footer-heading-row">
          <Heading size="medium">
            A new online home.
            <br />
            <em>A thoughtful beginning.</em>
          </Heading>
          <LinkButton
            href="/#introduction"
            variant="icon"
            aria-label="Back to introduction"
          >
            <Arrow direction="up" />
          </LinkButton>
        </div>
        <div className="footer-grid">
          <div>
            <Link
              href="/#introduction"
              className="wordmark"
              aria-label="SEVA introduction"
            >
              SEVA
            </Link>
            <Text size="caption" className="footer-note">
              A space to share our story.
              <br />
              More to come.
            </Text>
          </div>
          <div>
            <Eyebrow className="footer-label">Explore</Eyebrow>
            <nav className="footer-links" aria-label="Footer navigation">
              {siteConfig.navigation.slice(0, 2).map((item) => (
                <Link
                  className="nav-link"
                  key={item.href}
                  href={`/${item.href}`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div>
            <Eyebrow className="footer-label">Stay connected</Eyebrow>
            <Text size="caption" className="footer-note">
              Official contact details will be added once confirmed.
            </Text>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </span>
          <span>Website in development · Provisional identity</span>
        </div>
      </Container>
    </footer>
  );
}
