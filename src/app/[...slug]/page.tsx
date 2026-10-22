import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { interiorNavigation } from "@/config/navigation";
import { InteriorPage } from "@/components/layout/interior-page";
import { InteriorContent } from "@/components/sections/interior-content";

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
  return {
    title: item.label,
    description: item.description,
    robots: { index: false, follow: false },
    openGraph: { title: item.label, description: item.description },
  };
}

export default async function Page({ params }: PageProps<"/[...slug]">) {
  const item = await getItem(params);
  return (
    <InteriorPage item={item}>
      <InteriorContent item={item} />
    </InteriorPage>
  );
}
