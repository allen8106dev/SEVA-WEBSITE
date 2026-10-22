import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { interiorNavigation } from "@/config/navigation";
import { InteriorPage } from "@/components/layout/interior-page";
import { InteriorContent } from "@/components/sections/interior-content";
import { ProfilePage } from "@/components/sections/profile-pages";
import { ProgrammePage } from "@/components/sections/programme-pages";
import { isProfilePageId, profileContent } from "@/content/profile";
import { isProgrammePageId, programmesContent } from "@/content/programmes";
import { siteConfig } from "@/config/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return interiorNavigation.map((item) => ({
    slug: item.href.slice(1).split("/"),
  }));
}

async function getItem(params: Promise<{ slug: string[] }>) {
  const { slug } = await params;
  const item = interiorNavigation.find(
    (item) => item.href === `/${slug.join("/")}`,
  );
  if (!item) notFound();
  return item;
}

export async function generateMetadata({
  params,
}: PageProps<"/[...slug]">): Promise<Metadata> {
  const item = await getItem(params);
  const description = isProfilePageId(item.id)
    ? profileContent[item.id].description
    : isProgrammePageId(item.id)
      ? programmesContent[item.id].metaDescription
      : item.description;
  return {
    title: item.label,
    description,
    robots: { index: false, follow: false },
    openGraph: { title: item.label, description },
    ...(siteConfig.url &&
    (isProfilePageId(item.id) || isProgrammePageId(item.id))
      ? { alternates: { canonical: new URL(item.href, siteConfig.url) } }
      : {}),
  };
}

export default async function Page({ params }: PageProps<"/[...slug]">) {
  const item = await getItem(params);
  if (isProfilePageId(item.id)) return <ProfilePage item={item} id={item.id} />;
  if (isProgrammePageId(item.id))
    return <ProgrammePage item={item} id={item.id} />;
  return (
    <InteriorPage item={item}>
      <InteriorContent item={item} />
    </InteriorPage>
  );
}
