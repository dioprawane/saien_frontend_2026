import { redirect } from "next/navigation";

type VerificationShortcutPageProps = {
  params: Promise<{ token: string }>;
};

const normalizeToken = (rawToken: string) =>
  decodeURIComponent(rawToken).trim().toUpperCase();

export default async function VerificationShortcutPage({
  params,
}: VerificationShortcutPageProps) {
  const { token } = await params;
  const normalizedToken = normalizeToken(token);

  const memberId = normalizedToken.startsWith("SAIEN-")
    ? normalizedToken
    : `SAIEN-${normalizedToken}`;

  redirect(`/v/${encodeURIComponent(memberId)}`);
}
