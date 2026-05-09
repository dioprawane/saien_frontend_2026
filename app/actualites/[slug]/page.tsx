import type { Metadata } from "next";
import ActualiteDetailClient from "@/components/actualites/ActualiteDetailClient";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const normalized = slug.replace(/-/g, " ").trim();
  const label = normalized ? `${normalized} — Actualites SAIEN` : "Actualite — SAIEN";

  return {
    title: label,
    description: "Article de la vitrine SAIEN.",
  };
}

export default async function ActualiteDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ActualiteDetailClient slug={slug} />;
}

