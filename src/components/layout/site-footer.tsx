import { siteConfig } from "@/config/site";
import { contactInfo } from "@/content/contact";
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
            SEVA Social Service Society.
            <br />
            <em>Love In Action.</em>
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
            <div className="footer-brand-lockup">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/seva-logo.png"
                alt="SEVA Social Service Society"
                className="footer-logo-image"
                width={52}
                height={46}
              />
              <Link
                href="/#introduction"
                className="wordmark"
                aria-label="SEVA introduction"
              >
                <span className="wordmark__lettering">SEVA</span>
                <span className="wordmark__dot" aria-hidden="true" />
              </Link>
            </div>
            <Text size="caption" className="footer-note">
              SEVA Social Service Society
              <br />
              Registered Not-for-Profit Society · Est. 2015
              <br />
              Maharashtra · Tamil Nadu · Andhra Pradesh
            </Text>
          </div>
          <div>
            <Eyebrow className="footer-label">Explore</Eyebrow>
            <nav className="footer-links" aria-label="Footer navigation">
              {siteConfig.navigation.slice(0, 3).map((item) => (
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
            <Eyebrow className="footer-label">Contact Directorate</Eyebrow>
            <div className="footer-contact-details">
              <Text size="caption" className="footer-contact-item">
                <strong>{contactInfo.contactPerson}</strong>, {contactInfo.role}
              </Text>
              <Text size="caption" className="footer-contact-item">
                <a
                  href={contactInfo.phone.href}
                  className="footer-contact-link"
                >
                  {contactInfo.phone.display}
                </a>
              </Text>
              <Text size="caption" className="footer-contact-item">
                <a
                  href={contactInfo.email.href}
                  className="footer-contact-link"
                >
                  {contactInfo.email.display}
                </a>
              </Text>
              <Text size="caption" className="footer-contact-address">
                {contactInfo.address.fullFormatted}
              </Text>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </span>
          <span>
            Registered Not-for-Profit Society · Est. 2015 · Love In Action
          </span>
        </div>
      </Container>
    </footer>
  );
}
