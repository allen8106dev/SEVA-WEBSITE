import Image from "next/image";
import Link from "next/link";
import { contactInfo } from "@/content/contact";
import { organization } from "@/content/organization";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/layout";
import { FooterInquiryForm } from "./footer-inquiry-form";

export function SiteFooter() {
  return (
    <footer className="site-footer" id="contact">
      <Container width="wide">
        <div className="footer-grid">
          <div className="footer-contact-column">
            <address className="footer-contact-details">
              <h2 className="footer-label">Contact</h2>
              <a href={contactInfo.phone.href}>{contactInfo.phone.display}</a>
              <a href={contactInfo.email.href}>{contactInfo.email.display}</a>
              <span className="footer-contact-address">
                {contactInfo.address.premises}
                <br />
                {contactInfo.address.street}, {contactInfo.address.locality}
                <br />
                {contactInfo.address.city}
                {" \u2013 "}
                {contactInfo.address.pinCode}, {contactInfo.address.state},{" "}
                {contactInfo.address.country}
              </span>
            </address>
            <Link
              href="/"
              className="footer-brand-lockup"
              aria-label={`${organization.name} home`}
            >
              <Image
                src={organization.branding.logoOriginal}
                alt={organization.branding.alt}
                className="footer-logo-image"
                width={627}
                height={552}
              />
            </Link>
          </div>

          <div
            className="footer-form-column"
            aria-labelledby="footer-inquiry-title"
          >
            <h2 className="footer-label" id="footer-inquiry-title">
              Get in touch
            </h2>
            <FooterInquiryForm recipient={contactInfo.email.display} />
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-bottom-copy">
            <p className="footer-copyright">
              {"\u00a9"} {new Date().getFullYear()} {siteConfig.name}. All
              rights reserved.
            </p>
            <p className="footer-credit">
              <span>Powered by</span>{" "}
              <a
                href="https://linktr.ee/allen8106.dev"
                target="_blank"
                rel="noopener noreferrer"
              >
                Allen Joseph
              </a>
            </p>
          </div>
          <a
            className="footer-back-to-top"
            href="#top"
            aria-label="Back to top"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              focusable="false"
            >
              <path
                d="M12 19V5m0 0L6.5 10.5M12 5l5.5 5.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </Container>
    </footer>
  );
}
