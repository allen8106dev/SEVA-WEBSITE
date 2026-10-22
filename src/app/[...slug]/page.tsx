import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { interiorNavigation, type NavigationItem } from "@/config/navigation";
import { InteriorPage } from "@/components/layout/interior-page";
import { InteriorContent } from "@/components/sections/interior-content";
import { ProfilePage } from "@/components/sections/profile-pages";
import { ProgrammePage } from "@/components/sections/programme-pages";
import { ProjectPage } from "@/components/sections/project-pages";
import { MediaOverviewPage } from "@/components/sections/media-overview-page";
import { MediaGalleryPage } from "@/components/sections/media-gallery-page";
import { MediaVideosPage } from "@/components/sections/media-videos-page";
import { MediaNewsPage } from "@/components/sections/media-news-page";
import { NewsArticlePage } from "@/components/sections/news-article-page";
import { ResourcePage } from "@/components/sections/resource-pages";
import {
  ContactPage,
  CsrPage,
  DonatePage,
  GetInvolvedPage,
  VolunteerPage,
} from "@/components/sections/get-involved-pages";
import { isProfilePageId, profileContent } from "@/content/profile";
import { isProgrammePageId, programmesContent } from "@/content/programmes";
import { getProjectByRoute } from "@/content/projects";
import { getNewsArticleBySlug, getApprovedNewsArticles } from "@/content/news";
import { siteConfig } from "@/config/site";

export const dynamicParams = false;

export function generateStaticParams() {
  const interior = interiorNavigation.map((item) => ({
    slug: item.href.slice(1).split("/"),
  }));
  const articles = getApprovedNewsArticles().map((article) => ({
    slug: ["media", "news-events", article.slug],
  }));
  return [...interior, ...articles];
}

async function getItem(params: Promise<{ slug: string[] }>): Promise<{
  item: NavigationItem;
  article?: ReturnType<typeof getNewsArticleBySlug>;
}> {
  const { slug } = await params;
  if (slug.length === 3 && slug[0] === "media" && slug[1] === "news-events") {
    const article = getNewsArticleBySlug(slug[2]);
    if (!article) notFound();
    const item: NavigationItem = {
      id: article.id,
      label: article.title,
      href: `/media/news-events/${article.slug}`,
      description: article.summary,
      visible: true,
      status: "available",
      match: "exact",
    };
    return { item, article };
  }
  const item = interiorNavigation.find(
    (nav) => nav.href === `/${slug.join("/")}`,
  );
  if (!item) notFound();
  return { item };
}

export async function generateMetadata({
  params,
}: PageProps<"/[...slug]">): Promise<Metadata> {
  const { item, article } = await getItem(params);
  const project = getProjectByRoute(item.href);
  const description = article
    ? article.metaDescription || article.summary
    : isProfilePageId(item.id)
      ? profileContent[item.id].description
      : isProgrammePageId(item.id)
        ? programmesContent[item.id].metaDescription
        : project
          ? project.metaDescription
          : item.href === "/get-involved"
            ? "Explore documented ways to connect with SEVA Social Service Society."
            : item.href === "/get-involved/volunteer"
              ? "Learn about SEVA’s documented volunteering areas and email the directorate with an expression of interest."
              : item.href === "/get-involved/csr"
                ? "Explore SEVA’s documented CSR-aligned programme areas and partnership approach."
                : item.href === "/get-involved/donate"
                  ? "Review SEVA’s designated giving purposes and request approved donation information."
                  : item.href === "/contact"
                    ? "Contact SEVA Social Service Society using its verified email, phone, and office address."
                    : item.description;
  return {
    title: item.label,
    description,
    robots: { index: false, follow: false },
    openGraph: { title: item.label, description },
    ...(siteConfig.url &&
    (article ||
      isProfilePageId(item.id) ||
      isProgrammePageId(item.id) ||
      project)
      ? { alternates: { canonical: new URL(item.href, siteConfig.url) } }
      : {}),
  };
}

export default async function Page({ params }: PageProps<"/[...slug]">) {
  const { item, article } = await getItem(params);
  if (article) return <NewsArticlePage article={article} />;
  if (item.href === "/resources" || item.href.startsWith("/resources/"))
    return <ResourcePage item={item} />;
  if (item.href === "/media") return <MediaOverviewPage item={item} />;
  if (item.href === "/media/gallery") return <MediaGalleryPage item={item} />;
  if (item.href === "/media/videos") return <MediaVideosPage item={item} />;
  if (item.href === "/media/news-events") return <MediaNewsPage item={item} />;
  if (item.href === "/get-involved") return <GetInvolvedPage item={item} />;
  if (item.href === "/get-involved/volunteer")
    return <VolunteerPage item={item} />;
  if (item.href === "/get-involved/csr") return <CsrPage item={item} />;
  if (item.href === "/get-involved/donate") return <DonatePage item={item} />;
  if (item.href === "/contact") return <ContactPage item={item} />;
  if (isProfilePageId(item.id)) return <ProfilePage item={item} id={item.id} />;
  if (isProgrammePageId(item.id))
    return <ProgrammePage item={item} id={item.id} />;
  const project = getProjectByRoute(item.href);
  if (project) return <ProjectPage item={item} project={project} />;
  return (
    <InteriorPage item={item}>
      <InteriorContent item={item} />
    </InteriorPage>
  );
}
