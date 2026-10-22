import { contactInfo } from "@/content/contact";
import { Container } from "@/components/ui/layout";

export function SiteMap() {
  const { address } = contactInfo;
  const query = encodeURIComponent(
    `${address.premises}, ${address.street}, ${address.locality}, ${address.city} ${address.pinCode}, ${address.state}, ${address.country}`,
  );

  return (
    <section className="site-map" aria-labelledby="site-map-title">
      <Container width="wide">
        <h2 className="site-map__title" id="site-map-title">
          Find us
        </h2>
        <iframe
          className="site-map__frame"
          title={`Map showing ${address.fullFormatted}`}
          src={`https://maps.google.com/maps?q=${query}&z=15&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </Container>
    </section>
  );
}
