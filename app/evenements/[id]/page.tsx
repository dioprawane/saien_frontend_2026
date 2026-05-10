import type { Metadata } from "next";
import EvenementDetailClient from "@/components/evenements/EvenementDetailClient";
import { EVENTS } from "@/lib/events-data";

export async function generateStaticParams() {
  return EVENTS.map((e) => ({ id: String(e.id) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const event = EVENTS.find((e) => e.id === parseInt(id));
  if (!event) return { title: "Événement introuvable — SAIEN" };
  return {
    title: `${event.title} — SAIEN`,
    description: event.description,
  };
}

export default async function EvenementDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <EvenementDetailClient id={Number(id)} />;
}

