import Image from "next/image";
import Link from "next/link";
import { contactInfo } from "@/content/contact";
import { navigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/layout";
import { FooterInquiryForm } from "./footer-inquiry-form";
import { NavigationLinks } from "./navigation";

export function SiteFooter() {
  const essentialLinks = navigation.filter((item) =>
    ["profile", "programmes", "media", "resources", "get-involved"].includes(
      item.id,
    ),
  );

  return (
    <footer className="site-footer" id="contact">
      <Container width="wide">
        <div className="footer-grid">
          <div className="footer-identity">
            <Link href="/" aria-label="SEVA Social Service Society home">
              <Image
                src="/images/seva-logo-header.png"
                alt="SEVA Social Service Society official logo"
                className="footer-logo-image"
                width={443}
                height={431}
              />
            </Link>
            <p>Love In Action</p>
            <Link
              className="footer-link"
              href="/#introduction"
              aria-label="Back to introduction"
            >
              Back to introduction
            </Link>
            <p>
              © {new Date().getFullYear()} {siteConfig.name}. All rights
              reserved.
            </p>
          </div>

          <nav className="footer-links" aria-label="Footer navigation">
            <h2 className="footer-label">Explore</h2>
            {essentialLinks.map((item) => (
              <Link className="footer-link" key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
            <Link className="footer-link" href="/contact">
              Contact Us
            </Link>
            <details className="footer-chapters">
              <summary>Homepage sections</summary>
              <nav aria-label="Homepage chapters">
                <NavigationLinks />
              </nav>
            </details>
          </nav>

          <address className="footer-contact-details">
            <h2 className="footer-label">Contact SEVA</h2>
            <span>
              {contactInfo.contactPerson}, {contactInfo.role}
            </span>
            <a href={contactInfo.phone.href}>{contactInfo.phone.display}</a>
            <a href={contactInfo.email.href}>{contactInfo.email.display}</a>
            <span>{contactInfo.address.fullFormatted}</span>
          </address>

          <div
            className="footer-form-column"
            aria-labelledby="footer-inquiry-title"
          >
            <h2 className="footer-label" id="footer-inquiry-title">
              General inquiry
            </h2>
            <FooterInquiryForm recipient={contactInfo.email.display} />
          </div>
        </div>
      </Container>
    </footer>
  );
}
