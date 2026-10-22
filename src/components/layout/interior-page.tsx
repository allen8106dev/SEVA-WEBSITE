import type { ReactNode } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/layout";
import { Eyebrow } from "@/components/ui/typography";
import { navigation, type NavigationItem } from "@/config/navigation";

export function ContentStatusNotice({ children }: { children: ReactNode }) {
  return (
    <aside className="content-notice" aria-label="Content status">
      <strong>Section under preparation</strong>
      <p>{children}</p>
    </aside>
  );
}

export function Breadcrumbs({ item }: { item: NavigationItem }) {
  const parent = navigation.find((group) =>
    group.children?.some((child) => child.href === item.href),
  );
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        <li>
          <Link href="/">Home</Link>
        </li>
        {parent && (
          <li>
            <Link href={parent.href}>{parent.label}</Link>
          </li>
        )}
        <li>
          <span aria-current="page">{item.label}</span>
        </li>
      </ol>
    </nav>
  );
}

export function InteriorPage({
  item,
  children,
}: {
  item: NavigationItem;
  children: ReactNode;
}) {
  const parent = navigation.find((group) =>
    group.children?.some((child) => child.href === item.href),
  );
  return (
    <>
      <div className="interior-hero">
        <Container>
          <Breadcrumbs item={item} />
          <Eyebrow>SEVA · Love In Action</Eyebrow>
          <h1>{item.label}</h1>
          <p>{item.description}</p>
        </Container>
      </div>
      <Container className="interior-body">
        {children}
        <section aria-label="Related pages">
          <h2>
            {item.children
              ? "Explore this section"
              : `More from ${parent?.label ?? "SEVA"}`}
          </h2>
          <div className="interior-grid">
            {(item.children ?? parent?.children ?? navigation)
              .filter((link) => link.visible && link.href !== item.href)
              .map((link) => (
                <article className="interior-card" key={link.id}>
                  <h3>{link.label}</h3>
                  <p>{link.description}</p>
                  <Link href={link.href}>
                    Explore {link.label} <span aria-hidden="true">↗</span>
                  </Link>
                  {link.status === "pending" && <p>Content in preparation</p>}
                </article>
              ))}
          </div>
        </section>
      </Container>
    </>
  );
}
